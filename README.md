# DSA & System Design Visualizer

An interactive learning platform to help software engineering interview candidates practice both data structures & algorithms (DSA) and system design concepts through visual learning with a built-in spaced repetition system.

## Features

### DSA Visualization
- Interactive algorithm visualizations with animation controls (play, pause, step, speed)
- Time and space complexity information
- Syntax-highlighted code implementations
- Step-by-step explanations of algorithms
- Custom data input and random data generation

### System Design Visualization
- Interactive system architecture diagrams
- Visual representation of system components and data flow
- Component details on hover/click
- Design considerations and tradeoffs

### Spaced Repetition System
- Daily reviews scheduled based on confidence levels
- Optimized for long-term retention of concepts

## Tech Stack

- **Frontend**: React with TypeScript, Styled Components
- **Backend**: FastAPI with Python
- **Visualization**: Custom rendering with CSS animations

## Getting Started

### Prerequisites
- Node.js (v14+)
- Python (v3.9+)
- npm or yarn

### Installation

#### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create and activate a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run the FastAPI server:
   ```
   uvicorn app.main:app --reload
   ```
   The API will be available at http://localhost:8000

#### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```
   The application will be available at http://localhost:3000

## Project Structure

```
dsa-system-design-visualizer/
├── frontend/                      # React + TypeScript frontend
│   ├── public/                    # Static files
│   └── src/
│       ├── components/
│       │   ├── dsa/               # DSA visualizations
│       │   ├── systemDesign/      # System Design visualizations  
│       │   ├── common/            # Shared components
│       │   └── layout/            # Layout components
│       ├── types/                 # TypeScript type definitions
│       └── App.tsx                # Main application component
├── backend/                       # FastAPI backend
│   ├── app/
│   │   ├── algorithms/            # DSA algorithm implementations
│   │   ├── system_design/         # System design templates
│   │   ├── models/                # Data models and schemas
│   │   ├── routes/                # API endpoints
│   │   └── main.py                # FastAPI application
│   └── requirements.txt           # Python dependencies
└── README.md                      # Project documentation
```

## Current Implementation

1. **Algorithms**
   - Quick Sort (complete implementation with animation)
   - More algorithms coming soon

2. **System Designs**
   - URL Shortener (complete implementation)
   - More system designs coming soon

## License

This project is licensed under the MIT License.