import type { Metadata } from "next";
import { ReservationForm } from "@/components/forms/reservation-form";
import { LocalizedText } from "@/components/site/localized-text";
import { SectionHeading } from "@/components/site/section-heading";
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
      <section className="container-shell grid gap-10 py-14 md:py-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-5">
          <SectionHeading
            eyebrow={<LocalizedText path="pages.reservationEyebrow" fallback="Consultation" />}
            title={<LocalizedText path="pages.reservationTitle" fallback="Request a studio consultation" />}
            description={<LocalizedText path="pages.reservationDescription" fallback="Share your preferred date, LINE ID, and photography goals. Dasoni will help you confirm studio fit, availability, and next steps." />}
          />
          <div className="rounded-lg border border-border bg-white p-5 text-sm leading-7 text-muted-foreground shadow-soft">
            <LocalizedText path="pages.reservationNote" fallback="Before confirming, Dasoni helps review available dates, package details, optional costs, and weather alternatives." />
          </div>
        </div>
        <ReservationForm studios={studios} selectedStudioSlug={selectedStudioSlug} />
      </section>
    </main>
  );
}
