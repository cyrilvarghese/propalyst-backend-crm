'use client'

import { ChatMessage, ChatQuestionMessage } from '@/context/ChatContext'
import { QuestionAnswerBadge } from '@/components/home/QuestionAnswerBadge'

interface AnsweredQuestionsBadgesProps {
  messages: ChatMessage[]
  allAnswers: Record<string, any>
}

export function AnsweredQuestionsBadges({
  messages,
  allAnswers,
}: AnsweredQuestionsBadgesProps) {
  // Only show if there are answered questions
  if (!allAnswers || Object.keys(allAnswers).length === 0) {
    return null
  }

  return (
    <div className="w-full border-t border-border/40 bg-background/95">
      <div className="flex items-center justify-center w-full">
        <div className="w-full max-w-3xl px-4 pt-2">
          <div className="flex flex-wrap gap-2">
            {messages
              .filter((msg): msg is ChatQuestionMessage => msg.type === 'question')
              .map((msg, index) => {
                if (allAnswers[msg.question.id]) {
                  return (
                    <QuestionAnswerBadge
                      key={msg.question.id}
                      question={msg.question}
                      answer={allAnswers[msg.question.id]}
                      index={index}
                      variant="summary"
                    />
                  )
                }
                return null
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
