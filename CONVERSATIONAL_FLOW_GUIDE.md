# Conversational Flow Guide - Developer Walkthrough

## Overview

The **Conversational Flow** system enables multi-step, adaptive question flows in the chat interface. Users are guided through questions one at a time, and their answers are collected and processed. This guide explains how the components work together with mock data.

## Architecture Overview

```
User Search Query (Chat Page)
           ↓
getMockQuestions() → ConversationalQuestion[]
           ↓
ConversationalFlow (renders questions one by one)
           ↓
ConversationalQuestion (renders specific control type)
           ↓
User Interaction (answers flow back up)
           ↓
onComplete() callback with all answers
```

---

## Core Files and Their Roles

### 1. **src/data/mock-questions.ts** - Data & Types
**Purpose**: Defines question structure and provides mock question sets

**Key Exports**:

```typescript
// Type Definitions
interface ConversationalQuestion {
  id: string;                          // Unique identifier
  question: string;                    // Display text
  controlType: "text" | "select" | "multi-select" | "slider" | "range-slider" | "radio" | "toggle-group" | "community-selection";
  data?: QuestionData;                 // Control-specific data (options, histogram, etc.)
  required: boolean;                   // Validation flag
  helpText?: string;                   // Hint text
  label: string;                       // Field label
}

// Mock Question Arrays (scenario-based)
MOCK_QUESTIONS_3BHK_INDIRANAGAR[]      // For "3bhk indiranagar" search
MOCK_QUESTIONS_VILLA[]                 // For "villa" search
MOCK_QUESTIONS_GENERAL[]               // For other searches

// Helper Function
getMockQuestions(criteria) → ConversationalQuestion[]
```

---

## Component: ConversationalFlow

**File**: `src/components/home/conversational-flow.tsx`

**Purpose**: Orchestrates the question flow - renders one question at a time, tracks progress, manages answer collection

### How It Works - Step by Step

```
┌─────────────────────────────────────────────────────────────────┐
│ ConversationalFlow Component                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│ 1. INITIALIZATION                                                │
│    - Receives array of ConversationalQuestion objects            │
│    - currentIndex = 0 (start at first question)                 │
│    - answers = {} (empty object to collect responses)           │
│                                                                   │
│ 2. RENDER HEADER                                                 │
│    - Show: "Question 1 of 5"                                    │
│    - Display progress bar (animated)                             │
│    - Show close button if onClose callback provided             │
│                                                                   │
│ 3. RENDER CURRENT QUESTION                                       │
│    - Pass questions[currentIndex] to ConversationalQuestion     │
│    - Component renders appropriate UI based on controlType      │
│                                                                   │
│ 4. WAIT FOR USER INTERACTION                                     │
│    - User interacts with control (slider, button, etc.)        │
│    - onAnswer() callback triggered with user's answer          │
│                                                                   │
│ 5. STORE ANSWER                                                  │
│    - answers[questionId] = userAnswer                           │
│    - Check if this is last question                             │
│                                                                   │
│ 6. NEXT QUESTION OR COMPLETE                                     │
│    - If NOT last: currentIndex++ → re-render                    │
│    - If last: Call onComplete(answers) with all collected data  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Key State Variables

```typescript
const [currentIndex, setCurrentIndex] = useState(0)
// Tracks which question is being displayed (0-based)

const [answers, setAnswers] = useState<Record<string, any>>({})
// Accumulates answers: { "req_type": "buy", "budget": [1.5, 2.5], ... }

const [isCollapsed, setIsCollapsed] = useState(false)
// Toggle to collapse/expand the question panel
```

### Key Variables

```typescript
const currentQuestion = questions[currentIndex]
// The question object currently being displayed

const isLastQuestion = currentIndex === questions.length - 1
// Check if we need to move to next or call onComplete

