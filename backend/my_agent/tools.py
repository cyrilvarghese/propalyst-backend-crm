from pydantic import BaseModel, Field
from typing import List, Any, Literal, Union
import json
import pathlib

# Load mock listings from the JSON file
try:
    data_path = pathlib.Path(__file__).parent.parent / 'mock_listings.json'
    with open(data_path, 'r') as f:
        LISTINGS = json.load(f)
except Exception as e:
    print(f"Error loading mock listings: {e}")
    LISTINGS = []

# Locality to landmark mappings
LANDMARK_TO_LOCALITIES = {
    "Manyata Tech Park": ["Hebbal", "Nagawara", "Thanisandra", "Yelahanka"],
    "Electronic City": ["Electronic City", "Bommanahalli", "Sarjapur Road"],
    "Whitefield": ["Whitefield", "Marathahalli", "Varthur"],
    "Airport": ["Devanahalli", "Yelahanka", "Hebbal"],
    "Koramangala": ["Koramangala", "HSR Layout", "BTM Layout"],
}

# Hardcoded locality stats
LOCALITY_STATS = {
    "Hebbal": {"avg_price_cr": 8.5, "five_year_cagr_pct": 9.2, "rental_yield_pct": 3.1},
    "Thanisandra": {"avg_price_cr": 6.8, "five_year_cagr_pct": 10.5, "rental_yield_pct": 3.5},
    "Nagawara": {"avg_price_cr": 7.2, "five_year_cagr_pct": 9.8, "rental_yield_pct": 3.3},
    "Indiranagar": {"avg_price_cr": 15.2, "five_year_cagr_pct": 7.5, "rental_yield_pct": 2.8},
    "Koramangala": {"avg_price_cr": 14.8, "five_year_cagr_pct": 8.1, "rental_yield_pct": 2.9},
    "HSR Layout": {"avg_price_cr": 12.5, "five_year_cagr_pct": 8.8, "rental_yield_pct": 3.0},
    "Electronic City": {"avg_price_cr": 6.5, "five_year_cagr_pct": 11.2, "rental_yield_pct": 4.0},
    "Whitefield": {"avg_price_cr": 9.2, "five_year_cagr_pct": 10.0, "rental_yield_pct": 3.4},
    "Sarjapur Road": {"avg_price_cr": 7.8, "five_year_cagr_pct": 11.5, "rental_yield_pct": 3.8},
    "Yelahanka": {"avg_price_cr": 5.5, "five_year_cagr_pct": 12.0, "rental_yield_pct": 4.2},
    "Devanahalli": {"avg_price_cr": 4.8, "five_year_cagr_pct": 13.5, "rental_yield_pct": 4.5},
    "Bannerghatta Road": {"avg_price_cr": 6.2, "five_year_cagr_pct": 10.8, "rental_yield_pct": 3.7},
    "JP Nagar": {"avg_price_cr": 8.0, "five_year_cagr_pct": 8.5, "rental_yield_pct": 3.2},
    "Marathahalli": {"avg_price_cr": 8.8, "five_year_cagr_pct": 9.5, "rental_yield_pct": 3.3},
    "Jayanagar": {"avg_price_cr": 11.0, "five_year_cagr_pct": 7.8, "rental_yield_pct": 2.9},
    "Mysore Road": {"avg_price_cr": 5.0, "five_year_cagr_pct": 11.8, "rental_yield_pct": 4.1},
}

def _get_listing_value(listing: dict, field: str) -> Any:
    """Extract field value from listing, handling conversions."""
    if field == "price_cr":
        try:
            return float(listing.get("price", 0)) / 10000000
        except (ValueError, TypeError):
            return 0.0
    elif field == "bhk":
        return listing.get("bedroom_count")
    elif field == "area_sqft":
        try:
            return int(listing.get("area_sqft", 0))
        except (ValueError, TypeError):
            return 0
    elif field == "locality":
        return listing.get("location")
    elif field == "property_type":
        return listing.get("property_type")
    elif field == "status":
        # Derive from special_features
        features = listing.get("special_features", [])
        if "ready_to_move" in features:
            return "ready_to_move"
        elif "under_construction" in features:
            return "under_construction"
        return None
    elif field == "investment_grade":
        # Derive: properties 5-25 cr in high-growth localities
        price_cr = float(listing.get("price", 0)) / 10000000
        locality = listing.get("location")
        if 5 <= price_cr <= 25 and locality in LOCALITY_STATS:
            stats = LOCALITY_STATS[locality]
            return stats.get("five_year_cagr_pct", 0) > 9.0
        return False
    return None

class ListingFilter(BaseModel):
    field: Literal["price_cr", "bhk", "area_sqft", "locality", "near_landmark", 
                   "status", "property_type", "investment_grade"] = Field(
                       description="The attribute to filter on"
                   )
    op: Literal["eq", "gt", "lt", "gte", "lte", "in", "near"] = Field(
        description="The comparison operator"
    )
    value: Union[str, int, float, bool, List[str], List[int]] = Field(
        description="The value to compare against"
    )

