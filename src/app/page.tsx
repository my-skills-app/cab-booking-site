"use client";

import * as React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { motion } from "framer-motion";
import { Car, Coins } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { landingPageData } from "@/lib/landing-page-data";
import { siteConfig } from "@/lib/site-config";
import { BookingForm } from "@/components/BookingForm";
import { CustomerReviews } from "@/components/CustomerReviews";
import { Footer } from "@/components/Footer";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

// Set to true to show the "Trusted by 50,000+ Travelers" section again
const SHOW_SOCIAL_PROOF = false;

const getWhatsAppUrl = (message: string) =>
  `https://wa.me/${siteConfig.phoneNumber.replace("+", "")}?text=${encodeURIComponent(message)}`;

export default function Home() {
  const { streamlineBusiness, videoShowcase, socialPresence, team, faq, customerReviews } = landingPageData;

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
        
        {/* Video Showcase Section (Moved here) */}
        <section className="relative py-24 sm:py-32 overflow-hidden">
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
                Reliable & Safe Travel
              </h2>
              <p className="text-3xl md:text-4xl font-display font-bold text-background/90">
                With IndiaCab
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="relative aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 backdrop-blur-sm">
                <iframe
                  src={videoShowcase.youtubeVideoUrl}
                  title={videoShowcase.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Booking Form Section */}
        <section id="book-ride" className="py-16 sm:py-24 bg-card relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              <div className="space-y-8 text-center lg:text-left">
                <div>
                  <span className="text-sm font-bold text-primary uppercase tracking-widest">
                    Quick Booking
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black mt-2 leading-tight">
                    Book Your Ride <span className="text-blue-600">Instantly</span>
                  </h2>
                  <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                    Fill in your trip details and our team will call you back within minutes to confirm your cab.
                  </p>
                </div>

                <div className="space-y-6 sm:space-y-8">
                  <div className="flex flex-col sm:flex-row lg:flex-col items-center lg:items-start text-center lg:text-left gap-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-100 flex items-center justify-center shadow-lg shrink-0">
                      <Car className="w-7 h-7 sm:w-8 sm:h-8 text-red-500" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide">Oneway Trips</h3>
                      <p className="text-muted-foreground mt-2 text-sm sm:text-base leading-relaxed">
                        Affordable one-way rides without return fare hassle.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col items-center lg:items-start text-center lg:text-left gap-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-yellow-100 flex items-center justify-center shadow-lg shrink-0">
                      <Coins className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-600" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide">Roundtrip Cabs</h3>
                      <p className="text-muted-foreground mt-2 text-sm sm:text-base leading-relaxed">
                        Comfortable round trips with scheduled return pickup.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative w-full">
                <div className="absolute -inset-2 sm:-inset-4 bg-blue-600/5 blur-3xl rounded-[40px] -z-10" />
                <BookingForm />
              </div>
            </div>
          </div>
        </section>

        {/* Streamline Business Section (Now Pricing) */}
        <section id="pricing" className="py-24 bg-secondary/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-card border border-border text-[13px] font-medium text-muted-foreground mb-6 shadow-sm">
                Our Services
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground max-w-2xl mx-auto leading-tight">
                Flexible Cab Booking Options for Every Need
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
                  className="bg-card rounded-2xl sm:rounded-[32px] p-5 sm:p-8 border border-border shadow-sm hover:shadow-lg transition-all duration-500 group"
                >
                  <div className="aspect-[1.6/1] sm:aspect-[1.4/1] rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-8 bg-background border flex items-center justify-center p-2 sm:p-4 relative">
                    <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20">
                      <span className="bg-red-600 text-white text-[9px] sm:text-[10px] font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-wider shadow-lg">{(feature as any).dealText}</span>
                    </div>
                    <Image 
                      src={feature.image} 
                      alt={feature.alt}
                      width={800}
                      height={571}
                      className="w-full h-full object-cover rounded-lg sm:rounded-xl shadow-lg transform group-hover:scale-[1.02] transition-transform duration-500"
                      data-ai-hint={feature.hint}
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-3 px-1 sm:px-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed px-1 sm:px-2 mb-3 sm:mb-4">
                    {feature.description}
                  </p>
                  <div className="px-1 sm:px-2 mb-4 sm:mb-6 flex flex-col gap-0.5 sm:gap-1">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-xl sm:text-2xl font-black text-primary">{(feature as any).price}</span>
                      <span className="bg-red-100 text-red-600 text-[10px] sm:text-[11px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md">SAVE {(feature as any).discount}</span>
                    </div>
                    <span className="text-xs sm:text-sm text-muted-foreground line-through opacity-50 ml-0.5 sm:ml-1">M.R.P: {(feature as any).originalPrice}</span>
                  </div>
                  <div className="mt-4 sm:mt-8 px-1 sm:px-2">
                    <Button asChild className="w-full h-11 sm:h-14 rounded-lg sm:rounded-xl bg-primary hover:bg-primary/90 transition-all shadow-md text-base sm:text-lg font-semibold">
                      <Link
                        href={getWhatsAppUrl(`Hello IndiaCab, I want to book ${feature.title} at ${(feature as any).price}.`)}
                        target="_blank"
                      >
                        Book Now
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Presence Section — temporarily hidden (set SHOW_SOCIAL_PROOF = true to restore) */}
        {SHOW_SOCIAL_PROOF && (
        <section className="py-24 bg-card relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-background border border-border text-[13px] font-medium text-muted-foreground mb-6 shadow-sm">
                Social Proof
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12">
                Trusted by 50,000+ Travelers
              </h2>
            </div>

            <div className="relative max-w-7xl mx-auto">
              <Carousel setApi={setEmblaApi} opts={{ loop: true, align: "start" }} className="w-full">
                <CarouselContent>
                  {socialPresence.videos.map((video, index) => (
                    <CarouselItem key={index} className="basis-full sm:basis-1/2 lg:basis-1/3">
                      <div className="p-2">
                        <div className="w-full aspect-[9/16] rounded-[32px] sm:rounded-[40px] overflow-hidden bg-muted shadow-2xl relative group border-4 border-card ring-1 ring-black/5">
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
        )}

        <CustomerReviews
          badge={customerReviews.badge}
          title={customerReviews.title}
          subtitle={customerReviews.subtitle}
          reviews={customerReviews.reviews}
        />

        {/* Team Section */}
        <section className="py-24 bg-card relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-background border border-border text-[13px] font-medium text-muted-foreground mb-6 shadow-sm">
                Our Expert Drivers
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12">
                The Hands Behind the Wheel
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
      
      <Footer />
    </div>
  );
}
