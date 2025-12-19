"use client"

import { motion } from "motion/react"
import { Card } from "@/components/ui/card"
import { Lightbulb } from "lucide-react"

interface SimpleInsightsProps {
  answers: Record<string, any>
}

/**
 * Generates simple insights based on user's answers
 */
function generateInsights(answers: Record<string, any>): string[] {
  const insights: string[] = []
  const budget = answers.budget as [number, number] | undefined
  const propertyType = answers.property_type
  const bedroomCount = answers.bedroom_count
  const furnishing = answers.furnishing_status
  const reqType = answers.req_type

  // Budget-based insights
  if (budget) {
    const midBudget = (budget[0] + budget[1]) / 2
    if (midBudget >= 2.5) {
      insights.push(`Your budget of ₹${budget[0]}-${budget[1]}Cr puts you in the premium segment with access to luxury communities`)
    } else if (midBudget >= 1.5) {
      insights.push(`Your budget of ₹${budget[0]}-${budget[1]}Cr offers excellent value with quality communities and modern amenities`)
    } else {
      insights.push(`Your budget of ₹${budget[0]}-${budget[1]}Cr is perfect for finding affordable yet well-connected properties`)
    }
  }

  // Property type insights
  if (propertyType === "apartment") {
    insights.push("Apartments are the most sought-after property type in the Indiranagar area with excellent connectivity")
  } else if (propertyType === "villa") {
    insights.push("Villas in this area offer spacious living with premium amenities and privacy")
  }

  // Bedroom insights
  if (bedroomCount) {
    const rooms = parseInt(bedroomCount)
    if (rooms === 3) {
      insights.push("3BHK properties are most popular in Indiranagar with strong demand and good appreciation potential")
    }
  }

  // Furnishing insights
  if (furnishing === "semi_furnished") {
    insights.push("Semi-furnished properties give you flexibility to customize while reducing your initial investment")
  } else if (furnishing === "furnished") {
    insights.push("Fully furnished properties are ready to move in and perfect for immediate occupancy")
  }

  // Request type insights
  if (reqType === "buy") {
    insights.push("Indiranagar is experiencing strong growth with steady property appreciation, making it a smart investment choice")
  } else if (reqType === "rent") {
    insights.push("Rental properties in Indiranagar have high demand due to IT professionals and excellent location")
  }

  return insights
}

export function SimpleInsights({ answers }: SimpleInsightsProps) {
  const insights = generateInsights(answers)

  if (insights.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="bg-card border border-border rounded-lg p-6 space-y-4"
    >
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-primary" />
        Key Insights
      </h3>

      <div className="space-y-3">
        {insights.map((insight, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="bg-primary/5 border-primary/20 p-4">
              <p className="text-sm text-foreground leading-relaxed">{insight}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
