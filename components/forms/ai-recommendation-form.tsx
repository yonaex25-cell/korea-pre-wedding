"use client";

import { FormEvent, useState } from "react";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { CheckboxLike } from "@/components/forms/checkbox-like";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { StudioCard } from "@/components/studios/studio-card";
import { translateRecommendationReason } from "@/lib/public-content-translations";
import { REGIONS, STYLES, type Recommendation, type RecommendationAnswers } from "@/lib/types";

const priorities = ["concierge", "vehicle", "hanbok", "night view", "ocean", "family"] as const;
const seasons = ["spring", "summer", "autumn", "winter"] as const;
const moods = ["quiet", "dramatic", "bright"] as const;

type SelectFilterKey = "region" | "style" | "budget" | "season" | "mood";

const defaultFilters: RecommendationAnswers = {
  region: "any",
  style: "Classic",
  budget: "300000-500000",
  season: "spring",
  mood: "quiet",
  priorities: ["concierge"]
};

export function AiRecommendationForm() {
  const { language, t } = useLanguage();
  const [filters, setFilters] = useState<RecommendationAnswers>(defaultFilters);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function updateFilter(name: SelectFilterKey, value: string) {
    setFilters((current) => ({ ...current, [name]: value }));
  }

  function togglePriority(value: string) {
    setFilters((current) => ({
      ...current,
      priorities: current.priorities.includes(value)
        ? current.priorities.filter((item) => item !== value)
        : [...current.priorities, value]
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/recommendations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...filters, language })
    });

    const result = await response.json();

    if (!response.ok) {
      setStatus("error");
      setMessage(t.forms.ai.error);
      return;
    }

    const nextRecommendations = result.recommendations || [];
    setRecommendations(nextRecommendations);
    setStatus("success");

    if (!nextRecommendations.length) {
      setMessage(t.forms.ai.noMatches);
      return;
    }

    setMessage(result.source === "openai" ? t.forms.ai.openAiSource : t.forms.ai.localSource);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <form onSubmit={handleSubmit} className="grid gap-5 rounded-lg border border-border bg-white p-5 shadow-soft">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="region">{t.filters.region}</Label>
            <Select id="region" name="region" value={filters.region} onChange={(event) => updateFilter("region", event.target.value)}>
              <option value="any">{t.options.regions.any}</option>
              {REGIONS.map((region) => <option key={region} value={region}>{t.options.regions[region]}</option>)}
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="style">{t.filters.style}</Label>
            <Select id="style" name="style" value={filters.style} onChange={(event) => updateFilter("style", event.target.value)}>
              {STYLES.map((style) => <option key={style} value={style}>{t.options.styles[style]}</option>)}
            </Select>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="budget">{t.filters.budget}</Label>
            <Select id="budget" name="budget" value={filters.budget} onChange={(event) => updateFilter("budget", event.target.value)}>
              <option value="under300000">{t.options.budgets.under300000}</option>
              <option value="300000-500000">{t.options.budgets["300000-500000"]}</option>
              <option value="500000plus">{t.options.budgets["500000plus"]}</option>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="season">{t.forms.ai.season}</Label>
            <Select id="season" name="season" value={filters.season} onChange={(event) => updateFilter("season", event.target.value)}>
              {seasons.map((season) => <option key={season} value={season}>{t.options.seasons[season]}</option>)}
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="mood">{t.forms.ai.mood}</Label>
          <Select id="mood" name="mood" value={filters.mood} onChange={(event) => updateFilter("mood", event.target.value)}>
            {moods.map((mood) => <option key={mood} value={mood}>{t.options.moods[mood]}</option>)}
          </Select>
        </div>
        <div className="space-y-3">
          <Label>{t.forms.ai.priorities}</Label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {priorities.map((priority) => (
              <CheckboxLike
                key={priority}
                label={t.options.priorities[priority]}
                checked={filters.priorities.includes(priority)}
                onClick={() => togglePriority(priority)}
              />
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">{t.forms.common.notes}</Label>
          <Textarea id="notes" name="notes" placeholder={t.forms.ai.notesPlaceholder} />
        </div>
        {message ? <p className={status === "error" ? "text-sm text-destructive" : "text-sm text-sage"}>{message}</p> : null}
        <Button type="submit" disabled={status === "loading"}>
          <Sparkles aria-hidden /> {status === "loading" ? t.forms.ai.matching : t.forms.ai.recommend}
        </Button>
      </form>

      <div className="space-y-5">
        {recommendations.length ? recommendations.map((recommendation) => (
          <div key={recommendation.studio.id} className="space-y-3">
            <StudioCard studio={recommendation.studio} />
            <div className="rounded-lg border border-border bg-white p-4 text-sm leading-7 text-muted-foreground shadow-soft">
              <p className="mb-2 font-semibold text-ink">{t.forms.ai.score} {recommendation.score}</p>
              <ul className="list-disc space-y-1 pl-5">
                {recommendation.reasons.map((reason) => <li key={reason}>{translateRecommendationReason(reason, language)}</li>)}
              </ul>
            </div>
          </div>
        )) : (
          <div className="flex min-h-[420px] items-center justify-center rounded-lg border border-dashed border-border bg-white p-8 text-center shadow-soft">
            <div className="max-w-sm space-y-3">
              <Sparkles className="mx-auto size-8 text-gold-700" aria-hidden />
              <h2 className="text-2xl font-semibold text-ink">{t.forms.ai.emptyTitle}</h2>
              <p className="text-sm leading-7 text-muted-foreground">{t.forms.ai.emptyDescription}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
