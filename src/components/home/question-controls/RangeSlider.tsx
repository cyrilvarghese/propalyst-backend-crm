"use client"

import { Slider } from "@/components/ui/slider"
import { ConversationalQuestion } from "@/data/mock-questions"
import { HistogramChart } from "./HistogramChart"
import { HistogramRecharts } from "./HistogramRecharts"
interface RangeSliderProps {
  question: ConversationalQuestion
  answer: [number, number] | null

  isLoading: boolean
  onChange: (value: [number, number]) => void
}

export function RangeSlider({
  question,
  answer,
  isLoading,

  onChange,
}: RangeSliderProps) {
  const {
    min,
    max,
    step = 1,
    unit = "",
    defaultValue,
    recommendedValue,
    histogram,
    chartTitle = "",
    marketInsights,
  } = question.data || {}

  if (min === undefined || max === undefined) return null

  return (
    <div className="space-y-4">
      {/* Histogram and Market Insights - Side by side */}
      {(histogram || marketInsights) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Histogram */}
          {histogram && histogram.length > 0 && (
            <div className="border border-border rounded-lg p-4 shadow-sm bg-card h-fit">
              <HistogramRecharts bins={histogram} title={chartTitle} />
            </div>
          )}

          {/* Market Insights */}
          {marketInsights && (
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm h-fit">
              <p className="text-blue-900 dark:text-blue-100">
                <span className="font-semibold">Market Insight:</span>{" "}
                {marketInsights}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Range Display and Recommended */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">
          {answer !== null && Array.isArray(answer)
            ? `${answer[0]} - ${answer[1]} ${unit}`
            : "Select range"}
        </span>
        {recommendedValue && Array.isArray(recommendedValue) && (
          <span className="text-xs text-primary">
            Recommended: {recommendedValue[0]} - {recommendedValue[1]}
          </span>
        )}
      </div>

      {/* Slider */}
      <Slider
        min={min}
        max={max}
        step={step}
        value={
          answer !== null && Array.isArray(answer)
            ? answer
            : [
              defaultValue?.[0] || min,
              defaultValue?.[1] || max,
            ]
        }
        onValueChange={(value) =>
          onChange([value[0], value[1]] as [number, number])
        }
        disabled={isLoading}
        className="w-full"
      />

      {/* Min/Max Labels */}
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>
          {min} {unit}
        </span>
        <span>
          {max} {unit}
        </span>
      </div>
    </div>
  )
}
