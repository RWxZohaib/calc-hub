export type CountryCode = "us" | "ca";

export type CategorySlug = "business-tax" | "everyday" | "math-education";

export type CalculatorDefinition = {
  slug: string;
  name: string;
  summary: string;
  category: CategorySlug;
  countries: CountryCode[];
  relatedSlugs?: string[];
  formulaSteps: string[];
  workedExample: string;
  limitations: string[];
  faqs: { question: string; answer: string }[];
  lastChecked?: string;
};