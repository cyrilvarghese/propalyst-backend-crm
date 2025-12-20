'use client'

import { motion } from 'motion/react'
import { UserMessage, SystemMessage } from '@/context/ChatContext'

type ChatMessageProps = {
  message: UserMessage | SystemMessage
}

/**
 * ChatMessage Component
 * Renders individual text messages in the chat
 * User messages: right-aligned, primary background
 * System messages: left-aligned, muted background
 */
export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-md px-4 py-3 rounded-lg ${
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-none'
            : 'bg-muted text-muted-foreground rounded-bl-none'
        }`}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
      </div>
    </motion.div>
  )
}