const progress = ((currentIndex + 1) / questions.length) * 100
// Calculate percentage for progress bar (e.g., 20% if Q1 of 5)
```

### The Answer Handler

```typescript
const handleAnswer = (answer: any) => {
  // 1. Create new answers object with current answer
  const updatedAnswers = {
    ...answers,
    [currentQuestion.id]: answer,  // e.g., "req_type": "buy"
  }
  setAnswers(updatedAnswers)

  // 2. Check if this was the last question
  if (isLastQuestion) {
    // All questions answered - call completion callback
    if (onComplete) {
      onComplete(updatedAnswers)  // Send all answers back to parent
    }
  } else {
    // Move to next question
    setCurrentIndex(currentIndex + 1)
  }
}
```

---

## Component: ConversationalQuestion

**File**: `src/components/home/conversational-question.tsx`

**Purpose**: Renders the appropriate UI control based on `controlType`

### Question Types & How They Work

#### 1. **Text Input**
```typescript
controlType: "text"
```
- **Use Case**: Open-ended questions
- **Data Structure**: No special data needed
- **User Input**: String
- **Example**:
```javascript
{
  id: "location_preference",
  question: "Any specific area you prefer?",
  controlType: "text",
  label: "Location Preference"
}
```

---

#### 2. **Radio Group** (Single Select)
```typescript
controlType: "radio"
```
- **Use Case**: Mutually exclusive options
- **Data Structure**:
```javascript
data: {
  options: [
    { value: "buy", label: "Buy", count: 234, icon: "ShoppingCart" },
    { value: "rent", label: "Rent", count: 89, icon: "Key" },
  ],
  marketInsights: "Most properties in this area are for sale"
}
```
- **User Input**: Single value (e.g., "buy")
- **Renders**: Radio buttons with icons, counts, and help text

---

#### 3. **Toggle Group** (Single Select - Visual)
```typescript
controlType: "toggle-group"
```
- **Use Case**: Visual selection from multiple options
- **Data Structure**: Same as radio (options array)
- **User Input**: Single value
- **Renders**: Button-like toggles that highlight when selected
- **Example**:
```javascript
{
  id: "property_type",
  question: "What type of property?",
  controlType: "toggle-group",
  data: {
    options: [
      { value: "apartment", label: "Apartment", count: 298 },
      { value: "villa", label: "Villa", count: 18 },
    ]
  }
}
```

---

#### 4. **Multi-Select** (Multiple Selection)
```typescript
controlType: "multi-select"
```
- **Use Case**: Multiple options allowed
- **Data Structure**: Same as radio/toggle (options array)
- **User Input**: Array of values (e.g., ["apartment", "villa"])
- **Renders**: Checkboxes that can be selected/deselected
- **Features**: Disable "Next" button until at least one selection

---

#### 5. **Slider** (Single Value Range)
```typescript
controlType: "slider"
```
- **Use Case**: Single numeric value selection
- **Data Structure**:
```javascript
data: {
  min: 1,
  max: 10,
  step: 1,
  unit: "years",
  defaultValue: 5
}
```
- **User Input**: Single number
- **Renders**: Horizontal slider with thumb
- **Example**: Budget slider, age range, years experience

---

#### 6. **Range Slider** (Dual Value Range)
```typescript
controlType: "range-slider"
```
- **Use Case**: Select a range (min-max)
- **Data Structure**:
```javascript
data: {
  min: 0.5,
  max: 5,
  step: 0.1,
  unit: "Cr",
  defaultValue: [1.2, 2.5],
  recommendedValue: [1.5, 2.0],
  histogram: [                    // Property distribution chart
    { range: "1-1.5Cr", count: 65, minValue: 1.0, maxValue: 1.5 },
    { range: "1.5-2Cr", count: 120, minValue: 1.5, maxValue: 2.0 },
    // ... more bins
  ],
  marketInsights: "Most properties are 1.5-2.5 Cr"
}
```
- **User Input**: Array of two numbers [min, max]
- **Renders**:
  - Two draggable thumbs
  - Histogram chart showing property distribution
  - Market insight box
  - Min/Max labels
- **Features**:
  - Dual thumbs allow independent adjustment
  - Visual feedback with animations

---

#### 7. **Community Selection** (Card Grid)
```typescript
controlType: "community-selection"
```
- **Use Case**: Browse and select from pre-defined options
- **Data Structure**:
```javascript
data: {
  communities: [
    {
      id: "brigade_metropolis_ind",
      name: "Brigade Metropolis",
      image_url: "https://...",
      neighborhood: "Indiranagar",
      property_count: 45,
      price_range: { min_cr: 2.1, max_cr: 3.2 },
      size_range: { min_bhk: 3, max_bhk: 4 },
      match_score: 95,
      highlights: ["Within budget", "3BHK available"]
    },
    // ... more communities
  ]
}
```
- **User Input**: Array of community IDs (e.g., ["brigade_metropolis_ind", "sobha_city"])
- **Renders**:
  - Tabs organized by neighborhood
  - Cards in grid (3 columns on desktop)
  - Price, size, property count badges
  - Image with selection checkmark
  - Continue/Skip buttons
- **Features**:
  - Multi-select from cards
  - Neighborhood organization
  - Continue button disabled until selection
  - Skip option for optional step

---

## Data Flow Example: Budget Question

Here's a complete walkthrough of one question:

### Question Definition (mock-questions.ts)
```typescript
{
  id: "budget",
  question: "What's your budget range?",
  label: "Budget Range",
  controlType: "range-slider",
  required: true,
  helpText: "Drag to select your budget range. The chart shows property distribution.",
  data: {
    min: 0.5,
    max: 5,
    step: 0.1,
    unit: "Cr",
    defaultValue: [1.2, 2.5],
    recommendedValue: [1.5, 2.0],
    histogram: [
      { range: "1-1.5Cr", count: 65, minValue: 1.0, maxValue: 1.5 },
      { range: "1.5-2Cr", count: 120, minValue: 1.5, maxValue: 2.0 },
      { range: "2-2.5Cr", count: 95, minValue: 2.0, maxValue: 2.5 },
      // ... more bins
    ],
    marketInsights: "Most 3BHK apartments in Indiranagar are priced between 1.5-2.5 Cr"
  }
}
```

### Rendering Flow

```
1. ConversationalFlow renders question #2
   - currentIndex = 1
   - currentQuestion = questions[1] = budget question

