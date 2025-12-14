import { QuestionStep } from "@/components/home/question-step"
import { LoadingStep } from "@/components/ui/loading-steps"

export const QUESTION_TEMPLATES: Record<string, QuestionStep> = {
  work_location: {
    id: "work_location",
    text: "Where do you work?",
    status: "pending",
    controlType: "Select",
    label: "Work Location",
    placeholder: "Select your work location",
    value: 0,
    options: ["Indiranagar", "Koramangala", "Whitefield", "Sarjapur", "Hebbal", "MG Road"],
  },
  commute_time: {
    id: "commute_time",
    text: "What's your preferred commute time?",
    status: "pending",
    controlType: "Slider",
    label: "Commute Time",
    placeholder: "Select commute time",
    value: 30,
    min: 5,
    max: 60,
    unit: "mins",
    range: false,
  },
  search_location: {
    id: "search_location",
    text: "Which locality interests you?",
    status: "pending",
    controlType: "Select",
    label: "Search Location",
    placeholder: "Select locality",
    value: 0,
    options: ["Indiranagar", "Koramangala", "Whitefield", "Sarjapur", "Hebbal", "Bannerghatta"],
  },
  size: {
    id: "size",
    text: "What's your preferred property size range?",
    status: "pending",
    controlType: "Slider",
    label: "Size",
    placeholder: "Select size range",
    value: 1000,
    min: 500,
    max: 5000,
    unit: "sqft",
    range: true,
  },
  budget: {
    id: "budget",
    text: "What's your budget range?",
    status: "pending",
    controlType: "Slider",
    label: "Budget",
    placeholder: "Select budget range",
    value: 5000000,

    max: 5,
    unit: "Crores",
    range: true,
  },
  apartment_type: {
    id: "apartment_type",
    text: "What type of property are you looking for?",
    status: "pending",
    controlType: "Select",
    label: "Apartment Type",
    placeholder: "Select property type",
    value: 0,
    options: ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Villa", "Standalone House"],
  },
}

// Hardcoded missing questions for demo
export const HARDCODED_MISSING_QUESTIONS = ["work_location", "commute_time", "budget", "apartment_type"]

export function getMissingQuestions(questionIds: string[]): QuestionStep[] {
  return questionIds
    .map(id => QUESTION_TEMPLATES[id])
    .filter(Boolean)
}


export const getLoadingSteps = (): LoadingStep[] => {
  return [   // Initialize all steps as pending
    {
      id: "matches",
      text: "Loading matches for your work location",
      completedText: "Found 44 matches for your work location",
      status: "pending"
    },
    {
      id: "pricing",
      text: "Gathering pricing information",
      completedText: "Pricing info gathered",
      status: "pending"
    },
    {
      id: "neighborhoods",
      text: "Checking nearby neighborhoods",
      completedText: "Got information on nearby locations",
      status: "pending"
    },
  ]
}
