"use client";

import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSiteSettings } from "@/components/SiteProvider";
import { FLOATING_INSTAGRAM_ICON, FLOATING_WHATSAPP_ICON } from "@/lib/floating-action-icons";
import { getWhatsAppUrl } from "@/lib/site-settings";
import { motion } from "framer-motion";

const FLOAT_SIZE = "w-14 h-14";

type FloatImageLinkProps = {
  href: string;
  src: string;
  alt: string;
  index: number;
  external?: boolean;
};

function FloatImageLink({ href, src, alt, index, external = true }: FloatImageLinkProps) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={alt}
      initial={{ scale: 0, opacity: 0, y: 12 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className={`${FLOAT_SIZE} rounded-full overflow-hidden shadow-2xl ring-2 ring-white/90 drop-shadow-xl block`}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </motion.a>
  );
}

export function FloatingAction() {
  const pathname = usePathname();
  const { settings } = useSiteSettings();
  const phone = settings.phoneNumber;
  const whatsappUrl = getWhatsAppUrl(settings);
  const instagramUrl = settings.socialLinks?.instagram?.trim() || "https://www.instagram.com/";

  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 md:hidden">
      {/* Top: Instagram */}
      <FloatImageLink
        href={instagramUrl}
        src={FLOATING_INSTAGRAM_ICON}
        alt="Instagram"
        index={0}
      />

      {/* Middle: WhatsApp */}
      <FloatImageLink
        href={whatsappUrl}
        src={FLOATING_WHATSAPP_ICON}
        alt="WhatsApp"
        index={1}
      />

      {/* Bottom: Call */}
      <motion.a
        href={`tel:${phone}`}
        aria-label="Call"
        initial={{ scale: 0, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.16, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className={`${FLOAT_SIZE} bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl ring-2 ring-white/90`}
      >
        <Phone size={28} fill="currentColor" />
      </motion.a>
    </div>
  );
}
