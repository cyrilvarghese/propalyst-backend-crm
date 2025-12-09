# Real Estate CRM \- Product Specification

## Executive Summary

A locality-centric Real Estate CRM designed for real estate brokerages to intelligently match demand (requirements) with supply (listings) using a graph-based locality model and market intelligence derived from local inventory.

---

## 1\. Product Vision

### 1.1 Problem Statement

Real estate brokers receive property requirements and must manually search through scattered WhatsApp messages, spreadsheets, and personal contacts to find matching properties. This process is:

- Time-consuming and inefficient  
- Limited by memory and personal networks  
- Lacks market intelligence for price validation  
- Difficult to track conversations and negotiations

### 1.2 Solution

An intelligent CRM that:

- Aggregates property listings from WhatsApp messages into a structured database  
- Matches requirements to listings based on locality, price, size, and type  
- Provides visual market intelligence through data-driven graphs  
- Enables locality-based exploration using a graph network  
- Tracks the entire lifecycle: Requirement → Listing → Agent → Conversation

---

## 2\. User Flow (End-to-End)

### Phase 1: Requirement Entry

**Actor**: Employee (Broker)  
**Action**: Enter natural language requirement  
**Example**: "3BHK apartment in Indiranagar, 2200 sqft, budget 5 Cr"

### Phase 2: Requirement Breakdown

**System Action**: Parse the requirement into structured criteria  
**Output**:

- Type: Apartment  
- Bedrooms: 3 BHK  
- Area: \~2200 sqft  
- Budget: \~5 Cr  
- Primary Locality: Indiranagar

### Phase 3: Intelligence Dashboard (Iterative)

**System Action**: Display Split Dashboard

- **Left**: Locality Graph (Indiranagar \+ nearby areas)  
- **Right**: Market Intelligence Graphs

**User Interaction**: Click different locality nodes to see updated stats  
**Data Updates**: All graphs refresh to show selected locality's data

### Phase 4: Locality Selection

**User Action**: After iteration, user clicks "PROCEED" button  
**System Action**: Lock the selected locality and transition to Matches View

### Phase 5: Matches View

**System Action**: Display two tabs with same data, different groupings

- **Listings Tab**: Flat list of matching properties  
- **Agents Tab**: Properties grouped by agent cards

**User Interaction**: Browse listings, expand agent cards

### Phase 6: Agent Communication

**User Action**: Click "Message" button on a listing  
**System Action**: Create a Thread linking Requirement \+ Listing \+ Agent  
**Result**: Opens chat interface with context

---

## 3\. Screen Specifications

### Screen 1: Intelligence Dashboard

#### Layout

┌─────────────────────────────────────────────────────────────┐

│  New Req: 3BHK Indiranagar 5Cr            \[Create & Search\] │

├──────────────────────┬──────────────────────────────────────┤

│                      │                                      │

│   LOCALITY GRAPH     │    MARKET INTELLIGENCE              │

│                      │                                      │

│      ┌────┐          │    Tab: Local Inventory | Web       │

│   ┌──┤Ind.├──┐       │                                      │

│   │  └────┘  │       │    Price Histogram                   │

│   │          │       │    ██████████                        │

│ ┌─┴──┐    ┌─┴──┐    │                                      │

│ │CVR │    │Dml │    │    Size Histogram                    │

│ └────┘    └────┘    │    ██████████                        │

│                      │                                      │

│                      │    Type Distribution                 │

│                      │    Apartments: 70% ███████           │

│                      │    Villas: 20% ██                    │

│                      │    Plots: 10% █                      │

├──────────────────────┴──────────────────────────────────────┤

│                      \[PROCEED\] →                            │

└─────────────────────────────────────────────────────────────┘

#### Left Panel: Locality Graph

- **Visual**: Force-directed graph or radial layout  
- **Primary Node**: Centered, larger, highlighted  
- **Nearby Nodes**: Surrounding the primary, connected by edges  
- **Interaction**: Click → Updates primary & right panel  
- **Data**: Derived from `localities` table

#### Right Panel: Market Intelligence

**Tab 1: Local Inventory**

- Price Histogram (X: Price Ranges, Y: Count)  
- Size Histogram (X: Sqft Ranges, Y: Count)  
- Type Distribution (Horizontal bar chart)  
- "You are here" marker on graphs based on requirement

