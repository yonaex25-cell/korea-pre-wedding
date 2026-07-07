import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaqList } from "@/components/site/faq-list";
import { LocalizedText } from "@/components/site/localized-text";
import { ImageGallery } from "@/components/studios/image-gallery";
import {
  StudioDescriptionText,
  StudioDestinationsText,
  StudioLocationText,
  StudioServiceText,
  StudioStyleBadges
} from "@/components/studios/studio-detail-localized";
import { ReviewCard } from "@/components/site/review-card";
import { formatJPY } from "@/lib/format";
import { getStudioBySlug } from "@/lib/studio-service";

type PageProps = {
  params: Promise<{ slug: string }>;
};

type StudioDetailView = {
  slug?: string;
  priceFrom?: number;
  rating?: number;
  services?: string[];
  destinations?: string[];
  faqs?: Parameters<typeof FaqList>[0]["faqs"];
  reviews?: Array<Parameters<typeof ReviewCard>[0]["review"]>;
};

function asStudioDetailView(studio: Awaited<ReturnType<typeof getStudioBySlug>>): StudioDetailView {
  return (studio || {}) as StudioDetailView;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const studio = await getStudioBySlug(slug);

  if (!studio) {
    return { title: "Studio" };
  }

  const firstImage = studio.images[0] as string | { url?: string } | undefined;
  const metadataImage = typeof firstImage === "string" ? firstImage : firstImage?.url;

  return {
    title: studio.name,
    description: studio.description,
    openGraph: {
      title: studio.name,
      description: studio.description,
      images: metadataImage ? [{ url: metadataImage }] : []
    }
  };
}

export default async function StudioDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const studio = await getStudioBySlug(slug);

  if (!studio) {
    notFound();
  }

  const detail = asStudioDetailView(studio);
  const services = Array.isArray(detail.services) ? detail.services : [];
  const destinations = Array.isArray(detail.destinations) ? detail.destinations : [];
  const faqs = Array.isArray(detail.faqs) ? detail.faqs : [];
  const reviews = Array.isArray(detail.reviews) ? detail.reviews : [];
  const reservationSlug = detail.slug || slug;

  return (
    <main className="bg-background">
      <section className="container-shell space-y-10 py-10 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <ImageGallery images={studio.images} title={studio.name} />
          <div className="space-y-6 rounded-lg border border-border bg-white p-6 shadow-soft">
              <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <StudioStyleBadges styles={studio.styles} />
              </div>
              <h1 className="text-4xl font-semibold leading-tight text-ink md:text-5xl">{studio.name}</h1>
              <p className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="size-4" aria-hidden /> <StudioLocationText city={studio.city} region={studio.region} />
              </p>
              {typeof detail.rating === "number" ? (
                <p className="flex items-center gap-2 font-semibold text-gold-700">
                  <Star className="size-4 fill-gold-500" aria-hidden /> {detail.rating} <LocalizedText path="studio.rating" fallback="rating" />
                </p>
              ) : null}
            </div>
            <p className="leading-8 text-muted-foreground"><StudioDescriptionText studio={studio} /></p>
            <div className="grid gap-3 border-y border-border py-5 sm:grid-cols-2">
              {typeof detail.priceFrom === "number" ? (
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground"><LocalizedText path="studio.priceFrom" fallback="Price from" /></p>
                  <p className="text-2xl font-semibold text-ink">{formatJPY(detail.priceFrom)}</p>
                </div>
              ) : null}
              {destinations.length ? (
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground"><LocalizedText path="studio.destinations" fallback="Destinations" /></p>
                  <p className="font-medium text-ink"><StudioDestinationsText destinations={destinations} /></p>
                </div>
              ) : null}
            </div>
            <Button asChild size="lg" className="w-full">
              <Link href={"/reservation?studio=" + reservationSlug}>
                <LocalizedText path="studio.requestStudio" fallback="Request this studio" /> <ArrowRight aria-hidden />
              </Link>
            </Button>
          </div>
        </div>

        {services.length ? (
          <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-3">
              <p className="eyebrow"><LocalizedText path="studio.includedServices" fallback="Included Services" /></p>
              <h2 className="text-3xl font-semibold text-ink"><LocalizedText path="studio.packageHighlights" fallback="Package highlights" /></h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {services.map((service) => (
                <div key={service} className="flex items-center gap-3 rounded-lg border border-border bg-white p-4 shadow-soft">
                  <Check className="size-5 text-gold-700" aria-hidden />
                  <span className="font-medium"><StudioServiceText service={service} /></span>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {faqs.length ? (
          <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-3">
              <p className="eyebrow"><LocalizedText path="studio.studioFaq" fallback="Studio FAQ" /></p>
              <h2 className="text-3xl font-semibold text-ink"><LocalizedText path="studio.questionsForStudio" fallback="Questions for this studio" /></h2>
            </div>
            <FaqList faqs={faqs} />
          </section>
        ) : null}

        {reviews.length ? (
          <section className="space-y-8">
            <div className="space-y-3">
              <p className="eyebrow"><LocalizedText path="studio.reviews" fallback="Reviews" /></p>
              <h2 className="text-3xl font-semibold text-ink"><LocalizedText path="studio.coupleFeedback" fallback="Couple feedback" /></h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
}
