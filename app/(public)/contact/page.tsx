import type { Metadata } from "next";
import Link from "next/link";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { SectionHeading } from "@/components/site/section-heading";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Dasoni for Korean wedding photography concierge support."
};

export default function ContactPage() {
  return (
    <main className="bg-background">
      <section className="container-shell grid gap-10 py-14 md:py-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Contact"
            title="Talk with Dasoni"
            description="Send your preferred destination, timing, budget, and photography style. We will help you compare Korean studios and plan next steps."
          />
          <div className="grid gap-3 text-sm text-muted-foreground">
            <p className="flex items-center gap-3 rounded-lg border border-border bg-white p-4 shadow-soft"><Mail className="size-5 text-gold-700" aria-hidden /> yonaex25@gmail.com</p>
            <p className="flex items-center gap-3 rounded-lg border border-border bg-white p-4 shadow-soft"><MessageCircle className="size-5 text-gold-700" aria-hidden /> LINE: ngyn9813</p>
            <p className="flex items-center gap-3 rounded-lg border border-border bg-white p-4 shadow-soft">
              <Instagram className="size-5 text-gold-700" aria-hidden />
              <Link className="hover:text-foreground" href="https://www.instagram.com/dasoni_korea_wd" target="_blank" rel="noreferrer">@dasoni_korea_wd</Link>
            </p>
          </div>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
