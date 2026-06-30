import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Star } from "lucide-react";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { ReviewCard } from "@/components/sections/review-card";
import { Gallery } from "@/components/studios/gallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getReviews, getStudioBySlug, getStudios } from "@/lib/repository";
import { formatCurrencyJPY } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const studios = await getStudios();
  return studios.map((studio) => ({ slug: studio.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const studio = await getStudioBySlug(slug);
  return {
    title: studio?.name || "Studio Detail",
    description: studio?.summary
  };
}

export default async function StudioDetailPage({ params }: Props) {
  const { slug } = await params;
  const [studio, reviews] = await Promise.all([getStudioBySlug(slug), getReviews()]);
  if (!studio) notFound();

  const studioReviews = reviews.filter((review) => review.studioId === studio.id).slice(0, 3);
  const fallbackFaqs = studio.faqs.length ? studio.faqs : [
    {
      id: "detail-faq-1",
      category: "studio" as const,
      question: "Can this studio support Japanese customers?",
      answer: "Yes. Reservation notes, schedule confirmation, and shoot-day guidance can be coordinated in Japanese."
    }
  ];

  return (
    <section className="section-shell py-10">
      <Gallery studio={studio} />
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge>{studio.region}</Badge>
            {studio.styles.map((style) => <Badge key={style} className="border-rosewood/20 bg-rosewood/10 text-rosewood">{style}</Badge>)}
          </div>
          <h1 className="mt-5 text-5xl font-semibold">{studio.name}</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">{studio.description}</p>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Included services</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {studio.includedServices.map((service) => (
                <p key={service} className="inline-flex items-start gap-2 rounded-md border bg-white p-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {service}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">FAQ</h2>
            <div className="mt-4"><FAQAccordion items={fallbackFaqs} /></div>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Reviews</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {(studioReviews.length ? studioReviews : reviews.slice(0, 2)).map((review) => <ReviewCard key={review.id} review={review} />)}
            </div>
          </div>
        </div>
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <Card className="shadow-luxury">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Package from</p>
              <p className="mt-1 text-3xl font-semibold">{formatCurrencyJPY(studio.priceFromJpy)}</p>
              <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-primary text-primary" /> {studio.rating} rating - {studio.reviewCount} reviews
              </p>
              <div className="mt-6 grid gap-3">
                <Button asChild size="lg"><Link href={`/reservation?studio=${studio.id}`}>Reserve this studio</Link></Button>
                <Button asChild variant="outline"><Link href="/ai-recommendation">Compare with AI</Link></Button>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </section>
  );
}