**Tab 2: Web Insights (MVP: Mocked)**

- Placeholder text: "Web research integration coming soon"  
- Future: Market trends, price per sqft averages

#### Footer

- Large "PROCEED" button  
- Disabled until user has selected a locality

---

### Screen 2: Matches View

#### Layout

┌─────────────────────────────────────────────────────────────┐

│  ← Back to Intelligence    Matches for Indiranagar         │

├─────────────────────────────────────────────────────────────┤

│  \[Listings\] \[Agents\]                                        │

├─────────────────────────────────────────────────────────────┤

│                                                             │

│  Listings Tab View:                                         │

│  ┌───────────────────────────────────────┐                 │

│  │ Listing A                              │                 │

│  │ 3BHK, 2100 sqft, ₹5.2 Cr              │                 │

│  │ Agent: Rahul                           │                 │

│  │                          \[Message\]     │                 │

│  └───────────────────────────────────────┘                 │

│  ┌───────────────────────────────────────┐                 │

│  │ Listing B                              │                 │

│  │ 3BHK, 1800 sqft, ₹4.8 Cr              │                 │

│  │ Agent: Sarah                           │                 │

│  │                          \[Message\]     │                 │

│  └───────────────────────────────────────┘                 │

│                                                             │

└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐

│  ← Back to Intelligence    Matches for Indiranagar         │

├─────────────────────────────────────────────────────────────┤

│  \[Listings\] \[Agents\]                                        │

├─────────────────────────────────────────────────────────────┤

│                                                             │

│  Agents Tab View:                                           │

│  ┌───────────────────────────────────────┐                 │

│  │ ▼ Rahul                  \[Message All\] │                 │

│  │   📊 2 Listings | Area Expert          │                 │

│  │                                        │                 │

│  │   • Listing A: 3BHK, 5.2Cr \[Message\]  │                 │

│  │   • Listing C: 3BHK, 4.5Cr \[Message\]  │                 │

│  └───────────────────────────────────────┘                 │

│  ┌───────────────────────────────────────┐                 │

│  │ Sarah                                  │                 │

│  │   📊 1 Listing                         │                 │

│  └───────────────────────────────────────┘                 │

│                                                             │

└─────────────────────────────────────────────────────────────┘

#### Navigation

- **Back Button**: Returns to Intelligence Dashboard  
- **Constraint**: Cannot change locality in this view

#### Tabs

**Listings Tab**:

- Card-based layout  
- Each card shows: Image, BHK, Size, Price, Agent Name  
- "Message" button per listing

**Agents Tab**:

- Collapsible agent cards  
- Header shows: Agent Name, Listing Count, Specialization  
- Expanded view shows all listings under that agent  
- "Message" button per listing OR "Message All"

---

### Screen 3: Thread View

#### Layout

┌─────────────────────────────────────────────────────────────┐

│  ← Back             Req: 3BHK Indiranagar | Listing A       │

├─────────────────────────────────────────────────────────────┤

│                                                             │

│  \=== Context \===                                            │

│  Requirement: 3BHK, Indiranagar, 5Cr                        │

│  Listing: 3BHK, 2100 sqft, ₹5.2 Cr (Rahul)                 │

│  ─────────────────────────────────────────                  │

│                                                             │

│  \[User\] Is this unit available for visit tomorrow?          │

│          10:30 AM                                           │

│                                                             │

│                                        \[Agent\] Yes, sure\!   │

│                                                 10:32 AM    │

│                                                             │

├─────────────────────────────────────────────────────────────┤

│  \[Type your message...\]                      \[Send\]         │

└─────────────────────────────────────────────────────────────┘

#### Features

- Context header showing Requirement \+ Listing details  
- Chat bubbles (User on left, Agent on right)  
- Message input at bottom  
- Auto-creates Thread record on first message

---

## 4\. Data Model

### 4.1 Entities Overview

localities

    ↓ (nearby\_ids)

    localities (Graph edges)

whatsapp\_listing\_data

    ↓ (locality\_id FK)

    localities

requirements

    ↓ (locality\_id FK)

    localities

