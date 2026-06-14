import { landingPageData } from "@/lib/landing-page-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { siteConfig } from "@/lib/site-config";
import type { SiteContent } from "@/lib/types";

export function getStaticFallbackContent(): SiteContent {
  return {
    settings: {
      phoneNumber: siteConfig.phoneNumber,
      contactEmail: siteConfig.contactEmail,
    },
    pricingFares: landingPageData.streamlineBusiness.features.map((f, i) => ({
      _id: `static-${i}`,
      title: f.title,
      description: f.description,
      price: (f as { price: string }).price,
      originalPrice: (f as { originalPrice: string }).originalPrice,
      discount: (f as { discount: string }).discount,
      dealText: (f as { dealText: string }).dealText,
      image: f.image,
      alt: f.alt,
      hint: f.hint,
      order: i,
    })),
    popularFares: [
      { _id: "static-p1", route: "Siwan To Patna", price: "₹ 2599", order: 0 },
      { _id: "static-p2", route: "Siwan To Lucknow", price: "₹ 7999", order: 1 },
      { _id: "static-p3", route: "Patna to Muzaffarpur", price: "₹ 1799", order: 2 },
      { _id: "static-p4", route: "Patna To Motihari", price: "₹ 3199", order: 3 },
    ],
    teamMembers: landingPageData.team.members.map((m, i) => {
      const img = PlaceHolderImages.find((p) => p.id === m.imageId);
      return {
        _id: `static-t${i}`,
        name: m.name,
        role: m.role,
        imageUrl: img?.imageUrl || "",
        order: i,
      };
    }),
    testimonialVideos: landingPageData.socialPresence.videos.map((v, i) => ({
      _id: `static-v${i}`,
      src: v.src,
      title: v.title,
      order: i,
    })),
    customerReviews: landingPageData.customerReviews.reviews.map((r, i) => ({
      ...r,
      _id: `static-r${i}`,
    })),
  };
}
