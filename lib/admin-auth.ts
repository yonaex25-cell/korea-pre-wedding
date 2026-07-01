import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";

export async function requireAdminClient() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return {
      response: NextResponse.json(
        { message: "Supabase is not configured. Add environment variables to enable admin writes." },
        { status: 503 }
      )
    };
  }

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return {
      response: NextResponse.json(
        { message: "Admin authentication required." },
        { status: 401 }
      )
    };
  }

  if (!isAdminEmail(data.user.email)) {
    return {
      response: NextResponse.json(
        { message: "Admin access required." },
        { status: 403 }
      )
    };
  }

  return { supabase, user: data.user };
}

