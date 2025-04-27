import React, { useState, useEffect, useCallback } from 'react';
import { AlgorithmStep, AlgorithmSteps, AlgorithmComplexity as AlgorithmComplexityType } from '../../types';
import { getQuickSortSteps, getAlgorithmComplexity } from '../../services/sortingService';
import InputControls from '../common/InputControls';
import AnimationControls from '../common/AnimationControls';
import CodeDisplay from '../common/CodeDisplay';
import ComplexityDisplay from '../common/ComplexityDisplay';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import KidFriendlyQuickSort from './KidFriendlyQuickSort';
import AlgorithmBox from '../common/AlgorithmBox';
import AlgorithmVisualization from '../common/AlgorithmVisualization';
import AlgorithmComplexity from '../common/AlgorithmComplexity';

// Import styled components - TEMPORARY: Ideally migrate these later
import {
  Container,
  Title,
  FlexContainer,
  CodeExplanationSection,
  VisualizationSection,
  Visualization,
  VisualizationHeader,
  LoadingMessage
} from '../../styles/components/dsa/QuickSortLayout.styles'; // Assuming layout styles are needed
import {
  ArrayContainer,
  ArrayBar,
  Legend,
  LegendItem,
  LegendColor
} from '../../styles/components/dsa/QuickSortVisualization.styles'; // Assuming visualization styles are needed

// Mock code for display
const quickSortCode = `
function quickSort(arr, low, high) {
  if (low < high) {
    // pi is partitioning index, arr[pi] is now at right place
    let pi = partition(arr, low, high);

    // Recursively sort elements before partition and after partition
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

function partition(arr, low, high) {
  // Choosing the last element as the pivot
  let pivot = arr[high];
  // Index of smaller element
  let i = low - 1;

  for (let j = low; j < high; j++) {
    // If current element is smaller than the pivot
    if (arr[j] < pivot) {
      i++;
      // Swap arr[i] and arr[j]
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  // Swap arr[i+1] and arr[high] (or pivot)
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1; // Return the partitioning index
}
`;

