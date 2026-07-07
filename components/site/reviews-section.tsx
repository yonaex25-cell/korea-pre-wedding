"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/section-heading";
import { ReviewCard } from "@/components/site/review-card";
import { useLanguage } from "@/components/providers/language-provider";
import type { Review } from "@/lib/types";

type ReviewsSectionProps = {
  reviews: Review[];
};

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const { text } = useLanguage();

  return (
    <section className="bg-background py-20">
      <div className="container-shell space-y-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={text.home.reviewsEyebrow} title={text.home.reviewsTitle} description={text.home.reviewsDescription} />
          <Button asChild variant="outline"><Link href="/reviews">{text.home.viewReviews}</Link></Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.slice(0, 3).map((review) => <ReviewCard key={review.id} review={review} />)}
        </div>
      </div>
    </section>
  );
}