'use client'

import { useState, useEffect, useRef } from 'react'
import Navbar from '@/components/navbar/navbar'
import { ChatProvider, useChat, ChatQuestionMessage } from '@/context/ChatContext'
import { ChatMessage } from '@/app/chat-new/components/ChatMessage'
import { QuestionMessage } from '@/app/chat-new/components/QuestionMessage'
import { TypingIndicator } from '@/app/chat-new/components/TypingIndicator'
import { ChatInputArea } from '@/app/chat-new/components/ChatInputArea'
import { ChatContainer } from '@/app/chat-new/components/ChatContainer'
import { AnsweredQuestionsBadges } from '@/app/chat-new/components/AnsweredQuestionsBadges'
import { ConversationSummary } from '@/components/home/conversation-summary'
import {
  initializeChatSession,
  submitQuestionAnswerToAPI,
} from '@/lib/chat-api-handler'
import { motion } from 'motion/react'

/**
 * ChatNewPageContent Component
 * Main content component that uses the ChatContext
 */
function ChatNewPageContent() {
  const { state, addMessage, answerQuestion, updateContext, setSessionId, setProcessing, setComplete } = useChat()

  const [showTyping, setShowTyping] = useState(false)
  const initialized_ref = useRef(false)

  // Initialize chat on page load
  useEffect(() => {
    if (initialized_ref.current) return

    initialized_ref.current = true
    initializeChat()
  }, [])

  const initializeChat = async () => {
    setProcessing(true)
    setShowTyping(true)

    try {
      // Create session and get first question
      const { llmResponse, updatedContext, sessionId } = await initializeChatSession(
        state.conversationContext
      )

      // Store session ID
      setSessionId(sessionId)

      // Update context with answers from API
      updateContext(updatedContext)

      // Hide typing
      setShowTyping(false)

      // Add system message
      if (llmResponse.systemMessage) {
        addMessage({
          type: 'system',
          content: llmResponse.systemMessage,
        })
      }

      // Add first question
      if (llmResponse.question) {
        addMessage({
          type: 'question',
          question: llmResponse.question,
          state: 'active',
        })
      }
    } catch (error) {
      console.error('Error initializing chat:', error)
      addMessage({
        type: 'system',
        content: `Sorry, something went wrong: ${error instanceof Error ? error.message : 'Failed to initialize chat'}. Please refresh the page.`,
      })
      setShowTyping(false)
    } finally {
      setProcessing(false)
    }
  }

  const handleQuestionAnswer = async (messageId: string, answer: any) => {
    // Find the question message
    const questionMessage = state.messages.find(
      (msg): msg is ChatQuestionMessage =>
        msg.type === 'question' && msg.id === messageId
    )

    if (!questionMessage) return

    // Mark current question as answered
    answerQuestion(questionMessage.question.id, answer)

    // Submit answer to API and get next question
    setProcessing(true)
    setShowTyping(true)

    try {
      const { llmResponse, updatedContext } = await submitQuestionAnswerToAPI(
        state.sessionId!,
        questionMessage.question.id,
        answer,
        state.conversationContext
      )

      // Update context with latest answers
      updateContext(updatedContext)

      // Hide typing
      setShowTyping(false)

      // Check if conversation is complete
      if (llmResponse.shouldShowSummary) {
        setComplete(true)
        return
      }

      // Add acknowledgment message (only if present, as it replaces system message)
      if (llmResponse.acknowledgment) {
        addMessage({
          type: 'system',
          content: llmResponse.acknowledgment,
        })
      } else if (llmResponse.systemMessage) {
        // Add system message only if acknowledgment doesn't exist
        addMessage({
          type: 'system',
          content: llmResponse.systemMessage,
        })
      }

      // Add next question
      if (llmResponse.question) {
        addMessage({
          type: 'question',
          question: llmResponse.question,
          state: 'active',
        })
      }
    } catch (error) {
      console.error('Error submitting answer:', error)
      addMessage({
        type: 'system',
        content: `Sorry, something went wrong: ${error instanceof Error ? error.message : 'Failed to submit answer'}. Please try again.`,
      })
      setShowTyping(false)
    } finally {
      setProcessing(false)
    }
  }

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return

    // Add user message to chat history
    addMessage({
      type: 'user',
      content: message,
    })

    // User messages are just stored in chat history for now
    // (can be enhanced in future to send additional context to API)
  }

  // Calculate summary data
  const summaryData = state.isComplete
    ? {
      answers: state.conversationContext.allAnswers,
      questions: state.messages
        .filter((msg): msg is ChatQuestionMessage => msg.type === 'question')
        .map((msg) => msg.question),
    }
    : null

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Navbar */}
      <Navbar />

      {/* Main chat area - centered with max width */}
      <div className="flex-1 flex flex-col pb-24 items-center w-full max-w-3xl mx-auto ">
        <ChatContainer>
          {/* Empty state - shown while loading first question */}
          {state.messages.length === 0 && !state.isComplete && (
            <div className="flex-1 flex flex-col items-center justify-center text-center h-96">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 max-w-md"
              >
                <h2 className="text-3xl font-bold tracking-tight">Finding Your Perfect Property</h2>
                <p className="text-muted-foreground">
                  We're loading a few questions to help narrow down your search...
                </p>
              </motion.div>
            </div>
          )}

          {/* Messages */}
          {state.messages.map((message) => {
            if (message.type === 'user' || message.type === 'system') {
              return <ChatMessage key={message.id} message={message} />
            } else if (message.type === 'question') {
              return (
                <QuestionMessage
                  key={message.id}
                  message={message}
                  onAnswer={(answer) => handleQuestionAnswer(message.id, answer)}
                  isActive={message.state === 'active'}
                />
              )
            }
            return null
          })}

          {/* Typing indicator */}
          <TypingIndicator visible={showTyping} />

          {/* Summary */}
          {state.isComplete && summaryData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8 w-full"
            >
              <ConversationSummary
                answers={summaryData.answers}
                questions={summaryData.questions}
              />
            </motion.div>
          )}
        </ChatContainer>
      </div>


      {/* Chat input - fixed at bottom */}
      <div className="w-full fixed bottom-0 bg-background/95">
        {/* Answered questions badges - above input */}
        <AnsweredQuestionsBadges
          messages={state.messages}
          allAnswers={state.conversationContext.allAnswers}
        />

        {!state.isComplete && (
          <div className="flex items-center justify-center w-full">
            <ChatInputArea
              onSendMessage={handleSendMessage}
              disabled={state.isProcessing}
              placeholder="Add any notes or clarifications (optional)..."
            />
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * ChatNewPage Component
 * Wraps content with ChatProvider
 */
export default function ChatNewPage() {
  return (
    <ChatProvider>
      <ChatNewPageContent />
    </ChatProvider>
  )
}
