import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  lineId: z.string().trim().min(2),
  message: z.string().trim().min(5)
});

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = contactSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ message: "Please check your contact details." }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
