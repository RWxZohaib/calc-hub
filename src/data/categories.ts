import type { CategorySlug } from "../calculators/types";

export const CATEGORIES: { slug: CategorySlug; name: string; description: string }[] = [
  {
    slug: "business-tax",
    name: "Business and Tax",
    description: "Pay, sales tax, and GST, HST, PST calculators for US and Canadian users.",
  },
  {
    slug: "everyday",
    name: "Everyday and Conversions",
    description: "Practical calculators for trips, budgets, and everyday planning.",
  },
  {
    slug: "math-education",
    name: "Math and Education",
    description: "Grade and average calculators for students.",
  },
];