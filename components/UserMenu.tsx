"use client";

import Link from "next/link";
import { useEntitlements } from "@/lib/useEntitlements";

/**
 * Compact auth state for the header. Renders nothing when accounts aren't
 * configured (keyless mode), so the rest of the site is unaffected.
 */
export default function UserMenu() {
  const ent = useEntitlements();

  if (!ent.configured) return null;
  if (!ent.ready) return <span className="ver">…</span>;

  if (!ent.userId) {
    return (
      <Link href="/login" className="ver">
        Sign in
      </Link>
    );
  }

  return (
    <Link href="/account" className="ver" title={ent.email ?? "Account"}>
      {ent.isPro ? "✦ " : ""}
      {ent.email ? ent.email.split("@")[0] : "Account"}
    </Link>
  );
}
