import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createServiceRoleClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (admin.error) return admin.error;

  const supabase = createServiceRoleClient();
  const { data, error } = await supabase.from("faqs").select("*").order("sort_order", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ faqs: data || [] });
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (admin.error) return admin.error;

  const body = await request.json();
  const supabase = createServiceRoleClient();
  const faqInsertPayload = {
    studio_id: body.studio_id || null,
    category: body.category || "general",
    question: body.question,
    answer: body.answer,
    is_published: true
  };

  const { data, error } = await supabase
    .from("faqs")
    .insert(faqInsertPayload as never)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ faq: data });
}
