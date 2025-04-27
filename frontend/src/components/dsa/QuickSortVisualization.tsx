import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { AlgorithmStep, AlgorithmComplexity } from '../../types';
import AnimationControls from '../common/AnimationControls.tsx';
import ComplexityDisplay from '../common/ComplexityDisplay.tsx';
import CodeDisplay from '../common/CodeDisplay.tsx';
import InputControls from '../common/InputControls.tsx';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
`;

const Visualization = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const VisualizationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const StepDescription = styled.div`
  background-color: #f8f9fa;
  padding: 0.75rem;
  border-radius: 4px;
  border-left: 4px solid var(--primary-color);
  margin-bottom: 1.5rem;
  font-size: 1rem;
`;

const ArrayContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 200px;
  gap: 2px;
  margin-top: 1rem;
`;

interface ArrayBarProps {
  height: number;
  isPivot: boolean;
  isComparing: boolean;
  isSwapping: boolean;
  isSorted: boolean;
}

const ArrayBar = styled.div<ArrayBarProps>`
  flex: 1;
  background-color: ${(props) => {
    if (props.isPivot) return 'var(--highlight-color)';
    if (props.isSwapping) return 'var(--error-color)';
    if (props.isComparing) return 'var(--secondary-color)';
    if (props.isSorted) return 'var(--success-color)';
    return 'var(--primary-color)';
  }};
  height: ${(props) => `${props.height}%`};
  border-radius: 2px 2px 0 0;
  position: relative;
  transition: all 0.3s ease;
  
  &::after {
    content: attr(data-value);
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.75rem;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

// Sample QuickSort implementation code for display
const quickSortCode = `function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  
  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];
  
  // Partition the array
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  
  // Recursively sort the sub-arrays
  return [...quickSort(left), pivot, ...quickSort(right)];
}`;

const QuickSortVisualization: React.FC = () => {
  const [array, setArray] = useState<number[]>([64, 34, 25, 12, 22, 11, 90]);
  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [loading, setLoading] = useState(false);
  const [complexity, setComplexity] = useState<AlgorithmComplexity>({
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
  });
  
  const animationRef = useRef<number | null>(null);
  
  const API_URL = 'http://localhost:8000/api';
  
  const fetchAlgorithmSteps = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/algorithms/sort/quicksort`, {
        array
      });
      setSteps(response.data.steps);
      setCurrentStep(0);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching algorithm steps:', error);
      setLoading(false);
      // If the API call fails, generate a simple step for display
      setSteps([
        {
          array: array,
          current_index: 0,
          pivot_index: null,
          comparison_indices: null,
          swapped_indices: null,
          description: "API not available. Connect to the backend server to see the full visualization."
        }
      ]);
    }
  }, [array, API_URL]);
  
  const fetchComplexityData = async () => {
    try {
      const response = await axios.get(`${API_URL}/algorithms/complexity/quicksort`);
      setComplexity(response.data);
    } catch (error) {
      console.error('Error fetching complexity data:', error);
      // Keep using the default complexity data
    }
  };
  
  useEffect(() => {
    // Load the initial algorithm data
    fetchAlgorithmSteps();
    fetchComplexityData();
    
    // Store the ref in a variable inside the effect (not in the cleanup)
    // so it's captured in the closure and doesn't change by the time cleanup runs
    const currentAnimationRef = animationRef.current;
    
    return () => {
      if (currentAnimationRef) {
        cancelAnimationFrame(currentAnimationRef);
      }
    };
  }, [fetchAlgorithmSteps]);
  
  const handleInputChange = (newArray: number[]) => {
    setArray(newArray);
    setIsPlaying(false);
    
    // Fetch new algorithm steps for the new array
    setTimeout(() => {
      fetchAlgorithmSteps();
    }, 0);
  };
  
  const handleGenerateRandom = () => {
    // Generate a random array of 5-15 numbers between 1 and 100
    const length = Math.floor(Math.random() * 11) + 5; // 5 to 15 elements
    const randomArray = Array.from({ length }, () => Math.floor(Math.random() * 100) + 1);
    
    handleInputChange(randomArray);
  };
  
  const handleStepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsPlaying(false);
    }
  };
  
  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
  };
  
  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };
  
  // Animation effect
  useEffect(() => {
    if (!isPlaying || currentStep >= steps.length - 1) {
      return;
    }
    
    const animate = () => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          setIsPlaying(false);
          return prev;
        }
      });
    };
    
    // Calculate delay based on playback speed
    const delay = 1000 / playbackSpeed;
    const timeout = setTimeout(animate, delay);
    
    return () => clearTimeout(timeout);
  }, [isPlaying, currentStep, steps.length, playbackSpeed]);
  
  const calculateBarHeight = (value: number) => {
    const maxValue = Math.max(...steps[currentStep].array);
    return (value / maxValue) * 100;
  };
  
  return (
    <Container>
      <Title>Quick Sort Visualization</Title>
      
      <InputControls 
        onInputChange={handleInputChange}
        onGenerateRandom={handleGenerateRandom}
      />
      
      {loading ? (
        <LoadingMessage>Loading visualization...</LoadingMessage>
      ) : (
        <>
          <AnimationControls
            isPlaying={isPlaying}
            currentStep={currentStep}
            totalSteps={steps.length}
            speed={playbackSpeed}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onStepForward={handleStepForward}
            onStepBackward={handleStepBackward}
            onSpeedChange={handleSpeedChange}
            onReset={handleReset}
          />
          
          <Visualization>
            <VisualizationHeader>
              <h2>Array Visualization</h2>
            </VisualizationHeader>
            
            {steps.length > 0 && (
              <>
                <StepDescription>
                  {steps[currentStep].description}
                </StepDescription>
                
                <ArrayContainer>
                  {steps[currentStep].array.map((value, index) => {
                    const isPivot = steps[currentStep].pivot_index === index;
                    const isComparing = steps[currentStep].comparison_indices?.includes(index) || false;
                    const isSwapping = steps[currentStep].swapped_indices?.includes(index) || false;
                    const isSorted = currentStep === steps.length - 1;
                    
                    return (
                      <ArrayBar
                        key={index}
                        height={calculateBarHeight(value)}
                        isPivot={isPivot}
                        isComparing={isComparing}
                        isSwapping={isSwapping}
                        isSorted={isSorted}
                        data-value={value}
                      />
                    );
                  })}
                </ArrayContainer>
              </>
            )}
          </Visualization>
          
          <ComplexityDisplay complexity={complexity} />
          
          <CodeDisplay code={quickSortCode} language="javascript" />
        </>
      )}
    </Container>
  );
};

export default QuickSortVisualization;