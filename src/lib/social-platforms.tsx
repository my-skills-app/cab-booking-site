import type { ComponentType } from "react";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import type { SocialLinks, SiteSettings } from "@/lib/types";
import { emptySocialLinks, getWhatsAppUrl } from "@/lib/site-settings";

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M9.04 15.31l-.37 5.2c.53 0 .76-.23 1.03-.5l2.48-2.37 5.15 3.78c.95.52 1.63.25 1.89-.9l3.38-15.9h0c.32-1.48-.54-2.06-1.5-1.7L2.6 9.44c-1.45.56-1.43 1.36-.25 1.72l4.6 1.44L18.6 5.5c.66-.43 1.26-.19.77.27" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.81 9.81 0 0 0 12.04 2z" />
    </svg>
  );
}

export type SocialPlatformDef = {
  key: keyof SocialLinks;
  label: string;
  Icon: ComponentType<{ className?: string }>;
  brandBg: string;
  iconColor: string;
};

/** Display order: other platforms above WhatsApp on mobile float */
export const SOCIAL_PLATFORM_ORDER: Array<keyof SocialLinks> = [
  "instagram",
  "facebook",
  "telegram",
  "youtube",
  "twitter",
  "whatsapp",
];

export const SOCIAL_PLATFORMS: SocialPlatformDef[] = [
  {
    key: "instagram",
    label: "Instagram",
    Icon: Instagram,
    brandBg: "bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af]",
    iconColor: "text-white",
  },
  {
    key: "facebook",
    label: "Facebook",
    Icon: Facebook,
    brandBg: "bg-[#1877F2]",
    iconColor: "text-white",
  },
  {
    key: "telegram",
    label: "Telegram",
    Icon: TelegramIcon,
    brandBg: "bg-[#26A5E4]",
    iconColor: "text-white",
  },
  {
    key: "youtube",
    label: "YouTube",
    Icon: Youtube,
    brandBg: "bg-[#FF0000]",
    iconColor: "text-white",
  },
  {
    key: "twitter",
    label: "Twitter",
    Icon: Twitter,
    brandBg: "bg-[#14171A]",
    iconColor: "text-white",
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    Icon: WhatsAppIcon,
    brandBg: "bg-[#25D366]",
    iconColor: "text-white",
  },
];

export type SocialPlatformItem = SocialPlatformDef & {
  url: string | null;
  isActive: boolean;
};

function getSocialLinks(settings: SiteSettings): SocialLinks {
  return settings.socialLinks ?? emptySocialLinks;
}

/** Always returns every platform so icons are visible even before admin URLs are saved. */
export function getAllSocialPlatforms(settings: SiteSettings): SocialPlatformItem[] {
  const social = getSocialLinks(settings);
  const whatsappUrl = getWhatsAppUrl(settings);

  return SOCIAL_PLATFORM_ORDER.map((key) => {
    const def = SOCIAL_PLATFORMS.find((p) => p.key === key);
    if (!def) return null;

    const url =
      key === "whatsapp"
        ? social.whatsapp.trim() || whatsappUrl
        : social[key].trim() || null;

    return {
      ...def,
      url,
      isActive: Boolean(url),
    };
  }).filter(Boolean) as SocialPlatformItem[];
}

/** Only platforms with a configured URL (used where links are required). */
export function getResolvedSocialLinks(settings: SiteSettings): Array<SocialPlatformDef & { url: string }> {
  return getAllSocialPlatforms(settings)
    .filter((item) => item.isActive && item.url)
    .map((item) => ({ ...item, url: item.url! }));
}
