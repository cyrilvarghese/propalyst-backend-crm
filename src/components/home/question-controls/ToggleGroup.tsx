"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { ConversationalQuestion } from "@/data/mock-questions"
import * as Icons from "lucide-react"

interface ToggleGroupControlProps {
  question: ConversationalQuestion
  answer: string | null
  isLoading: boolean
  onChange: (value: string) => void
}

export function ToggleGroupControl({
  question,
  answer,
  isLoading,
  onChange,
}: ToggleGroupControlProps) {
  if (!question.data?.options) return null

  return (
    <ToggleGroup
      type="single"
      value={answer || ""}
      onValueChange={onChange}
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
                  const Icon =
                    Icons[option.icon as keyof typeof Icons]
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
  )
}
