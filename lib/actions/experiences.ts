"use server"

import { createClient } from "@/lib/supabase/server"
import type { Experience, Highlight, Locale, TimelineItem } from "@/lib/types"

function pickLocalized<T extends Record<string, unknown>>(
  row: T,
  base: string,
  locale: Locale,
): string {
  const es = row[`${base}_es` as keyof T] as string | null | undefined
  const en = row[`${base}_en` as keyof T] as string | null | undefined
  if (locale === "en") return (en ?? es ?? "").toString()
  return (es ?? "").toString()
}

function rowToExperience(row: Record<string, unknown>, locale: Locale): Experience {
  return {
    id: row.id as string,
    year: row.year as string,
    company: row.company as string,
    type: row.type as "creative" | "technical",
    image: (row.image as string | null) ?? "",
    role: pickLocalized(row, "role", locale),
    impact: pickLocalized(row, "impact", locale),
    problem: pickLocalized(row, "problem", locale),
    decision: pickLocalized(row, "decision", locale),
    solution: pickLocalized(row, "solution", locale),
    result: pickLocalized(row, "result", locale),
    technologies: (row.technologies as string[] | null) ?? [],
    created_at: row.created_at as string | undefined,
    updated_at: row.updated_at as string | undefined,
  }
}

function rowToHighlight(row: Record<string, unknown>, locale: Locale): Highlight {
  return {
    id: row.id as string,
    year: row.year as string,
    text: pickLocalized(row, "text", locale),
    created_at: row.created_at as string | undefined,
    updated_at: row.updated_at as string | undefined,
  }
}

export async function getExperiences(locale: Locale = "es"): Promise<Experience[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .order("year", { ascending: true })

    if (error) {
      console.error("[v0] getExperiences: error", error)
      return []
    }
    return (data ?? []).map((row) => rowToExperience(row, locale))
  } catch (err) {
    console.error("[v0] getExperiences: unexpected error", err)
    return []
  }
}

export async function getHighlights(locale: Locale = "es"): Promise<Highlight[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("highlights")
      .select("*")
      .order("year", { ascending: true })

    if (error) {
      console.error("[v0] getHighlights: error", error)
      return []
    }
    return (data ?? []).map((row) => rowToHighlight(row, locale))
  } catch (err) {
    console.error("[v0] getHighlights: unexpected error", err)
    return []
  }
}

export async function getExperienceById(
  id: string,
  locale: Locale = "es",
): Promise<Experience | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .eq("id", id)
      .maybeSingle()

    if (error || !data) return null
    return rowToExperience(data, locale)
  } catch (err) {
    console.error("[v0] getExperienceById: unexpected error", err)
    return null
  }
}

export async function getTimelineItems(locale: Locale = "es"): Promise<TimelineItem[]> {
  const [experiences, highlights] = await Promise.all([
    getExperiences(locale),
    getHighlights(locale),
  ])

  const items: TimelineItem[] = [
    ...experiences.map((exp) => ({ type: "experience" as const, data: exp })),
    ...highlights.map((hl) => ({ type: "highlight" as const, data: hl })),
  ]

  items.sort(
    (a, b) => Number.parseInt(a.data.year) - Number.parseInt(b.data.year),
  )
  return items
}
