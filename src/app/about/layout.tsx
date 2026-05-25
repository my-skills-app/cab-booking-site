import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us - Trusted Cab Service in Bihar & UP",
  description: `Learn about ${siteConfig.name} - your trusted cab booking partner in Bihar and Uttar Pradesh. Reliable, safe, and affordable transportation service operating from Patna and Siwan.`,
  openGraph: {
    title: `About ${siteConfig.name} - Trusted Cab Service`,
    description: `Learn about ${siteConfig.name} - your trusted cab booking partner in Bihar and UP.`,
    url: `${siteConfig.siteUrl}/about`,
  },
  alternates: {
    canonical: `${siteConfig.siteUrl}/about`,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
