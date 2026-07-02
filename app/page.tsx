import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bot, CheckCircle2, MapPin, Sparkles } from "lucide-react";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { ReviewCard } from "@/components/sections/review-card";
import { StudioCard } from "@/components/studios/studio-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getFAQs, getReviews, getStudios } from "@/lib/repository";
import type { Review } from "@/lib/types";
export default async function HomePage() {
  const [studios, reviews, faqs] = await Promise.all([getStudios(), getReviews(), getFAQs()]);
  const featured = studios.filter((studio) => studio.featured).slice(0, 3);

  return (
    <>
      <section className="luxury-surface overflow-hidden">
        <div className="section-shell grid min-h-[calc(100vh-4rem)] items-center gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-16">
          <div className="animate-fade-up">
            <Badge>Japanese concierge for Korean wedding studios</Badge>
            <h1 className="mt-5 max-w-3xl text-balance text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
              Korea Pre Wedding
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Compare premium Seoul, Jeju, and Busan wedding studios with AI matching, bilingual planning, transparent pricing, and polished reservation support.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/ai-recommendation"><Bot /> Find my studio</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/studios">Browse studios <ArrowRight /></Link>
              </Button>
            </div>
            <div className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
              {["Curated Korean studios", "Japanese-language support", "Supabase-ready booking"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> {item}</span>
              ))}
            </div>
          </div>
          <div className="relative min-h-[520px] animate-fade-up [animation-delay:160ms]">
            <div className="absolute inset-0 overflow-hidden rounded-lg shadow-luxury">
              <Image
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=90"
                alt="Elegant wedding couple portrait for Korea Pre Wedding"
                fill
                priority
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-5 left-5 right-5 rounded-lg border bg-white/90 p-5 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.2em] text-primary">Most requested route</p>
              <p className="mt-2 text-xl font-semibold">Seoul studio + city night portraits</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-primary">Featured studios</p>
            <h2 className="mt-3 text-4xl font-semibold">Curated for a premium Korea trip.</h2>
          </div>
          <Button asChild variant="outline"><Link href="/studios">View all studios</Link></Button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((studio, index) => <StudioCard key={studio.id} studio={studio}  />)}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="section-shell">
          <p className="text-sm uppercase tracking-[0.22em] text-primary">Destinations</p>
          <h2 className="mt-3 text-4xl font-semibold">Choose the mood of your Korea story.</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              ["Seoul", "Couture studios, palace accents, skyline portraits", "https://images.unsplash.com/photo-1538485399081-7c8edcb4c0f7?auto=format&fit=crop&w=1000&q=85"],
              ["Jeju", "Ocean cliffs, volcanic landscapes, botanical calm", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85"],
              ["Busan", "Coastal city light, beaches, warm modern routes", "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1000&q=85"]
            ].map(([name, body, image]) => (
              <Card key={name} className="overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image src={image} alt={`${name} pre-wedding destination`} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
                </div>
                <CardContent className="p-5">
                  <p className="inline-flex items-center gap-2 font-semibold"><MapPin className="h-4 w-4 text-primary" /> {name}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="grid items-center gap-8 rounded-lg border bg-white p-8 shadow-luxury lg:grid-cols-[1fr_0.7fr]">
          <div>
            <p className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-primary"><Sparkles className="h-4 w-4" /> AI recommendation</p>
            <h2 className="mt-3 text-4xl font-semibold">Get a shortlist matched to your travel month, budget, and desired mood.</h2>
          </div>
          <Button asChild size="lg"><Link href="/ai-recommendation"><Bot /> Start AI match</Link></Button>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="section-shell">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-primary">Customer reviews</p>
              <h2 className="mt-3 text-4xl font-semibold">Loved by couples from Japan.</h2>
            </div>
            <Button asChild variant="outline"><Link href="/reviews">Read reviews</Link></Button>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {reviews.slice(0, 3).map((review: Review) => <ReviewCard key={review.id} review={review} />)}
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-primary">FAQ</p>
            <h2 className="mt-3 text-4xl font-semibold">Clear answers before you reserve.</h2>
          </div>
          <FAQAccordion items={faqs.slice(0, 4)} />
        </div>
      </section>
    </>
  );
}
