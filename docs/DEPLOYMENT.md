# Deployment

This file records how the site is published and the checks made before and after each release.

## Hosting

- **Provider:** Cloudflare Workers, using static assets (free plan)
- **Worker name:** `calc-hub`
- **Live address:** `https://calc-hub.mzohaib15009.workers.dev`
- **Custom domain:** None. Not purchased, and not planned until the owner decides.
- **Source:** GitHub repository `RWxZohaib/calc-hub`, branch `main`. Each push to `main` triggers an automatic build and deployment.

## Why Workers and not Pages

Cloudflare directs new projects to Workers. The legacy Pages route was available, but Cloudflare has announced that Pages is being phased out. Workers with static assets serves static files free of charge, so the owner chose it on 14 November 2026.

## Configuration

The file `wrangler.jsonc` in the project root tells Cloudflare what to publish:

- `name`: `calc-hub`
- `assets.directory`: `./out` (the folder created by `npm run build`)
- `assets.not_found_handling`: `404-page` (unknown addresses show our 404 page)

## Build settings used in Cloudflare

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` (default) |
| Root directory | `/` |
| Production branch | `main` |
| Node.js version | 24, from `.node-version` |

## Free-plan checks (completed 14 November 2026)

| Check | Result |
|---|---|
| Account plan | Workers Free |
| Payment method on file | None |
| Paid subscription | None |
| Payment, upgrade, or billing prompt during setup | None appeared |
| Workers Builds free allowance | 3,000 build minutes per month, 1 concurrent build (Cloudflare's published limit). The build used a small fraction of this. |
| Static-asset files | About 25 files, well under the free plan limit of 20,000 |

## Deployment history

| Date | Event |
|---|---|
| 14 November 2026 | First deployment to Workers, from commit `45f0da8` (configuration file) |
| 14 November 2026 | Address corrected in `src/data/site.ts` to match the live Workers address |
| 14 November 2026 | `not_found_handling` field name corrected (`not_handling` was a typo) |
| 14 November 2026 | Privacy Policy cookie statement finalised; hosting wording corrected to "Cloudflare Workers" |

## Post-deployment checks (completed 14 November 2026)

| Check | Result |
|---|---|
| All seven pages load on the live address | Passed |
| `/sitemap.xml` lists six pages, all with the live address | Passed |
| `/robots.txt` shows the sitemap line with the live address | Passed |
| `/does-not-exist` shows our 404 page with header and footer | Passed (after configuration fix) |
| Live Lighthouse, mobile, Incognito | Performance 96, Accessibility 100, Best Practices 100, SEO 100 |
| Web Analytics status | Not enabled. Workers Logs and Workers Traces also disabled. Recorded as observed. |
| Cookies on the live site (homepage and About) | None set at the time of the check |

## Rule for future deployments

If any future step requires payment, a plan upgrade, or a billing setting, deployment stops and the owner is asked before continuing.