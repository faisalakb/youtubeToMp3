import Link from "next/link";
import type { Metadata } from "next";
import Brand from "@/components/Brand";
import Footer from "@/components/Footer";
import { UpgradeButton } from "@/components/BillingButtons";
import { site } from "@/lib/site";
import { FREE_DAILY_LIMIT } from "@/lib/entitlements";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isStripeConfigured } from "@/lib/stripe/server";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Pricing — free to use, Pro for power users",
  description:
    "mp3bat is free to convert audio in your browser. Go Pro for unlimited conversions, batch processing, and saved preferences.",
  alternates: { canonical: "/pricing" },
};

export default async function PricingPage() {
  let signedIn = false;
  if (isSupabaseConfigured) {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    signedIn = Boolean(user);
  }

  const billingLive = isSupabaseConfigured && isStripeConfigured;

  return (
    <main className="wrap">
      <Brand note="pricing" />
      <nav className="breadcrumbs">
        <Link href="/">Home</Link> / Pricing
      </nav>

      <p className="eyebrow">Simple &amp; honest</p>
      <h1>
        Free to use. <span className="em">Pro when you need more.</span>
      </h1>
      <p className="sub">
        The converter is free and always runs on your device. Pro removes the daily cap and adds
        conveniences for people who convert a lot.
      </p>

      <div className="plans">
        <div className="plan">
          <h3>Free</h3>
          <div className="price">
            $0<small> / forever</small>
          </div>
          <ul>
            <li>Convert audio to MP3 in your browser</li>
            <li>Up to {FREE_DAILY_LIMIT} conversions per day</li>
            <li>All bitrates up to 320 kbps</li>
            <li>No upload, no ads, no account required</li>
          </ul>
          <Link href="/" className="ghost-btn" style={{ display: "inline-block", textDecoration: "none" }}>
            Start converting
          </Link>
        </div>

        <div className="plan pro">
          <h3>Pro</h3>
          <div className="price">
            $5<small> / month</small>
          </div>
          <ul>
            <li>Everything in Free</li>
            <li>Unlimited conversions</li>
            <li>Batch / multi-file queue</li>
            <li>Saved quality preferences</li>
            <li>Supporter badge — fund a tool that respects you</li>
          </ul>
          {billingLive ? (
            <UpgradeButton signedIn={signedIn} />
          ) : (
            <div className="err" style={{ display: "block" }}>
              <b>Pro isn&apos;t live yet.</b> Add Supabase + Stripe keys to enable upgrades. The free
              converter works now.
            </div>
          )}
        </div>
      </div>

      <div className="note">
        Why pay for something client-side? Because it stays clean — no ads, no data harvesting, no
        rip features. Pro is how mp3bat funds itself honestly. See{" "}
        <Link href="/guides/safest-converter">why that matters</Link>.
      </div>

      <Footer />
    </main>
  );
}
