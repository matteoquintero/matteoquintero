import Link from "next/link"

import { Chip } from "@/components/friends/atoms/chip"
import { ROUTE_BASE } from "@/lib/friends/config"
import type { Card } from "@/lib/friends/types"
import { cn } from "@/lib/utils"

interface CardTileProps {
  card: Card
  className?: string
}

/** Grid tile: name + a handful of keyword chips, links to the card detail. */
export function CardTile({ card, className }: CardTileProps) {
  const previewKeywords = card.keywords.slice(0, 3)

  return (
    <Link
      href={`${ROUTE_BASE}/${card.id}`}
      className={cn(
        "group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-card/50 p-5",
        "transition-all duration-300 hover:border-[var(--creative-accent)]/50 hover:bg-card/80",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--creative-accent)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[var(--creative-accent)]/0 blur-2xl transition-colors duration-300 group-hover:bg-[var(--creative-accent)]/15"
      />

      <div className="flex items-baseline justify-between gap-3">
        <span className="font-[family-name:var(--font-technical)] text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {card.arcana}
          {typeof card.number === "number" ? ` · ${card.number}` : null}
        </span>
      </div>

      <h3 className="font-[family-name:var(--font-creative)] text-lg font-medium leading-snug text-foreground">
        {card.name}
      </h3>

      {previewKeywords.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {previewKeywords.map((keyword) => (
            <Chip key={keyword}>{keyword}</Chip>
          ))}
        </div>
      ) : null}
    </Link>
  )
}
