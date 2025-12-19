"use client"

import { useState } from "react"
import QuestionStep, { QuestionStep as QuestionStepType } from "@/components/home/question-step"
import { motion, AnimatePresence } from "motion/react"

interface QuestionFlowProps {
  questions: QuestionStepType[]
  onComplete?: (answers: Record<string, any>) => void
}

export default function QuestionFlow({ questions, onComplete }: QuestionFlowProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  const handleNext = (answer: any) => {
    // Store the answer
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: answer,
    }
    setAnswers(updatedAnswers)

    if (isLastQuestion) {
      // All questions answered
      console.log("All answers collected:", updatedAnswers)
      if (onComplete) {
        onComplete(updatedAnswers)
      }
    } else {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  return (
    <motion.div
      initial={{
        height: 0
      }}
      animate={{ height: 220 }}
      transition={{
        duration: 1
      }}
      className="max-w-2xl items-center  mx-auto">


      <div className="flex flex-col w-full items-center gap-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <QuestionStep
              step={{
                ...currentQuestion,
                status: "loading",
              }}
              onNext={handleNext}
            />
          </motion.div>
        </AnimatePresence>

        {/* Progress indicator */}
        <div className="flex gap-2 pl-4">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${index < currentQuestionIndex
                ? "bg-primary"
                : index === currentQuestionIndex
                  ? "bg-primary/60"
                  : "bg-muted"
                }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
