import { CardTile } from "@/components/friends/molecules/card-tile"
import type { Card } from "@/lib/friends/types"
import { cn } from "@/lib/utils"

interface SearchGridProps {
  cards: Card[]
  /** Whether the underlying deck (before filtering) has any cards at all. */
  hasAnyCards: boolean
  className?: string
}

/** Grid of card tiles, with distinct empty states for "no results" vs "empty deck". */
export function SearchGrid({ cards, hasAnyCards, className }: SearchGridProps) {
  if (cards.length === 0) {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border px-6 py-16 text-center",
          className,
        )}
      >
        <p className="font-[family-name:var(--font-creative)] text-lg text-foreground">
          {hasAnyCards ? "Ninguna carta coincide con tu búsqueda." : "El mazo todavía no tiene cartas."}
        </p>
        <p className="font-[family-name:var(--font-technical)] text-xs text-muted-foreground">
          {hasAnyCards ? "Prueba con otra palabra o quita algunos filtros." : "Vuelve pronto."}
        </p>
      </div>
    )
  }

  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {cards.map((card) => (
        <li key={card.id}>
          <CardTile card={card} />
        </li>
      ))}
    </ul>
  )
}
