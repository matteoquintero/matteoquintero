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

Bilingual (ES/EN) single-page portfolio rendered as an RSC in `app/page.tsx`. Five stacked sections:

1. `BrainHero` — animated hero (also hosts the `LocaleSwitcher`).
2. `TechnologiesHero` — horizontally-scrolling tech list derived from experiences.
3. `Timeline` — merged experiences + highlights.
4. `PortfolioFooter` — manifesto + copyable contacts.
5. `QuickContact` — floating contact FAB.

`app/page.tsx` resolves the locale once, fetches all data in parallel, and threads `profile`, `copy`, `lists`, and `locale` down as props — no component fetches its own data.

### Data flow

- `app/page.tsx` is an async server component. It calls `getRequestLocale()`, then `Promise.all`s `getProfile`, `getSiteCopy`, `getSiteLists`, and `getTimelineItems` at request time (no client-side fetching, no caching layer).
- Two `"use server"` action files, both read-only fetchers (no mutating actions yet):
  - `lib/actions/experiences.ts` → `getExperiences`, `getHighlights`, `getExperienceById`, `getTimelineItems`.
  - `lib/actions/content.ts` → `getProfile` (hero), `getSiteCopy` (key→string map), `getSiteLists` (key→string[] map).
- Every fetcher takes a `locale` arg (defaults to `"es"`) and returns already-localized plain strings — components never see `_es`/`_en` columns.
- `getTimelineItems(locale)` fetches `experiences` and `highlights` in parallel, wraps each as a discriminated union `{ type, data }`, and sorts by `Number.parseInt(data.year)` ascending. **Consumers read `item.data.*`, not `item.*`** — the payload is nested under `.data`, keyed by `item.type` (`"experience" | "highlight"`).

### i18n

- Locale is `"es" | "en"` (`Locale` in `lib/types.ts`), persisted in a `locale` cookie. Spanish is the default and the source-of-truth content.
- Server side: `lib/locale.ts` `getRequestLocale()` reads the cookie (anything other than `"en"` → `"es"`).
- Client side: `components/locale-switcher.tsx` writes the cookie directly and calls `router.refresh()` to re-render the RSC tree in the new locale — no route segment, no `next-intl`.
- Localized DB columns follow a `<field>_es` / `<field>_en` convention. Both action files share a `pickLocalized(row, base, locale)` helper: EN falls back to ES when the translation is null; ES falls back to `""`. Non-localized columns (`year`, `company`, `type`, `image`, `technologies`) are read directly.

### Supabase clients

Two separate client factories — use the right one for the context:

- `lib/supabase/server.ts` → `createClient()` (async) for RSCs, server actions, and route handlers. Reads cookies via `next/headers`. Per the inline comment, never cache this in a global — create a new client inside each function (required for Vercel Fluid Compute).
- `lib/supabase/client.ts` → `createClient()` (sync) for client components only.

### Database

Supabase migrations live in `scripts/*.sql`, are numbered, and are **not** applied automatically — run them in order in the Supabase SQL editor (or via your own tooling). Tables:

- `experiences`, `highlights` — timeline entities.
- `hero_content` — single-row hero/profile (name, headlines, contact links). Seeded by `004_seed_hero_profile.sql` (note the table is `hero_content` despite the file name).
- `site_copy` — `key`/`value_es`/`value_en`/`context` key-value UI strings.
- `site_lists` — `list_key`/`position`/`value_es`/`value_en` ordered string lists.

RLS is enabled with public read policies because this is a public portfolio. `001_schema.sql` is idempotent and also handles the ES/EN migration (renames legacy columns to `_es`, adds `_en`). Sorting is done in JS by `year`, not in SQL. Types in `lib/types.ts` must stay in sync with the schema — but note the app's TS interfaces model the *localized, flattened* shape (single `role: string`), not the raw `_es`/`_en` columns.

### UI layer

- Tailwind v4 via `@tailwindcss/postcss`. Global tokens/utilities in `app/globals.css` (the `styles/globals.css` file exists but is unused — `app/layout.tsx` imports `./globals.css`).
- shadcn/ui configured with style `new-york`, base color `neutral`, CSS variables, `lucide` icons, RSC enabled (`components.json`). Aliases: `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`. Add shadcn primitives via `pnpm dlx shadcn@latest add <component>`; they land in `components/ui/`. Note `components/ui/` currently holds only bespoke visual components (`corner-frame`, `gooey-text-morphing`, `liquid-glass-button`, `web-gl-shader`), not stock shadcn primitives — don't assume the usual `button`/`card`/etc. are present.
- Favicons are generated dynamically via `app/icon.tsx` and `app/apple-icon.tsx` (Next.js `ImageResponse`); `app/icon.svg` is the static fallback.
- Fonts loaded in `app/layout.tsx` via `next/font/google`: `Space_Grotesk` → `--font-creative`, `JetBrains_Mono` → `--font-technical`. The design system contrasts a "creative" and "technical" track (see `Experience.type`) — use these font variables, not ad-hoc font classes.
- `html` element is hardcoded to `className="dark"` — dark mode is the only theme currently rendered despite `theme-provider.tsx` being present.

### Origin

This repo is auto-synced from a v0.app project (see `README.md`). Logs prefixed with `[v0]` come from that origin and are fine to keep or remove.

## Conventions

- Path alias `@/*` maps to the repo root (`tsconfig.json`).
- Server actions go in `lib/actions/*.ts` with `"use server"` at the top of the file.
- Types shared between server and client live in `lib/types.ts`.
- When adding to the timeline, extend the SQL schema (new numbered migration in `scripts/`) and the matching interface in `lib/types.ts`, then update the relevant fetcher (`getTimelineItems` if a new entity type is introduced).
- Any new user-facing text must be **localizable**: store it as `_es`/`_en` columns (or `site_copy`/`site_lists` rows) and read it through `pickLocalized`, not as a hardcoded string in a component.
