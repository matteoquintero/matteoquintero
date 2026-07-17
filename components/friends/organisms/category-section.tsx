import { CategoryLabel } from "@/components/friends/atoms/category-label"
import { QuestionItem } from "@/components/friends/molecules/question-item"
import type { Category, Question } from "@/lib/friends/types"
import { cn } from "@/lib/utils"

interface CategorySectionProps {
  category: Category
  questions: Question[]
  className?: string
}

/**
 * One category block within a card's detail view. Always rendered — even
 * with zero questions — so the five categories stay visually consistent.
 */
export function CategorySection({ category, questions, className }: CategorySectionProps) {
  return (
    <section className={cn("flex flex-col gap-3", className)} aria-labelledby={`category-${category}`}>
      <div id={`category-${category}`} className="flex items-baseline justify-between">
        <CategoryLabel category={category} />
        <span className="font-[family-name:var(--font-technical)] text-[11px] text-muted-foreground">
          {questions.length}
        </span>
      </div>

      {questions.length > 0 ? (
        <ul className="flex flex-col">
          {questions.map((question) => (
            <QuestionItem key={question.id} question={question} />
          ))}
        </ul>
      ) : (
        <p className="rounded-xl border border-dashed border-border py-6 text-center font-[family-name:var(--font-technical)] text-xs text-muted-foreground">
          Sin preguntas todavía en esta categoría.
        </p>
      )}
    </section>
  )
}
