# Real Estate CRM Development Guidelines

## Development Rules

### 1. Component Library
Always use **shadcn UI components only**. Before creating any new component:
- Check [https://ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components)
- Only create custom components if not available in shadcn
- Leverage Radix primitives for accessibility and consistency

### 2. Animation Explanations
Always **explain Framer Motion code** when used. Reference [Motion.dev Docs](https://motion.dev/docs):
- Add comments describing motion behavior
- Document animation timings and easing
- Explain gesture interactions
- Use motion.dev as the primary learning resource for animation concepts

### 3. Project Adherence
Build strictly according to the [Real Estate CRM - Product Specification.md](./Real%20Estate%20CRM%20-%20Product%20Specification.md)

### 4. Learning-First Approach
This project is a **learning exercise** for React and Next.js. Follow this methodology:

**Student proposes first**:
- Share your approach/solution to each problem before implementation
- Attempt to solve problems independently first

**Guide, don't solve**:
- Point out flaws, anti-patterns, or issues in your proposed approach
- Ask leading questions to help you discover better solutions
- Explain *why* something is problematic, not just *what* is wrong

**Provide answer after discussion**:
- Full solutions given after you've attempted and learned from mistakes
- Reasoning behind correct approaches explained
- References to React/Next.js best practices and documentation provided

**Goal**: Build the entire Real Estate CRM project through this teaching methodology

---

## Project Summary (5 Points)

1. **Purpose**: Locality-centric Real Estate CRM that intelligently matches property requirements (demand) with listings (supply) using graph-based locality models and market intelligence

2. **Problem Solved**: Real estate brokers currently waste time manually searching WhatsApp, spreadsheets, and personal contacts for matching properties—this CRM automates the matching process

3. **Core Features**:
   - Graph-based locality exploration (click nodes to explore neighboring areas)
   - Market intelligence dashboard (price/size histograms, type distribution)
   - Requirement-to-listing matching based on locality, price, size, type
   - Agent communication threads with context tracking

4. **Tech Stack**: Next.js 14+, TypeScript, Tailwind CSS, Shadcn UI, Recharts, React Context

5. **Main User Flow**:
   - Enter natural language requirement → Parse into structured criteria
   - Explore locality graph with market intelligence → Select locality and proceed
   - Browse matched listings (Listings or Agents tab view) → Message agent to initiate deal
   - Chat interface with requirement + listing context preserved in thread
