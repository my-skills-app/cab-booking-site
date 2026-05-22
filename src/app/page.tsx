"use client";

import * as React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { landingPageData } from "@/lib/landing-page-data";
import { siteConfig } from "@/lib/site-config";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";


export default function Home() {
  const { streamlineBusiness, videoShowcase, socialPresence, team, faq } = landingPageData;

  const [emblaApi, setEmblaApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!emblaApi) {
      return
    }

    setCount(emblaApi.scrollSnapList().length)
    setCurrent(emblaApi.selectedScrollSnap())

    const onSelect = () => {
      setCurrent(emblaApi.selectedScrollSnap())
    }

    emblaApi.on("select", onSelect)

    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi])

  const getPlaceholderImage = (id: string) => {
    return PlaceHolderImages.find(img => img.id === id);
  }
  
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Streamline Business Section */}
        <section id="services" className="py-24 bg-secondary/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-card border border-border text-[13px] font-medium text-muted-foreground mb-6 shadow-sm">
                Services
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground max-w-2xl mx-auto leading-tight">
                Our Premium Cab Booking Services
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {streamlineBusiness.features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-card rounded-[32px] p-8 border border-border shadow-sm hover:shadow-lg transition-all duration-500 group"
                >
                  <div className="aspect-[1.4/1] rounded-2xl overflow-hidden mb-8 bg-background border flex items-center justify-center p-4">
                    <Image 
                      src={feature.image} 
                      alt={feature.alt}
                      width={800}
                      height={571}
                      className="w-full h-full object-cover rounded-xl shadow-lg transform group-hover:scale-[1.02] transition-transform duration-500"
                      data-ai-hint={feature.hint}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 px-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed px-2">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Showcase Section */}
        <section className="relative py-32 overflow-hidden">
          {/* Noise/Grain Background with Animated Glow */}
          <div className="absolute inset-0 bg-foreground z-0">
            <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }} />
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-orange-500/20 via-transparent to-purple-500/20 blur-[120px] pointer-events-none" 
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-background mb-4">
                Experience the Comfort
              </h2>
              <p className="text-3xl md:text-4xl font-display font-bold text-background/90">
                Ride with Confidence
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 backdrop-blur-sm">
                <iframe
                  src={videoShowcase.youtubeVideoUrl}
                  title={videoShowcase.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Social Presence Section */}
        <section id="testimonials" className="py-24 bg-card relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-background border border-border text-[13px] font-medium text-muted-foreground mb-6 shadow-sm">
                Social Presence
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12">
                Trusted by 130k+ Travelers
              </h2>
            </div>

            <div className="relative max-w-5xl mx-auto">
              <Carousel setApi={setEmblaApi} opts={{ loop: true }} className="w-full max-w-xs mx-auto md:max-w-sm">
                <CarouselContent>
                  {socialPresence.videos.map((video, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <div className="w-full md:w-80 aspect-[9/16] rounded-[40px] overflow-hidden bg-muted shadow-2xl relative group border-4 border-card ring-1 ring-black/5 mx-auto">
                          <iframe
                            src={video.src}
                            title={video.title}
                            className="absolute inset-0 w-full h-full"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex items-center justify-center gap-6 mt-12">
                  <CarouselPrevious className="static translate-y-0 w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors" />
                  <div className="flex items-center justify-center gap-2">
                    {Array.from({ length: count }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => emblaApi?.scrollTo(index)}
                        className={cn(
                          "h-1.5 rounded-full transition-all",
                          index === current ? "w-8 bg-foreground" : "w-1.5 bg-muted-foreground/30"
                        )}
                      />
                    ))}
                  </div>
                  <CarouselNext className="static translate-y-0 w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors" />
                </div>
              </Carousel>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 bg-card relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-background border border-border text-[13px] font-medium text-muted-foreground mb-6 shadow-sm">
                Our Team
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12">
                Team Behind the Wheels
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {team.members.map((member, idx) => {
                const image = getPlaceholderImage(member.imageId);
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className="relative text-center group"
                  >
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      {image && (
                         <Image
                           src={image.imageUrl}
                           alt={member.name}
                           width={300}
                           height={300}
                           className="w-full h-full object-cover"
                           data-ai-hint={image.imageHint}
                         />
                      )}
                    </div>
                    <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[calc(100%-40px)]">
                      <div className="bg-card/80 backdrop-blur-sm p-3 rounded-xl shadow-md text-center border border-border/50">
                        <h4 className="text-foreground font-bold text-base leading-tight">{member.name}</h4>
                        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mt-1">{member.role}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-secondary/30 relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="lg:col-span-2">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faq.items.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-card border-border rounded-xl shadow-sm px-6">
                    <AccordionTrigger className="font-semibold text-left text-base hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

      </main>
      
      <footer id="contact" className="bg-background border-t border-border py-12">
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
                <li><Link href="#services" className="text-muted-foreground hover:text-foreground transition-colors">Services</Link></li>
                <li><Link href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Testimonials</Link></li>
                <li><Link href="#booking" className="text-muted-foreground hover:text-foreground transition-colors">Book Now</Link></li>
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
}
