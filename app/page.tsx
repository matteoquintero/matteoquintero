import { BrainHero } from "@/components/brain-hero"
import { Timeline } from "@/components/timeline"
import { getTimelineItems } from "@/lib/actions/experiences"

export default async function Home() {
  const timelineItems = await getTimelineItems()

  return (
    <main className="min-h-screen">
      <BrainHero />
      <Timeline items={timelineItems} />
    </main>
  )
}
