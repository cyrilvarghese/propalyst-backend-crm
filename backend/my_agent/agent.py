from google.adk.agents.llm_agent import Agent
from google.adk.tools import google_search
from .tools import search_listings, get_locality_stats, get_nearby_localities, get_listing_details, get_agent_details, get_listings_by_type
import pathlib

# Load instructions from external file
try:
    instruction_path = pathlib.Path(__file__).parent / 'instructions.md'
    with open(instruction_path, 'r') as f:
        agent_instruction = f.read()
except Exception as e:
    print(f"Error loading instructions: {e}")
    agent_instruction = "You are a real estate broker assistant."

root_agent = Agent(
    model='gemini-2.5-flash',
    name='my_agent',
    description="Real estate broker assistant for Bangalore properties.",
    instruction=agent_instruction,
    tools=[search_listings, get_locality_stats, get_nearby_localities, get_listing_details, get_agent_details, get_listings_by_type, google_search],
)
