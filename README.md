# mp3bat

> The converter that never sees your files — 100% client-side audio → MP3.

mp3bat is a privacy-first audio converter. Files are decoded and encoded entirely
in the browser via the Web Audio API + a WebAssembly MP3 encoder ([lamejs]); nothing
is ever uploaded. This repository is the **Phase 1 MVP** from the project roadmap:
a deployable converter, the trust-framed landing page, the anchor SEO article, and
the supporting privacy / how-it-works pages.

## Stack

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- **@breezystack/lamejs** — client-side MP3 encoder (lazy-loaded)
- Self-hosted fonts vendored in `public/fonts` + `app/fonts.css` (no CDN calls, offline-reproducible build)

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm test` | Run the unit tests (Vitest) |
| `npm run lint` | Lint with Next's ESLint config |

## Project layout

```
app/
  layout.tsx                      Global SEO metadata + Organization schema + fonts
  page.tsx                        Landing page + converter + FAQ schema
  is-youtube-to-mp3-legal/        Anchor SEO article (Article + FAQ + Breadcrumb schema)
  how-it-works/                   Explainer of the client-side model
  privacy/                        Privacy page backing the "no upload" claim
  sitemap.ts / robots.ts          Crawl essentials
components/
  Converter.tsx                   Client component: drop → decode → encode → download
  Brand.tsx / Footer.tsx          Shared chrome
lib/
  encoder.ts                      Pure PCM/format helpers + lazy-loaded MP3 encode
  encoder.test.ts                 Unit tests for the pure helpers
  schema.ts                       JSON-LD builders
  site.ts                         Single source of site metadata + bitrate options
```

## Supported formats

- **Audio → MP3** (Web Audio + lamejs): WAV, M4A, AAC, OGG, FLAC, MP3.
- **Video → MP3** (ffmpeg.wasm audio extraction): MP4, MOV, MKV, WEBM.

Both run entirely in the browser. The video engine (single-thread ffmpeg core) is
vendored in `public/ffmpeg/` and lazy-loaded only on the first video conversion
(~32 MB, then cached). Single-thread means **no cross-origin isolation headers are
required** — the site still deploys anywhere. To switch to the faster multi-thread
core later, vendor `@ffmpeg/core-mt` and serve `COOP: same-origin` +
`COEP: require-corp` headers site-wide.

> **Note on the vendored core:** `public/ffmpeg/ffmpeg-core.wasm` is ~32 MB. If you
> commit it to git, use Git LFS, or fetch it in a postinstall/build step instead of
> tracking it directly.

### Verifying the video path

`npm run test:e2e` drives a real Chrome (via `puppeteer-core`, set `CHROME_PATH` if
needed) against a running server: it records a short WebM in-browser, runs it through
the converter UI, and asserts a valid MP3 comes out. Requires `npm run start` on
:3000 and a Chrome binary.

## Deployment notes

- Set the production domain in `lib/site.ts` (`site.url`) before deploy — it feeds
  canonical URLs, OpenGraph, sitemap, and structured data.
- No special server runtime or cross-origin isolation headers are required, because
  all conversion is client-side.

## Accounts & Pro (Phase 3)

Accounts (magic-link auth), a soft daily conversion cap, and a ~$5/mo Pro plan are
built in. **They activate only when env keys are present** — with no keys, the app
runs exactly as before: the converter works unlimited and auth/billing UI shows a
"not configured" state. Conversion is always client-side; the cap is a soft,
per-account nudge (it can't be hard-enforced on a client-side tool) and Pro removes
it plus unlocks batch + saved preferences.

### Enabling it

1. **Copy env:** `cp .env.example .env.local` and fill in the Supabase + Stripe values.
2. **Supabase:** create a project, then run the migration in `supabase/migrations/0001_init.sql`
   (via `supabase db push` or the dashboard SQL editor). It creates `profiles`,
   `subscriptions`, `usage_daily`, RLS policies, the new-user trigger, and the
   `record_conversion()` RPC. In **Auth → URL Configuration**, allow
   `${SITE_URL}/auth/callback` as a redirect.
3. **Stripe:** create a recurring ~$5/mo Price, put its id in `STRIPE_PRICE_ID`, and
   add a webhook endpoint pointing to `/api/stripe/webhook` for the events
   `checkout.session.completed` and `customer.subscription.*`. Put the signing
   secret in `STRIPE_WEBHOOK_SECRET`.
4. Restart. Sign-in, the cap, and upgrades go live.

### Security notes

- `SUPABASE_SERVICE_ROLE_KEY` is server-only (no `NEXT_PUBLIC_`); it's used solely by
  the Stripe webhook to flip `is_pro`. Pro status lives in the DB, never in editable
  `user_metadata`. RLS is enabled on every table with ownership predicates.

## Out of scope (still later phases)

ffmpeg.wasm video support and transcription remain on the roadmap.

[lamejs]: https://github.com/zhuker/lamejs
