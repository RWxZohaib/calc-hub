import { requireNumber, type FieldResult } from "../shared/validation";

export type HourlyInputs = {
  hourlyRate: string;
  hoursPerWeek: string;
  weeksPerYear: string;
};

export type HourlyResult = {
  weekly: number;
  biweekly: number;
  monthly: number;
  annual: number;
};

export type HourlyOutcome =
  | { ok: true; result: HourlyResult }
  | { ok: false; errors: string[] };

// Limits shown to the visitor and enforced by the calculator.
export const HOURLY_LIMITS = {
  hourlyRate: { min: 0, max: 10000 },
  hoursPerWeek: { min: 0, max: 168 },
  weeksPerYear: { min: 1, max: 52 },
};

// Checks all three inputs and, if they are valid, returns the pay figures.
// Figures are kept at full precision here; rounding happens only when displayed.
export function calculateHourlyPay(inputs: HourlyInputs): HourlyOutcome {
  const rate = requireNumber(
    inputs.hourlyRate,
    "Hourly rate",
    HOURLY_LIMITS.hourlyRate.min,
    HOURLY_LIMITS.hourlyRate.max
  );
  const hours = requireNumber(
    inputs.hoursPerWeek,
    "Hours per week",
    HOURLY_LIMITS.hoursPerWeek.min,
    HOURLY_LIMITS.hoursPerWeek.max
  );
  const weeks = requireNumber(
    inputs.weeksPerYear,
    "Weeks per year",
    HOURLY_LIMITS.weeksPerYear.min,
    HOURLY_LIMITS.weeksPerYear.max
  );

  const checks: FieldResult[] = [rate, hours, weeks];
  const errors = checks.flatMap((c) => (c.ok ? [] : [c.error]));
  if (errors.length > 0) {
    return { ok: false, errors };
  }

  const weekly = rate.ok && hours.ok ? rate.value * hours.value : 0;
  const annual = weekly * (weeks.ok ? weeks.value : 0);

  return {
    ok: true,
    result: {
      weekly,
      biweekly: weekly * 2,
      monthly: annual / 12,
      annual,
    },
  };
}
