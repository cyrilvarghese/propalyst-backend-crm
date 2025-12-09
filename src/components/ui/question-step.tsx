import React from 'react'
import { Input } from './input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { Slider } from './slider'
import { Label } from './label'
import { AnimatePresence, motion } from 'motion/react'
import { Spinner } from './spinner'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
export type QuestionStep = {
    id: string
    text: string
    status: "pending" | "loading" | "complete"
    controlType: string
    label: string
    placeholder: string
    value: string
    options?: string[]
    max?: number

}
type QuestionSteps = {
    questionSteps: QuestionStep[]

}
export default function QuestionStep({ questionSteps }: QuestionSteps) {
    return (
        <div className="flex flex-col items-start pl-4 p-6 space-y-3 gap-2">
            <AnimatePresence mode="popLayout">
                {questionSteps.map((step) => (
                    <motion.div
                        style={{ alignItems: 'start' }}
                        key={step.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-3"
                    >
                        {/* Icon */}
                        <div className="flex-shrink-0 pt-1">
                            {step.status === "loading" && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                >
                                    <Spinner className="size-4" />
                                </motion.div>
                            )}
                            {step.status === "complete" && (
                                <motion.div
                                    initial={{ scale: 1 }}
                                    animate={{ scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                >
                                    <div className="size-5 rounded-full bg-gradient-primary flex items-center justify-center">
                                        <Check className="size-3 m-1 text-white" strokeWidth={3} />
                                    </div>
                                </motion.div>
                            )}
                            {step.status === "pending" && (
                                <div className="size-4 rounded-full border-2 border-muted" />
                            )}


                        </div>

                        {/* Text */}
                        <div className="flex flex-col items-start gap-4 ">
                            <span
                                className={`text-sm font-medium transition-colors duration-300 ${step.status === "loading"
                                    ? "text-shimmer"
                                    : step.status === "complete"
                                        ? "text-foreground"
                                        : "text-muted-foreground"
                                    }`}
                            >

                                {step.text}
                            </span>
                            {
                                step.controlType === "Slider" && (
                                    <Slider
                                        defaultValue={[0]}
                                        max={step.max}
                                        step={1}


                                    />

                                )
                            }
                        </div>

                    </motion.div>


                ))}

            </AnimatePresence>


        </div >
    )
}


