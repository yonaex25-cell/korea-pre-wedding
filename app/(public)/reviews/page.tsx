import type { Metadata } from "next";
import { ReviewCard } from "@/components/site/review-card";
import { SectionHeading } from "@/components/site/section-heading";
import { getReviews } from "@/lib/studio-service";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Reviews from couples who planned Korean wedding photography with Dasoni."
};

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <main className="bg-background">
      <section className="container-shell space-y-10 py-14 md:py-20">
        <SectionHeading
          eyebrow="Reviews"
          title="Couple reviews"
          description="See how couples experienced studio matching, destination planning, and final galleries."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
        </div>
      </section>
    </main>
  );
}
