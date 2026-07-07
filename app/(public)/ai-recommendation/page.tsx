import type { Metadata } from "next";
import { AiRecommendationForm } from "@/components/forms/ai-recommendation-form";
import { LocalizedText } from "@/components/site/localized-text";
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
          eyebrow={<LocalizedText path="pages.aiEyebrow" fallback="AI Match" />}
          title={<LocalizedText path="pages.aiTitle" fallback="Match with studios that fit your plan" />}
          description={<LocalizedText path="pages.aiDescription" fallback="Choose your region, style, budget, season, and mood. Dasoni will show only studios that match the selected filters." />}
        />
        <AiRecommendationForm />
      </section>
    </main>
  );
}
