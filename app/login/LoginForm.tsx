"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { SITE_URL } from "@/lib/supabase/config";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${SITE_URL}/auth/callback` },
      });
      if (error) throw error;
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Couldn't send the link.");
    }
  }

  if (status === "sent") {
    return (
      <div className="result show" style={{ display: "flex" }}>
        <div className="check">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="m5 13 4 4L19 7" />
          </svg>
        </div>
        <div className="rt">
          <b>Check your email</b>
          <span>We sent a sign-in link to {email}. Open it on this device.</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="field" style={{ marginBottom: 14 }}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-input"
        />
      </div>
      <button className="go" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Email me a sign-in link"}
      </button>
      {status === "error" && (
        <div className="err show" style={{ display: "block" }}>
          <b>Couldn&apos;t send the link.</b> {message}
        </div>
      )}
    </form>
  );
}
