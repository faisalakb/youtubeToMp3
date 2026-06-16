// Reports which mp3bat env vars are configured, without printing their values.
// Reads .env.local (falling back to .env), then process.env. Run: npm run check-env
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvFile(name) {
  try {
    const text = readFileSync(resolve(process.cwd(), name), "utf8");
    const out = {};
    for (const line of text.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
    return { name, vars: out };
  } catch {
    return null;
  }
}

const file = loadEnvFile(".env.local") || loadEnvFile(".env");
const fromFile = file?.vars ?? {};
const get = (k) => (process.env[k] ?? fromFile[k] ?? "").trim();

// Groups of vars and what each unlocks.
const GROUPS = [
  {
    label: "Core",
    note: "site URL for redirects, canonicals, and Stripe return URLs",
    vars: [{ key: "NEXT_PUBLIC_SITE_URL", required: true }],
  },
  {
    label: "Supabase — accounts, magic-link auth, soft usage cap",
    vars: [
      { key: "NEXT_PUBLIC_SUPABASE_URL", required: true },
      { key: "NEXT_PUBLIC_SUPABASE_ANON_KEY", required: true },
      { key: "SUPABASE_SERVICE_ROLE_KEY", required: true, secret: true },
    ],
  },
  {
    label: "Stripe — Pro subscriptions",
    vars: [
      { key: "STRIPE_SECRET_KEY", required: true, secret: true },
      { key: "STRIPE_PRICE_ID", required: true },
      { key: "STRIPE_WEBHOOK_SECRET", required: true, secret: true },
    ],
  },
];

// Light, format-aware sanity hints (still never prints the value).
function hint(key, val) {
  if (!val) return "";
  if (key === "NEXT_PUBLIC_SUPABASE_URL" && !/^https:\/\/.*\.supabase\.co/.test(val))
    return "  ⚠ expected https://<ref>.supabase.co";
  if (key === "STRIPE_SECRET_KEY" && !/^sk_(test|live)_/.test(val))
    return "  ⚠ expected sk_test_… or sk_live_…";
  if (key === "STRIPE_PRICE_ID" && !/^price_/.test(val))
    return "  ⚠ expected price_… (not prod_…)";
  if (key === "STRIPE_WEBHOOK_SECRET" && !/^whsec_/.test(val))
    return "  ⚠ expected whsec_…";
  if (key === "STRIPE_SECRET_KEY" && /^sk_live_/.test(val))
    return "  ⚠ LIVE key — real charges";
  return "";
}

const GREEN = "\x1b[32m", RED = "\x1b[31m", DIM = "\x1b[2m", YEL = "\x1b[33m", RST = "\x1b[0m";

console.log(`\nmp3bat env check  ${DIM}(source: ${file ? file.name : "process.env only"})${RST}\n`);

let missingRequired = 0;
const groupReady = {};

for (const group of GROUPS) {
  console.log(`${group.label}${group.note ? `  ${DIM}— ${group.note}${RST}` : ""}`);
  let allSet = true;
  for (const v of group.vars) {
    const val = get(v.key);
    const set = val.length > 0;
    if (!set && v.required) {
      missingRequired++;
      allSet = false;
    }
    const mark = set ? `${GREEN}✓ set${RST}` : `${RED}✗ missing${RST}`;
    const tail = set ? `${YEL}${hint(v.key, val)}${RST}` : "";
    console.log(`  ${mark}  ${v.key}${v.secret ? `  ${DIM}(secret)${RST}` : ""}${tail}`);
  }
  groupReady[group.label] = allSet;
  console.log("");
}

const supaReady = groupReady["Supabase — accounts, magic-link auth, soft usage cap"];
const stripeReady = groupReady["Stripe — Pro subscriptions"];

console.log("Feature status:");
console.log(`  Converter (audio + video):   ${GREEN}always on${RST}`);
console.log(`  Accounts + soft cap:         ${supaReady ? GREEN + "ready" + RST : DIM + "inactive (set Supabase vars)" + RST}`);
console.log(
  `  Pro upgrades (Stripe):       ${
    supaReady && stripeReady ? GREEN + "ready" + RST : DIM + "inactive (needs Supabase + Stripe vars)" + RST
  }`
);

if (supaReady && !stripeReady) {
  console.log(`\n${YEL}Note:${RST} Supabase is set but Stripe isn't — auth + cap work, upgrades won't.`);
}

console.log(
  missingRequired === 0
    ? `\n${GREEN}All variables present.${RST} Restart the dev server to pick them up.\n`
    : `\n${DIM}${missingRequired} variable(s) still blank — that's fine for the features you haven't enabled yet.${RST}\n`
);

// Never fail the process on missing optional config; this is a status tool.
process.exit(0);
