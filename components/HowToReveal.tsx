"use client";

import Link from "next/link";
import { useRef, useState } from "react";

/**
 * A slim, collapsed-by-default helper that reveals the "how to get an MP3 from a
 * YouTube video" steps on hover. Also opens on click (for touch) and keyboard
 * focus, and closes on Escape — so the guidance appears properly for everyone
 * without taking permanent space on the page.
 */
export default function HowToReveal() {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false); // a click "pins" it open
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };
  const onEnter = () => {
    clear();
    setOpen(true);
  };
  const onLeave = () => {
    if (pinned) return;
    clear();
    timer.current = setTimeout(() => setOpen(false), 140);
  };
  const toggle = () => {
    const next = !pinned;
    setPinned(next);
    setOpen(next);
  };
  const close = () => {
    setPinned(false);
    setOpen(false);
  };

  return (
    <section
      className={`howto${open ? " open" : ""}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <button
        type="button"
        className="howto-trigger"
        aria-expanded={open}
        aria-controls="howto-panel"
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Escape") close();
        }}
      >
        <span className="howto-badge" aria-hidden="true">
          ?
        </span>
        <span className="howto-label">How do I get an MP3 from a YouTube video?</span>
        <svg className="howto-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div id="howto-panel" className="howto-panel" role="region" aria-label="How to get an MP3 from a YouTube video">
        <div className="howto-inner">
          <div className="howto-grid">
            <div className="howto-step">
              <span className="howto-num">01</span>
              <div>
                <h3>Get the file onto your device</h3>
                <p>mp3bat can&apos;t pull it from a link — grab the file first, legally:</p>
                <ul className="howto-list">
                  <li>
                    <b>Your own upload</b> — YouTube Studio → Content → ⋮ → Download
                  </li>
                  <li>
                    <b>A creator who offers it</b> — download from their page, Bandcamp or SoundCloud
                  </li>
                  <li>
                    <b>A song you don&apos;t own</b> — buy or stream it, or use YouTube Premium offline
                  </li>
                </ul>
                <Link className="howto-link" href="/is-youtube-to-mp3-legal">
                  Which ways are legal? →
                </Link>
              </div>
            </div>

            <div className="howto-step">
              <span className="howto-num">02</span>
              <div>
                <h3>Convert it to MP3 here</h3>
                <ol className="howto-list howto-ol">
                  <li>Drag your file into the converter above (MP4/MOV/MKV/WEBM or WAV/M4A/AAC/OGG/FLAC)</li>
                  <li>Pick a quality — 320 kbps is best, 192 kbps is balanced</li>
                  <li>
                    Hit <b>Convert to MP3</b>, then <b>Download</b>
                  </li>
                </ol>
                <a className="howto-link" href="#convert">
                  Back to the converter ↑
                </a>
              </div>
            </div>
          </div>

          <p className="howto-foot">
            mp3bat never touches YouTube directly — you bring the file, it converts privately in your
            browser, and nothing is uploaded.
          </p>
        </div>
      </div>
    </section>
  );
}