def _apply_filter(listing: dict, filter_obj: ListingFilter) -> bool:
    """Apply a single filter to a listing."""
    field = filter_obj.field
    op = filter_obj.op
    value = filter_obj.value
    
    listing_value = _get_listing_value(listing, field)
    
    if listing_value is None:
        return False
    
    if op == "eq":
        return listing_value == value
    elif op == "gt":
        return listing_value > value
    elif op == "lt":
        return listing_value < value
    elif op == "gte":
        return listing_value >= value
    elif op == "lte":
        return listing_value <= value
    elif op == "in":
        if isinstance(value, list):
            return listing_value in value
        return False
    elif op == "near":
        # For near_landmark, check if locality is in the landmark's area
        if field == "near_landmark":
            locality = listing.get("location")
            nearby = LANDMARK_TO_LOCALITIES.get(value, [])
            return locality in nearby
        # For locality partial match
        if isinstance(listing_value, str) and isinstance(value, str):
            return value.lower() in listing_value.lower()
        return False
    
    return False

def search_listings(filters):
    """
    Search listings using a filter language.
    
    Each filter is an object with field, op, and value.
    """
    results = []
    
    # Validate filters using Pydantic (optional but good practice)
    validated_filters = []
    for f in filters:
        if isinstance(f, dict):
            try:
                validated_filters.append(ListingFilter(**f))
            except Exception as e:
                print(f"Skipping invalid filter: {f} - {e}")
                continue
        elif isinstance(f, ListingFilter):
            validated_filters.append(f)

    for listing in LISTINGS:
        # Apply all filters - listing must pass all
        passes_all = True
        for filter_obj in validated_filters:
            if not _apply_filter(listing, filter_obj):
                passes_all = False
                break
        
        if passes_all:
            results.append(listing)
    
    return results

def get_locality_stats(locality: str):
    """
    Returns statistics for a locality.
    
    Returns:
    - locality: name
    - avg_price_cr: average price in crores
    - five_year_cagr_pct: 5-year CAGR percentage
    - rental_yield_pct: rental yield percentage
    - inventory_count: number of listings
    """
    stats = LOCALITY_STATS.get(locality, {
        "avg_price_cr": 0.0,
        "five_year_cagr_pct": None,
        "rental_yield_pct": None,
    })
    
    # Count inventory
    inventory_count = sum(1 for l in LISTINGS if l.get("location") == locality)
    
    return {
        "locality": locality,
        "avg_price_cr": stats.get("avg_price_cr", 0.0),
        "five_year_cagr_pct": stats.get("five_year_cagr_pct"),
        "rental_yield_pct": stats.get("rental_yield_pct"),
        "inventory_count": inventory_count,
    }

def get_nearby_localities(landmark: str, radius_km: float = 5.0):
    """
    Returns nearby localities for a given landmark.
    
    Args:
    - landmark: landmark name (e.g., "Manyata Tech Park")
    - radius_km: search radius (currently not used, returns predefined areas)
    
    Returns list of locality names.
    """
    return LANDMARK_TO_LOCALITIES.get(landmark, [])

# Load mock agents
try:
    agents_path = pathlib.Path(__file__).parent.parent / 'mock_agents.json'
    with open(agents_path, 'r') as f:
        AGENTS = json.load(f)
except Exception as e:
    print(f"Error loading mock agents: {e}")
    AGENTS = []

def get_listing_details(listing_id: str):
    """Returns the full details of a specific listing by its ID."""
    for l in LISTINGS:
        if l.get("id") == listing_id:
            return l
    return {"error": "Listing not found"}

def get_agent_details(query: str):
    """
    Returns details of an internal agent by name or ID.
    
    Args:
    - query: Agent name or ID (e.g., "Rahul", "agent_1")
    
    Returns:
    - Agent profile dict or error
    """
    query_str = str(query).lower()
    for agent in AGENTS:
        if query_str in agent["id"].lower() or query_str in agent["name"].lower():
            return agent
    return {"error": "Agent not found"}

def get_listings_by_type(property_type: str, group_by_agent: bool = False):
    """
    Search all listings by a specific property type.
    
    Args:
    - property_type: e.g., "apartment", "villa", "office", "plot", "independent_house"
    - group_by_agent: If True, returns listings grouped by agent name.
    
    Returns:
    - List of matching listings OR Dict of listings keyed by agent name
    """
    # Reuse search_listings with a single filter
    listings = search_listings([{"field": "property_type", "op": "eq", "value": property_type}])
    
    if group_by_agent:
        grouped = {}
        for l in listings:
            agent_name = l.get("agent_name", "Unknown Agent")
            if agent_name not in grouped:
                grouped[agent_name] = []
            grouped[agent_name].append(l)
        return grouped
        
    return listings
