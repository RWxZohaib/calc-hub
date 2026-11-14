// Canadian sales tax rates by province and territory.
// Federal GST: Canada Revenue Agency, "Which rate to charge" (canada.ca).
// Provincial rates: Nova Scotia (HST 14%), British Columbia (PST 7%), Saskatchewan (PST 6%, bulletin PST-5),
// Manitoba (RST 7%), and Quebec (QST 9.975%, Revenu Québec).
// Each provincial tax is calculated on the price before GST, not on a GST-inclusive amount.
// Checked on 14 November 2026.

export type TaxComponent = {
    label: "GST" | "HST" | "PST" | "RST" | "QST";
    rate: number; // percent
  };
  
  export type ProvinceTax = {
    code: string;
    name: string;
    components: TaxComponent[];
  };
  
  export const CANADA_SALES_TAX_SOURCE = {
    publisher: "Canada Revenue Agency and provincial governments",
    federalPage: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate/calculator.html",
    checkedOn: "2026-11-14",
  } as const;
  
  export const CANADA_SALES_TAX_PROVINCES: ProvinceTax[] = [
    { code: "AB", name: "Alberta", components: [{ label: "GST", rate: 5 }] },
    { code: "BC", name: "British Columbia", components: [{ label: "GST", rate: 5 }, { label: "PST", rate: 7 }] },
    { code: "MB", name: "Manitoba", components: [{ label: "GST", rate: 5 }, { label: "RST", rate: 7 }] },
    { code: "NB", name: "New Brunswick", components: [{ label: "HST", rate: 15 }] },
    { code: "NL", name: "Newfoundland and Labrador", components: [{ label: "HST", rate: 15 }] },
    { code: "NS", name: "Nova Scotia", components: [{ label: "HST", rate: 14 }] },
    { code: "NT", name: "Northwest Territories", components: [{ label: "GST", rate: 5 }] },
    { code: "NU", name: "Nunavut", components: [{ label: "GST", rate: 5 }] },
    { code: "ON", name: "Ontario", components: [{ label: "HST", rate: 13 }] },
    { code: "PE", name: "Prince Edward Island", components: [{ label: "HST", rate: 15 }] },
    { code: "QC", name: "Quebec", components: [{ label: "GST", rate: 5 }, { label: "QST", rate: 9.975 }] },
    { code: "SK", name: "Saskatchewan", components: [{ label: "GST", rate: 5 }, { label: "PST", rate: 6 }] },
    { code: "YT", name: "Yukon", components: [{ label: "GST", rate: 5 }] },
  ];