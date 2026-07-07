"use client";

import { FormEvent, useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckboxLike } from "@/components/forms/checkbox-like";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { StudioCard } from "@/components/studios/studio-card";
import { useLanguage } from "@/components/providers/language-provider";
import { REGIONS, STYLES, type Recommendation, type RecommendationAnswers } from "@/lib/types";

const priorities = ["concierge", "vehicle", "hanbok", "night view", "ocean", "family"];

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
  const { text } = useLanguage();
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
      body: JSON.stringify(filters)
    });

    const result = await response.json();

    if (!response.ok) {
      setStatus("error");
      setMessage(result.message || "Could not create matches. Please check your filters.");
      return;
    }

    const nextRecommendations = result.recommendations || [];
    setRecommendations(nextRecommendations);
    setStatus("success");

    if (!nextRecommendations.length) {
      setMessage(text.forms.noMatches);
      return;
    }

    setMessage(text.forms.matched);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <form onSubmit={handleSubmit} className="grid gap-5 rounded-lg border border-border bg-white p-5 shadow-soft">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="region">{text.forms.region}</Label>
            <Select id="region" name="region" value={filters.region} onChange={(event) => updateFilter("region", event.target.value)}>
              <option value="any">{text.forms.anyRegion}</option>
              {REGIONS.map((region) => <option key={region} value={region}>{region}</option>)}
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="style">{text.forms.style}</Label>
            <Select id="style" name="style" value={filters.style} onChange={(event) => updateFilter("style", event.target.value)}>
              {STYLES.map((style) => <option key={style} value={style}>{style}</option>)}
            </Select>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="budget">{text.forms.budget}</Label>
            <Select id="budget" name="budget" value={filters.budget} onChange={(event) => updateFilter("budget", event.target.value)}>
              <option value="under300000">under JPY 300,000</option>
              <option value="300000-500000">JPY 300,000 - JPY 500,000</option>
              <option value="500000plus">JPY 500,000+</option>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="season">{text.forms.season}</Label>
            <Select id="season" name="season" value={filters.season} onChange={(event) => updateFilter("season", event.target.value)}>
              <option value="spring">Spring</option>
              <option value="summer">Summer</option>
              <option value="autumn">Autumn</option>
              <option value="winter">Winter</option>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="mood">{text.forms.mood}</Label>
          <Select id="mood" name="mood" value={filters.mood} onChange={(event) => updateFilter("mood", event.target.value)}>
            <option value="quiet">Quiet and elegant</option>
            <option value="dramatic">Cinematic and dramatic</option>
            <option value="bright">Bright and natural</option>
          </Select>
        </div>
        <div className="space-y-3">
          <Label>{text.forms.priorities}</Label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {priorities.map((priority) => (
              <CheckboxLike key={priority} label={priority} checked={filters.priorities.includes(priority)} onClick={() => togglePriority(priority)} />
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">{text.forms.notes}</Label>
          <Textarea id="notes" name="notes" placeholder={text.forms.notesPlaceholder} />
        </div>
        {message ? <p className={status === "error" ? "text-sm text-destructive" : "text-sm text-sage"}>{message}</p> : null}
        <Button type="submit" disabled={status === "loading"}><Sparkles aria-hidden /> {status === "loading" ? text.forms.matching : text.forms.recommend}</Button>
      </form>

      <div className="space-y-5">
        {recommendations.length ? recommendations.map((recommendation) => (
          <div key={recommendation.studio.id} className="space-y-3">
            <StudioCard studio={recommendation.studio} />
            <div className="rounded-lg border border-border bg-white p-4 text-sm leading-7 text-muted-foreground shadow-soft">
              <p className="mb-2 font-semibold text-ink">{text.forms.matchScore} {recommendation.score}</p>
              <ul className="list-disc space-y-1 pl-5">
                {recommendation.reasons.map((reason) => <li key={reason}>{reason}</li>)}
              </ul>
            </div>
          </div>
        )) : (
          <div className="flex min-h-[420px] items-center justify-center rounded-lg border border-dashed border-border bg-white p-8 text-center shadow-soft">
            <div className="max-w-sm space-y-3">
              <Sparkles className="mx-auto size-8 text-gold-700" aria-hidden />
              <h2 className="text-2xl font-semibold text-ink">{text.forms.emptyTitle}</h2>
              <p className="text-sm leading-7 text-muted-foreground">{text.forms.emptyDescription}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}