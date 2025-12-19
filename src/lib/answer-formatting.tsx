"use client"

import { ConversationalQuestion } from "@/data/mock-questions"
import { ReactNode } from "react"
import { Tag, Wallet, Home, TrendingUp, Sofa, MapPin, BedDouble } from "lucide-react"

/**
 * Formats answer values for display in badges
 * Handles different data types: strings, arrays, numbers, objects
 * Includes units where applicable
 */
export function formatAnswerValue(value: any, question?: ConversationalQuestion): string {
  const unit = question?.data?.unit || ""

  if (Array.isArray(value)) {
    // Format arrays like [1.5, 2.5] as "1.5 - 2.5 Cr"
    if (value.length === 2 && typeof value[0] === 'number' && typeof value[1] === 'number') {
      return `${value[0]} - ${value[1]} ${unit}`.trim()
    }
    return value.join(", ")
  }

  if (typeof value === 'object' && value !== null) {
    // Handle location data - extract just the address
    if (value.location && typeof value.location === 'object' && value.location.address) {
      return value.location.address
    }
    return JSON.stringify(value)
  }

  const stringValue = String(value)
  // Add unit if available and value is numeric
  if (unit && !isNaN(Number(stringValue))) {
    return `${stringValue} ${unit}`.trim()
  }
  return stringValue
}

/**
 * Renders the appropriate icon for a question ID
 */
export function renderQuestionIcon(questionId: string): ReactNode {
  const iconClassName = "w-3.5 h-3.5"

  switch (questionId) {
    case "req_type":
      return <Tag className={iconClassName} />
    case "budget":
      return <Wallet className={iconClassName} />
    case "bedroom_count":
      return <BedDouble className={iconClassName} />
    case "property_type":
      return <Home className={iconClassName} />
    case "property_status":
      return <TrendingUp className={iconClassName} />
    case "furnishing_status":
      return <Sofa className={iconClassName} />
    case "community_preference":
      return <MapPin className={iconClassName} />
    default:
      if (questionId.includes("proximity_location")) {
        return <MapPin className={iconClassName} />
      }
      return <Tag className={iconClassName} />
  }
}
