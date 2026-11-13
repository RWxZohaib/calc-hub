# Cursor Rules

These rules apply to every change made to this project, whether by the owner or by an AI assistant in Cursor.

## Working rules

1. Work on one phase at a time. Do not start the next phase without the owner's written approval.
2. Explain each step in simple English, and give exact file paths and commands.
3. Inspect the existing file before editing it. Do not overwrite working code without a clear reason.
4. Do not change the agreed architecture without explaining the reason and getting approval.
5. Keep the total budget at $0. Do not add payment details, activate billing, buy a domain, or enable a paid service or upgrade.
6. Stop and ask the owner before any step that might require payment, a subscription, or a paid plan.
7. Do not add dependencies unless they are needed and approved. Current approved extra tool: Vitest.
8. Do not publish any personal email address or other personal data.
9. Never invent search volumes, keyword difficulty, competitor statistics, or tax rates. Verify figures against official sources and record the date checked.
10. Test every change locally (lint, tests, build, and browser checks) before it is committed or deployed.
11. Keep documentation up to date in `docs/`, except `README.md`, which stays at the project root.

## Content rules

- Do not claim a feature works until it has been built and tested.
- Do not describe a calculator as published until its formula, tests, and sources are recorded.
- Calculator results must show their assumptions and limits on the page.
- Tax and rate information must show the date it was last checked.
- Financial, tax, and legal wording must include the "not professional advice" statement.

## Technical rules

- Node.js 24 is the project standard (`.node-version` and `package.json` engines).
- Use Next.js static export. Do not add server-only features (API routes, server actions, databases) without approval.
- Keep calculation logic separate from screen components.
- Use the shared components in `src/components/ui` and `src/components/layout` rather than creating duplicates.
- Keep colours and spacing in `globals.css` (named tokens), not scattered through pages.
- Do not add analytics, advertising, or tracking code until the Privacy Policy is final and the owner approves.

## Stop-and-ask triggers

Stop and ask the owner before:
- Creating or upgrading any account on a paid plan.
- Adding payment details or any billing setting.
- Buying or connecting a custom domain.
- Adding a database, login system, or contact form.
- Enabling analytics or advertising.
- Starting Phase 2 or any calculator.