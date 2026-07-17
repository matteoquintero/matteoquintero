/**
 * Single source of truth for Friends Deck runtime constants.
 *
 * Plain ESM (no TypeScript syntax) so this same file can be imported by:
 *  - `lib/friends/types.ts` (via `allowJs`) to derive TS types with zero drift
 *  - `scripts/friends-validate.mjs` (a plain Node script, no test runner)
 *
 * Do NOT add TypeScript-only syntax here (e.g. `as const`) — this file must
 * stay parseable as plain JavaScript.
 */

/** @type {readonly ["playful", "thoughtful", "deep", "challenge", "connection"]} */
export const FRIENDS_CATEGORIES = Object.freeze([
  "playful",
  "thoughtful",
  "deep",
  "challenge",
  "connection",
])

export const EXPECTED_QUESTION_COUNTS = Object.freeze({
  playful: 6,
  thoughtful: 8,
  deep: 8,
  challenge: 6,
  connection: 6,
})

export const REQUIRED_CARD_FIELDS = Object.freeze([
  "id",
  "name",
  "arcana",
  "number",
  "traditionalEquivalent",
  "meaning",
  "coreMessage",
  "keywords",
  "light",
  "shadow",
  "invitation",
  "axes",
  "questions",
])

export const REQUIRED_QUESTION_FIELDS = Object.freeze(["id", "intensity", "tags", "question"])

// ES labels for each category. Kept intentionally short and warm — this is
// user-facing copy, not a technical enum, so wording is refined for tone.
export const CATEGORY_LABELS_ES = Object.freeze({
  playful: "Juego",
  thoughtful: "Reflexión",
  deep: "Profundo",
  challenge: "Reto",
  connection: "Conexión",
})
