/**
 * Mock Conversational Questions
 * Simulates what the backend/LLM would return for different criteria
 * Each question includes the control type and context-specific data
 */

export interface HistogramBin {
  range: string;
  count: number;
  minValue: number;
  maxValue: number;
}

export interface QuestionOption {
  value: string;
  label: string;
  count?: number;
  icon?: string;
}

export interface QuestionData {
  // For histograms/charts
  histogram?: HistogramBin[];

  // For select/radio/toggle
  options?: QuestionOption[];

  // For sliders
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number | [number, number];
  unit?: string;

  // Additional insights
  marketInsights?: string;
  recommendedValue?: number | [number, number];
}

export interface ConversationalQuestion {
  id: string;
  question: string;
  controlType: "text" | "select" | "multi-select" | "slider" | "range-slider" | "radio" | "toggle-group";
  data?: QuestionData;
  required: boolean;
  helpText?: string;
  label: string;
}

/**
 * Mock Questions for 3BHK in Indiranagar scenario
 */
export const MOCK_QUESTIONS_3BHK_INDIRANAGAR: ConversationalQuestion[] = [
  {
    id: "req_type",
    question: "Are you looking to buy or rent?",
    label: "Transaction Type",
    controlType: "radio",
    required: true,
    data: {
      options: [
        { value: "buy", label: "Buy", count: 234, icon: "ShoppingCart" },
        { value: "rent", label: "Rent", count: 89, icon: "Key" },
      ],
      marketInsights: "Most 3BHK properties in Indiranagar are for sale",
    },
    helpText: "Select whether you want to buy or rent",
  },
  {
    id: "budget",
    question: "What's your budget range?",
    label: "Budget Range",
    controlType: "range-slider",
    required: true,
    data: {
      min: 0.5,
      max: 5,
      step: 0.1,
      unit: "Cr",
      defaultValue: [1.2, 2.5],
      recommendedValue: [1.5, 2.0],
      histogram: [
        { range: "50L-75L", count: 12, minValue: 0.5, maxValue: 0.75 },
        { range: "75L-1Cr", count: 28, minValue: 0.75, maxValue: 1.0 },
        { range: "1-1.5Cr", count: 65, minValue: 1.0, maxValue: 1.5 },
        { range: "1.5-2Cr", count: 120, minValue: 1.5, maxValue: 2.0 },
        { range: "2-2.5Cr", count: 95, minValue: 2.0, maxValue: 2.5 },
        { range: "2.5-3Cr", count: 45, minValue: 2.5, maxValue: 3.0 },
        { range: "3-4Cr", count: 30, minValue: 3.0, maxValue: 4.0 },
        { range: "4-5Cr", count: 15, minValue: 4.0, maxValue: 5.0 },
      ],
      marketInsights: "Most 3BHK apartments in Indiranagar are priced between 1.5-2.5 Cr",
    },
    helpText: "Drag to select your budget range. The chart shows property distribution.",
  },
  {
    id: "property_type",
    question: "What type of property are you looking for?",
    label: "Property Type",
    controlType: "toggle-group",
    required: true,
    data: {
      options: [
        { value: "apartment", label: "Apartment", count: 298, icon: "Building2" },
        { value: "villa", label: "Villa", count: 18, icon: "Home" },
        { value: "independent_house", label: "Independent House", count: 7, icon: "House" },
        { value: "penthouse", label: "Penthouse", count: 12, icon: "Building" },
      ],
      marketInsights: "Apartments are the most common 3BHK properties in Indiranagar",
    },
    helpText: "Select the type of property you prefer",
  },
  {
    id: "property_status",
    question: "Do you prefer a ready-to-move or under-construction property?",
    label: "Property Status",
    controlType: "toggle-group",
    required: false,
    data: {
      options: [
        { value: "ready_to_move", label: "Ready to Move", count: 256, icon: "CheckCircle" },
        { value: "under_construction", label: "Under Construction", count: 67, icon: "HardHat" },
        { value: "new_launch", label: "New Launch", count: 23, icon: "Rocket" },
      ],
      marketInsights: "78% of 3BHK properties in Indiranagar are ready to move in",
    },
  },
  {
    id: "furnishing_status",
    question: "What furnishing level do you prefer?",
    label: "Furnishing",
    controlType: "toggle-group",
    required: false,
    data: {
      options: [
        { value: "unfurnished", label: "Unfurnished", count: 89, icon: "Box" },
        { value: "semi_furnished", label: "Semi Furnished", count: 134, icon: "Boxes" },
        { value: "fully_furnished", label: "Fully Furnished", count: 112, icon: "Sofa" },
      ],
      marketInsights: "Semi-furnished properties are most common",
    },
  },
];

