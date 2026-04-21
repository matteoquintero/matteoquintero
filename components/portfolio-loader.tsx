"use client"

import { useEffect, useRef, useState } from "react"

import { WebGLShader } from "@/components/ui/web-gl-shader"
import type { SiteCopy, SiteLists } from "@/lib/types"
import { cn } from "@/lib/utils"

interface PortfolioLoaderProps {
  copy: SiteCopy
  lists: SiteLists
}

const MIN_DURATION_MS = 1400
const FADE_MS = 700

export function PortfolioLoader({ copy, lists }: PortfolioLoaderProps) {
  const designLines = lists["loader.design_lines"] ?? []
  const codeLines = lists["loader.code_lines"] ?? []

  const [progress, setProgress] = useState(0)
  const [fading, setFading] = useState(false)
  const [gone, setGone] = useState(false)
  const [designIdx, setDesignIdx] = useState(0)
  const [codeIdx, setCodeIdx] = useState(0)
  const startRef = useRef(0)

  useEffect(() => {
    startRef.current = performance.now()

    let raf = 0
    const tick = () => {
      setProgress((p) => (p >= 92 ? p : p + (92 - p) * 0.04))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const rotate = window.setInterval(() => {
      setDesignIdx((i) => (designLines.length > 0 ? (i + 1) % designLines.length : 0))
      setCodeIdx((i) => (codeLines.length > 0 ? (i + 1) % codeLines.length : 0))
    }, 520)

    const finish = () => {
      const elapsed = performance.now() - startRef.current
      const wait = Math.max(0, MIN_DURATION_MS - elapsed)
      window.setTimeout(() => {
        setProgress(100)
        window.setTimeout(() => setFading(true), 220)
        window.setTimeout(() => setGone(true), 220 + FADE_MS + 80)
      }, wait)
    }

    if (document.readyState === "complete") {
      finish()
    } else {
      window.addEventListener("load", finish, { once: true })
    }

    return () => {
      cancelAnimationFrame(raf)
      clearInterval(rotate)
      window.removeEventListener("load", finish)
    }
  }, [designLines.length, codeLines.length])

  useEffect(() => {
    if (gone || fading) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [gone, fading])

  if (gone) return null

  const designLine = designLines[designIdx] ?? ""
  const codeLine = codeLines[codeIdx] ?? ""

  return (
    <div
      aria-hidden
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-black",
        "transition-opacity ease-out",
        fading ? "pointer-events-none opacity-0" : "opacity-100",
      )}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <WebGLShader
        className="absolute inset-0 h-full w-full"
        xScale={1.2}
        yScale={0.45}
        distortion={0.08}
        timeScale={0.012}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

      <div className="relative z-10 w-full max-w-xl px-6">
        <div className="relative border border-white/15 bg-black/45 backdrop-blur-sm">
          <span className="absolute -top-px -left-px h-3 w-3 border-t border-l border-white/60" />
          <span className="absolute -top-px -right-px h-3 w-3 border-t border-r border-white/60" />
          <span className="absolute -bottom-px -left-px h-3 w-3 border-b border-l border-white/60" />
          <span className="absolute -bottom-px -right-px h-3 w-3 border-b border-r border-white/60" />

          <div
            className="flex items-center justify-between border-b border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60"
            style={{ fontFamily: "var(--font-technical)" }}
          >
            <span>{copy["loader.namespace"]}</span>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
              <span className="relative flex h-1.5 w-1.5 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 divide-x divide-white/10">
            <div className="p-4 sm:p-5">
              <p
                className="mb-3 text-[9px] uppercase tracking-[0.3em] text-white/40"
                style={{ fontFamily: "var(--font-technical)" }}
              >
                {copy["loader.track_design"]}
              </p>
              <p
                className="text-[13px] leading-snug text-white/85"
                style={{ fontFamily: "var(--font-creative)" }}
                key={`d-${designIdx}`}
              >
                <span className="mr-2 text-pink-300/90">▸</span>
                <span>{designLine}</span>
              </p>
            </div>
            <div className="p-4 sm:p-5">
              <p
                className="mb-3 text-[9px] uppercase tracking-[0.3em] text-white/40"
                style={{ fontFamily: "var(--font-technical)" }}
              >
                {copy["loader.track_code"]}
              </p>
              <p
                className="font-mono text-[12px] leading-snug text-white/85"
                style={{ fontFamily: "var(--font-technical)" }}
                key={`c-${codeIdx}`}
              >
                <span className="mr-2 text-emerald-300/90">$</span>
                <span>{codeLine}</span>
                <span className="ml-0.5 inline-block h-3 w-1.5 translate-y-[2px] bg-white/70 animate-[pulse-line_1s_ease-in-out_infinite]" />
              </p>
            </div>
          </div>

          <div
            className="border-t border-white/10 px-4 py-3 font-mono"
            style={{ fontFamily: "var(--font-technical)" }}
          >
            <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-white/55">
              <span>{copy["loader.compiling"]}</span>
              <span className="tabular-nums text-white/75">
                {String(Math.round(progress)).padStart(3, "0")}%
              </span>
            </div>
            <div className="relative h-[2px] w-full overflow-hidden bg-white/10">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-pink-400 via-fuchsia-300 to-white"
                style={{
                  width: `${progress}%`,
                  transition: "width 280ms cubic-bezier(0.2, 0.8, 0.2, 1)",
                }}
              />
            </div>
          </div>
        </div>

        <p
          className="mt-6 text-center text-[10px] uppercase tracking-[0.4em] text-white/45"
          style={{ fontFamily: "var(--font-technical)" }}
        >
          {copy["loader.tagline"]}
        </p>
      </div>
    </div>
  )
}
