"use client"

import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { ConversationalQuestion } from "@/data/mock-questions"
import { QuestionAnswerBadge } from "./QuestionAnswerBadge"

interface ConversationalFlowHeaderProps {
  currentIndex: number
  totalQuestions: number
  isLastQuestion: boolean
  progress: number
  answers: Record<string, any>
  questions: ConversationalQuestion[]
  onBackClick: () => void
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
          {answeredQuestions.map((question, idx) => (
            <QuestionAnswerBadge
              key={question.id}
              question={question}
              answer={answers[question.id]}
              index={idx}
              variant="header"
            />
          ))}
        </motion.div>
      )}
    </div>
  )
}
