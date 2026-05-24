import type { Metadata } from "next";
import { PageTransitionProvider } from "@/components/page-transition-provider";
import {
  sameAsLinks,
  siteDescription,
  siteKeywords,
  siteName,
  siteUrl,
} from "@/lib/seo";
import { profile } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: `${siteName} / Developer Portfolio`,
    template: `%s / ${siteName}`,
  },
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  category: "portfolio",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/assets/logo.png",
    shortcut: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    title: `${siteName} / Developer Portfolio`,
    description: siteDescription,
    locale: "en_PH",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${profile.name} portfolio preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} / Developer Portfolio`,
    description: siteDescription,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "profile:first_name": "Franc Emmanuel",
    "profile:last_name": "Villavicencio",
    "profile:username": "Euel",
    "og:see_also": sameAsLinks.join(","),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <PageTransitionProvider>{children}</PageTransitionProvider>
      </body>
    </html>
  );
}
