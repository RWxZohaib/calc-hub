import { requireNumber, type FieldResult } from "../shared/validation";

export type FuelSystem = "us" | "ca";

export type FuelInputs = {
  system: FuelSystem;
  distance: string;
  efficiency: string;
  price: string;
};

export type FuelResult = {
  fuelUsed: number;
  fuelUnit: "gallons" | "litres";
  cost: number;
};

export type FuelOutcome =
  | { ok: true; result: FuelResult }
  | { ok: false; errors: string[] };

// Limits are set per system so each one suits its units.
export const FUEL_LIMITS = {
  us: {
    distance: { min: 0, max: 100000 },
    efficiency: { min: 1, max: 200 },
    price: { min: 0, max: 20 },
  },
  ca: {
    distance: { min: 0, max: 100000 },
    efficiency: { min: 1, max: 50 },
    price: { min: 0, max: 10 },
  },
};

// US: distance in miles, economy in miles per US gallon, price per gallon.
// Canada: distance in kilometres, consumption in litres per 100 km, price per litre.
// Each system uses its own units, so no unit conversion is needed.
export function calculateFuelCost(inputs: FuelInputs): FuelOutcome {
  const limits = FUEL_LIMITS[inputs.system];

  const distance = requireNumber(
    inputs.distance,
    "Trip distance",
    limits.distance.min,
    limits.distance.max
  );
  const efficiency = requireNumber(
    inputs.efficiency,
    inputs.system === "us" ? "Fuel economy (mpg)" : "Fuel consumption (L/100 km)",
    limits.efficiency.min,
    limits.efficiency.max
  );
  const price = requireNumber(
    inputs.price,
    inputs.system === "us" ? "Price per gallon" : "Price per litre",
    limits.price.min,
    limits.price.max
  );

  const checks: FieldResult[] = [distance, efficiency, price];
  const errors = checks.flatMap((c) => (c.ok ? [] : [c.error]));
  if (!distance.ok || !efficiency.ok || !price.ok) {
    return { ok: false, errors };
  }

  if (inputs.system === "us") {
    const gallons = distance.value / efficiency.value;
    return {
      ok: true,
      result: {
        fuelUsed: gallons,
        fuelUnit: "gallons",
        cost: gallons * price.value,
      },
    };
  }

  const litres = (distance.value * efficiency.value) / 100;
  return {
    ok: true,
    result: {
      fuelUsed: litres,
      fuelUnit: "litres",
      cost: litres * price.value,
    },
  };
}