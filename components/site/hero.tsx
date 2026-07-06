"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";

export function Hero() {
  const { text } = useLanguage();

  return (
    <section className="relative isolate overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0 -z-20 bg-[url('https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1800&q=90')] bg-cover bg-center" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-neutral-950/85 via-neutral-950/55 to-rose-500/20" />

      <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center gap-10 px-6 py-24 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.72fr)] lg:px-10">
        <div className="max-w-3xl space-y-7">
          <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/30 bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur">
            <Sparkles className="h-4 w-4 shrink-0" aria-hidden />
            {text.hero.eyebrow}
          </p>

          <div className="space-y-5">
            <h1 className="text-5xl font-semibold leading-[1.06] md:text-7xl">
              {text.hero.title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-white/85 md:text-xl">
              {text.hero.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/studios"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#ff385c] px-6 text-sm font-semibold text-white shadow-lg transition hover:bg-[#e03150]"
            >
              {text.hero.primaryCta}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>

            <Link
              href="/reservation"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/40 bg-white/12 px-6 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              <CalendarDays className="h-4 w-4" aria-hidden />
              {text.hero.secondaryCta}
            </Link>
          </div>
        </div>

        <div className="hidden justify-self-end rounded-xl border border-white/24 bg-white/14 p-5 shadow-2xl backdrop-blur-xl lg:block lg:w-full lg:max-w-md">
          <div className="aspect-[4/5] overflow-hidden rounded-lg bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=90')] bg-cover bg-center" />

          <div className="mt-5 grid gap-3 text-sm text-white/85">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#ff385c]" aria-hidden />
              {text.hero.studioMatching}
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#ff385c]" aria-hidden />
              {text.hero.destinationPlanning}
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#ff385c]" aria-hidden />
              {text.hero.conciergeSupport}
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-white/20 bg-white/10 py-4 backdrop-blur-md">
        <div className="mx-auto grid w-full max-w-7xl gap-3 px-6 text-sm text-white/85 sm:grid-cols-3 sm:px-8 lg:px-10">
          <span>{text.hero.studioMatching}</span>
          <span>{text.hero.destinationPlanning}</span>
          <span>{text.hero.conciergeSupport}</span>
        </div>
      </div>
    </section>
  );
}