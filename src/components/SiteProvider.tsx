"use client";

import React, { createContext, useContext } from "react";
import type { SiteSettings } from "@/lib/types";
import { normalizeSiteSettings } from "@/lib/site-settings";

type SiteContextValue = {
  settings: SiteSettings;
};

const defaultSettings: SiteSettings = normalizeSiteSettings(null);

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
