"use client"

import { motion } from "motion/react"
import { ConversationalQuestion } from "@/data/mock-questions"
import { SummaryHeader } from "./SummaryHeader"
import { AnswerBadges } from "./AnswerBadges"
import { ParameterOverlapChart } from "./ParameterOverlapChart"
import { SelectedCommunities } from "./SelectedCommunities"
import { SimpleInsights } from "./SimpleInsights"

interface ConversationSummaryProps {
  answers: Record<string, any>
  questions: ConversationalQuestion[]
}

/**
 * Master summary component that displays a comprehensive overview
 * of the user's conversation and selections
 */
export function ConversationSummary({
  answers,
  questions,
}: ConversationSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl mx-auto space-y-6 p-6"
    >
      {/* Header */}
      <SummaryHeader answers={answers} />

      {/* Answer Badges Section */}
      <AnswerBadges answers={answers} questions={questions} />

      {/* Parameter Overlap Chart */}
      <ParameterOverlapChart answers={answers} />

      {/* Selected Communities */}
      <SelectedCommunities answers={answers} />

      {/* Simple Insights */}
      <SimpleInsights answers={answers} />
    </motion.div>
  )
}
