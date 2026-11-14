import { requireNumber } from "../shared/validation";
import {
  CANADA_SALES_TAX_PROVINCES,
  type ProvinceTax,
  type TaxComponent,
} from "../../data/regional-rules/canada-sales-tax";

export type TaxMode = "add" | "remove";

export type CanadaTaxInputs = {
  provinceCode: string;
  amount: string;
  mode: TaxMode;
};

export type ComponentAmount = {
  label: TaxComponent["label"];
  rate: number;
  amount: number;
};

export type CanadaSalesTaxResult = {
  province: ProvinceTax;
  mode: TaxMode;
  price: number; // price before tax
  components: ComponentAmount[];
  totalTax: number;
  total: number; // price including tax
};

export type CanadaSalesTaxOutcome =
  | { ok: true; result: CanadaSalesTaxResult }
  | { ok: false; errors: string[] };

export const CANADA_TAX_LIMITS = {
  amount: { min: 0, max: 1000000 },
};

export function findProvince(code: string): ProvinceTax | undefined {
  return CANADA_SALES_TAX_PROVINCES.find((province) => province.code === code);
}

// Rates are percentages with up to three decimals (for example 9.975).
// Working in whole thousandths of a percent and whole cents avoids floating-point
// errors, so a tax of exactly half a cent always rounds up.
function toThousandths(rate: number): number {
  return Math.round(rate * 1000);
}

function taxInCents(priceCents: number, thousandths: number): number {
  return Math.round((priceCents * thousandths) / 100000);
}

// Each tax is worked out on the price before tax, not on a GST-inclusive amount.
// Add mode: the amount is the price before tax.
// Remove mode: the amount is the total; the price before tax is worked out from it.
export function calculateCanadaSalesTax(
  inputs: CanadaTaxInputs
): CanadaSalesTaxOutcome {
  const errors: string[] = [];

  const province = findProvince(inputs.provinceCode);
  if (!province) {
    errors.push("Choose a province or territory.");
  }

  const amount = requireNumber(
    inputs.amount,
    "Amount",
    CANADA_TAX_LIMITS.amount.min,
    CANADA_TAX_LIMITS.amount.max
  );
  if (!amount.ok) {
    errors.push(amount.error);
  }

  if (!province || !amount.ok) {
    return { ok: false, errors };
  }

  const rates = province.components.map((component) => toThousandths(component.rate));
  const sumOfRates = rates.reduce((sum, rate) => sum + rate, 0);
  const enteredCents = Math.round(amount.value * 100);

  const priceCents =
    inputs.mode === "add"
      ? enteredCents
      : Math.round((enteredCents * 100000) / (100000 + sumOfRates));

  const taxes = province.components.map((component, index) => ({
    label: component.label,
    rate: component.rate,
    cents: taxInCents(priceCents, rates[index]),
  }));

  const totalTaxCents = taxes.reduce((sum, tax) => sum + tax.cents, 0);
  const totalCents = priceCents + totalTaxCents;

  return {
    ok: true,
    result: {
      province,
      mode: inputs.mode,
      price: priceCents / 100,
      components: taxes.map((tax) => ({
        label: tax.label,
        rate: tax.rate,
        amount: tax.cents / 100,
      })),
      totalTax: totalTaxCents / 100,
      total: totalCents / 100,
    },
  };
}