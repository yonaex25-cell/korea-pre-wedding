import {
  destinations as seedDestinations,
  faqs as seedFaqs,
  reviews as seedReviews,
  studios as seedStudios
} from "@/lib/data";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import type { FAQ, Reservation, Review, Studio, StudioFilters, StudioImage } from "@/lib/types";

type SupabaseClientLike = Awaited<ReturnType<typeof createServerSupabaseClient>>;
type DataRow = Record<string, unknown>;

function asRow(value: unknown): DataRow {
  return value && typeof value === "object" ? value as DataRow : {};
}

function asRows(value: unknown): DataRow[] {
  return Array.isArray(value) ? value.map((item) => asRow(item)) : [];
}

function readString(row: DataRow, key: string, fallback = ""): string {
  const value = row[key];
  return value === null || value === undefined ? fallback : String(value);
}

function readNullableString(row: DataRow, key: string): string | null {
  const value = row[key];
  return value === null || value === undefined || value === "" ? null : String(value);
}

function readNumber(row: DataRow, key: string, fallback = 0): number {
  const value = Number(row[key]);
  return Number.isFinite(value) ? value : fallback;
}

function normalizeList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item: unknown) => String(item)).filter(Boolean);
  }

  if (typeof value === "string") {
    return value.split(",").map((item: string) => item.trim()).filter(Boolean);
  }

  return [];
}

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

function normalizeImageUrl(image: unknown): string {
  if (typeof image === "string") {
    return image;
  }

  const row = asRow(image);
  return readString(row, "url");
}

function mapStudioImage(value: unknown, fallbackName: string): StudioImage | null {
  if (typeof value === "string") {
    return value ? { id: value, url: value, alt: fallbackName, sortOrder: 0 } : null;
  }

  const row = asRow(value);
  const url = readString(row, "url");

  if (!url) {
    return null;
  }

  return {
    id: readString(row, "id", url),
    url,
    alt: readString(row, "alt", readString(row, "alt_text", fallbackName)),
    sortOrder: readNumber(row, "sortOrder", readNumber(row, "sort_order", 0))
  };
}

export function mapReview(input: unknown): Review {
  const row = asRow(input);
  const studio = asRow(row.studios);

  return {
    id: readString(row, "id"),
    studioId: readNullableString(row, "studio_id") ?? readNullableString(row, "studioId"),
    studioName: readString(studio, "name", readString(row, "studioName", readString(row, "studio_name"))),
    studioSlug: readString(studio, "slug", readString(row, "studioSlug", readString(row, "studio_slug"))),
    customerName: readString(row, "customer_name", readString(row, "customerName", readString(row, "name", "Guest"))),
    country: readString(row, "country", readString(row, "location", "Japan")),
    location: readString(row, "location", readString(row, "country", "Japan")),
    rating: readNumber(row, "rating", 5),
    content: readString(row, "content", readString(row, "comment", readString(row, "body"))),
    body: readString(row, "body", readString(row, "content", readString(row, "comment"))),
    imageUrl: readNullableString(row, "image_url") ?? readNullableString(row, "imageUrl"),
    createdAt: normalizeDateString(row.created_at ?? row.createdAt),
    publishedAt: normalizeDateString(row.published_at ?? row.publishedAt ?? row.created_at ?? row.createdAt)
  };
}

export function mapFaq(input: unknown): FAQ {
  const row = asRow(input);

  return {
    id: readString(row, "id"),
    studioId: readNullableString(row, "studio_id") ?? readNullableString(row, "studioId"),
    category: readString(row, "category", "general"),
    question: readString(row, "question"),
    answer: readString(row, "answer"),
    sortOrder: readNumber(row, "sort_order", readNumber(row, "sortOrder", 0))
  };
}

export function mapReservation(input: unknown): Reservation {
  const row = asRow(input);
  const status = readString(row, "status", "new") as Reservation["status"];

  return {
    id: readString(row, "id"),
    studioId: readNullableString(row, "studio_id") ?? readNullableString(row, "studioId"),
    studioSlug: readNullableString(row, "studio_slug") ?? readNullableString(row, "studioSlug"),
    name: readString(row, "name"),
    email: readString(row, "email"),
    lineId: readString(row, "line_id", readString(row, "lineId")),
    preferredDate: readString(row, "preferred_date", readString(row, "preferredDate")),
    message: readString(row, "message"),
    status,
    createdAt: normalizeDateString(row.created_at ?? row.createdAt)
  };
}

export function mapStudio(input: unknown): Studio {
  const row = asRow(input);
  const relatedImages = asRows(row.studio_images);
  const imageObjects = relatedImages
    .slice()
    .sort((a, b) => readNumber(a, "sort_order") - readNumber(b, "sort_order"))
    .map((image) => mapStudioImage(image, readString(row, "name")))
    .filter((image): image is StudioImage => Boolean(image));

  const existingImages = Array.isArray(row.images)
    ? row.images
        .map((image) => mapStudioImage(image, readString(row, "name")))
        .filter((image): image is StudioImage => Boolean(image))
    : [];
  const firstExistingImageUrl = normalizeImageUrl(existingImages[0]);
  const coverImage = readString(row, "cover_image_url", readString(row, "coverImage", firstExistingImageUrl));
  const reviews = asRows(row.reviews).map((review) => mapReview(review));
  const faqs = asRows(row.faqs).map((faq) => mapFaq(faq));
  const priceFrom = readNumber(row, "price_from", readNumber(row, "priceFrom", 0));
  const budget = readString(row, "budget", "Premium");
  const priceFromJpy = readNumber(row, "price_from_jpy", readNumber(row, "priceFromJpy", priceFrom));
  const durationHours = readNumber(row, "duration_hours", readNumber(row, "durationHours", 0));
  const summary = readString(row, "summary", readString(row, "description"));
  const heroImage = readString(row, "hero_image", readString(row, "heroImage", coverImage));
  const includedServices = normalizeList(row.included_services ?? row.includedServices ?? row.services);
  const fallbackImage = coverImage
    ? [{ id: readString(row, "id") + "-cover", url: coverImage, alt: readString(row, "name", "Studio image"), sortOrder: 0 }]
    : [];

  return {
    id: readString(row, "id"),
    slug: readString(row, "slug"),
    name: readString(row, "name"),
    region: readString(row, "region", "Seoul"),
    city: readString(row, "city"),
    styles: normalizeList(row.styles),
    budget,
    budgetMin: readNumber(row, "budget_min", readNumber(row, "budgetMin", priceFrom)),
    budgetMax: readNumber(row, "budget_max", readNumber(row, "budgetMax", priceFrom)),
    priceFrom,
    priceFromJpy,
    durationHours,
    currency: readString(row, "currency", "JPY"),
    description: readString(row, "description"),
    summary,
    longDescription: readString(row, "long_description", readString(row, "longDescription", readString(row, "description"))),
    coverImage,
    heroImage,
    images: imageObjects.length ? imageObjects : existingImages.length ? existingImages : fallbackImage,
    includedServices,
    services: includedServices,
    destinations: normalizeList(row.destinations),
    featured: Boolean(row.featured),
    rating: readNumber(
      row,
      "rating",
      reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 4.8
    ),
    reviewCount: readNumber(row, "review_count", readNumber(row, "reviewCount", reviews.length)),
    reviews,
    faqs
  };
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

  return applyStudioFilters(data.map((row: unknown) => mapStudio(row)), filters);
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

  return data.map((row: unknown) => mapReview(row));
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

  return data.map((row: unknown) => mapFaq(row));
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

  return data.map((row: unknown) => mapReservation(row));
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
