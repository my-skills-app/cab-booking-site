"use client";

import { Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { motion } from "framer-motion";

export function FloatingAction() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 md:hidden">
      {/* WhatsApp Button */}
      <motion.a
        href={`https://wa.me/${siteConfig.phoneNumber.replace("+", "")}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="z-50"
      >
        <svg viewBox="0 0 24 24" width="56" height="56" className="drop-shadow-xl">
          <path fill="#25D366" d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.81 9.81 0 0 0 12.04 2z"/>
          <path fill="#fff" d="M12.04 3.51c2.27 0 4.41.89 6.01 2.49 1.61 1.6 2.49 3.74 2.49 6.01 0 4.69-3.81 8.5-8.5 8.5-1.5 0-2.97-.4-4.27-1.15l-.3-.18-3.17.83.85-3.09-.2-.31a8.43 8.43 0 0 1-1.29-4.6c0-4.69 3.82-8.5 8.5-8.5zm4.84 9.17c-.27-.14-1.58-.78-1.82-.87-.24-.09-.41-.14-.58.11-.17.25-.66.83-.81 1-.15.17-.3.19-.57.05-.27-.14-1.13-.41-2.16-1.32-.8-.71-1.34-1.59-1.5-1.86-.17-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.19-.27.28-.45.09-.19.05-.35-.02-.49-.07-.14-.58-1.41-.8-1.92-.21-.52-.42-.45-.58-.45-.15 0-.32-.01-.5-.01-.17 0-.45.06-.69.31-.24.25-.91.89-.91 2.17s.93 2.51 1.06 2.69c.13.18 1.83 2.8 4.44 3.93.62.27 1.1.43 1.48.55.62.2 1.19.17 1.63.11.5-.07 1.54-.63 1.76-1.24.22-.61.22-1.13.15-1.24-.07-.11-.26-.18-.53-.32z"/>
        </svg>
      </motion.a>

      {/* Call Button */}
      <motion.a
        href={`tel:${siteConfig.phoneNumber}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl"
      >
        <Phone size={28} fill="currentColor" />
      </motion.a>
    </div>
  );
}
