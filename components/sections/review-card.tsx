import { Star } from "lucide-react";
import type { Review } from "@/lib/types";
import { formatDate } from "@/lib/format";

export function ReviewCard({ review }: { review: Review }) {
  const formattedDate = formatDate(review.publishedAt || review.createdAt);

  return (
    <article className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="flex gap-1 text-primary">
        {Array.from({ length: review.rating }).map((_, index) => (
          <Star key={index} className="h-4 w-4 fill-primary" />
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">"{review.body}"</p>
      <div className="mt-5 border-t pt-4">
        <p className="font-semibold">{review.customerName}</p>
        <p className="text-xs text-muted-foreground">
          {review.location}
          {formattedDate ? ` - ${formattedDate}` : ""}
        </p>
      </div>
    </article>
  );
}