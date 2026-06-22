import { landingPageData } from "@/lib/landing-page-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { siteConfig } from "@/lib/site-config";
import {
  Settings,
  PricingFare,
  PopularFare,
  TeamMember,
  TestimonialVideo,
  CustomerReview,
} from "@/lib/models";

export async function seedDatabaseIfEmpty() {
  const settingsCount = await Settings.countDocuments();
  if (settingsCount > 0) return false;

  await insertStaticData();
  return true;
}

/** Clears content collections and inserts all static landing page data. */
export async function forceSeedDatabase() {
  await PricingFare.deleteMany({});
  await PopularFare.deleteMany({});
  await TeamMember.deleteMany({});
  await TestimonialVideo.deleteMany({});
  await CustomerReview.deleteMany({});
  await Settings.deleteMany({});

  await insertStaticData();
  return true;
}

async function insertStaticData() {
  await Settings.create({
    key: "site",
    phoneNumber: siteConfig.phoneNumber,
    contactEmail: siteConfig.contactEmail,
    socialLinks: {
      whatsapp: "",
      facebook: "",
      instagram: "",
      telegram: "",
      youtube: "",
      twitter: "",
    },
  });

  const features = landingPageData.streamlineBusiness.features;
  await PricingFare.insertMany(
    features.map((f, i) => ({
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
    }))
  );

  const popularRoutes = [
    { route: "Siwan To Patna", price: "₹ 2599" },
    { route: "Siwan To Lucknow", price: "₹ 7999" },
    { route: "Patna to Muzaffarpur", price: "₹ 1799" },
    { route: "Patna To Motihari", price: "₹ 3199" },
  ];
  await PopularFare.insertMany(popularRoutes.map((r, i) => ({ ...r, order: i })));

  const members = landingPageData.team.members;
  await TeamMember.insertMany(
    members.map((m, i) => {
      const img = PlaceHolderImages.find((p) => p.id === m.imageId);
      return {
        name: m.name,
        role: m.role,
        imageUrl: img?.imageUrl || "",
        order: i,
      };
    })
  );

  await TestimonialVideo.insertMany(
    landingPageData.socialPresence.videos.map((v, i) => ({
      src: v.src,
      title: v.title,
      order: i,
    }))
  );

  await CustomerReview.insertMany(landingPageData.customerReviews.reviews);
}

export async function getSeedCounts() {
  return {
    settings: await Settings.countDocuments(),
    pricingFares: await PricingFare.countDocuments(),
    popularFares: await PopularFare.countDocuments(),
    teamMembers: await TeamMember.countDocuments(),
    testimonialVideos: await TestimonialVideo.countDocuments(),
    customerReviews: await CustomerReview.countDocuments(),
  };
}
