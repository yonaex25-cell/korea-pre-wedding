import type { Metadata } from "next";
import { AiRecommendationForm } from "@/components/forms/ai-recommendation-form";
import { SectionHeading } from "@/components/site/section-heading";

export const metadata: Metadata = {
  title: "AI Match",
  description: "Match with Korean wedding photography studios by destination, style, and budget."
};

export default function AiRecommendationPage() {
  return (
    <main className="bg-background">
      <section className="container-shell space-y-10 py-14 md:py-20">
        <SectionHeading
          eyebrow="AI Match"
          title="Match with studios that fit your plan"
          description="Choose your region, style, budget, season, and mood. Dasoni will show only studios that match the selected filters."
        />
        <AiRecommendationForm />
      </section>
    </main>
  );
}
