// Custom, dependency-free service worker for the "Mala Pata" deck explorer.
//
// Scope: intentionally narrow. This SW is registered at the root ("/") so it
// can control navigations, but its fetch handler ONLY intercepts requests
// that belong to the mala-pata section (or generic Next.js build assets it
// needs to run offline) — everything else falls through untouched so the
// rest of the portfolio, Supabase calls, etc. are never affected.
//
// ROUTE_BASE must stay in sync with lib/friends/config.ts. It is duplicated
// here (plain static asset, no build step) rather than imported.
const ROUTE_BASE = "/mala-pata-conversation-project"

const CACHE_VERSION = "v1"
const CACHE_NAME = `mala-pata-cache-${CACHE_VERSION}`
const CACHE_PREFIX = "mala-pata-cache-"

// Minimal app-shell precached at install time so the list route (and the
// PWA manifest/icons) are available offline immediately after first visit,
// even before any card has been opened.
const APP_SHELL_URLS = [ROUTE_BASE, "/manifest.webmanifest", "/friends/icon-192.png", "/friends/icon-512.png"]

function isNextStaticAsset(url) {
  // Hashed, immutable build output — safe to cache-first forever per version.
  return url.pathname.startsWith("/_next/static/")
}

function isManifestOrIcon(url) {
  return url.pathname === "/manifest.webmanifest" || url.pathname.startsWith("/friends/icon")
}

function isMalaPataRoute(url) {
  return url.pathname === ROUTE_BASE || url.pathname.startsWith(`${ROUTE_BASE}/`)
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME)
  const cached = await cache.match(request)
  if (cached) return cached

  const response = await fetch(request)
  if (response && response.ok) {
    cache.put(request, response.clone())
  }
  return response
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME)

  try {
    const networkResponse = await fetch(request)
    if (networkResponse && networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch {
    const cached = await cache.match(request)
    if (cached) return cached

    // Last-resort fallback: an uncached mala-pata URL (e.g. a card never
    // visited before) still gets *something* offline — the cached app shell
    // — instead of the browser's default offline error page.
    if (request.mode === "navigate") {
      const shell = await cache.match(ROUTE_BASE)
      if (shell) return shell
    }

    throw new Error("mala-pata sw: no network and no cache entry")
  }
}

async function precacheUrls(urls) {
  const cache = await caches.open(CACHE_NAME)
  await Promise.all(
    urls.map(async (url) => {
      try {
        const existing = await cache.match(url)
        if (existing) return // already have it, skip the extra round trip
        const response = await fetch(url)
        if (response && response.ok) {
          await cache.put(url, response)
        }
      } catch {
        // Best-effort: a single card failing to precache (e.g. transient
        // network blip) must not block the rest. It will retry next visit.
      }
    }),
  )
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        Promise.all(
          APP_SHELL_URLS.map((url) =>
            fetch(url)
              .then((response) => {
                if (response && response.ok) return cache.put(url, response)
              })
              .catch(() => {
                // Missing shell asset shouldn't block install — offline
                // support just degrades gracefully for that one URL.
              }),
          ),
        ),
      )
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  )
})

self.addEventListener("fetch", (event) => {
  const { request } = event

  // Only ever handle simple same-origin GETs. Everything else (mutations,
  // cross-origin calls like Supabase, analytics, etc.) passes straight
  // through to the network, untouched.
  if (request.method !== "GET") return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  if (isNextStaticAsset(url) || isManifestOrIcon(url)) {
    event.respondWith(cacheFirst(request))
    return
  }

  if (isMalaPataRoute(url)) {
    event.respondWith(networkFirst(request))
    return
  }

  // Not a mala-pata asset — do not intercept. The rest of the portfolio
  // (and everything else on the origin) is served exactly as if this SW
  // did not exist.
})

self.addEventListener("message", (event) => {
  const data = event.data
  if (!data || data.type !== "PRECACHE_CARDS" || !Array.isArray(data.urls)) return
  event.waitUntil(precacheUrls(data.urls))
})