2. Pass to ConversationalQuestion component
   - Receives: question object above
   - Detects: controlType === "range-slider"

3. ConversationalQuestion renders:
   - Question title: "What's your budget range?"
   - Help text: "Drag to select..."
   - Layout grid with 2 columns (md:grid-cols-2):
     - LEFT: Histogram chart
       - Title: "Property Distribution"
       - Animated bars showing bin counts
       - X-axis labels: "1-1.5Cr", "1.5-2Cr", etc.
     - RIGHT: Market Insight box
       - Text: "Most 3BHK apartments... 1.5-2.5 Cr"
   - Slider control:
     - Two thumbs (default: [1.2, 2.5])
     - Min/Max labels: "0.5 Cr" / "5 Cr"

4. User drags sliders to [1.8, 2.4]

5. Slider onChange triggers:
   - onValueChange([1.8, 2.4])
   - setAnswer([1.8, 2.4])

6. User clicks "Next" button
   - onClick → handleAnswer([1.8, 2.4])

7. ConversationalFlow.handleAnswer receives:
   - answer = [1.8, 2.4]
   - updatedAnswers = {
       ...previous answers...,
       "budget": [1.8, 2.4]
     }
   - setAnswers(updatedAnswers)
   - currentIndex++ (move to next question)

8. Component re-renders with next question
```

---

## Complete Question Flow Example

### Scenario: User searches for "3bhk indiranagar"

#### Step 1: Chat Page Initialization
```javascript
// chat/page.tsx
const query = searchParams.get('q')  // "3bhk indiranagar"
const criteria = { bhk: 3, location: 'Indiranagar' }
const questions = getMockQuestions(criteria)
// Returns: MOCK_QUESTIONS_3BHK_INDIRANAGAR (5-6 questions)
```

#### Step 2: ConversationalFlow Receives Questions
```javascript
<ConversationalFlow
  questions={questions}  // 5 questions
  onComplete={handleQuestionsComplete}
