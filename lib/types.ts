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

export type TimelineItem = { type: "experience"; data: Experience } | { type: "highlight"; data: Highlight }
