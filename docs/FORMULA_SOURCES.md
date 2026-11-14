# Formula Sources

Every formula, constant, and rate used by a calculator is listed here with its source and verification status. A calculator is not published until every item it uses is marked **Verified**.

Status key: **Verified** = checked against a named source on the date shown. **Pending** = not yet checked; the calculator stays unpublished until it is.

## Fuel Cost Calculator

| Item | Formula or value | Source | Status (checked 14 November 2026) |
|---|---|---|---|
| 1 US gallon in litres | 3.785411784 (exact) | NIST SP 811 (US National Institute of Standards and Technology), as quoted in NIST-based reference tables | Verified |
| 1 mile in kilometres | 1.609344 (exact) | NIST SP 811 | Verified |
| Litres per 100 km from US mpg | 235.214583 ÷ mpg | Derived: 100 km × 3.785411784 L ÷ 1.609344 km per mile, divided by mpg | Verified (derived from the two constants above) |
| Litres per 100 km from km per litre | 100 ÷ (km per litre) | Definition of the unit | Verified |
| Fuel used (litres) | (distance in km ÷ 100) × litres per 100 km | Definition | Verified |
| Fuel cost | fuel used × price per litre (or price per gallon × gallons used) | Arithmetic | Verified |

## Hourly to Annual Salary Calculator

| Item | Formula | Source | Status |
|---|---|---|---|
| Weekly pay | hourly rate × hours per week | Arithmetic | Verified |
| Annual pay | weekly pay × weeks per year | Arithmetic. Default is 52 weeks; the user may change it. | Verified |
| Monthly pay | annual pay ÷ 12 | Arithmetic | Verified |
| Biweekly pay | weekly pay × 2 | Arithmetic | Verified |

Limit stated on the page: results are **gross** (before tax and deductions). Overtime is not included unless entered as extra hours.

## GPA Calculator

| Item | Formula | Source | Status |
|---|---|---|---|
| US letter grade to grade points | Standard 4.0 scale (A = 4.0, B = 3.0, etc.) | Pending: to be checked against a published university registrar scale | Pending |
| Weighted GPA | sum of (grade points × credit hours) ÷ total credit hours | Arithmetic | Verified |
| Canadian percentage average | sum of (percentage × credit weight) ÷ total weight | Arithmetic | Verified |
| Canadian percentage to GPA | Not used. Conversion varies by school and province, so the calculator will not convert automatically. | Pending school policy research | Not implemented by design |

## US Sales Tax Calculator

| Item | Source | Status (checked 14 November 2026) |
|---|---|---|
| State combined average rates (all 50 states and DC) | Tax Foundation, "2026 State and Local Sales Tax Rates," data as of 1 January 2026, page updated 6 July 2026. Compiled from the Sales Tax Clearinghouse and state revenue department websites. https://taxfoundation.org/data/all/state/sales-tax-rates/ | Verified against the source; spot-checked (see below) |
| Spot check: California | CDTFA (California state tax board): statewide base rate 7.25% | Verified (official) |
| Spot check: Texas | Texas Comptroller: state rate 6.25%, local cap 2%, maximum combined 8.25% | Verified (official) |
| Spot check: Tennessee | Tennessee Department of Revenue, rule SUT-13: state rate 7%, food 4%; local option up to 2.75% | Verified (official) |
| Spot check: Louisiana | Louisiana Department of Revenue, sales tax reform FAQ: state rate 5% from 1 January 2025 through 31 December 2029 | Verified (official) |
| Remaining states (46 not spot-checked) | Tax Foundation table, cross-checked with state revenue sources as compiled by Tax Foundation | Secondary source; not individually checked against each state's revenue department |
| Tax calculation: add tax | tax = price × combined rate; total = price + tax | Verified (arithmetic) |
| Tax calculation: remove tax | price before tax = total ÷ (1 + combined rate); tax = total − price before tax | Verified (arithmetic) |
| Rounding | Tax and totals are rounded to the nearest cent, half-cents up | Verified (rounding rule in shared helper, tested) |

**Limits the page must state:**
- Figures are state averages. Local rates vary by city, county, and address, and may be higher or lower than the average shown.
- Tennessee and other states may tax some items, such as food, at reduced rates. The calculator applies the combined rate to the full amount.
- Some items are exempt in some states (for example, many states exempt groceries or prescription medicines). The calculator does not know what you are buying.
- Rates change, usually on 1 January or 1 July. The date of the source data is shown on the page.


## Canada GST/HST/PST Calculator

| Item | Source | Status (checked 14 November 2026) |
|---|---|---|
| Federal GST (5%) | Canada Revenue Agency, "Which rate to charge" (canada.ca) | Verified (official) |
| Ontario HST 13% | CRA, "Which rate to charge" | Verified (official) |
| New Brunswick, Newfoundland and Labrador, PEI HST 15% | CRA, "Which rate to charge" | Verified (official) |
| Nova Scotia HST 14% (from 1 April 2025) | Nova Scotia government tax notice, "Nova Scotia HST reduces from 15% to 14%" (notices.novascotia.ca) | Verified (official) |
| British Columbia PST 7% | BC government, Provincial Sales Tax pages (gov.bc.ca) | Verified (official) |
| Saskatchewan PST 6% | Saskatchewan Information Bulletin PST-5, Registration and Reporting Requirements (revised July 2025) | Verified (official) |
| Manitoba RST 7% | Manitoba Finance, Retail Sales Tax page (gov.mb.ca) | Verified (official) |
| Quebec QST 9.975% | Revenu Québec, "Calculating the taxes" guidance | Verified (official) |
| Alberta, Yukon, Northwest Territories, Nunavut: GST only, 5% | CRA, "Which rate to charge" | Verified (official) |
| Method: each provincial tax is calculated on the price before GST | Revenu Québec guidance (QST); the same method applies to PST and RST | Verified (official) |
| Tax calculation: add tax | Each tax component = price × its rate, rounded to the nearest cent; total = price + all components | Verified (arithmetic and rounding rule, tested) |
| Tax calculation: remove tax | Price before tax = total ÷ (1 + sum of all rates), rounded to the cent; each component worked out from that price | Verified (arithmetic, tested) |
| Rounding | Each tax is rounded separately, half-cents upward, following CRA's rule that each tax is rounded to the nearest cent | Verified (CRA guidance; rounding rule in shared helper, tested) |

**Limits the page must state:**
- Rates apply to most taxable goods and services. Some items are zero-rated, exempt, or taxed differently. Examples include basic groceries in most provinces, prescription drugs, and some services.
- Vehicles and some other items have different PST or RST rules (for example, BC charges graduated rates on private vehicles). The calculator does not cover them.
- Rates were checked on 14 November 2026. Provinces can change their rates, so check the date shown on the page.
- In remove mode, the calculator works backward from the total using the combined rate. Rounding may make the individual amounts differ from a receipt by one cent.



## Date of last full review

14 November 2026