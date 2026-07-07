import { demoFaqs, demoReviews, demoStudios } from "@/lib/data";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { FAQ, Reservation, Review, Studio } from "@/lib/types";

function normalizeDateString(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "";
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? "" : value.toISOString();
  }

  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

function mapStudio(row: any): Studio {
  const images = (row.studio_images || []).map((image: any) => ({
    id: image.id,
    url: image.url,
    alt: image.alt_text || row.name,
    sortOrder: image.sort_order || 0
  }));
  const coverImage = row.cover_image_url || images[0]?.url || "";
  const includedServices = row.included_services || [];
  const priceFrom = row.price_from ?? row.priceFrom ?? 0;

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    region: row.region,
    city: row.city,
    styles: row.styles || [],
    budget: row.budget || "Premium",
    budgetMin: row.budget_min,
    budgetMax: row.budget_max,
    priceFrom,
    priceFromJpy: row.price_from_jpy ?? row.priceFromJpy ?? priceFrom,
    durationHours: row.duration_hours ?? row.durationHours ?? 0,
    currency: row.currency || "JPY",
    description: row.description,
    summary: row.summary || row.description || "",
    longDescription: row.long_description,
    coverImage,
    heroImage: row.hero_image || row.heroImage || coverImage,
    images: images.length ? images : [{ id: row.id + "-cover", url: coverImage, alt: row.name, sortOrder: 0 }],
    services: includedServices,
    includedServices,
    destinations: row.destinations || [],
    featured: Boolean(row.featured),
    rating: 4.8,
    reviewCount: 0,
    reviews: [],
    faqs: []
  };
}
function mapReservation(row: any): Reservation {
  return {
    id: String(row.id),
    studioId: row.studio_id ?? row.studioId ?? null,
    studioSlug: row.studio_slug ?? row.studioSlug ?? null,
    name: row.name ?? "",
    email: row.email ?? "",
    lineId: row.line_id ?? row.lineId ?? "",
    preferredDate: row.preferred_date ?? row.preferredDate ?? "",
    message: row.message ?? "",
    status: row.status ?? "new",
    createdAt: normalizeDateString(row.created_at ?? row.createdAt)
  };
}

function mapReview(row: any): Review & { isPublished?: boolean } {
  return {
    id: String(row.id),
    studioId: row.studio_id ?? row.studioId ?? null,
    studioName: row.studios?.name ?? row.studioName ?? row.studio_name,
    studioSlug: row.studios?.slug ?? row.studioSlug ?? row.studio_slug,
    customerName: row.customer_name ?? row.customerName ?? row.name ?? "Guest",
    country: row.country ?? "Japan",
    rating: Number(row.rating ?? 5),
    content: row.content ?? row.comment ?? "",
    imageUrl: row.image_url ?? row.imageUrl ?? null,
    createdAt: normalizeDateString(row.created_at ?? row.createdAt),
    isPublished: row.is_published ?? row.isPublished
  };
}

export async function getAdminStats() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return {
      studios: demoStudios.length,
      reservations: 0,
      reviews: demoReviews.length,
      faqs: demoFaqs.length,
      configured: false
    };
  }

  const [studios, reservations, reviews, faqs] = await Promise.all([
    supabase.from("studios").select("id", { count: "exact", head: true }),
    supabase.from("reservations").select("id", { count: "exact", head: true }),
    supabase.from("reviews").select("id", { count: "exact", head: true }),
    supabase.from("faqs").select("id", { count: "exact", head: true })
  ]);

  return {
    studios: studios.count || 0,
    reservations: reservations.count || 0,
    reviews: reviews.count || 0,
    faqs: faqs.count || 0,
    configured: true
  };
}

export async function getAdminStudios() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return demoStudios;
  }

  const { data, error } = await supabase
    .from("studios")
    .select("*, studio_images(*)")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return (data as any[]).map((row: any) => mapStudio(row));
}

export async function getAdminReservations() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return [] as Reservation[];
  }

  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [] as Reservation[];
  }

  return (data as any[]).map((row: any) => mapReservation(row)) as Reservation[];
}

export async function getAdminReviews() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return demoReviews.map((review: Review) => ({ ...mapReview(review), isPublished: true }));
  }

  const { data, error } = await supabase
    .from("reviews")
    .select("*, studios(name, slug)")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return (data as any[]).map((row: any) => mapReview(row));
}

export async function getAdminFaqs() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return demoFaqs.map((faq: FAQ) => ({ ...faq, isPublished: true }));
  }

  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data) {
    return [];
  }

  return (data as any[]).map((row: any) => ({
    id: row.id,
    studioId: row.studio_id,
    category: row.category,
    question: row.question,
    answer: row.answer,
    sortOrder: row.sort_order,
    isPublished: row.is_published
  })) as Array<FAQ & { isPublished: boolean }>;
}