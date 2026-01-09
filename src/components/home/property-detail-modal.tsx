"use client"

import { useState } from "react"
import { Listing } from "@/data/mock-listings"
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "motion/react"
import { HistogramRecharts } from "./question-controls/HistogramRecharts"
import { Train, Bus, Plane, MapPin } from "lucide-react"

interface PropertyDetailModalProps {
  property: Listing | null
  isOpen: boolean
  onClose: () => void
  onAccept: () => void
  onReject: () => void
}

export default function PropertyDetailModal({
  property,
  isOpen,
  onClose,
  onAccept,
  onReject,
}: PropertyDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!property) return null

  const images = [property.image_url]

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full md:w-2/3 lg:w-1/2 h-full p-0 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b bg-background sticky top-0 z-10">
          <div className="flex-1 min-w-0">
            <SheetTitle className="text-sm font-bold line-clamp-1">
              {property.project_name}
            </SheetTitle>
            <p className="text-xs text-muted-foreground">
              {property.location}
            </p>
          </div>
          <SheetClose className="h-5 w-5 ml-2" />
        </div>

        {/* Scrollable Content */}
        <ScrollArea className="flex-1 overflow-hidden">
          <div className="p-3 space-y-3 h-full flex flex-col">
            {/* Main Image Section */}
            <div className="space-y-1 flex-shrink-0">
              {/* Main Image */}
              <div className="relative w-full aspect-video rounded-md overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={images[currentImageIndex]}
                    alt={`Property ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/400x300?text=" +
                        property.project_name
                    }}
                  />
                </AnimatePresence>

                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                )}
              </div>

              {/* Thumbnail Grid (4 cols) - Compact */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-1">
                  {images.slice(0, 4).map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`aspect-square rounded-sm overflow-hidden border border-muted transition ${
                        idx === currentImageIndex
                          ? "border-primary border-2"
                          : "opacity-50 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Main Info - No Card */}
            <div className="space-y-1.5 flex-shrink-0">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Price
                </p>
                <p className="text-xl font-bold text-primary leading-tight">
                  {property.price_text}
                </p>
              </div>

              {/* Stats and Details in Single Row */}
              <div className="flex flex-wrap gap-1 items-center">
                {property.bedroom_count && (
                  <Badge variant="secondary" className="text-xs py-0">
                    {property.bedroom_count} BHK
                  </Badge>
                )}
                {property.area_sqft && (
                  <Badge variant="secondary" className="text-xs py-0">
                    {(property.area_sqft / 1000).toFixed(1)}K Sqft
                  </Badge>
                )}
                {property.parking_count && (
                  <Badge variant="secondary" className="text-xs py-0">
                    {property.parking_count} Parking
                  </Badge>
                )}
                {property.furnishing_status && (
                  <Badge variant="outline" className="capitalize text-xs py-0">
                    {property.furnishing_status.replace("_", " ")}
                  </Badge>
                )}
                {property.facing_direction && (
                  <Badge variant="outline" className="capitalize text-xs py-0">
                    {property.facing_direction}
                  </Badge>
                )}
                {property.message_type && (
                  <Badge variant="outline" className="capitalize text-xs py-0">
                    {property.message_type.replace("_", " ")}
                  </Badge>
                )}
              </div>
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="connectivity" className="flex flex-col">
              <TabsList className="grid w-full grid-cols-3 h-8">
                <TabsTrigger value="connectivity" className="text-xs">Connectivity</TabsTrigger>
                <TabsTrigger value="lifestyle" className="text-xs">Lifestyle</TabsTrigger>
                <TabsTrigger value="pricing" className="text-xs">Pricing</TabsTrigger>
              </TabsList>

              {/* Connectivity Tab */}
              <TabsContent value="connectivity" className="mt-2">
                <Card className="p-3 space-y-3 border-border">
                  <p className="text-xs font-semibold">Connectivity Info</p>
                  <div className="grid grid-cols-2 gap-2">
                    {/* Metro Station */}
                    <div className="flex items-start gap-2 p-2.5 rounded-md bg-blue-green-gradient">
                      <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground">Metro Station</p>
                        <p className="text-xs text-muted-foreground">2.5 km away</p>
                      </div>
                    </div>

                    {/* Bus Terminal */}
                    <div className="flex items-start gap-2 p-2.5 rounded-md bg-blue-green-gradient">
                      <Bus className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground">Bus Terminal</p>
                        <p className="text-xs text-muted-foreground">1.2 km away</p>
                      </div>
                    </div>

                    {/* Railway Station */}
                    <div className="flex items-start gap-2 p-2.5 rounded-md bg-blue-green-gradient">
                      <Train className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground">Railway Station</p>
                        <p className="text-xs text-muted-foreground">5.8 km away</p>
                      </div>
                    </div>

                    {/* Airport */}
                    <div className="flex items-start gap-2 p-2.5 rounded-md bg-blue-green-gradient">
                      <Plane className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground">Airport</p>
                        <p className="text-xs text-muted-foreground">25 km away</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Lifestyle Tab */}
              <TabsContent value="lifestyle" className="mt-2">
                <Card className="p-3 space-y-3 border-border">
                  <p className="text-xs font-semibold">Lifestyle & Education</p>
                  <div className="grid grid-cols-2 gap-2">
                    {/* Education Score */}
                    <div className="space-y-1.5 p-2.5 rounded-md bg-blue-green-gradient">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-foreground font-medium">Education</p>
                        <p className="text-xs font-semibold text-blue-600">8.5/10</p>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                        <div className="bg-blue-green-gradient-progress h-full" style={{ width: "85%" }} />
                      </div>
                      <p className="text-xs text-muted-foreground">5 schools nearby</p>
                    </div>

                    {/* Healthcare Score */}
                    <div className="space-y-1.5 p-2.5 rounded-md bg-blue-green-gradient">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-foreground font-medium">Healthcare</p>
                        <p className="text-xs font-semibold text-blue-600">7.8/10</p>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                        <div className="bg-blue-green-gradient-progress h-full" style={{ width: "78%" }} />
                      </div>
                      <p className="text-xs text-muted-foreground">3 hospitals nearby</p>
                    </div>

                    {/* Dining & Leisure */}
                    <div className="space-y-1.5 p-2.5 rounded-md bg-blue-green-gradient">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-foreground font-medium">Dining</p>
                        <p className="text-xs font-semibold text-blue-600">8.2/10</p>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                        <div className="bg-blue-green-gradient-progress h-full" style={{ width: "82%" }} />
                      </div>
                      <p className="text-xs text-muted-foreground">45+ restaurants</p>
                    </div>

                    {/* Safety Score */}
                    <div className="space-y-1.5 p-2.5 rounded-md bg-blue-green-gradient">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-foreground font-medium">Safety</p>
                        <p className="text-xs font-semibold text-blue-600">8.9/10</p>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                        <div className="bg-blue-green-gradient-progress h-full" style={{ width: "89%" }} />
                      </div>
                      <p className="text-xs text-muted-foreground">Gated community</p>
                    </div>

                    {/* Infrastructure Score */}
                    <div className="space-y-1.5 p-2.5 rounded-md bg-blue-green-gradient">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-foreground font-medium">Infrastructure</p>
                        <p className="text-xs font-semibold text-blue-600">8.7/10</p>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                        <div className="bg-blue-green-gradient-progress h-full" style={{ width: "87%" }} />
                      </div>
                      <p className="text-xs text-muted-foreground">Good roads & parking</p>
                    </div>

                    {/* Parks & Recreation */}
                    <div className="space-y-1.5 p-2.5 rounded-md bg-blue-green-gradient">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-foreground font-medium">Parks</p>
                        <p className="text-xs font-semibold text-blue-600">8.4/10</p>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                        <div className="bg-blue-green-gradient-progress h-full" style={{ width: "84%" }} />
                      </div>
                      <p className="text-xs text-muted-foreground">Multiple parks nearby</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Pricing Info Tab */}
              <TabsContent value="pricing" className="mt-2">
                <Card className="p-3 space-y-2 border-border">
                  <p className="text-xs font-semibold">Price Distribution</p>
                  <HistogramRecharts
                    bins={[
                      { range: "50L-75L", count: 12, minValue: 0.5, maxValue: 0.75 },
                      { range: "75L-1Cr", count: 28, minValue: 0.75, maxValue: 1.0 },
                      { range: "1-1.5Cr", count: 65, minValue: 1.0, maxValue: 1.5 },
                      { range: "1.5-2Cr", count: 120, minValue: 1.5, maxValue: 2.0 },
                      { range: "2-2.5Cr", count: 95, minValue: 2.0, maxValue: 2.5 },
                    ]}
                    title="Market Price Ranges"
                  />
                </Card>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="space-y-0.5 pt-2 border-t flex-shrink-0">
              <Button
                onClick={onAccept}
                size="sm"
                className="w-full bg-green-600 hover:bg-green-700 text-xs h-7 py-0"
              >
                Interested
              </Button>
              <Button
                variant="outline"
                onClick={onReject}
                size="sm"
                className="w-full text-xs h-7 py-0"
              >
                Not Interested
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
