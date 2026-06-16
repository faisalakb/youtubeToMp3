import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  // Run on pages but skip static assets and the vendored fonts.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|fonts/|.*\\.woff2$).*)"],
};
