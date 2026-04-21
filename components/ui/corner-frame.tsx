import type React from "react"

import { cn } from "@/lib/utils"

type CornerFrameProps = {
  children?: React.ReactNode
  className?: string
  variant?: "outer" | "inner"
  tone?: "default" | "bright" | "subtle"
  cornerSize?: "sm" | "md"
  as?: "div" | "section" | "article" | "aside"
}

const borderByVariant = {
  outer: "border-white/15",
  inner: "border-white/10",
}

const cornerToneClasses = {
  default: "border-white/55",
  bright: "border-white/80",
  subtle: "border-white/35",
}

const cornerSizeClasses = {
  sm: "h-2 w-2",
  md: "h-3 w-3",
}

export function CornerFrame({
  children,
  className,
  variant = "outer",
  tone = "default",
  cornerSize = "md",
  as: Tag = "div",
}: CornerFrameProps) {
  const corner = cn(cornerSizeClasses[cornerSize], cornerToneClasses[tone])
  return (
    <Tag className={cn("relative border", borderByVariant[variant], className)}>
      <span aria-hidden className={cn("pointer-events-none absolute -top-px -left-px border-t border-l", corner)} />
      <span aria-hidden className={cn("pointer-events-none absolute -top-px -right-px border-t border-r", corner)} />
      <span aria-hidden className={cn("pointer-events-none absolute -bottom-px -left-px border-b border-l", corner)} />
      <span aria-hidden className={cn("pointer-events-none absolute -bottom-px -right-px border-b border-r", corner)} />
      {children}
    </Tag>
  )
}
