"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Navigation } from "lucide-react"
import { motion } from "motion/react"

/**
 * Right panel: Map with property listings
 * Placeholder for actual map integration
 */
export function MapPanel() {
  const mockListings = [
    {
      id: 1,
      name: "Brigade Metropolis",
      neighborhood: "Indiranagar",
      price: "₹2.5 Cr",
      match: 95,
      image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=400",
      direction: "North-facing",
      distances: [
        { place: "Indiranagar", km: "0.5 km" },
        { place: "Bellandur", km: "12 km" },
        { place: "Whitefield", km: "18 km" },
      ],
      highlights: ["Premium amenities", "24/7 Security", "Ready to move"],
    },
    {
      id: 2,
      name: "Sobha Indraprastha",
      neighborhood: "Indiranagar",
      price: "₹2.2 Cr",
      match: 92,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400",
      direction: "East-facing",
      distances: [
        { place: "Indiranagar", km: "0.8 km" },
        { place: "Bellandur", km: "14 km" },
        { place: "Whitefield", km: "20 km" },
      ],
      highlights: ["Pet-friendly", "Good connectivity", "Central location"],
    },
    {
      id: 3,
      name: "Prestige Shantiniketan",
      neighborhood: "Indiranagar",
      price: "₹2.8 Cr",
      match: 88,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=400",
      direction: "West-facing",
      distances: [
        { place: "Indiranagar", km: "1.2 km" },
        { place: "Bellandur", km: "11 km" },
        { place: "Whitefield", km: "17 km" },
      ],
      highlights: ["Luxury living", "High-end features", "Green spaces"],
    },
    {
      id: 4,
      name: "Puravankara Indiranagar",
      neighborhood: "Indiranagar",
      price: "₹2.4 Cr",
      match: 90,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=400",
      direction: "North-facing",
      distances: [
        { place: "Indiranagar", km: "0.3 km" },
        { place: "Bellandur", km: "13 km" },
        { place: "Whitefield", km: "19 km" },
      ],
      highlights: ["Modern architecture", "Central location", "Good resale"],
    },
    {
      id: 5,
      name: "Lodha Residences",
      neighborhood: "Indiranagar",
      price: "₹2.6 Cr",
      match: 88,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=400",
      direction: "South-facing",
      distances: [
        { place: "Indiranagar", km: "0.7 km" },
        { place: "Bellandur", km: "15 km" },
        { place: "Whitefield", km: "21 km" },
      ],
      highlights: ["Spacious units", "Green spaces", "Swimming pool"],
    },
  ]

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Sticky Header */}
      <div className="p-4 border-b border-border/50 bg-card flex-shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Property Matches</h2>
          <span className="ml-auto text-sm text-muted-foreground">{mockListings.length} properties</span>
        </div>
      </div>

      {/* Sticky Map Placeholder */}
      <div className="p-4 bg-card border-b border-border/50 flex-shrink-0 sticky top-16 z-10">
        <Card className="bg-muted h-48 flex items-center justify-center rounded-lg">
          <div className="text-center space-y-2">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground font-medium">Map Integration Coming Soon</p>
            <p className="text-xs text-muted-foreground">Drag to explore · Click to view details</p>
          </div>
        </Card>
      </div>

      {/* Scrollable Listings Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-4">
          <div className="grid grid-cols-3 gap-4">
            {mockListings.map((listing, idx) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group h-full flex flex-col">
                  {/* Image */}
                  <div className="w-full h-32 overflow-hidden flex-shrink-0">
                    <img
                      src={listing.image}
                      alt={listing.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col p-3 min-w-0">
                    {/* Name & Location */}
                    <div className="space-y-1 mb-2">
                      <h3 className="font-semibold text-xs text-foreground truncate">{listing.name}</h3>
                      <div className="flex items-center gap-1 flex-wrap">
                        <p className="text-xs text-muted-foreground">{listing.neighborhood}</p>
                        <Badge variant="outline" className="text-xs bg-primary/5">
                          {listing.direction}
                        </Badge>
                      </div>
                    </div>

                    {/* Distances */}
                    <div className="grid grid-cols-3 gap-1 mb-2 text-xs">
                      {listing.distances.map((dist) => (
                        <div key={dist.place}>
                          <p className="text-muted-foreground text-xs">{dist.place}</p>
                          <p className="font-semibold text-foreground">{dist.km}</p>
                        </div>
                      ))}
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {listing.highlights.slice(0, 2).map((highlight) => (
                        <Badge
                          key={highlight}
                          variant="outline"
                          className="text-xs bg-primary/5 text-primary border-primary/20"
                        >
                          {highlight}
                        </Badge>
                      ))}
                    </div>

                    {/* Price & Match */}
                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-semibold text-xs text-foreground">{listing.price}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium text-yellow-600">{listing.match}%</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
