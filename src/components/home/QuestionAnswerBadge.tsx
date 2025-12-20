"use client"

import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { ConversationalQuestion } from "@/data/mock-questions"
import { formatAnswerValue, renderQuestionIcon } from "@/lib/answer-formatting"

interface QuestionAnswerBadgeProps {
  question: ConversationalQuestion
  answer: any
  index: number
  variant?: "header" | "summary"
}

export function QuestionAnswerBadge({
  question,
  answer,
  index,
  variant = "summary",
}: QuestionAnswerBadgeProps) {
  const value = formatAnswerValue(answer, question)
  const spanClass = question.id === "proximity_location" ? "truncate pl-5" : "truncate"
  const classNameMap = {
    header:
      "border-primary relative text-xs font-medium px-3 py-1.5 rounded-full  flex items-center gap-1.5 text-primary ",
    summary:
      "border-primary relative text-xs font-medium px-3 py-2 rounded-full flex items-center gap-2 text-primary bg-primary/5 hover:bg-primary/10 transition-colors max-w-xs",
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.05 }}
    >
      <Badge variant="secondary" title={value} className={classNameMap[variant]} >
        {renderQuestionIcon(question.id)}
        <span className={spanClass}>{value}</span>
      </Badge>
    </motion.div>
  )
}
