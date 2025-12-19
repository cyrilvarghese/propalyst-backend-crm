'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar/navbar'
import SearchInput from '@/components/home/search-input'
import ConversationalFlow from '@/components/home/conversational-flow'
import { getMockQuestions } from '@/data/mock-questions'
import { motion } from 'motion/react'

interface Message {
  id: string
  type: 'user' | 'system'
  content: string
  timestamp: Date
}

export default function SearchPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [showQuestions, setShowQuestions] = useState(false)
  const [extractedCriteria, setExtractedCriteria] = useState<{
    bhk?: number | undefined
    location?: string | undefined
    property_type?: string | undefined
  }>({})

  const handleQuestionsComplete = (answers: Record<string, any>) => {
    console.log('Questions completed with answers:', answers)

    // Add system message that questions were completed
    const systemMessage: Message = {
      id: Date.now().toString(),
      type: 'system',
      content: `Great! I've captured your preferences. Found ${Math.floor(Math.random() * 100) + 20} matching properties.`,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, systemMessage])
    setShowQuestions(false)
  }

  const handleSearch = (query: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: query,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    // Simulate LLM criteria extraction
    // In a real app, this would call an LLM API
    setTimeout(() => {
      // Extract criteria from query (simplified mock)
      let criteria: { bhk?: number; location?: string; property_type?: string } = {}

      if (query.toLowerCase().includes('3bhk') && query.toLowerCase().includes('indiranagar')) {
        criteria = { bhk: 3, location: 'Indiranagar' }
      } else if (query.toLowerCase().includes('villa')) {
        criteria = { property_type: 'villa' }
      }

      setExtractedCriteria(criteria)

      const systemMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'system',
        content: 'Let me ask you a few questions to refine your search...',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, systemMessage])

      setShowQuestions(true)
    }, 800)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Navbar */}
      <Navbar />

      {/* Main Conversation Area */}
      <div className="flex-1 flex flex-col items-center justify-center overflow-hidden pb-32">
        {/* Messages Container */}
        <div className="w-full max-w-3xl h-full flex flex-col px-4 py-8 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h2 className="text-3xl font-bold tracking-tight">
                  Start Your Search
                </h2>
                <p className="text-muted-foreground max-w-md">
                  Tell me about your dream home and I'll help you find the perfect match
                </p>
              </motion.div>
            </div>
          ) : (
            <div className="space-y-6 flex flex-col">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-md px-4 py-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-muted text-muted-foreground rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Questions Section */}
          {showQuestions && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-8 w-full"
            >
              <ConversationalFlow
                questions={getMockQuestions(extractedCriteria)}
                onComplete={handleQuestionsComplete}
                onClose={() => setShowQuestions(false)}
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Search Input - Stuck to Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border/40 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <SearchInput onMissingQuestions={handleSearch} />
        </div>
      </div>
    </div>
  )
}
