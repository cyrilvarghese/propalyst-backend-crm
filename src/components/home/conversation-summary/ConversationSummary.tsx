"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Loader2, Star } from "lucide-react"
import { ConversationalQuestion, fetchListingMatches, ListingSearchResponse } from "@/data/mock-questions"
import { AnswerBadges } from "./AnswerBadges"
import { SelectedCommunities } from "./SelectedCommunities"

interface ConversationSummaryProps {
  answers: Record<string, any>
  questions: ConversationalQuestion[]
}

/**
 * Compact conversation summary with two states:
 * 1. Has Listings: Shows matched properties with CTA
 * 2. No Listings: Shows "we'll get back to you" message
 */
export function ConversationSummary({
  answers,
  questions,
}: ConversationSummaryProps) {
  const router = useRouter()
  const [listingResponse, setListingResponse] = useState<ListingSearchResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setIsLoading(true)
        // Extract criteria from answers
        const criteria = {
          bhk: questions.find((q) => q.id === "bedroom_count")
            ? answers.bedroom_count || answers[Object.keys(answers).find((k) => k.includes("bhk")) || ""]
            : null,
          location: answers.location,
          property_type: answers.property_type,
          budget: answers.budget,
        }

        const response = await fetchListingMatches(criteria)
        setListingResponse(response)
      } catch (err) {
        setError("Failed to fetch listings")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchListings()
  }, [answers, questions])

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl mx-auto p-6 flex items-center justify-center"
      >
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Finding perfect matches for you...</p>
        </div>
      </motion.div>
    )
  }

  if (error || !listingResponse) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl mx-auto p-6"
      >
        <Card className="p-6 bg-destructive/5 border-destructive/20">
          <p className="text-destructive">{error || "Something went wrong"}</p>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl mx-auto space-y-6 p-6"
    >
      {listingResponse.hasListing ? (
        // State 1: Listings Found
        <>
          {/* Your Criteria Section */}
          <AnswerBadges answers={answers} questions={questions} />

          {/* Selected Communities Section */}
          <SelectedCommunities answers={answers} />

          {/* Header with Message */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Lets do a taste check do you like any of these ?</h2>
            <p className="text-sm text-muted-foreground">{listingResponse.message}</p>
          </div>

          {/* Listings Grid */}
          <div className="space-y-3">
            {listingResponse.matching_listings.map((listing, idx) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex gap-4 p-4">
                    {/* Image */}
                    <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={listing.image_url}
                        alt={listing.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-foreground truncate">{listing.name}</h3>
                        <p className="text-xs text-muted-foreground">{listing.neighborhood}</p>
                      </div>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-1">
                        {listing.highlights.map((highlight) => (
                          <Badge
                            key={highlight}
                            variant="outline"
                            className="text-xs bg-primary/5"
                          >
                            {highlight}
                          </Badge>
                        ))}
                      </div>

                      {/* Price & Match */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="font-semibold text-foreground">{listing.price}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-medium text-yellow-600">
                            {listing.match_percentage}% match
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            className="w-full"
            variant="default"
            onClick={() => {
              // Store answers and questions in sessionStorage for the matches page
              sessionStorage.setItem('matchesAnswers', JSON.stringify(answers))
              sessionStorage.setItem('matchesQuestions', JSON.stringify(questions))
              router.push('/matches')
            }}
          >
            View All {listingResponse.total_count} Properties
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </>
      ) : (
        // State 2: No Listings
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-primary/20" />
            </div>
          </div>

          {/* Message */}
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-foreground">
              We're on the lookout for you
            </h2>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              {listingResponse.message}
            </p>
          </div>

          {/* Action */}
          <div className="flex flex-col gap-2">
            <Button size="lg" variant="default" className="w-full">
              Keep Me Posted
            </Button>
            <Button size="lg" variant="outline" className="w-full">
              Adjust Criteria
            </Button>
          </div>

          {/* Info */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground">
              We'll notify you immediately when new properties matching your criteria become available.
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
