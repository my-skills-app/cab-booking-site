import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Custom Cab Booking - Design Your Own Trip",
  description: `Create a custom cab trip with ${siteConfig.name}. Choose your own route, vehicle, and schedule. Outstation trips, multi-city tours, and special event transportation in Bihar and UP.`,
  openGraph: {
    title: `Custom Cab Booking | ${siteConfig.name}`,
    description: `Design your own cab trip. Custom routes, flexible schedules, and premium vehicles.`,
    url: `${siteConfig.siteUrl}/customized`,
  },
  alternates: {
    canonical: `${siteConfig.siteUrl}/customized`,
  },
};

export default function CustomizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
