"use client"
import { motion } from "motion/react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "lucide-react"

export default function CardImageHorizontalNoPadding() {
    return (
        < Card className="w-[560px] h-[304px] flex flex-row gap-4 backdrop-blur-md bg-black/70 hover:shadow-xl glass-texture transition-shadow duration-300" >

            <CardContent className="p-0">
                < div className="flex flex-row gap-4 h-full p-0" >
                    <div className="flex flex-1 h-full">
                        <img
                            src="https://images.unsplash.com/photo-1688653802629-5360086bf632?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Cover"
                            className=" h-full w-full object-cover rounded-l-xl mb-4"
                        />
                    </div>


                    <div className="flex flex-1 flex-col gap-4 p-4 py-6 pl-0">
                        <p className="text-lg font-bold ">Prestige Lake Terrace</p>
                        <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
                        <motion.div whileHover="hovered" initial="rest" className="w-full">
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
                    </div>
                </div >
            </CardContent >

        </Card >
    )
}     