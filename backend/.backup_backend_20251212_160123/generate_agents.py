import json
import random
import pathlib
from collections import defaultdict

def generate_mock_agents():
    # Load listings
    try:
        data_path = pathlib.Path('backend/mock_listings.json')
        with open(data_path, 'r') as f:
            listings = json.load(f)
    except Exception as e:
        print(f"Error loading listings: {e}")
        return

    # Group by agent
    agents_data = defaultdict(lambda: {
        "listings": [],
        "locations": [],
        "property_types": [],
        "prices": []
    })

    for l in listings:
        name = l.get("agent_name")
        contact = l.get("agent_contact")
        
        # Use name if available, else skip or use contact
        if not name:
            continue
            
        key = name
        agents_data[key]["name"] = name
        agents_data[key]["contact"] = contact
        agents_data[key]["listings"].append(l["id"])
        
        if l.get("location"):
            agents_data[key]["locations"].append(l["location"])
        
        if l.get("property_type"):
            agents_data[key]["property_types"].append(l["property_type"])
            
        try:
            price = float(l.get("price", 0))
            if price > 0:
                agents_data[key]["prices"].append(price)
        except:
            pass

    # Create agent profiles
    final_agents = []
    response_times = ["15 mins", "30 mins", "1 hour", "2 hours", "4 hours", "Same day"]
    
    for name, data in agents_data.items():
        # Skip agents with too few listings to form a profile
        if len(data["listings"]) < 2:
            continue
            
        # Calculate metrics
        avg_price = sum(data["prices"]) / len(data["prices"]) if data["prices"] else 0
        avg_price_cr = round(avg_price / 10000000, 2)
        
        # Top localities (simple frequency)
        loc_counts = defaultdict(int)
        for loc in data["locations"]:
            loc_counts[loc] += 1
        top_localities = sorted(loc_counts, key=loc_counts.get, reverse=True)[:3]
        
        # Specializations
        type_counts = defaultdict(int)
        for pt in data["property_types"]:
            type_counts[pt] += 1
        specializations = sorted(type_counts, key=type_counts.get, reverse=True)[:2]
        
        agent_profile = {
            "id": f"agent_{len(final_agents) + 1}",
            "name": name,
            "contact": data["contact"],
            "active_listings_count": len(data["listings"]),
            "top_localities": top_localities,
            "specializations": specializations,
            "avg_deal_value_cr": avg_price_cr,
            "response_time": random.choice(response_times),
            "recent_transaction_ids": data["listings"][:5] # Mocking transaction history with current listings
        }
        final_agents.append(agent_profile)

    # Save to file
    with open('backend/mock_agents.json', 'w') as f:
        json.dump(final_agents, f, indent=2)
    
    print(f"Generated {len(final_agents)} agent profiles.")

if __name__ == "__main__":
    generate_mock_agents()
