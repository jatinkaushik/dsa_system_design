// Algorithm Visualization Types
export interface SortingArray {
  array: number[];
}

export interface AlgorithmStep {
  array: number[];
  current_index: number | null;
  pivot_index?: number | null;
  comparison_indices?: number[] | null;
  swapped_indices?: number[] | null;
  description: string;
  step_type?: string;
}

export interface AlgorithmSteps {
  steps: AlgorithmStep[];
}

export interface AlgorithmComplexity {
  name: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  description: string;
}

// System Design Types
export interface Position {
  x: number;
  y: number;
}

export interface SystemDesignComponent {
  id: string;
  type: string;
  name: string;
  description: string;
  position: Position;
}

export interface SystemDesignConnection {
  id: string;
  source_id: string;
  target_id: string;
  label?: string;
  type: string;
}

export interface SystemDesignTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  components: SystemDesignComponent[];
  connections: SystemDesignConnection[];
}

export interface SystemDesignTemplateInfo {
  id: string;
  name: string;
  description: string;
  category: string;
}

// Review and Spaced Repetition Types
export interface ReviewItem {
  id: string;
  type: 'algorithm' | 'systemDesign';
  name: string;
  lastReviewed: Date;
  dueDate: Date;
  confidenceLevel: number; // 1-5 scale
}

// Animation Control Types
export interface AnimationControls {
  playing: boolean;
  speed: number;
  currentStep: number;
  totalSteps: number;
}