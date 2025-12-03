# Propalyst.CRM.AI

**A Real Estate CRM powered by Google ADK and AI agents**

Propalyst is an intelligent CRM for real estate brokerages that matches client requirements with available property listings using advanced AI-powered agents and a locality-centric approach.

---

## 🚀 Features

### Core Capabilities
- **Filter-Based Search**: Powerful query language supporting price, BHK, locality, property type, and more
- **Agent Profiles**: Track internal agents with expertise areas, response times, and transaction history
- **Locality Intelligence**: Investment stats (CAGR, rental yield) and nearby area suggestions
- **Property Type Search**: Quick queries by property type with optional grouping by agent
- **Natural Language Interface**: AI agent understands conversational queries

### Tools Available
1. `search_listings(filters)` - Advanced property search with declarative filters
2. `get_locality_stats(locality)` - Investment metrics for specific areas
3. `get_nearby_localities(landmark)` - Expand search to nearby localities
4. `get_listing_details(listing_id)` - Full property details
5. `get_agent_details(query)` - Internal agent profiles by name/ID
6. `get_listings_by_type(property_type, group_by_agent)` - Type-based search

---

## 🛠️ Tech Stack

### Backend
- **Google ADK (Agent Development Kit)** - LLM agent framework
- **Gemini 2.5 Flash** - Primary model for agent orchestration
- **Python** - Backend logic and tools
- **Pydantic** - Data validation for filters

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling

---

## 📦 Installation

### Prerequisites
- Node.js 18+
- Python 3.9+
- Google Cloud credentials (for ADK)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd Propalyst.CRM.Ai
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Frontend Setup**
   ```bash
   npm install
   ```

4. **Environment Configuration**
   - Set up Google Cloud credentials for ADK
   - Configure any environment variables in `.env.local`

---

## 🏃 Running the Application

### Backend (ADK Server)
```bash
cd backend
adk web --port 8000
```
Access at: `http://127.0.0.1:8000`

### Frontend
```bash
npm run dev
```
Access at: `http://localhost:3000`

---

## 📊 Data Structure

### Mock Listings
- **Location**: `backend/mock_listings.json`
- **Fields**: price, bhk, location, property_type, area_sqft, special_features, agent details

### Mock Agents
- **Location**: `backend/mock_agents.json`
- **Fields**: name, contact, active_listings_count, top_localities, specializations, avg_deal_value_cr, response_time

### Filter Language
```json
[
  {"field": "bhk", "op": "eq", "value": 3},
  {"field": "price_cr", "op": "gt", "value": 5.0},
  {"field": "locality", "op": "in", "value": ["Indiranagar", "Koramangala"]}
]
```

**Supported Fields**: price_cr, bhk, area_sqft, locality, near_landmark, status, property_type, investment_grade  
**Supported Operators**: eq, gt, lt, gte, lte, in, near

---

## 🧪 Example Queries

- "3 BHK above 5 crores in Indiranagar"
- "Ready to move apartments in Koramangala"
- "Properties near Manyata Tech Park"
- "Investment properties with good appreciation"
- "List all offices grouped by agent"
- "Show me details for agent Rahul Estates"

---

## 📁 Project Structure

```
Propalyst.CRM.Ai/
├── backend/
│   ├── my_agent/
│   │   ├── agent.py          # Main ADK agent configuration
│   │   ├── tools.py          # Search and utility tools
│   │   └── filter_parser.py  # (deprecated)
│   ├── mock_listings.json    # Property data
│   ├── mock_agents.json      # Agent profiles
│   └── generate_agents.py    # Script to generate agent data
├── src/                      # Next.js frontend
├── public/                   # Static assets
├── .gitignore
└── README.md
```

---

## 🤝 Contributing

This is a private project. For access or contributions, contact the repository owner.

---

## 📝 License

Proprietary - All rights reserved

---

## 🔧 Development Notes

### Key Design Decisions
1. **Pydantic for Validation**: Used internally but not in function signatures to avoid ADK schema conflicts
2. **No Type Hints on Complex Types**: Lists and dicts left untyped to bypass Gemini API validation errors
3. **Filter-First Architecture**: Declarative filters enable flexible, composable queries
4. **Locality-Centric**: Investment data and landmarks tied to specific localities

### Known Issues
- Sub-agent approach abandoned due to ADK schema generation complexity
- Type hints simplified to avoid `INVALID_ARGUMENT` errors from Gemini API

---

**Built with ❤️ using Google ADK**
