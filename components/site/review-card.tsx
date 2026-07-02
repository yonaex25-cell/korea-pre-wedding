import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import type { Review } from "@/lib/types";

type ReviewCardProps = {
  review: Review;
};

export function ReviewCard({ review }: ReviewCardProps) {
  const formattedDate = formatDate(review.createdAt);

  return (
    <Card className="overflow-hidden">
      {review.imageUrl ? (
        <div className="relative aspect-[16/10]">
          <Image
            src={review.imageUrl}
            alt={review.customerName}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <CardContent className="space-y-4 p-5">
        <div className="flex items-center gap-1 text-gold-700" aria-label={review.rating + " stars"}>
          {Array.from({ length: review.rating }).map((_, index) => (
            <Star key={index} className="size-4 fill-gold-500" aria-hidden />
          ))}
        </div>
        <p className="text-sm leading-7 text-muted-foreground">{review.content}</p>
        <div>
          <p className="font-semibold text-ink">{review.customerName}</p>
          {review.studioSlug ? (
            <Link href={"/studios/" + review.studioSlug} className="text-sm text-gold-700 hover:underline">
              {review.studioName}
            </Link>
          ) : (
            <p className="text-sm text-muted-foreground">{review.studioName}</p>
          )}
          {formattedDate ? <p className="text-xs text-muted-foreground">{formattedDate}</p> : null}
        </div>
      </CardContent>
    </Card>
  );
}