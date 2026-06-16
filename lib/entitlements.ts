/**
 * Freemium policy constants. The cap is a soft nudge: conversion is fully
 * client-side, so this can't be hard-enforced — it's tracked per-account
 * (and per-browser for anonymous users) to encourage sign-up / upgrade,
 * not as DRM. Pro removes the cap and unlocks batch + saved preferences.
 */
export const FREE_DAILY_LIMIT = 10;

export type Entitlements = {
  /** Signed-in user id, or null when anonymous. */
  userId: string | null;
  email: string | null;
  isPro: boolean;
  /** Conversions used today (best-effort). */
  usedToday: number;
  /** Remaining conversions today; Infinity for Pro. */
  remaining: number;
};

export function remainingFor(isPro: boolean, usedToday: number): number {
  if (isPro) return Infinity;
  return Math.max(0, FREE_DAILY_LIMIT - usedToday);
}
