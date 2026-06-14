"use client";

import React, { createContext, useContext } from "react";
import { siteConfig } from "@/lib/site-config";
import type { SiteSettings } from "@/lib/types";

type SiteContextValue = {
  settings: SiteSettings;
};

const defaultSettings: SiteSettings = {
  phoneNumber: siteConfig.phoneNumber,
  contactEmail: siteConfig.contactEmail,
};

const SiteContext = createContext<SiteContextValue>({
  settings: defaultSettings,
});

export function SiteProvider({
  children,
  initialSettings = defaultSettings,
}: {
  children: React.ReactNode;
  initialSettings?: SiteSettings;
}) {
  return (
    <SiteContext.Provider value={{ settings: initialSettings }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteContext);
}
