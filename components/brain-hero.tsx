"use client"

import { useEffect, useRef, useState } from "react"
import { Linkedin, Mail, Phone } from "lucide-react"

import { LocaleSwitcher } from "@/components/locale-switcher"
import { CornerFrame } from "@/components/ui/corner-frame"
import { GooeyText } from "@/components/ui/gooey-text-morphing"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import { WebGLShader } from "@/components/ui/web-gl-shader"
import type { Locale, Profile, SiteCopy, SiteLists } from "@/lib/types"

interface BrainHeroProps {
  profile: Profile
  copy: SiteCopy
  lists: SiteLists
  locale: Locale
}

export function BrainHero({ profile, copy, lists, locale }: BrainHeroProps) {
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
      className="relative h-screen overflow-hidden bg-black"
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

      {/* Header: 3-col grid · name | avatar centered | contacts + locale */}
      <header className="absolute inset-x-0 top-5 z-20 grid grid-cols-3 items-center gap-4 px-5 md:top-6 md:px-8">
        <div className="min-w-0">
          <h2
            className="truncate text-sm font-medium text-white/90 md:text-base"
            style={{ fontFamily: "var(--font-creative)" }}
          >
            {profile.name}
          </h2>
          <p
            className="truncate text-[9px] uppercase tracking-[0.3em] text-white/50 md:text-[10px]"
            style={{ fontFamily: "var(--font-technical)" }}
          >
            {profile.role}
          </p>
        </div>

        <div className="flex items-center justify-center">
          <div className="h-11 w-11 overflow-hidden rounded-full border border-white/25 md:h-12 md:w-12">
            <img
              src={profile.profile_image || "/profile.jpg"}
              alt={profile.name}
              className="h-full w-full object-cover grayscale"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 text-[10px] uppercase tracking-[0.2em] text-white/55">
          <div
            className="hidden items-center gap-3 md:flex"
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
            <span className="text-white/20">·</span>
          </div>
          <LocaleSwitcher initialLocale={locale} />
        </div>
      </header>

      {/* Main content — centered in remaining viewport */}
      <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-4 pb-14 pt-24 md:pb-16 md:pt-28">
        <CornerFrame
          className="w-full bg-black/35 p-1.5 backdrop-blur-[2px]"
          tone="bright"
        >
          <CornerFrame
            variant="inner"
            tone="subtle"
            cornerSize="sm"
            className="px-5 py-6 md:px-10 md:py-8"
          >
            <p
              className="text-center text-[10px] uppercase tracking-[0.4em] text-white/50"
              style={{ fontFamily: "var(--font-technical)" }}
            >
              {profile.micro_context}
            </p>

            <div className="mt-6 grid grid-cols-2 divide-x divide-white/10">
              <div className="py-3 pr-4 md:py-4 md:pr-6">
                <p
                  className="mb-2 text-[9px] uppercase tracking-[0.3em] text-pink-300/80"
                  style={{ fontFamily: "var(--font-technical)" }}
                >
                  {copy["hero.label.creative_track"]}
                </p>
                <ul className="space-y-1">
                  {creativeKeywords.map((k, i) => (
                    <li
                      key={k}
                      className="text-[13px] text-white/80 md:text-sm"
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

              <div className="py-3 pl-4 text-right md:py-4 md:pl-6">
                <p
                  className="mb-2 text-[9px] uppercase tracking-[0.3em] text-emerald-300/80"
                  style={{ fontFamily: "var(--font-technical)" }}
                >
                  {copy["hero.label.technical_track"]}
                </p>
                <ul className="space-y-1">
                  {technicalKeywords.map((k) => (
                    <li
                      key={k}
                      className="font-mono text-[11px] text-white/80 md:text-xs"
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

            <div className="mt-6 text-center md:mt-8">
              <h1
                className="text-2xl font-light leading-[1] tracking-tight text-white md:text-4xl lg:text-5xl"
                style={{ fontFamily: "var(--font-creative)" }}
              >
                {profile.headline_creative}
              </h1>
              {shouldMorph ? (
                <div className="relative h-16 md:h-24 lg:h-28">
                  <GooeyText
                    texts={morphWords}
                    morphTime={1.1}
                    cooldownTime={1.4}
                    className="h-full w-full"
                    textClassName="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent"
                  />
                </div>
              ) : (
                profile.headline_technical && (
                  <div
                    className="bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl lg:text-8xl"
                    style={{ fontFamily: "var(--font-technical)" }}
                  >
                    {profile.headline_technical}
                  </div>
                )
              )}
              <h1
                className="text-lg font-light leading-[1.1] tracking-tight text-white/80 md:text-2xl lg:text-3xl"
                style={{ fontFamily: "var(--font-creative)" }}
              >
                {profile.headline_action}
              </h1>
            </div>

            <div className="mt-6 flex flex-col items-center gap-3 md:mt-8 md:gap-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <p
                  className="text-[10px] uppercase tracking-[0.3em] text-emerald-300/90"
                  style={{ fontFamily: "var(--font-technical)" }}
                >
                  {copy["hero.availability"]}
                </p>
              </div>

              <LiquidButton
                onClick={scrollToTimeline}
                size="lg"
                className="rounded-full border border-white/25 text-white hover:text-white"
              >
                <span
                  style={{ fontFamily: "var(--font-technical)" }}
                  className="tracking-wider"
                >
                  {copy["hero.cta.scroll_timeline"]}
                </span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
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

      {/* Scroll indicator */}
      <div
        className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-white/45"
        style={{
          opacity: Math.max(0, 1 - scrollProgress * 3),
          animation: "fade-in-out 2s ease-in-out infinite",
        }}
      >
        <span
          className="text-[9px] uppercase tracking-[0.3em]"
          style={{ fontFamily: "var(--font-technical)" }}
        >
          {profile.scroll_text}
        </span>
        <div className="h-6 w-[1px] bg-white/30" />
      </div>
    </section>
  )
}
