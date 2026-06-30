import { NextResponse } from "next/server";
import { z } from "zod";
import { createAnonServerClient, hasSupabaseEnv } from "@/lib/supabase/server";

const reservationSchema = z.object({
  studioId: z.string().optional(),
  name: z.string().min(2),
  email: z.string().email(),
  lineId: z.string().min(2),
  preferredDate: z.string().min(4),
  message: z.string().min(5)
});

export async function POST(request: Request) {
  const payload = reservationSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: "Please complete all reservation fields." }, { status: 400 });
  }

  if (!hasSupabaseEnv()) {
    return NextResponse.json(
      { error: "Supabase is not configured. Add .env.local values before saving reservations." },
      { status: 503 }
    );
  }

  const supabase = createAnonServerClient();
  const { error } = await supabase.from("reservations").insert({
    studio_id: payload.data.studioId || null,
    name: payload.data.name,
    email: payload.data.email,
    line_id: payload.data.lineId,
    preferred_date: payload.data.preferredDate,
    message: payload.data.message,
    status: "new"
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    message: "Reservation request saved. We will contact you by email or LINE."
  });
}
