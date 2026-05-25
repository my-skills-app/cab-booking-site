import { siteConfig } from "@/lib/site-config";

export function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": siteConfig.siteUrl,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    logo: siteConfig.logoUrl,
    image: siteConfig.logoUrl,
    telephone: siteConfig.phoneNumber,
    email: siteConfig.contactEmail,
    priceRange: "$$",
    openingHours: "Mo-Su 09:00-19:00",
    areaServed: [
      { "@type": "State", name: "Bihar" },
      { "@type": "State", name: "Uttar Pradesh" },
    ],
    address: [
      {
        "@type": "PostalAddress",
        streetAddress:
          "दिशा आशियाना मेन रोड, केन्द्रीय आवास बोर्ड के नजदीक",
        addressLocality: "Patna",
        addressRegion: "Bihar",
        postalCode: "800024",
        addressCountry: "IN",
      },
      {
        "@type": "PostalAddress",
        streetAddress:
          "स्टेशन रोड, जनता लॉज के बगल में, हाजी मार्केट, सिवानमार्केट",
        addressLocality: "Siwan",
        addressRegion: "Bihar",
        addressCountry: "IN",
      },
    ],
    sameAs: [],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cab Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "One-Way Cab",
            description:
              "Affordable one-way cab service across Bihar and UP routes",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Round Trip Cab",
            description:
              "Round trip cab booking for comfortable return journeys",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Airport Taxi",
            description:
              "Patna airport taxi service with timely pickups and drops",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Outstation Cab",
            description:
              "Outstation cab service to Delhi, Varanasi, Lucknow, Gorakhpur and more",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "2500",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.siteUrl}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
