import type { Metadata } from "next";
import { StudioFilters } from "@/components/studios/studio-filters";
import { getStudios } from "@/lib/repository";

export const metadata: Metadata = {
  title: "Studio List",
  description: "Search and filter Korean wedding studios by region, style, and budget."
};

export default async function StudioListPage() {
  const studios = await getStudios();

  return (
    <section className="section-shell py-14">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.22em] text-primary">Studio list</p>
        <h1 className="mt-3 text-5xl font-semibold">Find your Korean wedding studio.</h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Filter curated studios by destination, visual style, and budget tier.
        </p>
      </div>
      <div className="mt-10">
        <StudioFilters studios={studios} />
      </div>
    </section>
  );
}
