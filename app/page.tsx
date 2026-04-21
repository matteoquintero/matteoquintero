import { BrainHero } from "@/components/brain-hero"
import { PortfolioFooter } from "@/components/portfolio-footer"
import { QuickContact } from "@/components/quick-contact"
import { Timeline } from "@/components/timeline"
import { TechnologiesHero } from "@/components/technologies-hero"
import { getProfile, getSiteCopy, getSiteLists } from "@/lib/actions/content"
import { getTimelineItems } from "@/lib/actions/experiences"
import { getRequestLocale } from "@/lib/locale"

export default async function Home() {
  const locale = await getRequestLocale()

  const [profile, copy, lists, timelineItems] = await Promise.all([
    getProfile(locale),
    getSiteCopy(locale),
    getSiteLists(locale),
    getTimelineItems(locale),
  ])

  const experiences = timelineItems
    .filter(
      (item): item is Extract<(typeof timelineItems)[number], { type: "experience" }> =>
        item.type === "experience",
    )
    .map((item) => item.data)

  return (
    <main className="min-h-screen">
      <BrainHero profile={profile} copy={copy} lists={lists} locale={locale} />
      <TechnologiesHero experiences={experiences} copy={copy} />
      <Timeline items={timelineItems} copy={copy} />
      <PortfolioFooter profile={profile} copy={copy} />
      <QuickContact profile={profile} copy={copy} />
    </main>
  )
}
