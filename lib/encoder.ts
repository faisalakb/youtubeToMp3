/**
 * MP3 encoding logic, isolated from the UI so it can be reasoned about and
 * unit-tested on its own. The pure helpers (PCM conversion, byte formatting)
 * have no browser dependencies; `encodeToMp3` lazy-loads the lamejs encoder
 * and runs entirely on the client.
 */

/** Convert Float32 audio samples in [-1, 1] to signed 16-bit PCM. */
export function floatTo16BitPCM(input: Float32Array): Int16Array {
  const out = new Int16Array(input.length);
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]));
    out[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return out;
}

/** Human-readable byte size, e.g. "3.2 MB" or "812 KB". */
export function formatBytes(bytes: number): string {
  if (bytes >= 1048576) return (bytes / 1048576).toFixed(1) + " MB";
  return (bytes / 1024).toFixed(0) + " KB";
}

/** Clamp a number into the inclusive [min, max] range. */
export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/** Swap a filename's extension for `.mp3` (adds one if absent). */
export function toMp3Filename(name: string): string {
  return name.replace(/\.[^./\\]+$/, "") + ".mp3";
}

export type DecodedAudio = {
  numberOfChannels: number;
  sampleRate: number;
  getChannelData: (channel: number) => Float32Array;
};

/**
 * Encode decoded audio to an MP3 Blob using lamejs, yielding to the event
 * loop in ~40ms slices so the UI stays responsive. `onProgress` receives a
 * fraction in [0, 1]. Browser-only: relies on dynamic import + setTimeout.
 */
export async function encodeToMp3(
  audio: DecodedAudio,
  kbps: number,
  onProgress: (fraction: number) => void
): Promise<Blob> {
  const lib: any = await import("@breezystack/lamejs");
  const Mp3Encoder = lib.Mp3Encoder ?? lib.default?.Mp3Encoder;
  if (!Mp3Encoder) {
    throw new Error("MP3 encoder failed to load.");
  }

  const channels = Math.min(2, audio.numberOfChannels);
  const sampleRate = audio.sampleRate;
  const encoder = new Mp3Encoder(channels, sampleRate, kbps);

  const left = floatTo16BitPCM(audio.getChannelData(0));
  const right = channels > 1 ? floatTo16BitPCM(audio.getChannelData(1)) : null;

  const BLOCK = 1152;
  const total = left.length;
  const chunks: Int8Array[] = [];
  let i = 0;

  return new Promise<Blob>((resolve, reject) => {
    function step() {
      try {
        const start =
          typeof performance !== "undefined" ? performance.now() : Date.now();
        const now = () =>
          typeof performance !== "undefined" ? performance.now() : Date.now();

        while (i < total && now() - start < 40) {
          const l = left.subarray(i, i + BLOCK);
          const r = right ? right.subarray(i, i + BLOCK) : undefined;
          const encoded = right
            ? encoder.encodeBuffer(l, r)
            : encoder.encodeBuffer(l);
          if (encoded.length) chunks.push(encoded);
          i += BLOCK;
        }

        onProgress(clamp(total === 0 ? 1 : i / total, 0, 1));

        if (i < total) {
          setTimeout(step, 0);
        } else {
          const tail = encoder.flush();
          if (tail.length) chunks.push(tail);
          resolve(new Blob(chunks as BlobPart[], { type: "audio/mpeg" }));
        }
      } catch (err) {
        reject(err);
      }
    }
    step();
  });
}
