import { faqs as seedFaqs, reviews as seedReviews, studios as seedStudios } from "@/lib/data";
import { hasSupabaseEnv, createAnonServerClient } from "@/lib/supabase/server";
import type { FAQ, Review, Studio } from "@/lib/types";

type StudioRowWithRelations = {
  id: string;
  slug: string;
  name: string;
  region: string;
  styles: string[];
  budget: string;
  price_from_jpy: number;
  duration_hours: number;
  summary: string;
  description: string;
  hero_image: string;
  included_services: string[];
  featured: boolean;
  rating: number;
  review_count: number;
  studio_images?: { image_url: string }[];
  faqs?: { id: string; question: string; answer: string; category: string }[];
};

type SupabaseResult<T> = {
  data: T | null;
  error: { message: string } | null;
};

export function mapStudio(row: StudioRowWithRelations): Studio {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    region: row.region as Studio["region"],
    styles: row.styles as Studio["styles"],
    budget: row.budget as Studio["budget"],
    priceFromJpy: row.price_from_jpy,
    durationHours: row.duration_hours,
    summary: row.summary,
    description: row.description,
    heroImage: row.hero_image,
    images: row.studio_images?.map((image) => image.image_url) ?? [],
    includedServices: row.included_services,
    faqs:
      row.faqs?.map((faq) => ({
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
        category: faq.category as FAQ["category"]
      })) ?? [],
    featured: row.featured,
    rating: row.rating,
    reviewCount: row.review_count
  };
}

export async function getStudios(): Promise<Studio[]> {
  if (!hasSupabaseEnv()) return seedStudios;

  try {
    const supabase = createAnonServerClient();
    const { data, error } = (await supabase
      .from("studios")
      .select("*, studio_images(image_url), faqs(id, question, answer, category)")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false })) as unknown as SupabaseResult<StudioRowWithRelations[]>;

    if (error || !data?.length) return seedStudios;
    return data.map(mapStudio);
  } catch {
    return seedStudios;
  }
}

export async function getStudioBySlug(slug: string): Promise<Studio | undefined> {
  const allStudios = await getStudios();
  return allStudios.find((studio) => studio.slug === slug);
}

export async function getReviews(): Promise<Review[]> {
  if (!hasSupabaseEnv()) return seedReviews;

  try {
    const supabase = createAnonServerClient();
    const { data, error } = (await supabase
      .from("reviews")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false })) as unknown as SupabaseResult<
      {
        id: string;
        studio_id: string | null;
        customer_name: string;
        location: string;
        rating: number;
        body: string;
        image_url: string | null;
        published_at: string;
      }[]
    >;
    if (error || !data?.length) return seedReviews;
    return data.map((review) => ({
      id: review.id,
      studioId: review.studio_id || "",
      customerName: review.customer_name,
      location: review.location,
      rating: review.rating,
      body: review.body,
      imageUrl: review.image_url || undefined,
      publishedAt: review.published_at
    }));
  } catch {
    return seedReviews;
  }
}

export async function getFAQs(): Promise<FAQ[]> {
  if (!hasSupabaseEnv()) return seedFaqs;

  try {
    const supabase = createAnonServerClient();
    const { data, error } = (await supabase
      .from("faqs")
      .select("*")
      .eq("is_published", true)
      .is("studio_id", null)
      .order("sort_order", { ascending: true })) as unknown as SupabaseResult<
      {
        id: string;
        category: string;
        question: string;
        answer: string;
      }[]
    >;
    if (error || !data?.length) return seedFaqs;
    return data.map((faq) => ({
      id: faq.id,
      category: faq.category as FAQ["category"],
      question: faq.question,
      answer: faq.answer
    }));
  } catch {
    return seedFaqs;
  }
}
