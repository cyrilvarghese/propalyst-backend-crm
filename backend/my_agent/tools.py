"""
Main tool functions for the real estate agent.
Imports from modular components for clean organization.
"""
from .database import supabase, USE_SUPABASE, query_listings, get_listing_by_id, count_listings_by_location
from .filters import ListingFilter, apply_filter, apply_filters_to_supabase_query
from .locality_data import LANDMARK_TO_LOCALITIES, LOCALITY_STATS
from .mock_data import load_mock_listings, load_mock_agents, apply_mock_filters

# Load mock data if not using Supabase
MOCK_LISTINGS = []
MOCK_AGENTS = []
if not USE_SUPABASE:
    MOCK_LISTINGS = load_mock_listings()
    MOCK_AGENTS = load_mock_agents()


def search_listings(filters):
    """
    Search listings using a filter language.
    
    Uses Supabase dynamic queries if USE_SUPABASE=true, otherwise filters mock data in-memory.
    """
    if USE_SUPABASE and supabase:
        # Dynamic Supabase query approach
        try:
            query = supabase.table('whatsapp_listings_relevant').select('*')
            
            # Apply filters to query
            query = apply_filters_to_supabase_query(query, filters)
            
            # Execute query
            results = query_listings(query)
            
            # Post-process for derived fields (status, investment_grade)
            filtered_results = []
            for listing in results:
                passes_all = True
                for filter_obj in filters:
                    field = filter_obj.get("field")
                    
                    # Handle derived fields that weren't in DB query
                    if field in ["status", "investment_grade"]:
                        validated_filter = ListingFilter(**filter_obj)
                        if not apply_filter(listing, validated_filter):
                            passes_all = False
                            break
                
                if passes_all:
                    filtered_results.append(listing)
            
            # Log results with visual separation
            print("\n" + "="*80)
            print(f"🔍 SUPABASE QUERY RESULTS: {len(filtered_results)} listings found")
            print("="*80 + "\n")
            
            # Limit results to prevent overwhelming the agent
            if len(filtered_results) > 50:
                print("\n" + "⚠️ "*40)
                print(f"   WARNING: Too many results ({len(filtered_results)}), limiting to 50")
                print("⚠️ "*40 + "\n")
                filtered_results = filtered_results[:50]
            
            return filtered_results
            
        except Exception as e:
            print(f"❌ Supabase query error: {e}")
            return []
    
    else:
        # Mock data in-memory filtering
        # Validate filters using Pydantic
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

        results = apply_mock_filters(MOCK_LISTINGS, validated_filters)
        
        print(f"📁 Mock data filtering returned {len(results)} results")
        
        # Limit results to prevent overwhelming the agent
        if len(results) > 50:
            print(f"⚠️  Too many results ({len(results)}), limiting to 50")
            results = results[:50]
        
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
    
    # Count inventory from appropriate source
    if USE_SUPABASE and supabase:
        inventory_count = count_listings_by_location(locality)
    else:
        inventory_count = sum(1 for l in MOCK_LISTINGS if l.get("location") == locality)
    
    return {
        "locality": locality,
        "avg_price_cr": stats.get("avg_price_cr", 0.0),
        "five_year_cagr_pct": stats.get("five_year_cagr_pct"),
        "rental_yield_pct": stats.get("rental_yield_pct"),
        "inventory_count": inventory_count,
    }


def get_nearby_localities(landmark: str):
    """
    Returns localities near a landmark.
    
    Args:
    - landmark: Name of landmark (e.g., "Manyata Tech Park")
    
    Returns:
    - List of locality names
    """
    return LANDMARK_TO_LOCALITIES.get(landmark, [])


def get_listing_details(listing_id: str):
    """Returns the full details of a specific listing by its ID."""
    if USE_SUPABASE and supabase:
        listing = get_listing_by_id(listing_id)
        if listing:
            return listing
    else:
        for l in MOCK_LISTINGS:
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
    for agent in MOCK_AGENTS:
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
