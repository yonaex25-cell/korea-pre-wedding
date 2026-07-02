import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseJsClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { hasSupabaseEnv, hasSupabaseServiceRoleEnv, supabaseServerConfig } from "@/lib/config";

export { hasSupabaseEnv, hasSupabaseServiceRoleEnv };

export async function createAnonServerClient(): Promise<any> {
  if (!hasSupabaseEnv()) {
    return null;
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
        setAll(cookiesToSet: any) {
          try {
            cookiesToSet.forEach(({ name, value, options }: any) => {
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

export async function createServerSupabaseClient(): Promise<any> {
  return createAnonServerClient();
}

export async function createClient(): Promise<any> {
  return createAnonServerClient();
}

export function createServiceRoleClient(): any {
  if (!hasSupabaseServiceRoleEnv()) {
    return null;
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
