import type { Metadata } from "next";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { getFAQs } from "@/lib/repository";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Korean pre-wedding photography reservations."
};

export default async function FAQPage() {
  const faqs = await getFAQs();

  return (
    <section className="section-shell py-14">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.22em] text-primary">FAQ</p>
        <h1 className="mt-3 text-5xl font-semibold">Everything couples ask before booking.</h1>
      </div>
      <div className="mt-10 max-w-4xl">
        <FAQAccordion items={faqs} />
      </div>
    </section>
  );
}
