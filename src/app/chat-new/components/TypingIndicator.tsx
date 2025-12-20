'use client'

import { motion } from 'motion/react'

interface TypingIndicatorProps {
  visible: boolean
}

/**
 * TypingIndicator Component
 * Animated three dots that show the system is processing
 * Appears before questions or system messages
 */
export function TypingIndicator({ visible }: TypingIndicatorProps) {
  if (!visible) {
    return null
  }

  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -8 },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex justify-start"
    >
      <div className="bg-muted text-muted-foreground rounded-lg rounded-bl-none px-4 py-3 flex gap-1">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            variants={dotVariants}
            initial="initial"
            animate="animate"
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.15,
              ease: 'linear',
            }}
            className="w-2 h-2 bg-muted-foreground rounded-full"
          />
        ))}
      </div>
    </motion.div>
  )
}
