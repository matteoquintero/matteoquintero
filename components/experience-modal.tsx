"use client"

import { useEffect } from "react"

import { CornerFrame } from "@/components/ui/corner-frame"
import type { Experience, SiteCopy } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ExperienceModalProps {
  experience: Experience
  copy: SiteCopy
  onClose: () => void
}

export function ExperienceModal({ experience, copy, onClose }: ExperienceModalProps) {
  const isCreative = experience.type === "creative"
  const imageUrl =
    experience.image || `https://placehold.co/1200x675/0f0f10/71717a?text=${encodeURIComponent(experience.role)}`

  const typeLabel = isCreative
    ? copy["timeline.label.creative"]
    : copy["timeline.label.technical"]

  useEffect(() => {
    document.body.style.overflow = "hidden"
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => {
      document.body.style.overflow = "auto"
      window.removeEventListener("keydown", handleEscape)
    }
  }, [onClose])

  const sections: { label: string; body: string; accent?: boolean }[] = [
    { label: copy["experience.section.problem"], body: experience.problem },
    { label: copy["experience.section.decision"], body: experience.decision },
    { label: copy["experience.section.solution"], body: experience.solution },
    { label: copy["experience.section.result"], body: experience.result, accent: true },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md duration-300 animate-in fade-in md:p-8"
      onClick={onClose}
    >
      <CornerFrame
        tone="bright"
        className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden bg-black/80 backdrop-blur-sm duration-500 animate-in zoom-in-95"
      >
        <div className="max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onClose}
            aria-label={copy["experience.close_aria"]}
            className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-sm border border-white/15 bg-black/60 text-white/80 backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/40">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={`${experience.company} project`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 px-6 pb-6 md:px-10 md:pb-8">
              <div
                className={cn(
                  "mb-3 inline-flex items-center gap-2 rounded-sm border px-2.5 py-1 text-[10px] uppercase tracking-[0.25em]",
                  isCreative
                    ? "border-pink-300/30 bg-pink-300/10 text-pink-200"
                    : "border-emerald-300/25 bg-emerald-300/10 text-emerald-200/90",
                )}
                style={{ fontFamily: "var(--font-technical)" }}
              >
                <span>{experience.year}</span>
                <span className={isCreative ? "text-pink-300/50" : "text-emerald-300/50"}>·</span>
                <span>{typeLabel}</span>
              </div>

              <h2
                className="mb-2 text-balance text-3xl font-light text-white md:text-5xl"
                style={{ fontFamily: isCreative ? "var(--font-creative)" : "var(--font-technical)" }}
              >
                {experience.company}
              </h2>
              <p
                className="text-[11px] uppercase tracking-[0.25em] text-white/60 md:text-xs"
                style={{ fontFamily: "var(--font-technical)" }}
              >
                {experience.role}
              </p>

              {experience.technologies && experience.technologies.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {experience.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="rounded-sm border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] text-white/75 backdrop-blur-sm"
                      style={{ fontFamily: "var(--font-technical)" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-10 p-6 md:p-12">
            {sections.map(({ label, body, accent }) => (
              <section key={label}>
                <h3
                  className={cn(
                    "mb-3 text-[10px] uppercase tracking-[0.3em]",
                    accent ? (isCreative ? "text-pink-300/80" : "text-emerald-300/80") : "text-white/45",
                  )}
                  style={{ fontFamily: "var(--font-technical)" }}
                >
                  {label}
                </h3>
                <p
                  className={cn(
                    "text-pretty text-base leading-relaxed md:text-lg",
                    accent ? "font-medium text-white" : "text-white/80",
                  )}
                >
                  {body}
                </p>
                <div className="mt-8 h-px w-full bg-white/10 last:hidden" />
              </section>
            ))}
          </div>
        </div>
      </CornerFrame>
    </div>
  )
}
