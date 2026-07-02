import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { createClient as createSupabaseJsClient, type SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { hasSupabaseEnv, hasSupabaseServiceRoleEnv, supabaseServerConfig } from "@/lib/config";

export { hasSupabaseEnv, hasSupabaseServiceRoleEnv };

type SupabaseCookieToSet = {
  name: string;
  value: string;
  options?: CookieOptions;
};

function missingSupabaseClient(): SupabaseClient {
  return null as unknown as SupabaseClient;
}

export function createAnonServerClient(token?: string | null): SupabaseClient {
  if (!hasSupabaseEnv()) {
    return missingSupabaseClient();
  }

  return createSupabaseJsClient(
    supabaseServerConfig.url,
    supabaseServerConfig.anonKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      },
      global: token
        ? {
            headers: {
              Authorization: "Bearer " + token
            }
          }
        : undefined
    }
  );
}

export async function createServerSupabaseClient(): Promise<SupabaseClient> {
  if (!hasSupabaseEnv()) {
    return missingSupabaseClient();
  }

  const cookieStore = await cookies();

  return createServerClient(
    supabaseServerConfig.url,
    supabaseServerConfig.anonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: SupabaseCookieToSet[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }: SupabaseCookieToSet) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server Components cannot always set cookies; middleware and route handlers can.
          }
        }
      }
    }
  );
}

export async function createClient(): Promise<SupabaseClient> {
  return await createServerSupabaseClient();
}

export function createServiceRoleClient(): SupabaseClient {
  if (!hasSupabaseServiceRoleEnv()) {
    return missingSupabaseClient();
  }

  return createSupabaseJsClient(
    supabaseServerConfig.url,
    supabaseServerConfig.serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );
}

export const createSupabaseServerClient = createServerSupabaseClient;