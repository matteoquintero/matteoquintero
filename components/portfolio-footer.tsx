"use client"

import { Linkedin } from "lucide-react"
import { useState } from "react"

import { LocaleSwitcher } from "@/components/locale-switcher"
import type { Locale, Profile, SiteCopy } from "@/lib/types"
import { cn } from "@/lib/utils"

interface PortfolioFooterProps {
  profile: Profile
  copy: SiteCopy
  locale: Locale
}

function formatColombianPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "")
  if (digits.length === 12 && digits.startsWith("57")) {
    return `+57 ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`
  }
  if (digits.length === 10) {
    return `+57 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
  }
  return raw
}

export function PortfolioFooter({ profile, copy, locale }: PortfolioFooterProps) {
  const [copied, setCopied] = useState<string | null>(null)
  const year = new Date().getFullYear()
  const phone = profile.whatsapp_number ? formatColombianPhone(profile.whatsapp_number) : ""
  const whatsappHref = profile.whatsapp_number
    ? `https://wa.me/${profile.whatsapp_number.replace(/\D/g, "")}`
    : undefined

  const copyToClipboard = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch {
      // clipboard unavailable — no-op
    }
  }

  const copyLabel = copy["footer.copy_label"] || "copiar"
  const copiedLabel = copy["footer.copied"] || "copiado"
  const manifestoLabel = copy["footer.manifesto_label"] || "manifiesto"
  const contactLabel = copy["footer.contact_label"] || "contacto"
  const pitch = copy["footer.pitch"] || ""
  const linkedinHandle =
    copy["footer.linkedin_handle"] ||
    (profile.linkedin_url ? profile.linkedin_url.replace(/^https?:\/\//, "") : "")

  return (
    <footer className="relative border-t border-white/10 bg-black px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.35fr_1fr] md:gap-16">
          {/* Left: manifesto / pitch */}
          <div>
            <p
              className="mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/45"
              style={{ fontFamily: "var(--font-technical)" }}
            >
              <span className="text-white/25">{`//`}</span>
              <span>{manifestoLabel}</span>
            </p>
            <p
              className="text-balance text-xl leading-relaxed text-white/80 md:text-2xl lg:text-[26px]"
              style={{ fontFamily: "var(--font-creative)" }}
            >
              {pitch}
            </p>
          </div>

          {/* Right: contact block */}
          <div>
            <p
              className="mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/45"
              style={{ fontFamily: "var(--font-technical)" }}
            >
              <span className="text-white/25">{`//`}</span>
              <span>{contactLabel}</span>
            </p>

            <dl className="space-y-5" style={{ fontFamily: "var(--font-technical)" }}>
              {profile.email && (
                <div>
                  <dt className="text-[9px] uppercase tracking-[0.3em] text-white/40">email</dt>
                  <dd className="mt-1 flex flex-wrap items-center gap-2">
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-sm text-white/90 transition-colors hover:text-white md:text-[15px]"
                    >
                      {profile.email}
                    </a>
                    <button
                      type="button"
                      onClick={() => copyToClipboard("email", profile.email)}
                      aria-label={copyLabel}
                      className={cn(
                        "rounded-sm border px-1.5 py-0.5 text-[9px] uppercase tracking-[0.2em] transition-colors",
                        copied === "email"
                          ? "border-emerald-300/40 text-emerald-300"
                          : "border-white/10 text-white/45 hover:border-white/40 hover:text-white",
                      )}
                    >
                      {copied === "email" ? copiedLabel : copyLabel}
                    </button>
                  </dd>
                </div>
              )}

              {phone && (
                <div>
                  <dt className="text-[9px] uppercase tracking-[0.3em] text-white/40">
                    tel · whatsapp
                  </dt>
                  <dd className="mt-1 flex flex-wrap items-center gap-2">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/90 tabular-nums transition-colors hover:text-white md:text-[15px]"
                    >
                      {phone}
                    </a>
                    <button
                      type="button"
                      onClick={() => copyToClipboard("phone", phone)}
                      aria-label={copyLabel}
                      className={cn(
                        "rounded-sm border px-1.5 py-0.5 text-[9px] uppercase tracking-[0.2em] transition-colors",
                        copied === "phone"
                          ? "border-emerald-300/40 text-emerald-300"
                          : "border-white/10 text-white/45 hover:border-white/40 hover:text-white",
                      )}
                    >
                      {copied === "phone" ? copiedLabel : copyLabel}
                    </button>
                  </dd>
                </div>
              )}

              {profile.linkedin_url && (
                <div>
                  <dt className="text-[9px] uppercase tracking-[0.3em] text-white/40">linkedin</dt>
                  <dd className="mt-1">
                    <a
                      href={profile.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-white/90 transition-colors hover:text-white md:text-[15px]"
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                      {linkedinHandle}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col-reverse items-start gap-4 border-t border-white/10 pt-6 md:mt-16 md:flex-row md:items-center md:justify-between">
          <p
            className="text-[10px] uppercase tracking-[0.2em] text-white/40"
            style={{ fontFamily: "var(--font-technical)" }}
          >
            © {year} · {profile.name || "Mateo Quintero"}
          </p>
          <LocaleSwitcher initialLocale={locale} />
        </div>
      </div>
    </footer>
  )
}
