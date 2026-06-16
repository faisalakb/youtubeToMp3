import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config";

type CookieToSet = { name: string; value: string; options: CookieOptions };

/**
 * Server Supabase client for Server Components and Route Handlers, bound to
 * the request cookies. Only call when `isSupabaseConfigured` is true.
 */
export function createClient() {
  const cookieStore = cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Called from a Server Component — safe to ignore; the middleware
          // refreshes the session cookie on the next request.
        }
      },
    },
  });
}
