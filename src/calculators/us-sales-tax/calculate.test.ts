import { describe, expect, it } from "vitest";
import { calculateUsSalesTax, findState } from "./calculate";
import { US_SALES_TAX_STATES } from "../../data/regional-rules/us-sales-tax";

function expectOk(outcome: ReturnType<typeof calculateUsSalesTax>) {
  if (!outcome.ok) throw new Error(`Expected a valid result, got: ${outcome.errors.join("; ")}`);
  return outcome.result;
}

describe("calculateUsSalesTax: add mode", () => {
  it("adds Texas's 8.20% combined rate to $100", () => {
    const result = expectOk(
      calculateUsSalesTax({ stateCode: "TX", amount: "100", mode: "add" })
    );
    expect(result.tax).toBe(8.2);
    expect(result.total).toBe(108.2);
  });

  it("adds Louisiana's 10.11% combined rate to $100", () => {
    const result = expectOk(
      calculateUsSalesTax({ stateCode: "LA", amount: "100", mode: "add" })
    );
    expect(result.tax).toBe(10.11);
    expect(result.total).toBe(110.11);
  });

  it("adds no tax in Delaware, which has no sales tax", () => {
    const result = expectOk(
      calculateUsSalesTax({ stateCode: "DE", amount: "100", mode: "add" })
    );
    expect(result.tax).toBe(0);
    expect(result.total).toBe(100);
  });

  it("rounds the tax to the nearest cent", () => {
    const result = expectOk(
      calculateUsSalesTax({ stateCode: "TN", amount: "5", mode: "add" })
    );
    expect(result.tax).toBe(0.48);
    expect(result.total).toBe(5.48);
  });

  it("handles decimal amounts", () => {
    const result = expectOk(
      calculateUsSalesTax({ stateCode: "TX", amount: "49.99", mode: "add" })
    );
    expect(result.tax).toBe(4.1);
    expect(result.total).toBe(54.09);
  });
});

describe("calculateUsSalesTax: remove mode", () => {
  it("finds the price before tax in Texas from a $108.20 total", () => {
    const result = expectOk(
      calculateUsSalesTax({ stateCode: "TX", amount: "108.2", mode: "remove" })
    );
    expect(result.price).toBe(100);
    expect(result.tax).toBe(8.2);
    expect(result.total).toBe(108.2);
  });

  it("finds the price before tax in Louisiana from a $110.11 total", () => {
    const result = expectOk(
      calculateUsSalesTax({ stateCode: "LA", amount: "110.11", mode: "remove" })
    );
    expect(result.price).toBe(100);
    expect(result.tax).toBe(10.11);
  });

  it("returns the same amount when the state has no sales tax", () => {
    const result = expectOk(
      calculateUsSalesTax({ stateCode: "DE", amount: "100", mode: "remove" })
    );
    expect(result.price).toBe(100);
    expect(result.tax).toBe(0);
  });
});

describe("calculateUsSalesTax: checks on the entries", () => {
  it("asks the visitor to choose a state", () => {
    const outcome = calculateUsSalesTax({ stateCode: "", amount: "100", mode: "add" });
    expect(outcome.ok).toBe(false);
    if (outcome.ok) return;
    expect(outcome.errors).toEqual(["Choose a state."]);
  });

  it("rejects an amount that is not a number", () => {
    const outcome = calculateUsSalesTax({ stateCode: "TX", amount: "abc", mode: "add" });
    expect(outcome.ok).toBe(false);
    if (outcome.ok) return;
    expect(outcome.errors).toEqual(["Amount must be a number."]);
  });

  it("rejects a negative amount", () => {
    const outcome = calculateUsSalesTax({ stateCode: "TX", amount: "-5", mode: "add" });
    expect(outcome.ok).toBe(false);
    if (outcome.ok) return;
    expect(outcome.errors).toEqual(["Amount must be between 0 and 1000000."]);
  });

  it("reports both problems when the state and amount are both missing", () => {
    const outcome = calculateUsSalesTax({ stateCode: "", amount: "", mode: "add" });
    expect(outcome.ok).toBe(false);
    if (outcome.ok) return;
    expect(outcome.errors).toEqual(["Choose a state.", "Amount is required."]);
  });
});

describe("rate data", () => {
  it("contains all 50 states and the District of Columbia", () => {
    expect(US_SALES_TAX_STATES).toHaveLength(51);
  });

  it("looks up a state by its two-letter code", () => {
    expect(findState("LA")?.combinedRate).toBe(10.11);
    expect(findState("ZZ")).toBeUndefined();
  });
});