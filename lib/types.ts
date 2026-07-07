export const REGIONS = ["Seoul", "Jeju", "Busan"] as const;
export type Region = (typeof REGIONS)[number];

export const STYLES = [
  "Classic",
  "Editorial",
  "Natural",
  "Resort",
  "Cinematic",
  "Modern",
  "Minimal",
  "Hanbok"
] as const;
export type StudioStyle = (typeof STYLES)[number];

export type BudgetFilter = "under300000" | "300000-500000" | "500000plus";

export type StudioFilters = {
  search?: string;
  region?: string;
  style?: string;
  budget?: string;
};

export type StudioImage = {
  id: string;
  url: string;
  alt: string;
  sortOrder?: number;
  [key: string]: unknown;
};

export type Review = {
  id: string;
  studioId?: string | null;
  studioName?: string;
  studioSlug?: string;
  customerName: string;
  country: string;
  location?: string;
  rating: number;
  content: string;
  body?: string;
  imageUrl?: string | null;
  createdAt: string;
  publishedAt?: string | null;
  [key: string]: unknown;
};

export type FAQ = {
  id: string;
  studioId?: string | null;
  category: string;
  question: string;
  answer: string;
  sortOrder: number;
  [key: string]: unknown;
};

export type Studio = {
  id: string;
  slug: string;
  name: string;
  region: Region | string;
  city: string;
  styles: string[];
  images: StudioImage[];
  description: string;
  longDescription: string;
  coverImage: string;
  services: string[];
  destinations: string[];
  includedServices: string[];
  budget: string;
  budgetMin: number;
  budgetMax: number;
  currency: string;
  priceFrom: number;
  priceFromJpy: number;
  durationHours: number;
  summary: string;
  heroImage: string;
  rating: number;
  reviewCount?: number;
  featured?: boolean;
  reviews?: Review[];
  faqs?: FAQ[];
  [key: string]: unknown;
};

export type Reservation = {
  id: string;
  studioId?: string | null;
  studioSlug?: string | null;
  name: string;
  email: string;
  lineId: string;
  preferredDate: string;
  message: string;
  status: "new" | "contacted" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
  [key: string]: unknown;
};

export type RecommendationAnswers = {
  region: string;
  style: string;
  budget: string;
  season: string;
  priorities: string[];
  mood: string;
  language?: "KR" | "JP" | "EN";
};

export type Recommendation = {
  studio: Studio;
  score: number;
  reasons: string[];
};
