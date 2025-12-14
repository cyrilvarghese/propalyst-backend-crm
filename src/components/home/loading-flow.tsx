"use client"

import { useState, useEffect } from "react"
import LoadingSteps, { LoadingStep } from "@/components/ui/loading-steps"
import { getLoadingSteps } from "@/data/question-templates"

interface LoadingFlowProps {
  onComplete: () => void
}

export default function LoadingFlow({ onComplete }: LoadingFlowProps) {
  const [loadingSteps, setLoadingSteps] = useState<LoadingStep[]>([])

  useEffect(() => {
    startLoadingSteps()
  }, [])

  const simulateApiCall = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  async function startLoadingSteps() {
    setLoadingSteps(getLoadingSteps())

    try {
      // Step 1: Load matches
      setLoadingSteps(prev => prev.map(s =>
        s.id === "matches" ? { ...s, status: "loading" } : s
      ))
      await simulateApiCall(1500) // Replace with: await fetchMatches(query)
      setLoadingSteps(prev => prev.map(s =>
        s.id === "matches" ? { ...s, status: "complete" } : s
      ))

      // Step 2: Gather pricing
      setLoadingSteps(prev => prev.map(s =>
        s.id === "pricing" ? { ...s, status: "loading" } : s
      ))
      await simulateApiCall(1200) // Replace with: await fetchPricing(query)
      setLoadingSteps(prev => prev.map(s =>
        s.id === "pricing" ? { ...s, status: "complete" } : s
      ))

      // Step 3: Check neighborhoods
      setLoadingSteps(prev => prev.map(s =>
        s.id === "neighborhoods" ? { ...s, status: "loading" } : s
      ))
      await simulateApiCall(1000) // Replace with: await fetchNeighborhoods(query)
      setLoadingSteps(prev => prev.map(s =>
        s.id === "neighborhoods" ? { ...s, status: "complete" } : s
      ))

      // All done - trigger completion
      console.log("All steps complete!")
      onComplete()
    } catch (error) {
      console.error("Error during loading:", error)
    }
  }

  return <LoadingSteps steps={loadingSteps} />
}
