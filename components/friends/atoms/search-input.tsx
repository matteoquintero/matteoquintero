"use client"

import { Search, X } from "lucide-react"

import { cn } from "@/lib/utils"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  id?: string
  className?: string
}

/**
 * Controlled search field. Owns no state of its own — `SearchExplorer`
 * decides what the query means.
 */
export function SearchInput({ value, onChange, placeholder = "Buscar...", id, className }: SearchInputProps) {
  return (
    <div className={cn("relative flex items-center", className)}>
      <Search aria-hidden className="pointer-events-none absolute left-3.5 h-4 w-4 text-muted-foreground" />
      <input
        id={id}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className={cn(
          "w-full rounded-full border border-border bg-card/60 py-2.5 pl-10 pr-9 text-sm text-foreground",
          "placeholder:text-muted-foreground",
          "font-[family-name:var(--font-creative)]",
          "outline-none transition-colors focus-visible:border-[var(--creative-accent)] focus-visible:ring-2 focus-visible:ring-[var(--creative-accent)]/30",
        )}
      />
      {value.length > 0 ? (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Limpiar búsqueda"
          className="absolute right-3 rounded-full p-0.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X aria-hidden className="h-3.5 w-3.5" />
        </button>
      ) : null}
    </div>
  )
}
