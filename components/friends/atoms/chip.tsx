import type React from "react"

import { cn } from "@/lib/utils"

interface ChipBaseProps {
  children: React.ReactNode
  className?: string
  tone?: "default" | "accent"
}

interface ChipStaticProps extends ChipBaseProps {
  variant?: "static"
}

interface ChipToggleProps extends ChipBaseProps {
  variant: "toggle"
  selected: boolean
  onToggle: () => void
}

type ChipProps = ChipStaticProps | ChipToggleProps

/**
 * Small pill used for keywords, tags and toggleable facets.
 * `variant="static"` (default) renders read-only metadata (e.g. keywords on
 * a card). `variant="toggle"` renders an accessible pressed button used by
 * facet filters.
 */
export function Chip(props: ChipProps) {
  const base = cn(
    "inline-flex items-center rounded-full border px-3 py-1 text-xs tracking-wide",
    "font-[family-name:var(--font-technical)]",
    "transition-colors duration-200",
  )

  if (props.variant === "toggle") {
    const { selected, onToggle, className, tone = "default", children } = props
    return (
      <button
        type="button"
        aria-pressed={selected}
        onClick={onToggle}
        className={cn(
          base,
          "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          selected
            ? tone === "accent"
              ? "border-[var(--creative-accent)] bg-[var(--creative-accent)]/15 text-[var(--creative-accent)]"
              : "border-primary bg-primary text-primary-foreground"
            : "border-border bg-transparent text-muted-foreground hover:border-muted-foreground hover:text-foreground",
          className,
        )}
      >
        {children}
      </button>
    )
  }

  const { className, tone = "default", children } = props
  return (
    <span
      className={cn(
        base,
        tone === "accent"
          ? "border-[var(--creative-accent)]/40 bg-[var(--creative-accent)]/10 text-[var(--creative-accent)]"
          : "border-border bg-muted/40 text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  )
}
