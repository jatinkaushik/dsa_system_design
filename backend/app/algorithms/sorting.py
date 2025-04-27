from app.models.schemas import AlgorithmStep, AlgorithmSteps, SortingRequest
from typing import List

def quicksort(array: List[int]) -> AlgorithmSteps:
    """
    Implementation of Quick Sort algorithm that tracks each step
    for visualization purposes.
    """
    steps = []
    
    # Create an initial step showing the starting array
    steps.append(AlgorithmStep(
        array=array.copy(),
        current_index=0,
        pivot_index=None,
        comparison_indices=None,
        swapped_indices=None,
        description="Initial array state",
        step_type="initial"
    ))
    
    # Call the recursive quicksort helper function
    _quicksort_helper(array, 0, len(array) - 1, steps)
    
    # Add a final step showing the sorted array
    steps.append(AlgorithmStep(
        array=array.copy(),
        current_index=0,
        pivot_index=None,
        comparison_indices=None,
        swapped_indices=None,
        description="Array successfully sorted",
        step_type="sorted"
    ))
    
    return AlgorithmSteps(steps=steps)

def _quicksort_helper(array: List[int], low: int, high: int, steps: List[AlgorithmStep]) -> None:
    """Helper function for quicksort implementation."""
    if low < high:
        # Partition the array and get the pivot index
        pivot_index = _partition(array, low, high, steps)
        
        # Recursively sort the elements before and after the pivot
        # Add step for recursive left sorting
        if low < pivot_index - 1:
            steps.append(AlgorithmStep(
                array=array.copy(),
                current_index=low,
                pivot_index=pivot_index,
                comparison_indices=None,
                swapped_indices=None,
                description=f"Recursively sorting elements from index {low} to {pivot_index - 1}",
                step_type="recursive_left"
            ))
        
        _quicksort_helper(array, low, pivot_index - 1, steps)
        
        # Add step for recursive right sorting
        if pivot_index + 1 < high:
            steps.append(AlgorithmStep(
                array=array.copy(),
                current_index=pivot_index + 1,
                pivot_index=pivot_index,
                comparison_indices=None,
                swapped_indices=None,
                description=f"Recursively sorting elements from index {pivot_index + 1} to {high}",
                step_type="recursive_right"
            ))
        
        _quicksort_helper(array, pivot_index + 1, high, steps)

def _partition(array: List[int], low: int, high: int, steps: List[AlgorithmStep]) -> int:
    """Partition function for quicksort that tracks each comparison and swap."""
    # Choose the rightmost element as the pivot
    pivot = array[high]
    
    # Add step showing the pivot selection
    steps.append(AlgorithmStep(
        array=array.copy(),
        current_index=low,
        pivot_index=high,
        comparison_indices=None,
        swapped_indices=None,
        description=f"Selected {pivot} as pivot (rightmost element)",
        step_type="choosing_pivot"
    ))
    
    # Index of smaller element
    i = low - 1
    
    # Traverse through all elements and compare with pivot
    for j in range(low, high):
        # Add step showing the current comparison
        steps.append(AlgorithmStep(
            array=array.copy(),
            current_index=j,
            pivot_index=high,
            comparison_indices=[j, high],
            swapped_indices=None,
            description=f"Comparing {array[j]} with pivot {pivot}",
            step_type="comparing"
        ))
        
        # If current element is smaller than the pivot
        if array[j] <= pivot:
            # Increment index of smaller element
            i += 1
            
            # Swap elements
            if i != j:
                array[i], array[j] = array[j], array[i]
                
                # Add step showing the swap
                steps.append(AlgorithmStep(
                    array=array.copy(),
                    current_index=j,
                    pivot_index=high,
                    comparison_indices=None,
                    swapped_indices=[i, j],
                    description=f"Swapped {array[i]} and {array[j]} since {array[i]} ≤ {pivot}",
                    step_type="swapping"
                ))
            else:
                # Add step showing no swap was needed
                steps.append(AlgorithmStep(
                    array=array.copy(),
                    current_index=j,
                    pivot_index=high,
                    comparison_indices=None,
                    swapped_indices=None,
                    description=f"Element {array[j]} ≤ {pivot}, no swap needed",
                    step_type="comparing"
                ))
    
    # Swap the pivot element with the element at (i + 1)
    array[i + 1], array[high] = array[high], array[i + 1]
    
    # Add step showing the pivot swap
    steps.append(AlgorithmStep(
        array=array.copy(),
        current_index=high,
        pivot_index=i + 1,
        comparison_indices=None,
        swapped_indices=[i + 1, high],
        description=f"Placed pivot {pivot} in its correct position",
        step_type="placing_pivot"
    ))
    
    # Return the pivot's final position
    return i + 1