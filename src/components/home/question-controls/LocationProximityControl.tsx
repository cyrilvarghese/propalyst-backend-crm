"use client"

import { useState, useRef, useEffect } from "react"
import { useJsApiLoader } from "@react-google-maps/api"
import { MapPin, Search, X } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { Input } from "@/components/ui/input"

interface LocationProximityControlProps {
  onLocationSelect?: (location: { lat: number; lng: number; address: string }) => void
  placeholder?: string
}

interface AutocompletePrediction {
  place_id: string
  description: string
  main_text: string
  secondary_text?: string
}

export function LocationProximityControl({
  onLocationSelect,
  placeholder = "Search location...",
}: LocationProximityControlProps) {
  const [searchAddress, setSearchAddress] = useState("")
  const [predictions, setPredictions] = useState<AutocompletePrediction[]>([])
  const [showPredictions, setShowPredictions] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; address: string } | null>(null)
  const autocompleteServiceRef = useRef<any>(null)
  const placesServiceRef = useRef<any>(null)
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  })

  useEffect(() => {
    if (!isLoaded) return

    const google = (window as any).google
    autocompleteServiceRef.current = new google.maps.places.AutocompleteService()
    placesServiceRef.current = new google.maps.places.PlacesService(
      document.createElement("div")
    )
  }, [isLoaded])

  const handleAddressChange = (value: string) => {
    setSearchAddress(value)
    setPredictions([])
    setShowPredictions(false)

    if (!value.trim()) return

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = setTimeout(() => {
      if (!autocompleteServiceRef.current) return

      const google = (window as any).google
      autocompleteServiceRef.current.getPlacePredictions(
        {
          input: value,
          componentRestrictions: { country: "in" },
        },
        (predictions: any, status: any) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
            const formattedPredictions = predictions.map((p: any) => ({
              place_id: p.place_id,
              description: p.description,
              main_text: p.main_structured_text?.text || p.structured_formatting?.main_text || p.description.split(",")[0],
              secondary_text: p.structured_formatting?.secondary_text,
            }))
            setPredictions(formattedPredictions)
            setShowPredictions(true)
          }
        }
      )
    }, 300)
  }

  const handleSelectPrediction = (prediction: AutocompletePrediction) => {
    if (!placesServiceRef.current) return

    const google = (window as any).google
    placesServiceRef.current.getDetails(
      {
        placeId: prediction.place_id,
        fields: ["geometry", "formatted_address"],
      },
      (place: any, status: any) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          const lat = place.geometry.location.lat()
          const lng = place.geometry.location.lng()
          const address = place.formatted_address || prediction.description

          setSearchAddress(address)
          setSelectedLocation({ lat, lng, address })
          setPredictions([])
          setShowPredictions(false)

          if (onLocationSelect) {
            onLocationSelect({
              lat,
              lng,
              address,
            })
          }
        }
      }
    )
  }

  if (!isLoaded) {
    return (
      <div className="w-full p-3 bg-muted rounded-lg text-sm text-muted-foreground">
        Loading...
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="relative">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
          <Input
            type="text"
            placeholder={placeholder}
            value={searchAddress}
            onChange={(e) => handleAddressChange(e.target.value)}
            onFocus={() => predictions.length > 0 && setShowPredictions(true)}
            className="pl-10 pr-8"
            autoComplete="off"
          />
          {searchAddress && (
            <button
              type="button"
              onClick={() => {
                setSearchAddress("")
                setSelectedLocation(null)
                setPredictions([])
                setShowPredictions(false)
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <AnimatePresence>
          {showPredictions && predictions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50"
            >
              <div className="max-h-64 overflow-y-auto">
                {predictions.map((prediction) => (
                  <button
                    key={prediction.place_id}
                    onClick={() => handleSelectPrediction(prediction)}
                    className="w-full px-4 py-3 text-left hover:bg-muted transition-colors border-b last:border-b-0 flex items-start gap-3"
                  >
                    <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {prediction.main_text}
                      </p>
                      {prediction.secondary_text && (
                        <p className="text-xs text-muted-foreground truncate">
                          {prediction.secondary_text}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {selectedLocation && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20 flex items-start gap-2"
        >
          <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-foreground truncate">{selectedLocation.address}</p>
            <p className="text-xs text-muted-foreground">
              {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
