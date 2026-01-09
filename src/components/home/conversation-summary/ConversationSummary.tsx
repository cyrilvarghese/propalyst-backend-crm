"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, MapPin, Home, Wallet, Tag, Scale, Ruler, Building2 } from "lucide-react"
import { CallbackModal } from "./CallbackModal"

interface ConversationSummaryProps {
  userSummary: Record<string, any>
}

/**
 * Conversation summary - displays the user summary from the API
 * Uses userSummary data passed from the chat context
 */
export function ConversationSummary({
  userSummary,
}: ConversationSummaryProps) {
  const router = useRouter()
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false)

  const formatBudget = (budget?: { min: number | null; max: number | null }) => {
    if (!budget) return null
    if (budget.min === null && budget.max) return `Up to ₹${budget.max} Cr`
    if (budget.min && budget.max === null) return `₹${budget.min} Cr+`
    if (budget.min && budget.max) return `₹${budget.min} - ₹${budget.max} Cr`
    return null
  }

  const formatArea = (area?: { min: number | null; max: number | null }) => {
    if (!area) return null
    if (area.min === null && area.max) return `Up to ${area.max} sq ft`
    if (area.min && area.max === null) return `${area.min} sq ft+`
    if (area.min && area.max) {
      if (area.min === area.max) return `${area.min} sq ft`
      return `${area.min} - ${area.max} sq ft`
    }
    return null
  }

  // Check if we have taste preferences to show "has listings" state
  const hasListings = userSummary?.taste_preference && Array.isArray(userSummary.taste_preference) && userSummary.taste_preference.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl mx-auto space-y-6 p-6"
    >
      {hasListings ? (
        // State 1: Listings Found
        <>
          {/* Selected Properties Thumbnails */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground px-2">Properties You Liked</p>
              <div className="grid grid-cols-3 gap-3">
                {userSummary.taste_preference.map((property: any) => (
                  <motion.div
                    key={property.id}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="group cursor-pointer"
                  >
                    <div className="space-y-2">
                      {/* Thumbnail */}
                      <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-muted border-2 border-primary/20 hover:border-primary/50 transition-colors">
                        <img
                          src={property.image_url}
                          alt={property.project_name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://via.placeholder.com/300x300?text=" +
                              encodeURIComponent(property.project_name)
                          }}
                        />
                        {/* Like badge */}
                        <div className="absolute top-2 right-2 bg-green-600 rounded-full p-1.5">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      </div>

                      {/* Property Name */}
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-foreground truncate">
                          {property.project_name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {property.price_text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Checklist on Ruled Paper */}
          {userSummary && (
            <Card className="px-4 py-6 border-neutral-300 overflow-hidden">
              {/* Title */}
              <div className="space-y-2 pb-4">
                <h2 className="text-lg font-bold text-foreground">We'll take it from here !</h2>
                <p className="text-md text-muted-foreground">
                  Ok we've got your requirements and know exactly what you like and need - let us get back to you in 24 hours
                </p>
              </div>

              {/* Checklist Items */}
              <div className="pt-4 space-y-4">
                {/* Request Type */}
                {userSummary.req_type && (
                  <div className="flex items-center gap-3 pb-4 border-b border-neutral-200/10">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div className="flex items-center gap-2 min-w-0">
                      <Tag className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <p className="text-sm font-medium text-foreground capitalize">{userSummary.req_type} property</p>
                    </div>
                  </div>
                )}

                {/* Location & Bedrooms Row */}
                <div className="flex flex-row gap-8 pb-4 border-b border-neutral-200/10">
                  {/* Location */}
                  {userSummary.proximity_location && (
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <div className="flex items-center gap-2 min-w-0">
                        <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <p className="text-sm font-medium text-foreground truncate">{userSummary.proximity_location}</p>
                      </div>
                    </div>
                  )}

                  {/* Bedrooms */}
                  {userSummary.bedroom_count && (
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <div className="flex items-center gap-2 min-w-0">
                        <Home className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <p className="text-sm font-medium text-foreground">{userSummary.bedroom_count} BHK</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Budget & Property Type Row */}
                <div className="flex flex-col sm:flex-row gap-8 pb-4 border-b border-neutral-200/10">
                  {/* Budget */}
                  {formatBudget(userSummary.budget) && (
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <div className="flex items-center gap-2 min-w-0">
                        <Wallet className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <p className="text-sm font-medium text-foreground truncate">{formatBudget(userSummary.budget)}</p>
                      </div>
                    </div>
                  )}

                  {/* Property Type */}
                  {userSummary.property_type && (
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <div className="flex items-center gap-2 min-w-0">
                        <Building2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <p className="text-sm font-medium text-foreground capitalize truncate">{userSummary.property_type}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Area */}
                {formatArea(userSummary.property_area) && (
                  <div className="flex items-center gap-3 pb-4 border-b border-neutral-200/10">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div className="flex items-center gap-2 min-w-0">
                      <Ruler className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <p className="text-sm font-medium text-foreground">{formatArea(userSummary.property_area)}</p>
                    </div>
                  </div>
                )}

                {/* Special Features */}
                {userSummary.special_features && userSummary.special_features.length > 0 && (
                  <div className="flex items-center gap-12   pb-4 border-b border-neutral-200/10 flex-wrap">
                    {userSummary.special_features.map((feature: string) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <div className="flex items-center gap-2">
                          <Scale className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <p className="text-sm font-medium text-foreground capitalize">{feature}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Special Requests */}
                {userSummary.special_requests && userSummary.special_requests.length > 0 && (
                  <div className="flex items-center gap-6 flex-wrap">
                    {userSummary.special_requests.map((request: string) => (
                      <div key={request} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <p className="text-sm font-medium text-foreground capitalize">{request}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA Section */}
                <div className="pt-6 space-y-3 border-t border-neutral-200/10">
                  <p className="text-sm text-muted-foreground">
                    Schedule a convenient date and time to talk about your perfect property match.
                  </p>
                  <Button
                    size="lg"
                    className="w-full"
                    variant="default"
                    onClick={() => setIsCallbackModalOpen(true)}
                  >
                    Arrange a Callback
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Callback Modal */}
          <CallbackModal
            isOpen={isCallbackModalOpen}
            onClose={() => setIsCallbackModalOpen(false)}
            onSubmit={(datetime) => {
              // Store callback details in sessionStorage
              sessionStorage.setItem("callbackDateTime", JSON.stringify(datetime))
              // Navigate to thank you page
              router.push("/thankyou")
            }}
          />
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
              We're searching for properties that match your preferences and will get back to you within 24 hours.
            </p>
          </div>

          {/* Action */}
          <div className="flex flex-col gap-2">
            <Button size="lg" variant="default" className="w-full" onClick={() => setIsCallbackModalOpen(true)}>
              Schedule Callback
            </Button>
          </div>

          {/* Info */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground">
              We'll notify you immediately when new properties matching your criteria become available.
            </p>
          </div>

          {/* Callback Modal */}
          <CallbackModal
            isOpen={isCallbackModalOpen}
            onClose={() => setIsCallbackModalOpen(false)}
            onSubmit={(datetime) => {
              sessionStorage.setItem("callbackDateTime", JSON.stringify(datetime))
              router.push("/thankyou")
            }}
          />
        </motion.div>
      )}
    </motion.div>
  )
}
