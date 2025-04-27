import React from 'react';
import styled from 'styled-components';

interface AnimationControlsProps {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onSpeedChange: (speed: number) => void;
  onReset: () => void;
}

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  
  &:hover {
    background-color: #3a5a84;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const SpeedControl = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  gap: 0.5rem;
`;

const SpeedLabel = styled.label`
  font-size: 0.9rem;
  color: #555;
`;

const SpeedSelect = styled.select`
  padding: 0.3rem;
  border-radius: 4px;
  border: 1px solid var(--border-color);
`;

const ProgressInfo = styled.div`
  margin-left: auto;
  font-size: 0.9rem;
  color: #555;
`;

const AnimationControls: React.FC<AnimationControlsProps> = ({
  isPlaying,
  currentStep,
  totalSteps,
  speed,
  onPlay,
  onPause,
  onStepForward,
  onStepBackward,
  onSpeedChange,
  onReset
}) => {
  const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSpeedChange(parseFloat(e.target.value));
  };
  
  return (
    <ControlsContainer>
      <ButtonGroup>
        <Button onClick={onReset} title="Reset">
          ⟲
        </Button>
        <Button onClick={onStepBackward} disabled={currentStep === 0} title="Step Backward">
          ⟨
        </Button>
        {isPlaying ? (
          <Button onClick={onPause} title="Pause">
            ⏸️
          </Button>
        ) : (
          <Button onClick={onPlay} disabled={currentStep === totalSteps - 1} title="Play">
            ▶️
          </Button>
        )}
        <Button onClick={onStepForward} disabled={currentStep === totalSteps - 1} title="Step Forward">
          ⟩
        </Button>
      </ButtonGroup>
      
      <SpeedControl>
        <SpeedLabel>Speed:</SpeedLabel>
        <SpeedSelect value={speed} onChange={handleSpeedChange}>
          <option value="0.5">0.5x</option>
          <option value="1">1x</option>
          <option value="2">2x</option>
          <option value="4">4x</option>
        </SpeedSelect>
      </SpeedControl>
      
      <ProgressInfo>
        Step {currentStep + 1} of {totalSteps}
      </ProgressInfo>
    </ControlsContainer>
  );
};

export default AnimationControls;