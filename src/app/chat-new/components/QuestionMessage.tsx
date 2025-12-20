'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { ChatQuestionMessage } from '@/context/ChatContext'
import ConversationalQuestionComponent from '@/components/home/conversational-question'

interface QuestionMessageProps {
  message: ChatQuestionMessage
  onAnswer: (answer: any) => void
  isActive: boolean
}

/**
 * QuestionMessage Component
 * Renders questions with two display states:
 * 1. Active: Full question with expanded control and Next button (from ConversationalQuestionComponent)
 * 2. Answered: Minimized with question text + answer badge
 *
 * Uses Framer Motion for smooth state transitions
 */
export function QuestionMessage({
  message,
  onAnswer,
  isActive,
}: QuestionMessageProps) {
  const [isAnswered, setIsAnswered] = useState(!isActive)
  const questionRef = useRef<HTMLDivElement>(null)

  // Sync answered state with message state
  useEffect(() => {
    if (message.state === 'answered') {
      setIsAnswered(true)
    } else {
      setIsAnswered(false)
    }
  }, [message.state])

  // Scroll to control when it loads
  useEffect(() => {
    if (!isAnswered && questionRef.current) {
      const { top } = questionRef.current.getBoundingClientRect()
      const offset = top + window.scrollY - 100 // 100px offset from top

      window.scrollTo({
        top: offset,
        behavior: 'smooth',
      })
    }
  }, [isAnswered, isActive])

  const handleSubmitAnswer = (answerValue: any) => {
    if (answerValue !== null) {
      setIsAnswered(true)
      onAnswer(answerValue)
    }
  }

  // Show question with control (active or disabled)
  return (
    <motion.div
      ref={questionRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex justify-start"
    >
      <div
        className={`w-full max-w-md bg-card border border-border rounded-lg rounded-bl-none p-4 shadow-sm ${isAnswered ? 'opacity-50 pointer-events-none' : ''}`}
        style={{ pointerEvents: isAnswered ? 'none' : 'auto' }}
      >
        {/* Question with control - disabled when answered, Next button hidden */}
        <ConversationalQuestionComponent
          question={message.question}
          onAnswer={handleSubmitAnswer}
          isLoading={isAnswered}
        />
        {/* Hide the Next button when answered using CSS */}
        {isAnswered && (
          <style>{`
            [role="button"] {
              display: none !important;
            }
          `}</style>
        )}
      </div>
    </motion.div>
  )
}
