import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Slider } from '../ui/slider'
import { Label } from '../ui/label'
import { AnimatePresence, motion } from 'motion/react'
import { Spinner } from '../ui/spinner'
import { Check, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import * as Icons from 'lucide-react'

export type Option = {
    text: string
    icon?: keyof typeof Icons
}

export type QuestionStep = {
    id: string
    text: string
    status: "pending" | "loading" | "complete"
    controlType: string
    label: string
    placeholder: string
    value: number
    options?: (string | Option)[]
    max?: number
    unit?: string,
    range?: boolean
    min?: number
}

interface QuestionStepProps {
    step: QuestionStep
    onNext?: (answer: any) => void
}

type QuestionSteps = {
    questionSteps: QuestionStep[]

}
export default function QuestionStep({ step, onNext }: QuestionStepProps) {
    const [dataPoint, setDataPoint] = useState<number[]>(step.range ? [step.min ?? 0, step.max ?? 0] : [step.value])
    const [selectedOptions, setSelectedOptions] = useState<string[]>([])
    const handleSliderChange = (value: number[]) => {
        setDataPoint(value)

    }
    const handleNext = () => {
        const answer = step.controlType === "Slider" ? dataPoint : selectedOptions
        console.log(answer)
        if (onNext) {
            onNext(answer)
        }
    }
    return (
        <div className="flex flex-col items-start pl-4 p-6 space-y-3 gap-2">
            <AnimatePresence mode="popLayout">

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
                            className={`text-md font-medium transition-colors duration-300 ${step.status === "loading"
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
                                <>

                                    <p className="text-sm text-muted-foreground font-medium">{step.range ? `${dataPoint[0]} - ${dataPoint[1]}  ${step.unit}` : `${dataPoint[0]} ${step.unit}`}</p>
                                    <Slider
                                        className="pb-2 w-[300px]"

                                        defaultValue={dataPoint}
                                        max={step.max}
                                        step={step.range ? 1 : 10}
                                        min={step.min}
                                        onValueChange={handleSliderChange}  //handle slider change
                                    />
                                </>
                            )
                        }
                        {
                            step.controlType === "Select" && (
                                <ToggleGroup
                                    type="multiple"
                                    value={selectedOptions}
                                    onValueChange={setSelectedOptions}
                                    className="justify-start"
                                >
                                    {step.options?.map((option) => {
                                        const isOptionObject = typeof option === 'object'
                                        const text = isOptionObject ? option.text : option
                                        const iconName = isOptionObject ? option.icon : undefined
                                        const Icon = iconName ? (Icons[iconName] as React.ComponentType<{ className: string }>) : null

                                        return (
                                            <ToggleGroupItem
                                                key={text}
                                                value={text}
                                                className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground flex items-center gap-2"
                                            >
                                                {Icon && <Icon className="w-4 h-4" />}
                                                {text}
                                            </ToggleGroupItem>
                                        )
                                    })}
                                </ToggleGroup>
                            )
                        }
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleNext}
                            className="w-full mt-8"
                        ><span className="text-sm font-medium">Next</span>
                            <ChevronRight className="size-4 hover:text-primary hover:bg-primary/10" />
                        </Button>
                    </div>

                </motion.div>

            </AnimatePresence>

        </div >
    )
}


