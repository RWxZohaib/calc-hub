import { requireNumber } from "../shared/validation";

export type GpaSystem = "us" | "ca";

// For US: value is a letter grade. For Canada: value is a percentage.
export type CourseEntry = {
  value: string;
  credits: string;
};

export type GpaResult = {
  average: number; // GPA on the 4.0 scale (US), or percentage average (Canada)
  totalCredits: number;
  system: GpaSystem;
};

export type GpaOutcome =
  | { ok: true; result: GpaResult }
  | { ok: false; errors: string[] };

// Standard 4.0 scale. Some schools differ (for example, A+ may be 4.3, or D- may not exist).
export const US_GRADE_POINTS: Record<string, number> = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  "D-": 0.7,
  F: 0.0,
};

export const GPA_LIMITS = {
  creditHours: { min: 0.5, max: 20 },
  percentage: { min: 0, max: 100 },
};

// Blank rows are ignored. Any partly filled row is reported as an error.
export function calculateGpa(system: GpaSystem, courses: CourseEntry[]): GpaOutcome {
  const errors: string[] = [];
  let weightedTotal = 0;
  let totalCredits = 0;
  let countedCourses = 0;

  courses.forEach((course, index) => {
    const number = index + 1;
    const valueFilled = course.value.trim() !== "";
    const creditsFilled = course.credits.trim() !== "";

    if (!valueFilled && !creditsFilled) {
      return;
    }

    let points: number | null = null;

    if (!valueFilled) {
      errors.push(
        system === "us"
          ? `Course ${number} grade is required.`
          : `Course ${number} percentage is required.`
      );
    } else if (system === "us") {
      const letter = course.value.trim().toUpperCase();
      const lookedUp: number | undefined = US_GRADE_POINTS[letter];
      if (lookedUp === undefined) {
        errors.push(
          `Course ${number} grade must be one of: ${Object.keys(US_GRADE_POINTS).join(", ")}.`
        );
      } else {
        points = lookedUp;
      }
    } else {
      const percent = requireNumber(
        course.value,
        `Course ${number} percentage`,
        GPA_LIMITS.percentage.min,
        GPA_LIMITS.percentage.max
      );
      if (percent.ok) {
        points = percent.value;
      } else {
        errors.push(percent.error);
      }
    }

    let credits: number | null = null;

    if (!creditsFilled) {
      errors.push(`Course ${number}: enter the credit hours.`);
    } else {
      const check = requireNumber(
        course.credits,
        `Course ${number} credit hours`,
        GPA_LIMITS.creditHours.min,
        GPA_LIMITS.creditHours.max
      );
      if (check.ok) {
        credits = check.value;
      } else {
        errors.push(check.error);
      }
    }

    if (points !== null && credits !== null) {
      weightedTotal += points * credits;
      totalCredits += credits;
      countedCourses += 1;
    }
  });

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  if (countedCourses === 0) {
    return {
      ok: false,
      errors: ["Enter at least one course with a grade and credit hours."],
    };
  }

  return {
    ok: true,
    result: {
      average: weightedTotal / totalCredits,
      totalCredits,
      system,
    },
  };
}