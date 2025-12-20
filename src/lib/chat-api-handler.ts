/**
 * Chat API Handler
 * Wraps API calls with chat logic - converts API responses to chat messages
 */

import {
  BrokerAgentService,
} from '@/services/broker-agent.service'
import { ConversationContext } from '@/context/ChatContext'

export interface LLMResponse {
  systemMessage?: string
  acknowledgment?: string
  question?: any
  shouldShowSummary?: boolean
}

export interface ProcessUserMessageResult {
  llmResponse: LLMResponse
  updatedContext: ConversationContext
  sessionId: string
}

export interface SubmitQuestionAnswerResult {
  llmResponse: LLMResponse
  updatedContext: ConversationContext
}

/**
 * Initialize chat - create session and get first question
 */
export async function initializeChatSession(
  context: ConversationContext
): Promise<ProcessUserMessageResult> {
  try {
    // Create new session
    const { session_id, message } = await BrokerAgentService.createSession()

    // Get first question
    const response = await BrokerAgentService.getCurrentQuestion(session_id)

    return {
      llmResponse: {
        systemMessage: message || response.message,
        acknowledgment: response.acknowledgment,
        question: response.current_question,
        shouldShowSummary: response.completed,
      },
      updatedContext: {
        ...context,
        allAnswers: response.user_summary || {},
      },
      sessionId: session_id,
    }
  } catch (error) {
    console.error('Error initializing chat session:', error)
    throw new Error(
      error instanceof Error ? error.message : 'Failed to initialize chat session'
    )
  }
}

/**
 * Submit an answer and get the next question
 */
export async function submitQuestionAnswerToAPI(
  sessionId: string,
  questionId: string,
  answer: any,
  context: ConversationContext
): Promise<SubmitQuestionAnswerResult> {
  try {
    // Submit answer to API
    const response = await BrokerAgentService.submitAnswer(
      sessionId,
      questionId,
      answer
    )

    return {
      llmResponse: {
        systemMessage: response.message,
        acknowledgment: response.acknowledgment,
        question: response.current_question,
        shouldShowSummary: response.completed,
      },
      updatedContext: {
        ...context,
        allAnswers: {
          ...context.allAnswers,
          ...response.user_summary,
        },
      },
    }
  } catch (error) {
    console.error('Error submitting answer:', error)
    throw new Error(
      error instanceof Error ? error.message : 'Failed to submit answer'
    )
  }
}

/**
 * Fetch the final conversation summary
 */
export async function fetchConversationSummary(
  sessionId: string
): Promise<Record<string, any>> {
  try {
    return await BrokerAgentService.getFinalSummary(sessionId)
  } catch (error) {
    console.error('Error fetching summary:', error)
    throw new Error(
      error instanceof Error ? error.message : 'Failed to fetch summary'
    )
  }
}
