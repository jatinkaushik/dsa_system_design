from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import algorithms, system_design

app = FastAPI(title="DSA & System Design Visualizer API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(algorithms.router, prefix="/api/algorithms", tags=["algorithms"])
app.include_router(system_design.router, prefix="/api/system-design", tags=["system-design"])

@app.get("/")
async def root():
    return {"message": "Welcome to DSA & System Design Visualizer API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)