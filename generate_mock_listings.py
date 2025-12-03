"""
Generate 50 mock listings based on the sample whatsapp_listing_data structure
"""
import json
import random
from datetime import datetime, timedelta
import uuid

# Sample data pools
locations = [
    "Indiranagar", "Koramangala", "Whitefield", "HSR Layout", "Marathahalli",
    "Electronic City", "Sarjapur Road", "Hebbal", "Yelahanka", "JP Nagar",
    "BTM Layout", "Jayanagar", "Bannerghatta Road", "Mysore Road", "Devanahalli"
]

property_types = ["apartment", "villa", "plot", "office", "independent_house"]
message_types = ["supply_sale", "supply_rent", "demand_buy", "demand_rent"]

project_names = [
    "Brigade Cosmopolis", "Prestige Lakeside Habitat", "Sobha City",
    "Godrej Woodsman Estate", "Purva Venezia", "Mantri Espana",
    "Embassy Lake Terraces", "Salarpuria Sattva", "SVS Silver Oaks",
    None, None, None  # Some listings don't have project names
]

agent_names = [
    "M B Chandresh", "Santosh Bhurani", "Rahul Estates", "Pallavi M V",
    "TREND SHELTERS Shamran", "Tashi Properties", None, None
]

special_features_pool = [
    "higher_floor", "corner_plot", "gated_community", "swimming_pool",
    "gym", "club_house", "lift", "parking", "garden_facing",
    "newly_constructed", "ready_to_move", "negotiable", "urgent_sale"
]

furnishing_options = ["furnished", "semi_furnished", "unfurnished", None]
facing_directions = ["north", "south", "east", "west", "north_east", "south_west", None]

def generate_phone():
    """Generate random Indian phone number"""
    return f"+91 {random.randint(70000, 99999)} {random.randint(10000, 99999)}"

def generate_price(property_type, bedroom_count):
    """Generate realistic price based on property type"""
    base_prices = {
        "apartment": (30000000, 80000000),  # 3-8 Cr
        "villa": (50000000, 150000000),     # 5-15 Cr
        "plot": (20000000, 100000000),      # 2-10 Cr
        "office": (40000000, 120000000),    # 4-12 Cr
        "independent_house": (60000000, 200000000)  # 6-20 Cr
    }
    
    min_price, max_price = base_prices.get(property_type, (30000000, 80000000))
    
    # Adjust for bedroom count
    if bedroom_count:
        min_price = min_price * (bedroom_count / 3)
        max_price = max_price * (bedroom_count / 3)
    
    return random.randint(int(min_price), int(max_price))

def generate_area(property_type, bedroom_count):
    """Generate realistic area in sqft"""
    base_areas = {
        "apartment": (1000, 3000),
        "villa": (2000, 5000),
        "plot": (1200, 10000),
        "office": (800, 4000),
        "independent_house": (1800, 4500)
    }
    
    min_area, max_area = base_areas.get(property_type, (1000, 3000))
    
    # Adjust for bedroom count
    if bedroom_count:
        min_area = min_area + (bedroom_count - 2) * 400
        max_area = max_area + (bedroom_count - 2) * 600
    
    return random.randint(int(min_area), int(max_area))

def format_price_text(price):
    """Convert price to Indian format (Cr/L)"""
    if price >= 10000000:  # >= 1 Cr
        return f"Rs {price / 10000000:.2f} Cr"
    else:
        return f"Rs {price / 100000:.2f} L"

def generate_listing(idx):
    """Generate a single mock listing"""
    property_type = random.choice(property_types)
    message_type = random.choice(message_types)
    
    # Bedroom count (only for apartments, villas, houses)
    bedroom_count = None
    if property_type in ["apartment", "villa", "independent_house"]:
        bedroom_count = random.choice([2, 3, 3, 3, 4, 4, 5])
    
    # Generate price and area
    price = None
    area_sqft = None
    
    if message_type in ["supply_sale", "supply_rent", "demand_buy", "demand_rent"]:
        price = generate_price(property_type, bedroom_count)
        area_sqft = generate_area(property_type, bedroom_count)
    
    # Random date within last 90 days
    days_ago = random.randint(0, 90)
    message_date = (datetime.now() - timedelta(days=days_ago)).isoformat()
    
    # Special features (0-4 random features)
    num_features = random.randint(0, 4)
    special_features = random.sample(special_features_pool, num_features) if num_features > 0 else []
    
    listing = {
        "idx": idx,
        "id": str(uuid.uuid4()),
        "source_raw_message_id": str(uuid.uuid4()),
        "message_date": message_date,
        "agent_contact": generate_phone(),
        "agent_name": random.choice(agent_names),
        "company_name": None,
        "raw_message": f"Mock listing {idx}",
        "message_type": message_type,
        "property_type": property_type,
        "area_sqft": str(area_sqft) if area_sqft else None,
        "price": str(price) if price else None,
        "price_text": format_price_text(price) if price else None,
        "location": random.choice(locations),
        "project_name": random.choice(project_names),
        "furnishing_status": random.choice(furnishing_options),
        "parking_count": random.choice([1, 2, 3, None]),
        "parking_text": None,
        "facing_direction": random.choice(facing_directions),
        "special_features": special_features,
        "llm_json": json.dumps({
            "split_index": None,
            "message_type": message_type,
            "split_from_original": False
        }),
        "created_at": datetime.now().isoformat(),
        "bedroom_count": bedroom_count
    }
    
    return listing

def main():
    """Generate 50 mock listings"""
    listings = []
    
    for i in range(1, 51):
        listing = generate_listing(i)
        listings.append(listing)
    
    # Save to file
    output_file = "backend/mock_listings.json"
    with open(output_file, 'w') as f:
        json.dump(listings, f, indent=2)
    
    print(f"✅ Generated 50 mock listings")
    print(f"📁 Saved to: {output_file}")
    
    # Print summary
    print("\n📊 Summary:")
    property_counts = {}
    message_counts = {}
    
    for listing in listings:
        prop_type = listing["property_type"]
        msg_type = listing["message_type"]
        
        property_counts[prop_type] = property_counts.get(prop_type, 0) + 1
        message_counts[msg_type] = message_counts.get(msg_type, 0) + 1
    
    print("\nProperty Types:")
    for prop_type, count in property_counts.items():
        print(f"  - {prop_type}: {count}")
    
    print("\nMessage Types:")
    for msg_type, count in message_counts.items():
        print(f"  - {msg_type}: {count}")

if __name__ == "__main__":
    main()
