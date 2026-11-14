"use client";

import { useState, type FormEvent } from "react";
import {
  calculateCanadaSalesTax,
  type CanadaSalesTaxOutcome,
  type TaxMode,
} from "@/calculators/canada-sales-tax/calculate";
import { roundToCents } from "@/calculators/shared/rounding";
import {
  CANADA_SALES_TAX_PROVINCES,
  CANADA_SALES_TAX_SOURCE,
} from "@/data/regional-rules/canada-sales-tax";

const money = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
});

export default function CanadaSalesTaxForm() {
  const [provinceCode, setProvinceCode] = useState("");
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState<TaxMode>("add");
  const [outcome, setOutcome] = useState<CanadaSalesTaxOutcome | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOutcome(calculateCanadaSalesTax({ provinceCode, amount, mode }));
  }

  function handleReset() {
    setProvinceCode("");
    setAmount("");
    setMode("add");
    setOutcome(null);
  }

  const inputClass =
    "mt-1 w-full rounded-md border border-[var(--color-line)] bg-white px-3 py-2 text-[var(--color-ink)] focus:border-[var(--color-brand)]";
  const labelClass = "block text-sm font-semibold text-[var(--color-ink)]";

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ca-province" className={labelClass}>
            Province or territory
          </label>
          <select
            id="ca-province"
            value={provinceCode}
            onChange={(e) => setProvinceCode(e.target.value)}
            className={inputClass}
          >
            <option value="">Choose a province or territory</option>
            {CANADA_SALES_TAX_PROVINCES.map((province) => (
              <option key={province.code} value={province.code}>
                {province.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="ca-mode" className={labelClass}>
            What do you know?
          </label>
          <select
            id="ca-mode"
            value={mode}
            onChange={(e) => setMode(e.target.value as TaxMode)}
            className={inputClass}
          >
            <option value="add">The price before tax (add the tax)</option>
            <option value="remove">The total including tax (find the price)</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="ca-amount" className={labelClass}>
            {mode === "add" ? "Price before tax (CAD)" : "Total including tax (CAD)"}
          </label>
          <input
            id="ca-amount"
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={inputClass}
            aria-describedby="ca-amount-help"
          />
          <p id="ca-amount-help" className="mt-1 text-xs text-[var(--color-muted)]">
            Between 0 and 1,000,000
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
            aria-labelledby="ca-tax-result-heading"
            className="rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-6"
          >
            <h2
              id="ca-tax-result-heading"
              className="text-xl font-semibold text-[var(--color-ink)]"
            >
              Estimated tax in {outcome.result.province.name}
            </h2>

            <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div>
                <dt className="text-sm text-[var(--color-muted)]">Price before tax</dt>
                <dd className="text-lg font-semibold">
                  {money.format(roundToCents(outcome.result.price))}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-[var(--color-muted)]">Total tax</dt>
                <dd className="text-lg font-semibold">
                  {money.format(roundToCents(outcome.result.totalTax))}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-[var(--color-muted)]">Total including tax</dt>
                <dd className="text-lg font-semibold">
                  {money.format(roundToCents(outcome.result.total))}
                </dd>
              </div>
            </dl>

            <table className="mt-6 w-full text-left text-sm">
              <caption className="sr-only">Tax breakdown</caption>
              <thead>
                <tr className="border-b border-[var(--color-line)]">
                  <th scope="col" className="py-2 font-semibold">Tax</th>
                  <th scope="col" className="py-2 font-semibold">Rate</th>
                  <th scope="col" className="py-2 font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {outcome.result.components.map((component) => (
                  <tr key={component.label} className="border-b border-[var(--color-line)]">
                    <td className="py-2">{component.label}</td>
                    <td className="py-2">{component.rate}%</td>
                    <td className="py-2">{money.format(component.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-4 text-sm text-[var(--color-muted)]">
              Rates as of{" "}
              {new Date(`${CANADA_SALES_TAX_SOURCE.checkedOn}T00:00:00Z`).toLocaleDateString(
                "en-CA",
                { timeZone: "UTC", year: "numeric", month: "long", day: "numeric" }
              )}
              . This is an estimate. Some goods and services are exempt or taxed differently, and
              vehicles have their own rules.
            </p>
          </section>
        ) : null}
      </div>
    </div>
  );
}