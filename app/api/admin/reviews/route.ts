import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createServiceRoleClient } from "@/lib/supabase/server";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, context: RouteContext) {
  const admin = await requireAdmin(request);
  if (admin.error) return admin.error;

  const { id } = await context.params;
  const payload = await request.json();
  const supabase = createServiceRoleClient();
  const studioUpdatePayload: Record<string, unknown> = {
    ...payload,
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from("studios")
    .update(studioUpdatePayload as never)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ studio: data });
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const admin = await requireAdmin(request);
  if (admin.error) return admin.error;

  const { id } = await context.params;
  const supabase = createServiceRoleClient();
  const { error } = await supabase.from("studios").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
