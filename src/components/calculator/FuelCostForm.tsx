"use client";

import { useState, type FormEvent } from "react";
import {
  calculateFuelCost,
  FUEL_LIMITS,
  type FuelOutcome,
  type FuelSystem,
} from "@/calculators/fuel-cost/calculate";
import { roundToCents } from "@/calculators/shared/rounding";

const SYSTEMS: Record<
  FuelSystem,
  {
    name: string;
    currency: "USD" | "CAD";
    distanceLabel: string;
    distanceHelp: string;
    efficiencyLabel: string;
    efficiencyHelp: string;
    priceLabel: string;
    fuelUnitName: string;
  }
> = {
  us: {
    name: "United States (miles and gallons)",
    currency: "USD",
    distanceLabel: "Trip distance (miles)",
    distanceHelp: `Up to ${FUEL_LIMITS.us.distance.max.toLocaleString("en-US")} miles`,
    efficiencyLabel: "Fuel economy (miles per gallon)",
    efficiencyHelp: `Between ${FUEL_LIMITS.us.efficiency.min} and ${FUEL_LIMITS.us.efficiency.max} mpg`,
    priceLabel: "Price per gallon (USD)",
    fuelUnitName: "gallons",
  },
  ca: {
    name: "Canada (kilometres and litres)",
    currency: "CAD",
    distanceLabel: "Trip distance (km)",
    distanceHelp: `Up to ${FUEL_LIMITS.ca.distance.max.toLocaleString("en-CA")} km`,
    efficiencyLabel: "Fuel consumption (litres per 100 km)",
    efficiencyHelp: `Between ${FUEL_LIMITS.ca.efficiency.min} and ${FUEL_LIMITS.ca.efficiency.max} L/100 km`,
    priceLabel: "Price per litre (CAD)",
    fuelUnitName: "litres",
  },
};

function formatMoney(value: number, currency: "USD" | "CAD"): string {
  return new Intl.NumberFormat(currency === "USD" ? "en-US" : "en-CA", {
    style: "currency",
    currency,
  }).format(value);
}

export default function FuelCostForm() {
  const [system, setSystem] = useState<FuelSystem>("us");
  const [distance, setDistance] = useState("");
  const [efficiency, setEfficiency] = useState("");
  const [price, setPrice] = useState("");
  const [outcome, setOutcome] = useState<FuelOutcome | null>(null);

  const units = SYSTEMS[system];

  function handleSystemChange(next: FuelSystem) {
    setSystem(next);
    setOutcome(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOutcome(calculateFuelCost({ system, distance, efficiency, price }));
  }

  function handleReset() {
    setSystem("us");
    setDistance("");
    setEfficiency("");
    setPrice("");
    setOutcome(null);
  }

  const inputClass =
    "mt-1 w-full rounded-md border border-[var(--color-line)] bg-white px-3 py-2 text-[var(--color-ink)] focus:border-[var(--color-brand)]";
  const labelClass = "block text-sm font-semibold text-[var(--color-ink)]";

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="system" className={labelClass}>
            Units and currency
          </label>
          <select
            id="system"
            name="system"
            value={system}
            onChange={(e) => handleSystemChange(e.target.value as FuelSystem)}
            className={inputClass}
          >
            <option value="us">{SYSTEMS.us.name}</option>
            <option value="ca">{SYSTEMS.ca.name}</option>
          </select>
          <p className="mt-1 text-xs text-[var(--color-muted)]">
            Choose the units shown on your vehicle and at the pump. Results are not converted.
          </p>
        </div>

        <div>
          <label htmlFor="distance" className={labelClass}>
            {units.distanceLabel}
          </label>
          <input
            id="distance"
            name="distance"
            type="text"
            inputMode="decimal"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className={inputClass}
            aria-describedby="distance-help"
          />
          <p id="distance-help" className="mt-1 text-xs text-[var(--color-muted)]">
            {units.distanceHelp}
          </p>
        </div>

        <div>
          <label htmlFor="efficiency" className={labelClass}>
            {units.efficiencyLabel}
          </label>
          <input
            id="efficiency"
            name="efficiency"
            type="text"
            inputMode="decimal"
            value={efficiency}
            onChange={(e) => setEfficiency(e.target.value)}
            className={inputClass}
            aria-describedby="efficiency-help"
          />
          <p id="efficiency-help" className="mt-1 text-xs text-[var(--color-muted)]">
            {units.efficiencyHelp}
          </p>
        </div>

        <div>
          <label htmlFor="price" className={labelClass}>
            {units.priceLabel}
          </label>
          <input
            id="price"
            name="price"
            type="text"
            inputMode="decimal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={inputClass}
            aria-describedby="price-help"
          />
          <p id="price-help" className="mt-1 text-xs text-[var(--color-muted)]">
            Enter the price you expect to pay
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
            aria-labelledby="fuel-result-heading"
            className="rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-6"
          >
            <h2
              id="fuel-result-heading"
              className="text-xl font-semibold text-[var(--color-ink)]"
            >
              Estimated trip cost in {units.currency === "USD" ? "US dollars (USD)" : "Canadian dollars (CAD)"}
            </h2>
            <dl className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-[var(--color-muted)]">Fuel needed</dt>
                <dd className="text-lg font-semibold">
                  {roundToCents(outcome.result.fuelUsed).toLocaleString(
                    system === "us" ? "en-US" : "en-CA",
                    { maximumFractionDigits: 2 }
                  )}{" "}
                  {outcome.result.fuelUnit}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-[var(--color-muted)]">Total fuel cost</dt>
                <dd className="text-lg font-semibold">
                  {formatMoney(roundToCents(outcome.result.cost), units.currency)}
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-[var(--color-muted)]">
              This estimate covers fuel only, based on the figures you entered. Actual fuel use
              varies with driving conditions. Canadian and US results are calculated separately and
              are not converted between currencies or units.
            </p>
          </section>
        ) : null}
      </div>
    </div>
  );
}