"use client"

import { useEffect, useMemo, useRef, useState } from "react"

import type { Experience, SiteCopy } from "@/lib/types"
import { cn } from "@/lib/utils"

interface TechnologiesHeroProps {
  experiences: Experience[]
  copy: SiteCopy
}

export function TechnologiesHero({ experiences, copy }: TechnologiesHeroProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedTech, setSelectedTech] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [visitedExperiences, setVisitedExperiences] = useState<Record<string, string[]>>({})
  const heroRef = useRef<HTMLDivElement>(null)

  const techStats = useMemo(() => {
    const techMap = new Map<string, number>()
    experiences.forEach((exp) => {
      exp.technologies?.forEach((tech) => {
        techMap.set(tech, (techMap.get(tech) || 0) + 1)
      })
    })
    return Array.from(techMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
  }, [experiences])

  const filteredTechs = useMemo(() => {
    if (!searchQuery) return techStats
    return techStats.filter((t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [techStats, searchQuery])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: "-100px 0px 0px 0px" },
    )
    const timelineElement = document.querySelector("[data-timeline-container]")
    if (timelineElement) observer.observe(timelineElement)
    return () => observer.disconnect()
  }, [])

  const handleTechClick = (techName: string) => {
    setSelectedTech(techName)
    const matching = experiences.filter((exp) => exp.technologies?.includes(techName))
    if (matching.length === 0) return

    const visited = visitedExperiences[techName] || []
    let available = matching.filter((exp) => !visited.includes(exp.id))
    if (available.length === 0) {
      available = matching
      setVisitedExperiences((prev) => ({ ...prev, [techName]: [] }))
    }

    const randomIndex = Math.floor(Math.random() * available.length)
    const selected = available[randomIndex]

    setVisitedExperiences((prev) => ({
      ...prev,
      [techName]: [...(prev[techName] || []), selected.id],
    }))

    const element = document.getElementById(`experience-${selected.id}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" })
      element.classList.add("ring-1", "ring-white/60", "ring-offset-4", "ring-offset-background")
      setTimeout(() => {
        element.classList.remove("ring-1", "ring-white/60", "ring-offset-4", "ring-offset-background")
      }, 2000)
    }

    setTimeout(() => setSelectedTech(null), 800)
  }

  if (!isVisible) return null

  const showSearch = techStats.length > 18

  return (
    <div
      ref={heroRef}
      className="sticky top-0 z-30 border-b border-white/10 bg-black/80 px-6 py-4 backdrop-blur-md transition-all duration-300"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-3 flex items-center justify-between gap-4">
          <div
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/55"
            style={{ fontFamily: "var(--font-technical)" }}
          >
            <span className="text-white/30">{`//`}</span>
            <span>
              {copy["technologies.namespace"]} · {techStats.length}
            </span>
          </div>
          {showSearch && (
            <input
              type="text"
              placeholder={copy["technologies.search_placeholder"]}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-32 rounded-sm border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-white/90 placeholder-white/30 outline-none focus:border-white/40 focus:bg-white/10 md:w-40"
              style={{ fontFamily: "var(--font-technical)" }}
            />
          )}
        </div>

        <div className="overflow-x-auto overflow-y-hidden">
          <div className="flex min-w-max gap-1.5 pb-2">
            {filteredTechs.map((tech) => {
              const active = selectedTech === tech.name
              return (
                <button
                  key={tech.name}
                  onClick={() => handleTechClick(tech.name)}
                  className={cn(
                    "group flex-shrink-0 whitespace-nowrap rounded-sm border px-2.5 py-1 text-[11px] transition-all tabular-nums",
                    active
                      ? "border-white bg-white text-black"
                      : "border-white/10 bg-white/[0.04] text-white/80 hover:border-white/30 hover:bg-white/10 hover:text-white",
                  )}
                  style={{ fontFamily: "var(--font-technical)" }}
                >
                  {tech.name}
                  <span
                    className={cn("ml-1.5 text-[10px]", active ? "text-black/50" : "text-white/40")}
                  >
                    {String(tech.count).padStart(2, "0")}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {filteredTechs.length === 0 && (
          <p
            className="py-4 text-center text-[11px] uppercase tracking-[0.3em] text-white/40"
            style={{ fontFamily: "var(--font-technical)" }}
          >
            {copy["technologies.empty"]}
          </p>
        )}
      </div>
    </div>
  )
}
