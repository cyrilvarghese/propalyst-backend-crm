"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "motion/react"
import { ChevronRight, BarChart3 } from "lucide-react"
import { ConversationalQuestion, HistogramBin } from "@/data/mock-questions"
import * as Icons from "lucide-react"

interface ConversationalQuestionProps {
  question: ConversationalQuestion
  onAnswer: (answer: any) => void
  isLoading?: boolean
}

/**
 * Renders a histogram visualization for a range slider
 * Shows the distribution of properties in different price/size ranges
 * Animation: Bars animate in from bottom using Framer Motion
 */
function HistogramChart({ bins }: { bins: HistogramBin[] }) {
  const maxCount = Math.max(...bins.map((b) => b.count))

  return (
    <div className="mt-4 mb-6">
      {/* Chart Title */}
      <div className="flex items-center gap-2 mb-3">
        <BarChart3 className="w-4 h-4 text-primary" />
        <p className="text-sm font-medium text-muted-foreground">Property Distribution</p>
      </div>

      {/* Bars Container - flex row with items aligned to bottom */}
      <div className="flex items-end gap-1 h-24 px-1">
        {bins.map((bin, index) => (
          <motion.div
            key={bin.range}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: `${(bin.count / maxCount) * 100}%`, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: index * 0.05,
              ease: "easeOut",
            }}
            className="flex-1 min-h-2 rounded-sm bg-gradient-to-t from-primary to-primary/50 hover:from-primary/80 hover:to-primary/40 transition-colors"
            title={`${bin.range}: ${bin.count} properties`}
          />
        ))}
      </div>

      {/* Labels */}
      <div className="flex items-end gap-1 mt-2 text-xs text-muted-foreground">
        {bins.map((bin) => (
          <div key={bin.range} className="flex-1 text-center truncate">
            {bin.range}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ConversationalQuestionComponent({
  question,
  onAnswer,
  isLoading = false,
}: ConversationalQuestionProps) {
  const [answer, setAnswer] = useState<any>(null)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const handleAnswer = () => {
    if (answer !== null || selectedOptions.length > 0) {
      const finalAnswer =
        question.controlType === "multi-select" ? selectedOptions : answer
      onAnswer(finalAnswer)
    }
  }

  const isAnswered =
    answer !== null || (question.controlType === "multi-select" && selectedOptions.length > 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Question Title */}
      <div className="space-y-2">
        <Label className="text-base font-semibold text-foreground">{question.question}</Label>
        {question.helpText && (
          <p className="text-sm text-muted-foreground">{question.helpText}</p>
        )}
      </div>

      {/* Histogram for range-sliders */}
      {question.controlType === "range-slider" &&
        question.data?.histogram &&
        question.data.histogram.length > 0 && (
          <HistogramChart bins={question.data.histogram} />
        )}

      {/* Market Insights */}
      {question.data?.marketInsights && (
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-3 text-sm">
          <p className="text-blue-900 dark:text-blue-100">
            <span className="font-semibold">Market Insight:</span> {question.data.marketInsights}
          </p>
        </div>
      )}

      {/* Control Type: Text Input */}
      {question.controlType === "text" && (
        <Input
          type="text"
          placeholder={`Enter ${question.label.toLowerCase()}`}
          value={answer || ""}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={isLoading}
          className="w-full"
        />
      )}

      {/* Control Type: Radio Group */}
      {question.controlType === "radio" && question.data?.options && (
        <RadioGroup value={answer || ""} onValueChange={setAnswer} disabled={isLoading}>
          <div className="space-y-3">
            {question.data.options.map((option) => (
              <div key={option.value} className="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:border-primary/30 transition-colors cursor-pointer">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex-1 cursor-pointer flex items-center gap-2">
                  {option.icon && (
                    <>
                      {Icons[option.icon as keyof typeof Icons] &&
                        (() => {
                          const Icon = Icons[option.icon as keyof typeof Icons]
                          return <Icon className="w-4 h-4 text-primary" />
                        })()}
                    </>
                  )}
                  <span>{option.label}</span>
                  {option.count !== undefined && (
                    <span className="ml-auto text-xs text-muted-foreground">
                      ({option.count})
                    </span>
                  )}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      )}

      {/* Control Type: Toggle Group (Single Select) */}
      {question.controlType === "toggle-group" && question.data?.options && (
        <ToggleGroup
          type="single"
          value={answer || ""}
          onValueChange={setAnswer}
          disabled={isLoading}
          className="justify-start flex-wrap gap-2"
        >
          {question.data.options.map((option) => (
            <ToggleGroupItem
              key={option.value}
              value={option.value}
              className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground flex items-center gap-2"
            >
              {option.icon && (
                <>
                  {Icons[option.icon as keyof typeof Icons] &&
                    (() => {
                      const Icon = Icons[option.icon as keyof typeof Icons]
                      return <Icon className="w-4 h-4" />
                    })()}
                </>
              )}
              <span>{option.label}</span>
              {option.count !== undefined && (
                <span className="text-xs opacity-70">({option.count})</span>
              )}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      )}

      {/* Control Type: Multi-Select (Checkboxes) */}
      {question.controlType === "multi-select" && question.data?.options && (
        <div className="space-y-3">
          {question.data.options.map((option) => (
            <div
              key={option.value}
              className="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:border-primary/30 transition-colors"
            >
              <Checkbox
                id={option.value}
                checked={selectedOptions.includes(option.value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedOptions([...selectedOptions, option.value])
                  } else {
                    setSelectedOptions(
                      selectedOptions.filter((v) => v !== option.value)
                    )
                  }
                }}
                disabled={isLoading}
              />
              <Label
                htmlFor={option.value}
                className="flex-1 cursor-pointer flex items-center gap-2"
              >
                {option.icon && (
                  <>
                    {Icons[option.icon as keyof typeof Icons] &&
                      (() => {
                        const Icon = Icons[option.icon as keyof typeof Icons]
                        return <Icon className="w-4 h-4 text-primary" />
                      })()}
                  </>
                )}
                <span>{option.label}</span>
                {option.count !== undefined && (
                  <span className="ml-auto text-xs text-muted-foreground">
                    ({option.count})
                  </span>
                )}
              </Label>
            </div>
          ))}
        </div>
      )}

      {/* Control Type: Select Dropdown */}
      {question.controlType === "select" && question.data?.options && (
        <Select value={answer || ""} onValueChange={setAnswer} disabled={isLoading}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={`Select ${question.label.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent>
            {question.data.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                  <span>{option.label}</span>
                  {option.count !== undefined && (
                    <span className="text-xs text-muted-foreground">
                      ({option.count})
                    </span>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Control Type: Slider */}
      {question.controlType === "slider" &&
        question.data?.min !== undefined &&
        question.data?.max !== undefined && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {answer !== null
                  ? `${answer} ${question.data.unit || ""}`
                  : "Select value"}
              </span>
            </div>
            <Slider
              min={question.data.min}
              max={question.data.max}
              step={question.data.step || 1}
              value={answer !== null ? [answer] : [question.data.defaultValue || question.data.min]}
              onValueChange={(value) => setAnswer(value[0])}
              disabled={isLoading}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{question.data.min} {question.data.unit}</span>
              <span>{question.data.max} {question.data.unit}</span>
            </div>
          </div>
        )}

      {/* Control Type: Range Slider */}
      {question.controlType === "range-slider" &&
        question.data?.min !== undefined &&
        question.data?.max !== undefined && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {answer !== null && Array.isArray(answer)
                  ? `${answer[0]} - ${answer[1]} ${question.data.unit || ""}`
                  : "Select range"}
              </span>
              {question.data.recommendedValue && Array.isArray(question.data.recommendedValue) && (
                <span className="text-xs text-primary">
                  Recommended: {question.data.recommendedValue[0]} - {question.data.recommendedValue[1]}
                </span>
              )}
            </div>
            <Slider
              min={question.data.min}
              max={question.data.max}
              step={question.data.step || 1}
              value={
                answer !== null && Array.isArray(answer)
                  ? answer
                  : [
                      question.data.defaultValue?.[0] || question.data.min,
                      question.data.defaultValue?.[1] || question.data.max,
                    ]
              }
              onValueChange={setAnswer}
              disabled={isLoading}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{question.data.min} {question.data.unit}</span>
              <span>{question.data.max} {question.data.unit}</span>
            </div>
          </div>
        )}

      {/* Submit Button */}
      <Button
        onClick={handleAnswer}
        disabled={!isAnswered || isLoading}
        className="w-full mt-4"
        size="lg"
      >
        <span>Next</span>
        <ChevronRight className="ml-2 w-4 h-4" />
      </Button>
    </motion.div>
  )
}
