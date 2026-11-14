import { requireNumber } from "../shared/validation";
import { roundToCents } from "../shared/rounding";
import {
  US_SALES_TAX_STATES,
  type StateSalesTax,
} from "../../data/regional-rules/us-sales-tax";

export type TaxMode = "add" | "remove";

export type UsSalesTaxInputs = {
  stateCode: string;
  amount: string;
  mode: TaxMode;
};

export type UsSalesTaxResult = {
  state: StateSalesTax;
  mode: TaxMode;
  price: number; // price before sales tax
  tax: number;
  total: number; // price including sales tax
};

export type UsSalesTaxOutcome =
  | { ok: true; result: UsSalesTaxResult }
  | { ok: false; errors: string[] };

export const US_TAX_LIMITS = {
  amount: { min: 0, max: 1000000 },
};

export function findState(code: string): StateSalesTax | undefined {
  return US_SALES_TAX_STATES.find((state) => state.code === code);
}

// Add mode: the amount is a price before tax; tax is added on top.
// Remove mode: the amount is a total including tax; the price before tax is worked out.
// The combined state-and-local average rate is used, so results are estimates.
export function calculateUsSalesTax(inputs: UsSalesTaxInputs): UsSalesTaxOutcome {
  const errors: string[] = [];

  const state = findState(inputs.stateCode);
  if (!state) {
    errors.push("Choose a state.");
  }

  const amount = requireNumber(
    inputs.amount,
    "Amount",
    US_TAX_LIMITS.amount.min,
    US_TAX_LIMITS.amount.max
  );
  if (!amount.ok) {
    errors.push(amount.error);
  }

  if (!state || !amount.ok) {
    return { ok: false, errors };
  }

  const rate = state.combinedRate / 100;
  const entered = roundToCents(amount.value);

  if (inputs.mode === "add") {
    const tax = roundToCents(entered * rate);
    return {
      ok: true,
      result: {
        state,
        mode: "add",
        price: entered,
        tax,
        total: roundToCents(entered + tax),
      },
    };
  }

  const price = roundToCents(entered / (1 + rate));
  const tax = roundToCents(entered - price);
  return {
    ok: true,
    result: {
      state,
      mode: "remove",
      price,
      tax,
      total: entered,
    },
  };
}