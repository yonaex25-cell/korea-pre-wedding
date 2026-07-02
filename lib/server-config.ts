export const openAIConfig = {
  apiKey: process.env.OPENAI_API_KEY || "",
  model: process.env.OPENAI_MODEL || "gpt-4o-mini"
};

export function isOpenAIConfigured(): boolean {
  return Boolean(openAIConfig.apiKey);
}

export const supabaseServerConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || ""
};

export function hasSupabaseEnv(): boolean {
  return Boolean(supabaseServerConfig.url && supabaseServerConfig.anonKey);
}

export function hasSupabaseServiceRoleEnv(): boolean {
  return Boolean(
    supabaseServerConfig.url && supabaseServerConfig.serviceRoleKey
  );
}