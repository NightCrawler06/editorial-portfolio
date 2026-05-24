import { profile, socialLinks } from "./content";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://euel-editorial-portfolio.vercel.app";

export const siteName = "Euel Villavicencio";

export const profileImage = "/assets/euel.png";

export const siteDescription =
  "Portfolio of Franc Emmanuel Villavicencio, a student and part-time developer from the Philippines building apps, dashboards, APIs, automation tools, and developer utilities.";

export const siteKeywords = [
  "Euel Villavicencio",
  "Franc Emmanuel Villavicencio",
  "Philippines developer",
  "student developer",
  "part-time developer",
  "Zoho developer",
  "Next.js developer",
  "React developer",
  "Python developer",
  "portfolio",
  "web developer",
  "automation tools",
];

export const sameAsLinks = [
  profile.github,
  ...socialLinks.map((link) => link.href),
];
