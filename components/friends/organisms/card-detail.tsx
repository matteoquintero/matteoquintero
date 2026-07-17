import { CardIdentityHeader } from "@/components/friends/molecules/card-identity-header"
import { Chip } from "@/components/friends/atoms/chip"
import { LightShadowPanel } from "@/components/friends/molecules/light-shadow-panel"
import { CategorySection } from "@/components/friends/organisms/category-section"
import { FRIENDS_CATEGORIES } from "@/lib/friends/schema.mjs"
import type { Card, Category } from "@/lib/friends/types"
import { cn } from "@/lib/utils"

interface CardDetailProps {
  card: Card
  className?: string
}

/**
 * Server component — full detail view for a single card. Composes the
 * identity header, light/shadow panel, meaning/axes/invitation, and all
 * five category sections (always five, defensively defaulted to `[]`).
 */
export function CardDetail({ card, className }: CardDetailProps) {
  return (
    <article className={cn("flex flex-col gap-10", className)}>
      <CardIdentityHeader card={card} />

      {card.meaning ? (
        <p className="max-w-2xl font-[family-name:var(--font-creative)] text-base leading-relaxed text-muted-foreground">
          {card.meaning}
        </p>
      ) : null}

      <LightShadowPanel light={card.light} shadow={card.shadow} />

      {card.axes.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {card.axes.map((axis) => (
            <Chip key={axis} tone="accent">
              {axis}
            </Chip>
          ))}
        </div>
      ) : null}

      {card.invitation ? (
        <blockquote className="border-l-2 border-[var(--creative-accent)] pl-5 font-[family-name:var(--font-creative)] text-lg italic leading-relaxed text-foreground">
          {card.invitation}
        </blockquote>
      ) : null}

      <div className="flex flex-col gap-8">
        {(FRIENDS_CATEGORIES as unknown as Category[]).map((category) => (
          <CategorySection key={category} category={category} questions={card.questions[category] ?? []} />
        ))}
      </div>
    </article>
  )
}
