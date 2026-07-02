import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-[78vh] overflow-hidden bg-ink text-white">
      <Image
        src="https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1800&q=90"
        alt="Elegant Korean wedding photography couple portrait"
        fill
        className="object-cover"
        priority
      />
      <div className="hero-scrim absolute inset-0" />
      <div className="container-shell relative flex min-h-[78vh] items-center pb-20 pt-24">
        <div className="max-w-3xl animate-reveal space-y-7">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur">
            <Sparkles className="size-4" aria-hidden /> Korea Wedding Photography Concierge
          </p>
          <div className="space-y-5">
            <h1 className="text-5xl font-semibold leading-[1.06] md:text-7xl">Dasoni</h1>
            <p className="max-w-2xl text-lg leading-8 text-white/86 md:text-xl">
              Curated Korean wedding photography studios, destination routes, and concierge support for couples who want a smooth, beautiful experience in Seoul, Jeju, or Busan.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/studios">Explore studios <ArrowRight aria-hidden /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/40 bg-white/12 text-white hover:bg-white/20">
              <Link href="/reservation"><CalendarDays aria-hidden /> Request consultation</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/20 bg-white/10 py-4 backdrop-blur-md">
        <div className="container-shell grid gap-3 text-sm text-white/86 sm:grid-cols-3">
          <span>Studio matching</span>
          <span>Destination planning</span>
          <span>Concierge support</span>
        </div>
      </div>
    </section>
  );
}