threads

    ↓ (requirement\_id FK)

    requirements

    ↓ (listing\_id FK)

    whatsapp\_listing\_data

### 4.2 Detailed Schema

#### `localities`

| Column | Type | Description |
| :---- | :---- | :---- |
| id | UUID | Primary Key |
| name | TEXT | Display name (e.g., "Indiranagar") |
| aliases | TEXT\[\] | Variations for matching (e.g., \["Indira Nagar", "Indiranagar 1st Stage"\]) |
| nearby\_locality\_ids | UUID\[\] | Graph edges to nearby localities |
| market\_stats | JSONB | Cached aggregations (optional) |

#### `whatsapp_listing_data` (Existing \+ Enhancements)

Existing columns (from WhatsApp ingestion):

- id, agent\_contact, agent\_name, raw\_message  
- message\_type, property\_type, area\_sqft, price  
- location, bedroom\_count, special\_features, etc.

**Proposed Enhancements**: | Column | Type | Description | |--------|------|-------------| | locality\_id | UUID | FK to `localities` (mapped from `location` text) | | status | ENUM | `available`, `sold`, `inactive` | | normalized\_agent\_id | UUID | FK to `agents` table (future) | | quality\_score | NUMERIC | Data completeness score |

#### `requirements`

| Column | Type | Description |
| :---- | :---- | :---- |
| id | UUID | Primary Key |
| user\_id | UUID | Employee who created this |
| raw\_text | TEXT | Original input |
| parsed\_criteria | JSONB | `{ budget_max, locality_id, type, min_area, bedroom_count }` |
| status | ENUM | `active`, `fulfilled`, `dropped` |
| created\_at | TIMESTAMP |  |

#### `threads`

| Column | Type | Description |
| :---- | :---- | :---- |
| id | UUID | Primary Key |
| requirement\_id | UUID | FK to requirements |
| listing\_id | UUID | FK to whatsapp\_listing\_data |
| agent\_id | UUID | Derived from listing |
| status | ENUM | `identified`, `contacted`, `negotiating`, `closed` |
| notes | TEXT | Internal notes |
| messages | JSONB | Array of message objects |

### 4.3 Derived Entity: Agent

**Concept**: No separate table needed for MVP.  
**Implementation**: Aggregate view from `whatsapp_listing_data` grouped by `agent_contact`.

**Computed Fields**:

- Name: `MAX(agent_name)` or most common  
- Listings Count: `COUNT(*)`  
- Top Localities: `MODE(locality_id)`  
- Response Time: Avg from `threads` (future)

---

## 5\. Technical Architecture (MVP)

### 5.1 Technology Stack

- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS  
- **UI Components**: Shadcn UI (Radix primitives)  
- **Charts**: Recharts  
- **Data Source**: Local JSON files (mock data)  
- **State Management**: React Context / Zustand (as needed)

### 5.2 Data Flow

User Input

    ↓

Parse Requirement

    ↓

Load mock-db.json

    ↓

Filter Listings by locality\_id

    ↓

Calculate Stats (Histograms)

    ↓

Render Dashboard

### 5.3 Folder Structure

src/

  app/

    page.tsx              \# Main dashboard

    matches/

      page.tsx            \# Matches view

    thread/

      \[id\]/

        page.tsx          \# Thread view

  components/

    LocalityGraph.tsx     \# Graph visualization

    MarketStats.tsx       \# Histograms

    ListingCard.tsx       \# Listing display

    AgentCard.tsx         \# Agent card

  lib/

    matching.ts           \# Matching logic

    stats.ts              \# Histogram calculations

  data/

    mock-db.json          \# All mock data

  types/

    schema.ts             \# TypeScript interfaces

---

## 6\. Mock Data Specification

### 6.1 Localities (5 nodes)

\[

  {

    "id": "loc-1",

    "name": "Indiranagar",

    "aliases": \["Indira Nagar", "Indiranagar 1st Stage"\],

    "nearbyIds": \["loc-2", "loc-3"\]

  },

  {

    "id": "loc-2",

    "name": "Koramangala",

    "aliases": \["Koramangala", "Koramangala 5th Block"\],

    "nearbyIds": \["loc-1", "loc-4"\]

  }

  // ... 3 more

\]

### 6.2 Listings (\~50)

