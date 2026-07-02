"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { REGIONS, STYLES, type StudioFilters } from "@/lib/types";

type StudioFiltersProps = {
  filters: StudioFilters;
};

export function StudioFilters({ filters }: StudioFiltersProps) {
  return (
    <form action="/studios" className="grid gap-4 rounded-lg border border-border bg-white p-4 shadow-soft md:grid-cols-[1.3fr_1fr_1fr_1fr_auto] md:items-end">
      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input id="search" name="search" defaultValue={filters.search || ""} className="pl-9" placeholder="Gangnam, Jeju, Classic" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="region">Region</Label>
        <Select id="region" name="region" defaultValue={filters.region || "all"}>
          <option value="all">All regions</option>
          {REGIONS.map((region) => <option key={region} value={region}>{region}</option>)}
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="style">Style</Label>
        <Select id="style" name="style" defaultValue={filters.style || "all"}>
          <option value="all">All styles</option>
          {STYLES.map((style) => <option key={style} value={style}>{style}</option>)}
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="budget">Budget</Label>
        <Select id="budget" name="budget" defaultValue={filters.budget || "all"}>
          <option value="all">All budgets</option>
          <option value="under300000">under JPY 300,000</option>
          <option value="300000-500000">JPY 300,000 - JPY 500,000</option>
          <option value="500000plus">JPY 500,000+</option>
        </Select>
      </div>
      <Button type="submit">Search</Button>
    </form>
  );
}
