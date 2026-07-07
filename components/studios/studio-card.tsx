"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/components/providers/language-provider";
import { formatJPY } from "@/lib/format";
import type { Studio } from "@/lib/types";

type StudioCardProps = {
  studio: Studio;
};

export function StudioCard({ studio }: StudioCardProps) {
  const { text } = useLanguage();

  return (
    <Card className="group overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-gold">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={studio.coverImage} alt={studio.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {studio.featured ? <Badge>{text.studioCard.featured}</Badge> : null}
          <Badge className="bg-white/88 backdrop-blur">{studio.region}</Badge>
        </div>
      </div>
      <CardContent className="space-y-4 p-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-2xl font-semibold text-ink">{studio.name}</h3>
            <span className="flex items-center gap-1 text-sm font-semibold text-gold-700"><Star className="size-4 fill-gold-500" aria-hidden /> {studio.rating}</span>
          </div>
          <p className="flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="size-4" aria-hidden /> {studio.city}, {studio.region}</p>
          <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">{studio.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {studio.styles.map((style) => <Badge key={style}>{style}</Badge>)}
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
          <div>
            <p className="text-xs text-muted-foreground">{text.studioCard.from}</p>
            <p className="font-semibold text-ink">{formatJPY(studio.priceFrom)}</p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href={"/studios/" + studio.slug}>{text.studioCard.details} <ArrowRight aria-hidden /></Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}