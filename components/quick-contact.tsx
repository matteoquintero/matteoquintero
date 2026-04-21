"use client"

import { Linkedin, Mail, Phone } from "lucide-react"
import { useEffect, useState } from "react"

import type { Profile, SiteCopy } from "@/lib/types"
import { cn } from "@/lib/utils"

interface QuickContactProps {
  profile: Profile
  copy: SiteCopy
}

export function QuickContact({ profile, copy }: QuickContactProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const evaluate = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.75
      const footer = document.querySelector("footer")
      let footerVisible = false
      if (footer) {
        const rect = footer.getBoundingClientRect()
        footerVisible = rect.top < window.innerHeight - 40
      }
      setVisible(pastHero && !footerVisible)
    }

    evaluate()
    window.addEventListener("scroll", evaluate, { passive: true })
    window.addEventListener("resize", evaluate, { passive: true })
    return () => {
      window.removeEventListener("scroll", evaluate)
      window.removeEventListener("resize", evaluate)
    }
  }, [])

  const whatsappHref = profile.whatsapp_number
    ? `https://wa.me/${profile.whatsapp_number.replace(/\D/g, "")}`
    : undefined

  const linkedinLabel = copy["hero.contact.linkedin"] || "LinkedIn"
  const emailLabel = copy["hero.contact.email"] || "Email"
  const whatsappLabel = copy["hero.contact.whatsapp"] || "WhatsApp"

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed bottom-5 right-5 z-40 transition-all duration-300 ease-out md:bottom-6 md:right-6",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <div
        className="flex items-center rounded-full border border-white/20 bg-black/85 px-1.5 py-1.5 backdrop-blur-md"
        style={{ fontFamily: "var(--font-technical)" }}
      >
        {profile.linkedin_url && (
          <a
            href={profile.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={linkedinLabel}
            title={linkedinLabel}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        )}
        {profile.email && (
          <>
            <span className="mx-0.5 h-4 w-px bg-white/15" />
            <a
              href={`mailto:${profile.email}`}
              aria-label={emailLabel}
              title={profile.email}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Mail className="h-4 w-4" />
            </a>
          </>
        )}
        {whatsappHref && (
          <>
            <span className="mx-0.5 h-4 w-px bg-white/15" />
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={whatsappLabel}
              title={whatsappLabel}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Phone className="h-4 w-4" />
            </a>
          </>
        )}
      </div>
    </div>
  )
}
