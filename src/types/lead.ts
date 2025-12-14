// Lead and property-related types based on the API response

export interface PropertyCriteria {
  bhk: number | null;
  budget_min: number | null;
  budget_max: number | null;
  area_sqft_min: number | null;
  area_sqft_max: number | null;
  property_type: string | null;
  property_age: string | null;
  location: string;
  req_type: "demand_buy" | "demand_rent" | "supply_sale" | "supply_rent";
  locations: string[];
  plot_size_min: number | null;
  plot_size_max: number | null;
  built_up_area_min: number | null;
  built_up_area_max: number | null;
  property_status: string | null;
  furnishing_status: "furnished" | "semi_furnished" | "unfurnished" | null;
  special_features: string[];
}

export interface ProximityCriteria {
  near_school: boolean;
  near_airport: boolean;
  near_hospital: boolean;
  near_shopping_mall: boolean;
}

export interface UserJourney {
  possession_timeline: string | null;
  time_in_market: string | null;
  agents_contacted: number | null;
  work_locations: string[];
}

export interface ExtractedCriteria {
  property: PropertyCriteria;
  proximity: ProximityCriteria;
  user_journey: UserJourney;
}

export interface LLMJson {
  split_index: number | null;
  message_type: "supply_sale" | "supply_rent" | "demand_buy" | "demand_rent";
  split_from_original: boolean;
}

export interface MatchedProperty {
  id: string;
  source_message_id: string | null;
  message_date: string; // ISO 8601 date string
  agent_contact: string | null;
  agent_name: string | null;
  company_name: string | null;
  raw_message: string;
  message_type: "supply_sale" | "supply_rent" | "demand_buy" | "demand_rent";
  property_type: string;
  area_sqft: number;
  bedroom_count: number;
  price: number;
  price_text: string;
  location: string;
  project_name: string | null;
  furnishing_status: "furnished" | "semi_furnished" | "unfurnished" | null;
  parking_count: number | null;
  parking_text: string | null;
  facing_direction: string | null;
  special_features: string[];
  llm_json: LLMJson;
  created_at: string; // ISO 8601 date string
  sender_name: string;
}

export interface NearbyLocality {
  name: string;
  distance_km: number;
}

export interface LeadResponse {
  lead_id: string;
  id?: string; // Added for consistency across the app
  query: string;
  extracted_criteria: ExtractedCriteria;
  missing_criteria: string[];
  matched_properties: MatchedProperty[];
  nearby_localities: NearbyLocality[];
  created_at: string; // ISO 8601 date string
  updated_at?: string; // ISO 8601 date string, optional
}

// Request type for creating a new lead
export interface CreateLeadRequest {
  query: string;
  [key: string]: any; // Allow for additional fields
}
