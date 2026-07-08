import type { Metadata } from "next";
import Link from "next/link";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Dasoni for Korean wedding photography concierge support."
};

export default function ContactPage() {
  return (
    <main className="bg-background">
      <section className="container-shell grid items-stretch gap-12 py-14 md:py-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-16 text-center lg:flex lg:h-full lg:flex-col lg:justify-between lg:space-y-0">
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-[0.04em] text-foreground">Customer Service</h2>
            <div className="space-y-1 text-lg font-medium leading-8 text-foreground">
              <p>Open : 10am - 7pm</p>
              <p>Break : 12pm - 1pm</p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-[0.04em] text-foreground">Contact</h2>
            <Link className="inline-flex items-center justify-center gap-2 text-lg font-medium text-foreground transition hover:text-primary" href="mailto:yonaex25@gmail.com">
              <Mail className="size-5" aria-hidden />
              yonaex25@gmail.com
            </Link>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-[0.04em] text-foreground">Instagram</h2>
            <Link className="inline-flex flex-col items-center gap-3 text-lg font-medium text-foreground transition hover:text-primary" href="https://www.instagram.com/dasoni_korea_wd" target="_blank" rel="noreferrer">
              <Instagram className="size-9" aria-hidden />
              <span>@dasoni_korea_wd</span>
            </Link>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-[0.04em] text-foreground">LINE</h2>
            <div className="inline-flex flex-col items-center gap-3 text-lg font-medium text-foreground">
              <MessageCircle className="size-9" aria-hidden />
              <span>ngyn9813</span>
            </div>
          </section>
        </div>

        <ContactForm />
      </section>
    </main>
  );
}
