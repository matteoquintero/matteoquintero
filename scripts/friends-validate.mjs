#!/usr/bin/env node
// Authoring audit for the Friends Deck. Run: `pnpm friends:validate`.
//
// Distinct from the runtime loader's silent skip (lib/friends/deck.ts, R1):
// this is a human-readable, per-file OK/WARN/FAIL report meant to help
// whoever is authoring `data/friends/cards/*.json` catch mistakes early.
// Imports lib/friends/schema.mjs — the single source of truth for
// categories/counts/required fields — so there is zero drift between this
// script, the loader, and the TypeScript types.

import { readdir, readFile } from "node:fs/promises"
import path from "node:path"
import process from "node:process"

import {
  CATEGORY_LABELS_ES,
  EXPECTED_QUESTION_COUNTS,
  FRIENDS_CATEGORIES,
  REQUIRED_CARD_FIELDS,
  REQUIRED_QUESTION_FIELDS,
} from "../lib/friends/schema.mjs"

const CARDS_DIR = path.join(process.cwd(), "data", "friends", "cards")
const EXPECTED_TOTAL_QUESTIONS = Object.values(EXPECTED_QUESTION_COUNTS).reduce((sum, n) => sum + n, 0)
// Full OSHO Zen Tarot deck target size — the completeness view tracks
// progress toward this, not just against whatever's currently on disk.
const FULL_DECK_TARGET = 79
const STRICT = process.argv.includes("--strict")

function hasField(obj, field) {
  return Object.prototype.hasOwnProperty.call(obj, field) && obj[field] !== null && obj[field] !== undefined
}

function auditQuestion(question, category, index, issues) {
  const label = `${category}[${index}]`
  if (typeof question !== "object" || question === null) {
    issues.push(`${label}: not an object`)
    return
  }
  for (const field of REQUIRED_QUESTION_FIELDS) {
    if (!hasField(question, field)) issues.push(`${label}: missing "${field}"`)
  }
  if (hasField(question, "intensity") && (typeof question.intensity !== "number" || question.intensity < 1 || question.intensity > 5)) {
    issues.push(`${label}: intensity should be a number 1-5, got ${JSON.stringify(question.intensity)}`)
  }
  if (hasField(question, "tags") && !Array.isArray(question.tags)) {
    issues.push(`${label}: "tags" should be an array`)
  }
}

/**
 * Audits one parsed card. Returns { status: "OK"|"WARN"|"FAIL", issues, counts }.
 * FAIL = unparseable/missing required top-level fields (handled by caller for
 * parse errors) or a non-object payload. WARN = present but incomplete
 * (wrong question counts, questions missing fields). OK = fully complete.
 */
function auditCard(card) {
  const issues = []
  const counts = {}

  if (typeof card !== "object" || card === null) {
    return { status: "FAIL", issues: ["not a JSON object"], counts }
  }

  const missingRequired = REQUIRED_CARD_FIELDS.filter((field) => !hasField(card, field))
  if (missingRequired.length > 0) {
    issues.push(`missing required field(s): ${missingRequired.join(", ")}`)
  }

  const questions = typeof card.questions === "object" && card.questions !== null ? card.questions : {}

  for (const category of FRIENDS_CATEGORIES) {
    const list = Array.isArray(questions[category]) ? questions[category] : []
    counts[category] = list.length

    const expected = EXPECTED_QUESTION_COUNTS[category]
    if (list.length !== expected) {
      issues.push(`"${category}" (${CATEGORY_LABELS_ES[category]}) has ${list.length} question(s), expected ${expected}`)
    }

    list.forEach((question, index) => auditQuestion(question, category, index, issues))
  }

  if (missingRequired.length > 0 || typeof card.id !== "string" || typeof card.name !== "string") {
    return { status: "FAIL", issues, counts }
  }

  return { status: issues.length > 0 ? "WARN" : "OK", issues, counts }
}

async function main() {
  let filenames
  try {
    filenames = await readdir(CARDS_DIR)
  } catch (error) {
    console.error(`Cannot read ${CARDS_DIR}: ${error.message}`)
    process.exit(STRICT ? 1 : 0)
    return
  }

  const jsonFiles = filenames.filter((name) => name.endsWith(".json")).sort()

  const results = []

  for (const filename of jsonFiles) {
    const filePath = path.join(CARDS_DIR, filename)
    let raw
    try {
      raw = await readFile(filePath, "utf8")
    } catch (error) {
      results.push({ filename, status: "FAIL", issues: [`unreadable: ${error.message}`], counts: {} })
      continue
    }

    if (raw.trim().length === 0) {
      results.push({ filename, status: "FAIL", issues: ["empty file"], counts: {} })
      continue
    }

    let parsed
    try {
      parsed = JSON.parse(raw)
    } catch (error) {
      results.push({ filename, status: "FAIL", issues: [`invalid JSON: ${error.message}`], counts: {} })
      continue
    }

    const audit = auditCard(parsed)
    results.push({ filename, ...audit })
  }

  console.log(`Friends Deck validation — ${jsonFiles.length} file(s) in ${path.relative(process.cwd(), CARDS_DIR)}\n`)

  for (const result of results) {
    console.log(`${result.status.padEnd(4)} ${result.filename}`)
    for (const issue of result.issues) {
      console.log(`     - ${issue}`)
    }
  }

  const totals = { OK: 0, WARN: 0, FAIL: 0 }
  let totalQuestions = 0
  for (const result of results) {
    totals[result.status] += 1
    totalQuestions += Object.values(result.counts).reduce((sum, n) => sum + n, 0)
  }

  const completeCards = totals.OK
  const pctOfLoaded = jsonFiles.length > 0 ? Math.round((completeCards / jsonFiles.length) * 100) : 0
  const pctOfFullDeck = Math.round((completeCards / FULL_DECK_TARGET) * 100)

  console.log("\n--- Summary ---")
  console.log(`${jsonFiles.length} card(s) on disk: ${totals.OK} OK, ${totals.WARN} WARN, ${totals.FAIL} FAIL`)
  console.log(`Questions found: ${totalQuestions} (each complete card expects ${EXPECTED_TOTAL_QUESTIONS})`)
  console.log(`Completeness (of files loaded): ${completeCards}/${jsonFiles.length} fully complete (${pctOfLoaded}%)`)
  console.log(`Completeness (toward full ${FULL_DECK_TARGET}-card deck): ${completeCards}/${FULL_DECK_TARGET} (${pctOfFullDeck}%)`)

  if (STRICT && (totals.WARN > 0 || totals.FAIL > 0)) {
    process.exit(1)
  }
}

main()
