"""
Mock data loader for testing ADK workflow without database.
"""
import json
import pathlib

def load_mock_listings():
    """Load mock listings from JSON file."""
    try:
        data_path = pathlib.Path(__file__).parent.parent / 'mock_listings.json'
        with open(data_path, 'r') as f:
            listings = json.load(f)
        print(f"✅ Loaded {len(listings)} mock listings")
        return listings
    except Exception as e:
        print(f"❌ Error loading mock listings: {e}")
        return []

def load_mock_agents():
    """Load mock agent profiles from JSON file."""
    try:
        agents_path = pathlib.Path(__file__).parent.parent / 'mock_agents.json'
        with open(agents_path, 'r') as f:
            agents = json.load(f)
        print(f"✅ Loaded {len(agents)} mock agents")
        return agents
    except Exception as e:
        print(f"❌ Error loading mock agents: {e}")
        return []

def apply_mock_filters(listings, validated_filters):
    """
    Apply filters to mock listings in-memory.
    
    Args:
        listings: List of listing dicts
        validated_filters: List of ListingFilter objects
        
    Returns:
        Filtered list of listings
    """
    from .filters import apply_filter
    
    results = []
    for listing in listings:
        # Apply all filters - listing must pass all
        passes_all = True
        for filter_obj in validated_filters:
            if not apply_filter(listing, filter_obj):
                passes_all = False
                break
        
        if passes_all:
            results.append(listing)
    
    return results

