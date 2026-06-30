import { NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";
import { getStudios } from "@/lib/repository";
import type { Studio } from "@/lib/types";

const recommendationSchema = z.object({
  region: z.enum(["Any", "Seoul", "Jeju", "Busan"]),
  style: z.enum(["Any", "Classic", "Modern", "Natural", "Editorial", "Hanbok"]),
  budget: z.enum(["Under 250,000 JPY", "250,000-400,000 JPY", "400,000+ JPY"]),
  travelMonth: z.string().optional(),
  priorities: z.array(z.string()).default([])
});

function scoreStudio(studio: Studio, input: z.infer<typeof recommendationSchema>) {
  let score = 0;
  if (input.region === "Any" || studio.region === input.region) score += 3;
  if (input.style === "Any" || studio.styles.includes(input.style)) score += 3;
  if (input.budget === "Under 250,000 JPY" && studio.priceFromJpy <= 250000) score += 2;
  if (input.budget === "250,000-400,000 JPY" && studio.priceFromJpy > 250000 && studio.priceFromJpy <= 400000) score += 2;
  if (input.budget === "400,000+ JPY" && studio.priceFromJpy >= 400000) score += 2;
  if (input.priorities.includes("outdoor") && ["Jeju", "Busan"].includes(studio.region)) score += 1;
  if (input.priorities.includes("translation")) score += 1;
  if (input.priorities.includes("gowns") && studio.includedServices.some((service) => service.toLowerCase().includes("gown"))) score += 1;
  if (input.priorities.includes("travelEase") && studio.region !== "Jeju") score += 1;
  return score;
}

function deterministicMatch(studios: Studio[], input: z.infer<typeof recommendationSchema>) {
  const matches = [...studios]
    .sort((a, b) => scoreStudio(b, input) - scoreStudio(a, input))
    .slice(0, 3);

  return {
    summary: `Based on your ${input.region === "Any" ? "flexible destination" : input.region} preference, ${input.style.toLowerCase()} style interest, and ${input.budget} budget, these studios offer the strongest balance of logistics, visual mood, and package fit.`,
    studios: matches
  };
}

export async function POST(request: Request) {
  const input = recommendationSchema.safeParse(await request.json());
  if (!input.success) {
    return NextResponse.json({ error: "Please complete the questionnaire." }, { status: 400 });
  }

  const studios = await getStudios();

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(deterministicMatch(studios, input.data));
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
    const response = await openai.chat.completions.create({
      model,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a premium pre-wedding concierge. Return strict JSON with keys summary and studioSlugs. Pick exactly three studio slugs from the catalog."
        },
        {
          role: "user",
          content: JSON.stringify({
            questionnaire: input.data,
            catalog: studios.map((studio) => ({
              slug: studio.slug,
              name: studio.name,
              region: studio.region,
              styles: studio.styles,
              priceFromJpy: studio.priceFromJpy,
              summary: studio.summary,
              includedServices: studio.includedServices
            }))
          })
        }
      ]
    });

    const parsed = JSON.parse(response.choices[0]?.message.content || "{}") as {
      summary?: string;
      studioSlugs?: string[];
    };
    const selected = (parsed.studioSlugs || [])
      .map((slug) => studios.find((studio) => studio.slug === slug))
      .filter(Boolean) as Studio[];

    if (!parsed.summary || selected.length === 0) {
      return NextResponse.json(deterministicMatch(studios, input.data));
    }

    return NextResponse.json({
      summary: parsed.summary,
      studios: selected.slice(0, 3)
    });
  } catch {
    return NextResponse.json(deterministicMatch(studios, input.data));
  }
}
