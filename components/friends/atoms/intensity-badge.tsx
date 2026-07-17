import { cn } from "@/lib/utils"

interface IntensityBadgeProps {
  intensity: number
  max?: number
  className?: string
}

/**
 * Renders a 1–max intensity level as a row of dots, technical-register.
 * Purely presentational; the numeric value is exposed via `aria-label` for
 * screen readers instead of relying on the dot count.
 */
export function IntensityBadge({ intensity, max = 5, className }: IntensityBadgeProps) {
  const dots = Array.from({ length: max }, (_, index) => index < intensity)

  return (
    <span
      role="img"
      aria-label={`Intensidad ${intensity} de ${max}`}
      className={cn(
        "inline-flex items-center gap-2 font-[family-name:var(--font-technical)] text-xs text-muted-foreground",
        className,
      )}
    >
      <span className="flex items-center gap-1">
        {dots.map((filled, index) => (
          <span
            key={index}
            aria-hidden
            className={cn(
              "h-1.5 w-1.5 rounded-full transition-colors",
              filled ? "bg-[var(--technical-accent)]" : "bg-muted",
            )}
          />
        ))}
      </span>
      <span className="tabular-nums">
        {intensity}/{max}
      </span>
    </span>
  )
}
