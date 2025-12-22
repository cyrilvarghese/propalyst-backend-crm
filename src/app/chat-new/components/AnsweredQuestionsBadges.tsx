'use client'

import { ChatMessage, ChatQuestionMessage } from '@/context/ChatContext'
import { QuestionAnswerBadge } from '@/components/home/QuestionAnswerBadge'

interface AnsweredQuestionsBadgesProps {
  messages: ChatMessage[]
  allAnswers: Record<string, any>
  userSummary?: Record<string, any>
}

export function AnsweredQuestionsBadges({
  messages,
  allAnswers,
  userSummary = {},
}: AnsweredQuestionsBadgesProps) {
  // Merge user summary with all answers
  const mergedAnswers = { ...allAnswers, ...userSummary }

  // Only show if there are answered questions
  if (!mergedAnswers || Object.keys(mergedAnswers).length === 0) {
    return null
  }

  // Create a map of question IDs to questions for quick lookup
  const questionMap = new Map(
    messages
      .filter((msg): msg is ChatQuestionMessage => msg.type === 'question')
      .map((msg) => [msg.question.id, msg.question])
  )

  // Unit mappings for range values
  const RANGE_UNITS: Record<string, string> = {
    budget: 'cr',
    property_area: 'sq ft',
  }

  // Format range values as "min-max unit"
  const formatRangeValue = (key: string, value: any): any => {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const { min, max } = value
      if (min !== null && min !== undefined && max !== null && max !== undefined) {
        const unit = RANGE_UNITS[key] || ''
        const rangeStr = `${min}-${max}${unit ? ' ' + unit : ''}`
        return rangeStr
      }
    }
    return value
  }

  // Filter out null, undefined, empty strings, and objects with only null values
  const isValidValue = (value: any): boolean => {
    if (value === null || value === undefined || value === '') {
      return false
    }
    // For objects, check if they have any non-null values
    if (typeof value === 'object' && !Array.isArray(value)) {
      return Object.values(value).some(v => v !== null && v !== undefined)
    }
    return true
  }

  // Render badges for both answered questions and user summary entries
  const badgeEntries = Object.entries(mergedAnswers).filter(
    ([, value]) => isValidValue(value)
  )

  return (
    <div className="w-full  bg-background/95">
      <div className="flex items-center justify-center w-full">
        <div className="w-full max-w-3xl px-4 pt-3">
          <div className="flex flex-wrap gap-2">
            {badgeEntries.map(([key, value], index) => {
              const formattedValue = formatRangeValue(key, value)
              const question = questionMap.get(key)

              // If we have the question in messages, use it
              if (question) {
                return (
                  <QuestionAnswerBadge
                    key={key}
                    question={question}
                    answer={formattedValue}
                    index={index}
                    variant="summary"
                  />
                )
              }

              // Otherwise, create a minimal question object for display
              // This handles user_summary entries that haven't been asked as questions yet
              return (
                <QuestionAnswerBadge
                  key={key}
                  question={{
                    id: key,
                    question: '',
                    label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
                    controlType: 'text',
                    required: false,
                  }}
                  answer={formattedValue}
                  index={index}
                  variant="summary"
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
