import { NextRequest, NextResponse } from "next/server";
import { createAnonServerClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";

export async function requireAdmin(request: NextRequest): Promise<{
  error?: NextResponse;
  user?: { email?: string | null };
}> {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) {
    return {
      error: NextResponse.json({ error: "Missing admin session." }, { status: 401 })
    };
  }

  const supabase = createAnonServerClient(token);
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user?.email) {
    return {
      error: NextResponse.json({ error: "Invalid admin session." }, { status: 401 })
    };
  }

  if (!isAdminEmail(data.user.email)) {
    return {
      error: NextResponse.json({ error: "This account is not authorized for admin access." }, { status: 403 })
    };
  }

  return { user: data.user };
}
