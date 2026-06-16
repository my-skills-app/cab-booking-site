export const landingPageData = {
  hero: {
    mainImage: {
      src: "https://i.ibb.co/wh7SdL8R/logo122.png",
      alt: "IndiasCab Founders"
    },
    paragraph: "Experience the most reliable and comfortable cab service in Bihar and UP. Whether it's a one-way trip, a round journey",
    socialProof: {
      images: [
        { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop", alt: "customer 1" },
        { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", alt: "customer 2" },
        { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop", alt: "customer 3" },
        { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", alt: "customer 4" }
      ],
      plusCount: "+50k",
      ratingText: "Trusted by 50,000+ Happy Travelers"
    }
  },
  streamlineBusiness: {
    features: [
      {
        image: "https://i.ibb.co/9339DTmJ/disrepic-app.jpg",
        alt: "One Way Trip Service",
        hint: "cab booking one way",
        title: "Patna To Sitamarhi",
        description: "वन-वे ट्रिप पर बड़ी बचत करें। रिटर्न किराया देने की जरूरत नहीं। Patna से Sitamarhi की यात्रा के लिए बिल्कुल परफेक्ट।",
        price: "₹2599",
        originalPrice: "₹3000",
        discount: "33% OFF",
        dealText: "Family Choice"
      },
      {
        image: "/images/services/roundtrip.png",
        alt: "Round Trip Service",
        hint: "round trip cab",
        title: "Siwan To Dehli",
        description: "मात्र ₹13,999 में Siwan से Delhi जाने का सुनहरा मौका — अब वंदे भारत के साथ आरामदायक और शानदार सफर का आनंद लें।",
        price: "₹13999",
        originalPrice: "₹16000",
        discount: "28% OFF",
        dealText: "Family Choice"
      },
      {
        image: "https://i.ibb.co/Swq8sxf2/audi-offer.png",
        alt: "Airport Transfer Service",
        hint: "airport taxi service",
        title: "Siwan To Gorakhpur",
        description: "Siwan से Gorakhpur तक समय पर और आरामदायक सफर। हम सुनिश्चित करते हैं कि आप अपनी मंज़िल पर बिना किसी देरी के सुरक्षित पहुँचें।",
        price: "₹2999",
        originalPrice: "₹3500",
        discount: "₹501 OFF",
        dealText: "City Travel"
      },
      {
        image: "https://i.ibb.co/csTKXrP/nissan-offer-1.png",
        alt: "Local Trip Service",
        hint: "local cab rental",
        title: "Patna To Darbhanga",
        description: "Patna से Darbhanga के लिए आरामदायक कैब बुक करें। साफ-सुथरी गाड़ियों और बेहतरीन सफर की पूरी गारंटी।",
        price: "₹2699",
        originalPrice: "₹3000",
        discount: "25% OFF",
        dealText: "City Travel"
      }

    ]
  },

  videoShowcase: {
    youtubeVideoUrl: "https://www.youtube.com/embed/SjRhP-1pElI", // Placeholder, user mentioned keeping it or updating
    title: "Why Choose IndiasCab?"
  },
  socialPresence: {
    videos: [
      {
        src: "https://www.youtube.com/embed/cv9rw7xn4Mc",
        title: "Happy Customer Feedback"
      },
      {
        src: "https://www.youtube.com/embed/xWPXEgAPthQ",
        title: "Our Service in Action"
      },
      {
        src: "https://www.youtube.com/embed/SjRhP-1pElI",
        title: "Customer Travel Experience"
      }
    ]
  },
  portfolio: {
    projects: [
      {
        title: "Economy Hatchback",
        description: "Compact and efficient, perfect for city transfers and small groups.",
        image: "/images/fleet/hatchback.png",
        hint: "Maruti Suzuki Swift",
        price: "₹9/km",
        originalPrice: "₹11/km",
        discount: "18% OFF",
        specs: { passengers: "4", luggage: "2", ac: true }
      },
      {
        title: "Premium Sedan",
        description: "Spacious and comfortable, ideal for long journeys and official trips.",
        image: "/images/fleet/sedan.png",
        hint: "Maruti Suzuki Dzire",
        price: "₹11/km",
        originalPrice: "₹13999",
        discount: "15% OFF",
        specs: { passengers: "4", luggage: "3", ac: true }
      },
      {
        title: "Luxury SUV",
        description: "Large and powerful, best for family outings and group travel.",
        image: "/images/fleet/suv.png",
        hint: "Maruti Suzuki Ertiga/Innova",
        price: "₹3000",
        originalPrice: "₹16000",
        discount: "16% OFF",
        specs: { passengers: "6-7", luggage: "4", ac: true }
      }
    ]
  },
  team: {
    members: [
      { name: "Sanjeev Sahani", role: "Founder of Indiascab", imageId: "team-1" },
      { name: "Rahul Singh", role: "City Expert (8+ yrs exp)", imageId: "team-2" },
      { name: "Amit Yadav", role: "Long Route Specialist", imageId: "team-3" },
      { name: "Mohit Verma", role: "Airport Specialist", imageId: "team-4" }
    ]
  },
  customerReviews: {
    badge: "Customer Reviews",
    title: "What Our Travelers Say",
    subtitle: "Real feedback from thousands of happy customers across Bihar and UP.",
    reviews: [
      {
        name: "Ravi Kumar",
        location: "Patna, Bihar",
        route: "Siwan To Patna",
        rating: 5,
        review: "Bahut accha experience tha! Driver time par aaya aur gaadi bilkul saaf thi. Siwan se Patna ka safar comfortable raha.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
      },
      {
        name: "Priya Sharma",
        location: "Siwan, Bihar",
        route: "Siwan To Delhi",
        rating: 5,
        review: "Delhi ke liye IndiasCab se book kiya. Long route par bhi driver bahut professional tha. Highly recommended!",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
      },
      {
        name: "Amit Singh",
        location: "Gorakhpur, UP",
        route: "Siwan To Gorakhpur",
        rating: 5,
        review: "Airport drop ke liye perfect service. Fixed price thi, koi hidden charge nahi. Will book again.",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop"
      },
      {
        name: "Neha Verma",
        location: "Lucknow, UP",
        route: "Siwan To Lucknow",
        rating: 4,
        review: "Family ke saath travel kiya. SUV comfortable thi aur driver bahut helpful tha. Safe journey!",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
      },
      {
        name: "Suresh Yadav",
        location: "Muzaffarpur, Bihar",
        route: "Patna To Muzaffarpur",
        rating: 5,
        review: "One-way trip book ki thi. Price bahut reasonable thi aur cab time par mil gayi. Best cab service in Bihar!",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
      },
      {
        name: "Anjali Gupta",
        location: "Darbhanga, Bihar",
        route: "Patna To Darbhanga",
        rating: 5,
        review: "Shaadi ke liye cab book ki thi. Gaadi bahut acchi thi aur driver punctual tha. Sab guests ko pasand aaya!",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
      }
    ]
  },
  faq: {
    items: [
      {
        question: "How do I book a IndiasCab?",
        answer: "You can book directly via our website form or call us on our 24/7 helpline number. We provide instant confirmation."
      },
      {
        question: "What are the per-km charges?",
        answer: "Charges vary by car type: Hatchback (₹9/km), Sedan (₹11/km), and SUV (₹3000). We also have fixed route pricing for major cities."
      },
      {
        question: "Do you provide airport pick-up services?",
        answer: "Yes, we specialize in airport transfers to and from Patna and Gorakhpur airports. Fixed rates apply."
      },
      {
        question: "Are there any hidden charges?",
        answer: "No, our pricing is transparent. Tolls and parking are extra as per actuals, and we inform you about all costs upfront."
      }
    ]
  }
};
