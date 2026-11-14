# Testing

This file records the checks performed on the project and their results. Each new check is added here with its date.

## Automated checks

| Check | Command | Result | Date |
|---|---|---|---|
| Code checking (lint) | `npm run lint` | Passed, no issues | 14 November 2026 |
| Unit tests | `npm test` | Passed. No test files exist yet, so the command exits cleanly. Calculation tests start in Phase 2. | 14 November 2026 |
| Production build | `npm run build` | Passed. Nine routes built: `/`, `/about`, `/contact`, `/privacy`, `/terms`, `/methodology`, `/_not-found`, `/sitemap.xml`, `/robots.txt` | 14 November 2026 |

## Layout and accessibility checks

| Check | Result | Date |
|---|---|---|
| Layout at 390 pixels and 360 pixels wide (phone sizes) | Passed. No sideways scrolling, header and footer fit. | 14 November 2026 |
| Keyboard: skip link appears on first Tab press and jumps to main content | Passed | 14 November 2026 |
| Keyboard: visible focus outline on links | Passed | 14 November 2026 |
| Browser console on all seven pages | No red errors | 14 November 2026 |

## Lighthouse (mobile, Incognito window, homepage on production build)

| Category | Score | Target | Result |
|---|---|---|---|
| Accessibility | 100 | 90+ | Passed |
| SEO | 100 | 90+ | Passed |
| Best Practices | 96 | 90+ | Passed |
| Performance | 92 | 90+ | Passed |

Notes on Performance:
- The first Lighthouse run scored 76. Browser extensions were affecting that run, so it was repeated in an Incognito window.
- Remaining diagnostics (main-thread work, unused JavaScript, and long tasks) come mostly from the framework's JavaScript on a simulated slow phone. They will be re-checked on the live site after deployment.

## Other checks

| Check | Result | Date |
|---|---|---|
| `/sitemap.xml` lists the six public pages | Passed | 14 November 2026 |
| `/robots.txt` allows crawling and points to the sitemap | Passed | 14 November 2026 |
| Trailing-slash address (`/about/`) loads | Passed | 14 November 2026 |
| All header, footer, and in-page links open their pages | Passed | 14 November 2026 |
| Contact page contains no form and no personal email | Confirmed by review | 14 November 2026 |

## Live site checks (Cloudflare Workers, 14 November 2026)

| Check | Result |
|---|---|
| All seven pages load on `https://calc-hub.mzohaib15009.workers.dev` | Passed |
| Header and footer links open their pages | Passed |
| `/sitemap.xml` lists six pages with the live address | Passed |
| `/robots.txt` allows crawling and gives the sitemap line | Passed |
| Missing address (`/does-not-exist`) shows the 404 page | Passed (after fixing a configuration field name) |
| Live Lighthouse, mobile, Incognito | Performance 96, Accessibility 100, Best Practices 100, SEO 100 |
| Web Analytics status | Not enabled (recorded as observed, not assumed) |
| Workers Logs and Workers Traces | Disabled |
| Cookies on the homepage and About page | None set at the time of the check |
| Privacy Policy shows Cloudflare Workers (not Pages) and the 14 November 2026 date | Passed |

## Issues found and fixed during deployment

| Issue | Fix |
|---|---|
| Sitemap build error ("output: export" needs a static route setting) | Added `dynamic = "force-static"` to `sitemap.ts` and `robots.ts` |
| Contact page missing from build (file saved in the wrong folder) | Created the `contact` folder and page |
| Local warning about the project root (a file in the home folder) | Set `turbopack.root` to the project folder |
| Missing-page address showed the browser's default error | Corrected `not_found_handling` (typo: `not_handling`) |
| Privacy Policy said "Cloudflare Pages" after the move to Workers | Corrected to "Cloudflare Workers" |
| Initial Lighthouse Performance 76 (browser extensions affected the test) | Re-run in Incognito: 92. Live site: 96. |- Canada GST, HST, and PST Network check (after pressing Calculate): 0 requests.