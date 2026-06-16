"use client";

import { useState } from "react";

async function postJson(url: string): Promise<{ url?: string; error?: string }> {
  const res = await fetch(url, { method: "POST" });
  return res.json().catch(() => ({ error: "Unexpected response." }));
}

/** Starts Stripe Checkout for Pro. Sends anonymous users to sign in first. */
export function UpgradeButton({ signedIn, label = "Upgrade to Pro" }: { signedIn: boolean; label?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function go() {
    setError("");
    if (!signedIn) {
      window.location.href = "/login?next=/pricing";
      return;
    }
    setLoading(true);
    const data = await postJson("/api/stripe/checkout");
    if (data.url) {
      window.location.href = data.url;
    } else {
      setLoading(false);
      setError(data.error || "Couldn't start checkout.");
    }
  }

  return (
    <>
      <button className="go" onClick={go} disabled={loading}>
        {loading ? "Redirecting…" : label}
      </button>
      {error && (
        <div className="err" style={{ display: "block" }}>
          {error}
        </div>
      )}
    </>
  );
}

/** Opens the Stripe billing portal for an existing Pro subscriber. */
export function ManageBillingButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function go() {
    setError("");
    setLoading(true);
    const data = await postJson("/api/stripe/portal");
    if (data.url) {
      window.location.href = data.url;
    } else {
      setLoading(false);
      setError(data.error || "Couldn't open billing.");
    }
  }

  return (
    <>
      <button className="ghost-btn" onClick={go} disabled={loading}>
        {loading ? "Opening…" : "Manage billing"}
      </button>
      {error && (
        <div className="err" style={{ display: "block" }}>
          {error}
        </div>
      )}
    </>
  );
}
