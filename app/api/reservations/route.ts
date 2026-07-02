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

  const reservationInsertPayload = {
    studio_slug: parsed.data.studioSlug || null,
    name: parsed.data.name,
    email: parsed.data.email,
    line_id: parsed.data.lineId,
    preferred_date: parsed.data.preferredDate,
    message: parsed.data.message,
    status: "new"
  };

  const supabase = await createServiceRoleClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured. Please add the required environment variables." },
      { status: 503 }
    );
  }

  const { data, error } = await supabase
    .from("reservations")
    .insert(reservationInsertPayload as never)
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: data?.id });
}
