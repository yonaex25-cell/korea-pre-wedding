"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/section-heading";
import { StudioCard } from "@/components/studios/studio-card";
import { useLanguage } from "@/components/providers/language-provider";
import type { Studio } from "@/lib/types";

type FeaturedStudiosProps = {
  studios: Studio[];
};

export function FeaturedStudios({ studios }: FeaturedStudiosProps) {
  const { text } = useLanguage();

  return (
    <section className="bg-background py-20">
      <div className="container-shell space-y-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={text.home.featuredEyebrow}
            title={text.home.featuredTitle}
            description={text.home.featuredDescription}
          />
          <Button asChild variant="outline">
            <Link href="/studios">{text.home.viewAll} <ArrowRight aria-hidden /></Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {studios.map((studio) => <StudioCard key={studio.id} studio={studio} />)}
        </div>
      </div>
    </section>
  );
}