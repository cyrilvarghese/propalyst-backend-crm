'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/navbar/navbar'
import { ChatProvider, useChat, ChatQuestionMessage } from '@/context/ChatContext'
import { ChatMessage } from '@/app/chat-new/components/ChatMessage'
import { QuestionMessage } from '@/app/chat-new/components/QuestionMessage'
import { TypingIndicator } from '@/app/chat-new/components/TypingIndicator'
import { ChatInputArea } from '@/app/chat-new/components/ChatInputArea'
import { ChatContainer } from '@/app/chat-new/components/ChatContainer'
import { AnsweredQuestionsBadges } from '@/app/chat-new/components/AnsweredQuestionsBadges'
import { ConversationSummary } from '@/components/home/conversation-summary'
import { processChatMessage } from '@/lib/mock-llm'
import { motion } from 'motion/react'

/**
 * ChatNewPageContent Component
 * Main content component that uses the ChatContext
 */
function ChatNewPageContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const { state, addMessage, answerQuestion, updateContext, setProcessing, setComplete } = useChat()

  const [showTyping, setShowTyping] = useState(false)
  const [initialized, useInitialized] = useState(false)
  const initialized_ref = useRef(false)

  // Initialize with URL query if provided
  useEffect(() => {
    if (initialized_ref.current) return

    initialized_ref.current = true
    useInitialized(true)

    if (query) {
      // Add user message
      addMessage({
        type: 'user',
        content: query,
      })

      // Process with LLM
      handleUserMessage(query)
    }
  }, [query])

  const handleUserMessage = async (message: string) => {
    setProcessing(true)
    setShowTyping(true)

    try {
      // Get LLM response (control ID approach)
      const { llmResponse, updatedContext } = await processChatMessage(
        message,
        state.conversationContext
      )

      // Update context
      if (updatedContext !== state.conversationContext) {
        updateContext(updatedContext)
      }

      // Add system message
      if (llmResponse.systemMessage) {
        addMessage({
          type: 'system',
          content: llmResponse.systemMessage,
        })
      }

      // Hide typing indicator
      setShowTyping(false)

      // Add question if provided
      if (llmResponse.question) {
        addMessage({
          type: 'question',
          question: llmResponse.question,
          state: 'active',
        })
      }

      // Show summary if complete
      if (llmResponse.shouldShowSummary) {
        setComplete(true)
      }
    } catch (error) {
      console.error('Error processing message:', error)
      addMessage({
        type: 'system',
        content: 'Sorry, something went wrong. Please try again.',
      })
      setShowTyping(false)
    } finally {
      setProcessing(false)
    }
  }

  const handleQuestionAnswer = (messageId: string, answer: any) => {
    // Find the question message
    const questionMessage = state.messages.find(
      (msg): msg is ChatQuestionMessage =>
        msg.type === 'question' && msg.id === messageId
    )

    if (!questionMessage) return

    // Update context with answer
    answerQuestion(questionMessage.question.id, answer)

    // For control ID approach, just mark as answered
    // User can type next control ID when ready
  }

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return

    // Add user message
    addMessage({
      type: 'user',
      content: message,
    })

    // Process message
    handleUserMessage(message)
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
          {/* Empty state */}
          {state.messages.length === 0 && !state.isComplete && (
            <div className="flex-1 flex flex-col items-center justify-center text-center h-96">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 max-w-md"
              >
                <h2 className="text-3xl font-bold tracking-tight">Start Your Search</h2>
                <p className="text-muted-foreground">
                  Type a control ID like: budget, req_type, property_type, community_preference
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
              placeholder="Type a control ID (e.g., budget, req_type, property_type)..."
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
