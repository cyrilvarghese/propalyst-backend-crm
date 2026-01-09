'use client'

import { useEffect, useRef, ReactNode, forwardRef } from 'react'
import { animate } from 'motion/react'

interface ChatContainerProps {
  children: ReactNode
  shouldAutoScroll?: boolean
  disableAutoScroll?: boolean
}

/**
 * ChatContainer Component
 * Manages the scrollable chat messages area
 * Auto-scrolls to latest message when new messages arrive
 */
export const ChatContainer = forwardRef<HTMLDivElement, ChatContainerProps>(
  function ChatContainerComponent({
    children,
    shouldAutoScroll = true,
    disableAutoScroll = false,
  }: ChatContainerProps, ref) {
    const internalRef = useRef<HTMLDivElement>(null)
    const lastMessageRef = useRef<HTMLDivElement>(null)

    // Auto-scroll to latest message
    useEffect(() => {
      if (!shouldAutoScroll || disableAutoScroll) {
        return
      }

      // Small delay to allow DOM to update
      const timer = setTimeout(() => {
        const container = internalRef.current
        if (!lastMessageRef.current || !container) {
          return
        }

        const targetScroll = container.scrollHeight - container.clientHeight

        // Smooth scroll animation
        animate(container.scrollTop, targetScroll, {
          duration: 0.6,
          ease: 'easeInOut',
          onUpdate: (value) => {
            container.scrollTop = value
          },
        })
      }, 100)

      return () => clearTimeout(timer)
    }, [shouldAutoScroll, children, disableAutoScroll])

    return (
      <div
        ref={ref || internalRef}
        className="flex-1 overflow-y-auto w-full max-w-3xl mx-auto px-4 py-6 space-y-4 mb-32 pb-16"
      >
        <div className="space-y-4">{children}</div>
        <div ref={lastMessageRef} />
      </div>
    )
  }
)
