'use client';

import {
  Mail,
  MapPin,
  Phone,
  User,
  Book,
  MessageSquare,
  Car,
  Coins,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { contactPageData } from '@/lib/contact-page-data';
import { siteConfig } from '@/lib/site-config';
import { BookingForm } from '@/components/BookingForm';

const ContactPage = () => {
  const { header, info, form } = contactPageData;
  
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <main className="pt-48 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Left Side: Booking Info (As requested in image) */}
            <div className="space-y-12">
              <div className="text-center md:text-left">
                <span className="text-sm font-bold text-primary uppercase tracking-widest">
                  Quick Booking
                </span>
                <h1 className="text-4xl md:text-6xl font-black mt-2 leading-tight">
                  Book Your Ride <br /> <span className="text-blue-600">Instantly</span>
                </h1>
              </div>

              <div className="space-y-10">
                <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
                  <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center shadow-lg">
                    <Car className="w-8 h-8 text-red-500" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-wide">Oneway Trips</h3>
                    <p className="text-muted-foreground mt-2 leading-relaxed">
                      Simplify your travel with affordable and convenient one-way rides. Perfect for single-destination journeys without the hassle of return fares.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
                  <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center shadow-lg">
                    <Coins className="w-8 h-8 text-yellow-600" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-wide">Roundtrip Cabs</h3>
                    <p className="text-muted-foreground mt-2 leading-relaxed">
                      Enjoy seamless and comfortable travel with our roundtrip cab services. Ideal for exploring your destination with the convenience of a scheduled return.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Booking Form */}
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-600/5 blur-3xl rounded-[40px] -z-10" />
              <BookingForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
