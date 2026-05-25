import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Popular Cab Routes - Patna, Siwan, Bihar & UP",
  description: `Browse popular cab routes by ${siteConfig.name}. Patna to Siwan, Gorakhpur, Varanasi, Delhi, Lucknow and 50+ destinations. Affordable fares with comfortable rides.`,
  openGraph: {
    title: `Popular Cab Routes | ${siteConfig.name}`,
    description: `Explore pre-built cab routes across Bihar and UP. One-way and round trips at best prices.`,
    url: `${siteConfig.siteUrl}/prebuilt`,
  },
  alternates: {
    canonical: `${siteConfig.siteUrl}/prebuilt`,
  },
};

export default function PrebuiltLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
