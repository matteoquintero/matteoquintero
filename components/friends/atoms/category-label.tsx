import { CATEGORY_LABELS, type Category } from "@/lib/friends/types"
import { cn } from "@/lib/utils"

interface CategoryLabelProps {
  category: Category
  className?: string
}

/** Maps a `Category` to its ES display label (CATEGORY_LABELS_ES). */
export function CategoryLabel({ category, className }: CategoryLabelProps) {
  return (
    <span
      className={cn(
        "font-[family-name:var(--font-technical)] text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground",
        className,
      )}
    >
      {CATEGORY_LABELS[category] ?? category}
    </span>
  )
}
