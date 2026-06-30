"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { StudioCard } from "@/components/studios/studio-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { regions, styles } from "@/lib/data";
import type { Region, Studio, StudioStyle } from "@/lib/types";

export function StudioFilters({ studios }: { studios: Studio[] }) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<Region | "All">("All");
  const [style, setStyle] = useState<StudioStyle | "All">("All");
  const [budget, setBudget] = useState<Studio["budget"] | "All">("All");

  const filtered = useMemo(() => {
    return studios.filter((studio) => {
      const matchesQuery = `${studio.name} ${studio.summary} ${studio.region}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesRegion = region === "All" || studio.region === region;
      const matchesStyle = style === "All" || studio.styles.includes(style);
      const matchesBudget = budget === "All" || studio.budget === budget;
      return matchesQuery && matchesRegion && matchesStyle && matchesBudget;
    });
  }, [budget, query, region, studios, style]);

  return (
    <div>
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Label htmlFor="studio-search">Search</Label>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="studio-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="pl-9"
                placeholder="Studio, region, mood"
              />
            </div>
          </div>
          <div>
            <Label>Region</Label>
            <Select className="mt-2" value={region} onChange={(event) => setRegion(event.target.value as Region | "All")}>
              <option>All</option>
              {regions.map((item) => <option key={item}>{item}</option>)}
            </Select>
          </div>
          <div>
            <Label>Style</Label>
            <Select className="mt-2" value={style} onChange={(event) => setStyle(event.target.value as StudioStyle | "All")}>
              <option>All</option>
              {styles.map((item) => <option key={item}>{item}</option>)}
            </Select>
          </div>
          <div>
            <Label>Budget</Label>
            <Select className="mt-2" value={budget} onChange={(event) => setBudget(event.target.value as Studio["budget"] | "All")}>
              <option>All</option>
              <option>Premium</option>
              <option>Luxury</option>
              <option>Signature</option>
            </Select>
          </div>
        </div>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((studio) => <StudioCard key={studio.id} studio={studio} />)}
      </div>
      {filtered.length === 0 ? (
        <div className="mt-8">
          <EmptyState title="No studios match this search" body="Try a wider budget, another region, or ask the AI matcher for a curated shortlist." />
        </div>
      ) : null}
    </div>
  );
}
