"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = usePathname();

  const links = [
    { href: "/#pricing", label: "Pricing" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md border border-black/5 rounded-full px-3 shadow-lg">
        <div className="relative flex items-center justify-between h-14 md:h-16">
          {/* Left Nav */}
          <div className="hidden md:flex items-center gap-6 pl-3">
            {links.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-base font-medium transition-colors hover:text-primary",
                  location === link.href
                    ? "text-primary"
                    : "text-foreground/60"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Logo */}
          <div className="md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src={siteConfig.logoUrl}
                alt={siteConfig.name}
                width={140}
                height={38}
                className="h-9 w-auto md:h-12"
              />
            </Link>
          </div>

          {/* Right Nav */}
          <div className="hidden md:flex items-center gap-6 pr-3">
            {links.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-base font-medium transition-colors hover:text-primary",
                  location === link.href
                    ? "text-primary"
                    : "text-foreground/60"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground/60 hover:text-primary p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-2 mx-4 bg-white/95 backdrop-blur-md border border-black/5 rounded-2xl shadow-lg"
          >
            <div className="flex flex-col items-center gap-2 p-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-base font-medium w-full text-center py-3 rounded-lg transition-colors hover:bg-gray-100",
                    location === link.href
                      ? "text-primary bg-gray-50"
                      : "text-foreground/80"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
