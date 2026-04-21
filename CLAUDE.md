# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `pnpm dev` — start Next.js dev server (App Router, Turbopack).
- `pnpm build` — production build.
- `pnpm start` — run the built app.
- `pnpm lint` — ESLint via `eslint .`.

No test runner is configured.

Only `pnpm-lock.yaml` is tracked. pnpm is the primary package manager — prefer `pnpm` over `npm`. If you see a `package-lock.json` locally, it's untracked drift from a stray `npm` invocation, not the source of truth.

`next.config.mjs` sets `typescript.ignoreBuildErrors: true` and `images.unoptimized: true` — builds will succeed even with TS errors, so run `tsc --noEmit` manually when type-safety matters.

## Environment

Supabase is required at runtime — both server and client read:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

`.env*` is gitignored. Without these, `app/page.tsx` will fail on data fetch (the server actions log and return empty arrays, so the page renders with no timeline data).

## Architecture

Single-page portfolio (Spanish-language content) rendered as an RSC in `app/page.tsx`. Three stacked sections:

1. `BrainHero` — animated hero.
2. `TechnologiesHero` — horizontally-scrolling tech list derived from experiences.
3. `Timeline` — merged experiences + highlights.

### Data flow

- `app/page.tsx` is an async server component that calls `getTimelineItems()` at request time (no client-side fetching, no caching layer).
- `lib/actions/experiences.ts` (`"use server"`) exposes `getExperiences`, `getHighlights`, `getExperienceById`, `getTimelineItems`. Server actions currently used only as data fetchers from RSCs — there are no mutating actions yet.
- `getTimelineItems()` fetches `experiences` and `highlights` in parallel from Supabase, tags each with a `type` discriminator, and sorts by `Number.parseInt(year)` ascending. Downstream consumers pattern-match on `item.type` (`"experience" | "highlight"`).

### Supabase clients

Two separate client factories — use the right one for the context:

- `lib/supabase/server.ts` → `createClient()` (async) for RSCs, server actions, and route handlers. Reads cookies via `next/headers`. Per the inline comment, never cache this in a global — create a new client inside each function (required for Vercel Fluid Compute).
- `lib/supabase/client.ts` → `createClient()` (sync) for client components only.

### Database

Supabase migrations live in `scripts/*.sql` and are **not** applied automatically — they must be run in the Supabase SQL editor (or via your own migration tooling). Tables: `experiences`, `highlights`. RLS is enabled with public read policies because this is a public portfolio. Types in `lib/types.ts` must stay in sync with the SQL schema (note `003_remove_sort_order_column.sql` removed `sort_order` — sorting is now done in JS by `year`).

### UI layer

- Tailwind v4 via `@tailwindcss/postcss`. Global tokens/utilities in `app/globals.css` (the `styles/globals.css` file exists but is unused — `app/layout.tsx` imports `./globals.css`).
- shadcn/ui configured with style `new-york`, base color `neutral`, CSS variables, `lucide` icons, RSC enabled (`components.json`). Aliases: `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`. The `components/ui/` directory does not yet exist — add shadcn primitives via `pnpm dlx shadcn@latest add <component>`; they will land in `components/ui/`.
- Fonts loaded in `app/layout.tsx` via `next/font/google`: `Space_Grotesk` → `--font-creative`, `JetBrains_Mono` → `--font-technical`. The design system contrasts a "creative" and "technical" track (see `Experience.type`) — use these font variables, not ad-hoc font classes.
- `html` element is hardcoded to `className="dark"` — dark mode is the only theme currently rendered despite `theme-provider.tsx` being present.

### Origin

This repo is auto-synced from a v0.app project (see `README.md`). Logs prefixed with `[v0]` come from that origin and are fine to keep or remove.

## Conventions

- Path alias `@/*` maps to the repo root (`tsconfig.json`).
- Server actions go in `lib/actions/*.ts` with `"use server"` at the top of the file.
- Types shared between server and client live in `lib/types.ts`.
- When adding to the timeline, extend both the SQL schema (new migration in `scripts/`) and the matching interface in `lib/types.ts`, then update `getTimelineItems` if a new entity type is introduced.
