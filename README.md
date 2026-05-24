# Editorial Portfolio

A minimalist dark personal portfolio built with Next.js, TypeScript, and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

## Deploy under `/new-portfolio`

Deploy this folder as its own Vercel project with the root directory set to
`editorial-portfolio`.

Set this environment variable in that Vercel project:

```bash
NEXT_PUBLIC_BASE_PATH=/new-portfolio
```

Then update the root `vercel.json` in the main portfolio project so
`YOUR_EDITORIAL_PORTFOLIO_PROJECT.vercel.app` points to this project's Vercel
deployment URL.
