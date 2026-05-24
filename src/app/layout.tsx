import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { FloatingAction } from "@/components/FloatingAction";

import "@fontsource/outfit/latin-400.css";
import "@fontsource/outfit/latin-500.css";
import "@fontsource/outfit/latin-600.css";
import "@fontsource/outfit/latin-700.css";
import "@fontsource/outfit/latin-800.css";
import "@fontsource/outfit/latin-900.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: "IndiaCab - Premium and reliable cab services in Bihar and UP. One-way drops, round trips, and airport transfers at affordable rates.",
  icons: [
    {
      url: siteConfig.logoUrl,
      href: siteConfig.logoUrl,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <FloatingAction />
        <Toaster />
      </body>
    </html>
  );
}
