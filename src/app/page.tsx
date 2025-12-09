'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import SearchInput from "@/components/home/search-input"
import QuestionCard from "@/components/home/question-card"
import QuestionStep from '@/components/ui/question-step';
import { QuestionStep as QuestionStepType } from '@/components/ui/question-step';

export default function Home() {
  const questionSteps: QuestionStepType[] = [

    {
      id: "commute_time",
      text: "What be your ideal commute time in minutes?",
      status: "loading",
      controlType: "Slider",
      label: "Commute Time",
      placeholder: "Enter your commute time",
      value: "0",
      max: 120
    }
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-8 pt-48 bg-background text-foreground">
      <div className="w-full max-w-2xl space-y-8 text-center">
        {/* Logo / Title */}
        <div className="space-y-4 fade-in">
          <h1 className=" p-2 text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent-foreground  bg-clip-text text-transparent">
            Propalyst AI
          </h1>
          <p className="text-muted-foreground text-lg">
            Intelligent Real Estate Matching Engine
          </p>

        </div>

        {/* Search Box */}

        <SearchInput />
        <div className="flex flex-row gap-4">
          {questionSteps.map((step) => (
            <QuestionStep key={step.id} questionSteps={questionSteps} />
          ))}

        </div>

      </div>
    </div>
  );
}
