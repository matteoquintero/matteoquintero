"use server"

import { createClient } from "@/lib/supabase/server"
import type { Experience, Highlight, TimelineItem } from "@/lib/types"

export async function getExperiences(): Promise<Experience[]> {
  console.log("[v0] getExperiences: Starting fetch")

  try {
    const supabase = await createClient()
    console.log("[v0] getExperiences: Client created")

    const { data, error } = await supabase.from("experiences").select("*").order("year", { ascending: true })

    if (error) {
      console.error("[v0] getExperiences: Error from Supabase:", error)
      return []
    }

    console.log("[v0] getExperiences: Success, found", data?.length, "experiences")
    return data as Experience[]
  } catch (err) {
    console.error("[v0] getExperiences: Unexpected error:", err)
    return []
  }
}

export async function getExperienceById(id: string): Promise<Experience | null> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("experiences").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching experience:", error)
    return null
  }

  return data as Experience
}

export async function getHighlights(): Promise<Highlight[]> {
  console.log("[v0] getHighlights: Starting fetch")

  try {
    const supabase = await createClient()
    console.log("[v0] getHighlights: Client created")

    const { data, error } = await supabase.from("highlights").select("*").order("year", { ascending: true })

    if (error) {
      console.error("[v0] getHighlights: Error from Supabase:", error)
      return []
    }

    console.log("[v0] getHighlights: Success, found", data?.length, "highlights")
    return data as Highlight[]
  } catch (err) {
    console.error("[v0] getHighlights: Unexpected error:", err)
    return []
  }
}

export async function getTimelineItems(): Promise<TimelineItem[]> {
  const [experiences, highlights] = await Promise.all([getExperiences(), getHighlights()])

  const items: TimelineItem[] = [
    ...experiences.map((exp) => ({ type: "experience" as const, data: exp })),
    ...highlights.map((hl) => ({ type: "highlight" as const, data: hl })),
  ]

  items.sort((a, b) => {
    const yearA = Number.parseInt(a.data.year)
    const yearB = Number.parseInt(b.data.year)
    return yearA - yearB
  })

  return items
}
