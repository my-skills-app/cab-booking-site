"use client";

import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import Link from "next/link";
import { aboutPageData } from "@/lib/about-page-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const AboutPage = () => {
  const { hero, marquee, digitalFuture, whoWeAre } = aboutPageData;

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative pt-48 pb-24 text-center overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern z-0 pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1.2 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute -left-24 top-1/2 -translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1.2 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
            className="absolute -right-24 top-1/2 -translate-y-1/2 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"
          />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-display font-bold text-foreground"
            >
              {hero.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto text-balance"
            >
              {hero.subtitle}
            </motion.p>
          </div>
        </section>

        {/* Marquee Section */}
        <div className="relative z-10 bg-foreground text-background py-4 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="text-lg font-semibold mx-4" dangerouslySetInnerHTML={{ __html: marquee.text.replace(/•/g, '<span class="text-primary-foreground/50 mx-2">•</span>') }} />
            ))}
          </div>
        </div>

        {/* Building the Digital Future Section */}
        <section className="py-24 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              {digitalFuture.title}
            </h2>
            {digitalFuture.paragraphs.map((p, i) => (
              <p key={i} className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto text-balance">
                {p}
              </p>
            ))}

            <div className="mt-20">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                {whoWeAre.title}
              </h2>
              {whoWeAre.paragraphs.map((p, i) => (
                 <p key={i} className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto text-balance">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h3 className="font-medium text-foreground mb-2">Contact us at</h3>
              <a href={`mailto:${siteConfig.contactEmail}`} className="text-muted-foreground hover:text-foreground transition-colors">
                {siteConfig.contactEmail}
              </a>
              <form className="mt-4 flex gap-2">
                <Input type="email" placeholder="Enter your email address" className="max-w-xs" />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
            <div className="md:col-start-3">
              <h3 className="font-semibold text-foreground mb-4">Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
                <li><Link href="/prebuilt" className="text-muted-foreground hover:text-foreground transition-colors">Prebuilt</Link></li>
                <li><Link href="/customized" className="text-muted-foreground hover:text-foreground transition-colors">Customized</Link></li>
                <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="font-display font-bold text-2xl">{siteConfig.name}</span>
              <p className="text-muted-foreground text-sm mt-2">© 2026 {siteConfig.name}. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
