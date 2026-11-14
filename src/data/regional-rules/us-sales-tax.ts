// US state sales tax averages.
// Source: Tax Foundation, "2026 State and Local Sales Tax Rates" (data as of 1 January 2026,
// page updated 6 July 2026). Tax Foundation compiles these from the Sales Tax Clearinghouse
// and state revenue department websites.
// Spot-checked against state revenue department pages on 14 November 2026:
// California, Texas, Tennessee, and Louisiana.
// All figures are percentages. Local rates are population-weighted averages.

export type StateSalesTax = {
    code: string;
    name: string;
    stateRate: number;
    averageLocalRate: number;
    combinedRate: number;
  };
  
  export const US_SALES_TAX_SOURCE = {
    publisher: "Tax Foundation",
    title: "2026 State and Local Sales Tax Rates",
    url: "https://taxfoundation.org/data/all/state/sales-tax-rates/",
    dataAsOf: "2026-01-01",
    checkedOn: "2026-11-14",
    spotChecked: ["California", "Texas", "Tennessee", "Louisiana"],
  } as const;
  
  export const US_SALES_TAX_STATES: StateSalesTax[] = [
    { code: "AL", name: "Alabama", stateRate: 4.0, averageLocalRate: 5.46, combinedRate: 9.46 },
    { code: "AK", name: "Alaska", stateRate: 0.0, averageLocalRate: 1.82, combinedRate: 1.82 },
    { code: "AZ", name: "Arizona", stateRate: 5.6, averageLocalRate: 2.92, combinedRate: 8.52 },
    { code: "AR", name: "Arkansas", stateRate: 6.5, averageLocalRate: 2.96, combinedRate: 9.46 },
    { code: "CA", name: "California", stateRate: 7.25, averageLocalRate: 1.74, combinedRate: 8.99 },
    { code: "CO", name: "Colorado", stateRate: 2.9, averageLocalRate: 4.99, combinedRate: 7.89 },
    { code: "CT", name: "Connecticut", stateRate: 6.35, averageLocalRate: 0.0, combinedRate: 6.35 },
    { code: "DE", name: "Delaware", stateRate: 0.0, averageLocalRate: 0.0, combinedRate: 0.0 },
    { code: "DC", name: "District of Columbia", stateRate: 6.0, averageLocalRate: 0.0, combinedRate: 6.0 },
    { code: "FL", name: "Florida", stateRate: 6.0, averageLocalRate: 0.98, combinedRate: 6.98 },
    { code: "GA", name: "Georgia", stateRate: 4.0, averageLocalRate: 3.49, combinedRate: 7.49 },
    { code: "HI", name: "Hawaii", stateRate: 4.0, averageLocalRate: 0.5, combinedRate: 4.5 },
    { code: "ID", name: "Idaho", stateRate: 6.0, averageLocalRate: 0.03, combinedRate: 6.03 },
    { code: "IL", name: "Illinois", stateRate: 6.25, averageLocalRate: 2.71, combinedRate: 8.96 },
    { code: "IN", name: "Indiana", stateRate: 7.0, averageLocalRate: 0.0, combinedRate: 7.0 },
    { code: "IA", name: "Iowa", stateRate: 6.0, averageLocalRate: 0.94, combinedRate: 6.94 },
    { code: "KS", name: "Kansas", stateRate: 6.5, averageLocalRate: 2.19, combinedRate: 8.69 },
    { code: "KY", name: "Kentucky", stateRate: 6.0, averageLocalRate: 0.0, combinedRate: 6.0 },
    { code: "LA", name: "Louisiana", stateRate: 5.0, averageLocalRate: 5.11, combinedRate: 10.11 },
    { code: "ME", name: "Maine", stateRate: 5.5, averageLocalRate: 0.0, combinedRate: 5.5 },
    { code: "MD", name: "Maryland", stateRate: 6.0, averageLocalRate: 0.0, combinedRate: 6.0 },
    { code: "MA", name: "Massachusetts", stateRate: 6.25, averageLocalRate: 0.0, combinedRate: 6.25 },
    { code: "MI", name: "Michigan", stateRate: 6.0, averageLocalRate: 0.0, combinedRate: 6.0 },
    { code: "MN", name: "Minnesota", stateRate: 6.875, averageLocalRate: 1.26, combinedRate: 8.14 },
    { code: "MS", name: "Mississippi", stateRate: 7.0, averageLocalRate: 0.06, combinedRate: 7.06 },
    { code: "MO", name: "Missouri", stateRate: 4.225, averageLocalRate: 4.22, combinedRate: 8.44 },
    { code: "MT", name: "Montana", stateRate: 0.0, averageLocalRate: 0.0, combinedRate: 0.0 },
    { code: "NE", name: "Nebraska", stateRate: 5.5, averageLocalRate: 1.48, combinedRate: 6.98 },
    { code: "NV", name: "Nevada", stateRate: 6.85, averageLocalRate: 1.39, combinedRate: 8.24 },
    { code: "NH", name: "New Hampshire", stateRate: 0.0, averageLocalRate: 0.0, combinedRate: 0.0 },
    { code: "NJ", name: "New Jersey", stateRate: 6.625, averageLocalRate: -0.02, combinedRate: 6.6 },
    { code: "NM", name: "New Mexico", stateRate: 4.875, averageLocalRate: 2.79, combinedRate: 7.67 },
    { code: "NY", name: "New York", stateRate: 4.0, averageLocalRate: 4.54, combinedRate: 8.54 },
    { code: "NC", name: "North Carolina", stateRate: 4.75, averageLocalRate: 2.25, combinedRate: 7.0 },
    { code: "ND", name: "North Dakota", stateRate: 5.0, averageLocalRate: 2.09, combinedRate: 7.09 },
    { code: "OH", name: "Ohio", stateRate: 5.75, averageLocalRate: 1.54, combinedRate: 7.29 },
    { code: "OK", name: "Oklahoma", stateRate: 4.5, averageLocalRate: 4.56, combinedRate: 9.06 },
    { code: "OR", name: "Oregon", stateRate: 0.0, averageLocalRate: 0.0, combinedRate: 0.0 },
    { code: "PA", name: "Pennsylvania", stateRate: 6.0, averageLocalRate: 0.34, combinedRate: 6.34 },
    { code: "RI", name: "Rhode Island", stateRate: 7.0, averageLocalRate: 0.0, combinedRate: 7.0 },
    { code: "SC", name: "South Carolina", stateRate: 6.0, averageLocalRate: 1.49, combinedRate: 7.49 },
    { code: "SD", name: "South Dakota", stateRate: 4.2, averageLocalRate: 1.91, combinedRate: 6.11 },
    { code: "TN", name: "Tennessee", stateRate: 7.0, averageLocalRate: 2.61, combinedRate: 9.61 },
    { code: "TX", name: "Texas", stateRate: 6.25, averageLocalRate: 1.95, combinedRate: 8.2 },
    { code: "UT", name: "Utah", stateRate: 6.1, averageLocalRate: 1.32, combinedRate: 7.42 },
    { code: "VT", name: "Vermont", stateRate: 6.0, averageLocalRate: 0.39, combinedRate: 6.39 },
    { code: "VA", name: "Virginia", stateRate: 5.3, averageLocalRate: 0.47, combinedRate: 5.77 },
    { code: "WA", name: "Washington", stateRate: 6.5, averageLocalRate: 3.01, combinedRate: 9.51 },
    { code: "WV", name: "West Virginia", stateRate: 6.0, averageLocalRate: 0.59, combinedRate: 6.59 },
    { code: "WI", name: "Wisconsin", stateRate: 5.0, averageLocalRate: 0.72, combinedRate: 5.72 },
    { code: "WY", name: "Wyoming", stateRate: 4.0, averageLocalRate: 1.56, combinedRate: 5.56 },
  ];