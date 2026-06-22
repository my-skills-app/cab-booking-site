import { cache } from "react";
import { connectDB } from "@/lib/mongodb";
import { seedDatabaseIfEmpty } from "@/lib/seed";
import {
  Settings,
  PricingFare,
  PopularFare,
  TeamMember,
  TestimonialVideo,
  CustomerReview,
  serializeDoc,
} from "@/lib/models";
import type { SiteContent, SiteSettings } from "@/lib/types";
import { getStaticFallbackContent } from "@/lib/static-fallback";
import { normalizeSiteSettings } from "@/lib/site-settings";

const defaultSettings: SiteSettings = normalizeSiteSettings(null);

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  try {
    await connectDB();
    const settings = await Settings.findOne({ key: "site" });
    if (!settings) return defaultSettings;
    return normalizeSiteSettings(settings.toObject());
  } catch {
    return defaultSettings;
  }
});

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  try {
    await connectDB();
    await seedDatabaseIfEmpty();

    const [settings, pricingFares, popularFares, teamMembers, testimonialVideos, customerReviews] =
      await Promise.all([
        Settings.findOne({ key: "site" }),
        PricingFare.find().sort({ order: 1 }),
        PopularFare.find().sort({ order: 1 }),
        TeamMember.find().sort({ order: 1 }),
        TestimonialVideo.find().sort({ order: 1 }),
        CustomerReview.find().sort({ createdAt: -1 }),
      ]);

    return {
      settings: normalizeSiteSettings(settings?.toObject()),
      pricingFares: pricingFares.map((d) => serializeDoc(d.toObject())),
      popularFares: popularFares.map((d) => serializeDoc(d.toObject())),
      teamMembers: teamMembers.map((d) => serializeDoc(d.toObject())),
      testimonialVideos: testimonialVideos.map((d) => serializeDoc(d.toObject())),
      customerReviews: customerReviews.map((d) => serializeDoc(d.toObject())),
    };
  } catch (error) {
    console.error("MongoDB unavailable, using static fallback:", error);
    return getStaticFallbackContent();
  }
});
