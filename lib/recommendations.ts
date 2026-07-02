import type { Recommendation, RecommendationAnswers, Studio } from "@/lib/types";

function parseBudget(value: string) {
  if (value === "under300000") {
    return { min: 0, max: 299999 };
  }

  if (value === "300000-500000") {
    return { min: 300000, max: 500000 };
  }

  return { min: 500001, max: Number.MAX_SAFE_INTEGER };
}

export function filterStudiosForAnswers(studios: Studio[], answers: RecommendationAnswers) {
  const budget = parseBudget(answers.budget);

  return studios.filter((studio: Studio) => {
    const matchesRegion = answers.region === "any" || studio.region === answers.region;
    const matchesStyle = studio.styles.some((style: string) => style.toLowerCase() === answers.style.toLowerCase());
    const matchesBudget = studio.priceFrom >= budget.min && studio.priceFrom <= budget.max;

    return matchesRegion && matchesStyle && matchesBudget;
  });
}

export function rankStudios(studios: Studio[], answers: RecommendationAnswers): Recommendation[] {
  return studios
    .map((studio: Studio) => {
      let score = 70;
      const reasons: string[] = [];

      if (answers.region === "any") {
        reasons.push("Open destination preference allows this studio to be considered.");
      } else {
        score += 8;
        reasons.push(studio.region + " matches your selected destination.");
      }

      if (studio.styles.some((style: string) => style.toLowerCase() === answers.style.toLowerCase())) {
        score += 10;
        reasons.push(studio.name + " specializes in " + answers.style + " photography.");
      }

      score += 8;
      reasons.push("The starting price fits your selected budget range.");

      for (const priority of answers.priorities) {
        const text = [studio.description, studio.longDescription, ...studio.services, ...studio.destinations].join(" ").toLowerCase();
        if (text.includes(priority.toLowerCase())) {
          score += 4;
        }
      }

      if (answers.mood === "quiet" && studio.styles.some((style: string) => ["Minimal", "Natural", "Classic"].includes(style))) {
        score += 4;
        reasons.push("Its portfolio direction works well for calm, elegant images.");
      }

      if (answers.mood === "dramatic" && studio.styles.some((style: string) => ["Cinematic", "Editorial", "Modern"].includes(style))) {
        score += 4;
        reasons.push("Its style supports a more cinematic and high-impact gallery.");
      }

      if (answers.mood === "bright" && studio.styles.some((style: string) => ["Natural", "Resort"].includes(style))) {
        score += 4;
        reasons.push("Its style supports bright, relaxed destination photography.");
      }

      return { studio, score, reasons: reasons.slice(0, 3) };
    })
    .sort((a: Recommendation, b: Recommendation) => b.score - a.score)
    .slice(0, 3);
}
