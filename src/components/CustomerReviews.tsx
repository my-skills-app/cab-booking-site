"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";

export type CustomerReview = {
  name: string;
  location: string;
  route: string;
  rating: number;
  review: string;
  avatar: string;
};

type CustomerReviewsProps = {
  badge: string;
  title: string;
  subtitle: string;
  reviews: CustomerReview[];
};

function ReviewCard({ review }: { review: CustomerReview }) {
  return (
    <div className="flex-shrink-0 w-[320px] sm:w-[380px] bg-background rounded-2xl border border-border shadow-sm p-6 mx-3">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/10 shrink-0">
            <Image
              src={review.avatar}
              alt={review.name}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-bold text-foreground text-sm">{review.name}</h4>
            <p className="text-xs text-muted-foreground">{review.location}</p>
          </div>
        </div>
        <Quote size={20} className="text-primary/20 shrink-0" />
      </div>

      <div className="flex items-center gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30"}
          />
        ))}
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
        &ldquo;{review.review}&rdquo;
      </p>

      <span className="inline-block text-[11px] font-semibold text-primary bg-primary/5 px-2.5 py-1 rounded-full">
        {review.route}
      </span>
    </div>
  );
}

export function CustomerReviews({ badge, title, subtitle, reviews }: CustomerReviewsProps) {
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="py-24 bg-card relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-background border border-border text-[13px] font-medium text-muted-foreground mb-6 shadow-sm">
            {badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />

        <div className="flex animate-review-marquee hover:[animation-play-state:paused] w-max">
          {duplicatedReviews.map((review, index) => (
            <ReviewCard key={`${review.name}-${index}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
