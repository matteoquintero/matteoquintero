import { cookies } from "next/headers"

import type { Locale } from "@/lib/types"

export const LOCALE_COOKIE = "locale"

export async function getRequestLocale(): Promise<Locale> {
  const store = await cookies()
  return store.get(LOCALE_COOKIE)?.value === "en" ? "en" : "es"
}
