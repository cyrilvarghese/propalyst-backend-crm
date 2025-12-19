"use client"

import { Slider } from "@/components/ui/slider"
import { ConversationalQuestion } from "@/data/mock-questions"

interface SliderControlProps {
  question: ConversationalQuestion
  answer: number | null
  isLoading: boolean
  onChange: (value: number) => void
}

export function SliderControl({
  question,
  answer,
  isLoading,
  onChange,
}: SliderControlProps) {
  const { min, max, step = 1, unit = "", defaultValue } = question.data || {}

  if (min === undefined || max === undefined) return null

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">
          {answer !== null
            ? `${answer} ${unit}`
            : "Select value"}
        </span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={
          answer !== null ? [answer] : [defaultValue || min]
        }
        onValueChange={(value) => onChange(value[0])}
        disabled={isLoading}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{min} {unit}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  )
}
