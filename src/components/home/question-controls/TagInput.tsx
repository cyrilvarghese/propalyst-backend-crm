"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Input } from "@/components/ui/input"
import { X, Hash } from "lucide-react"
import { ConversationalQuestion } from "@/data/mock-questions"

interface TagInputProps {
  question: ConversationalQuestion
  answer: string[] | null
  isLoading?: boolean
  onChange: (tags: string[]) => void
}

export function TagInput({
  question,
  answer = [],
  isLoading = false,
  onChange,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("")
  const [tags, setTags] = useState<string[]>(answer || [])
  const suggestions = question.data?.suggestions || []

  const addTag = (tag: string) => {
    const cleanTag = tag.replace(/^#/, "").trim().toLowerCase()
    if (cleanTag && !tags.includes(cleanTag)) {
      const newTags = [...tags, cleanTag]
      setTags(newTags)
      onChange(newTags)
      setInputValue("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove)
    setTags(newTags)
    onChange(newTags)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault()
      addTag(inputValue)
    }
  }

  return (
    <div className="space-y-3">
      {/* Input Field with Add Button */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
          <Input
            type="text"
            placeholder={question.data?.placeholder || "Type a tag..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="pl-10"
            autoComplete="off"
          />
        </div>
        <button
          type="button"
          onClick={() => addTag(inputValue)}
          disabled={isLoading || !inputValue.trim()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
        >
          Add
        </button>
      </div>

      {/* Tags Display */}
      <AnimatePresence>
        {tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2"
          >
            {tags.map((tag) => (
              <motion.div
                key={tag}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full"
              >
                <Hash className="w-3 h-3 text-primary" />
                <span className="text-sm text-primary font-medium">{tag}</span>
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  disabled={isLoading}
                  className="ml-1 hover:text-primary/80 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suggestions */}
      {suggestions.length > 0 && tags.length < suggestions.length && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions
              .filter((s) => !tags.includes(s))
              .map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => addTag(suggestion)}
                  disabled={isLoading}
                  className="px-2.5 py-1 text-xs border border-muted rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                >
                  #{suggestion}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
