import type { Metadata } from "next";
import { ReviewCard } from "@/components/sections/review-card";
import { getReviews } from "@/lib/repository";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Read customer reviews from Japanese couples who booked Korean wedding studios."
};

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <section className="section-shell py-14">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.22em] text-primary">Reviews</p>
        <h1 className="mt-3 text-5xl font-semibold">Real planning experiences from Japan.</h1>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
      </div>
    </section>
  );
}
