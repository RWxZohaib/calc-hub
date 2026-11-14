"use client";

import { useState, type FormEvent } from "react";
import {
  calculateHourlyPay,
  HOURLY_LIMITS,
  type HourlyOutcome,
} from "@/calculators/hourly-salary/calculate";
import { roundToCents } from "@/calculators/shared/rounding";

type Currency = "USD" | "CAD";

const CURRENCIES: Record<Currency, { locale: string; name: string }> = {
  USD: { locale: "en-US", name: "US dollars (USD)" },
  CAD: { locale: "en-CA", name: "Canadian dollars (CAD)" },
};

function formatMoney(value: number, currency: Currency): string {
  return new Intl.NumberFormat(CURRENCIES[currency].locale, {
    style: "currency",
    currency,
  }).format(value);
}

export default function CalculatorForm() {
  const [hourlyRate, setHourlyRate] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [outcome, setOutcome] = useState<HourlyOutcome | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOutcome(calculateHourlyPay({ hourlyRate, hoursPerWeek, weeksPerYear }));
  }

  function handleReset() {
    setHourlyRate("");
    setHoursPerWeek("40");
    setWeeksPerYear("52");
    setCurrency("USD");
    setOutcome(null);
  }

  const inputClass =
    "mt-1 w-full rounded-md border border-[var(--color-line)] bg-white px-3 py-2 text-[var(--color-ink)] focus:border-[var(--color-brand)]";
  const labelClass = "block text-sm font-semibold text-[var(--color-ink)]";

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="currency" className={labelClass}>
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className={inputClass}
          >
            <option value="USD">US dollars (USD)</option>
            <option value="CAD">Canadian dollars (CAD)</option>
          </select>
          <p className="mt-1 text-xs text-[var(--color-muted)]">
            Choose the currency you are paid in. Amounts are not converted.
          </p>
        </div>

        <div>
          <label htmlFor="hourlyRate" className={labelClass}>
            Hourly rate
          </label>
          <input
            id="hourlyRate"
            name="hourlyRate"
            type="text"
            inputMode="decimal"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            className={inputClass}
            aria-describedby="hourlyRate-help"
          />
          <p id="hourlyRate-help" className="mt-1 text-xs text-[var(--color-muted)]">
            Up to {HOURLY_LIMITS.hourlyRate.max.toLocaleString("en-US")}
          </p>
        </div>

        <div>
          <label htmlFor="hoursPerWeek" className={labelClass}>
            Hours per week
          </label>
          <input
            id="hoursPerWeek"
            name="hoursPerWeek"
            type="text"
            inputMode="decimal"
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(e.target.value)}
            className={inputClass}
            aria-describedby="hoursPerWeek-help"
          />
          <p id="hoursPerWeek-help" className="mt-1 text-xs text-[var(--color-muted)]">
            Between 0 and 168
          </p>
        </div>

        <div>
          <label htmlFor="weeksPerYear" className={labelClass}>
            Weeks per year
          </label>
          <input
            id="weeksPerYear"
            name="weeksPerYear"
            type="text"
            inputMode="decimal"
            value={weeksPerYear}
            onChange={(e) => setWeeksPerYear(e.target.value)}
            className={inputClass}
            aria-describedby="weeksPerYear-help"
          />
          <p id="weeksPerYear-help" className="mt-1 text-xs text-[var(--color-muted)]">
            Between 1 and 52
          </p>
        </div>

        <div className="flex flex-wrap gap-3 sm:col-span-2">
          <button
            type="submit"
            className="rounded-md bg-[var(--color-brand)] px-5 py-2 font-semibold text-white hover:bg-[var(--color-brand-dark)] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2"
          >
            Calculate
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-md border border-[var(--color-line)] bg-white px-5 py-2 font-semibold text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
          >
            Reset
          </button>
        </div>
      </form>

      <div aria-live="polite">
        {outcome && !outcome.ok ? (
          <div
            role="alert"
            className="rounded-md border border-red-300 bg-red-50 p-4 text-red-900"
          >
            <p className="font-semibold">Please check your entries:</p>
            <ul className="mt-2 list-disc pl-5">
              {outcome.errors.map((message) => (
                <li key={message}>{message}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {outcome && outcome.ok ? (
          <section
            aria-labelledby="result-heading"
            className="rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-6"
          >
            <h2 id="result-heading" className="text-xl font-semibold text-[var(--color-ink)]">
              Your gross pay in {CURRENCIES[currency].name}
            </h2>
            <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <dt className="text-sm text-[var(--color-muted)]">Weekly</dt>
                <dd className="text-lg font-semibold">
                  {formatMoney(roundToCents(outcome.result.weekly), currency)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-[var(--color-muted)]">Biweekly</dt>
                <dd className="text-lg font-semibold">
                  {formatMoney(roundToCents(outcome.result.biweekly), currency)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-[var(--color-muted)]">Monthly</dt>
                <dd className="text-lg font-semibold">
                  {formatMoney(roundToCents(outcome.result.monthly), currency)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-[var(--color-muted)]">Annual</dt>
                <dd className="text-lg font-semibold">
                  {formatMoney(roundToCents(outcome.result.annual), currency)}
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-[var(--color-muted)]">
              These are gross amounts, before tax and deductions. Both US and Canadian dollars
              use the $ symbol, so the currency name above is the reliable guide.
            </p>
          </section>
        ) : null}
      </div>
    </div>
  );
}