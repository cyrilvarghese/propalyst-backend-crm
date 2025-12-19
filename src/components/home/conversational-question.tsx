"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "motion/react"
import { ChevronRight } from "lucide-react"
import { ConversationalQuestion } from "@/data/mock-questions"
import CommunitySelectionQuestion from "./community-selection-question"
import {
  TextInput,
  RadioGroupControl,
  ToggleGroupControl,
  MultiSelect,
  SliderControl,
  RangeSlider,
} from "./question-controls"

interface ConversationalQuestionProps {
  question: ConversationalQuestion
  onAnswer: (answer: any) => void
  isLoading?: boolean
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

  const handleCommunitySkip = () => {
    // Skip community selection and return empty array
    onAnswer([])
  }

  const isAnswered =
    answer !== null || (question.controlType === "multi-select" && selectedOptions.length > 0) || question.controlType === "community-selection"

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

      {/* Control Type: Text Input */}
      {question.controlType === "text" && (
        <TextInput
          question={question}
          answer={answer}
          isLoading={isLoading}
          onChange={setAnswer}
        />
      )}

      {/* Control Type: Radio Group */}
      {question.controlType === "radio" && question.data?.options && (
        <RadioGroupControl
          question={question}
          answer={answer}
          isLoading={isLoading}
          onChange={setAnswer}
        />
      )}

      {/* Control Type: Toggle Group (Single Select) */}
      {question.controlType === "toggle-group" && question.data?.options && (
        <ToggleGroupControl
          question={question}
          answer={answer}
          isLoading={isLoading}
          onChange={setAnswer}
        />
      )}

      {/* Control Type: Multi-Select (Checkboxes) */}
      {question.controlType === "multi-select" && question.data?.options && (
        <MultiSelect
          question={question}
          selectedOptions={selectedOptions}
          isLoading={isLoading}
          onChange={setSelectedOptions}
        />
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
          <SliderControl
            question={question}
            answer={answer as number | null}
            isLoading={isLoading}
            onChange={setAnswer}
          />
        )}

      {/* Control Type: Range Slider */}
      {question.controlType === "range-slider" &&
        question.data?.min !== undefined &&
        question.data?.max !== undefined && (
          <RangeSlider
            question={question}
            answer={answer as [number, number] | null}
            isLoading={isLoading}
            onChange={(value) => setAnswer(value)}
          />
        )}

      {/* Community Selection */}
      {question.controlType === "community-selection" && question.data?.communities && (
        <CommunitySelectionQuestion
          question={question.question}
          communities={question.data.communities}
          onAnswer={(selectedIds) => {
            setAnswer(selectedIds)
            onAnswer(selectedIds)
          }}
          onSkip={handleCommunitySkip}
        />
      )}

      {/* Submit Button - Only show for non-community-selection types */}
      {question.controlType !== "community-selection" && (
        <Button
          onClick={handleAnswer}
          disabled={!isAnswered || isLoading}
          className="w-full mt-4"
          size="lg"
        >
          <span>Next</span>
          <ChevronRight className="ml-2 w-4 h-4" />
        </Button>
      )}
    </motion.div>
  )
}
