'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/navbar/navbar'
import { SplitPanelLayout } from '@/components/matches/SplitPanelLayout'
import { ChatPanel } from '@/components/matches/ChatPanel'
import { MapPanel } from '@/components/matches/MapPanel'
import { ConversationalQuestion } from '@/data/mock-questions'

export default function MatchesPage() {
  const [answers, setAnswers] = useState<Record<string, any> | undefined>()
  const [questions, setQuestions] = useState<ConversationalQuestion[] | undefined>()

  useEffect(() => {
    // Retrieve stored answers and questions from sessionStorage
    const storedAnswers = sessionStorage.getItem('matchesAnswers')
    const storedQuestions = sessionStorage.getItem('matchesQuestions')

    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers))
    }
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions))
    }
  }, [])

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Navbar */}
      <Navbar />

      {/* Main Content Container */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto">
          {/* Split Panel Content */}
          <SplitPanelLayout
            leftPanel={<ChatPanel answers={answers} questions={questions} />}
            rightPanel={<MapPanel />}
          />
        </div>
      </div>
    </div>
  )
}
