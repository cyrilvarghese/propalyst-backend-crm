/**
 * Broker Agent Service
 * Handles all communication with the real estate agent backend API
 */

import { ConversationalQuestion } from '@/data/mock-questions'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
const BROKER_AGENT_API = `${API_BASE_URL}/api/broker_agent`
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true'

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface BrokerAgentSession {
  session_id: string
  current_question: ConversationalQuestion | null
  acknowledgment?: string
  message: string
  completed: boolean
  user_summary: Record<string, any>
  processed_answer?: any
  processed_question_id?: string
  messages: string[]
}

export interface CreateSessionResponse {
  session_id: string
  message: string
}

export interface SubmitAnswerRequest {
  answer: any
  type: string,
  question_id: string
}

export interface FinalSummary {
  [key: string]: any
}

// ============================================================================
// BROKER AGENT SERVICE CLASS
// ============================================================================

export class BrokerAgentService {
  /**
   * Create a new conversation session
   * POST /api/broker_agent/sessions
   * @returns Promise containing the session ID and welcome message
   * @throws Error if the API request fails
   */
  static async createSession(): Promise<CreateSessionResponse> {
    if (USE_MOCK) {
      return {
        session_id: `mock-session-${Date.now()}`,
        message: 'Welcome to the Real Estate Agent! Let\'s find your perfect property.',
      }
    }

    try {
      const response = await fetch(`${BROKER_AGENT_API}/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          errorData.detail || `Failed to create session: ${response.statusText}`
        )
      }

      return await response.json()
    } catch (error) {
      console.error('Error creating session:', error)
      throw error
    }
  }

  /**
   * Get the current question for a session
   * GET /api/broker_agent/sessions/{session_id}
   * @param sessionId - The session ID
   * @returns Promise containing the current session state with question
   * @throws Error if the API request fails
   */
  static async getCurrentQuestion(
    sessionId: string
  ): Promise<BrokerAgentSession> {
    if (USE_MOCK) {
      // Return mock first question
      return {
        session_id: sessionId,
        current_question: {
          id: 'transaction_type',
          question: 'Are you looking to buy or sell a property?',
          label: 'Transaction Type',
          controlType: 'radio',
          required: true,
          data: {
            options: [
              { value: 'buy', label: 'Buy', count: 234, icon: 'ShoppingCart' },
              { value: 'sell', label: 'Sell', count: 89, icon: 'Tag' },
            ],
          },
        },
        message: 'Are you looking to buy or sell a property?',
        completed: false,
        user_summary: {},
        messages: [],
      }
    }

    try {
      const response = await fetch(`${BROKER_AGENT_API}/sessions/${sessionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          errorData.detail || `Failed to get current question: ${response.statusText}`
        )
      }

      return await response.json()
    } catch (error) {
      console.error('Error getting current question:', error)
      throw error
    }
  }

  /**
   * Submit an answer to the current question and get the next question
   * POST /api/broker_agent/sessions/{session_id}/answer
   * @param sessionId - The session ID
   * @param questionId - The question ID being answered
   * @param answer - The user's answer value
   * @returns Promise containing the next session state with new question
   * @throws Error if the API request fails
   */
  static async submitAnswer(
    sessionId: string,
    questionId: string,
    answer: any,
    type: string
  ): Promise<BrokerAgentSession> {
    if (USE_MOCK) {
      // Return mock next question
      return {
        session_id: sessionId,
        current_question: {
          id: 'property_type',
          question: 'What type of property are you looking for?',
          label: 'Property Type',
          controlType: 'toggle-group',
          required: true,
          data: {
            options: [
              { value: 'apartment', label: 'Apartment', count: 298, icon: 'Building2' },
              { value: 'villa', label: 'Villa', count: 18, icon: 'Home' },
              { value: 'independent_house', label: 'Independent House', count: 7, icon: 'House' },
            ],
          },
        },
        message: 'What type of property are you looking for?',
        completed: false,
        user_summary: {
          transaction_type: answer,
        },
        messages: [],
      }
    }

    try {
      const response = await fetch(
        `${BROKER_AGENT_API}/sessions/${sessionId}/answer`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            answer,
            type,
            question_id: questionId,
          } as SubmitAnswerRequest),
        }
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          errorData.detail || `Failed to submit answer: ${response.statusText}`
        )
      }

      return await response.json()
    } catch (error) {
      console.error('Error submitting answer:', error)
      throw error
    }
  }

  /**
   * Get the final summary of all answers
   * GET /api/broker_agent/sessions/{session_id}/summary
   * @param sessionId - The session ID
   * @returns Promise containing the summary of extracted criteria and answers
   * @throws Error if the API request fails
   */
  static async getFinalSummary(sessionId: string): Promise<FinalSummary> {
    if (USE_MOCK) {
      return {
        transaction_type: 'buy',
        location: 'Indiranagar',
        price_range: {
          min: 50.0,
          max: 100.0,
        },
        area_range: {
          min: 1000,
          max: 2500,
        },
        property_type: 'apartment',
        special_features: ['gym', 'pool', 'parking'],
      }
    }

    try {
      const response = await fetch(
        `${BROKER_AGENT_API}/sessions/${sessionId}/summary`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          errorData.detail || `Failed to get summary: ${response.statusText}`
        )
      }

      return await response.json()
    } catch (error) {
      console.error('Error getting summary:', error)
      throw error
    }
  }
}
