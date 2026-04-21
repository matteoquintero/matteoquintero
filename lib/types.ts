export type Locale = "es" | "en"

export interface Experience {
  id: string
  year: string
  company: string
  role: string
  impact: string
  type: "creative" | "technical"
  image: string
  problem: string
  decision: string
  solution: string
  result: string
  technologies?: string[]
  created_at?: string
  updated_at?: string
}

export interface Highlight {
  id: string
  year: string
  text: string
  created_at?: string
  updated_at?: string
}

export type TimelineItem =
  | { type: "experience"; data: Experience }
  | { type: "highlight"; data: Highlight }

export interface Profile {
  name: string
  role: string
  headline_creative: string
  headline_technical: string
  headline_action: string
  micro_context: string
  scroll_text: string
  profile_image: string
  linkedin_url: string
  whatsapp_number: string
  email: string
}

export type SiteCopy = Record<string, string>
export type SiteLists = Record<string, string[]>
