import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { FloatingAction } from "@/components/FloatingAction";
import { LocalBusinessJsonLd, WebsiteJsonLd } from "@/components/JsonLd";

import "@fontsource/outfit/latin-400.css";
import "@fontsource/outfit/latin-500.css";
import "@fontsource/outfit/latin-600.css";
import "@fontsource/outfit/latin-700.css";
import "@fontsource/outfit/latin-800.css";
import "@fontsource/outfit/latin-900.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.name} - Cab Booking Service in Bihar & UP | Patna, Siwan`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - Reliable Cab Service in Bihar & UP`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.logoUrl,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Cab Booking Service`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - Reliable Cab Service in Bihar & UP`,
    description: siteConfig.description,
    images: [siteConfig.logoUrl],
  },
  alternates: {
    canonical: siteConfig.siteUrl,
  },
  icons: [
    {
      url: siteConfig.logoUrl,
      href: siteConfig.logoUrl,
    },
  ],
  category: "transportation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <LocalBusinessJsonLd />
        <WebsiteJsonLd />
      </head>
      <body className="font-sans antialiased">
        {children}
        <FloatingAction />
        <Toaster />
      </body>
    </html>
  );
}
