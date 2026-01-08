"use client"

import { useState, useEffect, useRef } from "react"
import { ExperienceModal } from "./experience-modal"
import type { Experience, TimelineItem } from "@/lib/types"

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 },
    )

    const itemElements = document.querySelectorAll("[data-timeline-item]")
    itemElements.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="relative min-h-screen py-24 px-6 pt-40" ref={timelineRef} data-timeline-container>
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-border -translate-x-1/2" />

        <div className="max-w-6xl mx-auto space-y-32">
          {items.map((item, index) => {
            const isVisible = visibleItems.includes(index)

            if (item.type === "highlight") {
              return (
                <div
                  key={item.data.id}
                  data-timeline-item
                  data-index={index}
                  className={`relative transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: "0.1s" }}
                >
                  <div className="flex justify-center">
                    <div className="text-center max-w-md">
                      <div className="inline-block px-3 py-1 rounded-full text-xs font-mono mb-3 bg-muted text-muted-foreground">
                        {item.data.year}
                      </div>
                      <p className="text-base md:text-lg text-foreground/80 font-light">{item.data.text}</p>
                    </div>
                  </div>

                  <div className="absolute left-1/2 top-8 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-background bg-muted z-10" />
                </div>
              )
            }

            const exp = item.data as Experience
            const isLeft = index % 2 === 0
            const isCreative = exp.type === "creative"
            const imageUrl =
              exp.image || `https://placehold.co/800x600/1a1a1a/666666?text=${encodeURIComponent(exp.role)}`

            return (
              <div
                key={exp.id}
                id={`experience-${exp.id}`}
                data-timeline-item
                data-index={index}
                className={`relative transition-all duration-700 rounded-lg ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: "0.1s" }}
              >
                <div className={`grid md:grid-cols-2 gap-8 items-center ${isLeft ? "" : "md:flex-row-reverse"}`}>
                  {/* Content side */}
                  <div className={`${isLeft ? "md:text-right md:pr-16" : "md:pl-16 md:col-start-2"}`}>
                    {/* Year badge */}
                    <div
                      className={`inline-block px-4 py-1.5 rounded-full text-sm font-mono mb-4 ${
                        isCreative
                          ? "bg-gradient-to-r from-[var(--creative-from)] to-[var(--creative-to)] text-white"
                          : "bg-[var(--technical-base)] text-[var(--technical-accent)]"
                      }`}
                    >
                      {exp.year}
                    </div>

                    {/* Company & Role */}
                    <h3
                      className={`text-2xl md:text-3xl font-light mb-2 ${isCreative ? "" : "font-mono"}`}
                      style={{
                        fontFamily: isCreative ? "var(--font-creative)" : "var(--font-technical)",
                      }}
                    >
                      {exp.company}
                    </h3>
                    <p className="text-muted-foreground mb-2 text-sm md:text-base">{exp.role}</p>

                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className={`flex flex-wrap gap-1.5 mb-4 ${isLeft ? "md:justify-end" : ""}`}>
                        {exp.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 text-xs rounded bg-muted/80 text-muted-foreground border border-border/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Impact statement */}
                    <p className="text-base md:text-lg leading-relaxed mb-6 text-pretty">{exp.impact}</p>

                    {/* CTA */}
                    <button
                      onClick={() => setSelectedExperience(exp)}
                      className={`group inline-flex items-center gap-2 px-6 py-3 rounded-md transition-all ${
                        isCreative
                          ? "bg-gradient-to-r from-[var(--creative-from)] to-[var(--creative-to)] text-white hover:opacity-90"
                          : "bg-[var(--technical-base)] text-[var(--technical-accent)] hover:bg-[var(--technical-grid)]"
                      }`}
                    >
                      <span className={isCreative ? "" : "font-mono text-sm uppercase tracking-wider"}>
                        {isCreative ? "Ver proyecto" : "Ver detalles"}
                      </span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="transition-transform group-hover:translate-x-1"
                      >
                        <path
                          d="M6 3L11 8L6 13"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Image side */}
                  <div className={`${isLeft ? "md:col-start-2" : "md:col-start-1 md:row-start-1"}`}>
                    <button
                      onClick={() => setSelectedExperience(exp)}
                      className="relative group block w-full aspect-[4/3] overflow-hidden rounded-lg"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-background to-muted transition-opacity group-hover:opacity-80" />
                      <img
                        src={imageUrl || "/placeholder.svg"}
                        alt={`${exp.company} project preview`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-lg font-light">Ver detalles</span>
                      </div>
                    </button>
                  </div>
                </div>

                <div
                  className="absolute left-1/2 top-12 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-background z-10"
                  style={{
                    background: isCreative ? "var(--creative-accent)" : "var(--technical-accent)",
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedExperience && (
        <ExperienceModal experience={selectedExperience} onClose={() => setSelectedExperience(null)} />
      )}
    </>
  )
}
