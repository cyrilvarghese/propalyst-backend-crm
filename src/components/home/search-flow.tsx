"use client"

import { useState } from "react"
import SearchInput from "./search-input"
import QuestionFlow from "./question-flow"
import LoadingFlow from "./loading-flow"
import ResultsView from "./results-view"
import { QuestionStep as QuestionStepType } from "./question-step"

type FlowState = "search" | "questions" | "loading" | "results"

export default function SearchFlow() {
  const [currentFlow, setCurrentFlow] = useState<FlowState>("search")
  const [missingQuestions, setMissingQuestions] = useState<QuestionStepType[]>([])
  const [answers, setAnswers] = useState<Record<string, any>>({})

  const handleMissingQuestions = (questions: QuestionStepType[]) => {
    setMissingQuestions(questions)
    setCurrentFlow("questions")
  }

  const handleQuestionsComplete = async (collectedAnswers: Record<string, any>) => {
    setAnswers(collectedAnswers)
    console.log("All questions answered:", collectedAnswers)
    setCurrentFlow("loading")
  }

  const handleLoadingComplete = () => {
    console.log("Loading complete, showing results")
    setCurrentFlow("results")
  }

  return (
    <div className="w-full  space-y-8">



      {/* Question Flow */}
      {currentFlow === "questions" && (
        <QuestionFlow
          questions={missingQuestions}
          onComplete={handleQuestionsComplete}
        />
      )}
      {/* Search Input */}

      <SearchInput onMissingQuestions={handleMissingQuestions} />

      {/* Loading Flow */}
      {currentFlow === "loading" && (
        <LoadingFlow onComplete={handleLoadingComplete} />
      )}

      {/* Results View */}
      {currentFlow === "results" && (
        <ResultsView resultCount={10} />
      )}
    </div>
  )
}
