import type { CustomerReview } from "@/lib/types";

const NAMES = [
  "Ravi Kumar", "Priya Sharma", "Amit Singh", "Neha Verma", "Suresh Yadav",
  "Anjali Gupta", "Vikash Rai", "Pooja Kumari", "Rajesh Prasad", "Kavita Devi",
  "Manoj Tiwari", "Sunita Singh", "Deepak Kumar", "Rekha Sharma", "Arun Mishra",
];

const LOCATIONS = [
  "Patna, Bihar", "Siwan, Bihar", "Gorakhpur, UP", "Lucknow, UP",
  "Muzaffarpur, Bihar", "Darbhanga, Bihar", "Chhapra, Bihar", "Gaya, Bihar",
];

const ROUTES = [
  "Siwan To Patna", "Siwan To Delhi", "Siwan To Gorakhpur", "Siwan To Lucknow",
  "Patna To Muzaffarpur", "Patna To Darbhanga", "Patna To Sitamarhi", "Patna To Motihari",
];

const REVIEW_TEMPLATES = [
  "Bahut accha experience tha! Driver time par aaya aur gaadi bilkul saaf thi. Safar comfortable raha.",
  "IndiaCab se book kiya. Driver bahut professional tha. Highly recommended!",
  "Fixed price thi, koi hidden charge nahi. Will book again.",
  "Family ke saath travel kiya. Gaadi comfortable thi aur driver helpful tha. Safe journey!",
  "One-way trip book ki thi. Price reasonable thi aur cab time par mil gayi.",
  "Shaadi ke liye cab book ki thi. Gaadi acchi thi aur driver punctual tha.",
  "Long route par bhi service bahut acchi thi. Sab kuch smooth raha.",
  "Airport drop ke liye perfect service. Punctual and clean cab.",
];

const AVATARS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateFakeReview(): Omit<CustomerReview, "_id"> {
  const route = pick(ROUTES);
  return {
    name: pick(NAMES),
    location: pick(LOCATIONS),
    route,
    rating: Math.random() > 0.2 ? 5 : 4,
    review: pick(REVIEW_TEMPLATES),
    avatar: pick(AVATARS),
  };
}
