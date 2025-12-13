"use client"

import { useEffect, useRef, useState } from "react"

export function BrainHero() {
  const heroRef = useRef<HTMLElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return

      const scrolled = window.scrollY
      const heroHeight = window.innerHeight
      const progress = Math.min(scrolled / heroHeight, 1)

      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Creative keywords
  const creativeKeywords = [
    { text: "Intuición", delay: "0s" },
    { text: "Producto", delay: "1s" },
    { text: "Narrativa", delay: "2s" },
    { text: "Creatividad", delay: "3s" },
    { text: "Diseño", delay: "4s" },
  ]

  // Technical keywords
  const technicalKeywords = [
    { text: "Arquitectura", delay: "0.5s" },
    { text: "Sistemas", delay: "1.5s" },
    { text: "Escalabilidad", delay: "2.5s" },
    { text: "Backend", delay: "3.5s" },
    { text: "Datos", delay: "4.5s" },
  ]

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        opacity: 1 - scrollProgress * 0.5,
      }}
    >
      {/* Brain Container */}
      <div
        className="relative w-full max-w-7xl mx-auto px-6"
        style={{
          transform: `scale(${1 - scrollProgress * 0.3})`,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[85vh]">
          {/* LEFT SIDE - CREATIVE */}
          <div className="relative overflow-hidden">
            {/* Gradient background with noise */}
            <div
              className="absolute inset-0 opacity-90"
              style={{
                background:
                  "radial-gradient(circle at 30% 50%, var(--creative-from), var(--creative-via), var(--creative-to))",
              }}
            />

            {/* Noise overlay */}
            <div
              className="absolute inset-0 opacity-20 mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E\")",
                animation: "noise 8s steps(10) infinite",
              }}
            />

            {/* Organic shapes */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-64 md:w-96 md:h-96">
                {/* Animated blob shapes */}
                <div
                  className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full opacity-40 blur-3xl"
                  style={{
                    background: "var(--creative-accent)",
                    animation: "float 6s ease-in-out infinite",
                  }}
                />
                <div
                  className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full opacity-30 blur-3xl"
                  style={{
                    background: "var(--creative-from)",
                    animation: "float 8s ease-in-out infinite",
                    animationDelay: "1s",
                  }}
                />
              </div>
            </div>

            {/* Creative keywords */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8">
              {creativeKeywords.map((keyword, i) => (
                <div
                  key={keyword.text}
                  className="text-white/90 text-sm md:text-base font-light tracking-wide"
                  style={{
                    fontFamily: "var(--font-creative)",
                    animation: "float 4s ease-in-out infinite",
                    animationDelay: keyword.delay,
                    transform: `translateX(${-20 + i * 8}px)`,
                  }}
                >
                  {keyword.text}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE - TECHNICAL */}
          <div className="relative overflow-hidden bg-[var(--technical-base)]">
            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(var(--technical-grid) 1px, transparent 1px),
                  linear-gradient(90deg, var(--technical-grid) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
                animation: "grid-pulse 3s ease-in-out infinite",
              }}
            />

            {/* Blueprint lines */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-[1px]"
                  style={{
                    left: "10%",
                    right: "10%",
                    top: `${15 + i * 10}%`,
                    background: "var(--technical-grid)",
                    opacity: 0.4,
                  }}
                />
              ))}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-[1px]"
                  style={{
                    top: "15%",
                    bottom: "15%",
                    left: `${20 + i * 12}%`,
                    background: "var(--technical-grid)",
                    opacity: 0.3,
                  }}
                />
              ))}
            </div>

            {/* Geometric elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div
                  className="absolute inset-0 border-2 opacity-30"
                  style={{
                    borderColor: "var(--technical-accent)",
                    transform: "rotate(45deg)",
                  }}
                />
                <div
                  className="absolute inset-8 border opacity-20"
                  style={{
                    borderColor: "var(--technical-grid)",
                  }}
                />
              </div>
            </div>

            {/* Technical keywords */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8">
              {technicalKeywords.map((keyword, i) => (
                <div
                  key={keyword.text}
                  className="text-sm md:text-base font-mono tracking-wider uppercase"
                  style={{
                    fontFamily: "var(--font-technical)",
                    color: "var(--technical-accent)",
                    opacity: 0.85,
                    transform: `translateX(${20 - i * 8}px)`,
                  }}
                >
                  {keyword.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Connection lines between hemispheres */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="absolute inset-0 w-full h-full" style={{ opacity: 0.6 }}>
              <line
                x1="50%"
                y1={`${30 + i * 10}%`}
                x2="50%"
                y2={`${35 + i * 10}%`}
                stroke="var(--pulse-color)"
                strokeWidth="2"
                style={{
                  animation: "pulse-line 3s ease-in-out infinite",
                  animationDelay: `${i * 0.3}s`,
                }}
              />
              {/* Nodes */}
              <circle
                cx="50%"
                cy={`${30 + i * 10}%`}
                r="4"
                fill="var(--pulse-color)"
                style={{
                  animation: "pulse-line 3s ease-in-out infinite",
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            </svg>
          ))}
        </div>

        {/* Central tagline */}
        <div
          className="absolute inset-x-0 bottom-12 md:bottom-20 flex justify-center px-6"
          style={{
            opacity: 1 - scrollProgress * 2,
          }}
        >
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-light text-center max-w-4xl text-balance">
            <span style={{ fontFamily: "var(--font-creative)" }} className="text-[var(--creative-accent)]">
              Construyo sistemas
            </span>
            <span className="text-foreground mx-3">que</span>
            <span style={{ fontFamily: "var(--font-technical)" }} className="text-[var(--technical-accent)]">
              resuelven problemas
            </span>
          </h1>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
        style={{
          opacity: 1 - scrollProgress * 3,
        }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-muted-foreground/30" />
      </div>
    </section>
  )
}
