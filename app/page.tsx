import { BrainHero } from "@/components/brain-hero"
import { Timeline } from "@/components/timeline"
import { TechnologiesHero } from "@/components/technologies-hero"
import { getProfile, getSiteCopy, getSiteLists } from "@/lib/actions/content"
import { getTimelineItems } from "@/lib/actions/experiences"

export default async function Home() {
  const [profile, copy, lists, timelineItems] = await Promise.all([
    getProfile(),
    getSiteCopy(),
    getSiteLists(),
    getTimelineItems(),
  ])

  const experiences = timelineItems
    .filter(
      (item): item is Extract<(typeof timelineItems)[number], { type: "experience" }> =>
        item.type === "experience",
    )
    .map((item) => item.data)

  return (
    <main className="min-h-screen">
      <BrainHero profile={profile} copy={copy} lists={lists} />
      <TechnologiesHero experiences={experiences} copy={copy} />
      <Timeline items={timelineItems} copy={copy} />
    </main>
  )
}
