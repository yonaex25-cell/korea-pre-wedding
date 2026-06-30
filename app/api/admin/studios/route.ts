import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin-auth";
import { mapStudio } from "@/lib/repository";
import { createServiceRoleClient } from "@/lib/supabase/server";

const studioSchema = z.object({
  slug: z.string().min(2),
  name: z.string().min(2),
  region: z.string().min(2),
  styles: z.array(z.string()).min(1),
  budget: z.string().min(2),
  price_from_jpy: z.number().int().positive(),
  duration_hours: z.number().int().positive(),
  summary: z.string().min(5),
  description: z.string().min(10),
  hero_image: z.string().url(),
  included_services: z.array(z.string()).min(1),
  featured: z.boolean().optional()
});

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (admin.error) return admin.error;

  const supabase = createServiceRoleClient();
  const { data, error } = (await supabase
    .from("studios")
    .select("*, studio_images(image_url), faqs(id, question, answer, category)")
    .order("created_at", { ascending: false })) as unknown as {
    data: Parameters<typeof mapStudio>[0][] | null;
    error: { message: string } | null;
  };

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ studios: (data || []).map(mapStudio) });
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (admin.error) return admin.error;

  const payload = studioSchema.safeParse(await request.json());
  if (!payload.success) return NextResponse.json({ error: "Invalid studio payload." }, { status: 400 });

  const supabase = createServiceRoleClient();
  const { data, error } = await supabase.from("studios").insert(payload.data).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ studio: data });
}
