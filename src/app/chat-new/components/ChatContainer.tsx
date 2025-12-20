'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { motion, animate } from 'motion/react'

interface ChatContainerProps {
  children: ReactNode
  shouldAutoScroll?: boolean
}

/**
 * ChatContainer Component
 * Manages the scrollable chat messages area
 * Auto-scrolls to latest message when new messages arrive
 */
export function ChatContainer({
  children,
  shouldAutoScroll = true,
}: ChatContainerProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const lastMessageRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to latest message
  useEffect(() => {
    if (!shouldAutoScroll || !messagesContainerRef.current) {
      return
    }

    // Small delay to allow DOM to update
    const timer = setTimeout(() => {
      if (!lastMessageRef.current || !messagesContainerRef.current) {
        return
      }

      const scrollContainer = messagesContainerRef.current
      const targetScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight

      // Smooth scroll animation
      animate(scrollContainer.scrollTop, targetScroll, {
        duration: 0.6,
        ease: 'easeInOut',
        onUpdate: (value) => {
          scrollContainer.scrollTop = value
        },
      })
    }, 100)

    return () => clearTimeout(timer)
  }, [shouldAutoScroll, children])

  return (
    <div
      ref={messagesContainerRef}
      className="flex-1 overflow-y-auto px-4 py-6 space-y-4"
    >
      <div className="space-y-4">{children}</div>
      <div ref={lastMessageRef} />
    </div>
  )
}
