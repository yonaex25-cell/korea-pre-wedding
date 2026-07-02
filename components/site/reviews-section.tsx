import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/section-heading";
import { ReviewCard } from "@/components/site/review-card";
import type { Review } from "@/lib/types";

type ReviewsSectionProps = {
  reviews: Review[];
};

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  return (
    <section className="bg-background py-20">
      <div className="container-shell space-y-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Customer Reviews" title="Couples who planned with Dasoni" description="Real feedback on studio choice, location planning, communication, and final galleries." />
          <Button asChild variant="outline"><Link href="/reviews">View reviews</Link></Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.slice(0, 3).map((review) => <ReviewCard key={review.id} review={review} />)}
        </div>
      </div>
    </section>
  );
}
