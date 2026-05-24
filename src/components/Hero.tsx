"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { landingPageData } from "@/lib/landing-page-data";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  const { hero } = landingPageData;

  return (
    <section className="relative pt-24 pb-16 lg:pt-36 lg:pb-28 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 text-center"
          >

            <div className="mb-6 sm:mb-8 max-w-lg mx-auto relative px-2">
              <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                <Image
                  src={hero.mainImage.src}
                  alt={hero.mainImage.alt}
                  width={800}
                  height={450}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 bg-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl shadow-lg border border-border hidden xs:block">
                <p className="text-[10px] sm:text-xs font-bold text-foreground">Meet Our Founders 👋</p>
              </div>
            </div>

            <h1 className="text-3xl sm:text-6xl font-display font-black text-foreground mb-10 tracking-tight leading-[1.15] sm:leading-[1.1] text-balance">
              We provide <span className="text-blue-600">Safe, Reliable</span> <br /> & Affordable Rides
            </h1>

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center mb-8 sm:mb-10 px-4">
              <Link
                href={`https://wa.me/${siteConfig.phoneNumber.replace("+", "")}?text=Hello IndiaCab, I want to book a trip.`}
                target="_blank"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#25D366] text-white font-bold text-lg hover:bg-[#20bd5a] transition-all duration-300 shadow-xl shadow-green-500/20 flex items-center justify-center gap-3 active:scale-95"
              >
                <svg viewBox="0 0 448 512" width="22" height="22" fill="currentColor">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.4-11.3 2.5-2.4 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.5-9.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.6 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
                Book on WhatsApp
              </Link>

              <a
                href={`tel:${siteConfig.phoneNumber}`}
                className="w-full sm:w-auto px-6 py-4 sm:px-8 sm:py-5 rounded-xl bg-blue-600 text-white font-bold text-lg sm:text-xl hover:bg-blue-700 hover:scale-105 transition-all duration-200 shadow-xl flex items-center justify-center gap-2 active:scale-95"
              >
                Request a Call Back
              </a>
            </div>

            {/* Popular Routes Highlights (App-like Mobile Version) */}
            <div className="bg-card rounded-2xl sm:rounded-[40px] p-4 sm:p-10 mb-12 shadow-xl border border-border/50 max-w-3xl mx-auto relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-600" />

              <div className="flex items-center justify-between mb-6 px-1">
                <h3 className="text-lg sm:text-2xl font-display font-black text-foreground uppercase tracking-tight">Popular Fares</h3>
                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[9px] font-bold rounded-full uppercase tracking-widest border border-blue-100">Live Prices</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                <Link
                  href={`https://wa.me/${siteConfig.phoneNumber.replace("+", "")}?text=Hello IndiaCab, I want to book a trip from Siwan To Patna at ₹ 2599.`}
                  target="_blank"
                  className="bg-background rounded-xl sm:rounded-2xl p-3 sm:p-5 flex justify-between items-center border border-border/50 shadow-sm hover:border-blue-300 hover:shadow-md transition-all group/item cursor-pointer"
                >
                  <div className="flex flex-col items-start">
                    <span className="text-[8px] sm:text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Route</span>
                    <span className="font-bold text-foreground text-sm sm:text-lg">Siwan To Patna</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[8px] sm:text-[10px] text-muted-foreground uppercase font-bold tracking-widest text-right">Fixed</span>
                    <span className="text-lg sm:text-2xl font-black text-blue-600">₹ 2599</span>
                  </div>
                </Link>

                <Link
                  href={`https://wa.me/${siteConfig.phoneNumber.replace("+", "")}?text=Hello IndiaCab, I want to book a trip from Siwan To Lucknow at ₹ 7999.`}
                  target="_blank"
                  className="bg-background rounded-xl sm:rounded-2xl p-3 sm:p-5 flex justify-between items-center border border-border/50 shadow-sm hover:border-blue-300 hover:shadow-md transition-all group/item cursor-pointer"
                >
                  <div className="flex flex-col items-start">
                    <span className="text-[8px] sm:text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Route</span>
                    <span className="font-bold text-foreground text-sm sm:text-lg">Siwan To Lucknow</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[8px] sm:text-[10px] text-muted-foreground uppercase font-bold tracking-widest text-right">Fixed</span>
                    <span className="text-lg sm:text-2xl font-black text-blue-600">₹ 7999</span>
                  </div>
                </Link>

                <Link
                  href={`https://wa.me/${siteConfig.phoneNumber.replace("+", "")}?text=Hello IndiaCab, I want to book a trip from Patna to Muzaffarpur at ₹ 1799.`}
                  target="_blank"
                  className="bg-background rounded-xl sm:rounded-2xl p-3 sm:p-5 flex justify-between items-center border border-border/50 shadow-sm hover:border-blue-300 hover:shadow-md transition-all group/item cursor-pointer"
                >
                  <div className="flex flex-col items-start">
                    <span className="text-[8px] sm:text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Route</span>
                    <span className="font-bold text-foreground text-sm sm:text-lg">Patna to Muzaffarpur</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[8px] sm:text-[10px] text-muted-foreground uppercase font-bold tracking-widest text-right">Fixed</span>
                    <span className="text-lg sm:text-2xl font-black text-blue-600">₹ 1799</span>
                  </div>
                </Link>

                <Link
                  href={`https://wa.me/${siteConfig.phoneNumber.replace("+", "")}?text=Hello IndiaCab, I want to book a trip from Siwan To Patna To Motihari at ₹ 3199.`}
                  target="_blank"
                  className="bg-background rounded-xl sm:rounded-2xl p-3 sm:p-5 flex justify-between items-center border border-border/50 shadow-sm hover:border-blue-300 hover:shadow-md transition-all group/item cursor-pointer"
                >
                  <div className="flex flex-col items-start">
                    <span className="text-[8px] sm:text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Route</span>
                    <span className="font-bold text-foreground text-sm sm:text-lg">Patna To Motihari</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[8px] sm:text-[10px] text-muted-foreground uppercase font-bold tracking-widest text-right">Fixed</span>
                    <span className="text-lg sm:text-2xl font-black text-blue-600">₹ 3199</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Social Proof (Simplified & Themed) */}
            <div className="flex flex-col items-center gap-5">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {hero.socialProof.images.map((img, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden ring-1 ring-border">
                      <Image src={img.src} alt={img.alt} width={40} height={40} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-[13px] font-bold text-foreground uppercase tracking-[0.2em] opacity-60">
                {hero.socialProof.ratingText}
              </p>
            </div>
          </motion.div>

          {/* Hero Image Removed to use the provided full banner image above */}
        </div>
      </div>
    </section>
  );
}
