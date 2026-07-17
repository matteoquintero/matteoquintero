import type React from "react"
import type { Metadata, Viewport } from "next"

import { RegisterSW } from "@/components/friends/offline/register-sw"
import { getAllCards } from "@/lib/friends/deck"

// Section-scoped PWA wiring: manifest link + theme color + service-worker
// registration, all confined to the mala-pata deck explorer. The root
// layout (rest of the portfolio) is untouched — installability and offline
// support are opt-in per section, not site-wide.
export const metadata: Metadata = {
  manifest: "/manifest.webmanifest",
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
}

export default async function MalaPataLayout({ children }: { children: React.ReactNode }) {
  const cards = await getAllCards()
  const cardIds = cards.map((card) => card.id)

  return (
    <>
      <RegisterSW cardIds={cardIds} />
      {children}
    </>
  )
}
