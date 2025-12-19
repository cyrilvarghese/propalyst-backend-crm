"use client"

import { motion } from "motion/react"
import { CheckCircle } from "lucide-react"

interface SummaryHeaderProps {
  answers: Record<string, any>
}

export function SummaryHeader({ answers }: SummaryHeaderProps) {
  const answeredCount = Object.keys(answers).length

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      <div className="flex items-center gap-3">
        <CheckCircle className="w-6 h-6 text-primary" />
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Perfect! We've captured your requirements
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Here's a summary of your property search.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
