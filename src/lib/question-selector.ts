/**
 * Question Selector
 * Determines which question to ask next based on conversation context
 * Prioritizes required questions and skips already-answered ones
 */

import { ConversationalQuestion } from '@/data/mock-questions'
import { ConversationContext } from '@/context/ChatContext'

/**
 * Select the next question to ask
 * Returns null if all questions have been answered
 */
export function selectNextQuestion(
  context: ConversationContext,
  availableQuestions: ConversationalQuestion[]
): ConversationalQuestion | null {
  // Filter out already asked questions
  const unaskedQuestions = availableQuestions.filter(
    (q) => !context.askedQuestionIds.includes(q.id)
  )

  if (unaskedQuestions.length === 0) {
    return null
  }

  // Skip questions whose answers were already provided in the user message
  const questionsToAsk = unaskedQuestions.filter((q) => {
    // Check if the user already provided an answer for this question type
    switch (q.id) {
      case 'req_type':
        return !context.extractedCriteria.req_type
      case 'budget':
        return !context.extractedCriteria.budget
      case 'bedroom_count':
        return !context.extractedCriteria.bhk
      case 'property_type':
        return !context.extractedCriteria.property_type
      case 'property_status':
        return !context.extractedCriteria.property_status
      case 'furnishing_status':
        return !context.extractedCriteria.furnishing_status
      default:
        // For optional questions, always include them unless explicitly answered
        return !context.allAnswers[q.id]
    }
  })

  if (questionsToAsk.length === 0) {
    return null
  }

  // Prioritize: required questions first
  const requiredQuestions = questionsToAsk.filter((q) => q.required)
  if (requiredQuestions.length > 0) {
    return requiredQuestions[0]
  }

  // Then return optional questions in order
  return questionsToAsk[0]
}

/**
 * Check if the conversation is complete
 * All required questions have been answered
 */
export function isConversationComplete(
  context: ConversationContext,
  availableQuestions: ConversationalQuestion[]
): boolean {
  const requiredQuestions = availableQuestions.filter((q) => q.required)

  // Check if all required questions have been asked
  const allRequiredAsked = requiredQuestions.every((q) =>
    context.askedQuestionIds.includes(q.id)
  )

  return allRequiredAsked
}

/**
 * Get completion percentage based on required questions answered
 */
export function getCompletionPercentage(
  context: ConversationContext,
  availableQuestions: ConversationalQuestion[]
): number {
  const requiredQuestions = availableQuestions.filter((q) => q.required)
  const answeredRequired = requiredQuestions.filter((q) =>
    context.askedQuestionIds.includes(q.id)
  ).length

  if (requiredQuestions.length === 0) {
    return 0
  }

  return Math.round((answeredRequired / requiredQuestions.length) * 100)
}
