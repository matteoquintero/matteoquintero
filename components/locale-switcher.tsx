"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

import type { Locale } from "@/lib/types"
import { cn } from "@/lib/utils"

interface LocaleSwitcherProps {
  initialLocale: Locale
  className?: string
}

const OPTIONS: Locale[] = ["es", "en"]

export function LocaleSwitcher({ initialLocale, className }: LocaleSwitcherProps) {
  const router = useRouter()
  const [locale, setLocale] = useState<Locale>(initialLocale)
  const [isPending, startTransition] = useTransition()

  const pick = (next: Locale) => {
    if (next === locale || isPending) return
    document.cookie = `locale=${next};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`
    setLocale(next)
    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        "inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-white/55",
        isPending && "opacity-60",
        className,
      )}
      style={{ fontFamily: "var(--font-technical)" }}
    >
      {OPTIONS.map((opt, i) => (
        <span key={opt} className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => pick(opt)}
            aria-pressed={locale === opt}
            className={cn(
              "cursor-pointer rounded-sm px-1 transition-colors",
              locale === opt ? "text-white" : "hover:text-white/80",
            )}
          >
            {opt.toUpperCase()}
          </button>
          {i < OPTIONS.length - 1 && <span className="text-white/20">/</span>}
        </span>
      ))}
    </div>
  )
}
