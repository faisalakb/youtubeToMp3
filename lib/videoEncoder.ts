/**
 * Video → MP3 audio extraction via ffmpeg.wasm (single-thread core, vendored in
 * /public/ffmpeg). Browser-only. The core is ~32 MB so it is lazy-loaded the
 * first time a video is converted and then cached for the session. Single-thread
 * means no SharedArrayBuffer and therefore NO cross-origin isolation headers —
 * the site keeps deploying anywhere, and the core is same-origin (no CDN call).
 */
import type { FFmpeg } from "@ffmpeg/ffmpeg";
import { clamp } from "./encoder";

const FFMPEG_BASE = "/ffmpeg";

let enginePromise: Promise<FFmpeg> | null = null;
let progressCb: ((fraction: number) => void) | null = null;

/** Load (once) and return the ffmpeg engine, wiring a single progress relay. */
async function getEngine(): Promise<FFmpeg> {
  if (enginePromise) return enginePromise;

  enginePromise = (async () => {
    const [{ FFmpeg }, { toBlobURL }] = await Promise.all([
      import("@ffmpeg/ffmpeg"),
      import("@ffmpeg/util"),
    ]);
    const ffmpeg = new FFmpeg();
    ffmpeg.on("progress", ({ progress }) => {
      if (progressCb) progressCb(clamp(progress, 0, 1));
    });
    await ffmpeg.load({
      coreURL: await toBlobURL(`${FFMPEG_BASE}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${FFMPEG_BASE}/ffmpeg-core.wasm`, "application/wasm"),
    });
    return ffmpeg;
  })();

  return enginePromise;
}

function extOf(name: string): string {
  const m = name.match(/\.([^.\\/]+)$/);
  return m ? m[1].toLowerCase() : "bin";
}

/** True for container formats handled by ffmpeg rather than the Web Audio path. */
export function isVideoFile(file: File): boolean {
  if (file.type.startsWith("video/")) return true;
  return /\.(mp4|mov|mkv|webm|m4v|avi)$/i.test(file.name);
}

/**
 * Extract the audio track from a video file and encode it to MP3 at `kbps`.
 * `onProgress` receives a fraction in [0, 1] during encoding.
 */
export async function videoToMp3(
  file: File,
  kbps: number,
  onProgress: (fraction: number) => void
): Promise<Blob> {
  const { fetchFile } = await import("@ffmpeg/util");
  const ffmpeg = await getEngine();

  progressCb = onProgress;
  const inputName = `input.${extOf(file.name)}`;
  const outputName = "output.mp3";

  try {
    await ffmpeg.writeFile(inputName, await fetchFile(file));
    // -vn: drop video. -b:a: target audio bitrate.
    const code = await ffmpeg.exec(["-i", inputName, "-vn", "-b:a", `${kbps}k`, outputName]);
    if (code !== 0) {
      throw new Error("ffmpeg could not extract audio from this file.");
    }
    const data = (await ffmpeg.readFile(outputName)) as Uint8Array;
    if (!data || data.length === 0) {
      throw new Error("No audio track was found in this video.");
    }
    // Runtime value is a regular Uint8Array; cast past the DOM BlobPart typing
    // (which flags the theoretical SharedArrayBuffer backing).
    return new Blob([data as unknown as BlobPart], { type: "audio/mpeg" });
  } finally {
    // Clean up the virtual FS so repeated conversions don't accumulate.
    progressCb = null;
    try {
      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);
    } catch {
      /* best effort */
    }
  }
}
