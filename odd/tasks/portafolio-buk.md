# Feature: portafolio-buk

Locator: `odd/tasks/portafolio-buk.md` · Engram mirror: `odd/portafolio-buk/tasks` (project `matteoquintero`)

## Objective
Standalone internal page `/portafolio-buk` that presents Matteo's technical background, focused on ERP integrations, to Buk's partner team.

## Problem / why
Buk refers clients to integration partners. The main portfolio is a general bilingual timeline; Buk needs a focused view: real ERP cases, how the Buk API would be integrated, why AWS serverless is cost-effective, and how client work is handled.

## Scope (authorized)
- New route `app/portafolio-buk/` (`page.tsx`, `page.module.css`, `content.ts`).
- Assets in `public/portafolio-buk/` (Buk, Business Central, Siigo, Odoo, SAP logos; profile photo).
- Source of truth for design and copy: approved mockup (artifact v10, https://claude.ai/artifact/UCPFqhRrt9K3sKic1HbS7Y).

## Constraints / accepted decisions
- Spanish only; content lives in a typed data file, not Supabase `site_copy` (user-approved deviation from the localization convention).
- Standalone route like `app/alfred-challenge`: `robots: noindex, nofollow`, no reuse of main-page hero/timeline components.
- Keep mockup palette (not the project tokens) — user preferred it.
- No invented figures; ledger/example amounts were removed with the old hero.
- Other sections stay as approved (Siigo stays "En producción" in the destinations row per user decision).

## TDD
Mode: off. Source: project sdd-init (`strict_tdd=false`, no test runner configured). Checks: `tsc --noEmit`, `pnpm lint`, `pnpm build`, visual check of the route.

## Delivery
Strategy: `single-pr` — one cohesive page (~700 authored lines forecast, mostly CSS/markup); slicing would split one visual unit without review benefit. RDD: on (global).

## Tasks
- [x] T1 — Assets + typed content (`content.ts`) · route: delegated writer (writer trigger: 2+ non-trivial files across T1/T2) · commit `204035e`
- [x] T2 — Page markup + CSS module matching the mockup · route: delegated writer (same writer) · commit `683281c`

## Acceptance criteria
- `/portafolio-buk` renders all sections in mockup order: topbar (name + "partners de Buk" + Buk logo), hero "Quince años conectando sistemas" with subtle B/W photo + trajectory + stack, cases (Business Central, Siigo nómina), "El mismo problema, otro origen", "Cómo integraría la API de Buk", "El patrón no depende del ERP", cost section with chart, client process, contact (real data).
- Responsive at ~400px without horizontal page scroll; visible keyboard focus; reduced motion respected.
- `tsc --noEmit`, `pnpm lint`, `pnpm build` pass (or pre-existing failures documented).

## Progress / evidence
- Worktree `matteoquintero-wt/portafolio-buk` on `feature/portafolio-buk` from `main@a336951`.
- `pnpm exec tsc --noEmit`: clean (writer + parent spot check).
- `pnpm build`: success, route `ƒ /portafolio-buk` listed (writer).
- `pnpm lint`: unavailable — `eslint: command not found`; eslint is not in package.json, fails identically on base (pre-existing).
- Visual (Playwright, `pnpm start`): desktop 1280px matches mockup; 400px has no horizontal scroll (scrollWidth 398 = clientWidth); 0 broken images; only console error is `/_vercel/insights/script.js` 404 (expected off Vercel).
- Writer deviations (accepted): logos as static `<img>` assets with per-logo height map; topbar/contact centered at 1080px; status dots as spans; unused mockup CSS dropped.
- Authored lines: 1,719 (content 475, page 443, CSS 801) — above the ~400 forecast; single-pr kept (one visual unit).

## Next step
RDD assess per commit range `a336951..HEAD`, then PR to `main`.
