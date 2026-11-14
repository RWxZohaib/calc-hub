import type { CalculatorDefinition } from "../types";

export const canadaSalesTaxConfig: CalculatorDefinition = {
  slug: "canada-sales-tax",
  name: "Canada GST, HST, and PST Calculator",
  summary:
    "Work out GST, HST, PST, RST, and QST for any province or territory, or find the price before tax from a total.",
  category: "business-tax",
  countries: ["ca"],
  relatedSlugs: ["us-sales-tax", "hourly-to-annual-salary"],
  formulaSteps: [
    "Each tax is worked out on the price before tax. Tax = price × that tax's rate.",
    "Ontario and the Atlantic provinces charge one combined HST. Provinces with separate taxes (for example British Columbia, Saskatchewan, Manitoba, and Quebec) charge GST and a provincial tax, each on the same price.",
    "Each tax is rounded to the nearest cent. The total is the price plus all the taxes.",
    "To find the price before tax from a total, the calculator divides the total by 1 plus the combined rate, then works out each tax from that price.",
  ],
  workedExample:
    "A $100.00 purchase in British Columbia has GST of $5.00 (5%) and PST of $7.00 (7%), so the total is $112.00. In Quebec, the GST is $5.00 and the QST is $9.98 (9.975% of $100.00, rounded to the cent), so the total is $114.98.",
  limitations: [
    "Rates apply to most taxable goods and services. Many items are zero-rated, exempt, or taxed differently, such as basic groceries and prescription drugs in most provinces.",
    "Vehicles and some other items have their own PST or RST rules. For example, British Columbia charges graduated rates on private vehicles. The calculator does not cover these.",
    "Each tax is rounded separately, so the total may differ from a receipt by one cent.",
    "Rates were checked on 14 November 2026. Provinces can change their rates, so check the date shown on the page.",
  ],
  faqs: [
    {
      question: "Why does Quebec's tax look different from other provinces?",
      answer:
        "Quebec charges GST at 5% and its own Quebec Sales Tax (QST) at 9.975%, both worked out on the price before tax. The combined rate is 14.975%. Quebec's taxes are collected by Revenu Québec rather than the CRA.",
    },
    {
      question: "What is the difference between HST and GST plus PST?",
      answer:
        "HST is a single tax that combines the federal GST with a provincial portion. In provinces with GST plus PST or RST, the two taxes appear as separate lines on a receipt, and each is worked out on the same price.",
    },
    {
      question: "Why is Alberta 5%?",
      answer:
        "Alberta has no provincial sales tax, so only the 5% federal GST applies. Yukon, the Northwest Territories, and Nunavut also charge only GST.",
    },
    {
      question: "Does this apply to online purchases?",
      answer:
        "The calculator uses the rate for the province you choose. Which province's tax applies to an online purchase depends on where the buyer is and on the seller's registration. Check with the seller or the relevant tax authority.",
    },
  ],
  lastChecked: "2026-11-14",
};