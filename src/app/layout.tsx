import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
});


export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: "ZoyaCab - Premium and reliable cab services in Bihar and UP. One-way drops, round trips, and airport transfers at affordable rates.",
  icons: [
    {
      url: siteConfig.logoUrl,
      href: siteConfig.logoUrl,
    },
  ],
};

import { FloatingAction } from "@/components/FloatingAction";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <FloatingAction />
        <Toaster />
      </body>
    </html>
  );
}
