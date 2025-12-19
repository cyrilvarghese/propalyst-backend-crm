"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Check } from "lucide-react"
import { Community } from "@/data/mock-questions"

interface CommunitySelectionQuestionProps {
  question: string
  communities: Community[]
  onAnswer: (selectedIds: string[]) => void
  onSkip?: () => void
}

export default function CommunitySelectionQuestion({
  question,
  communities,
  onAnswer,
  onSkip,
}: CommunitySelectionQuestionProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // Group communities by neighborhood
  const neighborhoodGroups = communities.reduce((acc, community) => {
    if (!acc[community.neighborhood]) {
      acc[community.neighborhood] = []
    }
    acc[community.neighborhood].push(community)
    return acc
  }, {} as Record<string, Community[]>)

  const neighborhoods = Object.keys(neighborhoodGroups).sort()

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleContinue = () => {
    onAnswer(selectedIds)
  }

  const CommunityCard = ({ community }: { community: Community }) => {
    const isSelected = selectedIds.includes(community.id)

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <Card
          className={`cursor-pointer overflow-hidden transition-all ${isSelected
              ? "border-2 border-primary shadow-lg"
              : "border border-border hover:shadow-md"
            }`}
          onClick={() => toggleSelection(community.id)}
        >
          {/* Image */}
          <div className="relative w-full h-40 overflow-hidden bg-muted">
            <img
              src={community.image_url}
              alt={community.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/400x300?text=" + community.name
              }}
            />
            {isSelected && (
              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                <div className="bg-primary text-white rounded-full p-2">
                  <Check className="w-6 h-6" />
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <CardContent className="p-3">
            <div className="space-y-2">
              {/* Name */}
              <h3 className="font-semibold text-sm">{community.name}</h3>

              {/* Price and Size */}
              <div className="space-y-1">
                <Badge variant="default" className="text-xs">
                  ₹{community.price_range.min_cr}-{community.price_range.max_cr} Cr
                </Badge>
                <Badge variant="secondary" className="text-xs ml-1">
                  {community.size_range.min_bhk}-{community.size_range.max_bhk} BHK
                </Badge>
              </div>

              {/* Property count */}
              <Badge variant="outline" className="text-xs">
                {community.property_count} available
              </Badge>

              {/* Highlights */}
              <div className="flex flex-wrap gap-1 pt-1">
                {community.highlights.slice(0, 2).map((highlight, idx) => (
                  <span key={idx} className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="w-full space-y-4">
      {/* Question */}
      <div>
        {/* <h3 className="text-base font-medium">{question}</h3> */}
        <p className="text-sm text-muted-foreground mt-1">
          Select one or more communities that interest you
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue={neighborhoods[0] || "default"} className="w-full">
        <TabsList className={`grid w-full ${neighborhoods.length <= 3 ? "grid-cols-3" : neighborhoods.length <= 5 ? "grid-cols-5" : "grid-cols-4"}`}>
          {neighborhoods.map((neighborhood) => (
            <TabsTrigger key={neighborhood} value={neighborhood} className="text-sm">
              {neighborhood}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Neighborhood Tabs */}
        {neighborhoods.map((neighborhood) => (
          <TabsContent key={neighborhood} value={neighborhood} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {neighborhoodGroups[neighborhood].map((community) => (
                  <motion.div
                    key={community.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CommunityCard community={community} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          onClick={handleContinue}
          disabled={selectedIds.length === 0}
          className="flex-1"
        >
          Continue with {selectedIds.length} selected
        </Button>
        {onSkip && (
          <Button variant="ghost" onClick={onSkip}>
            Skip
          </Button>
        )}
      </div>
    </div>
  )
}