- **Distribution**:  
  - 15 in Indiranagar  
  - 15 in Koramangala  
  - 10 in CV Raman Nagar  
  - 5 in Domlur  
  - 5 in Yelahanka  
- **Agents**: 5-6 fixed agent contacts repeating across listings  
- **Price**: Gaussian distribution (mean ±20%)  
- **Types**: 70% Apartments, 20% Villas, 10% Plots

### 6.3 Requirements (1 sample)

{

  "id": "req-1",

  "raw\_text": "3BHK apartment in Indiranagar, 2200 sqft, budget 5 Cr",

  "parsed\_criteria": {

    "locality\_id": "loc-1",

    "budget\_max": 50000000,

    "type": "apartment",

    "bedroom\_count": 3,

    "min\_area": 2000

  }

}

---

## 7\. User Stories & Acceptance Criteria

### US-1: View Locality Intelligence

**As a** broker  
**I want to** see market intelligence for a locality  
**So that** I can validate if a requirement is realistic

**AC**:

- [ ] User enters requirement  
- [ ] System displays graph with primary \+ nearby localities  
- [ ] User clicks on a locality node  
- [ ] Right panel updates with histograms for that locality  
- [ ] User sees "You are here" marker on price histogram

### US-2: Browse Matching Listings

**As a** broker  
**I want to** see all properties matching a requirement  
**So that** I can shortlist options

**AC**:

- [ ] User clicks "PROCEED" from dashboard  
- [ ] System shows Listings tab with all matches  
- [ ] Each listing card shows: image, BHK, size, price, agent  
- [ ] User can switch to Agents tab  
- [ ] Same data shown grouped by agent

### US-3: Contact Agent for Property

**As a** broker  
**I want to** message an agent about a specific property  
**So that** I can initiate a deal

**AC**:

- [ ] User clicks "Message" on a listing  
- [ ] System creates Thread record  
- [ ] Chat interface opens with context header  
- [ ] User can send messages  
- [ ] Thread is saved to database

---

## 8\. Out of Scope (Future Enhancements)

### Phase 2

- Internet research integration (Serper/Tavily API)  
- Real PostgreSQL database integration  
- WhatsApp message ingestion pipeline  
- Photo uploads and gallery view  
- Advanced filters (parking, furnishing, etc.)

### Phase 3

- Agent performance analytics  
- Automated requirement matching notifications  
- Price trend predictions  
- Mobile app  
- Multi-tenancy for multiple brokerages

---

## 9\. Success Metrics

### MVP Success Criteria

1. Can enter a requirement and see relevant intelligence in \<5 seconds  
2. Can browse and filter 50+ listings efficiently  
3. Can track at least 1 conversation thread per requirement  
4. UI is responsive and intuitive (subjective, but tested with 3+ users)

### Future KPIs

- Time to find matching property (reduce by 50%)  
- Number of deals closed via CRM  
- Agent response time tracking  
- Inventory utilization rate

---

## 10\. Implementation Plan

### Week 1: Setup & Mock Data

- [x] Planning and Specification  
- [ ] Next.js project initialization  
- [ ] Mock data generation script  
- [ ] TypeScript interfaces

### Week 2: Dashboard (Screen 1\)

- [ ] Locality Graph component  
- [ ] Market Intelligence histograms  
- [ ] Tab switching logic  
- [ ] "PROCEED" button integration

### Week 3: Matches View (Screen 2\)

- [ ] Listings tab implementation  
- [ ] Agents tab implementation  
- [ ] Navigation and routing

### Week 4: Thread View (Screen 3\) & Polish

- [ ] Chat interface  
- [ ] Thread creation logic  
- [ ] UI polish and responsiveness  
- [ ] Testing and bug fixes

---

## Appendix A: UI Wireframes

(Reference the uploaded images and the interaction simulation document)

## Appendix B: Sample Data

(Reference the 8 rows of WhatsApp listing data provided)

## Appendix C: Glossary

- **Requirement**: A user's search criteria for a property  
- **Listing**: A property available for sale/rent (from WhatsApp)  
- **Locality**: A geographic area/neighborhood  
- **Thread**: A conversation context linking a requirement to a listing  
- **Agent**: The external broker who owns the listing

