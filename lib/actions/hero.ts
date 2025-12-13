"use server"

import { createClient } from "@/lib/supabase/server"

export interface HeroContent {
  id: string
  name: string
  role: string
  headline_creative: string
  headline_action: string
  headline_technical: string
  micro_context: string
  scroll_text: string
  profile_image: string
  linkedin_url: string
  whatsapp_number: string
  email: string
  created_at: string
  updated_at: string
}

export async function getHeroContent(): Promise<HeroContent | null> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("hero_content").select("*").single()

  if (error) {
    console.error("[v0] Error fetching hero content:", error)
    return null
  }

  return data
}
