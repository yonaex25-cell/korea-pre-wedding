import { AiCta } from "@/components/site/ai-cta";
import { DestinationGrid } from "@/components/site/destination-grid";
import { FaqPreview } from "@/components/site/faq-preview";
import { FeaturedStudios } from "@/components/site/featured-studios";
import { Hero } from "@/components/site/hero";
import { ReviewsSection } from "@/components/site/reviews-section";
import { getFaqs, getFeaturedStudios, getReviews } from "@/lib/studio-service";

export default async function HomePage() {
  const [featuredStudios, reviews, faqs] = await Promise.all([
    getFeaturedStudios(),
    getReviews(),
    getFaqs()
  ]);

  return (
    <main className="overflow-x-hidden bg-background">
      <Hero />
      <FeaturedStudios studios={featuredStudios} />
      <DestinationGrid />
      <AiCta />
      <ReviewsSection reviews={reviews} />
      <FaqPreview faqs={faqs} />
    </main>
  );
}