"use client"

import { useEffect, useRef, useState } from "react"
import { Linkedin, Mail, Phone } from "lucide-react"

export function BrainHero() {
  const heroRef = useRef<HTMLElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })

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
      <div className="absolute top-0 left-6 right-6 flex items-center justify-between z-10">
        {/* Name and role - top left */}
        <div className="text-left">
          <h2 className="text-base md:text-lg font-medium text-foreground/90">Mateo Quintero</h2>
          <p className="text-xs md:text-sm text-muted-foreground/70 tracking-wide">CTO · Sistemas · Producto</p>
        </div>

        {/* Contact links - top right */}
        <div className="hidden md:flex items-center gap-3 text-xs text-muted-foreground/60">
          <a
            href="https://linkedin.com/in/matteoquintero"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground/80 transition-colors flex items-center gap-1.5"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">LinkedIn</span>
          </a>
          <span className="text-muted-foreground/30">·</span>
          <a
            href="https://wa.me/573193888291"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground/80 transition-colors flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">WhatsApp</span>
          </a>
          <span className="text-muted-foreground/30">·</span>
          <a
            href="mailto:matteoquintero@gmail.com.com"
            className="hover:text-foreground/80 transition-colors flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Email</span>
          </a>
        </div>
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
        <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-2 border-border/30">
          <img src="/profile.jpg" alt="Mateo Quintero" className="w-full h-full object-cover grayscale" />
        </div>
      </div>

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
                    transform: `translate(${mousePosition.x * 20 - 10}px, ${mousePosition.y * 20 - 10}px)`,
                    transition: "transform 0.3s ease-out",
                  }}
                />
                <div
                  className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full opacity-30 blur-3xl"
                  style={{
                    background: "var(--creative-from)",
                    animation: "float 8s ease-in-out infinite",
                    animationDelay: "1s",
                    transform: `translate(${mousePosition.x * -15 + 7.5}px, ${mousePosition.y * -15 + 7.5}px)`,
                    transition: "transform 0.4s ease-out",
                  }}
                />
              </div>
            </div>

            {/* Creative keywords */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8">
              {creativeKeywords.map((keyword, i) => (
                <div
                  key={keyword.text}
                  className="text-white/50 text-sm md:text-base font-light tracking-wide transition-opacity duration-300 hover:opacity-100"
                  style={{
                    fontFamily: "var(--font-creative)",
                    animation: "float 4s ease-in-out infinite",
                    animationDelay: keyword.delay,
                    transform: `translateX(${-20 + i * 8 + mousePosition.x * 10 - 5}px)`,
                    transition: "transform 0.2s ease-out",
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
                    transform: `rotate(${45 + Math.round(mousePosition.x * 2)}deg)`,
                    transition: "transform 0.5s ease-out",
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
                  className="text-sm md:text-base font-mono tracking-wider uppercase transition-opacity duration-300 hover:opacity-100"
                  style={{
                    fontFamily: "var(--font-technical)",
                    color: "var(--technical-accent)",
                    opacity: 0.5,
                    transform: `translateX(${20 - i * 8 + Math.round(mousePosition.x * 5)}px)`,
                    transition: "transform 0.3s ease-out",
                  }}
                >
                  {keyword.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none hidden md:block">
          {/* Irregular dividing line that creates tension */}
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.4 }}>
            <path
              d={`
                M ${50} ${20}
                Q ${50 + Math.sin(Date.now() / 2000) * 2} ${30} ${50} ${40}
                Q ${50 - Math.sin(Date.now() / 1500) * 2} ${50} ${50} ${60}
                Q ${50 + Math.sin(Date.now() / 1800) * 2} ${70} ${50} ${80}
              `}
              stroke="var(--pulse-color)"
              strokeWidth="1"
              fill="none"
              style={{
                opacity: 0.6,
              }}
            />
          </svg>

          {/* Crossing pulses that invade from creative to technical */}
          {[...Array(3)].map((_, i) => (
            <svg key={`cross-${i}`} className="absolute inset-0 w-full h-full">
              <line
                x1="40%"
                y1={`${35 + i * 15}%`}
                x2="60%"
                y2={`${35 + i * 15}%`}
                stroke="var(--creative-accent)"
                strokeWidth="1"
                strokeDasharray="4 4"
                style={{
                  opacity: 0.3,
                  animation: "pulse-cross 4s ease-in-out infinite",
                  animationDelay: `${i * 0.8}s`,
                }}
              />
            </svg>
          ))}

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

        <div
          className="absolute inset-x-0 bottom-12 md:bottom-20 flex flex-col items-center justify-center gap-3 px-6"
          style={{
            opacity: 1 - scrollProgress * 2,
          }}
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-center max-w-4xl text-balance">
            <span style={{ fontFamily: "var(--font-creative)" }} className="text-foreground">
              Diseño{" "}
            </span>
            <span
              style={{ fontFamily: "var(--font-technical)" }}
              className="text-[var(--technical-accent)] font-bold text-4xl md:text-6xl lg:text-7xl"
            >
              sistemas
            </span>
            <span className="text-foreground mx-3">que</span>
            <span style={{ fontFamily: "var(--font-creative)" }} className="text-[var(--creative-accent)]">
              resuelven problemas
            </span>
          </h1>
          {/* Micro-context line */}
          <p className="text-[10px] md:text-xs text-muted-foreground/40 tracking-widest uppercase">
            Portafolio personal
          </p>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
        style={{
          opacity: 1 - scrollProgress * 3,
          animation: "fade-in-out 2s ease-in-out infinite",
        }}
      >
        <span className="text-xs tracking-wide text-center max-w-[180px] leading-relaxed">
          Desliza para ver cómo llegué hasta aquí
        </span>
        <div className="w-[1px] h-12 bg-muted-foreground/30" />
      </div>
    </section>
  )
}
