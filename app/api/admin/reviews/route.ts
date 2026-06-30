import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createServiceRoleClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (admin.error) return admin.error;

  const supabase = createServiceRoleClient();
  const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ reviews: data || [] });
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (admin.error) return admin.error;

  const body = await request.json();
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("reviews")
    .insert({
      studio_id: body.studio_id || null,
      customer_name: body.customer_name,
      location: body.location,
      rating: Number(body.rating || 5),
      body: body.body,
      is_published: true,
      published_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ review: data });
}
