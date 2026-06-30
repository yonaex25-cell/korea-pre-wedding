import type { Metadata } from "next";
import { Mail, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { ReservationForm } from "@/components/forms/reservation-form";
import { Card, CardContent } from "@/components/ui/card";
import { getStudios } from "@/lib/repository";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Korea Pre Wedding for concierge planning support."
};

export default async function ContactPage() {
  const studios = await getStudios();

  const contactItems: { Icon: LucideIcon; label: string; value: string }[] = [
    { Icon: Mail, label: "Email", value: "contact@koreaprewedding.jp" },
    { Icon: MessageCircle, label: "LINE", value: "@koreaprewedding" },
    { Icon: Phone, label: "Business hours", value: "Mon-Fri 10:00-18:00 KST" }
  ];

  return (
    <section className="section-shell py-14">
      <div className="grid gap-10 lg:grid-cols-[0.75fr_1fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-primary">Contact</p>
          <h1 className="mt-3 text-5xl font-semibold">Talk with a planning concierge.</h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Ask about Korean studio selection, date availability, dress options, image delivery, or travel timing.
          </p>
          <div className="mt-8 grid gap-4">
            {contactItems.map(({ Icon, label, value }) => (
              <Card key={label}>
                <CardContent className="flex items-center gap-4 p-5">
                  <Icon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">{label}</p>
                    <p className="text-sm text-muted-foreground">{value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <ReservationForm studios={studios} />
      </div>
    </section>
  );
}