const QuickSortVisualization: React.FC = () => {
  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  const [complexity, setComplexity] = useState<AlgorithmComplexityType | null>(null); // Use the renamed type
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // 1x speed
  const [isLoading, setIsLoading] = useState(true);
  const learningMode = useSelector((state: RootState) => state.learningMode.learningMode);
  const [currentArray, setCurrentArray] = useState<number[]>([5, 8, 1, 9, 7, 3]); // Store current array separately

  const generateSteps = useCallback((inputArray: number[]) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call:
      // const data = await apiService.fetchQuickSortSteps(inputArray);
      // setSteps(data.steps);

      // Using mock service:
      const data: AlgorithmSteps = getQuickSortSteps([...inputArray]); // Use a copy
      setSteps(data.steps);
      setCurrentStepIndex(0);
      setIsPlaying(false);
      setCurrentArray(inputArray); // Update the current array state
    } catch (error) {
      console.error("Error generating QuickSort steps:", error);
      setSteps([]); // Clear steps on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchComplexity = useCallback(() => {
    try {
      // In a real app, this would be an API call:
      // const complexityData = await apiService.fetchAlgorithmComplexity('quicksort');
      // setComplexity(complexityData);

      // Using mock service:
      const complexityData = getAlgorithmComplexity('quicksort');
      setComplexity(complexityData);
    } catch (error) {
      console.error("Error fetching complexity data:", error);
    }
  }, []); // Removed dependencies as it doesn't depend on component state directly

  // Initial data fetch - Run only once on mount
  useEffect(() => {
    generateSteps(currentArray); // Generate initial steps with initial array
    fetchComplexity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchComplexity]); // Only fetchComplexity is a dependency here, generateSteps is called manually

  // Animation effect
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (isPlaying && currentStepIndex < steps.length - 1) {
      intervalId = setInterval(() => {
        setCurrentStepIndex((prevIndex) => Math.min(prevIndex + 1, steps.length - 1));
      }, 1000 / playbackSpeed); // Adjust interval based on speed
    } else if (currentStepIndex === steps.length - 1) {
      setIsPlaying(false); // Stop playing at the end
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, currentStepIndex, steps.length, playbackSpeed]);

  const handlePlayPause = () => {
    if (currentStepIndex === steps.length - 1) {
      // If at the end, reset and play
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleStepBack = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prevIndex) => Math.min(prevIndex + 1, steps.length - 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    // Optionally, reset to the initial array if desired, or keep the current one
    // generateSteps(initialArray);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
  };

  const handleInputChange = (input: number[]) => {
    generateSteps([...input]); // Generate steps for the new array
  };

  const handleGenerateRandom = () => {
    const randomArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
    generateSteps([...randomArray]);
  };

  const currentStep = steps[currentStepIndex];
  const maxVal = Math.max(...(currentStep?.array || [1])); // Avoid division by zero

  // Determine highlighted lines based on step type (example logic)
  const getHighlightLines = (stepType?: string): number[] => {
    switch (stepType) {
      case 'initial': return [1, 2, 3, 4, 5, 6, 7, 8];
      case 'choosing_pivot': return [12, 13];
      case 'comparing': return [17, 18, 19];
      case 'swapping': return [21, 22, 23];
      case 'placing_pivot': return [26, 27];
      case 'recursive_left': return [6];
      case 'recursive_right': return [7];
      case 'sorted': return [];
      default: return [];
    }
  };

  if (learningMode) {
    // Pass necessary props to KidFriendlyQuickSort
    return (
      <KidFriendlyQuickSort
        steps={steps}
        currentStep={currentStepIndex}
        isPlaying={isPlaying}
        playbackSpeed={playbackSpeed} // Pass playbackSpeed state
        handleNext={handleStepForward}
        handleBack={handleStepBack}
        handlePlay={handlePlayPause}
        handleReset={handleReset}
        onSpeedChange={handleSpeedChange} // Pass speed change handler
      />
    );
  }

  return (
    <AlgorithmBox
      title="Quick Sort"
      description="Quick Sort is a divide-and-conquer algorithm that sorts by partitioning arrays."
    >
      <InputControls onInputChange={handleInputChange} onGenerateRandom={handleGenerateRandom} />
      {isLoading ? (
        <LoadingMessage>Loading visualization...</LoadingMessage>
      ) : !currentStep ? (
        <LoadingMessage>No steps available. Please check input or algorithm.</LoadingMessage>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <CodeDisplay
              code={quickSortCode}
              language="javascript"
              highlightLines={getHighlightLines(currentStep.step_type)}
              currentStep={currentStepIndex}
              codeExplanation={currentStep.description}
            />
          </div>
          <div className="flex-1">
            <AlgorithmVisualization label="Visualization">
              <VisualizationHeader>
                <AnimationControls
                  isPlaying={isPlaying}
                  onPlayPause={handlePlayPause}
                  onStepBack={handleStepBack}
                  onStepForward={handleStepForward}
                  onReset={handleReset}
                  playbackSpeed={playbackSpeed}
                  onSpeedChange={handleSpeedChange}
                  currentStep={currentStepIndex}
                  totalSteps={steps.length}
                />
              </VisualizationHeader>
              <ArrayContainer>
                {currentStep.array.map((value, index) => (
                  <ArrayBar
                    key={index}
                    data-value={value}
                    height={(value / maxVal) * 100}
                    isPivot={index === currentStep.pivot_index}
                    isComparing={currentStep.comparison_indices?.includes(index) ?? false}
                    isSwapping={currentStep.swapped_indices?.includes(index) ?? false}
                    isSorted={currentStep.step_type === 'sorted'}
                  />
                ))}
              </ArrayContainer>
              <Legend>
                <LegendItem><LegendColor color="var(--primary-color)" /> Default</LegendItem>
                <LegendItem><LegendColor color="var(--highlight-color)" /> Pivot</LegendItem>
                <LegendItem><LegendColor color="var(--secondary-color)" /> Comparing</LegendItem>
                <LegendItem><LegendColor color="var(--error-color)" /> Swapping</LegendItem>
                <LegendItem><LegendColor color="var(--success-color)" /> Sorted</LegendItem>
              </Legend>
            </AlgorithmVisualization>
            {complexity && (
              <AlgorithmComplexity 
                time={`Best: ${complexity.timeComplexity.best}, Average: ${complexity.timeComplexity.average}, Worst: ${complexity.timeComplexity.worst}`}
                space={`Best: ${complexity.spaceComplexity.best}, Average: ${complexity.spaceComplexity.average}, Worst: ${complexity.spaceComplexity.worst}`}
              />
            )}
          </div>
        </div>
      )}
    </AlgorithmBox>
  );
};

export default QuickSortVisualization;