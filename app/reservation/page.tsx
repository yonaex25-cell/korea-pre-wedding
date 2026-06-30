import type { Metadata } from "next";
import { ReservationForm } from "@/components/forms/reservation-form";
import { getStudios } from "@/lib/repository";

export const metadata: Metadata = {
  title: "Reservation",
  description: "Request a Korea pre-wedding studio reservation."
};

export default async function ReservationPage({
  searchParams
}: {
  searchParams: Promise<{ studio?: string }>;
}) {
  const [studios, params] = await Promise.all([getStudios(), searchParams]);

  return (
    <section className="section-shell py-14">
      <div className="grid gap-10 lg:grid-cols-[0.75fr_1fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-primary">Reservation</p>
          <h1 className="mt-3 text-5xl font-semibold">Send your preferred shoot date.</h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Share your LINE ID, ideal date, and travel details. The concierge team will confirm studio availability and next steps.
          </p>
        </div>
        <ReservationForm studios={studios} defaultStudioId={params.studio} />
      </div>
    </section>
  );
}
