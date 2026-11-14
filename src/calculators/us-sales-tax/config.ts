import type { CalculatorDefinition } from "../types";

export const usSalesTaxConfig: CalculatorDefinition = {
  slug: "us-sales-tax",
  name: "US Sales Tax Calculator",
  summary:
    "Estimate the sales tax on a purchase in any US state, or find the price before tax from a total.",
  category: "business-tax",
  countries: ["us"],
  relatedSlugs: ["canada-sales-tax", "hourly-to-annual-salary"],
  formulaSteps: [
    "Add tax: sales tax = price × the state's average combined rate. Total = price + sales tax.",
    "Remove tax: price before tax = total ÷ (1 + the state's average combined rate). Sales tax = total − price before tax.",
    "Each amount is rounded to the nearest cent.",
    "The combined rate is the state rate plus the average local rate across the state, weighted by population.",
  ],
  workedExample:
    "A $100.00 purchase in Texas, where the average combined rate is 8.20%, has $8.20 of sales tax and a total of $108.20. In reverse, a $108.20 total in Texas gives a price before tax of $100.00.",
  limitations: [
    "These are state averages. Local rates differ by city, county, and address, so your actual rate may be higher or lower.",
    "Rates come from the Tax Foundation's 2026 table, dated 1 January 2026. Four states (California, Texas, Tennessee, and Louisiana) were checked against their own revenue departments. Confirm your rate with your state's revenue department.",
    "Some items are taxed at reduced rates or are exempt, such as groceries or prescription medicine in many states. The calculator applies the full combined rate to the amount you enter.",
    "Delivery, shipping, and service charges may be taxed differently. Enter only the amount you want taxed.",
    "Rates change, usually on 1 January or 1 July. Check the date shown on the page.",
  ],
  faqs: [
    {
      question: "Why is my tax different from this estimate?",
      answer:
        "This calculator uses the state's average combined rate. Your city, county, or special district may have a different rate, and some purchases are taxed differently or exempt.",
    },
    {
      question: "What if the state I need is not listed?",
      answer:
        "Every state with a sales tax is listed, along with the District of Columbia. Five states have no statewide sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon. Alaska allows local sales taxes, which are included in its average.",
    },
    {
      question: "How do I find the price before tax from a receipt?",
      answer:
        "Choose the option to find the price before tax, select the state, and enter the total you paid. The calculator shows the price before tax and the tax included in the total.",
    },
    {
      question: "Does this apply to online purchases?",
      answer:
        "The rate used depends on the rules for the buyer's location and the seller. This calculator does not decide which rule applies to your purchase. Check with the seller or your state's revenue department.",
    },
  ],
  lastChecked: "2026-11-14",
};