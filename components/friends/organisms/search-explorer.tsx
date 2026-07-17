"use client"

import { useMemo, useState } from "react"

import { SearchInput } from "@/components/friends/atoms/search-input"
import { FilterSheet } from "@/components/friends/organisms/filter-sheet"
import { SearchGrid } from "@/components/friends/organisms/search-grid"
import { buildSearchView, matchesFacets, matchesQuery } from "@/lib/friends/search"
import type { Card, FacetState, FacetVocabulary } from "@/lib/friends/types"
import { cn } from "@/lib/utils"

interface SearchExplorerProps {
  cards: Card[]
  facets: FacetVocabulary
  className?: string
}

const EMPTY_FACETS: FacetState = { categories: [], intensities: [], tags: [] }

function toggleValue<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}

/**
 * Client organism — owns `{ query, facets }` state and renders the search
 * field, filter sheet, and result grid. Filtering delegates to the shared
 * pure functions in `lib/friends/search.ts` (AND across facet types + free
 * text, OR within a facet type) — this component only owns UI state.
 */
export function SearchExplorer({ cards, facets, className }: SearchExplorerProps) {
  const [query, setQuery] = useState("")
  const [activeFacets, setActiveFacets] = useState<FacetState>(EMPTY_FACETS)
  const [filterSheetOpen, setFilterSheetOpen] = useState(false)

  const searchViews = useMemo(() => cards.map(buildSearchView), [cards])

  const filteredCards = useMemo(
    () =>
      searchViews
        .filter((view) => matchesQuery(view, query) && matchesFacets(view.card, activeFacets))
        .map((view) => view.card),
    [searchViews, query, activeFacets],
  )

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <SearchInput value={query} onChange={setQuery} className="sm:max-w-sm" />

      <div className="grid gap-6 lg:grid-cols-[240px_1fr] lg:items-start">
        {/* Renders as a mobile trigger+sheet OR a desktop sidebar bar — see FilterSheet. */}
        <FilterSheet
          open={filterSheetOpen}
          onOpenChange={setFilterSheetOpen}
          facets={facets}
          selected={activeFacets}
          onToggleCategory={(category) =>
            setActiveFacets((prev) => ({ ...prev, categories: toggleValue(prev.categories, category) }))
          }
          onToggleIntensity={(intensity) =>
            setActiveFacets((prev) => ({ ...prev, intensities: toggleValue(prev.intensities, intensity) }))
          }
          onToggleTag={(tag) => setActiveFacets((prev) => ({ ...prev, tags: toggleValue(prev.tags, tag) }))}
          onClear={() => setActiveFacets(EMPTY_FACETS)}
        />
        <SearchGrid cards={filteredCards} hasAnyCards={cards.length > 0} />
      </div>
    </div>
  )
}
