"use client"

import { useEffect } from "react"

import { ROUTE_BASE } from "@/lib/friends/config"

interface RegisterSWProps {
  /**
   * Card ids to precache as detail-page URLs, sourced server-side (the
   * layout already reads the deck). Optional: if omitted, the component
   * falls back to scraping `a[href^="${ROUTE_BASE}/"]` from the DOM so it
   * still works on any mala-pata page that renders card links.
   */
  cardIds?: string[]
}

function waitForActiveServiceWorker(registration: ServiceWorkerRegistration): Promise<ServiceWorker | null> {
  if (registration.active) return Promise.resolve(registration.active)

  const worker = registration.installing ?? registration.waiting
  if (!worker) return Promise.resolve(null)

  return new Promise((resolve) => {
    worker.addEventListener("statechange", () => {
      if (worker.state === "activated") resolve(worker)
    })
  })
}

function collectCardUrlsFromDom(): string[] {
  const anchors = document.querySelectorAll<HTMLAnchorElement>(`a[href^="${ROUTE_BASE}/"]`)
  const urls = new Set<string>()
  anchors.forEach((anchor) => {
    // pathname strips origin + query so precache keys match same-origin GETs.
    urls.add(anchor.pathname)
  })
  return Array.from(urls)
}

/**
 * Registers `/sw.js` (root scope) and, once it is active, tells it which
 * card detail URLs exist so it can precache them in the background —
 * this is the "downloads itself, no user action" part of offline support.
 * Mounted only inside the mala-pata section layout; never touches the rest
 * of the portfolio.
 */
export function RegisterSW({ cardIds }: RegisterSWProps) {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return

    let cancelled = false

    async function register() {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js")
        const active = await waitForActiveServiceWorker(registration)
        const controller = active ?? navigator.serviceWorker.controller
        if (cancelled || !controller) return

        const urls = cardIds && cardIds.length > 0 ? cardIds.map((id) => `${ROUTE_BASE}/${id}`) : collectCardUrlsFromDom()

        if (urls.length > 0) {
          controller.postMessage({ type: "PRECACHE_CARDS", urls })
        }
      } catch {
        // Registration failing (unsupported browser, blocked, etc.) must
        // never break the page — offline support is a bonus, not a
        // requirement for the deck explorer to work online.
      }
    }

    register()

    return () => {
      cancelled = true
    }
  }, [cardIds])

  return null
}
