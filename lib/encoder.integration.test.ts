import { describe, it, expect } from "vitest";
import { encodeToMp3, type DecodedAudio } from "./encoder";

/**
 * Exercises the real lamejs encode path (not browser-only — lamejs and
 * setTimeout/Blob all run under Node). Verifies that decoded samples turn
 * into a non-trivial MP3 with a valid frame sync header.
 */
function sineAudio(seconds = 0.5, sampleRate = 44100, freq = 440): DecodedAudio {
  const n = Math.floor(seconds * sampleRate);
  const data = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    data[i] = 0.5 * Math.sin((2 * Math.PI * freq * i) / sampleRate);
  }
  return {
    numberOfChannels: 1,
    sampleRate,
    getChannelData: () => data,
  };
}

describe("encodeToMp3 (integration)", () => {
  it("produces a valid MP3 blob and reports progress to 100%", async () => {
    let lastProgress = 0;
    const blob = await encodeToMp3(sineAudio(), 192, (p) => {
      lastProgress = p;
    });

    expect(blob.type).toBe("audio/mpeg");
    expect(blob.size).toBeGreaterThan(1000);
    expect(lastProgress).toBe(1);

    // First bytes should be an MP3 frame sync (0xFF 0xFb/0xFa) or an ID3 tag.
    const head = new Uint8Array(await blob.arrayBuffer()).slice(0, 3);
    const isFrameSync = head[0] === 0xff && (head[1] & 0xe0) === 0xe0;
    const isId3 = head[0] === 0x49 && head[1] === 0x44 && head[2] === 0x33;
    expect(isFrameSync || isId3).toBe(true);
  });
});
