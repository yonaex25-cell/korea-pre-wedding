import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { reservationSchema } from "@/lib/validations";

export async function POST(request: Request) {
  let json: unknown;

  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = reservationSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid reservation." },
      { status: 400 }
    );
  }

  const reservationInsertBasePayload = {
    name: parsed.data.name,
    email: parsed.data.email,
    line_id: parsed.data.lineId ?? "",
    preferred_date: parsed.data.preferredDate,
    message: parsed.data.message,
    status: "new"
  };

  const supabase = await createServiceRoleClient();

  if (!supabase) {
    return NextResponse.json({ ok: true, demo: true });
  }

  let studioId: string | null = null;

  if (parsed.data.studioSlug) {
    const { data: studio } = await supabase
      .from("studios")
      .select("id")
      .eq("slug", parsed.data.studioSlug)
      .maybeSingle();

    studioId = studio?.id ?? null;
  }

  const insertPayloads = [
    { ...reservationInsertBasePayload, studio_id: studioId },
    { ...reservationInsertBasePayload, studio_slug: parsed.data.studioSlug || null }
  ];

  let lastError: { message: string } | null = null;

  for (const payload of insertPayloads) {
    const { data, error } = await supabase
      .from("reservations")
      .insert(payload as never)
      .select("id")
      .single();

    if (!error) {
      return NextResponse.json({ ok: true, id: data?.id });
    }

    lastError = error;
  }

  if (lastError) {
    return NextResponse.json({ error: lastError.message }, { status: 500 });
  }

  return NextResponse.json({ error: "Could not save the reservation." }, { status: 500 });
}
