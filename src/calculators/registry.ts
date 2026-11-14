import type { CalculatorDefinition } from "./types";
import { hourlySalaryConfig } from "./hourly-salary/config";
import { fuelCostConfig } from "./fuel-cost/config";
import { gpaConfig } from "./gpa/config";
import { usSalesTaxConfig } from "./us-sales-tax/config";
import { canadaSalesTaxConfig } from "./canada-sales-tax/config";

// Every calculator the site knows about. A calculator appears on the site
// only when it is listed here.
export const calculators: CalculatorDefinition[] = [
  hourlySalaryConfig,
  fuelCostConfig,
  gpaConfig,
  usSalesTaxConfig,
  canadaSalesTaxConfig,
];

export function getCalculatorBySlug(
  slug: string
): CalculatorDefinition | undefined {
  return calculators.find((calculator) => calculator.slug === slug);
}