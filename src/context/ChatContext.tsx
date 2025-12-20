'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'
import { ConversationalQuestion } from '@/data/mock-questions'

// Message type definitions
export interface UserMessage {
  id: string
  type: 'user'
  content: string
  timestamp: Date
}

export interface SystemMessage {
  id: string
  type: 'system'
  content: string
  timestamp: Date
}

export interface ChatQuestionMessage {
  id: string
  type: 'question'
  question: ConversationalQuestion
  answer?: any
  state: 'active' | 'answered'
  timestamp: Date
}

export interface TypingMessage {
  id: string
  type: 'typing'
  timestamp: Date
}

export type ChatMessage = UserMessage | SystemMessage | ChatQuestionMessage | TypingMessage

// Conversation context
export interface ConversationContext {
  extractedCriteria: {
    bhk?: number
    location?: string
    property_type?: string
    req_type?: string
    budget?: [number, number]
    property_status?: string
    furnishing_status?: string
    special_requests?: string[]
  }
  askedQuestionIds: string[]
  allAnswers: Record<string, any>
}

// Chat state
export interface ChatState {
  sessionId: string | null
  messages: ChatMessage[]
  conversationContext: ConversationContext
  isProcessing: boolean
  isComplete: boolean
}

// Actions
export type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'UPDATE_MESSAGE'; payload: { id: string; updates: Partial<ChatMessage> } }
  | { type: 'ANSWER_QUESTION'; payload: { questionId: string; answer: any } }
  | { type: 'UPDATE_CONTEXT'; payload: Partial<ConversationContext> }
  | { type: 'SET_SESSION_ID'; payload: string }
  | { type: 'SET_PROCESSING'; payload: boolean }
  | { type: 'SET_COMPLETE'; payload: boolean }
  | { type: 'RESET' }

// Initial state
const initialState: ChatState = {
  sessionId: null,
  messages: [],
  conversationContext: {
    extractedCriteria: {},
    askedQuestionIds: [],
    allAnswers: {},
  },
  isProcessing: false,
  isComplete: false,
}

// Reducer function
function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      }

    case 'UPDATE_MESSAGE': {
      return {
        ...state,
        messages: state.messages.map((msg) =>
          msg.id === action.payload.id
            ? { ...msg, ...action.payload.updates }
            : msg
        ),
      }
    }

    case 'ANSWER_QUESTION': {
      const { questionId, answer } = action.payload
      return {
        ...state,
        messages: state.messages.map((msg) =>
          msg.type === 'question' && msg.question.id === questionId
            ? { ...msg, answer, state: 'answered' }
            : msg
        ),
        conversationContext: {
          ...state.conversationContext,
          allAnswers: {
            ...state.conversationContext.allAnswers,
            [questionId]: answer,
          },
          askedQuestionIds: state.conversationContext.askedQuestionIds.includes(
            questionId
          )
            ? state.conversationContext.askedQuestionIds
            : [...state.conversationContext.askedQuestionIds, questionId],
        },
      }
    }

    case 'UPDATE_CONTEXT':
      return {
        ...state,
        conversationContext: {
          ...state.conversationContext,
          extractedCriteria: {
            ...state.conversationContext.extractedCriteria,
            ...action.payload.extractedCriteria,
          },
          askedQuestionIds: action.payload.askedQuestionIds || state.conversationContext.askedQuestionIds,
          allAnswers: action.payload.allAnswers || state.conversationContext.allAnswers,
        },
      }

    case 'SET_SESSION_ID':
      return {
        ...state,
        sessionId: action.payload,
      }

    case 'SET_PROCESSING':
      return {
        ...state,
        isProcessing: action.payload,
      }

    case 'SET_COMPLETE':
      return {
        ...state,
        isComplete: action.payload,
      }

    case 'RESET':
      return initialState

    default:
      return state
  }
}

// Context type
interface ChatContextType {
  state: ChatState
  dispatch: React.Dispatch<ChatAction>
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void
  updateMessage: (id: string, updates: Partial<ChatMessage>) => void
  answerQuestion: (questionId: string, answer: any) => void
  updateContext: (updates: Partial<ConversationContext>) => void
  setSessionId: (sessionId: string) => void
  setProcessing: (isProcessing: boolean) => void
  setComplete: (isComplete: boolean) => void
  reset: () => void
}

// Create context
const ChatContext = createContext<ChatContextType | undefined>(undefined)

// Provider component
export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState)

  const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    dispatch({
      type: 'ADD_MESSAGE',
      payload: {
        ...message,
        id: `${Date.now()}-${Math.random()}`,
        timestamp: new Date(),
      } as ChatMessage,
    })
  }

  const updateMessage = (id: string, updates: Partial<ChatMessage>) => {
    dispatch({
      type: 'UPDATE_MESSAGE',
      payload: { id, updates },
    })
  }

  const answerQuestion = (questionId: string, answer: any) => {
    dispatch({
      type: 'ANSWER_QUESTION',
      payload: { questionId, answer },
    })
  }

  const updateContext = (updates: Partial<ConversationContext>) => {
    dispatch({
      type: 'UPDATE_CONTEXT',
      payload: updates,
    })
  }

  const setSessionId = (sessionId: string) => {
    dispatch({
      type: 'SET_SESSION_ID',
      payload: sessionId,
    })
  }

  const setProcessing = (isProcessing: boolean) => {
    dispatch({
      type: 'SET_PROCESSING',
      payload: isProcessing,
    })
  }

  const setComplete = (isComplete: boolean) => {
    dispatch({
      type: 'SET_COMPLETE',
      payload: isComplete,
    })
  }

  const reset = () => {
    dispatch({ type: 'RESET' })
  }

  return (
    <ChatContext.Provider
      value={{
        state,
        dispatch,
        addMessage,
        updateMessage,
        answerQuestion,
        updateContext,
        setSessionId,
        setProcessing,
        setComplete,
        reset,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

// Hook to use context
export function useChat() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within ChatProvider')
  }
  return context
}
