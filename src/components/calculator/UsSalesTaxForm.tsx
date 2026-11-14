"use client";

import { useState, type FormEvent } from "react";
import {
  calculateUsSalesTax,
  type TaxMode,
  type UsSalesTaxOutcome,
} from "@/calculators/us-sales-tax/calculate";
import {
  US_SALES_TAX_SOURCE,
  US_SALES_TAX_STATES,
} from "@/data/regional-rules/us-sales-tax";
import { roundToCents } from "@/calculators/shared/rounding";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function UsSalesTaxForm() {
  const [stateCode, setStateCode] = useState("");
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState<TaxMode>("add");
  const [outcome, setOutcome] = useState<UsSalesTaxOutcome | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOutcome(calculateUsSalesTax({ stateCode, amount, mode }));
  }

  function handleReset() {
    setStateCode("");
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
          <label htmlFor="us-state" className={labelClass}>
            State
          </label>
          <select
            id="us-state"
            value={stateCode}
            onChange={(e) => setStateCode(e.target.value)}
            className={inputClass}
          >
            <option value="">Choose a state</option>
            {US_SALES_TAX_STATES.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="us-mode" className={labelClass}>
            What do you know?
          </label>
          <select
            id="us-mode"
            value={mode}
            onChange={(e) => setMode(e.target.value as TaxMode)}
            className={inputClass}
          >
            <option value="add">The price before tax (add the tax)</option>
            <option value="remove">The total including tax (find the price)</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="us-amount" className={labelClass}>
            {mode === "add" ? "Price before tax (USD)" : "Total including tax (USD)"}
          </label>
          <input
            id="us-amount"
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={inputClass}
            aria-describedby="us-amount-help"
          />
          <p id="us-amount-help" className="mt-1 text-xs text-[var(--color-muted)]">
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
            aria-labelledby="us-tax-result-heading"
            className="rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-6"
          >
            <h2
              id="us-tax-result-heading"
              className="text-xl font-semibold text-[var(--color-ink)]"
            >
              Estimated sales tax in {outcome.result.state.name}
            </h2>
            <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div>
                <dt className="text-sm text-[var(--color-muted)]">Price before tax</dt>
                <dd className="text-lg font-semibold">{money.format(roundToCents(outcome.result.price))}</dd>
              </div>
              <div>
                <dt className="text-sm text-[var(--color-muted)]">Sales tax</dt>
                <dd className="text-lg font-semibold">{money.format(roundToCents(outcome.result.tax))}</dd>
              </div>
              <div>
                <dt className="text-sm text-[var(--color-muted)]">Total including tax</dt>
                <dd className="text-lg font-semibold">{money.format(roundToCents(outcome.result.total))}</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-[var(--color-muted)]">
              Average combined state and local rate: {outcome.result.state.combinedRate.toFixed(2)}%.
              This is an estimate. Local rates vary by address. Rates as of{" "}
              {new Date(`${US_SALES_TAX_SOURCE.dataAsOf}T00:00:00Z`).toLocaleDateString("en-US", {
                timeZone: "UTC",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              .
            </p>
          </section>
        ) : null}
      </div>
    </div>
  );
}