/>
```

#### Step 3: User Answers Flow
```
Question 1 (ID: "req_type")
├─ Display: "Are you looking to buy or rent?"
├─ Control: Radio buttons
├─ User selects: "buy"
└─ answers = { "req_type": "buy" } → Move to Q2

Question 2 (ID: "budget")
├─ Display: "What's your budget range?"
├─ Control: Range slider with histogram
├─ User selects: [1.5, 2.5]
└─ answers = { "req_type": "buy", "budget": [1.5, 2.5] } → Move to Q3

Question 3 (ID: "property_type")
├─ Display: "What type of property?"
├─ Control: Toggle group
├─ User selects: "apartment"
└─ answers = { ..., "property_type": "apartment" } → Move to Q4

Question 4 (ID: "property_status")
├─ Display: "Ready-to-move or under-construction?"
├─ Control: Toggle group
├─ User selects: "ready_to_move"
└─ answers = { ..., "property_status": "ready_to_move" } → Move to Q5

Question 5 (ID: "furnishing_status")
├─ Display: "Furnishing level preference?"
├─ Control: Toggle group
├─ User selects: "semi_furnished"
└─ answers = { ..., "furnishing_status": "semi_furnished" } → Move to Q6

Question 6 (ID: "community_preference", LAST)
├─ Display: "Gated communities matching your search"
├─ Control: Community selection cards
├─ User selects: ["brigade_metropolis_ind", "sobha_indraprastha_ind"]
└─ answers = { ..., "community_preference": [...] }
   └─ isLastQuestion = true → Call onComplete(answers)
```

#### Step 4: Answers Collection Complete
```javascript
// Final collected answers
{
  "req_type": "buy",
  "budget": [1.5, 2.5],
  "property_type": "apartment",
  "property_status": "ready_to_move",
  "furnishing_status": "semi_furnished",
  "community_preference": ["brigade_metropolis_ind", "sobha_indraprastha_ind"]
}

// Passed to onComplete callback
handleQuestionsComplete(answers) {
  console.log('Answers:', answers)
  // In real app: Send to backend/API
  // Backend uses answers to filter properties and show results
}
```

---

## Integration with Chat Page

### How answers are used (src/app/chat/page.tsx)

```typescript
const handleQuestionsComplete = (answers: Record<string, any>) => {
  console.log('Questions completed with answers:', answers)

  // Add system message
  const systemMessage: Message = {
    id: Date.now().toString(),
    type: 'system',
    content: `Great! I've captured your preferences. Found ${Math.floor(Math.random() * 100) + 20} matching properties.`,
    timestamp: new Date(),
  }
  setMessages((prev) => [...prev, systemMessage])
  setShowQuestions(false)
}
```

In a real application, you would:
1. Send answers to backend API
2. Filter properties based on criteria
3. Display results
4. Allow refinement of criteria

---

## Key Concepts

### 1. Control Types & Their Purpose

| Control Type | Use Case | Input | Example |
|---|---|---|---|
| text | Open-ended | String | Location preference |
| radio | Single choice | String | Buy or Rent |
| toggle-group | Visual single choice | String | Property type |
| multi-select | Multiple options | Array | Amenities |
| slider | Single value | Number | Years experience |
| range-slider | Value range + chart | [Number, Number] | Budget range |
| community-selection | Card browsing | Array | Communities |

### 2. Answer Format

Each answer is stored by question ID:
```javascript
{
  "question_id_1": answerValue,
  "question_id_2": answerValue,
  "question_id_3": answerValue,
}
```

Answer formats vary by control type:
- Text/Radio/Toggle: `"string"`
- Multi-select: `["value1", "value2"]`
- Slider: `number`
- Range-slider: `[number, number]`
- Community-selection: `["id1", "id2"]`

### 3. Progress Tracking

The component automatically:
- Displays current question number
- Shows progress bar (animated)
- Tracks which questions are answered
- Indicates when on the last question

---

## Common Patterns

### Adding a New Question Type

1. **Add to ConversationalQuestion interface** (mock-questions.ts)
2. **Create question data** with appropriate fields
3. **Add rendering logic** in ConversationalQuestion component
4. **Handle answer callback** to capture user input

### Creating Scenario-Based Questions

```typescript
export const MOCK_QUESTIONS_CUSTOM: ConversationalQuestion[] = [
  { /* Q1 */ },
  { /* Q2 */ },
  { /* Q3 */ },
]

