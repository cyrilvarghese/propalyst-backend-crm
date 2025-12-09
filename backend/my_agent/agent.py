from google.adk.agents.llm_agent import Agent
from google.adk.tools import google_search
from .tools import search_listings, get_locality_stats, get_nearby_localities, get_listing_details, get_agent_details, get_listings_by_type
from .analytics_tools import get_price_distribution, get_bhk_distribution, get_summary_stats, get_locality_breakdown
import pathlib
from google.adk.tools import AgentTool

# Load instructions from external file
try:
    instruction_path = pathlib.Path(__file__).parent / 'instructions.md'
    with open(instruction_path, 'r') as f:
        agent_instruction = f.read()
except Exception as e:
    print(f"Error loading instructions: {e}")
    agent_instruction = "You are a real estate broker assistant."

# Web Research Agent - Handles web searches
web_research_agent = Agent(
    model='gemini-2.5-flash',
    name='web_research_agent',
    description="Searches the web for real estate market information, developer news, and locality trends",
    instruction="You search the web for real estate information. Use google_search to find market trends, developer reputation, locality news, and regulations.",
    tools=[google_search]
)

# Main Agent
root_agent = Agent(
    model='gemini-2.5-flash',
    name='my_agent',
    description="Real estate broker assistant for Bangalore properties.",
    instruction=agent_instruction,
    tools=[
        # Search tools
        search_listings, 
        get_locality_stats, 
        get_nearby_localities, 
        get_listing_details, 
        get_agent_details, 
        get_listings_by_type,
        # Analytics tools (for summaries)
        get_price_distribution,
        get_bhk_distribution,
        get_summary_stats,
        get_locality_breakdown,
        AgentTool(agent=web_research_agent)
    ]
)
