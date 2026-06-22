"use client";

import { useSiteSettings } from "@/components/SiteProvider";
import { getAllSocialPlatforms } from "@/lib/social-platforms";

type SocialMediaLinksProps = {
  className?: string;
  variant?: "default" | "branded";
  iconSize?: "sm" | "md" | "lg";
  showLabels?: boolean;
};

const iconSizes = {
  sm: { box: "w-9 h-9", icon: "w-4 h-4" },
  md: { box: "w-11 h-11", icon: "w-5 h-5" },
  lg: { box: "w-12 h-12", icon: "w-6 h-6" },
};

export function SocialMediaLinks({
  className = "",
  variant = "branded",
  iconSize = "md",
  showLabels = false,
}: SocialMediaLinksProps) {
  const { settings } = useSiteSettings();
  const platforms = getAllSocialPlatforms(settings);
  const sizes = iconSizes[iconSize];

  if (variant === "default") {
    return (
      <div className={`flex flex-wrap items-center gap-3 ${className}`}>
        {platforms.map(({ key, label, Icon, url, isActive }) => {
          const content = (
            <>
              <Icon className={sizes.icon} />
              {showLabels && <span className="text-xs">{label}</span>}
            </>
          );

          if (!isActive || !url) {
            return (
              <span
                key={key}
                aria-label={`${label} (link not configured)`}
                className="flex items-center gap-1.5 text-gray-500 opacity-50"
              >
                {content}
              </span>
            );
          }

          return (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
            >
              {content}
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-2.5 sm:gap-3 ${className}`}>
      {platforms.map(({ key, label, Icon, url, brandBg, iconColor, isActive }) => {
        const sharedClass = `${sizes.box} rounded-full ${brandBg} ${iconColor} flex items-center justify-center shadow-lg transition-all duration-200`;

        if (!isActive || !url) {
          return (
            <span
              key={key}
              aria-label={`${label} (add link in admin)`}
              title={`${label} — add link in admin settings`}
              className={`${sharedClass} opacity-45 cursor-default`}
            >
              <Icon className={sizes.icon} />
            </span>
          );
        }

        return (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className={`${sharedClass} hover:scale-110 hover:shadow-xl active:scale-95`}
          >
            <Icon className={sizes.icon} />
          </a>
        );
      })}
    </div>
  );
}
