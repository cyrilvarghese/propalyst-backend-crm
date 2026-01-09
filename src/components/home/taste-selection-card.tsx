"use client"

import { useState } from "react"
import { Listing } from "@/data/mock-listings"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { motion } from "motion/react"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const REJECTION_REASONS = [
  "Too expensive",
  "Wrong location",
  "Not my style",
  "Poor condition",
  "Too small",
  "Other",
]

interface TasteSelectionCardProps {
  property: Listing
  onLike: () => void
  onDislike: (reason?: string) => void
  onCardClick: () => void
}

export default function TasteSelectionCard({
  property,
  onLike,
  onDislike,
  onCardClick,
}: TasteSelectionCardProps) {
  const [selectedReason, setSelectedReason] = useState<string>("")
  const [customReason, setCustomReason] = useState<string>("")
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const handleReasonSelect = (reason: string) => {
    setSelectedReason(reason)
    if (reason !== "Other") {
      onDislike(reason)
      setIsPopoverOpen(false)
      setSelectedReason("")
    }
  }

  const handleCustomReasonSubmit = () => {
    if (customReason.trim()) {
      onDislike(customReason)
      setIsPopoverOpen(false)
      setSelectedReason("")
      setCustomReason("")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={{ duration: 0.3 }}
      className="w-full flex justify-center"
    >
      <Card
        className=" max-w-3xl h-[250px] flex flex-row gap-0 backdrop-blur-md bg-black/70 hover:shadow-xl glass-texture transition-shadow duration-300 overflow-hidden cursor-pointer group"
        onClick={onCardClick}
      >
        {/* Image Section - Left Side */}
        <div className="relative flex flex-[60%] h-full flex-shrink-0 group">
          <img
            src={property.image_url}
            alt={property.project_name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-l-2xl"
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/400x320?text=" +
                encodeURIComponent(property.project_name || "Property")
            }}
          />

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-l-2xl" />

          {/* Dislike Button - Left Side */}
          <div className="absolute bottom-4 left-4 z-10">
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  size="lg"
                  variant="ghost"
                  className="bg-red-500/80 hover:bg-red-600 text-white rounded-full p-3 w-12 h-12 flex items-center justify-center shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Dislike property"
                >
                  <ThumbsDown className="w-5 h-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                side="top"
                align="start"
                className="w-80 p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-3">
                      Why are you passing this?
                    </h4>
                    <RadioGroup
                      value={selectedReason}
                      onValueChange={handleReasonSelect}
                      className="space-y-2"
                    >
                      {REJECTION_REASONS.map((reason) => (
                        <div
                          key={reason}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={reason}
                            id={reason}
                          />
                          <Label
                            htmlFor={reason}
                            className="font-normal cursor-pointer text-sm"
                          >
                            {reason}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {selectedReason === "Other" && (
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Tell us more..."
                        value={customReason}
                        onChange={(e) => setCustomReason(e.target.value)}
                        className="min-h-20 text-sm"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <Button
                        onClick={handleCustomReasonSubmit}
                        disabled={!customReason.trim()}
                        className="w-full"
                        size="sm"
                      >
                        Submit
                      </Button>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Like Button - Right Side */}
          <div className="absolute bottom-4 right-4 z-10">
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 w-12 h-12 flex items-center justify-center shadow-lg"
              onClick={(e) => {
                e.stopPropagation()
                onLike()
              }}
              aria-label="Like property"
            >
              <ThumbsUp className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content Section - Right Side */}
        <div className="flex flex-[40%] flex-col gap-4 p-6 py-6 justify-between">
          {/* Top Content */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white line-clamp-2">
              {property.project_name || "Property"}
            </h3>
            <p className="text-sm text-gray-200">
              {property.location}
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default" className="text-xs">
                {property.price_text}
              </Badge>
              {property.bedroom_count && (
                <Badge variant="secondary" className="text-xs">
                  {property.bedroom_count} BHK
                </Badge>
              )}
              {property.area_sqft && (
                <Badge variant="secondary" className="text-xs">
                  {(property.area_sqft / 1000).toFixed(1)}K Sqft
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
