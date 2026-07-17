import type { Metadata } from "next"

import { AmbientBackground } from "@/components/friends/organisms/ambient-background"
import { SearchExplorer } from "@/components/friends/organisms/search-explorer"
import { getAllCards } from "@/lib/friends/deck"
import { deriveFacets } from "@/lib/friends/search"

// Standalone card explorer. Not linked from the public site nav — must not
// be indexed by search engines (same convention as app/alfred-challenge).
export const metadata: Metadata = {
  title: "Mala Pata — The Conversation Project",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function FriendsPage() {
  const cards = await getAllCards()
  const facets = deriveFacets(cards)

  return (
    <main className="relative min-h-screen bg-background px-4 py-10 sm:px-8 lg:px-12">
      <AmbientBackground />

      <div className="relative mx-auto flex max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-2">
          <p className="font-[family-name:var(--font-technical)] text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Mala Pata — The Conversation Project
          </p>
          <h1 className="font-[family-name:var(--font-creative)] text-3xl text-foreground sm:text-4xl">
            Explora el mazo
          </h1>
          <p className="max-w-xl text-sm text-muted-foreground">
            Busca por palabra clave o filtra por categoría, intensidad y tags para encontrar la carta que abra la
            conversación que buscas.
          </p>
        </header>

        {cards.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border px-6 py-16 text-center">
            <p className="font-[family-name:var(--font-creative)] text-lg text-foreground">
              El mazo todavía no tiene cartas.
            </p>
            <p className="font-[family-name:var(--font-technical)] text-xs text-muted-foreground">Vuelve pronto.</p>
          </div>
        ) : (
          <SearchExplorer cards={cards} facets={facets} />
        )}
      </div>
    </main>
  )
}
