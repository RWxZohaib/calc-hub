# Changelog

All decisions and changes to the project, most recent first.

## Phase 1: Foundation (in progress)

### 14 November 2026: Local testing and documentation

- Local checks passed: lint, tests, production build (9 routes), layout at 390 and 360 pixels, keyboard navigation, Lighthouse (mobile, Incognito: Accessibility 100, SEO 100, Best Practices 96, Performance 92).
- README replaced with project information.
- `docs/` folder created with this changelog.

### 13 November 2026: Pages, SEO basics, and build fixes

- Created the Home, About, Contact, Privacy Policy, Terms, Methodology, and 404 pages.
- Added the sitemap (`/sitemap.xml`) and robots file (`/robots.txt`), both marked as static for static export.
- Contact page created as a simple page with no form and no personal email. A working contact method is planned for a later update.
- Set `turbopack.root` to the project folder, which removed a warning about a file in the home folder. Those home-folder files were left untouched.
- Removed starter logo files from `public`.
- Replaced starter styles with light-only design tokens. Text colour pairs checked against WCAG AA (4.5 to 1); all passed.
- Turned off `cacheComponents` and `partialPrefetching`, which the generator enabled, because they require a server and are not compatible with static export.
- Enabled `output: "export"` so the build creates the `out` folder.

### 13 November 2026: Project setup

- Node.js standard changed from 22 to 24 at the project owner's request. Node 24 is the current Active LTS release (supported until April 2028). `.node-version` contains `24`, and `package.json` requires `>=24 <25`.
- Project created with Next.js 16.4.6, React 19.3.0, TypeScript 5.9.3, Tailwind CSS 4.3.3, and ESLint 9.
- Added Vitest as the only extra development tool.
- Scripts: `dev`, `build`, `lint` (runs `eslint .`), and `test`. The `start` script from the generator was removed, because static export has no server.
- Set `@types/node` to version 24 to match the Node standard.

### Decisions recorded from planning

- Hosting: Cloudflare Pages, free plan, on the free `pages.dev` subdomain. No custom domain.
- No database, no paid services, and no payment method on any account.
- Google Analytics will be added only after the Privacy Policy is finalised and the Web Analytics dashboard check has been done.
- Light mode only in Phase 1.
- The first five calculators (Canada GST/HST/PST, US Sales Tax, Fuel Cost, GPA, and Hourly to Annual Salary) are scheduled for Phase 2.
- Vercel is not used, because its free plan does not permit commercial use.