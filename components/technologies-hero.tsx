"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import type { Experience } from "@/lib/types"

interface TechnologiesHeroProps {
  experiences: Experience[]
}

export function TechnologiesHero({ experiences }: TechnologiesHeroProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedTech, setSelectedTech] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [visitedExperiences, setVisitedExperiences] = useState<Record<string, string[]>>({})
  const heroRef = useRef<HTMLDivElement>(null)

  const techStats = useMemo(() => {
    const techMap = new Map<string, number>()

    experiences.forEach((exp) => {
      if (exp.technologies) {
        exp.technologies.forEach((tech) => {
          techMap.set(tech, (techMap.get(tech) || 0) + 1)
        })
      }
    })

    return Array.from(techMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
  }, [experiences])

  const filteredTechs = useMemo(() => {
    if (!searchQuery) return techStats
    return techStats.filter((tech) => tech.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [techStats, searchQuery])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1, rootMargin: "-100px 0px 0px 0px" },
    )

    const timelineElement = document.querySelector("[data-timeline-container]")
    if (timelineElement) {
      observer.observe(timelineElement)
    }

    return () => observer.disconnect()
  }, [])

  const handleTechClick = (techName: string) => {
    setSelectedTech(techName)

    // Find all experiences with this technology
    const matchingExperiences = experiences.filter((exp) => exp.technologies && exp.technologies.includes(techName))

    if (matchingExperiences.length === 0) return

    // Get previously visited experiences for this tech
    const visited = visitedExperiences[techName] || []

    // Find unvisited experiences
    let availableExperiences = matchingExperiences.filter((exp) => !visited.includes(exp.id))

    // If all have been visited, reset the cycle
    if (availableExperiences.length === 0) {
      availableExperiences = matchingExperiences
      setVisitedExperiences((prev) => ({ ...prev, [techName]: [] }))
    }

    // Pick a random experience from available ones
    const randomIndex = Math.floor(Math.random() * availableExperiences.length)
    const selectedExp = availableExperiences[randomIndex]

    // Mark as visited
    setVisitedExperiences((prev) => ({
      ...prev,
      [techName]: [...(prev[techName] || []), selectedExp.id],
    }))

    // Scroll to experience
    const element = document.getElementById(`experience-${selectedExp.id}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" })

      // Highlight the experience
      element.classList.add("ring-2", "ring-primary", "ring-offset-4", "ring-offset-background")
      setTimeout(() => {
        element.classList.remove("ring-2", "ring-primary", "ring-offset-4", "ring-offset-background")
      }, 2000)
    }

    // Clear selection after animation
    setTimeout(() => setSelectedTech(null), 800)
  }

  if (!isVisible) return null

  const showSearch = techStats.length > 18

  return (
    <div
      ref={heroRef}
      className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border py-4 px-6 transition-all duration-300"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">Tecnologías</h2>
          {showSearch && (
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1.5 text-sm rounded-md bg-muted border border-border focus:outline-none focus:ring-1 focus:ring-primary w-40"
            />
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {filteredTechs.map((tech) => (
            <button
              key={tech.name}
              onClick={() => handleTechClick(tech.name)}
              className={`group px-3 py-1.5 rounded-md text-sm font-mono transition-all ${
                selectedTech === tech.name
                  ? "bg-primary text-primary-foreground scale-95"
                  : "bg-muted hover:bg-muted/80 text-foreground hover:scale-105 active:scale-95"
              }`}
            >
              {tech.name}
              <span className="ml-1.5 text-xs opacity-60">({tech.count})</span>
            </button>
          ))}
        </div>

        {filteredTechs.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">No se encontraron tecnologías</p>
        )}
      </div>
    </div>
  )
}
