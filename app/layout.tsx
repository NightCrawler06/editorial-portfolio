import type { Metadata } from "next";
import { PageTransitionProvider } from "@/components/page-transition-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Euel Villavicencio / Portfolio",
  description:
    "A dark editorial portfolio for Franc Emmanuel Villavicencio, a student and part-time developer from the Philippines.",
  icons: {
    icon: "/assets/logo.png",
    shortcut: "/assets/logo.png",
    apple: "/assets/logo.png",
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
