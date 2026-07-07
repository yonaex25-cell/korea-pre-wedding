"use client";

import { Search } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { REGIONS, STYLES, type StudioFilters } from "@/lib/types";

type StudioFiltersProps = {
  filters: StudioFilters;
};

export function StudioFilters({ filters }: StudioFiltersProps) {
  const { t } = useLanguage();

  return (
    <form action="/studios" className="grid gap-4 rounded-lg border border-border bg-white p-4 shadow-soft md:grid-cols-[1.3fr_1fr_1fr_1fr_auto] md:items-end">
      <div className="space-y-2">
        <Label htmlFor="search">{t.filters.search}</Label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input id="search" name="search" defaultValue={filters.search || ""} className="pl-9" placeholder={t.filters.searchPlaceholder} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="region">{t.filters.region}</Label>
        <Select id="region" name="region" defaultValue={filters.region || "all"}>
          <option value="all">{t.filters.allRegions}</option>
          {REGIONS.map((region) => <option key={region} value={region}>{t.options.regions[region]}</option>)}
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="style">{t.filters.style}</Label>
        <Select id="style" name="style" defaultValue={filters.style || "all"}>
          <option value="all">{t.filters.allStyles}</option>
          {STYLES.map((style) => <option key={style} value={style}>{t.options.styles[style]}</option>)}
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="budget">{t.filters.budget}</Label>
        <Select id="budget" name="budget" defaultValue={filters.budget || "all"}>
          <option value="all">{t.filters.allBudgets}</option>
          <option value="under300000">{t.options.budgets.under300000}</option>
          <option value="300000-500000">{t.options.budgets["300000-500000"]}</option>
          <option value="500000plus">{t.options.budgets["500000plus"]}</option>
        </Select>
      </div>
      <Button type="submit">{t.filters.submit}</Button>
    </form>
  );
}
