import { site } from "@/lib/site";

/**
 * Honest affiliate block. mp3bat deliberately can't pull audio from a YouTube
 * URL, so the large share of visitors who want that would otherwise just bounce.
 * Instead we point them to a reputable paid desktop app (for content they're
 * entitled to) and earn a referral — clearly disclosed, never on the converter
 * button itself, so it stays on the right side of the brand promise.
 */
export default function RipAlternative() {
  return (
    <aside className="ripalt" aria-label="Tool recommendation">
      <div className="ripalt-main">
        <span className="ripalt-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
            <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
          </svg>
        </span>
        <div className="ripalt-copy">
          <p className="ripalt-title">Need to grab audio straight from a YouTube link?</p>
          <p className="ripalt-text">
            mp3bat only converts files you already have. For downloading audio from a URL — for
            content you&apos;re allowed to — a reputable desktop app like <b>Wondershare UniConverter</b>{" "}
            does it safely, without the sketchy ad-and-redirect sites.
          </p>
        </div>
        <a
          className="ripalt-cta"
          href={site.affiliate.uniconverter}
          target="_blank"
          rel="sponsored noopener noreferrer"
        >
          Get UniConverter ↗
        </a>
      </div>
      <p className="ripalt-disc">
        Affiliate link — we may earn a commission at no extra cost to you. Only download content you
        own or have permission to use.
      </p>
    </aside>
  );
}
