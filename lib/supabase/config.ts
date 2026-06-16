/**
 * Environment detection so the whole app degrades gracefully when keys are
 * absent. Read these flags before creating a client or rendering auth/billing
 * UI — when false, those features render an inert "not configured" state and
 * the converter keeps working unlimited.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** True when the public Supabase env is present (auth + cap can run). */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
