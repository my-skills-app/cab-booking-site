"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { landingPageData } from "@/lib/landing-page-data";

export function Hero() {
  const { hero } = landingPageData;

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
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
            <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl max-w-lg mx-auto">
              <Image 
                src={hero.mainImage.src} 
                alt={hero.mainImage.alt}
                width={800}
                height={450}
                className="w-full h-auto object-cover"
              />
            </div>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed text-balance">
              {hero.paragraph}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-12">
              <Link 
                href="#booking" 
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 hover:scale-105 transition-all duration-200 shadow-lg shadow-primary/25 flex items-center justify-center gap-2 group"
              >
                Let's Explore
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="#contact" 
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-background border-2 border-border text-foreground font-semibold text-lg hover:border-primary hover:text-primary transition-all duration-200"
              >
                Contact Us
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex -space-x-3">
                {hero.socialProof.images.map((image, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden bg-secondary">
                    <Image src={image.src} alt={image.alt} width={100} height={100} className="w-full h-full object-cover" data-ai-hint={image.alt} />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground">
                  {hero.socialProof.plusCount}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <div className="flex text-yellow-500">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <span className="text-muted-foreground">{hero.socialProof.ratingText}</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Image Removed to use the provided full banner image above */}
        </div>
      </div>
    </section>
  );
}
