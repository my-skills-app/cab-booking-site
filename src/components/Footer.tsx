"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { useSiteSettings } from "@/components/SiteProvider";
import { SocialMediaLinks } from "@/components/SocialMediaLinks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const siteLinks = [
  { label: "Home", href: "/" },
  { label: "Prebuilt", href: "/prebuilt" },
  { label: "Customized", href: "/customized" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const quickLinks = [
  { label: "About us", href: "/about" },
  { label: "Our Services", href: "/#pricing" },
  { label: "Contact us", href: "/contact" },
  { label: "Privacy Policy", href: "/about" },
  { label: "Cab Service in Patna", href: "/#pricing" },
  { label: "Patna Airport taxi service", href: "/#pricing" },
  { label: "Patna to Malmaliya", href: "/#pricing" },
  { label: "Patna to Mairwa", href: "/#pricing" },
  { label: "Patna to Barharia", href: "/#pricing" },
  { label: "Patna to Maharajganj", href: "/#pricing" },
  { label: "Patna to Lucknow", href: "/#pricing" },
  { label: "Patna to Delhi", href: "/#pricing" },
  { label: "Patna to Varanasi", href: "/#pricing" },
  { label: "Patna to Gorakhpur", href: "/#pricing" },
  { label: "Siwan to Varanasi", href: "/#pricing" },
  { label: "Siwan To Lucknow", href: "/#pricing" },
  { label: "Siwan To Patna", href: "/#pricing" },
  { label: "Siwan To Gorakhpur", href: "/#pricing" },
  { label: "Siwan To Jamshedpur Tata", href: "/#pricing" },
];

const routeLinks = [
  { label: "Siwan To Gorakhpur", href: "/#pricing" },
  { label: "Siwan To Patna", href: "/#pricing" },
  { label: "Patna to Begusarai", href: "/#pricing" },
  { label: "Patna to Darbhanga", href: "/#pricing" },
  { label: "Patna to Motihari", href: "/#pricing" },
  { label: "Patna to Gaya", href: "/#pricing" },
  { label: "Patna to Gopalganj", href: "/#pricing" },
  { label: "Patna to Muzaffarpur", href: "/#pricing" },
  { label: "Patna to Chhapra", href: "/#pricing" },
  { label: "Patna to Sitamarhi", href: "/#pricing" },
  { label: "Patna to Hajipur", href: "/#pricing" },
  { label: "Patna to Bettiah", href: "/#pricing" },
  { label: "Patna to Siwan", href: "/#pricing" },
  { label: "Patna to Samastipur", href: "/#pricing" },
  { label: "Patna to Raxaul", href: "/#pricing" },
  { label: "Patna to Madhubani", href: "/#pricing" },
  { label: "Siwan to Delhi", href: "/#pricing" },
  { label: "Saharsa to Patna", href: "/#pricing" },
  { label: "Rajgir to Patna", href: "/#pricing" },
];

export function Footer() {
  const { settings } = useSiteSettings();
  const phone = settings.phoneNumber;

  return (
    <footer className="bg-[#1a1a1a] text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Logo & Description + Subscribe */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src={siteConfig.logoUrl}
              alt={siteConfig.name}
              width={120}
              height={60}
              className="h-14 w-auto mb-4 rounded-lg"
            />
            <p className="text-sm leading-relaxed text-gray-400 mb-5">
              Welcome to {siteConfig.name} Siwan! We prioritize your journey&apos;s comfort, safety, and punctuality. Your trusted partner in seamless transportation.
            </p>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-2">Subscribe</h4>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="h-9 bg-gray-800 border-gray-700 text-gray-300 placeholder:text-gray-500 text-xs"
              />
              <Button type="submit" size="sm" className="h-9 text-xs shrink-0">
                Join
              </Button>
            </form>
            <div className="mt-5">
              <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Follow Us</h4>
              <SocialMediaLinks variant="branded" iconSize="md" />
            </div>
          </div>

          {/* Site Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
              Links
            </h3>
            <ul className="space-y-2">
              {siteLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links - Column 1 */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links - Column 2 (Routes) */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6 md:invisible">
              &nbsp;
            </h3>
            <ul className="space-y-2">
              {routeLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Head Office */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
              Head Office
            </h3>
            <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
              <p>
                <span className="text-gray-300 font-medium">Head Office-</span> Add:- आशियाना digha मेन रोड (Ghurdaur road), पटना – 800025
              </p>
              <p>
                <span className="text-gray-300 font-medium">Patna Booking Phone:</span>{" "}
                <a href={`tel:${phone}`} className="hover:text-white transition-colors">{phone.replace("+91", "+91 ")}</a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700/50 space-y-6">
          <div className="flex flex-col items-center gap-3">
            <p className="text-white text-xs font-semibold uppercase tracking-widest">Connect With Us</p>
            <SocialMediaLinks variant="branded" iconSize="lg" className="justify-center" />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-gray-500 text-center sm:text-left">
              © 2026 {siteConfig.name}. All rights reserved.
            </p>
            <a href={`tel:${phone}`} className="text-xs text-gray-400 hover:text-white transition-colors">
              Call: {phone}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
