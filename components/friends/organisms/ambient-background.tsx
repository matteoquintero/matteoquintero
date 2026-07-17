"use client"

import { cn } from "@/lib/utils"

interface AmbientBackgroundProps {
  className?: string
}

/**
 * CSS-only ambient backdrop — slow, low-contrast gradient drift in the
 * brand's creative palette. No WebGL, no JS runtime cost. `motion-reduce:`
 * disables the animation entirely for `prefers-reduced-motion: reduce`
 * (Tailwind's variant reads the media query natively).
 */
export function AmbientBackground({ className }: AmbientBackgroundProps) {
  return (
    <div aria-hidden className={cn("pointer-events-none fixed inset-0 -z-10 overflow-hidden", className)}>
      <div
        className={cn(
          "absolute -left-1/4 top-[-10%] h-[60vh] w-[60vw] rounded-full blur-3xl",
          "bg-[var(--creative-from)]/10",
          "motion-safe:animate-[ambient-drift_28s_ease-in-out_infinite]",
        )}
      />
      <div
        className={cn(
          "absolute -right-1/4 top-1/3 h-[55vh] w-[55vw] rounded-full blur-3xl",
          "bg-[var(--creative-to)]/10",
          "motion-safe:animate-[ambient-drift_34s_ease-in-out_infinite_reverse]",
        )}
      />
      <div
        className={cn(
          "absolute bottom-[-15%] left-1/3 h-[50vh] w-[50vw] rounded-full blur-3xl",
          "bg-[var(--pulse-color)]/8",
          "motion-safe:animate-[ambient-drift_40s_ease-in-out_infinite]",
        )}
      />
    </div>
  )
}
