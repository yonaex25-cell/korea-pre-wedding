import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { destinations } from "@/lib/data";
import { SectionHeading } from "@/components/site/section-heading";

export function DestinationGrid() {
  return (
    <section className="bg-white py-20">
      <div className="container-shell space-y-10">
        <SectionHeading
          eyebrow="Destinations"
          title="Popular Korean photo destinations"
          description="Choose from polished city studios, Jeju outdoor routes, and Busan cinematic scenery."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {destinations.map((destination) => (
            <Link key={destination.name} href={"/studios?region=" + encodeURIComponent(destination.name)} className="group relative min-h-[360px] overflow-hidden rounded-lg bg-ink text-white shadow-soft">
              <Image src={destination.image} alt={destination.label} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 space-y-3 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">{destination.label}</p>
                <h3 className="text-4xl font-semibold">{destination.name}</h3>
                <p className="text-sm leading-6 text-white/82">{destination.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold">View studios <ArrowRight className="size-4" aria-hidden /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
