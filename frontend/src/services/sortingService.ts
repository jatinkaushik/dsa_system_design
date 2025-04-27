import { AlgorithmStep, AlgorithmSteps, AlgorithmComplexity } from '../types';

// QuickSort Algorithm Implementation
export const quickSort = (array: number[], low = 0, high = array.length - 1, steps: AlgorithmStep[] = []) => {
  if (low < high) {
    // First record the initial state of this recursive call
    if (steps.length === 0) {
      steps.push({
        array: [...array],
        current_index: low,
        pivot_index: high,
        comparison_indices: null,
        swapped_indices: null,
        description: "Initial array state.",
        step_type: "initial"
      });
    }

    // Choose pivot (last element)
    const pivotValue = array[high];
    steps.push({
      array: [...array],
      current_index: low,
      pivot_index: high,
      comparison_indices: null,
      swapped_indices: null,
      description: `Choosing pivot element ${pivotValue} (last element of current subarray).`,
      step_type: "choosing_pivot"
    });

    // Partition the array
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      // Comparing current element with pivot
      steps.push({
        array: [...array],
        current_index: j,
        pivot_index: high,
        comparison_indices: [j, high],
        swapped_indices: null,
        description: `Comparing element ${array[j]} with pivot ${pivotValue}.`,
        step_type: "comparing"
      });
      
      if (array[j] < pivotValue) {
        i++;
        
        // Only record a swap if i and j are different positions
        if (i !== j) {
          // Swap array[i] and array[j]
          steps.push({
            array: [...array],
            current_index: j,
            pivot_index: high,
            comparison_indices: null,
            swapped_indices: [i, j],
            description: `${array[j]} is less than pivot. Swapping elements at positions ${i} (${array[i]}) and ${j} (${array[j]}).`,
            step_type: "swapping"
          });
          
          [array[i], array[j]] = [array[j], array[i]];
          
          steps.push({
            array: [...array],
            current_index: j,
            pivot_index: high,
            comparison_indices: null,
            swapped_indices: null,
            description: `After swap, array is now [${array.join(', ')}].`,
            step_type: "comparing" // This is not a separate step type, just showing the state after swap
          });
        } else {
          // If i and j are the same, we're just marking this element as "smaller than pivot"
          steps.push({
            array: [...array],
            current_index: j,
            pivot_index: high,
            comparison_indices: null,
            swapped_indices: null,
            description: `${array[j]} is less than pivot. Element is already in correct position.`,
            step_type: "comparing"
          });
        }
      } else {
        // Element is greater than or equal to pivot, no swap needed
        steps.push({
          array: [...array],
          current_index: j,
          pivot_index: high,
          comparison_indices: null,
          swapped_indices: null,
          description: `${array[j]} is greater than or equal to pivot. No swap needed.`,
          step_type: "comparing"
        });
      }
    }
    
    // Swap the pivot element with the element at position i+1
    const pivotPosition = i + 1;
    
    if (pivotPosition !== high) {
      steps.push({
        array: [...array],
        current_index: high,
        pivot_index: high,
        comparison_indices: null,
        swapped_indices: [pivotPosition, high],
        description: `Placing pivot in its correct position by swapping elements at positions ${pivotPosition} (${array[pivotPosition]}) and ${high} (${array[high]}).`,
        step_type: "placing_pivot"
      });
      
      [array[pivotPosition], array[high]] = [array[high], array[pivotPosition]];
      
      steps.push({
        array: [...array],
        current_index: null,
        pivot_index: pivotPosition,
        comparison_indices: null,
        swapped_indices: null,
        description: `Pivot element ${pivotValue} is now at its final sorted position ${pivotPosition}. Elements to the left are smaller and elements to the right are larger.`,
        step_type: "placing_pivot"
      });
    } else {
      steps.push({
        array: [...array],
        current_index: null,
        pivot_index: pivotPosition,
        comparison_indices: null,
        swapped_indices: null,
        description: `Pivot element ${pivotValue} is already at its final sorted position ${pivotPosition}.`,
        step_type: "placing_pivot"
      });
    }
    
    // Recursively sort the left subarray
    if (low < pivotPosition - 1) {
      steps.push({
        array: [...array],
        current_index: null,
        pivot_index: null,
        comparison_indices: [low, pivotPosition - 1],
        swapped_indices: null,
        description: `Recursively sorting the left subarray from index ${low} to ${pivotPosition - 1}.`,
        step_type: "recursive_left"
      });
      
      quickSort(array, low, pivotPosition - 1, steps);
    }
    
    // Recursively sort the right subarray
    if (pivotPosition + 1 < high) {
      steps.push({
        array: [...array],
        current_index: null,
        pivot_index: null,
        comparison_indices: [pivotPosition + 1, high],
        swapped_indices: null,
        description: `Recursively sorting the right subarray from index ${pivotPosition + 1} to ${high}.`,
        step_type: "recursive_right"
      });
      
      quickSort(array, pivotPosition + 1, high, steps);
    }
  }
  
  // If we're at the top-level call, add a final step
  if (low === 0 && high === array.length - 1) {
    steps.push({
      array: [...array],
      current_index: null,
      pivot_index: null,
      comparison_indices: null,
      swapped_indices: null,
      description: "Array is now fully sorted!",
      step_type: "sorted"
    });
  }
  
  return steps;
};

// Service functions that would normally be called from the backend
export const getQuickSortSteps = (array: number[]): AlgorithmSteps => {
  // Create a copy of the array to work with
  const arrayCopy = [...array];
  const steps = quickSort(arrayCopy);
  
  return { steps };
};

export const getAlgorithmComplexity = (algorithm: string): AlgorithmComplexity => {
  if (algorithm.toLowerCase() === 'quicksort') {
    return {
      name: 'Quick Sort',
      timeComplexity: {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n²)'
      },
      spaceComplexity: {
        best: 'O(log n)',
        average: 'O(log n)',
        worst: 'O(n)'
      },
      description: 'QuickSort is a divide-and-conquer algorithm that works by selecting a "pivot" element and partitioning the array around the pivot.'
    };
  }
  
  throw new Error(`Algorithm complexity data not available for ${algorithm}`);
};