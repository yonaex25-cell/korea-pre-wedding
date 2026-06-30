import type { Metadata } from "next";
import { AIRecommendationForm } from "@/components/forms/ai-recommendation-form";

export const metadata: Metadata = {
  title: "AI Recommendation",
  description: "Answer a short questionnaire and get Korean wedding studio recommendations."
};

export default function AIRecommendationPage() {
  return (
    <section className="section-shell py-14">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.22em] text-primary">AI recommendation</p>
        <h1 className="mt-3 text-5xl font-semibold">Match with studios that fit your mood.</h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          The assistant weighs destination, style, budget, season, and planning priorities.
        </p>
      </div>
      <div className="mt-10">
        <AIRecommendationForm />
      </div>
    </section>
  );
}
