export const landingPageData = {
  hero: {
    mainImage: {
      src: "https://i.ibb.co/f7MHd4J/Add-a-heading-1.png",
      alt: "ZoyaCab Founders"
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
        image: "https://i.ibb.co/20j2MCRR/Untitled-design-2.jpg",
        alt: "One Way Trip Service",
        hint: "cab booking one way",
        title: "One Way Drops (Intercity)",
        description: "Save big on one-way trips. No return fare required. Perfect for travel from Siwan to Patna or Gorakhpur.",
        price: "₹10/km",
        originalPrice: "₹15/km",
        discount: "33% OFF",
        dealText: "Most Booked"
      },
      {
        image: "/images/services/roundtrip.png",
        alt: "Round Trip Service",
        hint: "round trip cab",
        title: "Outstation Round Trips",
        description: "Enjoy a relaxed journey with our family-friendly drivers. Best for weekend getaways from Siwan.",
        price: "₹13/km",
        originalPrice: "₹18/km",
        discount: "28% OFF",
        dealText: "Family Choice"
      },
      {
        image: "https://i.ibb.co/CsVH5y3H/Untitled-design-1.jpg",
        alt: "Airport Transfer Service",
        hint: "airport taxi service",
        title: "Patna Airport (Fixed Rate)",
        description: "Punctual drops to Patna Airport. We ensure you reach well before your flight check-in time.",
        price: "₹2499",
        originalPrice: "₹3499",
        discount: "₹1000 OFF",
        dealText: "Bestseller"
      },
      {
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80",
        alt: "Local Trip Service",
        hint: "local cab rental",
        title: "Full Day Local Hire",
        description: "Book a cab for 8 hours/80km for city shopping or multiple meetings. Clean cars guaranteed.",
        price: "₹2100",
        originalPrice: "₹2800",
        discount: "25% OFF",
        dealText: "City Travel"
      },
      {
        image: "/images/services/marriage.png",
        alt: "Marriage Booking Service",
        hint: "wedding car rental",
        title: "Wedding & Event Cars",
        description: "Make your entry special with our decorated luxury cars. We handle group bookings for guests too.",
        price: "₹4500",
        originalPrice: "₹6000",
        discount: "₹1500 OFF",
        dealText: "Luxury"
      },
      {
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80",
        alt: "Corporate Booking Service",
        hint: "corporate car rental",
        title: "Monthly Staff Pick-up",
        description: "Hassle-free monthly contracts for businesses. Reliable service for your team in Siwan & beyond.",
        price: "₹25k/mo",
        originalPrice: "₹35k/mo",
        discount: "₹10k OFF",
        dealText: "Business"
      }
    ]
  },

  videoShowcase: {
    youtubeVideoUrl: "https://www.youtube.com/embed/SjRhP-1pElI", // Placeholder, user mentioned keeping it or updating
    title: "Why Choose ZoyaCab?"
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
        originalPrice: "₹13/km",
        discount: "15% OFF",
        specs: { passengers: "4", luggage: "3", ac: true }
      },
      {
        title: "Luxury SUV",
        description: "Large and powerful, best for family outings and group travel.",
        image: "/images/fleet/suv.png",
        hint: "Maruti Suzuki Ertiga/Innova",
        price: "₹15/km",
        originalPrice: "₹18/km",
        discount: "16% OFF",
        specs: { passengers: "6-7", luggage: "4", ac: true }
      }
    ]
  },
  team: {
    members: [
      { name: "Suresh Kumar", role: "Elite Driver (10+ yrs exp)", imageId: "team-1" },
      { name: "Rahul Singh", role: "City Expert (8+ yrs exp)", imageId: "team-2" },
      { name: "Amit Yadav", role: "Long Route Specialist", imageId: "team-3" },
      { name: "Mohit Verma", role: "Airport Specialist", imageId: "team-4" }
    ]
  },
  faq: {
    items: [
      {
        question: "How do I book a ZoyaCab?",
        answer: "You can book directly via our website form or call us on our 24/7 helpline number. We provide instant confirmation."
      },
      {
        question: "What are the per-km charges?",
        answer: "Charges vary by car type: Hatchback (₹9/km), Sedan (₹11/km), and SUV (₹15/km). We also have fixed route pricing for major cities."
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
