"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { hasSupabaseEnv, supabasePublicConfig } from "@/lib/config";

export { hasSupabaseEnv };

function missingSupabaseClient(): SupabaseClient {
  return null as unknown as SupabaseClient;
}

export function createBrowserSupabaseClient(): SupabaseClient {
  if (!hasSupabaseEnv()) {
    return missingSupabaseClient();
  }

  return createBrowserClient(
    supabasePublicConfig.url,
    supabasePublicConfig.anonKey
  );
}

export function createClient(): SupabaseClient {
  return createBrowserSupabaseClient();
}

export const createSupabaseBrowserClient = createBrowserSupabaseClient;
