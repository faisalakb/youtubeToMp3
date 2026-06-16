# Deploying mp3bat + Google Search Console

A step-by-step checklist to take mp3bat live on **mp3bat.com** and get the pages
indexed. Follow it top to bottom the first time.

---

## 0. Pre-flight (already verified)

- `npm run build` passes cleanly — all guide pages prerender as static HTML.
- `lib/site.ts` falls back to `https://mp3bat.com` when `NEXT_PUBLIC_SITE_URL` is unset.
- `robots.txt` and `sitemap.xml` are generated automatically (`/robots.txt`, `/sitemap.xml`).
- The converter uses single-threaded `@ffmpeg/core` → **no COOP/COEP headers needed**.

---

## 1. Push the code to GitHub

This repo currently has no git history. Initialize and push:

```bash
git init
git add .
git commit -m "mp3bat: initial production build"
gh repo create mp3bat --private --source=. --push   # or create the repo in the GitHub UI
```

---

## 2. Deploy to Vercel

1. Go to **vercel.com → Add New → Project** and import the `mp3bat` repo.
2. Framework preset: **Next.js** (auto-detected). Leave build/output settings default.
3. Add the environment variables below **before** the first deploy (Settings → Environment Variables), then **Deploy**.

### Environment variables

| Variable | Value | Required? |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://mp3bat.com` | **Yes** (canonicals, sitemap, OG, auth/Stripe returns) |
| `GOOGLE_SITE_VERIFICATION` | token from GSC (step 4) | Add in step 4 |
| `NEXT_PUBLIC_UNICONVERTER_AFFILIATE_URL` | your Wondershare affiliate URL | For affiliate revenue |
| `NEXT_PUBLIC_SUPABASE_URL` | from Supabase | Only if using accounts |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | from Supabase | Only if using accounts |
| `SUPABASE_SERVICE_ROLE_KEY` | from Supabase (server-only) | Only if using accounts |
| `STRIPE_SECRET_KEY` | from Stripe | Only if using Pro |
| `STRIPE_WEBHOOK_SECRET` | from Stripe (step 6) | Only if using Pro |
| `STRIPE_PRICE_ID` | Pro plan price ID | Only if using Pro |

> With none of the Supabase/Stripe vars set, the app still runs: the converter
> works unlimited and auth/billing show a "not configured" state. You can launch
> SEO-first and add those later.

---

## 3. Point the domain at Vercel

The domain **mp3bat.com** is registered at Spaceship.

1. In Vercel: **Project → Settings → Domains → Add** `mp3bat.com` (and `www.mp3bat.com`).
2. Vercel shows the DNS records to set. In **Spaceship → Domain → DNS**, add either:
   - the **A record** (`@` → Vercel's IP) **+ CNAME** (`www` → `cname.vercel-dns.com`), **or**
   - switch the domain's **nameservers** to Vercel's (simplest, Vercel-managed DNS).
3. Wait for propagation (minutes to a few hours). Vercel auto-issues HTTPS.
4. Confirm `https://mp3bat.com` loads and `https://mp3bat.com/sitemap.xml` shows
   **mp3bat.com** URLs (not localhost).

---

## 4. Verify in Google Search Console

1. Go to **search.google.com/search-console → Add property**.
2. Easiest method here — **URL prefix** property = `https://mp3bat.com`, then choose
   the **"HTML tag"** verification option. Copy the `content="..."` token.
3. In Vercel, set `GOOGLE_SITE_VERIFICATION` to that token and **redeploy**
   (the `<meta name="google-site-verification">` tag is wired into the app head).
4. Back in GSC, click **Verify**.

> Alternative: **Domain** property via a **DNS TXT** record in Spaceship — verifies
> http+https+www in one go. Use this if you prefer not to redeploy.

---

## 5. Submit the sitemap + request indexing

1. In GSC: **Indexing → Sitemaps → Add a new sitemap →** `sitemap.xml` → Submit.
2. Use **URL Inspection** on your priority pages and click **Request indexing** for:
   - `https://mp3bat.com/guides/how-to-convert-youtube-to-mp3-legally`
   - `https://mp3bat.com/guides/is-youtube-to-mp3-safe`
   - `https://mp3bat.com/guides/youtube-to-mp3-safe-reddit`
   - `https://mp3bat.com/is-youtube-to-mp3-legal`
   - `https://mp3bat.com/` (home)
3. Over the next 1–4 weeks, watch **Performance → Queries** for these terms.

---

## 6. If Supabase / Stripe are enabled

- **Supabase → Authentication → URL Configuration:** add `https://mp3bat.com` as the
  Site URL and add `https://mp3bat.com/auth/callback` to the redirect allow-list.
- **Stripe → Developers → Webhooks:** point the endpoint to
  `https://mp3bat.com/api/stripe/webhook`, then copy its signing secret into
  `STRIPE_WEBHOOK_SECRET` on Vercel and redeploy.

---

## 7. After launch

- Replace the affiliate fallback with your real Wondershare URL (env var in step 2).
- Re-run `npm run icons` / `npm run wordmark` only if the logo changes.
- Consider adding cookieless analytics (Plausible/Umami) — stays consistent with the
  "nothing leaves your device" promise while giving you traffic numbers GSC won't.
```
