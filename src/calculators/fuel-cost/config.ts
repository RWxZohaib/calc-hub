import type { CalculatorDefinition } from "../types";

export const fuelCostConfig: CalculatorDefinition = {
  slug: "fuel-cost",
  name: "Fuel Cost Calculator",
  summary:
    "Estimate the fuel needed and the cost of a trip, using US miles and gallons or Canadian kilometres and litres.",
  category: "everyday",
  countries: ["us", "ca"],
  relatedSlugs: ["hourly-to-annual-salary"],
  formulaSteps: [
    "US: gallons used = miles ÷ miles per gallon (mpg). Cost = gallons used × price per gallon.",
    "Canada: litres used = (kilometres ÷ 100) × litres per 100 km. Cost = litres used × price per litre.",
    "The two systems use their own units. The calculator never converts miles to kilometres or gallons to litres.",
  ],
  workedExample:
    "A US trip of 300 miles in a car that does 30 miles per gallon, with petrol at $4.00 a gallon, uses 10 gallons and costs $40.00. A Canadian trip of 100 km in a car that uses 6 litres per 100 km, with petrol at $1.50 a litre, uses 6 litres and costs $9.00.",
  limitations: [
    "Fuel economy varies with speed, traffic, weather, load, tyre pressure, and driving style. Enter the figure you expect for your trip.",
    "Fuel price is the one you enter. Prices change, and the calculator does not look them up.",
    "The result covers fuel only. It does not include tolls, parking, maintenance, or the cost of wear on the vehicle.",
    "Round trips must be entered as the total distance travelled.",
  ],
  faqs: [
    {
      question: "Where do I find my fuel economy?",
      answer:
        "Check your vehicle's manual or the fuel economy label. Many cars also show average consumption on the trip computer. In the US it is given in miles per gallon (mpg). In Canada it is usually given in litres per 100 km (L/100 km).",
    },
    {
      question: "What if my car shows km per litre instead?",
      answer:
        "Divide 100 by the km per litre figure to get L/100 km. For example, 12.5 km per litre is 8 litres per 100 km.",
    },
    {
      question: "Why do the US and Canadian versions use different units?",
      answer:
        "The US normally measures distance in miles and fuel in US gallons. Canada normally measures distance in kilometres and fuel in litres. Each version uses the units its users see on their vehicles and at the pump.",
    },
  ],
  lastChecked: "2026-11-14",
};