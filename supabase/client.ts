"use client";

import { createBrowserClient } from "@supabase/ssr";
import { hasSupabaseEnv, supabasePublicConfig } from "@/lib/config";

export { hasSupabaseEnv };

export function createBrowserSupabaseClient(): any {
  if (!hasSupabaseEnv()) {
    return null;
  }

  return createBrowserClient(
    supabasePublicConfig.url,
    supabasePublicConfig.anonKey
  );
}

export function createClient(): any {
  return createBrowserSupabaseClient();
}

export const createSupabaseBrowserClient = createBrowserSupabaseClient;
