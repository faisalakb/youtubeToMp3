import { describe, it, expect } from "vitest";
import { floatTo16BitPCM, formatBytes, clamp, toMp3Filename } from "./encoder";

describe("floatTo16BitPCM", () => {
  it("maps silence to zero", () => {
    const out = floatTo16BitPCM(new Float32Array([0, 0, 0]));
    expect(Array.from(out)).toEqual([0, 0, 0]);
  });

  it("maps full-scale positive and negative to 16-bit extremes", () => {
    const out = floatTo16BitPCM(new Float32Array([1, -1]));
    expect(out[0]).toBe(0x7fff); // 32767
    expect(out[1]).toBe(-0x8000); // -32768
  });

  it("clamps values beyond the [-1, 1] range", () => {
    const out = floatTo16BitPCM(new Float32Array([2, -2]));
    expect(out[0]).toBe(0x7fff);
    expect(out[1]).toBe(-0x8000);
  });

  it("preserves length", () => {
    expect(floatTo16BitPCM(new Float32Array(1152)).length).toBe(1152);
  });
});

describe("formatBytes", () => {
  it("formats kilobytes without decimals", () => {
    expect(formatBytes(2048)).toBe("2 KB");
  });

  it("formats megabytes with one decimal", () => {
    expect(formatBytes(3 * 1048576 + 100000)).toBe("3.1 MB");
  });
});

describe("clamp", () => {
  it("bounds below, within, and above", () => {
    expect(clamp(-5, 0, 100)).toBe(0);
    expect(clamp(42, 0, 100)).toBe(42);
    expect(clamp(150, 0, 100)).toBe(100);
  });
});

describe("toMp3Filename", () => {
  it("swaps a known extension", () => {
    expect(toMp3Filename("song.wav")).toBe("song.mp3");
    expect(toMp3Filename("clip.final.m4a")).toBe("clip.final.mp3");
  });

  it("appends .mp3 when there is no extension", () => {
    expect(toMp3Filename("recording")).toBe("recording.mp3");
  });
});
