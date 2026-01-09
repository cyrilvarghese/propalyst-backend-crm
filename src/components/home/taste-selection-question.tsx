"use client"

import { useState } from "react"
import { Listing } from "@/data/mock-listings"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "motion/react"
import TasteSelectionCard from "./taste-selection-card"
import PropertyDetailModal from "./property-detail-modal"

export interface TastePreference {
  propertyId: string
  liked: boolean
  reason?: string
}

interface TasteSelectionQuestionProps {
  question: string
  properties: Listing[]
  onAnswer: (preferences: TastePreference[]) => void
  onSkip?: () => void
}

export default function TasteSelectionQuestion({
  question,
  properties,
  onAnswer,
  onSkip,
}: TasteSelectionQuestionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [preferences, setPreferences] = useState<TastePreference[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const currentProperty = properties[currentIndex] || null

  const handleLike = () => {
    if (currentProperty) {
      const preference: TastePreference = {
        propertyId: currentProperty.id,
        liked: true,
      }
      setPreferences([...preferences, preference])
      moveToNextProperty()
    }
  }

  const handleDislike = (reason?: string) => {
    if (currentProperty) {
      const preference: TastePreference = {
        propertyId: currentProperty.id,
        liked: false,
        reason,
      }
      setPreferences([...preferences, preference])
      moveToNextProperty()
    }
  }

  const moveToNextProperty = () => {
    if (currentIndex < properties.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      // All properties reviewed
      const allPreferences = [
        ...preferences,
        {
          propertyId: currentProperty?.id || "",
          liked: false,
        },
      ]
      onAnswer(allPreferences)
    }
  }

  const handleCardClick = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleModalAccept = () => {
    setIsModalOpen(false)
    handleLike()
  }

  const handleModalReject = () => {
    setIsModalOpen(false)
    // Don't immediately move to next, let them continue exploring
  }

  const handleContinue = () => {
    // For when all properties are reviewed
    onAnswer(preferences)
  }

  // When we have reviewed all properties
  if (currentIndex >= properties.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-4 text-center"
      >
        <div className="space-y-2">
          <Label className="text-base font-semibold text-foreground">
            {question}
          </Label>
          <p className="text-sm text-muted-foreground">
            Great! You've reviewed all properties. We've captured your
            preferences.
          </p>
        </div>

        <div className="pt-4 text-sm text-muted-foreground space-y-1">
          <p>
            Liked: <span className="font-semibold text-green-600">
              {preferences.filter((p) => p.liked).length}
            </span>
          </p>
          <p>
            Passed: <span className="font-semibold text-red-600">
              {preferences.filter((p) => !p.liked).length}
            </span>
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            onClick={handleContinue}
            className="flex-1"
          >
            Continue
          </Button>
          {onSkip && (
            <Button variant="ghost" onClick={onSkip}>
              Skip
            </Button>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4 w-full"
    >
      {/* Question Header with Skip Button */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <Label className="text-base font-semibold text-foreground">
            {question}
          </Label>
          {/* {onSkip && (
            <Button variant="default" size="sm" onClick={onSkip} className="text-xs">
              Skip
            </Button>
          )} */}
        </div>
        <p className="text-sm text-muted-foreground">
          Let us know what you like by swiping properties
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {currentIndex + 1} of {properties.length}
        </span>
        <div className="flex-1 mx-4 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / properties.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Card Container */}
      <div className="flex justify-center py-6">
        <AnimatePresence mode="wait">
          {currentProperty && (
            <TasteSelectionCard
              key={currentProperty.id}
              property={currentProperty}
              onLike={handleLike}
              onDislike={handleDislike}
              onCardClick={handleCardClick}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Property Detail Modal */}
      {currentProperty && (
        <PropertyDetailModal
          property={currentProperty}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onAccept={handleModalAccept}
          onReject={handleModalReject}
        />
      )}
    </motion.div>
  )
}
