import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Brand from "@/components/Brand";
import Footer from "@/components/Footer";
import LoginForm from "./LoginForm";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to mp3bat with a magic link — no password.",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  if (isSupabaseConfigured) {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) redirect("/account");
  }

  return (
    <main className="wrap">
      <Brand note="sign in" />
      <p className="eyebrow">Private by design</p>
      <h1>Sign in</h1>
      <p className="sub">
        No password. We email you a one-time link — click it and you&apos;re in. An account lifts the
        daily cap tracking and unlocks Pro features; the converter itself always runs on your device.
      </p>

      <div className="perimeter" style={{ marginTop: 8 }}>
        {isSupabaseConfigured ? (
          <LoginForm />
        ) : (
          <div className="err show" style={{ display: "block" }}>
            <b>Accounts aren&apos;t configured yet.</b> Add your Supabase keys to{" "}
            <code>.env.local</code> to enable sign-in. The converter works without an account in the
            meantime.
          </div>
        )}
      </div>

      <div className="note">
        New here? Signing in creates your account automatically. See{" "}
        <Link href="/pricing">what Pro includes</Link> or just{" "}
        <Link href="/">start converting</Link>.
      </div>

      <Footer />
    </main>
  );
}
