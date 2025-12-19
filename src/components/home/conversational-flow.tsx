"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import ConversationalQuestion from "./conversational-question"
import { ConversationalFlowHeader } from "./ConversationalFlowHeader"
import { ConversationalQuestion as ConversationalQuestionType } from "@/data/mock-questions"

interface ConversationalFlowProps {
  questions: ConversationalQuestionType[]
  onComplete?: (answers: Record<string, any>) => void
  onClose?: () => void
}

/**
 * Displays a flow of conversational questions one at a time
 * Features:
 * - Animated transitions between questions using Framer Motion
 * - Progress indicator showing current question number
 * - Collapsible design with close button
 * - Stores all answers in a record
 */
export default function ConversationalFlow({
  questions,
  onComplete,
  onClose,
}: ConversationalFlowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  // const [isCollapsed, setIsCollapsed] = useState(false)

  const currentQuestion = questions[currentIndex]
  const isLastQuestion = currentIndex === questions.length - 1
  const progress = ((currentIndex + 1) / questions.length) * 100

  const handleAnswer = (answer: any) => {
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: answer,
    }
    setAnswers(updatedAnswers)

    if (isLastQuestion) {
      // All questions answered
      if (onComplete) {
        onComplete(updatedAnswers)
      }
    } else {
      // Move to next question
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-card border border-border rounded-lg shadow-sm"
    >
      {/* Header with progress, answers, and controls */}
      <ConversationalFlowHeader
        currentIndex={currentIndex}
        totalQuestions={questions.length}
        isLastQuestion={isLastQuestion}
        progress={progress}
        answers={answers}
        questions={questions}
        onBackClick={handlePreviousQuestion}
      />

      {/* Questions Container */}
      { (
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <ConversationalQuestion
                question={currentQuestion}
                onAnswer={handleAnswer}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  )
}