/**
 * Mock Questions for Villa scenario
 */
export const MOCK_QUESTIONS_VILLA: ConversationalQuestion[] = [
  {
    id: "req_type",
    question: "Are you looking to buy or rent a villa?",
    label: "Transaction Type",
    controlType: "radio",
    required: true,
    data: {
      options: [
        { value: "buy", label: "Buy", count: 156, icon: "ShoppingCart" },
        { value: "rent", label: "Rent", count: 34, icon: "Key" },
      ],
      marketInsights: "Most villas in Bangalore are for sale rather than rent",
    },
  },
  {
    id: "budget",
    question: "What's your budget for the villa?",
    label: "Budget Range",
    controlType: "range-slider",
    required: true,
    data: {
      min: 1,
      max: 15,
      step: 0.5,
      unit: "Cr",
      defaultValue: [2.5, 8],
      histogram: [
        { range: "1-2Cr", count: 15, minValue: 1, maxValue: 2 },
        { range: "2-4Cr", count: 45, minValue: 2, maxValue: 4 },
        { range: "4-6Cr", count: 67, minValue: 4, maxValue: 6 },
        { range: "6-8Cr", count: 89, minValue: 6, maxValue: 8 },
        { range: "8-10Cr", count: 56, minValue: 8, maxValue: 10 },
        { range: "10-12Cr", count: 34, minValue: 10, maxValue: 12 },
        { range: "12-15Cr", count: 23, minValue: 12, maxValue: 15 },
      ],
      marketInsights: "Villa prices typically range from 4-10 Cr depending on location",
    },
  },
  {
    id: "bhk",
    question: "How many bedrooms do you need?",
    label: "Bedrooms",
    controlType: "toggle-group",
    required: true,
    data: {
      options: [
        { value: "2", label: "2 BHK", count: 12 },
        { value: "3", label: "3 BHK", count: 78 },
        { value: "4", label: "4 BHK", count: 145 },
        { value: "5", label: "5 BHK", count: 89 },
        { value: "6", label: "6+ BHK", count: 45 },
      ],
      marketInsights: "4 BHK is the most common villa configuration",
    },
  },
  {
    id: "plot_size",
    question: "What plot size are you looking for?",
    label: "Plot Size",
    controlType: "range-slider",
    required: false,
    data: {
      min: 1200,
      max: 10000,
      step: 200,
      unit: "sqft",
      defaultValue: [2400, 6000],
      histogram: [
        { range: "1200-2400", count: 23, minValue: 1200, maxValue: 2400 },
        { range: "2400-3600", count: 56, minValue: 2400, maxValue: 3600 },
        { range: "3600-4800", count: 89, minValue: 3600, maxValue: 4800 },
        { range: "4800-6000", count: 67, minValue: 4800, maxValue: 6000 },
        { range: "6000-8000", count: 45, minValue: 6000, maxValue: 8000 },
        { range: "8000-10000", count: 34, minValue: 8000, maxValue: 10000 },
      ],
      marketInsights: "Most villas have plot sizes between 3600-6000 sqft",
    },
  },
];

/**
 * Mock Questions for general property search
 */
