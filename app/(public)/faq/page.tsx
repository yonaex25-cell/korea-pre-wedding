import type { Metadata } from "next";
import { FaqList } from "@/components/site/faq-list";
import { SectionHeading } from "@/components/site/section-heading";
import { getFaqs } from "@/lib/studio-service";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Dasoni and Korean wedding photography planning."
};

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <main className="bg-background">
      <section className="container-shell grid gap-10 py-14 md:py-20 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Answers about booking, destinations, packages, timing, weather, and concierge support."
        />
        <FaqList faqs={faqs} />
      </section>
    </main>
  );
}
