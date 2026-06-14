import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us - Book Your Cab Now",
  description: `Contact ${siteConfig.name} for cab booking inquiries. Call ${siteConfig.phoneNumber} or email ${siteConfig.contactEmail}. Patna and Siwan office. Available 9AM to 7PM.`,
  openGraph: {
    title: `Contact ${siteConfig.name} - Book Your Cab`,
    description: `Reach ${siteConfig.name} for affordable cab bookings across Bihar and UP. Call, WhatsApp, or email us.`,
    url: `${siteConfig.siteUrl}/contact`,
  },
  alternates: {
    canonical: `${siteConfig.siteUrl}/contact`,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
