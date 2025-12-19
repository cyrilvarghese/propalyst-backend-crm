"use client"

import { Input } from "@/components/ui/input"
import { ConversationalQuestion } from "@/data/mock-questions"

interface TextInputProps {
  question: ConversationalQuestion
  answer: string | null
  isLoading: boolean
  onChange: (value: string) => void
}

export function TextInput({
  question,
  answer,
  isLoading,
  onChange,
}: TextInputProps) {
  return (
    <Input
      type="text"
      placeholder={`Enter ${question.label.toLowerCase()}`}
      value={answer || ""}
      onChange={(e) => onChange(e.target.value)}
      disabled={isLoading}
      className="w-full"
    />
  )
}
