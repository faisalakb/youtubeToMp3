import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Brand from "@/components/Brand";
import Footer from "@/components/Footer";
import { UpgradeButton, ManageBillingButton } from "@/components/BillingButtons";
import { FREE_DAILY_LIMIT } from "@/lib/entitlements";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isStripeConfigured } from "@/lib/stripe/server";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Your account",
  description: "Manage your mp3bat account and Pro subscription.",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  if (!isSupabaseConfigured) {
    return (
      <main className="wrap">
        <Brand note="account" />
        <h1>Account</h1>
        <div className="note" style={{ marginTop: 20 }}>
          Accounts aren&apos;t configured on this deployment yet. The converter works without one —{" "}
          <Link href="/">start here</Link>.
        </div>
        <Footer />
      </main>
    );
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/account");

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_pro")
    .eq("id", user.id)
    .single();
  const isPro = Boolean(profile?.is_pro);

  const { data: usage } = await supabase
    .from("usage_daily")
    .select("count")
    .eq("user_id", user.id)
    .eq("day", new Date().toISOString().slice(0, 10))
    .maybeSingle();
  const usedToday = usage?.count ?? 0;

  return (
    <main className="wrap">
      <Brand note="account" />
      <nav className="breadcrumbs">
        <Link href="/">Home</Link> / Account
      </nav>

      <h1>Your account</h1>
      <p className="sub">Manage your plan. The converter always runs on your device, signed in or not.</p>

      <div style={{ marginTop: 8 }}>
        <div className="acct-row">
          <span className="k">Email</span>
          <span className="v">{user.email}</span>
        </div>
        <div className="acct-row">
          <span className="k">Plan</span>
          <span className="v">
            {isPro ? <span className="badge">✦ Pro</span> : <span className="badge free">Free</span>}
          </span>
        </div>
        <div className="acct-row">
          <span className="k">Today</span>
          <span className="v">
            {isPro
              ? "Unlimited conversions"
              : `${usedToday} of ${FREE_DAILY_LIMIT} free conversions used`}
          </span>
        </div>
      </div>

      <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        {isStripeConfigured ? (
          isPro ? (
            <ManageBillingButton />
          ) : (
            <UpgradeButton signedIn label="Upgrade to Pro — $5/mo" />
          )
        ) : (
          <span className="cap-hint" style={{ margin: 0 }}>
            Billing isn&apos;t configured on this deployment.
          </span>
        )}

        <form action="/auth/signout" method="post">
          <button className="ghost-btn" type="submit">
            Sign out
          </button>
        </form>
      </div>

      <Footer />
    </main>
  );
}
