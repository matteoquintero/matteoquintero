import { BrainHero } from "@/components/brain-hero"
import { Timeline } from "@/components/timeline"
import { getTimelineItems } from "@/lib/actions/experiences"
import { getHeroContent } from "@/lib/actions/hero"

export default async function Home() {
  const [timelineItems, heroContent] = await Promise.all([getTimelineItems(), getHeroContent()])

  return (
    <main className="min-h-screen">
      <BrainHero content={heroContent} />
      <Timeline items={timelineItems} />
    </main>
  )
}
