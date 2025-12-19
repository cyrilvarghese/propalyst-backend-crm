"use client"

import { useState, useRef, useEffect } from "react"
import { MapPin, Search } from "lucide-react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { QuestionOption } from "@/data/mock-questions"

interface LocationProximityControlProps {
  options: QuestionOption[]
  mapCenter?: { lat: number; lng: number }
  radiusKm?: number
  onLocationSelect?: (locationType: string, location: { lat: number; lng: number; address: string }) => void
  helpText?: string
}

export function LocationProximityControl({
  options,
  mapCenter = { lat: 12.9716, lng: 77.5946 },
  radiusKm = 25,
  onLocationSelect,
  helpText,
}: LocationProximityControlProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [searchAddress, setSearchAddress] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; address: string } | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)
  const markerRef = useRef<any>(null)

  // Initialize Google Map
  useEffect(() => {
    if (typeof window !== "undefined" && mapRef.current && !mapLoaded) {
      // Check if Google Maps is loaded
      if (window.google) {
        initializeMap()
        setMapLoaded(true)
      } else {
        // Try again in a moment
        setTimeout(() => {
          if (window.google && mapRef.current) {
            initializeMap()
            setMapLoaded(true)
          }
        }, 500)
      }
    }
  }, [mapLoaded])

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return

    mapInstance.current = new window.google.maps.Map(mapRef.current, {
      center: mapCenter,
      zoom: 13,
      mapTypeControl: false,
      fullscreenControl: false,
    })

    // Draw radius circle
    new window.google.maps.Circle({
      center: mapCenter,
      radius: (radiusKm || 25) * 1000, // Convert km to meters
      map: mapInstance.current,
      fillColor: "hsl(var(--primary))",
      fillOpacity: 0.1,
      strokeColor: "hsl(var(--primary))",
      strokeOpacity: 0.3,
      strokeWeight: 2,
    })

    // Click to place marker
    mapInstance.current.addListener("click", (e: any) => {
      const lat = e.latLng.lat()
      const lng = e.latLng.lng()
      placeMarker(lat, lng)
    })
  }

  const placeMarker = (lat: number, lng: number) => {
    if (!mapInstance.current || !window.google) return

    // Remove existing marker
    if (markerRef.current) {
      markerRef.current.setMap(null)
    }

    // Add new marker
    markerRef.current = new window.google.maps.Marker({
      position: { lat, lng },
      map: mapInstance.current,
      title: "Selected Location",
    })

    setSelectedLocation({
      lat,
      lng,
      address: `${lat.toFixed(4)}, ${lng.toFixed(4)}`, // Default format, can be geocoded
    })

    if (selectedType && onLocationSelect) {
      onLocationSelect(selectedType, { lat, lng, address: `${lat.toFixed(4)}, ${lng.toFixed(4)}` })
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchAddress.trim() || !selectedType || !window.google) return

    try {
      const geocoder = new window.google.maps.Geocoder()
      const results = await geocoder.geocode({ address: searchAddress })

      if (results[0]) {
        const location = results[0].geometry.location
        const lat = location.lat()
        const lng = location.lng()

        // Pan to location
        mapInstance.current.panTo({ lat, lng })
        mapInstance.current.setZoom(15)

        placeMarker(lat, lng)

        setSelectedLocation({
          lat,
          lng,
          address: results[0].formatted_address,
        })

        if (onLocationSelect) {
          onLocationSelect(selectedType, {
            lat,
            lng,
            address: results[0].formatted_address,
          })
        }
      }
    } catch (error) {
      console.error("Geocoding error:", error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4 w-full"
    >
      {/* Location Type Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Select Location Type</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedType(option.value)}
              className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                selectedType === option.value
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground hover:border-primary/50"
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <span>{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Address Search */}
      {selectedType && (
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search address or location..."
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" variant="default" size="sm">
            Search
          </Button>
        </form>
      )}

      {/* Map */}
      {selectedType && (
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">
            {helpText || "Click on the map or search above to pin your location"}
          </div>
          <div
            ref={mapRef}
            className="w-full h-64 rounded-lg border border-border shadow-sm"
            style={{ background: "#e5e7eb" }}
          />
        </div>
      )}

      {/* Selected Location Display */}
      {selectedLocation && selectedType && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-lg bg-primary/5 border border-primary/20 space-y-2"
        >
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <div className="space-y-1 flex-1">
              <p className="text-sm font-medium text-foreground">
                {options.find((o) => o.value === selectedType)?.label}
              </p>
              <p className="text-xs text-muted-foreground">{selectedLocation.address}</p>
              <p className="text-xs text-muted-foreground">
                ({selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)})
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="w-full text-xs h-7"
            onClick={() => {
              setSelectedLocation(null)
              setSelectedType(null)
              if (markerRef.current) {
                markerRef.current.setMap(null)
              }
            }}
          >
            Clear Selection
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}
