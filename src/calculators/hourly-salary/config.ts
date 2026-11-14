import type { CalculatorDefinition } from "../types";

export const hourlySalaryConfig: CalculatorDefinition = {
  slug: "hourly-to-annual-salary",
  name: "Hourly to Annual Salary Calculator",
  summary:
    "Convert an hourly pay rate into weekly, biweekly, monthly, and annual gross pay.",
  category: "business-tax",
  countries: ["us", "ca"],
  relatedSlugs: ["us-sales-tax", "canada-sales-tax"],
  formulaSteps: [
    "Weekly pay = hourly rate × hours per week.",
    "Biweekly pay = weekly pay × 2.",
    "Annual pay = weekly pay × weeks worked per year.",
    "Monthly pay = annual pay ÷ 12.",
  ],
  workedExample:
    "A worker earning $25.00 an hour, working 40 hours a week for 52 weeks, earns $1,000.00 a week, $2,000.00 every two weeks, about $4,333.33 a month, and $52,000.00 a year, before tax and deductions.",
  limitations: [
    "Results are gross: they are before income tax, pension, insurance, and other deductions.",
    "Overtime is not included unless you add the extra hours to your weekly total.",
    "Enter amounts in US dollars or Canadian dollars. The calculator does not convert between them.",
    "Unpaid leave or holidays are not deducted automatically. Adjust the weeks per year if needed.",
  ],
  faqs: [
    {
      question: "Is this the amount I take home?",
      answer:
        "No. The figures are gross pay. Your take-home pay is lower after tax and deductions, which vary by country, region, and personal circumstances.",
    },
    {
      question: "How many weeks should I enter?",
      answer:
        "The default is 52. If you take unpaid weeks off, enter the number of weeks you expect to work.",
    },
    {
      question: "Does this work for both the US and Canada?",
      answer:
        "Yes, the arithmetic is the same in both countries. Use the currency you are paid in, because the calculator does not convert currencies.",
    },
  ],
  lastChecked: "2026-11-14",
};