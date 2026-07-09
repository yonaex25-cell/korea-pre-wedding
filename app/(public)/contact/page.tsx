import type { Metadata } from "next";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Dasoni for Korean wedding photography concierge support."
};

export default function ContactPage() {
  return (
    <main className="bg-background">
      <section className="container-shell grid items-stretch gap-12 py-14 md:py-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="flex h-full flex-col items-center justify-between gap-16 py-1 text-center">
          <section className="space-y-5">
            <h2 className="text-[28px] font-bold tracking-[0.03em] text-foreground md:text-[32px]">Customer Service</h2>
            <div className="space-y-1 text-sm font-medium leading-7 text-muted-foreground md:text-base">
              <p>Open : 10am - 7pm</p>
              <p>Break : 12pm - 1pm</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-[28px] font-bold tracking-[0.03em] text-foreground md:text-[32px]">Contact</h2>
            <Link className="block text-sm font-medium text-muted-foreground transition hover:text-primary md:text-base" href="mailto:yonaex25@gmail.com">
              yonaex25@gmail.com
            </Link>
          </section>

          <section className="space-y-8">
            <Link className="inline-flex flex-col items-center gap-4 text-foreground transition hover:text-primary" href="https://www.instagram.com/dasoni_korea_wd" target="_blank" rel="noreferrer" aria-label="Dasoni Instagram">
              <span className="text-[28px] font-bold tracking-[0.03em] text-foreground md:text-[32px]">Instagram</span>
              <Instagram className="size-10" aria-hidden />
            </Link>
          </section>

          <section className="space-y-4">
            <div className="text-[28px] font-bold tracking-[0.03em] text-foreground md:text-[32px]">LINE ID</div>
            <div className="text-sm font-medium text-muted-foreground md:text-base">
              ngyn9813
            </div>
          </section>
        </div>

        <ContactForm />
      </section>
    </main>
  );
}
