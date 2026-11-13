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

## Still to check (after deployment)

- Live site: all pages, sitemap, robots file, and 404 page on the `pages.dev` address.
- Live Lighthouse scores (mobile).
- Web Analytics status in the Cloudflare dashboard.
- Cookies set on the live site, then update the Privacy Policy cookie sentence to match.