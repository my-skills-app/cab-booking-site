export type SiteSettings = {
  phoneNumber: string;
  contactEmail: string;
};

export type PricingFare = {
  _id?: string;
  title: string;
  description: string;
  price: string;
  originalPrice: string;
  discount: string;
  dealText: string;
  image: string;
  alt: string;
  hint: string;
  order: number;
};

export type PopularFare = {
  _id?: string;
  route: string;
  price: string;
  order: number;
};

export type TeamMember = {
  _id?: string;
  name: string;
  role: string;
  imageUrl: string;
  order: number;
};

export type TestimonialVideo = {
  _id?: string;
  src: string;
  title: string;
  order: number;
};

export type CustomerReview = {
  _id?: string;
  name: string;
  location: string;
  route: string;
  rating: number;
  review: string;
  avatar: string;
};

export type BookingSubmission = {
  _id?: string;
  bookingType: string;
  vehicleType: string;
  pickup: string;
  drop: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  createdAt?: string;
};

export type SiteContent = {
  settings: SiteSettings;
  pricingFares: PricingFare[];
  popularFares: PopularFare[];
  teamMembers: TeamMember[];
  testimonialVideos: TestimonialVideo[];
  customerReviews: CustomerReview[];
};
