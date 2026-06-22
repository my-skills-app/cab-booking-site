import { siteConfig } from "@/lib/site-config";
import type { SiteSettings, SocialLinks } from "@/lib/types";

export const emptySocialLinks: SocialLinks = {
  whatsapp: "",
  facebook: "",
  instagram: "",
  telegram: "",
  youtube: "",
  twitter: "",
};

export function normalizeSiteSettings(raw: Partial<SiteSettings> | null | undefined): SiteSettings {
  const social = raw?.socialLinks;
  return {
    phoneNumber: raw?.phoneNumber || siteConfig.phoneNumber,
    contactEmail: raw?.contactEmail || siteConfig.contactEmail,
    socialLinks: {
      whatsapp: social?.whatsapp?.trim() || "",
      facebook: social?.facebook?.trim() || "",
      instagram: social?.instagram?.trim() || "",
      telegram: social?.telegram?.trim() || "",
      youtube: social?.youtube?.trim() || "",
      twitter: social?.twitter?.trim() || "",
    },
  };
}

export function getWhatsAppUrl(settings: SiteSettings, message?: string): string {
  const custom = settings.socialLinks.whatsapp;
  let base: string;

  if (custom) {
    if (custom.startsWith("http://") || custom.startsWith("https://")) {
      base = custom;
    } else {
      const digits = custom.replace(/\D/g, "");
      base = digits
        ? `https://wa.me/${digits}`
        : `https://wa.me/${settings.phoneNumber.replace("+", "")}`;
    }
  } else {
    base = `https://wa.me/${settings.phoneNumber.replace("+", "")}`;
  }

  if (!message) return base;

  const separator = base.includes("?") ? "&" : "?";
  return `${base}${separator}text=${encodeURIComponent(message)}`;
}
