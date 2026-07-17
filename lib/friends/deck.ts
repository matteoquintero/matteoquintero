import "server-only"

import { readdir, readFile } from "node:fs/promises"
import path from "node:path"

import type { Card } from "@/lib/friends/types"

const CARDS_DIR = path.join(process.cwd(), "data", "friends", "cards")

/**
 * Minimal shape guard — enough to know "this parses as a usable card",
 * without being as exhaustive as `scripts/friends-validate.mjs` (which is
 * an authoring aid, not a runtime gate). Anything that fails this silently
 * gets skipped: empty files, in-progress edits, non-card JSON, etc. (R1).
 */
function isUsableCard(value: unknown): value is Card {
  if (typeof value !== "object" || value === null) return false
  const record = value as Record<string, unknown>
  return (
    typeof record.id === "string" &&
    record.id.length > 0 &&
    typeof record.name === "string" &&
    record.name.length > 0 &&
    typeof record.questions === "object" &&
    record.questions !== null
  )
}

async function readCardFile(filePath: string): Promise<Card | null> {
  try {
    const raw = await readFile(filePath, "utf8")
    if (raw.trim().length === 0) return null // empty file — skip silently
    const parsed = JSON.parse(raw)
    if (!isUsableCard(parsed)) return null // malformed / non-card shape — skip silently
    return parsed
  } catch {
    // Unreadable or unparseable — skip silently (R1 resilience).
    return null
  }
}

function sortCards(cards: Card[]): Card[] {
  return [...cards].sort((a, b) => {
    const byNumber = (a.number ?? 0) - (b.number ?? 0)
    if (byNumber !== 0) return byNumber
    return a.name.localeCompare(b.name)
  })
}

/**
 * Reads every `.json` file under `data/friends/cards` (no `major_*` regex —
 * shape, not filename, decides what's a card), skips anything empty,
 * malformed, or missing the minimal required shape, and returns the rest
 * sorted by `number` then `name`. Stateless — no module-level cache, mirrors
 * the project's per-call Supabase client convention.
 */
export async function getAllCards(): Promise<Card[]> {
  let filenames: string[]
  try {
    filenames = await readdir(CARDS_DIR)
  } catch {
    // Directory missing entirely — treat as an empty deck rather than throwing.
    return []
  }

  const jsonFiles = filenames.filter((name) => name.endsWith(".json"))
  const cards = await Promise.all(jsonFiles.map((name) => readCardFile(path.join(CARDS_DIR, name))))

  return sortCards(cards.filter((card): card is Card => card !== null))
}

export async function getCardById(id: string): Promise<Card | null> {
  const cards = await getAllCards()
  return cards.find((card) => card.id === id) ?? null
}
