# Architecture

## Overview

calc-hub is a **static website**. The build process turns the project into plain HTML, CSS, and JavaScript files in the `out` folder. Cloudflare Pages publishes those files. There is no server code and no database, so the site can run on free hosting.

## Technology

| Part | Choice | Why |
|---|---|---|
| Framework | Next.js 16.4.6 (App Router) | Widely used, produces static files with `output: "export"` |
| Language | TypeScript 5.9.3 | Catches mistakes before the site is published |
| Styling | Tailwind CSS 4.3.3 | Consistent design using named colours and spacing |
| Code checking | ESLint 9 (`npm run lint`) | Finds common problems in the code |
| Tests | Vitest (`npm test`) | Checks calculation logic automatically |
| Runtime | Node.js 24 (standard, pinned in `.node-version`) | Current Active LTS release, supported until April 2028 |
| Hosting | Cloudflare Pages, free plan | No cost, static files only |

## Folder structure

```text
calc-hub/
├─ README.md                 Project overview (only documentation file at the root)
├─ docs/                     Project documents
├─ public/                   Files served as they are (currently empty)
├─ src/
│  ├─ app/                   Pages and routes
│  │  ├─ layout.tsx          Site-wide layout, metadata, header, footer
│  │  ├─ page.tsx            Homepage
│  │  ├─ not-found.tsx       404 page
│  │  ├─ sitemap.ts          Builds /sitemap.xml
│  │  ├─ robots.ts           Builds /robots.txt
│  │  ├─ about/, contact/, privacy/, terms/, methodology/
│  │  └─ globals.css         Colours, fonts, and focus styles
│  ├─ components/
│  │  ├─ layout/             SiteHeader, SiteFooter
│  │  └─ ui/                 Container, PageIntro, Card
│  └─ data/
│     └─ site.ts             Site name, description, and address (one place to change)
├─ .node-version             Contains "24"
├─ next.config.ts            Static export and project settings
├─ package.json              Scripts and package list
└─ tsconfig.json             TypeScript settings
```

## Key decisions

- **Static export:** `output: "export"` in `next.config.ts` creates the `out` folder. Features that need a server are turned off (`cacheComponents` and `partialPrefetching`).
- **Project root:** `turbopack.root` is set to the project folder, so Next.js does not read files from the owner's home folder.
- **Node.js 24:** Stored in `.node-version` (used by Cloudflare) and `engines` in `package.json` (used by npm).
- **One source for site details:** Name, description, and address come from `src/data/site.ts`.
- **Shared components:** Pages are built from the same header, footer, container, page heading, and card, so the design stays consistent.

## What is not included yet

- Calculator logic and pages (Phase 2)
- Analytics (only after the Privacy Policy is final and the dashboard check is complete)
- A contact form or working contact method
- Dark mode

## Limits to remember

- Static export cannot use features that need a server, such as saving data for each visitor.
- Free hosting limits (builds and file counts) are listed in `docs/DEPLOYMENT.md` once the free-plan check is done.