"use client"

import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { ConversationalQuestion } from "@/data/mock-questions"
import { Tag, Wallet, Home, TrendingUp, Sofa, MapPin, Bed, BedDouble } from "lucide-react"

interface AnswerBadgesProps {
  answers: Record<string, any>
  questions: ConversationalQuestion[]
}

/**
 * Formats answer values for display in badges
 */
function formatAnswerValue(value: any, question?: ConversationalQuestion): string {
  const unit = question?.data?.unit || ""

  if (Array.isArray(value)) {
    if (value.length === 2 && typeof value[0] === 'number' && typeof value[1] === 'number') {
      return `${value[0]} - ${value[1]} ${unit}`.trim()
    }
    return value.join(", ")
  }
  if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value)
  }

  const stringValue = String(value)
  if (unit && !isNaN(Number(stringValue))) {
    return `${stringValue} ${unit}`.trim()
  }
  return stringValue
}

/**
 * Renders appropriate icon for a question ID
 */
function renderQuestionIcon(questionId: string) {
  const iconClassName = "w-3.5 h-3.5"
  if (questionId === "req_type") return <Tag className={iconClassName} />
  if (questionId === "budget") return <Wallet className={iconClassName} />
  if (questionId === "bedroom_count") return <BedDouble className={iconClassName} />
  if (questionId === "property_type") return <Home className={iconClassName} />
  if (questionId === "property_status") return <TrendingUp className={iconClassName} />
  if (questionId === "furnishing_status") return <Sofa className={iconClassName} />
  if (questionId === "community_preference") return <MapPin className={iconClassName} />

  return <Tag className={iconClassName} />
}

export function AnswerBadges({
  answers,
  questions,
}: AnswerBadgesProps) {
  // Filter out community_preference from badges display (will show separately)
  const answeredQuestions = questions.filter(
    (q) => answers[q.id] !== undefined && q.id !== "community_preference"
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="bg-card border border-border rounded-lg p-6 space-y-4"
    >
      <h3 className="text-lg font-semibold text-foreground">Your Criteria</h3>

      <div className="flex flex-wrap gap-3">
        {answeredQuestions.map((question, idx) => {
          const answer = answers[question.id]
          const value = formatAnswerValue(answer, question)

          return (
            <motion.div
              key={question.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Badge
                variant="secondary"
                className="border-primary text-xs font-medium px-3 py-2 rounded-full flex items-center gap-2 text-primary bg-primary/5 hover:bg-primary/10 transition-colors"
              >
                {renderQuestionIcon(question.id)}
                {value}
              </Badge>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