// In getMockQuestions()
if (criteria.customType === 'xyz') {
  return MOCK_QUESTIONS_CUSTOM
}
```

### Conditionally Showing Questions

Add a `visible` or `condition` field to show/hide questions based on previous answers. Currently not implemented but could be added.

---

## Debugging & Testing

### Check Current State
```typescript
// Add console logs in ConversationalFlow
console.log('Current index:', currentIndex)
console.log('Current question:', currentQuestion)
console.log('Answers so far:', answers)
console.log('Progress:', progress + '%')
```

### Test Answer Flow
1. Fill out first question
2. Check browser console for answer object
3. Verify next question renders
4. Repeat for all questions
5. Check final answers on completion

### Mock Data Variations
- Try different scenarios: `criteria.bhk`, `criteria.property_type`
- Verify correct question set loaded
- Check histogram data renders correctly

---

## Summary Flow Diagram

```
┌──────────────────────────────────────────────────────────┐
│ User Search Query → Chat Page                             │
└────────────────────┬─────────────────────────────────────┘
                     ↓
┌──────────────────────────────────────────────────────────┐
│ getMockQuestions(criteria) → Question Array              │
└────────────────────┬─────────────────────────────────────┘
                     ↓
┌──────────────────────────────────────────────────────────┐
│ ConversationalFlow                                        │
│ ├─ Render header with progress                           │
│ ├─ Render current question (Q1)                          │
│ └─ Wait for answer...                                    │
└────────────────────┬─────────────────────────────────────┘
                     ↓ (user answers)
┌──────────────────────────────────────────────────────────┐
│ ConversationalQuestion                                    │
│ ├─ Render control based on controlType                   │
│ └─ Emit onAnswer(value) callback                         │
└────────────────────┬─────────────────────────────────────┘
                     ↓ (handleAnswer)
┌──────────────────────────────────────────────────────────┐
│ ConversationalFlow.handleAnswer()                         │
│ ├─ Store answer in answers object                        │
│ ├─ Check if last question                                │
│ └─ Either: currentIndex++ OR: onComplete(answers)       │
└────────────────────┬─────────────────────────────────────┘
                     ↓ (if not last)
┌──────────────────────────────────────────────────────────┐
│ Re-render with next question (Q2)                        │
└────────────────────┬─────────────────────────────────────┘
                     ↓ ... repeat for all questions ...
                     ↓ (when last question answered)
┌──────────────────────────────────────────────────────────┐
│ onComplete(allAnswers) callback triggered                │
│ └─ Send answers to backend/show results                  │
└──────────────────────────────────────────────────────────┘
```

---

## Next Steps for Developers

1. **Understand the flow**: Walk through the diagrams above
2. **Test locally**: Answer all questions and check console logs
3. **Add custom questions**: Create new scenario-based question sets
4. **Connect backend**: Replace mock data with real API calls
5. **Add validation**: Implement conditional questions based on answers
6. **Enhance UX**: Add animations, tooltips, or help modals

