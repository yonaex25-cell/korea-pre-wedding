import { NextResponse } from "next/server";
import OpenAI from "openai";
import { getStudios } from "@/lib/studio-service";
import { filterStudiosForAnswers, rankStudios } from "@/lib/recommendations";
import { isOpenAIConfigured, openAIConfig } from "@/lib/server-config";
import { recommendationSchema } from "@/lib/validations";
import type { Recommendation, Studio } from "@/lib/types";

function summarizeStudio(studio: Studio) {
  return {
    slug: studio.slug,
    name: studio.name,
    region: studio.region,
    city: studio.city,
    styles: studio.styles,
    priceFrom: studio.priceFrom,
    services: studio.services,
    destinations: studio.destinations,
    description: studio.description
  };
}

function languageInstruction(language: "KR" | "JP" | "EN") {
  if (language === "KR") {
    return "Write every recommendation note in Korean.";
  }

  if (language === "JP") {
    return "Write every recommendation note in Japanese.";
  }

  return "Write every recommendation note in English.";
}

function mergeOpenAIResult(studios: Studio[], fallback: Recommendation[], content: string) {
  const parsed = JSON.parse(content) as { slugs?: string[]; notes?: Record<string, string[]> };
  const bySlug = new Map(studios.map((studio: Studio) => [studio.slug, studio]));
  const recommendations = (parsed.slugs || [])
    .map((slug: string, index: number) => {
      const studio = bySlug.get(slug);
      if (!studio) {
        return null;
      }

      return {
        studio,
        score: Math.max(70, 96 - index * 6),
        reasons: parsed.notes?.[slug]?.slice(0, 3) || fallback.find((item: Recommendation) => item.studio.slug === slug)?.reasons || ["This studio matches your selected filters."]
      };
    })
    .filter(Boolean) as Recommendation[];

  return recommendations.length ? recommendations : fallback;
}

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = recommendationSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ message: "Please select your matching preferences." }, { status: 400 });
  }

  const studios = await getStudios();
  const matchingStudios = filterStudiosForAnswers(studios, parsed.data);
  const fallback = rankStudios(matchingStudios, parsed.data);
  const requestedLanguage = parsed.data.language;

  if (!matchingStudios.length) {
    return NextResponse.json({ source: "local", recommendations: [] });
  }

  if (!isOpenAIConfigured()) {
    return NextResponse.json({ source: "local", recommendations: fallback });
  }

  try {
    const client = new OpenAI({ apiKey: openAIConfig.apiKey });
    const completion = await client.chat.completions.create({
      model: openAIConfig.model,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: 'You are Dasoni, a Korea wedding photography concierge. Recommend only from the provided studios. ' + languageInstruction(requestedLanguage) + ' Return only JSON: {"slugs":["studio-slug"],"notes":{"studio-slug":["short reason"]}}.'
        },
        {
          role: "user",
          content: JSON.stringify({ answers: parsed.data, studios: matchingStudios.map((studio: Studio) => summarizeStudio(studio)) })
        }
      ]
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ source: "local", recommendations: fallback });
    }

    return NextResponse.json({ source: "openai", recommendations: mergeOpenAIResult(matchingStudios, fallback, content) });
  } catch {
    return NextResponse.json({ source: "local", recommendations: fallback });
  }
}
