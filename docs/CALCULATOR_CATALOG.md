# Calculator Catalogue

The five calculators approved for Phase 2, in the order they will be built. Each one moves from **Planned** to **Built** to **Published** only when its formula sources are verified and its tests pass.

Build order is chosen by risk: the simplest calculator with no external data comes first, and the two tax calculators come last, because they depend on rate checks.

| # | Calculator | Country | Needs external data | Status | Main limit shown on the page |
|---|---|---|---|---|---|
| 1 | Hourly to Annual Salary | USA and Canada | No | Planned | Gross pay only. No tax or deductions. |
| 2 | Fuel Cost | USA and Canada | No (fuel price is entered by the user) | Planned | Uses the price and efficiency the user enters. Real fuel cost varies. |
| 3 | GPA | USA and Canada | Scale to verify (US standard scale) | Planned | US 4.0 scale; Canadian mode averages percentages and does not convert to GPA. School rules may differ. |
| 4 | US Sales Tax | USA | Yes: state average rates | Planned | State average only. Local rates vary by city, county, and address. |
| 5 | Canada GST/HST/PST | Canada | Yes: provincial rates | Planned | Rates as of the check date shown. Confirm the rate for your situation. |

## Category placement

- Business and Tax: Hourly to Annual Salary, US Sales Tax, Canada GST/HST/PST
- Everyday and Conversions: Fuel Cost
- Math and Education: GPA

## Rules for every calculator

- Formula and sources recorded in `FORMULA_SOURCES.md`, with every item marked Verified.
- Automated tests for normal, boundary, invalid, decimal, and rounding cases (Vitest, `npm test`).
- Result explains what it includes and excludes.
- Worked example and FAQ on the page.
- Related calculators linked.
- Page metadata and sitemap entry added.
- Privacy Policy checked for accuracy before publishing.
- Owner approves publication.

## Estimate labels

Any result that depends on averages, location, or user-entered values is labelled as an estimate on the page.