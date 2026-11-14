import { describe, expect, it } from "vitest";
import { requireNumber } from "./validation";
import { roundToCents } from "./rounding";

describe("requireNumber", () => {
  it("accepts a valid number inside the range", () => {
    expect(requireNumber("25", "Hourly rate", 0, 1000)).toEqual({
      ok: true,
      value: 25,
    });
  });

  it("accepts decimals and trims spaces", () => {
    expect(requireNumber("  18.75 ", "Hourly rate", 0, 1000)).toEqual({
      ok: true,
      value: 18.75,
    });
  });

  it("accepts the minimum and maximum values exactly", () => {
    expect(requireNumber("0", "Hours", 0, 168).ok).toBe(true);
    expect(requireNumber("168", "Hours", 0, 168).ok).toBe(true);
  });

  it("rejects an empty box", () => {
    expect(requireNumber("", "Hourly rate", 0, 1000)).toEqual({
      ok: false,
      error: "Hourly rate is required.",
    });
  });

  it("rejects text that is not a number", () => {
    expect(requireNumber("twenty", "Hourly rate", 0, 1000)).toEqual({
      ok: false,
      error: "Hourly rate must be a number.",
    });
  });

  it("rejects a value just above the maximum", () => {
    expect(requireNumber("169", "Hours", 0, 168)).toEqual({
      ok: false,
      error: "Hours must be between 0 and 168.",
    });
  });

  it("rejects a negative value", () => {
    expect(requireNumber("-5", "Hourly rate", 0, 1000).ok).toBe(false);
  });
});

describe("roundToCents", () => {
  it("leaves a two-decimal value unchanged", () => {
    expect(roundToCents(12.34)).toBe(12.34);
  });

  it("rounds down when the third decimal is below five", () => {
    expect(roundToCents(12.344)).toBe(12.34);
  });

  it("rounds up when the third decimal is five or more", () => {
    expect(roundToCents(12.345)).toBe(12.35);
  });

  it("rounds a half-cent that floating-point maths could miss", () => {
    expect(roundToCents(1.005)).toBe(1.01);
  });

  it("handles zero", () => {
    expect(roundToCents(0)).toBe(0);
  });
});