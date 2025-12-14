"use client"
import { motion } from "motion/react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, BedDouble, Ruler, MapPin } from "lucide-react"
import { Listing } from "@/data/mock-listings"

interface CardProps {
    listing: Listing
}

export default function CardImageVerticalNoPadding({ listing }: CardProps) {
    return (
        <Card className="w-[320px] backdrop-blur-xl bg-black/70 glass-texture hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-0">
                <img
                    src={listing.image_url}
                    alt={listing.project_name || listing.location}
                    className="w-full shadow-sm h-48 object-cover rounded-t-xl mb-4"
                />
                <div className="p-6 flex flex-col items-start justify-center gap-3">
                    <div className="w-full">
                        <p className="text-xl font-bold mb-1">
                            {listing.project_name || `${listing.property_type} in ${listing.location}`}
                        </p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                            <MapPin className="w-3 h-3" />
                            <p>{listing.location}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3 text-sm">
                        {listing.bedroom_count && (
                            <div className="flex items-center gap-1">
                                <BedDouble className="w-4 h-4 text-primary" />
                                <span>{listing.bedroom_count} BHK</span>
                            </div>
                        )}
                        {listing.area_sqft && (
                            <div className="flex items-center gap-1">
                                <Ruler className="w-4 h-4 text-primary" />
                                <span>{listing.area_sqft.toLocaleString()} sqft</span>
                            </div>
                        )}
                    </div>

                    <div className="w-full">
                        <p className="text-2xl font-bold text-primary">{listing.price_text}</p>
                        {listing.furnishing_status && (
                            <p className="text-xs text-muted-foreground capitalize mt-1">
                                {listing.furnishing_status.replace(/_/g, ' ')}
                            </p>
                        )}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex flex-row items-start justify-start">
                {/* Wrapper motion.div that detects hover on the button */}
                <motion.div whileHover="hovered" initial="rest">
                    <Button variant="outline" className="w-[150px] text-primary-foreground py-6">
                        View Property
                        {/* Arrow that animates position only based on parent hover state using variants */}
                        {/* rest: x 0 (no movement) */}
                        {/* hovered: x 4px (moves right by 4px) */}
                        {/* Arrow stays visible at all times (no opacity animation) */}
                        {/* transition: smooth 0.3s animation */}
                        <motion.div
                            variants={{
                                rest: { x: 0 },
                                hovered: { x: 4 }
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <ArrowRightIcon className="w-4 h-4" />
                        </motion.div>
                    </Button>
                </motion.div>
            </CardFooter>
        </Card>
    )
}   