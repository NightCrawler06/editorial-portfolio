import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#070707",
        panel: "#151515",
        line: "rgba(255,255,255,0.1)",
        muted: "#b7b7b7",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Newsreader", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 24px 80px rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
