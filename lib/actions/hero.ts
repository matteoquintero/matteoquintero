"use server"

import { createClient } from "@/lib/supabase/server"

export interface HeroContent {
  id: string
  name: string
  role: string
  headline_creative: string
  headline_technical: string
  headline_action: string
  micro_context: string
  scroll_text: string
  profile_image: string
  linkedin_url: string | null
  whatsapp_number: string | null
  email: string | null
}

export async function getHeroContent(): Promise<HeroContent | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("hero_content")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  if (error) {
    console.error("Error fetching hero content:", error)
    return null
  }

  return data
}
