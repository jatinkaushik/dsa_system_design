from pydantic import BaseModel
from typing import List, Optional, Dict, Any, Union

class SortingRequest(BaseModel):
    array: List[int]

class AlgorithmStep(BaseModel):
    array: List[int]
    current_index: int
    pivot_index: Optional[int] = None
    comparison_indices: Optional[List[int]] = None
    swapped_indices: Optional[List[int]] = None
    description: str
    step_type: str  # Uncommented this field to enable step-based highlighting

class AlgorithmSteps(BaseModel):
    steps: List[AlgorithmStep]

class Position(BaseModel):
    x: int
    y: int

class SystemDesignComponent(BaseModel):
    id: str
    type: str
    name: str
    description: str
    position: Position

class SystemDesignConnection(BaseModel):
    id: str
    source_id: str
    target_id: str
    label: Optional[str] = None
    type: str

class SystemDesignTemplate(BaseModel):
    id: str
    name: str
    description: str
    category: str
    components: List[SystemDesignComponent]
    connections: List[SystemDesignConnection]

class ReviewItem(BaseModel):
    id: str
    type: str  # 'algorithm' or 'systemDesign'
    name: str
    last_reviewed: str
    due_date: str
    confidence_level: int  # 1-5 scale