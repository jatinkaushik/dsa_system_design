from fastapi import APIRouter, HTTPException
from app.models.schemas import SortingRequest, AlgorithmSteps
from app.algorithms.sorting import quicksort

router = APIRouter()

@router.post("/sort/quicksort", response_model=AlgorithmSteps)
async def run_quicksort(request: SortingRequest):
    """
    Generate step-by-step visualization data for QuickSort algorithm.
    """
    try:
        # Validate input
        if not request.array:
            raise HTTPException(status_code=400, detail="Empty array provided")
        
        # Run the quicksort algorithm and return the steps
        result = quicksort(request.array)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@router.get("/complexity/quicksort")
async def get_quicksort_complexity():
    """
    Return the time and space complexity information for QuickSort.
    """
    return {
        "name": "Quick Sort",
        "timeComplexity": {
            "best": "O(n log n)",
            "average": "O(n log n)",
            "worst": "O(n²)"
        },
        "spaceComplexity": {
            "best": "O(log n)",
            "average": "O(log n)",
            "worst": "O(n)"
        },
        "description": "QuickSort is a divide-and-conquer algorithm that works by selecting a 'pivot' element and partitioning the array around the pivot. The key process is the partition() function."
    }