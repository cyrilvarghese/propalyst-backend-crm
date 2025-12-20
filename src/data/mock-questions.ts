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
  controlType: "text" | "select" | "multi-select" | "slider" | "range-slider" | "radio" | "toggle-group" | "community-selection" | "location-proximity" | "tags";
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
      chartTitle: "Price Distribution In Crores",
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
  {
    id: "special_requests",
    question: "Any special preferences?",
    label: "Special Requests",
    controlType: "tags",
    required: false,
    data: {
      placeholder: "Type a preference (e.g., north-facing, pet-friendly)",
      suggestions: [
        "north-facing",
        "pet-friendly",
        "new-property",
        "old-property",
        "vastu-compliant",
        "garden",
        "parking",
      ],
      marketInsights: "North-facing and pet-friendly properties are increasingly in demand",
    },
    helpText: "Add any special features or preferences you're looking for",
  },
  {
    id: "proximity_location",
    question: "Is there a work location or important place you want to be near?",
    label: "Proximity Preference",
    controlType: "location-proximity",
    required: false,
    data: {
      options: [
        { value: "my_work", label: "My Work Location", icon: "Briefcase" },
        { value: "spouse_work", label: "Spouse's Work", icon: "Users" },
        { value: "school", label: "School/Childcare", icon: "BookOpen" },
        { value: "parents_home", label: "Parents' Home", icon: "Home" },
        { value: "hospital", label: "Hospital/Medical", icon: "Heart" },
      ],
      mapCenter: { lat: 12.9716, lng: 77.5946 }, // Bangalore center
      radiusKm: 25,
      marketInsights: "Proximity to work reduces commute time significantly",
    },
    helpText: "Select a location type and pin your location on the map to find nearby properties",
  },
  {
    id: "community_preference",
    question: "Here are the gated communities matching your search",
    label: "Community Selection",
    controlType: "community-selection",
    required: false,
    data: {
      communities: [
        // Indiranagar (5 listings)
        {
          id: "brigade_metropolis_ind",
          name: "Brigade Metropolis",
          image_url: "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          neighborhood: "Indiranagar",
          property_count: 45,
          price_range: { min_cr: 2.1, max_cr: 3.2 },
          size_range: { min_bhk: 3, max_bhk: 4 },
          match_score: 95,
          highlights: ["Within budget", "3BHK available", "Premium amenities"],
        },
        {
          id: "sobha_indraprastha_ind",
          name: "Sobha Indraprastha",
          image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          neighborhood: "Indiranagar",
          property_count: 28,
          price_range: { min_cr: 1.8, max_cr: 2.5 },
          size_range: { min_bhk: 2, max_bhk: 3 },
          match_score: 85,
          highlights: ["Central location", "Good connectivity"],
        },
        {
          id: "prestige_shantiniketan_ind",
          name: "Prestige Shantiniketan",
          image_url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          neighborhood: "Indiranagar",
          property_count: 67,
          price_range: { min_cr: 2.5, max_cr: 4.1 },
          size_range: { min_bhk: 3, max_bhk: 4 },
          match_score: 92,
          highlights: ["Luxury living", "High-end features"],
        },
        {
          id: "puravankara_ind",
          name: "Puravankara Indiranagar",
          image_url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          neighborhood: "Indiranagar",
          property_count: 38,
          price_range: { min_cr: 2.0, max_cr: 2.9 },
          size_range: { min_bhk: 3, max_bhk: 4 },
          match_score: 90,
          highlights: ["Central location", "Modern architecture"],
        },
        {
          id: "lodha_ind",
          name: "Lodha Residences",
          image_url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          neighborhood: "Indiranagar",
          property_count: 52,
          price_range: { min_cr: 2.2, max_cr: 3.5 },
          size_range: { min_bhk: 3, max_bhk: 4 },
          match_score: 88,
          highlights: ["Spacious units", "Green spaces"],
        },
        // Ulsoor (5 listings)
        {
          id: "prestige_ozone_ulsoor",
          name: "Prestige Meridian",
          image_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          neighborhood: "Ulsoor",
          property_count: 89,
          price_range: { min_cr: 2.0, max_cr: 3.5 },
          size_range: { min_bhk: 3, max_bhk: 4 },
          match_score: 88,
          highlights: ["More options", "Vibrant locality"],
        },
        {
          id: "godrej_central_ulsoor",
          name: "Godrej Hillside",
          image_url: "https://images.unsplash.com/photo-1628592102751-ba83b0314276?q=80&w=1397&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          neighborhood: "Ulsoor",
          property_count: 43,
          price_range: { min_cr: 2.3, max_cr: 3.8 },
          size_range: { min_bhk: 3, max_bhk: 4 },
          match_score: 86,
          highlights: ["IT hub proximity", "Modern amenities"],
        },
        {
          id: "brigade_oasis_ulsoor",
          name: "Brigade Cornerstone",
          image_url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          neighborhood: "Ulsoor",
          property_count: 56,
          price_range: { min_cr: 1.9, max_cr: 2.8 },
          size_range: { min_bhk: 2, max_bhk: 3 },
          match_score: 83,
          highlights: ["Budget-friendly", "Good connectivity"],
        },
        {
          id: "sobha_premium_ulsoor",
          name: "Sobha Urbania",
          image_url: "https://images.unsplash.com/photo-1556020685-ae41abfc9365?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          neighborhood: "Ulsoor",
          property_count: 31,
          price_range: { min_cr: 2.4, max_cr: 3.9 },
          size_range: { min_bhk: 3, max_bhk: 4 },
          match_score: 87,
          highlights: ["Premium location", "Walkable area"],
        },
        {
          id: "lodha_central_ulsoor",
          name: "Lodha Eternia",
          image_url: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          neighborhood: "Ulsoor",
          property_count: 48,
          price_range: { min_cr: 2.1, max_cr: 3.2 },
          size_range: { min_bhk: 3, max_bhk: 4 },
          match_score: 85,
          highlights: ["Central location", "Shopping nearby"],
        },
        // Domlur (5 listings)
        {
          id: "sobha_city_dom",
          name: "Sobha City",
          image_url: "https://images.unsplash.com/photo-1613575831056-0acd5da8f085?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          neighborhood: "Domlur",
          property_count: 34,
          price_range: { min_cr: 1.6, max_cr: 2.3 },
          size_range: { min_bhk: 2, max_bhk: 3 },
          match_score: 82,
          highlights: ["Nearby location", "Best value"],
        },
        {
          id: "prestige_central_dom",
          name: "Prestige Central",
          image_url: "https://images.unsplash.com/photo-1499916078039-922301b0eb9b?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          neighborhood: "Domlur",
          property_count: 52,
          price_range: { min_cr: 2.2, max_cr: 3.4 },
          size_range: { min_bhk: 3, max_bhk: 4 },
          match_score: 84,
          highlights: ["Great connectivity", "Shopping mall nearby"],
        },
        {
          id: "godrej_escape_dom",
          name: "Godrej Escape",
          image_url: "https://images.unsplash.com/photo-1612320648993-61c1cd604b71?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          neighborhood: "Domlur",
          property_count: 38,
          price_range: { min_cr: 1.9, max_cr: 2.9 },
          size_range: { min_bhk: 2, max_bhk: 3 },
          match_score: 81,
          highlights: ["Nature close by", "Affordable"],
        },
        {
          id: "brigade_residences_dom",
          name: "Brigade Residences",
          image_url: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=1084&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          neighborhood: "Domlur",
          property_count: 44,
          price_range: { min_cr: 2.0, max_cr: 3.0 },
          size_range: { min_bhk: 3, max_bhk: 4 },
          match_score: 83,
          highlights: ["Gated community", "24/7 security"],
        },
        {
          id: "lodha_residences_dom",
          name: "Lodha Residences",
          image_url: "https://images.unsplash.com/photo-1580041065738-e72023775cdc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          neighborhood: "Domlur",
          property_count: 41,
          price_range: { min_cr: 2.1, max_cr: 3.3 },
          size_range: { min_bhk: 3, max_bhk: 4 },
          match_score: 82,
          highlights: ["Spacious layout", "Green spaces"],
        },
        // Jeevan Bhiomagar (5 listings)
        {
          id: "prestige_jeevan",
          name: "Prestige Heights",
          image_url: "https://images.unsplash.com/photo-1525438160292-a4a860951216?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          neighborhood: "Jeevan Bhiomagar",
          property_count: 39,
          price_range: { min_cr: 1.8, max_cr: 2.7 },
          size_range: { min_bhk: 2, max_bhk: 3 },
          match_score: 80,
          highlights: ["Premium amenities", "Good schools"],
        },
        {
          id: "sobha_jeevan",
          name: "Sobha Elegance",
          image_url: "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          neighborhood: "Jeevan Bhiomagar",
          property_count: 36,
          price_range: { min_cr: 2.0, max_cr: 2.8 },
          size_range: { min_bhk: 3, max_bhk: 3 },
          match_score: 81,
          highlights: ["Modern design", "Family friendly"],
        },
        {
          id: "godrej_jeevan",
          name: "Godrej Residences",
          image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          neighborhood: "Jeevan Bhiomagar",
          property_count: 33,
          price_range: { min_cr: 1.7, max_cr: 2.6 },
          size_range: { min_bhk: 2, max_bhk: 3 },
          match_score: 79,
          highlights: ["Value for money", "Good connectivity"],
        },
        {
          id: "lodha_jeevan",
          name: "Lodha Elegance",
          image_url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          neighborhood: "Jeevan Bhiomagar",
          property_count: 42,
          price_range: { min_cr: 1.9, max_cr: 2.9 },
          size_range: { min_bhk: 3, max_bhk: 4 },
          match_score: 82,
          highlights: ["Spacious units", "Green environment"],
        },
        {
          id: "brigade_jeevan",
          name: "Brigade Signature",
          image_url: "https://images.unsplash.com/photo-1595262493050-5b0f29ccf4b1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          neighborhood: "Jeevan Bhiomagar",
          property_count: 37,
          price_range: { min_cr: 2.0, max_cr: 3.0 },
          size_range: { min_bhk: 3, max_bhk: 4 },
          match_score: 81,
          highlights: ["Luxury living", "Premium features"],
        },
        // Kodihalli (5 listings)
        {
          id: "prestige_kodihalli",
          name: "Prestige Signature",
          image_url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          neighborhood: "Kodihalli",
          property_count: 51,
          price_range: { min_cr: 1.7, max_cr: 2.6 },
          size_range: { min_bhk: 2, max_bhk: 3 },
          match_score: 81,
          highlights: ["Great value", "Established area"],
        },
        {
          id: "sobha_kodihalli",
          name: "Sobha Kodihalli",
          image_url: "https://images.unsplash.com/photo-1542309175-9b88d743f89f?q=80&w=679&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          neighborhood: "Kodihalli",
          property_count: 46,
          price_range: { min_cr: 1.8, max_cr: 2.7 },
          size_range: { min_bhk: 3, max_bhk: 3 },
          match_score: 83,
          highlights: ["Family friendly", "Well-connected"],
        },
        {
          id: "godrej_kodihalli",
          name: "Godrej Enclave",
          image_url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          neighborhood: "Kodihalli",
          property_count: 40,
          price_range: { min_cr: 1.6, max_cr: 2.5 },
          size_range: { min_bhk: 2, max_bhk: 3 },
          match_score: 80,
          highlights: ["Affordable", "Good market"],
        },
        {
          id: "lodha_kodihalli",
          name: "Lodha Kodihalli",
          image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          neighborhood: "Kodihalli",
          property_count: 47,
          price_range: { min_cr: 1.9, max_cr: 2.8 },
          size_range: { min_bhk: 3, max_bhk: 4 },
          match_score: 82,
          highlights: ["Spacious apartments", "Green spaces"],
        },
        {
          id: "brigade_kodihalli",
          name: "Brigade Central",
          image_url: "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          neighborhood: "Kodihalli",
          property_count: 43,
          price_range: { min_cr: 1.8, max_cr: 2.7 },
          size_range: { min_bhk: 3, max_bhk: 4 },
          match_score: 81,
          highlights: ["24/7 security", "Quality living"],
        },
      ],
      marketInsights: "Most buyers in your budget choose communities in the ₹2-3Cr range with 3BHK units",
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
    id: "bedroom_count",
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
      chartTitle: "Area Sizes in Sq Feet",
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
  {
    id: "proximity_location",
    question: "Is there a work location or important place you want to be near?",
    label: "Proximity Preference",
    controlType: "location-proximity",
    required: false,
    data: {
      options: [
        { value: "my_work", label: "My Work Location", icon: "Briefcase" },
        { value: "spouse_work", label: "Spouse's Work", icon: "Users" },
        { value: "school", label: "School/Childcare", icon: "BookOpen" },
        { value: "parents_home", label: "Parents' Home", icon: "Home" },
        { value: "hospital", label: "Hospital/Medical", icon: "Heart" },
      ],
      mapCenter: { lat: 12.9716, lng: 77.5946 }, // Bangalore center
      radiusKm: 35,
      marketInsights: "Villas near major IT parks and business districts are in high demand",
    },
    helpText: "Select a location type and pin your location on the map to find nearby villas",
  },
  {
    id: "community_preference",
    question: "Here are some villa communities matching your search",
    label: "Community Selection",
    controlType: "community-selection",
    required: false,
    data: {
      communities: [
        // Whitefield (5 listings)
        {
          id: "prestige_whitefield_1",
          name: "Prestige Gated Community",
          image_url: "https://picsum.photos/400/300?random=26",
          neighborhood: "Whitefield",
          property_count: 31,
          price_range: { min_cr: 3.0, max_cr: 6.0 },
          size_range: { min_bhk: 3, max_bhk: 4 },
          match_score: 82,
          highlights: ["IT hub proximity", "Good connectivity"],
        },
        {
          id: "lodha_whitefield",
          name: "Lodha Premium Villas",
          image_url: "https://picsum.photos/400/300?random=27",
          neighborhood: "Whitefield",
          property_count: 28,
          price_range: { min_cr: 3.5, max_cr: 6.5 },
          size_range: { min_bhk: 4, max_bhk: 5 },
          match_score: 85,
          highlights: ["Large plots", "Modern architecture"],
        },
        {
          id: "godrej_whitefield",
          name: "Godrej Elite",
          image_url: "https://picsum.photos/400/300?random=28",
          neighborhood: "Whitefield",
          property_count: 22,
          price_range: { min_cr: 3.2, max_cr: 5.8 },
          size_range: { min_bhk: 3, max_bhk: 4 },
          match_score: 80,
          highlights: ["Established area", "Family-friendly"],
        },
        {
          id: "brigade_whitefield",
          name: "Brigade Orchards",
          image_url: "https://picsum.photos/400/300?random=29",
          neighborhood: "Whitefield",
          property_count: 35,
          price_range: { min_cr: 3.3, max_cr: 6.2 },
          size_range: { min_bhk: 3, max_bhk: 4 },
          match_score: 83,
          highlights: ["Spacious layouts", "Green spaces"],
        },
        {
          id: "sobha_whitefield",
          name: "Sobha Premium Villas",
          image_url: "https://picsum.photos/400/300?random=30",
          neighborhood: "Whitefield",
          property_count: 26,
          price_range: { min_cr: 3.6, max_cr: 6.8 },
          size_range: { min_bhk: 4, max_bhk: 5 },
          match_score: 86,
          highlights: ["Premium finishes", "Natural surroundings"],
        },
        // Bellandur (5 listings)
        {
          id: "prestige_bellandur",
          name: "Prestige Villas",
          image_url: "https://picsum.photos/400/300?random=31",
          neighborhood: "Bellandur",
          property_count: 33,
          price_range: { min_cr: 3.8, max_cr: 7.2 },
          size_range: { min_bhk: 4, max_bhk: 5 },
          match_score: 87,
          highlights: ["Premium location", "Luxury amenities"],
        },
        {
          id: "lodha_bellandur",
          name: "Lodha Bellandur",
          image_url: "https://picsum.photos/400/300?random=32",
          neighborhood: "Bellandur",
          property_count: 27,
          price_range: { min_cr: 3.5, max_cr: 6.5 },
          size_range: { min_bhk: 3, max_bhk: 4 },
          match_score: 84,
          highlights: ["IT corridor", "Modern design"],
        },
        {
          id: "godrej_bellandur",
          name: "Godrej Retreat",
          image_url: "https://picsum.photos/400/300?random=33",
          neighborhood: "Bellandur",
          property_count: 30,
          price_range: { min_cr: 3.2, max_cr: 6.0 },
          size_range: { min_bhk: 3, max_bhk: 4 },
          match_score: 81,
          highlights: ["Nature close by", "Good value"],
        },
        {
          id: "brigade_bellandur",
          name: "Brigade Signature",
          image_url: "https://picsum.photos/400/300?random=34",
          neighborhood: "Bellandur",
          property_count: 38,
          price_range: { min_cr: 3.4, max_cr: 6.4 },
          size_range: { min_bhk: 4, max_bhk: 5 },
          match_score: 85,
          highlights: ["24/7 security", "Premium amenities"],
        },
        {
          id: "sobha_bellandur",
          name: "Sobha Elite",
          image_url: "https://picsum.photos/400/300?random=35",
          neighborhood: "Bellandur",
          property_count: 25,
          price_range: { min_cr: 3.9, max_cr: 7.5 },
          size_range: { min_bhk: 4, max_bhk: 5 },
          match_score: 88,
          highlights: ["Resort living", "Exclusive community"],
        },
        // HSR Layout (5 listings)
        {
          id: "prestige_hsr_villas",
          name: "Prestige HSR Villas",
          image_url: "https://picsum.photos/400/300?random=36",
          neighborhood: "HSR Layout",
          property_count: 24,
          price_range: { min_cr: 3.0, max_cr: 5.5 },
          size_range: { min_bhk: 3, max_bhk: 4 },
          match_score: 82,
          highlights: ["Family-friendly", "Established area"],
        },
        {
          id: "lodha_hsr_villas",
          name: "Lodha HSR Villas",
          image_url: "https://picsum.photos/400/300?random=37",
          neighborhood: "HSR Layout",
          property_count: 29,
          price_range: { min_cr: 3.2, max_cr: 5.8 },
          size_range: { min_bhk: 3, max_bhk: 4 },
          match_score: 83,
          highlights: ["Well-connected", "Good schools"],
        },
        {
          id: "godrej_hsr_villas",
          name: "Godrej HSR Escape",
          image_url: "https://picsum.photos/400/300?random=38",
          neighborhood: "HSR Layout",
          property_count: 20,
          price_range: { min_cr: 2.9, max_cr: 5.2 },
          size_range: { min_bhk: 3, max_bhk: 4 },
          match_score: 79,
          highlights: ["Affordable", "Quality living"],
        },
        {
          id: "brigade_hsr_villas",
          name: "Brigade HSR Premium",
          image_url: "https://picsum.photos/400/300?random=39",
          neighborhood: "HSR Layout",
          property_count: 32,
          price_range: { min_cr: 3.1, max_cr: 5.7 },
          size_range: { min_bhk: 3, max_bhk: 4 },
          match_score: 82,
          highlights: ["Gated community", "Premium finishes"],
        },
        {
          id: "sobha_hsr_villas",
          name: "Sobha HSR Premium",
          image_url: "https://picsum.photos/400/300?random=40",
          neighborhood: "HSR Layout",
          property_count: 23,
          price_range: { min_cr: 3.3, max_cr: 6.0 },
          size_range: { min_bhk: 4, max_bhk: 4 },
          match_score: 84,
          highlights: ["Contemporary design", "Green spaces"],
        },
        // Kannur (5 listings)
        {
          id: "prestige_kannur_villas",
          name: "Prestige Kannur",
          image_url: "https://picsum.photos/400/300?random=41",
          neighborhood: "Kannur",
          property_count: 19,
          price_range: { min_cr: 3.0, max_cr: 5.5 },
          size_range: { min_bhk: 3, max_bhk: 4 },
          match_score: 78,
          highlights: ["Serene locality", "Good value"],
        },
        {
          id: "lodha_kannur_villas",
          name: "Lodha Kannur",
          image_url: "https://picsum.photos/400/300?random=42",
          neighborhood: "Kannur",
          property_count: 22,
          price_range: { min_cr: 3.2, max_cr: 5.8 },
          size_range: { min_bhk: 3, max_bhk: 4 },
          match_score: 80,
          highlights: ["Quiet area", "Large plots"],
        },
        {
          id: "godrej_kannur",
          name: "Godrej Kannur",
          image_url: "https://picsum.photos/400/300?random=43",
          neighborhood: "Kannur",
          property_count: 17,
          price_range: { min_cr: 2.8, max_cr: 5.0 },
          size_range: { min_bhk: 3, max_bhk: 4 },
          match_score: 76,
          highlights: ["Budget-friendly", "Natural environment"],
        },
        {
          id: "brigade_kannur",
          name: "Brigade Kannur Estate",
          image_url: "https://picsum.photos/400/300?random=44",
          neighborhood: "Kannur",
          property_count: 26,
          price_range: { min_cr: 3.1, max_cr: 5.6 },
          size_range: { min_bhk: 3, max_bhk: 4 },
          match_score: 79,
          highlights: ["Spacious villas", "Community living"],
        },
        {
          id: "sobha_kannur",
          name: "Sobha Kannur Villas",
          image_url: "https://picsum.photos/400/300?random=45",
          neighborhood: "Kannur",
          property_count: 21,
          price_range: { min_cr: 3.3, max_cr: 5.9 },
          size_range: { min_bhk: 4, max_bhk: 4 },
          match_score: 81,
          highlights: ["Premium villas", "Green spaces"],
        },
        // Electronic City (5 listings)
        {
          id: "prestige_ecity",
          name: "Prestige Electronic City",
          image_url: "https://picsum.photos/400/300?random=46",
          neighborhood: "Electronic City",
          property_count: 29,
          price_range: { min_cr: 3.2, max_cr: 5.8 },
          size_range: { min_bhk: 3, max_bhk: 4 },
          match_score: 81,
          highlights: ["IT hub", "Good connectivity"],
        },
        {
          id: "lodha_ecity",
          name: "Lodha Electronic City",
          image_url: "https://picsum.photos/400/300?random=47",
          neighborhood: "Electronic City",
          property_count: 25,
          price_range: { min_cr: 3.4, max_cr: 6.2 },
          size_range: { min_bhk: 3, max_bhk: 4 },
          match_score: 83,
          highlights: ["Modern design", "Premium amenities"],
        },
        {
          id: "godrej_ecity",
          name: "Godrej Electronic City",
          image_url: "https://picsum.photos/400/300?random=48",
          neighborhood: "Electronic City",
          property_count: 31,
          price_range: { min_cr: 3.0, max_cr: 5.5 },
          size_range: { min_bhk: 3, max_bhk: 4 },
          match_score: 80,
          highlights: ["Established area", "Family-friendly"],
        },
        {
          id: "brigade_ecity",
          name: "Brigade Electronic City",
          image_url: "https://picsum.photos/400/300?random=49",
          neighborhood: "Electronic City",
          property_count: 34,
          price_range: { min_cr: 3.1, max_cr: 5.7 },
          size_range: { min_bhk: 4, max_bhk: 5 },
          match_score: 82,
          highlights: ["24/7 security", "Luxury living"],
        },
        {
          id: "sobha_ecity",
          name: "Sobha Electronic City",
          image_url: "https://picsum.photos/400/300?random=50",
          neighborhood: "Electronic City",
          property_count: 27,
          price_range: { min_cr: 3.5, max_cr: 6.3 },
          size_range: { min_bhk: 4, max_bhk: 5 },
          match_score: 84,
          highlights: ["Premium villas", "Resort-style"],
        },
      ],
      marketInsights: "Luxury villa buyers typically choose communities with 4+ BHK and modern amenities",
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
    id: "bedroom_count",
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
  {
    id: "community_preference",
    question: "Here are some communities matching your search",
    label: "Community Selection",
    controlType: "community-selection",
    required: false,
    data: {
      communities: [
        // Indiranagar (5 listings)
        {
          id: "prestige_indiranagar_gen",
          name: "Prestige Central",
          image_url: "https://picsum.photos/400/300?random=51",
          neighborhood: "Indiranagar",
          property_count: 56,
          price_range: { min_cr: 1.5, max_cr: 3.0 },
          size_range: { min_bhk: 1, max_bhk: 4 },
          match_score: 92,
          highlights: ["Central location", "All sizes", "Good connectivity"],
        },
        {
          id: "sobha_indiranagar_gen",
          name: "Sobha Premium",
          image_url: "https://picsum.photos/400/300?random=52",
          neighborhood: "Indiranagar",
          property_count: 67,
          price_range: { min_cr: 1.2, max_cr: 2.8 },
          size_range: { min_bhk: 1, max_bhk: 3 },
          match_score: 88,
          highlights: ["Family friendly", "Modern amenities"],
        },
        {
          id: "lodha_indiranagar_gen",
          name: "Lodha Central",
          image_url: "https://picsum.photos/400/300?random=53",
          neighborhood: "Indiranagar",
          property_count: 73,
          price_range: { min_cr: 1.3, max_cr: 2.9 },
          size_range: { min_bhk: 1, max_bhk: 4 },
          match_score: 90,
          highlights: ["Premium layouts", "Excellent services"],
        },
        {
          id: "godrej_indiranagar_gen",
          name: "Godrej Central",
          image_url: "https://picsum.photos/400/300?random=54",
          neighborhood: "Indiranagar",
          property_count: 45,
          price_range: { min_cr: 1.4, max_cr: 3.1 },
          size_range: { min_bhk: 2, max_bhk: 3 },
          match_score: 87,
          highlights: ["Strategic location", "Sustainable living"],
        },
        {
          id: "brigade_indiranagar_gen",
          name: "Brigade Central",
          image_url: "https://picsum.photos/400/300?random=55",
          neighborhood: "Indiranagar",
          property_count: 82,
          price_range: { min_cr: 1.1, max_cr: 2.6 },
          size_range: { min_bhk: 1, max_bhk: 3 },
          match_score: 86,
          highlights: ["Best prices", "Popular choice"],
        },
        // Koramangala (5 listings)
        {
          id: "prestige_koramangala",
          name: "Prestige Koramangala",
          image_url: "https://picsum.photos/400/300?random=56",
          neighborhood: "Koramangala",
          property_count: 48,
          price_range: { min_cr: 1.6, max_cr: 3.2 },
          size_range: { min_bhk: 1, max_bhk: 3 },
          match_score: 89,
          highlights: ["Vibrant area", "Walkable", "Restaurants nearby"],
        },
        {
          id: "sobha_koramangala",
          name: "Sobha Koramangala",
          image_url: "https://picsum.photos/400/300?random=57",
          neighborhood: "Koramangala",
          property_count: 54,
          price_range: { min_cr: 1.4, max_cr: 2.9 },
          size_range: { min_bhk: 1, max_bhk: 3 },
          match_score: 86,
          highlights: ["Young professionals", "IT hub nearby"],
        },
        {
          id: "lodha_koramangala_gen",
          name: "Lodha Koramangala",
          image_url: "https://picsum.photos/400/300?random=58",
          neighborhood: "Koramangala",
          property_count: 38,
          price_range: { min_cr: 1.6, max_cr: 3.2 },
          size_range: { min_bhk: 1, max_bhk: 3 },
          match_score: 80,
          highlights: ["Vibrant neighborhood", "Shopping mall"],
        },
        {
          id: "godrej_koramangala",
          name: "Godrej Koramangala",
          image_url: "https://picsum.photos/400/300?random=59",
          neighborhood: "Koramangala",
          property_count: 42,
          price_range: { min_cr: 1.5, max_cr: 3.0 },
          size_range: { min_bhk: 1, max_bhk: 2 },
          match_score: 84,
          highlights: ["Trendy location", "Good value"],
        },
        {
          id: "brigade_koramangala",
          name: "Brigade Koramangala",
          image_url: "https://picsum.photos/400/300?random=60",
          neighborhood: "Koramangala",
          property_count: 35,
          price_range: { min_cr: 1.3, max_cr: 2.8 },
          size_range: { min_bhk: 1, max_bhk: 2 },
          match_score: 82,
          highlights: ["Budget-friendly", "Great connectivity"],
        },
        // Whitefield (5 listings)
        {
          id: "prestige_whitefield_gen",
          name: "Prestige Whitefield",
          image_url: "https://picsum.photos/400/300?random=61",
          neighborhood: "Whitefield",
          property_count: 76,
          price_range: { min_cr: 1.2, max_cr: 2.7 },
          size_range: { min_bhk: 1, max_bhk: 3 },
          match_score: 83,
          highlights: ["IT corridor", "Growing area"],
        },
        {
          id: "sobha_whitefield_gen",
          name: "Sobha Whitefield",
          image_url: "https://picsum.photos/400/300?random=62",
          neighborhood: "Whitefield",
          property_count: 61,
          price_range: { min_cr: 1.1, max_cr: 2.6 },
          size_range: { min_bhk: 1, max_bhk: 3 },
          match_score: 81,
          highlights: ["Tech hub", "Good amenities"],
        },
        {
          id: "lodha_whitefield_gen",
          name: "Lodha Whitefield",
          image_url: "https://picsum.photos/400/300?random=63",
          neighborhood: "Whitefield",
          property_count: 52,
          price_range: { min_cr: 1.3, max_cr: 2.8 },
          size_range: { min_bhk: 1, max_bhk: 2 },
          match_score: 79,
          highlights: ["New development", "Modern design"],
        },
        {
          id: "godrej_whitefield",
          name: "Godrej Whitefield",
          image_url: "https://picsum.photos/400/300?random=64",
          neighborhood: "Whitefield",
          property_count: 44,
          price_range: { min_cr: 1.0, max_cr: 2.5 },
          size_range: { min_bhk: 1, max_bhk: 2 },
          match_score: 77,
          highlights: ["Affordable", "Easy access to IT companies"],
        },
        {
          id: "brigade_whitefield",
          name: "Brigade Whitefield",
          image_url: "https://picsum.photos/400/300?random=65",
          neighborhood: "Whitefield",
          property_count: 58,
          price_range: { min_cr: 1.2, max_cr: 2.7 },
          size_range: { min_bhk: 1, max_bhk: 3 },
          match_score: 80,
          highlights: ["Strategic location", "Good connectivity"],
        },
        // HSR Layout (5 listings)
        {
          id: "prestige_hsr_gen",
          name: "Prestige HSR",
          image_url: "https://picsum.photos/400/300?random=66",
          neighborhood: "HSR Layout",
          property_count: 51,
          price_range: { min_cr: 1.3, max_cr: 2.6 },
          size_range: { min_bhk: 2, max_bhk: 3 },
          match_score: 84,
          highlights: ["Family community", "Good schools"],
        },
        {
          id: "sobha_hsr_gen",
          name: "Sobha HSR",
          image_url: "https://picsum.photos/400/300?random=67",
          neighborhood: "HSR Layout",
          property_count: 63,
          price_range: { min_cr: 1.2, max_cr: 2.5 },
          size_range: { min_bhk: 1, max_bhk: 3 },
          match_score: 85,
          highlights: ["Established area", "Parks nearby"],
        },
        {
          id: "lodha_hsr_gen",
          name: "Lodha HSR",
          image_url: "https://picsum.photos/400/300?random=68",
          neighborhood: "HSR Layout",
          property_count: 47,
          price_range: { min_cr: 1.1, max_cr: 2.4 },
          size_range: { min_bhk: 1, max_bhk: 2 },
          match_score: 81,
          highlights: ["Well-connected", "Community living"],
        },
        {
          id: "godrej_hsr_gen",
          name: "Godrej HSR",
          image_url: "https://picsum.photos/400/300?random=69",
          neighborhood: "HSR Layout",
          property_count: 40,
          price_range: { min_cr: 1.0, max_cr: 2.3 },
          size_range: { min_bhk: 1, max_bhk: 2 },
          match_score: 80,
          highlights: ["Budget-friendly", "Family area"],
        },
        {
          id: "brigade_hsr_gen",
          name: "Brigade HSR",
          image_url: "https://picsum.photos/400/300?random=70",
          neighborhood: "HSR Layout",
          property_count: 55,
          price_range: { min_cr: 1.2, max_cr: 2.5 },
          size_range: { min_bhk: 1, max_bhk: 3 },
          match_score: 82,
          highlights: ["24/7 security", "Quality living"],
        },
        // Bellandur (5 listings)
        {
          id: "prestige_bellandur_gen",
          name: "Prestige Bellandur",
          image_url: "https://picsum.photos/400/300?random=71",
          neighborhood: "Bellandur",
          property_count: 64,
          price_range: { min_cr: 1.15, max_cr: 2.65 },
          size_range: { min_bhk: 1, max_bhk: 3 },
          match_score: 82,
          highlights: ["IT hub", "Modern infrastructure"],
        },
        {
          id: "sobha_bellandur_gen",
          name: "Sobha Bellandur",
          image_url: "https://picsum.photos/400/300?random=72",
          neighborhood: "Bellandur",
          property_count: 57,
          price_range: { min_cr: 1.2, max_cr: 2.7 },
          size_range: { min_bhk: 1, max_bhk: 3 },
          match_score: 83,
          highlights: ["Tech professionals", "Good value"],
        },
        {
          id: "lodha_bellandur_gen",
          name: "Lodha Bellandur",
          image_url: "https://picsum.photos/400/300?random=73",
          neighborhood: "Bellandur",
          property_count: 49,
          price_range: { min_cr: 1.3, max_cr: 2.8 },
          size_range: { min_bhk: 2, max_bhk: 3 },
          match_score: 84,
          highlights: ["Lake nearby", "Premium amenities"],
        },
        {
          id: "godrej_bellandur_gen",
          name: "Godrej Bellandur",
          image_url: "https://picsum.photos/400/300?random=74",
          neighborhood: "Bellandur",
          property_count: 52,
          price_range: { min_cr: 1.0, max_cr: 2.4 },
          size_range: { min_bhk: 1, max_bhk: 2 },
          match_score: 79,
          highlights: ["Affordable options", "Developing area"],
        },
        {
          id: "brigade_bellandur_gen",
          name: "Brigade Bellandur",
          image_url: "https://picsum.photos/400/300?random=75",
          neighborhood: "Bellandur",
          property_count: 58,
          price_range: { min_cr: 1.1, max_cr: 2.6 },
          size_range: { min_bhk: 1, max_bhk: 3 },
          match_score: 81,
          highlights: ["Strategic location", "Good connectivity"],
        },
      ],
      marketInsights: "Popular communities in your search criteria offer diverse options across all budgets",
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
    bedroom_count?: number;
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
      bedroom_count: 3,
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

/**
 * API Response for Listing Results
 */
export interface ListingMatch {
  id: string;
  name: string;
  neighborhood: string;
  price: string;
  bhk: number;
  image_url: string;
  match_percentage: number;
  highlights: string[];
}

export interface ListingSearchResponse {
  hasListing: boolean;
  matching_listings: ListingMatch[];
  total_count: number;
  message: string;
}

/**
 * Mock API Responses for different search scenarios
 */
export const MOCK_LISTING_RESPONSES: Record<string, ListingSearchResponse> = {
  "3bhk_indiranagar_buy": {
    hasListing: true,
    matching_listings: [
      {
        id: "listing_001",
        name: "Brigade Metropolis - 3BHK",
        neighborhood: "Indiranagar",
        price: "₹2.5 Cr",
        bhk: 3,
        image_url: "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1170&auto=format&fit=crop",
        match_percentage: 95,
        highlights: ["Within budget", "Ready to move", "Premium amenities"],
      },
      {
        id: "listing_002",
        name: "Sobha Indraprastha - 3BHK",
        neighborhood: "Indiranagar",
        price: "₹2.2 Cr",
        bhk: 3,
        image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1170&auto=format&fit=crop",
        match_percentage: 92,
        highlights: ["Central location", "Good connectivity", "Pet-friendly"],
      },
      {
        id: "listing_003",
        name: "Prestige Shantiniketan - 3BHK",
        neighborhood: "Indiranagar",
        price: "₹2.8 Cr",
        bhk: 3,
        image_url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=735&auto=format&fit=crop",
        match_percentage: 88,
        highlights: ["Luxury living", "High-end features", "Green spaces"],
      },
    ],
    total_count: 45,
    message: "Found 45 properties matching your criteria",
  },
  "villa_search": {
    hasListing: false,
    matching_listings: [],
    total_count: 0,
    message: "Thanks for sharing your villa preferences! We've curated a list and will get back to you within 24 hours with exclusive options.",
  },
  "no_listing": {
    hasListing: false,
    matching_listings: [],
    total_count: 0,
    message: "No listings currently match your criteria. We'll notify you when new properties arrive.",
  },
};

/**
 * Mock function to simulate API call for listings
 */
export async function fetchListingMatches(criteria: Record<string, any>): Promise<ListingSearchResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Determine which mock response to return based on criteria
  if (criteria.bhk === 3 && criteria.location?.toLowerCase().includes("indiranagar")) {
    return MOCK_LISTING_RESPONSES["3bhk_indiranagar_buy"];
  }

  if (criteria.property_type?.toLowerCase() === "villa") {
    return MOCK_LISTING_RESPONSES["villa_search"];
  }

  // Default: return listings response
  return MOCK_LISTING_RESPONSES["3bhk_indiranagar_buy"];
}
