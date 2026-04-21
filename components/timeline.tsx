"use client"

import { useEffect, useRef, useState } from "react"

import { ExperienceModal } from "./experience-modal"
import { CornerFrame } from "@/components/ui/corner-frame"
import type { Experience, SiteCopy, TimelineItem } from "@/lib/types"
import { cn } from "@/lib/utils"

interface TimelineProps {
  items: TimelineItem[]
  copy: SiteCopy
}

export function Timeline({ items, copy }: TimelineProps) {
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
    const els = document.querySelectorAll("[data-timeline-item]")
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div
        className="relative min-h-screen bg-background px-6 pb-24 pt-40"
        ref={timelineRef}
        data-timeline-container
      >
        <div className="mx-auto mb-16 max-w-6xl">
          <div
            className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/45"
            style={{ fontFamily: "var(--font-technical)" }}
          >
            <span className="text-white/25">{`//`}</span>
            <span>{copy["timeline.namespace"]}</span>
          </div>
          <h2
            className="text-3xl font-light text-white md:text-5xl"
            style={{ fontFamily: "var(--font-creative)" }}
          >
            {copy["timeline.title"]}
          </h2>
        </div>

        <div className="absolute left-1/2 top-0 bottom-0 hidden w-[1px] -translate-x-1/2 bg-white/10 md:block" />

        <div className="mx-auto max-w-6xl space-y-28">
          {items.map((item, index) => {
            const isVisible = visibleItems.includes(index)

            if (item.type === "highlight") {
              return (
                <div
                  key={item.data.id}
                  data-timeline-item
                  data-index={index}
                  className={cn(
                    "relative transition-all duration-700",
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
                  )}
                  style={{ transitionDelay: "0.1s" }}
                >
                  <div className="flex justify-center">
                    <div className="max-w-md text-center">
                      <div
                        className="mb-3 inline-block rounded-sm border border-white/15 bg-white/[0.03] px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] text-white/60"
                        style={{ fontFamily: "var(--font-technical)" }}
                      >
                        {item.data.year}
                      </div>
                      <p
                        className="text-balance text-base font-light text-white/75 md:text-lg"
                        style={{ fontFamily: "var(--font-creative)" }}
                      >
                        {item.data.text}
                      </p>
                    </div>
                  </div>

                  <div className="absolute left-1/2 top-3 z-10 hidden h-2 w-2 -translate-x-1/2 rounded-full border border-white/50 bg-black md:block" />
                </div>
              )
            }

            const exp = item.data as Experience
            const isLeft = index % 2 === 0
            const isCreative = exp.type === "creative"
            const typeLabel = isCreative
              ? copy["timeline.label.creative"]
              : copy["timeline.label.technical"]
            const imageUrl =
              exp.image || `https://placehold.co/800x600/0f0f10/71717a?text=${encodeURIComponent(exp.role)}`

            return (
              <div
                key={exp.id}
                id={`experience-${exp.id}`}
                data-timeline-item
                data-index={index}
                className={cn(
                  "relative rounded-lg transition-all duration-700",
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
                )}
                style={{ transitionDelay: "0.1s" }}
              >
                <div className={cn("grid items-center gap-10 md:grid-cols-2", !isLeft && "md:flex-row-reverse")}>
                  <div className={cn(isLeft ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12")}>
                    <div
                      className={cn(
                        "mb-4 inline-flex items-center gap-2 rounded-sm border px-2.5 py-1 text-[10px] uppercase tracking-[0.25em]",
                        isCreative
                          ? "border-pink-300/30 bg-pink-300/5 text-pink-200"
                          : "border-emerald-300/25 bg-emerald-300/5 text-emerald-200/90",
                      )}
                      style={{ fontFamily: "var(--font-technical)" }}
                    >
                      <span>{exp.year}</span>
                      <span className={isCreative ? "text-pink-300/50" : "text-emerald-300/50"}>·</span>
                      <span>{typeLabel}</span>
                    </div>

                    <h3
                      className="mb-1 text-2xl font-light text-white md:text-3xl"
                      style={{ fontFamily: isCreative ? "var(--font-creative)" : "var(--font-technical)" }}
                    >
                      {exp.company}
                    </h3>
                    <p
                      className="mb-3 text-[11px] uppercase tracking-[0.2em] text-white/50"
                      style={{ fontFamily: "var(--font-technical)" }}
                    >
                      {exp.role}
                    </p>

                    {exp.technologies && exp.technologies.length > 0 && (
                      <div
                        className={cn(
                          "mb-5 flex flex-wrap gap-1",
                          isLeft ? "md:justify-end" : "justify-start",
                        )}
                      >
                        {exp.technologies.slice(0, 8).map((tech, idx) => (
                          <span
                            key={idx}
                            className="rounded-sm border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-[10px] text-white/65"
                            style={{ fontFamily: "var(--font-technical)" }}
                          >
                            {tech}
                          </span>
                        ))}
                        {exp.technologies.length > 8 && (
                          <span
                            className="rounded-sm px-1.5 py-0.5 text-[10px] text-white/35"
                            style={{ fontFamily: "var(--font-technical)" }}
                          >
                            +{exp.technologies.length - 8}
                          </span>
                        )}
                      </div>
                    )}

                    <p className="text-pretty text-base leading-relaxed text-white/85 md:text-lg">{exp.impact}</p>

                    <button
                      onClick={() => setSelectedExperience(exp)}
                      className="group mt-5 inline-flex items-center gap-2 rounded-sm border border-white/15 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-white/80 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white"
                      style={{ fontFamily: "var(--font-technical)" }}
                    >
                      {copy["timeline.cta.details"]}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="transition-transform group-hover:translate-x-1"
                      >
                        <path
                          d="M6 3L11 8L6 13"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className={cn(isLeft ? "md:col-start-2" : "md:col-start-1 md:row-start-1")}>
                    <CornerFrame
                      variant="inner"
                      tone="subtle"
                      cornerSize="sm"
                      className="bg-white/[0.02] p-1"
                    >
                      <button
                        onClick={() => setSelectedExperience(exp)}
                        className="relative block aspect-[4/3] w-full overflow-hidden bg-black/40 group"
                      >
                        <img
                          src={imageUrl || "/placeholder.svg"}
                          alt={`${exp.company} project preview`}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <span
                            className="text-[11px] uppercase tracking-[0.3em] text-white"
                            style={{ fontFamily: "var(--font-technical)" }}
                          >
                            {copy["timeline.cta.details"]}
                          </span>
                        </div>
                      </button>
                    </CornerFrame>
                  </div>
                </div>

                <div
                  className={cn(
                    "absolute left-1/2 top-12 z-10 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 md:block",
                    isCreative
                      ? "border-pink-300/70 bg-pink-400/40"
                      : "border-emerald-300/70 bg-emerald-400/40",
                  )}
                />
              </div>
            )
          })}
        </div>
      </div>

      {selectedExperience && (
        <ExperienceModal
          experience={selectedExperience}
          copy={copy}
          onClose={() => setSelectedExperience(null)}
        />
      )}
    </>
  )
}
