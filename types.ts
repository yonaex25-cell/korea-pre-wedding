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

export type StudioImage = any;

export type Review = {
  id: string;
  studioId?: string | null;
  studioName?: string;
  studioSlug?: string;
  customerName: string;
  country: string;
  rating: number;
  content: string;
  imageUrl?: string | null;
  createdAt: string;
  [key: string]: any;
};

export type FAQ = {
  id: string;
  studioId?: string | null;
  category: string;
  question: string;
  answer: string;
  sortOrder: number;
  [key: string]: any;
};

export type Studio = {
  id: string;
  slug: string;
  name: string;
  region: Region | string;
  styles: string[];
  images: StudioImage[];
  description: string;
  priceFrom: number;
  rating: number;
  featured?: boolean;
  [key: string]: any;
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
  [key: string]: any;
};

export type RecommendationAnswers = {
  region: string;
  style: string;
  budget: string;
  season: string;
  priorities: string[];
  mood: string;
};

export type Recommendation = {
  studio: Studio;
  score: number;
  reasons: string[];
};
