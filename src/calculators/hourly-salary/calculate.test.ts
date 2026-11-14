import { describe, expect, it } from "vitest";
import { calculateHourlyPay } from "./calculate";

describe("calculateHourlyPay", () => {
  it("calculates a standard 40-hour week at $25 an hour", () => {
    const outcome = calculateHourlyPay({
      hourlyRate: "25",
      hoursPerWeek: "40",
      weeksPerYear: "52",
    });
    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;
    expect(outcome.result.weekly).toBe(1000);
    expect(outcome.result.biweekly).toBe(2000);
    expect(outcome.result.annual).toBe(52000);
    expect(outcome.result.monthly).toBeCloseTo(4333.33, 2);
  });

  it("handles decimal rates and part-time hours", () => {
    const outcome = calculateHourlyPay({
      hourlyRate: "18.75",
      hoursPerWeek: "37.5",
      weeksPerYear: "52",
    });
    if (!outcome.ok) throw new Error("Expected a valid result");
    expect(outcome.result.annual).toBeCloseTo(36562.5, 6);
  });

  it("reduces annual pay when fewer weeks are worked", () => {
    const outcome = calculateHourlyPay({
      hourlyRate: "25",
      hoursPerWeek: "40",
      weeksPerYear: "50",
    });
    if (!outcome.ok) throw new Error("Expected a valid result");
    expect(outcome.result.annual).toBe(50000);
  });

  it("returns zero pay when hours are zero", () => {
    const outcome = calculateHourlyPay({
      hourlyRate: "25",
      hoursPerWeek: "0",
      weeksPerYear: "52",
    });
    if (!outcome.ok) throw new Error("Expected a valid result");
    expect(outcome.result.annual).toBe(0);
  });

  it("accepts the maximum hours and weeks", () => {
    const outcome = calculateHourlyPay({
      hourlyRate: "10",
      hoursPerWeek: "168",
      weeksPerYear: "52",
    });
    expect(outcome.ok).toBe(true);
  });

  it("reports every invalid field, not just the first", () => {
    const outcome = calculateHourlyPay({
      hourlyRate: "",
      hoursPerWeek: "200",
      weeksPerYear: "abc",
    });
    expect(outcome.ok).toBe(false);
    if (outcome.ok) return;
    expect(outcome.errors).toEqual([
      "Hourly rate is required.",
      "Hours per week must be between 0 and 168.",
      "Weeks per year must be a number.",
    ]);
  });
});