export const MOCK_QUESTIONS_GENERAL: ConversationalQuestion[] = [
  {
    id: "location",
    question: "Which area are you looking in?",
    label: "Location",
    controlType: "select",
    required: true,
    data: {
      options: [
        { value: "indiranagar", label: "Indiranagar", count: 423 },
        { value: "koramangala", label: "Koramangala", count: 567 },
        { value: "whitefield", label: "Whitefield", count: 789 },
        { value: "hsr_layout", label: "HSR Layout", count: 612 },
        { value: "bellandur", label: "Bellandur", count: 498 },
        { value: "electronic_city", label: "Electronic City", count: 356 },
      ],
    },
    helpText: "Select your preferred location",
  },
  {
    id: "bhk",
    question: "How many bedrooms?",
    label: "Bedrooms (BHK)",
    controlType: "toggle-group",
    required: true,
    data: {
      options: [
        { value: "1", label: "1 BHK", count: 234 },
        { value: "2", label: "2 BHK", count: 567 },
        { value: "3", label: "3 BHK", count: 423 },
        { value: "4", label: "4 BHK", count: 156 },
        { value: "5", label: "5+ BHK", count: 67 },
      ],
    },
  },
  {
    id: "area_sqft",
    question: "What's your preferred carpet area?",
    label: "Carpet Area",
    controlType: "range-slider",
    required: false,
    data: {
      min: 500,
      max: 5000,
      step: 100,
      unit: "sqft",
      defaultValue: [1000, 2000],
      histogram: [
        { range: "500-1000", count: 145, minValue: 500, maxValue: 1000 },
        { range: "1000-1500", count: 267, minValue: 1000, maxValue: 1500 },
        { range: "1500-2000", count: 345, minValue: 1500, maxValue: 2000 },
        { range: "2000-2500", count: 234, minValue: 2000, maxValue: 2500 },
        { range: "2500-3000", count: 156, minValue: 2500, maxValue: 3000 },
        { range: "3000-4000", count: 89, minValue: 3000, maxValue: 4000 },
        { range: "4000-5000", count: 45, minValue: 4000, maxValue: 5000 },
      ],
      marketInsights: "Most properties have carpet areas between 1500-2500 sqft",
    },
  },
];

/**
 * Helper function to get mock questions based on extracted criteria
 */
export function getMockQuestions(extractedCriteria: {
  bhk?: number;
  location?: string;
  property_type?: string;
}): ConversationalQuestion[] {
  // If BHK and location are known, return specific questions
  if (extractedCriteria.bhk === 3 && extractedCriteria.location?.toLowerCase().includes("indiranagar")) {
    return MOCK_QUESTIONS_3BHK_INDIRANAGAR;
  }

  // If property type is villa
  if (extractedCriteria.property_type?.toLowerCase() === "villa") {
    return MOCK_QUESTIONS_VILLA;
  }

  // Default to general questions
  return MOCK_QUESTIONS_GENERAL;
}

/**
 * Mock API response structure
 */
export interface MockLLMResponse {
  extractedCriteria: {
    bhk?: number;
    location?: string;
    property_type?: string;
    req_type?: string;
  };
  missingCriteria: string[];
  questions: ConversationalQuestion[];
  nearbyLocalities?: Array<{ name: string; distance_km: number; count: number }>;
  conversationalMessage: string;
  totalMatches: number;
}

/**
 * Mock LLM responses for different queries
 */
export const MOCK_LLM_RESPONSES: Record<string, MockLLMResponse> = {
  "3bhk_indiranagar": {
    extractedCriteria: {
      bhk: 3,
      location: "Indiranagar",
    },
    missingCriteria: ["req_type", "budget_min", "budget_max", "property_type", "property_status"],
    questions: MOCK_QUESTIONS_3BHK_INDIRANAGAR,
    nearbyLocalities: [
      { name: "Domlur", distance_km: 2.1, count: 89 },
      { name: "Ulsoor", distance_km: 2.8, count: 67 },
      { name: "Koramangala", distance_km: 3.5, count: 234 },
      { name: "HSR Layout", distance_km: 5.2, count: 178 },
    ],
    conversationalMessage: "Great! I found 335 3BHK properties in Indiranagar. Let me ask you a few questions to refine your search.",
    totalMatches: 335,
  },
  "villa": {
    extractedCriteria: {
      property_type: "villa",
    },
    missingCriteria: ["location", "bhk", "budget_min", "budget_max", "req_type"],
    questions: MOCK_QUESTIONS_VILLA,
    nearbyLocalities: [],
    conversationalMessage: "I'll help you find the perfect villa! Let me gather some more details.",
    totalMatches: 0,
  },
};
