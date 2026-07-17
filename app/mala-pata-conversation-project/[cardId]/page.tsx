import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { AmbientBackground } from "@/components/friends/organisms/ambient-background"
import { CardDetail } from "@/components/friends/organisms/card-detail"
import { getAllCards, getCardById } from "@/lib/friends/deck"
import { ROUTE_BASE } from "@/lib/friends/config"

interface CardPageProps {
  params: Promise<{ cardId: string }>
}

// Pre-renders one static path per valid card loaded at build time — new
// cards added after a deploy simply fall back to on-demand rendering
// (Next's default behavior for params outside `generateStaticParams`).
export async function generateStaticParams() {
  const cards = await getAllCards()
  return cards.map((card) => ({ cardId: card.id }))
}

export async function generateMetadata({ params }: CardPageProps): Promise<Metadata> {
  const { cardId } = await params
  const card = await getCardById(cardId)

  return {
    title: card ? `${card.name} — Mala Pata` : "Mala Pata — The Conversation Project",
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default async function CardPage({ params }: CardPageProps) {
  const { cardId } = await params
  const card = await getCardById(cardId)

  if (!card) {
    notFound()
  }

  return (
    <main className="relative min-h-screen bg-background px-4 py-10 sm:px-8 lg:px-12">
      <AmbientBackground />

      <div className="relative mx-auto flex max-w-3xl flex-col gap-8">
        <Link
          href={ROUTE_BASE}
          className="inline-flex items-center gap-2 self-start font-[family-name:var(--font-technical)] text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowLeft aria-hidden className="h-3.5 w-3.5" />
          Volver al mazo
        </Link>

        <CardDetail card={card} />
      </div>
    </main>
  )
}
