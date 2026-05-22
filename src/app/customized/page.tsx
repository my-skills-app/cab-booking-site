"use client";

import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpRight } from "lucide-react";
import { customizedPageData } from "@/lib/customized-page-data";
import { siteConfig } from "@/lib/site-config";

const CustomizedPage = () => {
  const { hero, customWork } = customizedPageData;

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative pt-48 pb-32 text-center overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern z-0 pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-display font-bold text-foreground leading-tight whitespace-pre-line"
            >
              {hero.title}
            </motion.h1>
          </div>
        </section>

        {/* Custom Work Section */}
        <section className="py-24 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                {customWork.title}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
                {customWork.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {customWork.projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-3xl p-6 border border-border shadow-sm hover:shadow-xl transition-all duration-500 group"
                >
                  <div className="aspect-video rounded-2xl overflow-hidden mb-6 bg-muted border">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      data-ai-hint={project.hint}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <Button asChild>
                    <Link href={project.link}>View Website <ArrowUpRight className="h-4 w-4" /></Link>
                  </Button>
                </motion.div>
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

export default CustomizedPage;
