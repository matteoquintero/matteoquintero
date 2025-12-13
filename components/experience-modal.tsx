"use client"

import { useEffect } from "react"
import type { Experience } from "@/lib/types"

interface ExperienceModalProps {
  experience: Experience
  onClose: () => void
}

export function ExperienceModal({ experience, onClose }: ExperienceModalProps) {
  const isCreative = experience.type === "creative"
  const imageUrl =
    experience.image || `https://placehold.co/1200x675/1a1a1a/666666?text=${encodeURIComponent(experience.role)}`

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-card rounded-lg shadow-2xl animate-in zoom-in-95 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
          aria-label="Close modal"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Hero image */}
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={`${experience.company} project`}
            className="w-full h-full object-cover"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

          {/* Header info */}
          <div className="absolute bottom-6 left-6 right-6">
            <div
              className={`inline-block px-3 py-1 rounded-full text-xs font-mono mb-3 ${
                isCreative
                  ? "bg-gradient-to-r from-[var(--creative-from)] to-[var(--creative-to)] text-white"
                  : "bg-[var(--technical-base)] text-[var(--technical-accent)]"
              }`}
            >
              {experience.year}
            </div>
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-light mb-2 text-balance ${
                isCreative ? "" : "font-mono"
              }`}
              style={{
                fontFamily: isCreative ? "var(--font-creative)" : "var(--font-technical)",
              }}
            >
              {experience.company}
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">{experience.role}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10 space-y-8">
          {/* Problem */}
          <section>
            <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-3 font-mono">01 — El Problema</h3>
            <p className="text-lg md:text-xl leading-relaxed text-pretty">{experience.problem}</p>
          </section>

          <div className="w-full h-[1px] bg-border" />

          {/* Decision */}
          <section>
            <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-3 font-mono">
              02 — La Decisión Clave
            </h3>
            <p className="text-lg md:text-xl leading-relaxed text-pretty">{experience.decision}</p>
          </section>

          <div className="w-full h-[1px] bg-border" />

          {/* Solution */}
          <section>
            <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-3 font-mono">
              03 — Cómo se Resolvió
            </h3>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">{experience.solution}</p>
          </section>

          <div className="w-full h-[1px] bg-border" />

          {/* Result */}
          <section>
            <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-3 font-mono">04 — Impacto</h3>
            <p
              className={`text-lg md:text-xl leading-relaxed font-medium text-pretty ${
                isCreative ? "text-[var(--creative-accent)]" : "text-[var(--technical-accent)]"
              }`}
            >
              {experience.result}
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
