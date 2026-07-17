import { FRIENDS_CATEGORIES } from "@/lib/friends/schema.mjs"
import type { Card, Category, FacetState, FacetVocabulary } from "@/lib/friends/types"

const ALL_CATEGORIES = FRIENDS_CATEGORIES as unknown as Category[]
const ALL_INTENSITIES = [1, 2, 3, 4, 5]

export interface SearchView {
  card: Card
  /** Precomputed lowercase blob — identity fields + tag union, EXCLUDES question prose. */
  blob: string
}

function tagUnion(card: Card): string[] {
  return Object.values(card.questions).flatMap((questions) => questions?.flatMap((q) => q.tags) ?? [])
}

/**
 * Precomputes a card's searchable blob once. Scope is intentionally narrow —
 * name, traditional equivalent, keywords, axes, light/shadow traits, and the
 * union of every question's tags — but NOT the question text itself, to
 * keep matches relevant instead of matching on long prose (R2).
 */
export function buildSearchView(card: Card): SearchView {
  const blob = [card.name, card.traditionalEquivalent, ...card.keywords, ...card.axes, ...card.light, ...card.shadow, ...tagUnion(card)]
    .join(" ")
    .toLowerCase()

  return { card, blob }
}

/** Case-insensitive substring match against the precomputed blob. Empty query matches everything. */
export function matchesQuery(view: SearchView, query: string): boolean {
  const trimmed = query.trim().toLowerCase()
  if (trimmed.length === 0) return true
  return view.blob.includes(trimmed)
}

/**
 * Facet match: OR within a facet type (category / intensity / tag), AND
 * across facet types. An empty facet selection is treated as "no filter"
 * for that facet type. Intensity/tag matches are scoped to the selected
 * categories when any are selected (otherwise across all of a card's
 * questions).
 */
export function matchesFacets(card: Card, facets: FacetState): boolean {
  const questionEntries = Object.entries(card.questions) as [Category, Card["questions"][Category]][]

  if (facets.categories.length > 0) {
    const hasCategory = facets.categories.some((category) => (card.questions[category]?.length ?? 0) > 0)
    if (!hasCategory) return false
  }

  const relevantQuestions = (
    facets.categories.length > 0 ? questionEntries.filter(([category]) => facets.categories.includes(category)) : questionEntries
  ).flatMap(([, questions]) => questions ?? [])

  if (facets.intensities.length > 0) {
    const hasIntensity = relevantQuestions.some((question) => facets.intensities.includes(question.intensity))
    if (!hasIntensity) return false
  }

  if (facets.tags.length > 0) {
    const hasTag = relevantQuestions.some((question) => question.tags.some((tag) => facets.tags.includes(tag)))
    if (!hasTag) return false
  }

  return true
}

/**
 * Derives the facet vocabulary from a loaded deck. Categories and
 * intensities are FIXED (the 5 categories, levels 1-5 — always offered
 * regardless of what's currently in the deck); only the tag vocabulary is
 * dynamically unioned across every loaded card/question, so it auto-scales
 * as the deck grows (19 → 79 cards) with no hardcoding.
 */
export function deriveFacets(cards: Card[]): FacetVocabulary {
  const tags = new Set<string>()

  for (const card of cards) {
    for (const questions of Object.values(card.questions)) {
      for (const question of questions ?? []) {
        for (const tag of question.tags) tags.add(tag)
      }
    }
  }

  return {
    categories: ALL_CATEGORIES,
    intensities: ALL_INTENSITIES,
    tags: Array.from(tags).sort((a, b) => a.localeCompare(b)),
  }
}
