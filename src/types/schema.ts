export type MessageType = 'supply_sale' | 'supply_rent' | 'demand_buy' | 'demand_rent';
export type PropertyType = 'apartment' | 'villa' | 'plot' | 'office' | 'independent_house';
export type ListingStatus = 'available' | 'sold' | 'inactive';
export type RequirementStatus = 'active' | 'fulfilled' | 'dropped';
export type ThreadStatus = 'identified' | 'contacted' | 'negotiating' | 'closed';

export interface WhatsAppListing {
  id: string;
  source_raw_message_id?: string;
  message_date?: string;
  agent_contact?: string;
  agent_name?: string;
  company_name?: string;
  raw_message: string;
  message_type?: MessageType;
  property_type?: PropertyType;
  area_sqft?: number;
  price?: number;
  price_text?: string;
  location?: string;
  project_name?: string;
  bedroom_count?: number;
  furnishing_status?: string;
  parking_count?: number;
  facing_direction?: string;
  special_features?: string[];
  
  // Enhanced fields
  locality_id?: string;
  status?: ListingStatus;
  quality_score?: number;
  created_at: string;
}

export interface Locality {
  id: string;
  name: string;
  aliases: string[];
  nearbyIds: string[];
  market_stats?: {
    avg_price?: number;
    listing_count?: number;
  };
}

export interface Requirement {
  id: string;
  user_id: string;
  raw_text: string;
  parsed_criteria: {
    budget_min?: number;
    budget_max?: number;
    locality_id: string;
    type?: PropertyType;
    min_area?: number;
    max_area?: number;
    bedroom_count?: number;
  };
  status: RequirementStatus;
  created_at: string;
}

export interface Thread {
  id: string;
  requirement_id: string;
  listing_id: string;
  agent_contact: string;
  status: ThreadStatus;
  messages: ThreadMessage[];
  created_at: string;
}

export interface ThreadMessage {
  role: 'user' | 'agent' | 'system';
  content: string;
  timestamp: string;
}

export interface MockDatabase {
  localities: Locality[];
  listings: WhatsAppListing[];
  requirements: Requirement[];
  threads: Thread[];
}
