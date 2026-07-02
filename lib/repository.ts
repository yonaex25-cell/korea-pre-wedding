import {
  destinations as seedDestinations,
  faqs as seedFaqs,
  reviews as seedReviews,
  studios as seedStudios
} from "@/lib/data";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import type { FAQ, Reservation, Review, Studio, StudioFilters } from "@/lib/types";

type SupabaseClientLike = Awaited<ReturnType<typeof createServerSupabaseClient>>;

function normalizeList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item: unknown) => String(item)).filter(Boolean);
  }

  if (typeof value === "string") {
    return value.split(",").map((item: string) => item.trim()).filter(Boolean);
  }

  return [];
}

function normalizeImageUrl(image: unknown): string {
  if (typeof image === "string") {
    return image;
  }

  if (image && typeof image === "object" && "url" in image) {
    return String((image as { url?: string }).url || "");
  }

  return "";
}

export function mapReview(row: any): Review {
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
    createdAt: row.created_at ?? row.createdAt ?? new Date(0).toISOString()
  };
}

export function mapFaq(row: any): FAQ {
  return {
    id: String(row.id),
    studioId: row.studio_id ?? row.studioId ?? null,
    category: row.category ?? "general",
    question: row.question ?? "",
    answer: row.answer ?? "",
    sortOrder: Number(row.sort_order ?? row.sortOrder ?? 0)
  };
}

export function mapReservation(row: any): Reservation {
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
    createdAt: row.created_at ?? row.createdAt ?? new Date(0).toISOString()
  };
}

export function mapStudio(row: any): Studio {
  const relatedImages = Array.isArray(row.studio_images) ? row.studio_images : [];
  const imageObjects = relatedImages
    .slice()
    .sort((a: any, b: any) => Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0))
    .map((image: any) => ({
      id: String(image.id ?? image.url),
      url: image.url,
      alt: image.alt_text ?? image.alt ?? row.name,
      sortOrder: Number(image.sort_order ?? image.sortOrder ?? 0)
    }))
    .filter((image: { url?: string }) => Boolean(image.url));

  const existingImages = Array.isArray(row.images) ? row.images : [];
  const firstExistingImageUrl = normalizeImageUrl(existingImages[0]);
  const coverImage = row.cover_image_url ?? row.coverImage ?? firstExistingImageUrl ?? "";
  const reviews = Array.isArray(row.reviews) ? row.reviews.map((review: any) => mapReview(review)) : [];
  const faqs = Array.isArray(row.faqs) ? row.faqs.map((faq: any) => mapFaq(faq)) : [];
  const priceFrom = Number(row.price_from ?? row.priceFrom ?? 0);

  return {
    id: String(row.id),
    slug: row.slug ?? "",
    name: row.name ?? "",
    region: row.region ?? "Seoul",
    city: row.city ?? "",
    styles: normalizeList(row.styles),
    budgetMin: Number(row.budget_min ?? row.budgetMin ?? priceFrom),
    budgetMax: Number(row.budget_max ?? row.budgetMax ?? priceFrom),
    priceFrom,
    currency: row.currency ?? "JPY",
    description: row.description ?? "",
    longDescription: row.long_description ?? row.longDescription ?? row.description ?? "",
    coverImage,
    images: imageObjects.length
      ? imageObjects
      : existingImages.length
        ? existingImages
        : coverImage
          ? [{ id: String(row.id) + "-cover", url: coverImage, alt: row.name ?? "Studio image", sortOrder: 0 }]
          : [],
    services: normalizeList(row.included_services ?? row.services),
    destinations: normalizeList(row.destinations),
    featured: Boolean(row.featured),
    rating: Number(row.rating ?? (reviews.length ? reviews.reduce((sum: number, review: Review) => sum + review.rating, 0) / reviews.length : 4.8)),
    reviewCount: Number(row.review_count ?? row.reviewCount ?? reviews.length),
    reviews,
    faqs
  } as Studio;
}

function matchesBudget(studio: Studio, budget?: string) {
  if (!budget || budget === "all") {
    return true;
  }

  const price = Number(studio.priceFrom ?? 0);
  return (budget === "under300000" && price < 300000) ||
    (budget === "300000-500000" && price >= 300000 && price <= 500000) ||
    (budget === "500000plus" && price > 500000);
}

