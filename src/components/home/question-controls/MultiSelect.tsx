"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ConversationalQuestion } from "@/data/mock-questions"
import * as Icons from "lucide-react"

interface MultiSelectProps {
  question: ConversationalQuestion
  selectedOptions: string[]
  isLoading: boolean
  onChange: (values: string[]) => void
}

export function MultiSelect({
  question,
  selectedOptions,
  isLoading,
  onChange,
}: MultiSelectProps) {
  if (!question.data?.options) return null

  const handleToggle = (value: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedOptions, value])
    } else {
      onChange(selectedOptions.filter((v) => v !== value))
    }
  }

  return (
    <div className="space-y-3">
      {question.data.options.map((option) => (
        <div
          key={option.value}
          className="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:border-primary/30 transition-colors"
        >
          <Checkbox
            id={option.value}
            checked={selectedOptions.includes(option.value)}
            onCheckedChange={(checked) =>
              handleToggle(option.value, checked as boolean)
            }
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
  )
}
