import { Chip } from "@/components/friends/atoms/chip"
import { IntensityBadge } from "@/components/friends/atoms/intensity-badge"
import type { Question } from "@/lib/friends/types"
import { cn } from "@/lib/utils"

interface QuestionItemProps {
  question: Question
  className?: string
}

/** A single question row: prompt + intensity + its tags. */
export function QuestionItem({ question, className }: QuestionItemProps) {
  return (
    <li className={cn("flex flex-col gap-2.5 border-b border-border/60 py-4 last:border-b-0", className)}>
      <p className="font-[family-name:var(--font-creative)] text-base leading-relaxed text-foreground">
        {question.question}
      </p>
      <div className="flex flex-wrap items-center gap-2.5">
        <IntensityBadge intensity={question.intensity} />
        {question.tags.map((tag) => (
          <Chip key={tag}>{tag}</Chip>
        ))}
      </div>
    </li>
  )
}
