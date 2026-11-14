export type FieldResult =
  | { ok: true; value: number }
  | { ok: false; error: string };

// Checks that a typed value is a number within a sensible range.
// Returns either the number or a plain-English error message.
export function requireNumber(
  raw: string,
  label: string,
  min: number,
  max: number
): FieldResult {
  const trimmed = raw.trim();

  if (trimmed === "") {
    return { ok: false, error: `${label} is required.` };
  }

  const value = Number(trimmed);

  if (!Number.isFinite(value)) {
    return { ok: false, error: `${label} must be a number.` };
  }

  if (value < min || value > max) {
    return { ok: false, error: `${label} must be between ${min} and ${max}.` };
  }

  return { ok: true, value };
}