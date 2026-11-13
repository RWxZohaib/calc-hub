import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export const dynamic = "force-static";

const pagePaths = ["", "/about", "/contact", "/privacy", "/terms", "/methodology"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pagePaths.map((path) => ({
    url: `${siteConfig.baseUrl}${path}`,
    lastModified: new Date("2026-11-13"),
  }));
}