"""
Web research tool for real estate market information.
Wraps Google Search functionality for the agent.
"""
from google.adk.tools import google_search as _google_search


def search_web(query: str) -> str:
    """
    Search the web for real estate market information.
    
    Use this for:
    - Market trends and news
    - Developer reputation and reviews
    - Locality development updates
    - Real estate regulations
    
    Args:
        query: Search query (e.g., "Prestige Group Bangalore reviews", 
               "Whitefield real estate market trends 2024")
    
    Returns:
        Search results as formatted text
    """
    try:
        # Call the built-in google_search tool
        results = _google_search(query)
        return results
    except Exception as e:
        return f"Error performing web search: {str(e)}"
