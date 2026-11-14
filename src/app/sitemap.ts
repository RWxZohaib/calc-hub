import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { calculators } from "@/calculators/registry";

export const dynamic = "force-static";

const pagePaths = [
  "",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/methodology",
  "/calculators",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const calculatorPaths = calculators.map((calculator) => `/calculators/${calculator.slug}`);

  return [...pagePaths, ...calculatorPaths].map((path) => ({
    url: `${siteConfig.baseUrl}${path}`,
    lastModified: new Date("2026-11-14"),
  }));
}