"use client"

import { motion } from "motion/react"
import { ConversationalQuestion } from "@/data/mock-questions"
import { QuestionAnswerBadge } from "../QuestionAnswerBadge"

interface AnswerBadgesProps {
  answers: Record<string, any>
  questions: ConversationalQuestion[]
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
        {answeredQuestions.map((question, idx) => (
          <QuestionAnswerBadge
            key={question.id}
            question={question}
            answer={answers[question.id]}
            index={idx}
            variant="summary"
          />
        ))}
      </div>
    </motion.div>
  )
}
