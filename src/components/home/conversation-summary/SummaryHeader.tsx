"use client"

import { motion } from "motion/react"
import { CheckCircle } from "lucide-react"
import { ConversationalQuestion } from "@/data/mock-questions"
import { Badge } from "@/components/ui/badge"

interface SummaryHeaderProps {
  answers: Record<string, any>
  questions: ConversationalQuestion[]
}

export function SummaryHeader({ answers, questions }: SummaryHeaderProps) {
  // Create a map of question IDs to questions for quick lookup
  const questionMap = new Map(
    questions.map((q) => [q.id, q])
  )

  // Unit mappings for range values
  const RANGE_UNITS: Record<string, string> = {
    budget: 'cr',
    property_area: 'sq ft',
  }

  // Format range values as "min-max unit"
  const formatRangeValue = (key: string, value: any): any => {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const { min, max } = value
      if (min !== null && min !== undefined && max !== null && max !== undefined) {
        const unit = RANGE_UNITS[key] || ''
        const rangeStr = `${min}-${max}${unit ? ' ' + unit : ''}`
        return rangeStr
      }
    }
    return value
  }

  // Filter out null, undefined, empty strings
  const isValidValue = (value: any): boolean => {
    if (value === null || value === undefined || value === '') {
      return false
    }
    if (typeof value === 'object' && !Array.isArray(value)) {
      return Object.values(value).some(v => v !== null && v !== undefined)
    }
    return true
  }

  const badgeEntries = Object.entries(answers).filter(
    ([, value]) => isValidValue(value)
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Header */}
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

      {/* Answer Badges */}
      {badgeEntries.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {badgeEntries.map(([key, value], index) => {
            const formattedValue = formatRangeValue(key, value)
            const question = questionMap.get(key)
            const label = question
              ? question.label
              : key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <Badge variant="secondary" className="text-sm">
                  <span className="font-semibold">{label}:</span>
                  <span className="ml-1">
                    {typeof formattedValue === 'string'
                      ? formattedValue
                      : JSON.stringify(formattedValue)}
                  </span>
                </Badge>
              </motion.div>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}
