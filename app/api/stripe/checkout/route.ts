import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getStripe, isStripeConfigured, STRIPE_PRICE_ID } from "@/lib/stripe/server";

/**
 * Creates a Stripe Checkout session for the Pro subscription and returns its
 * URL. Requires a signed-in user; reuses or creates the user's Stripe customer
 * and records the customer id on their profile via the service role.
 */
export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured || !isStripeConfigured) {
    return NextResponse.json({ error: "Billing is not configured." }, { status: 503 });
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const stripe = getStripe();
  const admin = createAdminClient();
  const origin = new URL(request.url).origin;

  // Find or create the Stripe customer for this user.
  const { data: profile } = await admin
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single();

  let customerId = profile?.stripe_customer_id ?? null;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email ?? undefined,
      metadata: { supabase_user_id: user.id },
    });
    customerId = customer.id;
    await admin.from("profiles").update({ stripe_customer_id: customerId }).eq("id", user.id);
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
    allow_promotion_codes: true,
    success_url: `${origin}/account?upgraded=1`,
    cancel_url: `${origin}/pricing?canceled=1`,
    metadata: { supabase_user_id: user.id },
    subscription_data: { metadata: { supabase_user_id: user.id } },
  });

  return NextResponse.json({ url: session.url });
}
