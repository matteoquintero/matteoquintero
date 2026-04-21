"use client"

import { useEffect, useRef, useState } from "react"
import { Linkedin, Mail, Phone } from "lucide-react"

import { CornerFrame } from "@/components/ui/corner-frame"
import { GooeyText } from "@/components/ui/gooey-text-morphing"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import { WebGLShader } from "@/components/ui/web-gl-shader"
import type { Profile, SiteCopy, SiteLists } from "@/lib/types"

interface BrainHeroProps {
  profile: Profile
  copy: SiteCopy
  lists: SiteLists
}

export function BrainHero({ profile, copy, lists }: BrainHeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const heroHeight = window.innerHeight
      setScrollProgress(Math.min(scrolled / heroHeight, 1))
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const scrollToTimeline = () => {
    const el = document.querySelector("[data-timeline-container]")
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const creativeKeywords = lists["hero.creative_keywords"] ?? []
  const technicalKeywords = lists["hero.technical_keywords"] ?? []
  const morphWords = lists["hero.morph_words"] ?? []
  const shouldMorph = morphWords.length >= 2

  const whatsappHref = profile.whatsapp_number
    ? `https://wa.me/${profile.whatsapp_number.replace(/[^\d]/g, "")}`
    : undefined

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-black"
      style={{ opacity: 1 - scrollProgress * 0.5 }}
    >
      <WebGLShader
        className="absolute inset-0 h-full w-full"
        xScale={1.0}
        yScale={0.5}
        distortion={0.06}
        timeScale={0.007}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Top bar */}
      <div className="absolute inset-x-0 top-6 z-20 flex items-start justify-between px-6 md:top-8">
        <div>
          <h2
            className="text-sm font-medium text-white/90 md:text-base"
            style={{ fontFamily: "var(--font-creative)" }}
          >
            {profile.name}
          </h2>
          <p
            className="text-[9px] uppercase tracking-[0.3em] text-white/50 md:text-[10px]"
            style={{ fontFamily: "var(--font-technical)" }}
          >
            {profile.role}
          </p>
        </div>

        <div
          className="hidden items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/55 md:flex"
          style={{ fontFamily: "var(--font-technical)" }}
        >
          {profile.linkedin_url && (
            <a
              href={profile.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Linkedin className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">{copy["hero.contact.linkedin"]}</span>
            </a>
          )}
          {whatsappHref && (
            <>
              <span className="text-white/20">·</span>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 transition-colors hover:text-white"
              >
                <Phone className="h-3.5 w-3.5" />
                <span className="hidden lg:inline">{copy["hero.contact.whatsapp"]}</span>
              </a>
            </>
          )}
          {profile.email && (
            <>
              <span className="text-white/20">·</span>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-1.5 transition-colors hover:text-white"
              >
                <Mail className="h-3.5 w-3.5" />
                <span className="hidden lg:inline">{copy["hero.contact.email"]}</span>
              </a>
            </>
          )}
        </div>
      </div>

      {/* Avatar */}
      <div className="absolute left-1/2 top-20 z-10 -translate-x-1/2 md:top-24">
        <div className="h-14 w-14 overflow-hidden rounded-full border border-white/25 md:h-16 md:w-16">
          <img
            src={profile.profile_image || "/profile.jpg"}
            alt={profile.name}
            className="h-full w-full object-cover grayscale"
          />
        </div>
      </div>

      {/* Main frame */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 pb-24 pt-44 md:pb-32 md:pt-48">
        <CornerFrame
          className="w-full bg-black/35 p-1.5 backdrop-blur-[2px]"
          tone="bright"
        >
          <CornerFrame
            variant="inner"
            tone="subtle"
            cornerSize="sm"
            className="px-5 py-8 md:px-10 md:py-12"
          >
            <p
              className="text-center text-[10px] uppercase tracking-[0.4em] text-white/50"
              style={{ fontFamily: "var(--font-technical)" }}
            >
              {profile.micro_context}
            </p>

            <div className="mt-8 grid grid-cols-2 divide-x divide-white/10">
              <div className="p-4 md:p-6">
                <p
                  className="mb-3 text-[9px] uppercase tracking-[0.3em] text-pink-300/80"
                  style={{ fontFamily: "var(--font-technical)" }}
                >
                  {copy["hero.label.creative_track"]}
                </p>
                <ul className="space-y-1.5">
                  {creativeKeywords.map((k, i) => (
                    <li
                      key={k}
                      className="text-sm text-white/80 md:text-[15px]"
                      style={{
                        fontFamily: "var(--font-creative)",
                        animation: "float 4s ease-in-out infinite",
                        animationDelay: `${i * 0.4}s`,
                        transform: `translateX(${mousePosition.x * 6 - 3}px)`,
                        transition: "transform 0.3s ease-out",
                      }}
                    >
                      <span className="mr-2 text-pink-300/70">▸</span>
                      {k}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 text-right md:p-6">
                <p
                  className="mb-3 text-[9px] uppercase tracking-[0.3em] text-emerald-300/80"
                  style={{ fontFamily: "var(--font-technical)" }}
                >
                  {copy["hero.label.technical_track"]}
                </p>
                <ul className="space-y-1.5">
                  {technicalKeywords.map((k) => (
                    <li
                      key={k}
                      className="font-mono text-xs text-white/80 md:text-[13px]"
                      style={{
                        fontFamily: "var(--font-technical)",
                        transform: `translateX(${-mousePosition.x * 6 + 3}px)`,
                        transition: "transform 0.3s ease-out",
                      }}
                    >
                      {k}
                      <span className="ml-2 text-emerald-300/70">$</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 text-center">
              <h1
                className="text-3xl font-light leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl"
                style={{ fontFamily: "var(--font-creative)" }}
              >
                {profile.headline_creative}
              </h1>
              {shouldMorph ? (
                <div className="relative h-[4.5rem] md:h-[7rem] lg:h-[8rem]">
                  <GooeyText
                    texts={morphWords}
                    morphTime={1.1}
                    cooldownTime={1.4}
                    className="h-full w-full"
                    textClassName="text-5xl md:text-[72pt] lg:text-[88pt] font-bold tracking-tight bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent"
                  />
                </div>
              ) : (
                profile.headline_technical && (
                  <div
                    className="bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-[72pt] lg:text-[88pt]"
                    style={{ fontFamily: "var(--font-technical)" }}
                  >
                    {profile.headline_technical}
                  </div>
                )
              )}
              <h1
                className="text-2xl font-light leading-[1.05] tracking-tight text-white/80 md:text-4xl lg:text-5xl"
                style={{ fontFamily: "var(--font-creative)" }}
              >
                {profile.headline_action}
              </h1>
            </div>

            <div className="mt-10 flex flex-col items-center gap-5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <p
                  className="text-[10px] uppercase tracking-[0.3em] text-emerald-300/90 md:text-[11px]"
                  style={{ fontFamily: "var(--font-technical)" }}
                >
                  {copy["hero.availability"]}
                </p>
              </div>

              <LiquidButton
                onClick={scrollToTimeline}
                size="xl"
                className="rounded-full border border-white/25 text-white hover:text-white"
              >
                <span
                  style={{ fontFamily: "var(--font-technical)" }}
                  className="tracking-wider"
                >
                  {copy["hero.cta.scroll_timeline"]}
                </span>
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M8 3v10M3 8l5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </LiquidButton>
            </div>
          </CornerFrame>
        </CornerFrame>
      </div>

      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/45"
        style={{
          opacity: Math.max(0, 1 - scrollProgress * 3),
          animation: "fade-in-out 2s ease-in-out infinite",
        }}
      >
        <span
          className="text-[9px] uppercase tracking-[0.3em] md:text-[10px]"
          style={{ fontFamily: "var(--font-technical)" }}
        >
          {profile.scroll_text}
        </span>
        <div className="h-10 w-[1px] bg-white/30" />
      </div>
    </section>
  )
}
