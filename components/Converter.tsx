"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { BITRATES, DEFAULT_BITRATE } from "@/lib/site";
import { encodeToMp3, formatBytes, toMp3Filename } from "@/lib/encoder";
import { videoToMp3, isVideoFile } from "@/lib/videoEncoder";
import { useEntitlements } from "@/lib/useEntitlements";
import { FREE_DAILY_LIMIT } from "@/lib/entitlements";

type Phase = "idle" | "working" | "done" | "error";

export default function Converter() {
  const [file, setFile] = useState<File | null>(null);
  const [bitrate, setBitrate] = useState<number>(DEFAULT_BITRATE);
  const [phase, setPhase] = useState<Phase>("idle");
  const [phaseLabel, setPhaseLabel] = useState("Working…");
  const [pct, setPct] = useState(0);
  const [errorHtml, setErrorHtml] = useState("");
  const [result, setResult] = useState<{ url: string; size: number } | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const ent = useEntitlements();
  const [capHit, setCapHit] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const lastUrl = useRef<string | null>(null);

  // Release any object URL we created when it is replaced or on unmount.
  const revoke = useCallback(() => {
    if (lastUrl.current) {
      URL.revokeObjectURL(lastUrl.current);
      lastUrl.current = null;
    }
  }, []);
  useEffect(() => revoke, [revoke]);

  function reset() {
    setPhase("idle");
    setPct(0);
    setErrorHtml("");
    setResult(null);
    revoke();
  }

  function chooseFile(f: File | undefined | null) {
    if (!f) return;
    reset();
    setFile(f);
  }

  function clearFile() {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
    reset();
  }

  function fail(html: string) {
    setErrorHtml(html);
    setPhase("error");
  }

  async function convert() {
    if (!file) return;

    // Soft daily cap (only when accounts are configured and the user isn't Pro).
    if (ent.configured && !ent.isPro && !ent.canConvert) {
      setCapHit(true);
      return;
    }
    setCapHit(false);

    reset();
    setPhase("working");

    try {
      const blob = isVideoFile(file)
        ? await convertVideo(file)
        : await convertAudio(file);
      if (!blob) return; // a handled failure already surfaced an error

      setPct(100);
      setPhaseLabel("Done");
      revoke();
      const url = URL.createObjectURL(blob);
      lastUrl.current = url;
      setResult({ url, size: blob.size });
      setPhase("done");
      // Count this conversion against the soft cap (no-op when unlimited).
      void ent.recordConversion();
    } catch (ex) {
      const msg = ex instanceof Error ? ex.message : "Try a different file.";
      fail(`<b>Something went wrong.</b> ${msg}`);
    }
  }

  // Standard audio: decode with Web Audio, encode with lamejs.
  async function convertAudio(f: File): Promise<Blob | null> {
    setPhaseLabel("Reading file…");
    setPct(5);
    const buf = await f.arrayBuffer();

    setPhaseLabel("Decoding audio…");
    setPct(20);
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AC();
    let audio: AudioBuffer;
    try {
      audio = await ctx.decodeAudioData(buf.slice(0));
    } catch {
      ctx.close();
      fail(
        "<b>This browser couldn't decode that file.</b> mp3bat handles standard audio (WAV, M4A, AAC, OGG, FLAC, MP3). For video files (MP4, MOV, MKV, WEBM) it uses the built-in video engine automatically."
      );
      return null;
    }
    ctx.close();

    setPhaseLabel(`Encoding MP3 (${bitrate} kbps)…`);
    return encodeToMp3(audio, bitrate, (frac) => setPct(20 + Math.round(frac * 78)));
  }

  // Video container: extract the audio track to MP3 with ffmpeg.wasm.
  async function convertVideo(f: File): Promise<Blob> {
    setPhaseLabel("Loading video engine (first time only)…");
    setPct(6);
    return videoToMp3(f, bitrate, (frac) => setPct(8 + Math.round(frac * 90)));
  }

  const downloadName = file ? toMp3Filename(file.name) : "audio.mp3";

  return (
    <div className="perimeter">
      <div className="perimeter-tag">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
        STAYS ON YOUR DEVICE
      </div>

      <div
        className={`drop${dragOver ? " over" : ""}`}
        tabIndex={0}
        role="button"
        aria-label="Choose or drop an audio file to convert"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragOver(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          chooseFile(e.dataTransfer.files[0]);
        }}
      >
        <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
          <path d="M12 16V4m0 0L8 8m4-4 4 4" />
          <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
        </svg>
        <div className="big">Drop an audio or video file, or click to choose</div>
        <div className="small">
          It opens <b>here, in this tab</b> — not on our servers.
        </div>
        <div className="formats">
          WAV · M4A · AAC · OGG · FLAC · MP3 · MP4 · MOV · MKV · WEBM → MP3
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="audio/*,video/*,.m4a,.aac,.flac,.ogg,.wav,.mp3,.mp4,.mov,.mkv,.webm,.m4v"
          hidden
          onChange={(e) => chooseFile(e.target.files?.[0])}
        />
      </div>

      {file && (
        <div className="file">
          <div className="fic">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
          <div className="meta">
            <div className="fn">{file.name}</div>
            <div className="fd">
              {formatBytes(file.size)} · {file.type || "audio"}
            </div>
          </div>
          <button className="x" aria-label="Remove file" onClick={clearFile}>
            ×
          </button>
        </div>
      )}

      <div className="controls">
        <div className="field">
          <label htmlFor="bitrate">Quality</label>
          <select
            id="bitrate"
            value={bitrate}
            onChange={(e) => setBitrate(parseInt(e.target.value, 10))}
          >
            {BITRATES.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button className="go" disabled={!file || phase === "working"} onClick={convert}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M5 12h14m0 0-5-5m5 5-5 5" />
        </svg>
        {phase === "working" ? "Converting…" : "Convert to MP3"}
      </button>

      {phase === "working" && (
        <div className="stage">
          <div className="bar">
            <i style={{ width: `${pct}%` }} />
          </div>
          <div className="stat">
            <span>{phaseLabel}</span>
            <span>{pct}%</span>
          </div>
        </div>
      )}

      {phase === "done" && result && (
        <div className="result">
          <div className="check">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="m5 13 4 4L19 7" />
            </svg>
          </div>
          <div className="rt">
            <b>Your MP3 is ready</b>
            <span>
              {formatBytes(result.size)} · {bitrate} kbps · stayed on your device
            </span>
          </div>
          <a className="download" href={result.url} download={downloadName}>
            Download
          </a>
        </div>
      )}

      {phase === "error" && (
        <div className="err" dangerouslySetInnerHTML={{ __html: errorHtml }} />
      )}

      {capHit && (
        <div className="err" style={{ display: "block" }}>
          <b>You&apos;ve hit today&apos;s free limit ({FREE_DAILY_LIMIT}).</b>{" "}
          {ent.userId ? (
            <>
              <Link href="/pricing">Upgrade to Pro</Link> for unlimited conversions, or come back
              tomorrow.
            </>
          ) : (
            <>
              <Link href="/login">Sign in</Link> to track your limit across the day, or{" "}
              <Link href="/pricing">go Pro</Link> for unlimited.
            </>
          )}
        </div>
      )}

      {ent.configured && ent.ready && !ent.isPro && Number.isFinite(ent.remaining) && (
        <div className="cap-hint">
          {ent.remaining} of {FREE_DAILY_LIMIT} free conversions left today ·{" "}
          <Link href="/pricing">Pro is unlimited</Link>
        </div>
      )}
      {ent.isPro && (
        <div className="cap-hint">
          <span className="ok">✦ Pro</span> · unlimited conversions
        </div>
      )}

      <div className="perimeter-foot">
        <span className="node ok">✓ Your browser</span>
        <span className="dashx">— — ✕ — —</span>
        <span className="node no">our servers</span>
      </div>
    </div>
  );
}
