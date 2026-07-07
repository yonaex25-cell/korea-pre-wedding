"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { t } = useLanguage();
  const trustItems = [t.hero.trustStudio, t.hero.trustDestination, t.hero.trustConcierge];

  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <Image
        src="https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1800&q=90"
        alt="Elegant Korean wedding photography couple portrait"
        fill
        sizes="100vw"
        className="-z-20 object-cover"
        priority
      />
      <div className="hero-scrim absolute inset-0 -z-10" />

      <div className="container-shell relative grid min-h-[calc(100vh-4rem)] items-center gap-10 pb-24 pt-24 md:pb-28 md:pt-28 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.72fr)]">
        <div className="max-w-3xl animate-reveal space-y-7">
          <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/30 bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur">
            <Sparkles className="size-4 shrink-0" aria-hidden /> {t.hero.eyebrow}
          </p>
          <div className="space-y-5">
            <h1 className="text-5xl font-semibold leading-[1.06] md:text-7xl">{t.hero.title}</h1>
            <p className="max-w-2xl text-lg leading-8 text-white/86 md:text-xl">{t.hero.description}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/studios">
                {t.hero.primaryCta} <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/40 bg-white/12 text-white hover:bg-white/20">
              <Link href="/reservation">
                <CalendarDays aria-hidden /> {t.hero.secondaryCta}
              </Link>
            </Button>
          </div>
        </div>

        <div className="hidden justify-self-end rounded-lg border border-white/24 bg-white/14 p-5 shadow-soft backdrop-blur-xl lg:block lg:w-full lg:max-w-md">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-white/10">
            <Image
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=90"
              alt={t.hero.cardAlt}
              fill
              sizes="(min-width: 1024px) 420px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="mt-5 grid gap-3 text-sm text-white/86">
            {trustItems.map((item) => (
              <span key={item} className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" aria-hidden /> {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-white/20 bg-white/10 py-4 backdrop-blur-md">
        <div className="container-shell grid gap-3 text-sm text-white/86 sm:grid-cols-3">
          {trustItems.map((item) => <span key={item}>{item}</span>)}
        </div>
      </div>
    </section>
  );
}
