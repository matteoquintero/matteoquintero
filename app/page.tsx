import { BrainHero } from "@/components/brain-hero"
import { Timeline } from "@/components/timeline"
import { TechnologiesHero } from "@/components/technologies-hero"
import { getTimelineItems } from "@/lib/actions/experiences"

export default async function Home() {
  const timelineItems = await getTimelineItems()

  const experiences = timelineItems.filter((item) => item.type === "experience").map((item) => item.data)

  return (
    <main className="min-h-screen">
      <BrainHero />
      <TechnologiesHero experiences={experiences} />
      <Timeline items={timelineItems} />
    </main>
  )
}
