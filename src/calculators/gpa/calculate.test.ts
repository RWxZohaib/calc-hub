import { describe, expect, it } from "vitest";
import { calculateGpa, type CourseEntry } from "./calculate";

const us = (...rows: [string, string][]): CourseEntry[] =>
  rows.map(([value, credits]) => ({ value, credits }));

describe("calculateGpa (US 4.0 scale)", () => {
  it("averages an A and a B of equal credit hours to 3.5", () => {
    const outcome = calculateGpa("us", us(["A", "3"], ["B", "3"]));
    if (!outcome.ok) throw new Error("Expected a valid result");
    expect(outcome.result.average).toBe(3.5);
    expect(outcome.result.totalCredits).toBe(6);
  });

  it("weights grades by credit hours", () => {
    const outcome = calculateGpa("us", us(["A-", "4"], ["B+", "2"]));
    if (!outcome.ok) throw new Error("Expected a valid result");
    expect(outcome.result.average).toBeCloseTo(3.5667, 3);
  });

  it("accepts lower-case letters", () => {
    const outcome = calculateGpa("us", us(["a", "3"]));
    if (!outcome.ok) throw new Error("Expected a valid result");
    expect(outcome.result.average).toBe(4);
  });

  it("ignores completely blank rows", () => {
    const outcome = calculateGpa("us", us(["A", "3"], ["B", "3"], ["", ""]));
    if (!outcome.ok) throw new Error("Expected a valid result");
    expect(outcome.result.average).toBe(3.5);
  });

  it("gives an F zero grade points", () => {
    const outcome = calculateGpa("us", us(["F", "3"], ["A", "3"]));
    if (!outcome.ok) throw new Error("Expected a valid result");
    expect(outcome.result.average).toBe(2);
  });

  it("rejects a grade that is not on the scale", () => {
    const outcome = calculateGpa("us", us(["E", "3"]));
    expect(outcome.ok).toBe(false);
    if (outcome.ok) return;
    expect(outcome.errors).toHaveLength(1);
    expect(outcome.errors[0].startsWith("Course 1 grade must be one of:")).toBe(true);
  });

  it("reports a missing grade when credit hours are entered", () => {
    const outcome = calculateGpa("us", us(["", "3"]));
    expect(outcome.ok).toBe(false);
    if (outcome.ok) return;
    expect(outcome.errors).toEqual(["Course 1 grade is required."]);
  });

  it("reports missing credit hours when a grade is entered", () => {
    const outcome = calculateGpa("us", us(["A", ""]));
    expect(outcome.ok).toBe(false);
    if (outcome.ok) return;
    expect(outcome.errors).toEqual(["Course 1: enter the credit hours."]);
  });

  it("rejects zero credit hours", () => {
    const outcome = calculateGpa("us", us(["A", "0"]));
    expect(outcome.ok).toBe(false);
    if (outcome.ok) return;
    expect(outcome.errors).toEqual(["Course 1 credit hours must be between 0.5 and 20."]);
  });

  it("asks for at least one course when every row is blank", () => {
    const outcome = calculateGpa("us", us(["", ""], ["", ""]));
    expect(outcome.ok).toBe(false);
    if (outcome.ok) return;
    expect(outcome.errors).toEqual(["Enter at least one course with a grade and credit hours."]);
  });
});

describe("calculateGpa (Canada, percentage average)", () => {
  it("averages percentages by credit hours without converting to a GPA", () => {
    const outcome = calculateGpa("ca", us(["90", "4"], ["60", "2"]));
    if (!outcome.ok) throw new Error("Expected a valid result");
    expect(outcome.result.average).toBe(80);
    expect(outcome.result.system).toBe("ca");
  });

  it("returns a plain average when credits are equal", () => {
    const outcome = calculateGpa("ca", us(["80", "3"], ["70", "3"]));
    if (!outcome.ok) throw new Error("Expected a valid result");
    expect(outcome.result.average).toBe(75);
  });

  it("rejects a percentage above 100", () => {
    const outcome = calculateGpa("ca", us(["105", "3"]));
    expect(outcome.ok).toBe(false);
    if (outcome.ok) return;
    expect(outcome.errors).toEqual(["Course 1 percentage must be between 0 and 100."]);
  });

  it("reports a missing percentage when credit hours are entered", () => {
    const outcome = calculateGpa("ca", us(["", "3"]));
    expect(outcome.ok).toBe(false);
    if (outcome.ok) return;
    expect(outcome.errors).toEqual(["Course 1 percentage is required."]);
  });
});