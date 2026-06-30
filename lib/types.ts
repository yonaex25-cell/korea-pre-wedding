export type Region = "Seoul" | "Jeju" | "Busan";
export type StudioStyle = "Classic" | "Modern" | "Natural" | "Editorial" | "Hanbok";

export type Studio = {
  id: string;
  slug: string;
  name: string;
  region: Region;
  styles: StudioStyle[];
  budget: "Premium" | "Luxury" | "Signature";
  priceFromJpy: number;
  durationHours: number;
  summary: string;
  description: string;
  heroImage: string;
  images: string[];
  includedServices: string[];
  faqs: FAQ[];
  featured: boolean;
  rating: number;
  reviewCount: number;
};

export type Review = {
  id: string;
  studioId: string;
  customerName: string;
  location: string;
  rating: number;
  body: string;
  imageUrl?: string;
  publishedAt: string;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: "general" | "studio" | "reservation" | "travel";
};

export type ReservationPayload = {
  studioId?: string;
  name: string;
  email: string;
  lineId: string;
  preferredDate: string;
  message: string;
};

export type RecommendationInput = {
  region: Region | "Any";
  style: StudioStyle | "Any";
  budget: "Under 250,000 JPY" | "250,000-400,000 JPY" | "400,000+ JPY";
  priorities: string[];
  travelMonth: string;
};