function applyStudioFilters(studios: Studio[], filters: StudioFilters = {}) {
  const search = filters.search?.trim().toLowerCase();
  const region = filters.region && filters.region !== "all" ? filters.region.toLowerCase() : undefined;
  const style = filters.style && filters.style !== "all" ? filters.style.toLowerCase() : undefined;

  return studios.filter((studio: Studio) => {
    const searchText = [studio.name, studio.region, studio.city, studio.description, ...normalizeList(studio.styles)]
      .join(" ")
      .toLowerCase();
    const matchesSearch = !search || searchText.includes(search);
    const matchesRegion = !region || String(studio.region).toLowerCase() === region;
    const matchesStyle = !style || normalizeList(studio.styles).some((item: string) => item.toLowerCase() === style);

    return matchesSearch && matchesRegion && matchesStyle && matchesBudget(studio, filters.budget);
  });
}

async function createReadableClient(): Promise<SupabaseClientLike> {
  return await createServerSupabaseClient();
}

async function createWritableClient(): Promise<SupabaseClientLike> {
  return (await createServiceRoleClient()) ?? (await createServerSupabaseClient());
}

export async function getStudios(filters: StudioFilters = {}) {
  const supabase = await createReadableClient();

  if (!supabase) {
    return applyStudioFilters(seedStudios.map((studio: Studio) => mapStudio(studio)), filters);
  }

  const { data, error } = await supabase
    .from("studios")
    .select("*, studio_images(*), reviews(*), faqs(*)")
    .eq("is_published", true)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error || !data?.length) {
    return applyStudioFilters(seedStudios.map((studio: Studio) => mapStudio(studio)), filters);
  }

  return applyStudioFilters((data as any[]).map((row: any) => mapStudio(row)), filters);
}

export async function getFeaturedStudios(limit = 3) {
  const studios = await getStudios();
  return studios.filter((studio: Studio) => Boolean(studio.featured)).slice(0, limit);
}

export async function getStudioBySlug(slug: string) {
  const supabase = await createReadableClient();

  if (supabase) {
    const { data, error } = await supabase
      .from("studios")
      .select("*, studio_images(*), reviews(*), faqs(*)")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (!error && data) {
      return mapStudio(data);
    }
  }

  const studio = seedStudios.find((item: Studio) => item.slug === slug);
  return studio ? mapStudio(studio) : null;
}

export async function getReviews() {
  const supabase = await createReadableClient();

  if (!supabase) {
    return seedReviews.map((review: Review) => mapReview(review));
  }

  const { data, error } = await supabase
    .from("reviews")
    .select("*, studios(name, slug)")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error || !data?.length) {
    return seedReviews.map((review: Review) => mapReview(review));
  }

  return (data as any[]).map((row: any) => mapReview(row));
}

export async function getFaqs() {
  const supabase = await createReadableClient();

  if (!supabase) {
    return seedFaqs.map((faq: FAQ) => mapFaq(faq));
  }

  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    return seedFaqs.map((faq: FAQ) => mapFaq(faq));
  }

  return (data as any[]).map((row: any) => mapFaq(row));
}

export async function getFAQs() {
  return getFaqs();
}

export const getFAQS = getFAQs;

export function getDestinations() {
  return seedDestinations;
}

export async function getReservations() {
  const supabase = await createWritableClient();

  if (!supabase) {
    return [] as Reservation[];
  }

  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data?.length) {
    return [] as Reservation[];
  }

  return (data as any[]).map((row: any) => mapReservation(row));
}

export async function createReservation(input: Omit<Reservation, "id" | "status" | "createdAt">) {
  const supabase = await createReadableClient();

  if (!supabase) {
    return { demo: true, id: "demo-reservation" };
  }

  const { data, error } = await supabase
    .from("reservations")
    .insert({
      studio_id: input.studioId ?? null,
      studio_slug: input.studioSlug ?? null,
      name: input.name,
      email: input.email,
      line_id: input.lineId,
      preferred_date: input.preferredDate,
      message: input.message
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return { demo: false, id: data.id };
}

export async function getAdminStudios() {
  return getStudios();
}

export async function getAdminReviews() {
  return getReviews();
}

export async function getAdminFaqs() {
  return getFaqs();
}

export async function getAdminFAQs() {
  return getFaqs();
}

export async function getAdminReservations() {
  return getReservations();
}

export async function getDashboardStats() {
  const [studios, reservations, reviews, faqs] = await Promise.all([
    getStudios(),
    getReservations(),
    getReviews(),
    getFaqs()
  ]);

  return {
    studioCount: studios.length,
    reservationCount: reservations.length,
    reviewCount: reviews.length,
    faqCount: faqs.length
  };
}

export const getAdminStats = getDashboardStats;
