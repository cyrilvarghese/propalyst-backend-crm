/**
 * Mock LLM Handler
 * Handles control ID approach - users type a question/control ID to show that control
 */

import {
  ConversationalQuestion,
  getMockQuestions,
  MOCK_QUESTIONS_3BHK_INDIRANAGAR,
  MOCK_QUESTIONS_VILLA,
  MOCK_QUESTIONS_GENERAL,
} from '@/data/mock-questions'
import { ConversationContext } from '@/context/ChatContext'

export interface LLMResponse {
  systemMessage?: string // Optional text response before question
  question?: ConversationalQuestion // Question to show
  shouldShowSummary?: boolean // True if all questions answered
}

/**
 * Map of common aliases/keywords to question control IDs
 * Multiple aliases can map to the same control ID
 * This allows users to type natural language shortcuts
 *
 * Example: User can type "buy", "rent", "type", or "req_type" to trigger the same control
 */
const CONTROL_ID_ALIASES: Record<string, string> = {
  // Transaction Type (req_type) - alias examples: buy, rent, type, transaction
  'req_type': 'req_type',
  'type': 'req_type',
  'buy': 'req_type',
  'rent': 'req_type',
  'transaction': 'req_type',

  // Budget - alias examples: price, cost, budget
  'budget': 'budget',
  'price': 'budget',
  'cost': 'budget',

  // Property Type - alias examples: villa, apartment, apt, flat, property
  'property_type': 'property_type',
  'property': 'property_type',
  'villa': 'property_type',
  'apartment': 'property_type',
  'apt': 'property_type',
  'flat': 'property_type',

  // Property Status - alias examples: status, ready, construction
  'property_status': 'property_status',
  'status': 'property_status',
  'ready': 'property_status',
  'construction': 'property_status',

  // Furnishing Status - alias examples: furnishing, furnished
  'furnishing_status': 'furnishing_status',
  'furnishing': 'furnishing_status',
  'furnished': 'furnishing_status',

  // Special Requests - alias examples: special, preferences, features
  'special_requests': 'special_requests',
  'special': 'special_requests',
  'preferences': 'special_requests',
  'features': 'special_requests',

  // Location Proximity - alias examples: proximity, location, work
  'proximity_location': 'proximity_location',
  'proximity': 'proximity_location',
  'location': 'proximity_location',
  'work': 'proximity_location',

  // Community Preference - alias examples: community, communities
  'community_preference': 'community_preference',
  'community': 'community_preference',
  'communities': 'community_preference',
}

/**
 * Parse control ID from user message
 * Returns the control ID if found, otherwise null
 */
function parseControlIdFromMessage(message: string): string | null {
  const lowerMessage = message.toLowerCase().trim()

  // Check direct aliases
  for (const [alias, controlId] of Object.entries(CONTROL_ID_ALIASES)) {
    if (lowerMessage === alias || lowerMessage.includes(alias)) {
      return controlId
    }
  }

  return null
}

/**
 * Get a specific question by control ID
 * Searches across multiple question sets to find the question
 * This allows users to access any control regardless of their current context/criteria
 */
function getQuestionByControlId(
  controlId: string,
  context: ConversationContext
): ConversationalQuestion | null {
  // First try with current context criteria
  const questions = getMockQuestions(context.extractedCriteria)
  let question = questions.find((q) => q.id === controlId)

  if (question) {
    return question
  }

  // If not found, search in all available question sets
  // This ensures users can access any control even if it's not in their current flow
  for (const questionSet of [MOCK_QUESTIONS_3BHK_INDIRANAGAR, MOCK_QUESTIONS_VILLA, MOCK_QUESTIONS_GENERAL]) {
    question = questionSet.find((q) => q.id === controlId)
    if (question) {
      return question
    }
  }

  return null
}

/**
 * Process a user message to extract control ID
 * If user types a control ID, show that question
 * Otherwise provide helpful guidance
 */
export async function processChatMessage(
  userMessage: string,
  context: ConversationContext
): Promise<{ llmResponse: LLMResponse; updatedContext: ConversationContext }> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 400))

  // Parse control ID from message
  const controlId = parseControlIdFromMessage(userMessage)

  if (!controlId) {
    // User didn't specify a control ID - provide guidance
    return {
      llmResponse: {
        systemMessage: `I didn't recognize that control. Try typing one of these: req_type, budget, property_type, property_status, furnishing_status, special_requests, proximity_location, or community_preference`,
      },
      updatedContext: context,
    }
  }

  // Get the requested question
  const question = getQuestionByControlId(controlId, context)

  if (!question) {
    return {
      llmResponse: {
        systemMessage: `Sorry, I couldn't find that question. Try typing one of these: req_type, budget, property_type, property_status, furnishing_status, special_requests, proximity_location, or community_preference`,
      },
      updatedContext: context,
    }
  }

  // Check if already asked
  const alreadyAsked = context.askedQuestionIds.includes(controlId)
  const alreadyAnswered = context.allAnswers[controlId] !== undefined

  let systemMessage = ''
  if (alreadyAnswered) {
    systemMessage = `You already answered this one. Your answer: ${JSON.stringify(context.allAnswers[controlId])}`
  } else if (alreadyAsked) {
    systemMessage = 'Let me ask you this again...'
  } else {
    systemMessage = `Great, let's answer this question:`
  }

  return {
    llmResponse: {
      systemMessage,
      question,
    },
    updatedContext: {
      ...context,
      askedQuestionIds: alreadyAsked
        ? context.askedQuestionIds
        : [...context.askedQuestionIds, controlId],
    },
  }
}

