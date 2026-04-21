"use server"

import { createClient } from "@/lib/supabase/server"
import type { Locale, Profile, SiteCopy, SiteLists } from "@/lib/types"

function pickLocalized<T extends Record<string, unknown>>(
  row: T | null,
  base: string,
  locale: Locale,
): string {
  if (!row) return ""
  const es = row[`${base}_es` as keyof T] as string | null | undefined
  const en = row[`${base}_en` as keyof T] as string | null | undefined
  if (locale === "en") return (en ?? es ?? "").toString()
  return (es ?? "").toString()
}

const EMPTY_PROFILE: Profile = {
  name: "",
  role: "",
  headline_creative: "",
  headline_technical: "",
  headline_action: "",
  micro_context: "",
  scroll_text: "",
  profile_image: "/profile.jpg",
  linkedin_url: "",
  whatsapp_number: "",
  email: "",
}

export async function getProfile(locale: Locale = "es"): Promise<Profile> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("hero_content")
      .select("*")
      .limit(1)
      .maybeSingle()

    if (error) {
      console.error("[v0] getProfile: error", error)
      return EMPTY_PROFILE
    }
    if (!data) return EMPTY_PROFILE

    return {
      name: (data.name as string | null) ?? "",
      role: pickLocalized(data, "role", locale),
      headline_creative: pickLocalized(data, "headline_creative", locale),
      headline_technical: pickLocalized(data, "headline_technical", locale),
      headline_action: pickLocalized(data, "headline_action", locale),
      micro_context: pickLocalized(data, "micro_context", locale),
      scroll_text: pickLocalized(data, "scroll_text", locale),
      profile_image: (data.profile_image as string | null) ?? "/profile.jpg",
      linkedin_url: (data.linkedin_url as string | null) ?? "",
      whatsapp_number: (data.whatsapp_number as string | null) ?? "",
      email: (data.email as string | null) ?? "",
    }
  } catch (err) {
    console.error("[v0] getProfile: unexpected error", err)
    return EMPTY_PROFILE
  }
}

export async function getSiteCopy(locale: Locale = "es"): Promise<SiteCopy> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("site_copy")
      .select("key, value_es, value_en")

    if (error) {
      console.error("[v0] getSiteCopy: error", error)
      return {}
    }
    if (!data) return {}

    const result: SiteCopy = {}
    for (const row of data as Array<{ key: string; value_es: string; value_en: string | null }>) {
      const value = locale === "en" ? row.value_en ?? row.value_es : row.value_es
      result[row.key] = value ?? ""
    }
    return result
  } catch (err) {
    console.error("[v0] getSiteCopy: unexpected error", err)
    return {}
  }
}

export async function getSiteLists(locale: Locale = "es"): Promise<SiteLists> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("site_lists")
      .select("list_key, position, value_es, value_en")
      .order("position", { ascending: true })

    if (error) {
      console.error("[v0] getSiteLists: error", error)
      return {}
    }
    if (!data) return {}

    const grouped: SiteLists = {}
    for (const row of data as Array<{
      list_key: string
      position: number
      value_es: string
      value_en: string | null
    }>) {
      const value = locale === "en" ? row.value_en ?? row.value_es : row.value_es
      if (!grouped[row.list_key]) grouped[row.list_key] = []
      grouped[row.list_key].push(value ?? "")
    }
    return grouped
  } catch (err) {
    console.error("[v0] getSiteLists: unexpected error", err)
    return {}
  }
}
