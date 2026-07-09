import type { Metadata } from "next";
import Image from "next/image";
import { ReservationForm } from "@/components/forms/reservation-form";
import { ReservationContactMethods, ReservationHeroCopy } from "@/components/site/reservation-page-content";
import { getStudios } from "@/lib/studio-service";

export const metadata: Metadata = {
  title: "Consultation",
  description: "Request a Dasoni consultation for Korean wedding photography."
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function valueOf(input: string | string[] | undefined) {
  return Array.isArray(input) ? input[0] : input;
}

export default async function ReservationPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const studios = await getStudios();
  const selectedStudioSlug = valueOf(params.studio);

  return (
    <main className="bg-background">
      <section className="container-shell grid gap-10 py-14 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <ReservationHeroCopy />
        <div className="relative aspect-[3/2] overflow-hidden rounded-lg border border-border bg-white shadow-soft">
          <Image
            src="/images/reservation-consultation.png"
            alt="Dasoni consultation"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>
      <section className="container-shell grid gap-10 pb-14 md:pb-20 lg:grid-cols-[0.8fr_1.2fr]">
        <ReservationContactMethods />
        <ReservationForm studios={studios} selectedStudioSlug={selectedStudioSlug} />
      </section>
    </main>
  );
}
