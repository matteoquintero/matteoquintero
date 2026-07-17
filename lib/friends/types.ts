import { CATEGORY_LABELS_ES, FRIENDS_CATEGORIES } from "./schema.mjs"

/**
 * `Category` is derived from `FRIENDS_CATEGORIES` (schema.mjs) via `typeof`,
 * so there is a single physical definition shared with the runtime constant
 * and the Node validator — no drift between the type and the data.
 */
export type Category = (typeof FRIENDS_CATEGORIES)[number]

export const CATEGORY_LABELS = CATEGORY_LABELS_ES as Record<Category, string>

export interface Question {
  id: string
  intensity: number
  tags: string[]
  question: string
}

export interface Card {
  id: string
  name: string
  arcana: string
  number: number
  traditionalEquivalent: string
  meaning: string
  coreMessage: string
  keywords: string[]
  light: string[]
  shadow: string[]
  /** Optional — some cards in the deck are still incomplete. */
  invitation?: string
  axes: string[]
  /**
   * Partial on purpose: a card may be missing a category entirely (e.g.
   * mid-authoring) — every consumer must read via `questions[category] ?? []`.
   */
  questions: Partial<Record<Category, Question[]>>
}

export interface FacetState {
  categories: Category[]
  intensities: number[]
  tags: string[]
}

export interface FacetVocabulary {
  categories: Category[]
  intensities: number[]
  tags: string[]
}
