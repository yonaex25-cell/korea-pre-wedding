import { z } from "zod";
import { REGIONS } from "@/lib/types";

export const reservationSchema = z.object({
  studioSlug: z.string().trim().optional().nullable(),
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  lineId: z.string().trim().min(2, "Please enter your LINE ID."),
  preferredDate: z.string().regex(/^d{4}-d{2}-d{2}$/, "Please choose a preferred date."),
  message: z.string().trim().min(5, "Please share a few details about your request.")
});

export const recommendationSchema = z.object({
  region: z.string().trim().min(1),
  style: z.string().trim().min(1),
  budget: z.string().trim().min(1),
  season: z.string().trim().min(1),
  mood: z.string().trim().min(1),
  priorities: z.array(z.string()).min(1),
  language: z.enum(["KR", "JP", "EN"]).default("EN")
});

export const studioAdminSchema = z.object({
  slug: z.string().trim().min(2).regex(/^[a-z0-9-]+$/),
  name: z.string().trim().min(2),
  region: z.enum(REGIONS),
  city: z.string().trim().min(2),
  styles: z.array(z.string().trim().min(1)).min(1),
  budget_min: z.coerce.number().int().nonnegative(),
  budget_max: z.coerce.number().int().nonnegative(),
  price_from: z.coerce.number().int().nonnegative(),
  currency: z.string().trim().min(3).default("JPY"),
  description: z.string().trim().min(10),
  long_description: z.string().trim().min(20),
  cover_image_url: z.string().trim().url(),
  included_services: z.array(z.string().trim().min(1)).default([]),
  destinations: z.array(z.string().trim().min(1)).default([]),
  featured: z.boolean().default(false),
  is_published: z.boolean().default(true)
}).refine((value) => value.budget_max >= value.budget_min, {
  message: "budget_max must be greater than or equal to budget_min",
  path: ["budget_max"]
});

export const reviewAdminSchema = z.object({
  studio_id: z.string().uuid().nullable().optional(),
  customer_name: z.string().trim().min(2),
  country: z.string().trim().min(2).default("Japan"),
  rating: z.coerce.number().int().min(1).max(5),
  content: z.string().trim().min(10),
  image_url: z.string().trim().url().optional().nullable(),
  is_published: z.boolean().default(true)
});

export const faqAdminSchema = z.object({
  studio_id: z.string().uuid().nullable().optional(),
  category: z.string().trim().min(2).default("general"),
  question: z.string().trim().min(5),
  answer: z.string().trim().min(10),
  sort_order: z.coerce.number().int().default(0),
  is_published: z.boolean().default(true)
});

export const reservationStatusSchema = z.object({
  status: z.enum(["new", "contacted", "confirmed", "completed", "cancelled"])
});
