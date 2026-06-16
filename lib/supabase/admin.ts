import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "./config";

/**
 * Service-role Supabase client. SERVER ONLY — never import into client code.
 * Bypasses RLS, so it is used exclusively by the Stripe webhook to write Pro
 * status and subscription rows the user is not permitted to write themselves.
 */
export function createAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !serviceKey) {
    throw new Error("Supabase service role is not configured.");
  }
  return createSupabaseClient(SUPABASE_URL, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
