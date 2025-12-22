'use client'

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'

interface ChatInputAreaProps {
  onSendMessage: (message: string) => void

  disabled?: boolean
  placeholder?: string
}

/**
 * ChatInputArea Component
 * Fixed at bottom of chat, allows user to type and send messages
 * Auto-resizing textarea for longer messages
 */
export const ChatInputArea = forwardRef<{ focus: () => void }, ChatInputAreaProps>(
  function ChatInputArea(
    {
      onSendMessage,
      disabled = false,
      placeholder = 'Tell me about your dream home...',
    }: ChatInputAreaProps,
    ref
  ) {
    const [message, setMessage] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    // Expose focus method to parent
    useImperativeHandle(ref, () => ({
      focus: () => {
        if (inputRef.current) {
          setTimeout(() => {
            inputRef.current?.focus()
          }, 50)
        }
      },
    }))

    // Focus input when component mounts
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()

      if (message.trim() && !disabled) {
        onSendMessage(message.trim())
        setMessage('')

        // Re-focus input after sending
        if (inputRef.current) {
          setTimeout(() => {
            inputRef.current?.focus()
          }, 100)
        }
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Send on Enter, but allow Shift+Enter for new lines
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSubmit(e as any)
      }
    }

    return (
      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-3 bg-background/95 backdrop-blur-sm border-border/40 p-4 w-full max-w-3xl mx-auto"
      >
        <Input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={!message.trim() || disabled}
          size="icon"
          className="shrink-0"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    )
  }
)
