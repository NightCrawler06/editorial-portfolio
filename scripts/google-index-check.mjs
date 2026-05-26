import http from "node:http";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { URLSearchParams } from "node:url";

const TOKEN_PATH = resolve(process.cwd(), ".google-search-console-token.json");
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const DEFAULT_URLS = [
  "https://euel.dev/",
  "https://euel.dev/projects",
  "https://euel.dev/blog",
  "https://euel.dev/sitemap.xml",
];

loadEnvFile(resolve(process.cwd(), ".env.local"));

const clientSecretPath = process.env.GOOGLE_CLIENT_SECRET_PATH;
const siteUrl = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL ?? "https://euel.dev/";
const inspectionUrls = process.argv.slice(2).length > 0 ? process.argv.slice(2) : DEFAULT_URLS;

if (!clientSecretPath) {
  console.error("Missing GOOGLE_CLIENT_SECRET_PATH in .env.local.");
  process.exit(1);
}

const clientConfig = JSON.parse(readFileSync(clientSecretPath, "utf8"));
const oauthClient = clientConfig.installed ?? clientConfig.web;

if (!oauthClient?.client_id || !oauthClient?.client_secret || !oauthClient?.token_uri) {
  console.error("Invalid Google OAuth client secret file.");
  process.exit(1);
}

const token = await getAccessToken(oauthClient);

console.log("Google Search Console index check");
console.log(`Property: ${siteUrl}`);
console.log("");

for (const inspectionUrl of inspectionUrls) {
  await inspectUrl({ inspectionUrl, siteUrl, accessToken: token.access_token });
}

function loadEnvFile(path) {
  if (!existsSync(path)) {
    return;
  }

  const envFile = readFileSync(path, "utf8");

  for (const line of envFile.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue;
    }

    const [key, ...valueParts] = trimmed.split("=");
    const value = valueParts.join("=").replace(/^["']|["']$/g, "");

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

async function getAccessToken(oauthClient) {
  const savedToken = readSavedToken();

  if (savedToken?.access_token && savedToken.expires_at > Date.now() + 60_000) {
    return savedToken;
  }

  if (savedToken?.refresh_token) {
    const refreshedToken = await refreshAccessToken(oauthClient, savedToken.refresh_token);
    const mergedToken = {
      ...savedToken,
      ...refreshedToken,
      expires_at: Date.now() + Number(refreshedToken.expires_in ?? 3600) * 1000,
    };
    saveToken(mergedToken);
    return mergedToken;
  }

  return authorizeWithLoopback(oauthClient);
}

function readSavedToken() {
  if (!existsSync(TOKEN_PATH)) {
    return null;
  }

  return JSON.parse(readFileSync(TOKEN_PATH, "utf8"));
}

function saveToken(token) {
  writeFileSync(TOKEN_PATH, `${JSON.stringify(token, null, 2)}\n`);
}

async function authorizeWithLoopback(oauthClient) {
  const server = http.createServer();

  const codePromise = new Promise((resolveCode, rejectCode) => {
    server.on("request", (request, response) => {
      const requestUrl = new URL(request.url ?? "/", `http://${request.headers.host}`);

      if (requestUrl.pathname !== "/oauth2callback") {
        response.writeHead(404);
        response.end("Not found");
        return;
      }

      const error = requestUrl.searchParams.get("error");
      const code = requestUrl.searchParams.get("code");

      if (error) {
        response.writeHead(400, { "Content-Type": "text/plain" });
        response.end(`Google OAuth error: ${error}`);
        rejectCode(new Error(error));
        return;
      }

      if (!code) {
        response.writeHead(400, { "Content-Type": "text/plain" });
        response.end("Missing OAuth code.");
        rejectCode(new Error("Missing OAuth code."));
        return;
      }

      response.writeHead(200, { "Content-Type": "text/plain" });
      response.end("Authorized. You can close this browser tab and return to the terminal.");
      resolveCode(code);
    });
  });

  await new Promise((resolveListen) => server.listen(0, "127.0.0.1", resolveListen));

  const { port } = server.address();
  const redirectUri = `http://127.0.0.1:${port}/oauth2callback`;
  const authUrl = new URL(oauthClient.auth_uri ?? "https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.search = new URLSearchParams({
    client_id: oauthClient.client_id,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: SCOPE,
    access_type: "offline",
    prompt: "consent",
  }).toString();

  console.log("Open this Google authorization URL:");
  console.log(authUrl.toString());
  console.log("");

  try {
    const code = await codePromise;
    const token = await exchangeCodeForToken(oauthClient, code, redirectUri);
    const savedToken = {
      ...token,
      expires_at: Date.now() + Number(token.expires_in ?? 3600) * 1000,
    };
    saveToken(savedToken);
    return savedToken;
  } finally {
    server.close();
  }
}

async function exchangeCodeForToken(oauthClient, code, redirectUri) {
  const response = await fetch(oauthClient.token_uri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: oauthClient.client_id,
      client_secret: oauthClient.client_secret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error_description ?? data.error ?? "OAuth token exchange failed.");
  }

  return data;
}

async function refreshAccessToken(oauthClient, refreshToken) {
  const response = await fetch(oauthClient.token_uri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: oauthClient.client_id,
      client_secret: oauthClient.client_secret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error_description ?? data.error ?? "OAuth token refresh failed.");
  }

  return data;
}

async function inspectUrl({ inspectionUrl, siteUrl, accessToken }) {
  const response = await fetch(
    "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inspectionUrl,
        siteUrl,
      }),
    },
  );

  const data = await response.json();

  console.log(inspectionUrl);

  if (!response.ok) {
    console.log(`  Error: ${data.error?.message ?? response.statusText}`);
    console.log("");
    return;
  }

  const result = data.inspectionResult?.indexStatusResult;

  console.log(`  Verdict: ${result?.verdict ?? "unknown"}`);
  console.log(`  Coverage: ${result?.coverageState ?? "unknown"}`);
  console.log(`  Robots: ${result?.robotsTxtState ?? "unknown"}`);
  console.log(`  Indexing: ${result?.indexingState ?? "unknown"}`);
  console.log(`  Google canonical: ${result?.googleCanonical ?? "unknown"}`);
  console.log(`  User canonical: ${result?.userCanonical ?? "unknown"}`);
  console.log(`  Last crawl: ${result?.lastCrawlTime ?? "unknown"}`);
  console.log("");
}
