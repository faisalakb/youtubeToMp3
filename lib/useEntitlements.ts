"use client";

import { useCallback, useEffect, useState } from "react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { FREE_DAILY_LIMIT, remainingFor } from "@/lib/entitlements";

export type EntitlementsState = {
  ready: boolean;
  configured: boolean;
  userId: string | null;
  email: string | null;
  isPro: boolean;
  usedToday: number;
  remaining: number; // Infinity when unlimited
  canConvert: boolean;
};

function todayKey() {
  return `mp3bat_usage_${new Date().toISOString().slice(0, 10)}`;
}

function readLocalUsage(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(window.localStorage.getItem(todayKey()) || "0", 10) || 0;
}

function writeLocalUsage(n: number) {
  if (typeof window !== "undefined") window.localStorage.setItem(todayKey(), String(n));
}

const UNLIMITED: EntitlementsState = {
  ready: true,
  configured: false,
  userId: null,
  email: null,
  isPro: false,
  usedToday: 0,
  remaining: Infinity,
  canConvert: true,
};

/**
 * Resolves the current user's entitlements and the soft daily cap.
 * - Supabase not configured  → unlimited (no accounts exist; the converter
 *   behaves exactly as in Phase 1/2).
 * - Signed-in free user       → cap tracked in Supabase (usage_daily).
 * - Anonymous (configured)    → cap tracked in localStorage (soft nudge).
 * - Pro                       → unlimited.
 */
export function useEntitlements() {
  const [state, setState] = useState<EntitlementsState>(
    isSupabaseConfigured ? { ...UNLIMITED, configured: true, ready: false, remaining: FREE_DAILY_LIMIT, canConvert: true } : UNLIMITED
  );

  const load = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setState(UNLIMITED);
      return;
    }
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const used = readLocalUsage();
      setState({
        ready: true,
        configured: true,
        userId: null,
        email: null,
        isPro: false,
        usedToday: used,
        remaining: remainingFor(false, used),
        canConvert: remainingFor(false, used) > 0,
      });
      return;
    }

    const [{ data: profile }, { data: usage }] = await Promise.all([
      supabase.from("profiles").select("is_pro").eq("id", user.id).single(),
      supabase
        .from("usage_daily")
        .select("count")
        .eq("user_id", user.id)
        .eq("day", new Date().toISOString().slice(0, 10))
        .maybeSingle(),
    ]);

    const isPro = Boolean(profile?.is_pro);
    const used = usage?.count ?? 0;
    const remaining = remainingFor(isPro, used);
    setState({
      ready: true,
      configured: true,
      userId: user.id,
      email: user.email ?? null,
      isPro,
      usedToday: used,
      remaining,
      canConvert: remaining > 0,
    });
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  /** Record one conversion against the cap. Returns the new remaining count. */
  const recordConversion = useCallback(async (): Promise<number> => {
    if (!isSupabaseConfigured || state.isPro) return Infinity;

    if (!state.userId) {
      const used = readLocalUsage() + 1;
      writeLocalUsage(used);
      const remaining = remainingFor(false, used);
      setState((s) => ({ ...s, usedToday: used, remaining, canConvert: remaining > 0 }));
      return remaining;
    }

    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const { data, error } = await supabase.rpc("record_conversion");
    const used = !error && typeof data === "number" ? data : state.usedToday + 1;
    const remaining = remainingFor(false, used);
    setState((s) => ({ ...s, usedToday: used, remaining, canConvert: remaining > 0 }));
    return remaining;
  }, [state.isPro, state.userId, state.usedToday]);

  return { ...state, recordConversion, refresh: load };
}
