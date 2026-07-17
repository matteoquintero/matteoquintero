"use client"

import { SlidersHorizontal, X } from "lucide-react"

import { FacetGroup } from "@/components/friends/molecules/facet-group"
import { CATEGORY_LABELS } from "@/lib/friends/types"
import type { Category, FacetState, FacetVocabulary } from "@/lib/friends/types"
import { cn } from "@/lib/utils"

interface FilterSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  facets: FacetVocabulary
  selected: FacetState
  onToggleCategory: (category: Category) => void
  onToggleIntensity: (intensity: number) => void
  onToggleTag: (tag: string) => void
  onClear: () => void
  className?: string
}

/**
 * Facet filters. Renders as a bottom sheet on mobile (opened via a "Filtros"
 * trigger) and as an always-visible bar on desktop (`lg:` breakpoint).
 */
export function FilterSheet({
  open,
  onOpenChange,
  facets,
  selected,
  onToggleCategory,
  onToggleIntensity,
  onToggleTag,
  onClear,
  className,
}: FilterSheetProps) {
  const activeCount = selected.categories.length + selected.intensities.length + selected.tags.length

  const groups = (
    <div className="flex flex-col gap-6">
      <FacetGroup
        label="Categoría"
        options={facets.categories.map((category) => ({ value: category, label: CATEGORY_LABELS[category] ?? category }))}
        selected={selected.categories}
        onToggle={(value) => onToggleCategory(value as Category)}
      />
      <FacetGroup
        label="Intensidad"
        options={facets.intensities.map((intensity) => ({ value: String(intensity), label: String(intensity) }))}
        selected={selected.intensities.map(String)}
        onToggle={(value) => onToggleIntensity(Number(value))}
      />
      <FacetGroup
        label="Tags"
        options={facets.tags.map((tag) => ({ value: tag, label: tag }))}
        selected={selected.tags}
        onToggle={onToggleTag}
      />
    </div>
  )

  return (
    <div className={cn(className)}>
      {/* Mobile trigger */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => onOpenChange(true)}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2.5 font-[family-name:var(--font-technical)] text-xs uppercase tracking-[0.12em] text-foreground transition-colors hover:border-[var(--creative-accent)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--creative-accent)]/40"
        >
          <SlidersHorizontal aria-hidden className="h-3.5 w-3.5" />
          Filtros
          {activeCount > 0 ? (
            <span className="rounded-full bg-[var(--creative-accent)] px-1.5 py-0.5 text-[10px] text-black">
              {activeCount}
            </span>
          ) : null}
        </button>

        {open ? (
          <div className="fixed inset-0 z-50 flex flex-col justify-end">
            <button
              type="button"
              aria-label="Cerrar filtros"
              onClick={() => onOpenChange(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Filtros"
              className="relative max-h-[75vh] overflow-y-auto rounded-t-3xl border-t border-border bg-card p-6 pb-10 animate-in slide-in-from-bottom duration-300"
            >
              <div className="mb-5 flex items-center justify-between">
                <p className="font-[family-name:var(--font-creative)] text-lg text-foreground">Filtros</p>
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  aria-label="Cerrar"
                  className="rounded-full p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X aria-hidden className="h-4 w-4" />
                </button>
              </div>
              {groups}
              {activeCount > 0 ? (
                <button
                  type="button"
                  onClick={onClear}
                  className="mt-6 w-full rounded-full border border-border py-2.5 font-[family-name:var(--font-technical)] text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  Limpiar filtros
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>

      {/* Desktop bar */}
      <div className="hidden rounded-2xl border border-border bg-card/40 p-5 lg:block">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-[family-name:var(--font-technical)] text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Filtros
          </p>
          {activeCount > 0 ? (
            <button
              type="button"
              onClick={onClear}
              className="font-[family-name:var(--font-technical)] text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Limpiar
            </button>
          ) : null}
        </div>
        {groups}
      </div>
    </div>
  )
}
