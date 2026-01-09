/**
 * Mock Conversational Questions
 * Simulates what the backend/LLM would return for different criteria
 * Each question includes the control type and context-specific data
 */

import type { Listing } from "./mock-listings"

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

export interface Community {
  id: string;
  name: string;
  image_url: string;
  neighborhood: string;
  property_count: number;
  price_range: {
    min_cr: number;
    max_cr: number;
  };
  size_range: {
    min_bhk: number;
    max_bhk: number;
  };
  match_score: number;
  highlights: string[];
}

export interface QuestionData {
  // For histograms/charts
  histogram?: HistogramBin[];
  chartTitle?: string;
  // For select/radio/toggle
  options?: QuestionOption[];

  // For community selection
  communities?: Community[];

  // For taste selection
  properties?: Listing[];

  // For sliders
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number | [number, number];
  unit?: string;

  // For location proximity (Google Maps)
  mapCenter?: { lat: number; lng: number };
  radiusKm?: number;

  // For tag input
  suggestions?: string[];
  placeholder?: string;

  // Additional insights
  marketInsights?: string;
  recommendedValue?: number | [number, number];
}

export interface ConversationalQuestion {
  id: string;
  question: string;
  controlType: "text" | "select" | "multi-select" | "slider" | "range-slider" | "radio" | "toggle-group" | "community-selection" | "location-proximity" | "tags" | "taste-selection";
  data?: QuestionData;
  required: boolean;
  helpText?: string;
  label: string;

}
