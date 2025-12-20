"use client"

import { motion } from "motion/react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, TrendingUp } from "lucide-react"
import { Community, MOCK_QUESTIONS_3BHK_INDIRANAGAR, MOCK_QUESTIONS_VILLA, MOCK_QUESTIONS_GENERAL } from "@/data/mock-questions"

interface SelectedCommunitiesProps {
  answers: Record<string, any>
}

/**
 * Extracts all communities from questions data
 */
function getAllCommunities(): Community[] {
  const communities: Community[] = []

  // Collect communities from all question sets
  const allQuestionSets = [MOCK_QUESTIONS_3BHK_INDIRANAGAR, MOCK_QUESTIONS_VILLA, MOCK_QUESTIONS_GENERAL]

  allQuestionSets.forEach((questionSet) => {
    questionSet.forEach((question) => {
      if (question.data?.communities) {
        communities.push(...question.data.communities)
      }
    })
  })

  return communities
}

/**
 * Finds community by ID
 */
function getCommunityById(id: string): Community | undefined {
  const allCommunities = getAllCommunities()
  return allCommunities.find((c) => c.id === id)
}

export function SelectedCommunities({
  answers,
}: SelectedCommunitiesProps) {
  const selectedIds = answers.community_preference || []

  if (selectedIds.length === 0) {
    return null
  }

  const selectedCommunities = selectedIds
    .map((id: string) => getCommunityById(id))
    .filter(Boolean) as Community[]

  // Sort by match score descending
  selectedCommunities.sort((a, b) => b.match_score - a.match_score)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="bg-card border border-border rounded-lg p-6 space-y-4"
    >
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <MapPin className="w-5 h-5 text-primary" />
        Type Of Communities You Prefer
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {selectedCommunities.map((community, idx) => (
          <motion.div
            key={community.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              {/* Image */}
              <div className="h-32 bg-muted overflow-hidden">
                <img
                  src={community.image_url}
                  alt={community.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground">{community.name}</h4>
                  <p className="text-sm text-muted-foreground">{community.neighborhood}</p>
                </div>

                {/* Match Score */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{community.match_score}% match</span>
                  </div>
                </div>

                {/* Price and Size */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-primary/5 rounded p-2">
                    <p className="text-muted-foreground">Price Range</p>
                    <p className="font-semibold text-foreground">
                      ₹{community.price_range.min_cr} - {community.price_range.max_cr} Cr
                    </p>
                  </div>
                  <div className="bg-primary/5 rounded p-2">
                    <p className="text-muted-foreground">Size</p>
                    <p className="font-semibold text-foreground">
                      {community.size_range.min_bhk}-{community.size_range.max_bhk} BHK
                    </p>
                  </div>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1.5">
                  {community.highlights.slice(0, 2).map((highlight) => (
                    <Badge
                      key={highlight}
                      variant="outline"
                      className="text-xs bg-primary/5 text-primary border-primary/20"
                    >
                      {highlight}
                    </Badge>
                  ))}
                </div>

                {/* Property Count */}
                <p className="text-xs text-muted-foreground">
                  {community.property_count} properties available
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
