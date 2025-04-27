import React from 'react';

interface AnimationControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onStepBack: () => void;
  onStepForward: () => void;
  onReset: () => void;
  playbackSpeed: number;
  onSpeedChange: (speed: number) => void;
  currentStep: number;
  totalSteps: number;
}

const AnimationControls: React.FC<AnimationControlsProps> = ({
  isPlaying,
  onPlayPause,
  onStepBack,
  onStepForward,
  onReset,
  playbackSpeed,
  onSpeedChange,
  currentStep,
  totalSteps
}) => {
  return (
    <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center">
        <div className="font-medium text-sm text-gray-700">Animation Controls</div>
        <div className="text-xs text-gray-500">Step {currentStep + 1} of {totalSteps}</div>
      </div>
      
      <div className="flex items-center gap-2 mt-1">
        <button 
          onClick={onReset}
          className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          title="Reset"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 2v6h6"></path>
            <path d="M3 13a9 9 0 1 0 3-7.7L3 8"></path>
          </svg>
        </button>
        
        <button 
          onClick={onStepBack}
          className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          title="Step Back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        
        <button 
          onClick={onPlayPause}
          className="p-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          )}
        </button>
        
        <button 
          onClick={onStepForward}
          className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          title="Step Forward"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
        
        <div className="ml-4 flex items-center gap-2">
          <span className="text-xs text-gray-500">Speed:</span>
          <select 
            value={playbackSpeed} 
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="border border-gray-300 rounded text-xs p-1"
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
        <div 
          className="bg-primary h-1.5 rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default AnimationControls;