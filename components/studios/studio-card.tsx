import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Studio } from "@/lib/types";
import { formatCurrencyJPY } from "@/lib/utils";

export function StudioCard({ studio, priority = false }: { studio: Studio; priority?: boolean }) {
  return (
    <article className="group overflow-hidden rounded-lg border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-luxury">
      <Link href={`/studios/${studio.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={studio.heroImage}
            alt={`${studio.name} wedding portfolio`}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          <Badge>{studio.region}</Badge>
          {studio.styles.slice(0, 2).map((style) => (
            <Badge key={style} className="border-rosewood/20 bg-rosewood/10 text-rosewood">
              {style}
            </Badge>
          ))}
        </div>
        <h3 className="mt-4 text-xl font-semibold">{studio.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{studio.summary}</p>
        <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> {studio.region}</span>
          <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" /> {studio.durationHours} hours</span>
          <span className="inline-flex items-center gap-2"><Star className="h-4 w-4 fill-primary text-primary" /> {studio.rating} ({studio.reviewCount})</span>
        </div>
        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="text-sm">
            <span className="text-muted-foreground">From </span>
            <span className="font-semibold">{formatCurrencyJPY(studio.priceFromJpy)}</span>
          </p>
          <Button asChild variant="outline" size="sm">
            <Link href={`/studios/${studio.slug}`}>View <ArrowRight /></Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
