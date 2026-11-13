# Deployment

This file records how the site is published and the checks made before and after each release.

## Hosting

- **Provider:** Cloudflare Pages (free plan)
- **Account plan observed:** Workers Free, with no payment method and no paid subscription (checked 14 November 2026)
- **Address:** `https://calc-hub.pages.dev` (free subdomain; to be confirmed when the project is created)
- **Custom domain:** None. Not purchased, and not planned until the owner decides.

## Settings to use when creating the Pages project

| Setting | Value |
|---|---|
| Framework preset | Next.js (Static HTML Export) |
| Production branch | `main` |
| Build command | `npx next build` |
| Build output directory | `out` |
| Node.js version | 24, from `.node-version` |

## Pre-deployment checks

| Check | Status |
|---|---|
| Pages project can be created on the Free plan (no paid step or prompt) | Pending |
| Next.js (Static HTML Export) preset available on the Free plan | Pending |
| No payment method or paid add-on requested | Pending |
| Code committed to GitHub `main` branch | Pending |

If any pre-deployment check requires payment, deployment stops, and the owner is asked before continuing.

## Post-deployment checks

| Check | Status |
|---|---|
| All seven pages load on the `pages.dev` address | Pending |
| `/sitemap.xml` and `/robots.txt` open correctly | Pending |
| 404 page loads for a missing address | Pending |
| Live Lighthouse mobile scores recorded | Pending |
| Web Analytics status in Pages settings: recorded as observed (not assumed) | Pending |
| Browser cookies on the live site: recorded, and the Privacy Policy cookie sentence updated to match | Pending |

## Log

| Date | Event |
|---|---|
| 14 November 2026 | Local checks completed. Deployment not yet started. |