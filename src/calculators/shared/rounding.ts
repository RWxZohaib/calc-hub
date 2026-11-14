// Rounds a money amount to the nearest cent (two decimal places).
// Halves round upwards, for example 590.625 becomes 590.63.
export function roundToCents(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }