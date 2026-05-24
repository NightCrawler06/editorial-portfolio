import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { PageTransitionProvider } from "@/components/page-transition-provider";
import {
  ogImageUrl,
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
    url: siteUrl,
    siteName,
    title: `${siteName} / Developer Portfolio`,
    description: siteDescription,
    locale: "en_PH",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: `${profile.name} portfolio preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} / Developer Portfolio`,
    description: siteDescription,
    images: [ogImageUrl],
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
    "og:image:secure_url": ogImageUrl,
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:type": "image/png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:site_name" content={siteName} />
        <meta
          property="og:title"
          content={`${siteName} / Developer Portfolio`}
        />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:secure_url" content={ogImageUrl} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content={`${profile.name} portfolio preview`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${siteName} / Developer Portfolio`}
        />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={ogImageUrl} />
      </head>
      <body>
        <PageTransitionProvider>{children}</PageTransitionProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
