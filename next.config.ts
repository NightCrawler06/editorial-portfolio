import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  basePath: "/new-portfolio",
  assetPrefix: "/new-portfolio",
  turbopack: {
    root,
  },
};

export default nextConfig;
