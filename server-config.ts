export const openAIConfig = {
  apiKey: process.env.OPENAI_API_KEY || "",
  model: process.env.OPENAI_MODEL || "gpt-4o-mini"
};

export const supabaseServerConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || ""
};

export function isOpenAIConfigured() {
  return Boolean(openAIConfig.apiKey);
}

export function hasSupabaseEnv() {
  return Boolean(supabaseServerConfig.url && supabaseServerConfig.anonKey);
}

export function hasSupabaseServiceRoleEnv() {
  return Boolean(supabaseServerConfig.url && supabaseServerConfig.serviceRoleKey);
}
