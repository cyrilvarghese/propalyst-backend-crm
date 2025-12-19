"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ConversationalQuestion } from "@/data/mock-questions"
import * as Icons from "lucide-react"

interface RadioGroupControlProps {
  question: ConversationalQuestion
  answer: string | null
  isLoading: boolean
  onChange: (value: string) => void
}

export function RadioGroupControl({
  question,
  answer,
  isLoading,
  onChange,
}: RadioGroupControlProps) {
  if (!question.data?.options) return null

  return (
    <RadioGroup
      value={answer || ""}
      onValueChange={onChange}
      disabled={isLoading}
    >
      <div className="space-y-3">
        {question.data.options.map((option) => (
          <div
            key={option.value}
            className="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:border-primary/30 transition-colors cursor-pointer"
          >
            <RadioGroupItem value={option.value} id={option.value} />
            <Label
              htmlFor={option.value}
              className="flex-1 cursor-pointer flex items-center gap-2"
            >
              {option.icon && (
                <>
                  {Icons[option.icon as keyof typeof Icons] &&
                    (() => {
                      const Icon =
                        Icons[option.icon as keyof typeof Icons]
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
  )
}
