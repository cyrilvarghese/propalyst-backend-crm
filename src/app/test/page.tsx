'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin } from 'lucide-react'
import CardImageVertical from './components/cards/card-image-vertical'
import CardImageHorizontal from './components/cards/card-image-horizontal'
import CardImageHorizontalNoPadding from './components/cards/card-image-horizontal-no-padding'
import { LocationProximityControl } from '@/components/home/question-controls'

export default function TestPage() {
    const [activeTab, setActiveTab] = useState('location')
    const [selectedLocation, setSelectedLocation] = useState<any>(null)

    const backgroundImage = ''

    return (
        <div className="flex flex-col gap-8 p-8 bg-background min-h-screen">
            <div className="flex gap-2 mb-4">
                <Button
                    onClick={() => setActiveTab('cards')}
                    variant={activeTab === 'cards' ? 'default' : 'outline'}
                >
                    Cards
                </Button>
                <Button
                    onClick={() => setActiveTab('location')}
                    variant={activeTab === 'location' ? 'default' : 'outline'}
                >
                    Location Proximity
                </Button>
            </div>

            {activeTab === 'cards' && (
                <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
                    <div className="flex flex-row gap-4">
                        <CardImageVertical />
                        {/* <CardImageVerticalNoPadding /> */}
                        <CardImageHorizontal />
                        <CardImageHorizontalNoPadding />
                    </div>
                </div>
            )}

            {activeTab === 'location' && (
                <div className="grid grid-cols-1 gap-8 max-w-2xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Location Picker Test</CardTitle>
                            <CardDescription>Test the location autocomplete component</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="text-sm font-medium mb-3">Search and select a location</h3>
                                <LocationProximityControl
                                    placeholder="Type a location..."
                                    onLocationSelect={(location) => {
                                        setSelectedLocation({
                                            location,
                                            timestamp: new Date().toISOString(),
                                        })
                                    }}
                                />
                            </div>

                            {selectedLocation && (
                                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 w-fit">
                                    <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                                    <p className="text-sm text-foreground">{selectedLocation.location.address}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
