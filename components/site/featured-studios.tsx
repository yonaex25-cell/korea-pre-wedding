"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/section-heading";
import { StudioCard } from "@/components/studios/studio-card";
import type { Studio } from "@/lib/types";

type FeaturedStudiosProps = {
  studios: Studio[];
};

export function FeaturedStudios({ studios }: FeaturedStudiosProps) {
  const { t } = useLanguage();

  return (
    <section className="bg-background py-20">
      <div className="container-shell space-y-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={t.home.featuredEyebrow}
            title={t.home.featuredTitle}
            description={t.home.featuredDescription}
          />
          <Button asChild variant="outline">
            <Link href="/studios">
              {t.home.featuredCta} <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {studios.map((studio) => <StudioCard key={studio.id} studio={studio} />)}
        </div>
      </div>
    </section>
  );
}
