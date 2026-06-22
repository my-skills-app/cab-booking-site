import mongoose, { Schema, models, model } from "mongoose";

const SocialLinksSchema = new Schema(
  {
    whatsapp: { type: String, default: "" },
    facebook: { type: String, default: "" },
    instagram: { type: String, default: "" },
    telegram: { type: String, default: "" },
    youtube: { type: String, default: "" },
    twitter: { type: String, default: "" },
  },
  { _id: false }
);

const SettingsSchema = new Schema(
  {
    key: { type: String, unique: true, default: "site" },
    phoneNumber: { type: String, required: true },
    contactEmail: { type: String, required: true },
    socialLinks: { type: SocialLinksSchema, default: () => ({}) },
  },
  { timestamps: true }
);

const PricingFareSchema = new Schema(
  {
    title: String,
    description: String,
    price: String,
    originalPrice: String,
    discount: String,
    dealText: String,
    image: String,
    alt: String,
    hint: String,
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const PopularFareSchema = new Schema(
  {
    route: String,
    price: String,
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const TeamMemberSchema = new Schema(
  {
    name: String,
    role: String,
    imageUrl: String,
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const TestimonialVideoSchema = new Schema(
  {
    src: String,
    title: String,
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const CustomerReviewSchema = new Schema(
  {
    name: String,
    location: String,
    route: String,
    rating: { type: Number, default: 5 },
    review: String,
    avatar: String,
  },
  { timestamps: true }
);

const BookingSchema = new Schema(
  {
    bookingType: String,
    vehicleType: String,
    pickup: String,
    drop: String,
    date: String,
    time: String,
    name: String,
    phone: String,
  },
  { timestamps: true }
);

export const Settings = models.Settings || model("Settings", SettingsSchema);
export const PricingFare = models.PricingFare || model("PricingFare", PricingFareSchema);
export const PopularFare = models.PopularFare || model("PopularFare", PopularFareSchema);
export const TeamMember = models.TeamMember || model("TeamMember", TeamMemberSchema);
export const TestimonialVideo = models.TestimonialVideo || model("TestimonialVideo", TestimonialVideoSchema);
export const CustomerReview = models.CustomerReview || model("CustomerReview", CustomerReviewSchema);
export const Booking = models.Booking || model("Booking", BookingSchema);

export function serializeDoc<T extends { _id?: mongoose.Types.ObjectId }>(doc: T) {
  const { _id, ...rest } = doc;
  return { _id: _id?.toString(), ...rest };
}
