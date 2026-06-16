import Link from "next/link";
import type { Metadata } from "next";
import Brand from "@/components/Brand";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy — your files never leave your device",
  description:
    "mp3bat converts audio entirely in your browser. We never receive, store, or process your files. Here's exactly what that means.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="wrap">
      <Brand note="privacy" />
      <nav className="breadcrumbs">
        <Link href="/">Home</Link> / Privacy
      </nav>

      <article className="prose">
        <h1>Privacy</h1>
        <p className="lede">
          mp3bat is built so that your files never leave your device. This page explains what that
          means in practice — and, just as importantly, what we deliberately don&apos;t do.
        </p>

        <h2>Your files</h2>
        <p>
          When you convert a file, it is read and encoded entirely inside your browser using the Web
          Audio API and a WebAssembly MP3 encoder that runs on your own machine. The file&apos;s
          bytes are never uploaded, transmitted, or sent to {site.name} or any third party. There is
          no server-side processing step, because there is no server in the loop at all. When you
          close the tab, the file and the converted MP3 are gone from memory.
        </p>

        <h2>What we don&apos;t collect</h2>
        <ul>
          <li>We don&apos;t require an account, so we hold no names, emails, or passwords.</li>
          <li>We don&apos;t receive your audio or the MP3 we help you create.</li>
          <li>We don&apos;t run pop-up, redirect, or interstitial ad networks on the tool.</li>
          <li>We don&apos;t sell data, because we don&apos;t collect the data to sell.</li>
        </ul>

        <h2>Fonts and assets</h2>
        <p>
          Fonts and code for the converter are served from {site.name} itself rather than third-party
          CDNs, so simply loading and using the converter doesn&apos;t hand your activity to another
          company.
        </p>

        <h2>Analytics</h2>
        <p>
          For aggregate traffic we use cookieless, privacy-first analytics (Plausible). It sets no
          cookies, collects no personal data, and never sees the contents of your files (which we
          never receive in the first place) — only anonymous, aggregate page-view counts. That&apos;s
          also why {site.name} shows no cookie-consent banner: there are no tracking cookies to
          consent to.
        </p>
        <h2>Affiliate links</h2>
        <p>
          Some outbound links are affiliate links, which can earn us a commission at no extra cost to
          you. They don&apos;t affect this privacy promise. See the{" "}
          <Link href="/disclosure">affiliate disclosure</Link> for details.
        </p>

        <h2>Changes</h2>
        <p>
          If this policy changes, the change will be reflected here. The core promise — your files
          are converted on your device and never uploaded — is foundational to the product and not
          something we intend to walk back.
        </p>

        <Link href="/" className="cta-back">
          Back to the converter →
        </Link>
      </article>

      <Footer />
    </main>
  );
}
