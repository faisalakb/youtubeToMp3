import Link from "next/link";
import type { Metadata } from "next";
import Brand from "@/components/Brand";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Affiliate disclosure",
  description:
    "mp3bat is free and ad-free. Some outbound links are affiliate links — here's exactly what that means, why we use them, and how it does and doesn't affect you.",
  alternates: { canonical: "/disclosure" },
};

export default function DisclosurePage() {
  return (
    <main className="wrap">
      <Brand note="disclosure" />
      <nav className="breadcrumbs">
        <Link href="/">Home</Link> / Affiliate disclosure
      </nav>

      <article className="prose">
        <h1>Affiliate disclosure</h1>
        <p className="lede">
          {site.name} is free to use and carries no ads on the converter. Some links to other
          companies&apos; products are affiliate links. This page explains that plainly — what it
          means, why we do it, and what it doesn&apos;t change.
        </p>

        <h2>What an affiliate link means</h2>
        <p>
          A few outbound links — for example, to <strong>Wondershare UniConverter</strong> — are
          affiliate links. If you click one and buy that product, we may earn a small commission{" "}
          <strong>at no extra cost to you</strong>. The price you pay is the same whether you use our
          link or go to the vendor directly.
        </p>

        <h2>Why we use them</h2>
        <p>
          {site.name} deliberately doesn&apos;t download audio from YouTube links — that needs a
          server and crosses YouTube&apos;s terms. For people who genuinely need to do that with
          content they&apos;re entitled to, we point them to a reputable paid desktop app instead of
          a sketchy ad-filled site, and we earn a referral when they buy. Those referrals help keep{" "}
          {site.name} free, ad-free, and account-free.
        </p>

        <h2>Our recommendations aren&apos;t for sale</h2>
        <p>
          We only point to tools we consider reputable and genuinely useful for the job. A commission
          doesn&apos;t buy a recommendation, and it never changes what we tell you — including being
          honest that buying or streaming is the right answer for commercial music, and that you
          should only download content you own or have permission to use.
        </p>

        <h2>Your privacy is unaffected</h2>
        <p>
          Affiliate links don&apos;t change the core promise: your files are converted on your device
          and never uploaded. Clicking an affiliate link simply takes you to that company&apos;s site,
          where their own terms and privacy policy apply. See our{" "}
          <Link href="/privacy">privacy page</Link> for how {site.name} itself handles your data
          (short version: it doesn&apos;t receive it).
        </p>

        <Link href="/" className="cta-back">
          Back to the converter →
        </Link>
      </article>

      <Footer />
    </main>
  );
}
