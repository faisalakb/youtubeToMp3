import Stripe from "stripe";

/** True when the Pro subscription can actually be sold. */
export const isStripeConfigured = Boolean(
  process.env.STRIPE_SECRET_KEY && process.env.STRIPE_PRICE_ID
);

export const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID ?? "";

let cached: Stripe | null = null;

/** Server-only Stripe client. Throws if the secret key is absent. */
export function getStripe(): Stripe {
  if (cached) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Stripe is not configured.");
  cached = new Stripe(key, { apiVersion: "2024-06-20" });
  return cached;
}
