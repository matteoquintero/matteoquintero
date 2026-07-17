"use client"

import { Chip } from "@/components/friends/atoms/chip"
import { cn } from "@/lib/utils"

interface FacetOption {
  value: string
  label: string
}

interface FacetGroupProps {
  label: string
  options: FacetOption[]
  selected: string[]
  onToggle: (value: string) => void
  className?: string
}

/** Labeled group of toggleable facet chips (category / intensity / tag). */
export function FacetGroup({ label, options, selected, onToggle, className }: FacetGroupProps) {
  if (options.length === 0) return null

  return (
    <fieldset className={cn("flex flex-col gap-2.5", className)}>
      <legend className="font-[family-name:var(--font-technical)] text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Chip key={option.value} variant="toggle" tone="accent" selected={selected.includes(option.value)} onToggle={() => onToggle(option.value)}>
            {option.label}
          </Chip>
        ))}
      </div>
    </fieldset>
  )
}
