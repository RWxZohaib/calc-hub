import { describe, expect, it } from "vitest";
import { calculateFuelCost } from "./calculate";

describe("calculateFuelCost (US)", () => {
  it("calculates gallons and cost for a 300-mile trip at 30 mpg and $4.00 a gallon", () => {
    const outcome = calculateFuelCost({
      system: "us",
      distance: "300",
      efficiency: "30",
      price: "4",
    });
    if (!outcome.ok) throw new Error("Expected a valid result");
    expect(outcome.result.fuelUsed).toBe(10);
    expect(outcome.result.fuelUnit).toBe("gallons");
    expect(outcome.result.cost).toBe(40);
  });

  it("handles decimal distances and prices", () => {
    const outcome = calculateFuelCost({
      system: "us",
      distance: "250.5",
      efficiency: "25",
      price: "3.499",
    });
    if (!outcome.ok) throw new Error("Expected a valid result");
    expect(outcome.result.fuelUsed).toBeCloseTo(10.02, 6);
    expect(outcome.result.cost).toBeCloseTo(35.05998, 5);
  });

  it("returns zero cost for a zero-mile trip", () => {
    const outcome = calculateFuelCost({
      system: "us",
      distance: "0",
      efficiency: "30",
      price: "4",
    });
    if (!outcome.ok) throw new Error("Expected a valid result");
    expect(outcome.result.cost).toBe(0);
  });

  it("rejects zero fuel economy, which would divide by zero", () => {
    const outcome = calculateFuelCost({
      system: "us",
      distance: "300",
      efficiency: "0",
      price: "4",
    });
    expect(outcome.ok).toBe(false);
    if (outcome.ok) return;
    expect(outcome.errors).toEqual(["Fuel economy (mpg) must be between 1 and 200."]);
  });
});

describe("calculateFuelCost (Canada)", () => {
  it("calculates litres and cost for 100 km at 6 L/100 km and $1.50 a litre", () => {
    const outcome = calculateFuelCost({
      system: "ca",
      distance: "100",
      efficiency: "6",
      price: "1.5",
    });
    if (!outcome.ok) throw new Error("Expected a valid result");
    expect(outcome.result.fuelUsed).toBe(6);
    expect(outcome.result.fuelUnit).toBe("litres");
    expect(outcome.result.cost).toBe(9);
  });

  it("handles decimal consumption and prices", () => {
    const outcome = calculateFuelCost({
      system: "ca",
      distance: "250",
      efficiency: "8.5",
      price: "1.629",
    });
    if (!outcome.ok) throw new Error("Expected a valid result");
    expect(outcome.result.fuelUsed).toBeCloseTo(21.25, 6);
    expect(outcome.result.cost).toBeCloseTo(34.61625, 5);
  });

  it("rejects zero consumption, which would mean no fuel is used", () => {
    const outcome = calculateFuelCost({
      system: "ca",
      distance: "100",
      efficiency: "0",
      price: "1.5",
    });
    expect(outcome.ok).toBe(false);
    if (outcome.ok) return;
    expect(outcome.errors).toEqual([
      "Fuel consumption (L/100 km) must be between 1 and 50.",
    ]);
  });
});