"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle } from "lucide-react"
import { ConversationalQuestion } from "@/data/mock-questions"
import { AnswerBadges } from "@/components/home/conversation-summary/AnswerBadges"

interface ChatPanelProps {
  answers?: Record<string, any>
  questions?: ConversationalQuestion[]
}

/**
 * Left panel: Chat window with search criteria
 * Displays user's preferences and chat history
 */
export function ChatPanel({ answers, questions }: ChatPanelProps) {
  const hasAnswers = answers && questions && Object.keys(answers).length > 0

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Search Criteria</h2>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Your preferences</p>
      </div>

      {/* Content Area */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Answer Badges or Placeholder */}
          {hasAnswers && answers && questions ? (
            <AnswerBadges answers={answers} questions={questions} />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">No criteria selected yet</p>
            </div>
          )}

          {/* Chat Messages Placeholder */}
          <div className="space-y-3">
            <div className="bg-primary/10 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Assistant</p>
              <p className="text-sm text-foreground">Great choices! I found 45 properties matching your criteria.</p>
            </div>
            <div className="bg-primary rounded-lg p-3 ml-auto w-[80%]">
              <p className="text-xs text-primary-foreground opacity-80">You</p>
              <p className="text-sm text-primary-foreground">Show me on the map</p>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
