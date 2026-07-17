import { cn } from "@/lib/utils"

interface LightShadowPanelProps {
  light: string[]
  shadow: string[]
  className?: string
}

/** Two side-by-side panels contrasting a card's light[] and shadow[] traits. */
export function LightShadowPanel({ light, shadow, className }: LightShadowPanelProps) {
  if (light.length === 0 && shadow.length === 0) return null

  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", className)}>
      <div className="rounded-2xl border border-[var(--creative-accent)]/30 bg-[var(--creative-accent)]/5 p-5">
        <p className="font-[family-name:var(--font-technical)] text-[11px] uppercase tracking-[0.2em] text-[var(--creative-accent)]">
          Luz
        </p>
        <ul className="mt-3 flex flex-col gap-1.5">
          {light.map((trait) => (
            <li key={trait} className="font-[family-name:var(--font-creative)] text-sm text-foreground">
              {trait}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-border bg-muted/20 p-5">
        <p className="font-[family-name:var(--font-technical)] text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Sombra
        </p>
        <ul className="mt-3 flex flex-col gap-1.5">
          {shadow.map((trait) => (
            <li key={trait} className="font-[family-name:var(--font-creative)] text-sm text-muted-foreground">
              {trait}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
