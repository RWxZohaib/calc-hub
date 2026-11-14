"use client";

import { useState, type FormEvent } from "react";
import {
  calculateGpa,
  GPA_LIMITS,
  US_GRADE_POINTS,
  type CourseEntry,
  type GpaOutcome,
  type GpaSystem,
} from "@/calculators/gpa/calculate";

const ROW_COUNT = 6;

function emptyRows(): CourseEntry[] {
  return Array.from({ length: ROW_COUNT }, () => ({ value: "", credits: "" }));
}

export default function GpaForm() {
  const [system, setSystem] = useState<GpaSystem>("us");
  const [courses, setCourses] = useState<CourseEntry[]>(emptyRows);
  const [outcome, setOutcome] = useState<GpaOutcome | null>(null);

  function updateCourse(index: number, field: keyof CourseEntry, newValue: string) {
    setCourses((previous) =>
      previous.map((row, i) => (i === index ? { ...row, [field]: newValue } : row))
    );
  }

  function handleSystemChange(next: GpaSystem) {
    setSystem(next);
    setCourses(emptyRows());
    setOutcome(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOutcome(calculateGpa(system, courses));
  }

  function handleReset() {
    setSystem("us");
    setCourses(emptyRows());
    setOutcome(null);
  }

  const inputClass =
    "mt-1 w-full rounded-md border border-[var(--color-line)] bg-white px-3 py-2 text-[var(--color-ink)] focus:border-[var(--color-brand)]";
  const labelClass = "block text-sm font-semibold text-[var(--color-ink)]";

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div>
          <label htmlFor="gpa-system" className={labelClass}>
            Grading system
          </label>
          <select
            id="gpa-system"
            value={system}
            onChange={(e) => handleSystemChange(e.target.value as GpaSystem)}
            className={inputClass}
          >
            <option value="us">US letter grades (4.0 scale)</option>
            <option value="ca">Canadian percentages</option>
          </select>
          <p className="mt-1 text-xs text-[var(--color-muted)]">
            Enter up to {ROW_COUNT} courses. Leave unused rows blank.
          </p>
        </div>

        <div className="space-y-3">
          <div className="hidden gap-4 text-sm font-semibold text-[var(--color-ink)] sm:grid sm:grid-cols-[6rem_1fr_1fr]">
            <span>Course</span>
            <span>{system === "us" ? "Grade" : "Percentage"}</span>
            <span>Credit hours</span>
          </div>

          {courses.map((row, index) => {
            const number = index + 1;
            return (
              <div
                key={number}
                className="grid gap-3 sm:grid-cols-[6rem_1fr_1fr] sm:items-end sm:gap-4"
              >
                <p className="text-sm font-semibold text-[var(--color-ink)] sm:pb-2">
                  Course {number}
                </p>

                <div>
                  <label htmlFor={`grade-${number}`} className="sr-only">
                    Course {number} {system === "us" ? "grade" : "percentage"}
                  </label>
                  {system === "us" ? (
                    <select
                      id={`grade-${number}`}
                      value={row.value}
                      onChange={(e) => updateCourse(index, "value", e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Choose</option>
                      {Object.keys(US_GRADE_POINTS).map((letter) => (
                        <option key={letter} value={letter}>
                          {letter}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={`grade-${number}`}
                      type="text"
                      inputMode="decimal"
                      value={row.value}
                      onChange={(e) => updateCourse(index, "value", e.target.value)}
                      placeholder="0 to 100"
                      className={inputClass}
                    />
                  )}
                </div>

                <div>
                  <label htmlFor={`credits-${number}`} className="sr-only">
                    Course {number} credit hours
                  </label>
                  <input
                    id={`credits-${number}`}
                    type="text"
                    inputMode="decimal"
                    value={row.credits}
                    onChange={(e) => updateCourse(index, "credits", e.target.value)}
                    placeholder={`${GPA_LIMITS.creditHours.min} to ${GPA_LIMITS.creditHours.max}`}
                    className={inputClass}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-3">
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
            aria-labelledby="gpa-result-heading"
            className="rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-6"
          >
            <h2
              id="gpa-result-heading"
              className="text-xl font-semibold text-[var(--color-ink)]"
            >
              {outcome.result.system === "us"
                ? "Your grade point average (4.0 scale)"
                : "Your average percentage"}
            </h2>
            <p className="mt-4 text-3xl font-bold text-[var(--color-ink)]">
              {outcome.result.system === "us"
                ? outcome.result.average.toFixed(2)
                : `${outcome.result.average.toFixed(2)}%`}
            </p>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              Total credit hours: {outcome.result.totalCredits}
            </p>
            <p className="mt-4 text-sm text-[var(--color-muted)]">
              {outcome.result.system === "us"
                ? "This uses the standard 4.0 scale. Some schools use different values (for example, A+ may be 4.3), and some use weighted scales for honours or AP courses. Check your school's rules."
                : "This is a weighted percentage average. It is not converted to a GPA, because Canadian schools use different conversion scales."}
            </p>
          </section>
        ) : null}
      </div>
    </div>
  );
}