"use client";

import { SiteProvider } from "@/components/SiteProvider";
import type { SiteSettings } from "@/lib/types";

export function Providers({
  children,
  initialSettings,
}: {
  children: React.ReactNode;
  initialSettings: SiteSettings;
}) {
  return <SiteProvider initialSettings={initialSettings}>{children}</SiteProvider>;
}
