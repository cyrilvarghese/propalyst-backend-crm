/**
 * Intent Parser
 * Extracts structured criteria from free-form user messages
 * Uses keyword matching to identify property requirements
 */

export interface ParsedIntent {
  criteria: {
    bhk?: number
    location?: string
    property_type?: string
    req_type?: string
  }
  confidence: number
  triggeredKeywords: string[]
  rawMessage: string
}

/**
 * Known locations in the system
 * This is a hardcoded list - in production, this would come from a database
 */
const KNOWN_LOCATIONS = [
  'indiranagar',
  'ulsoor',
  'domlur',
  'jeevan bhiomagar',
  'kodihalli',
  'koramangala',
  'whitefield',
  'hsr layout',
  'hsr',
  'bellandur',
  'electronic city',
  'kannur',
]

/**
 * Parse user message and extract property search criteria
 * Uses simple keyword matching for MVP - can be upgraded to LLM later
 */
export function parseUserIntent(message: string): ParsedIntent {
  const lowerMessage = message.toLowerCase()
  const criteria: any = {}
  const keywords: string[] = []

  // BHK detection (e.g., "3BHK", "3 BHK", "3 bedroom")
  const bhkMatch = lowerMessage.match(/(\d+)\s*(bhk|bedroom|bed|br)/)
  if (bhkMatch) {
    criteria.bhk = parseInt(bhkMatch[1])
    keywords.push('bhk')
  }

  // Location detection
  for (const location of KNOWN_LOCATIONS) {
    if (lowerMessage.includes(location)) {
      // Capitalize first letter
      criteria.location = location
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      keywords.push('location')
      break
    }
  }

  // Property type detection
  if (lowerMessage.includes('villa')) {
    criteria.property_type = 'villa'
    keywords.push('property_type')
  } else if (
    lowerMessage.includes('apartment') ||
    lowerMessage.includes('apt') ||
    lowerMessage.includes('flat')
  ) {
    criteria.property_type = 'apartment'
    keywords.push('property_type')
  } else if (lowerMessage.includes('independent house') || lowerMessage.includes('house')) {
    criteria.property_type = 'independent_house'
    keywords.push('property_type')
  } else if (lowerMessage.includes('penthouse')) {
    criteria.property_type = 'penthouse'
    keywords.push('property_type')
  }

  // Transaction type detection (buy/rent)
  if (lowerMessage.includes('rent')) {
    criteria.req_type = 'rent'
    keywords.push('req_type')
  } else if (lowerMessage.includes('buy')) {
    criteria.req_type = 'buy'
    keywords.push('req_type')
  }

  // Calculate confidence (0-1 scale)
  // More keywords found = higher confidence in the extraction
  let confidence = 0
  if (keywords.length > 0) {
    confidence = Math.min(keywords.length / 4, 1) // Max 4 criteria fields
  }

  return {
    criteria,
    confidence,
    triggeredKeywords: keywords,
    rawMessage: message,
  }
}

/**
 * Generate a friendly acknowledgment message based on what was extracted
 */
export function generateAcknowledgmentMessage(intent: ParsedIntent): string {
  if (intent.confidence === 0) {
    return "I'd love to help you find your dream property! Could you tell me more about what you're looking for?"
  }

  const parts: string[] = []

  if (intent.criteria.bhk) {
    parts.push(`a ${intent.criteria.bhk}BHK`)
  }

  if (intent.criteria.property_type) {
    parts.push(`${intent.criteria.property_type}`)
  }

  if (intent.criteria.location) {
    parts.push(`in ${intent.criteria.location}`)
  }

  if (intent.criteria.req_type) {
    parts.push(`to ${intent.criteria.req_type}`)
  }

  const criteria = parts.join(' ')

  if (intent.confidence > 0.7) {
    return `Great! Looking for ${criteria}. Let me ask a few more questions to narrow down your search.`
  } else if (intent.confidence > 0.3) {
    return `Got it! So you want ${criteria}. Let me get a few more details.`
  } else {
    return `I found some details from your message. Let me ask you some follow-up questions.`
  }
}
