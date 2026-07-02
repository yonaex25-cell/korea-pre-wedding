export const siteConfig = {
  name: "Dasoni",
  subtitle: "Korea Wedding Photography Concierge",
  description:
    "Dasoni connects international couples with curated Korean wedding photography studios, locations, and concierge support.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
};

export const supabasePublicConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
};

export const supabaseServerConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || ""
};

export function hasSupabaseEnv(): boolean {
  return Boolean(supabasePublicConfig.url && supabasePublicConfig.anonKey);
}

export function hasSupabaseServiceRoleEnv(): boolean {
  return Boolean(
    supabaseServerConfig.url && supabaseServerConfig.serviceRoleKey
  );
}

export function isSupabaseConfigured(): boolean {
  return hasSupabaseEnv();
}