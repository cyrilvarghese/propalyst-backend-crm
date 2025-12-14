export interface Listing {
  id: string
  property_type: string
  message_type: string
  bedroom_count?: number
  area_sqft?: number
  price?: number
  price_text: string
  location: string
  project_name?: string
  furnishing_status?: string
  parking_count?: number
  facing_direction?: string
  special_features?: string[]
  agent_name?: string
  agent_contact?: string
  raw_message: string
  image_url: string
}

export const MOCK_LISTINGS: Listing[] = [
  {
    id: "1",
    property_type: "apartment",
    message_type: "supply_sale",
    bedroom_count: 3,
    area_sqft: 1610,
    price: 12800000,
    price_text: "₹ 1.28 Cr.",
    location: "Indiranagar",
    project_name: "Prestige Montecarlo",
    furnishing_status: "semi_furnished",
    facing_direction: "garden",
    special_features: ["garden_facing", "negotiable"],
    agent_name: "TREND SHELTERS Shamran",
    agent_contact: "+91 9686115795",
    raw_message: "🏡 3 BHK With 2 Balconies Facing Garden\n📏 1,610 Sq ft\n🪚 Semi Furnished\n💰 ₹ 1.28 Cr.\n📶 Available: Immediate",
    image_url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "2",
    property_type: "apartment",
    message_type: "supply_rent",
    bedroom_count: 3,
    area_sqft: 1900,
    price: 85000,
    price_text: "₹85k plus maintenance",
    location: "Indiranagar",
    project_name: "SJR Primecorp Vogue",
    furnishing_status: "fully_furnished",
    facing_direction: "east",
    special_features: ["metro_nearby", "available_immediate"],
    agent_name: "Not provided",
    agent_contact: "Contact via WhatsApp",
    raw_message: "3 bathrooms, 3 balcony\nRent 85k plus maintenance\nDeposit: 5 months rent\nFloor no - 5\nAvailable immediate",
    image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "3",
    property_type: "apartment",
    message_type: "supply_rent",
    bedroom_count: 3,
    area_sqft: 1800,
    price: 55000,
    price_text: "₹55k",
    location: "HAL 3rd Stage",
    project_name: "Adarsh Palm Retreat",
    furnishing_status: "semi_furnished",
    facing_direction: "east",
    special_features: ["clubhouse", "swimming_pool", "parking"],
    agent_name: "Tashi Properties",
    agent_contact: "7026070800 / 9916251225",
    raw_message: "3 BHK semi furnished\n1800 sqft\nClubhouse & Swimming pool\n₹55k per month",
    image_url: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "4",
    property_type: "apartment",
    message_type: "supply_sale",
    bedroom_count: 2,
    area_sqft: 1200,
    price: 8500000,
    price_text: "₹85 Lakhs",
    location: "Indiranagar 2nd Stage",
    project_name: "Sobha Dream Acres",
    furnishing_status: "fully_furnished",
    facing_direction: "north",
    special_features: ["club_house", "swimming_pool"],
    agent_name: "Prakash Realty",
    agent_contact: "+91 9876543210",
    raw_message: "2 BHK fully furnished\n1200 sqft\nClub house & Swimming pool\n₹85 Lakhs",
    image_url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "5",
    property_type: "apartment",
    message_type: "supply_rent",
    bedroom_count: 2,
    area_sqft: 1150,
    price: 35000,
    price_text: "₹35k",
    location: "Indiranagar",
    project_name: "Brigade Millennium",
    furnishing_status: "semi_furnished",
    facing_direction: "south",
    special_features: ["gym", "security"],
    agent_name: "Sunita Properties",
    agent_contact: "+91 9988776655",
    raw_message: "2 BHK semi furnished\n1150 sqft\nGym & 24/7 Security\n₹35k per month",
    image_url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "6",
    property_type: "apartment",
    message_type: "supply_sale",
    bedroom_count: 2,
    area_sqft: 1100,
    price: 9500000,
    price_text: "₹95 Lakhs",
    location: "Jeevanbhima Nagar",
    project_name: "Prestige Ozone",
    furnishing_status: "semi_furnished",
    facing_direction: "west",
    special_features: ["gated_community", "security"],
    agent_name: "Pallavi M V",
    agent_contact: "8550079380",
    raw_message: "2 BHK semi furnished\n1100 sqft\nGated community with 24/7 security\n₹95 Lakhs",
    image_url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "7",
    property_type: "apartment",
    message_type: "supply_sale",
    bedroom_count: 4,
    area_sqft: 2400,
    price: 28000000,
    price_text: "₹2.8 Cr.",
    location: "Indiranagar 1st Stage",
    project_name: "Prestige Lakeside Habitat",
    furnishing_status: "semi_furnished",
    facing_direction: "lake",
    special_features: ["lake_view", "premium"],
    agent_name: "Elite Homes",
    agent_contact: "+91 9123456789",
    raw_message: "4 BHK lake facing\n2400 sqft\nPremium amenities\n₹2.8 Cr.",
    image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "8",
    property_type: "apartment",
    message_type: "supply_rent",
    bedroom_count: 1,
    area_sqft: 650,
    price: 18000,
    price_text: "₹18k",
    location: "Indiranagar HAL 2nd Stage",
    project_name: "Mantri Espana",
    furnishing_status: "fully_furnished",
    special_features: ["bachelor_friendly", "pet_friendly"],
    agent_name: "Quick Rentals",
    agent_contact: "+91 8899776655",
    raw_message: "1 BHK fully furnished\n650 sqft\nBachelor & Pet friendly\n₹18k",
    image_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "9",
    property_type: "apartment",
    message_type: "supply_rent",
    bedroom_count: 3,
    area_sqft: 1650,
    price: 48000,
    price_text: "₹48k",
    location: "Domlur",
    project_name: "Salarpuria Sattva Greenage",
    furnishing_status: "semi_furnished",
    facing_direction: "north",
    special_features: ["near_metro", "clubhouse"],
    agent_name: "Commercial Realty",
    agent_contact: "Contact for details",
    raw_message: "3 BHK semi furnished\n1650 sqft\nNear metro station\nClubhouse facilities\n₹48k per month",
    image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "10",
    property_type: "apartment",
    message_type: "supply_sale",
    bedroom_count: 3,
    area_sqft: 1550,
    price: 14500000,
    price_text: "₹1.45 Cr.",
    location: "Indiranagar Double Road",
    project_name: "Purva Panorama",
    furnishing_status: "unfurnished",
    facing_direction: "east",
    special_features: ["ready_to_move", "vastu_compliant"],
    agent_name: "Bharat Realty",
    agent_contact: "+91 9765432108",
    raw_message: "3 BHK unfurnished\n1550 sqft\nReady to move\nVastu compliant\n₹1.45 Cr.",
    image_url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop"
  }
]
