import type { Metadata } from "next";
import { StudioFilters } from "@/components/studios/studio-filters";
import { StudioCard } from "@/components/studios/studio-card";
import { SectionHeading } from "@/components/site/section-heading";
import { getStudios } from "@/lib/studio-service";
import type { StudioFilters as StudioFilterType } from "@/lib/types";

export const metadata: Metadata = {
  title: "Studio List",
  description: "Compare Korean wedding photography studios in Seoul, Jeju, and Busan."
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function valueOf(input: string | string[] | undefined) {
  return Array.isArray(input) ? input[0] : input;
}

export default async function StudioListPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const filters: StudioFilterType = {
    search: valueOf(params.search),
    region: valueOf(params.region),
    style: valueOf(params.style),
    budget: valueOf(params.budget)
  };
  const studios = await getStudios(filters);

  return (
    <main className="bg-background">
      <section className="container-shell space-y-8 py-14 md:py-20">
        <SectionHeading
          eyebrow="Studio List"
          title="Find Korean photography studios"
          description="Filter by region, style, budget, and keyword to compare studios that fit your wedding photography plan."
        />
        <StudioFilters filters={filters} />
        {studios.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {studios.map((studio) => <StudioCard key={studio.id} studio={studio} />)}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-white p-10 text-center shadow-soft">
            <h2 className="text-2xl font-semibold text-ink">No studios match these filters</h2>
            <p className="mt-3 text-muted-foreground">Try widening the region, style, or budget.</p>
          </div>
        )}
      </section>
    </main>
  );
}
