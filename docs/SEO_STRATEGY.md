# SEO Strategy

This file sets the search engine rules for calc-hub. It follows the principle in the project plan: useful pages with real content, not many near-identical pages.

## Principles

- Each calculator has one clear purpose and one primary search intent.
- Every page explains the formula, the assumptions, and a worked example. No page is only a form.
- Titles and descriptions describe what the page does. No keyword stuffing.
- No fake ratings, reviews, prices, or claims.
- No pages created just to capture a keyword (for example, one page per city).

## Technical rules (already built into the site)

| Rule | How it is handled |
|---|---|
| Unique title and description per page | Set in each page's metadata |
| Canonical address on every page | Set in each page's metadata |
| Sitemap listing public pages | `src/app/sitemap.ts`. Each new calculator must be added here. |
| Robots file pointing to the sitemap | `src/app/robots.ts` |
| Clean addresses | Calculator pages use `/calculators/<slug>` |
| Missing pages return a 404 | Configured in `wrangler.jsonc` |
| Lighthouse checks | Run on each new calculator before publishing; target 90 or above in each category |

## Rules for each calculator page

1. **Title:** "[Calculator name] | calc-hub" (the template adds the site name).
2. **Description:** one or two sentences stating what the calculator does and for whom. Under about 160 characters.
3. **Page order:** short introduction, calculator form, result, formula explanation, worked example, assumptions and limits, FAQ, related calculators, rate check date where applicable.
4. **Structured data:** only a valid breadcrumb trail. No FAQ rich-result markup unless Google's current rules are checked and confirmed first.
5. **Internal links:** each calculator links to its related calculators and to the Methodology page.

## Sitemap rule

Each new calculator page is added to `src/app/sitemap.ts` when it is published, and only then. Unpublished calculators are not listed.

## Things we will not do

- Generate pages for cities, provinces, or states merely to capture search terms.
- Publish calculators without a verified formula.
- Claim a ranking, traffic, or rich result that has not been observed in Search Console.

## Measurement

After launch, and once the site is verified in Google Search Console (free), we will record impressions, clicks, and indexing status here, with dates. Until then, no performance claim is made.

## Review

Reviewed before each calculator is published, and after each rate update.