import type { Card } from "@/lib/friends/types"
import { cn } from "@/lib/utils"

interface CardIdentityHeaderProps {
  card: Card
  className?: string
}

/** Identity block for the detail view: name, arcana, number, traditional equivalent, core message. */
export function CardIdentityHeader({ card, className }: CardIdentityHeaderProps) {
  return (
    <header className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-wrap items-center gap-2 font-[family-name:var(--font-technical)] text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span>{card.arcana}</span>
        {typeof card.number === "number" ? (
          <>
            <span aria-hidden>·</span>
            <span>{card.number}</span>
          </>
        ) : null}
        {card.traditionalEquivalent ? (
          <>
            <span aria-hidden>·</span>
            <span>{card.traditionalEquivalent}</span>
          </>
        ) : null}
      </div>

      <h1 className="font-[family-name:var(--font-creative)] text-3xl font-medium leading-tight text-foreground sm:text-4xl">
        {card.name}
      </h1>

      {card.coreMessage ? (
        <p className="max-w-2xl font-[family-name:var(--font-creative)] text-lg leading-relaxed text-[var(--creative-accent)]">
          {card.coreMessage}
        </p>
      ) : null}
    </header>
  )
}
