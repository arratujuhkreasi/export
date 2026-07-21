import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/sonner";

import { Chatbot } from "@/components/chatbot";
import { siteConfig } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "CO EXPORT.ID | B2B Export Marketplace",
    template: "%s | CO EXPORT.ID",
  },
  description: siteConfig.description,
  openGraph: {
    title: "CO EXPORT.ID | B2B Export Marketplace",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.logo, width: 640, height: 640, alt: "CO EXPORT.ID logo" }],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <Suspense fallback={null}>
          <SiteHeader />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Suspense fallback={null}>
          <SiteFooter />
        </Suspense>
        <Toaster richColors position="bottom-right" />
        <Chatbot />
      </body>
    </html>
  );
}
