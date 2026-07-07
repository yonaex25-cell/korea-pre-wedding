"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";

export function AiCta() {
  const { t } = useLanguage();

  return (
    <section className="bg-champagne py-20">
      <div className="container-shell grid items-center gap-8 lg:grid-cols-[1fr_auto]">
        <div className="max-w-3xl space-y-4">
          <p className="eyebrow">{t.home.aiEyebrow}</p>
          <h2 className="text-3xl font-semibold leading-tight text-ink md:text-5xl">{t.home.aiTitle}</h2>
          <p className="text-base leading-8 text-muted-foreground">{t.home.aiDescription}</p>
        </div>
        <Button asChild size="lg">
          <Link href="/ai-recommendation">
            <Sparkles aria-hidden /> {t.home.aiCta}
          </Link>
        </Button>
      </div>
    </section>
  );
}
