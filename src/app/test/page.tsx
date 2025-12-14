
import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from 'lucide-react'
import CardImageVertical from './components/cards/card-image-vertical'
import CardImageVerticalNoPadding from './components/cards/card-image-vertical-no-padding'
import CardImageHorizontal from './components/cards/card-image-horizontal'
import CardImageHorizontalNoPadding from './components/cards/card-image-horizontal-no-padding'
export default function TestPage() {
    //add a unsplash background image
    const backgroundImage = ''
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="flex flex-row gap-4">
                <CardImageVertical />
                <CardImageVerticalNoPadding />
                <CardImageHorizontal />
                <CardImageHorizontalNoPadding />
            </div>
        </div >

    );
}
