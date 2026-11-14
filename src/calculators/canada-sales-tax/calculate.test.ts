import { describe, expect, it } from "vitest";
import {
  calculateCanadaSalesTax,
  findProvince,
  type CanadaSalesTaxOutcome,
} from "./calculate";
import { CANADA_SALES_TAX_PROVINCES } from "../../data/regional-rules/canada-sales-tax";

function expectOk(outcome: CanadaSalesTaxOutcome) {
  if (!outcome.ok) throw new Error(`Expected a valid result, got: ${outcome.errors.join("; ")}`);
  return outcome.result;
}

describe("calculateCanadaSalesTax: add mode", () => {
  it("adds 13% HST in Ontario to $100", () => {
    const result = expectOk(calculateCanadaSalesTax({ provinceCode: "ON", amount: "100", mode: "add" }));
    expect(result.components).toEqual([{ label: "HST", rate: 13, amount: 13 }]);
    expect(result.totalTax).toBe(13);
    expect(result.total).toBe(113);
  });

  it("adds 14% HST in Nova Scotia to $100", () => {
    const result = expectOk(calculateCanadaSalesTax({ provinceCode: "NS", amount: "100", mode: "add" }));
    expect(result.total).toBe(114);
  });

  it("adds 5% GST only in Alberta", () => {
    const result = expectOk(calculateCanadaSalesTax({ provinceCode: "AB", amount: "100", mode: "add" }));
    expect(result.components).toEqual([{ label: "GST", rate: 5, amount: 5 }]);
    expect(result.total).toBe(105);
  });

  it("adds GST and PST separately in British Columbia", () => {
    const result = expectOk(calculateCanadaSalesTax({ provinceCode: "BC", amount: "100", mode: "add" }));
    expect(result.components).toEqual([
      { label: "GST", rate: 5, amount: 5 },
      { label: "PST", rate: 7, amount: 7 },
    ]);
    expect(result.total).toBe(112);
  });

  it("works out Quebec's 9.975% QST on the price, rounding the half-cent up", () => {
    const result = expectOk(calculateCanadaSalesTax({ provinceCode: "QC", amount: "100", mode: "add" }));
    expect(result.components).toEqual([
      { label: "GST", rate: 5, amount: 5 },
      { label: "QST", rate: 9.975, amount: 9.98 },
    ]);
    expect(result.total).toBe(114.98);
  });

  it("rounds a half-cent tax upward", () => {
    const result = expectOk(calculateCanadaSalesTax({ provinceCode: "QC", amount: "0.50", mode: "add" }));
    expect(result.components[0].amount).toBe(0.03);
  });

  it("handles decimal prices", () => {
    const result = expectOk(calculateCanadaSalesTax({ provinceCode: "SK", amount: "49.99", mode: "add" }));
    expect(result.price).toBe(49.99);
    expect(result.total).toBe(55.49);
  });
});

describe("calculateCanadaSalesTax: remove mode", () => {
  it("finds the price before HST in Ontario from a $113.00 total", () => {
    const result = expectOk(calculateCanadaSalesTax({ provinceCode: "ON", amount: "113", mode: "remove" }));
    expect(result.price).toBe(100);
    expect(result.totalTax).toBe(13);
  });

  it("finds the price before Quebec tax from a $114.98 total", () => {
    const result = expectOk(calculateCanadaSalesTax({ provinceCode: "QC", amount: "114.98", mode: "remove" }));
    expect(result.price).toBe(100);
    expect(result.components).toEqual([
      { label: "GST", rate: 5, amount: 5 },
      { label: "QST", rate: 9.975, amount: 9.98 },
    ]);
    expect(result.total).toBe(114.98);
  });

  it("finds the price before GST in Alberta from a $105.00 total", () => {
    const result = expectOk(calculateCanadaSalesTax({ provinceCode: "AB", amount: "105", mode: "remove" }));
    expect(result.price).toBe(100);
    expect(result.totalTax).toBe(5);
  });
});

describe("calculateCanadaSalesTax: checks on the entries", () => {
  it("asks the visitor to choose a province", () => {
    const outcome = calculateCanadaSalesTax({ provinceCode: "", amount: "100", mode: "add" });
    expect(outcome.ok).toBe(false);
    if (outcome.ok) return;
    expect(outcome.errors).toEqual(["Choose a province or territory."]);
  });

  it("rejects an amount that is not a number", () => {
    const outcome = calculateCanadaSalesTax({ provinceCode: "ON", amount: "abc", mode: "add" });
    expect(outcome.ok).toBe(false);
    if (outcome.ok) return;
    expect(outcome.errors).toEqual(["Amount must be a number."]);
  });

  it("rejects a negative amount", () => {
    const outcome = calculateCanadaSalesTax({ provinceCode: "ON", amount: "-1", mode: "add" });
    expect(outcome.ok).toBe(false);
  });
});

describe("rate data", () => {
  it("contains all 10 provinces and 3 territories", () => {
    expect(CANADA_SALES_TAX_PROVINCES).toHaveLength(13);
  });

  it("looks up a province by its code", () => {
    expect(findProvince("QC")?.name).toBe("Quebec");
    expect(findProvince("ZZ")).toBeUndefined();
  });
});