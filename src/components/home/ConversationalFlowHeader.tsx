"use client"

import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Tag, Wallet, Home, TrendingUp, Sofa, MapPin, Bed, BedDouble } from "lucide-react"
import { ConversationalQuestion } from "@/data/mock-questions"

interface ConversationalFlowHeaderProps {
  currentIndex: number
  totalQuestions: number
  isLastQuestion: boolean
  progress: number
  answers: Record<string, any>
  questions: ConversationalQuestion[]
  onBackClick: () => void
}

/**
 * Formats answer values for display in badges
 * Handles different data types: strings, arrays, numbers, objects
 * Includes units where applicable
 */
function formatAnswerValue(value: any, question?: ConversationalQuestion): string {
  const unit = question?.data?.unit || ""

  if (Array.isArray(value)) {
    // Format arrays like [1.5, 2.5] as "1.5 - 2.5 Cr"
    if (value.length === 2 && typeof value[0] === 'number' && typeof value[1] === 'number') {
      return `${value[0]} - ${value[1]} ${unit}`.trim()
    }
    return value.join(", ")
  }
  if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value)
  }

  const stringValue = String(value)
  // Add unit if available and value is numeric
  if (unit && !isNaN(Number(stringValue))) {
    return `${stringValue} ${unit}`.trim()
  }
  return stringValue
}

/**
 * Renders the appropriate icon for a question ID
 */
function renderQuestionIcon(questionId: string) {
  const iconClassName = "w-3.5 h-3.5"
  console.log(questionId)
  if (questionId === "req_type") return <Tag className={iconClassName} />
  if (questionId === "budget") return <Wallet className={iconClassName} />
  if (questionId === "bedroom_count") return <BedDouble className={iconClassName} />
  if (questionId === "property_type") return <Home className={iconClassName} />
  if (questionId === "property_status") return <TrendingUp className={iconClassName} />
  if (questionId === "furnishing_status") return <Sofa className={iconClassName} />
  if (questionId === "community_preference") return <MapPin className={iconClassName} />

  return <Tag className={iconClassName} />
}

export function ConversationalFlowHeader({
  currentIndex,
  totalQuestions,
  isLastQuestion,
  progress,
  answers,
  questions,
  onBackClick,
}: ConversationalFlowHeaderProps) {
  // Get all answered questions so far (excluding current)
  const answeredQuestions = questions.slice(0, currentIndex).filter((q) => answers[q.id] !== undefined)

  return (
    <div className="p-4 border-b border-border/50 space-y-3">
      {/* Header Row with Back Button and Progress */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBackClick}
          disabled={currentIndex === 0}
          className="p-0 h-auto"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <span className="text-sm font-medium text-muted-foreground">
          Question {currentIndex + 1} of {totalQuestions}
        </span>
        <span className="text-sm text-muted-foreground ml-auto">
          {isLastQuestion ? "Last question" : ""}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
          className="h-full bg-primary"
        />
      </div>

      {/* Answered Questions as Badges */}
      {answeredQuestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.2 }}
          className="flex flex-wrap gap-2 pt-2"
        >
          {answeredQuestions.map((question, idx) => {
            const answer = answers[question.id]
            const value = formatAnswerValue(answer, question)
            console.log("Question ID:", question.id, "Answer:", value)

            return (
              <motion.div
                key={question.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Badge variant="secondary" className="border-primary text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 text-primary">
                  {renderQuestionIcon(question.id)}
                  {value}
                </Badge>
              </motion.div>
            )
          })}
        </motion.div>
      )}
    </div>
  )
}
