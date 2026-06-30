"use client";

import { WandSparkles } from "lucide-react";
import { useState } from "react";
import { StudioCard } from "@/components/studios/studio-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import type { Studio } from "@/lib/types";

type RecommendationResponse = {
  summary: string;
  studios: Studio[];
};

export function AIRecommendationForm() {
  const [result, setResult] = useState<RecommendationResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(formData: FormData) {
    setLoading(true);
    setError("");
    setResult(null);

    const priorities = ["translation", "outdoor", "gowns", "fastDelivery", "travelEase"].filter(
      (item) => formData.get(item) === "on"
    );

    const response = await fetch("/api/recommendations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        region: formData.get("region"),
        style: formData.get("style"),
        budget: formData.get("budget"),
        travelMonth: formData.get("travelMonth"),
        priorities
      })
    });

    const data = (await response.json()) as RecommendationResponse & { error?: string };
    setLoading(false);

    if (!response.ok) {
      setError(data.error || "Recommendation failed.");
      return;
    }

    setResult(data);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <Card className="h-fit shadow-luxury">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><WandSparkles className="h-5 w-5 text-primary" /> AI studio match</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={submit} className="grid gap-5">
            <div>
              <Label>Region</Label>
              <Select name="region" className="mt-2" defaultValue="Any">
                <option>Any</option>
                <option>Seoul</option>
                <option>Jeju</option>
                <option>Busan</option>
              </Select>
            </div>
            <div>
              <Label>Style</Label>
              <Select name="style" className="mt-2" defaultValue="Any">
                <option>Any</option>
                <option>Classic</option>
                <option>Modern</option>
                <option>Natural</option>
                <option>Editorial</option>
                <option>Hanbok</option>
              </Select>
            </div>
            <div>
              <Label>Budget</Label>
              <Select name="budget" className="mt-2" defaultValue="250,000-400,000 JPY">
                <option>Under 250,000 JPY</option>
                <option>250,000-400,000 JPY</option>
                <option>400,000+ JPY</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="travelMonth">Travel month</Label>
              <Input id="travelMonth" name="travelMonth" className="mt-2" placeholder="October 2026" />
            </div>
            <fieldset className="grid gap-3 rounded-md border p-4">
              <legend className="px-1 text-sm font-semibold">Priorities</legend>
              {[
                ["translation", "Japanese-language support"],
                ["outdoor", "Outdoor scenery"],
                ["gowns", "Premium gowns"],
                ["fastDelivery", "Fast retouch delivery"],
                ["travelEase", "Easy travel route"]
              ].map(([name, label]) => (
                <label key={name} className="flex items-center gap-3 text-sm">
                  <input name={name} type="checkbox" className="h-4 w-4 accent-primary" />
                  {label}
                </label>
              ))}
            </fieldset>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button type="submit" size="lg" disabled={loading}>
              <WandSparkles /> {loading ? "Matching..." : "Recommend studios"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <div>
        {result ? (
          <div>
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-primary">AI concierge note</p>
              <p className="mt-3 text-lg leading-8">{result.summary}</p>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {result.studios.map((studio) => <StudioCard key={studio.id} studio={studio} />)}
            </div>
          </div>
        ) : (
          <div className="flex min-h-[420px] items-center justify-center rounded-lg border border-dashed bg-white p-8 text-center">
            <div>
              <WandSparkles className="mx-auto h-10 w-10 text-primary" />
              <h2 className="mt-4 text-2xl font-semibold">Your shortlist will appear here.</h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Answer the questionnaire to compare region, mood, budget, and travel priorities.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
