import React, { useState, useEffect } from 'react';
import { AlgorithmStep } from '../../types'; // Import AlgorithmStep type
import {
  KidFriendlyContainer,
  CharacterContainer,
  CharacterImage,
  SpeechBubble,
  InteractiveExample,
  SpeedControlButton // Import the new styled component
} from '../../styles/components/dsa/KidFriendlyMode.styles';
// Remove getQuickSortSteps import as steps will be passed via props
// import { getQuickSortSteps } from '../../services/sortingService';

const funColors = [
  '#FFB347', '#FF6961', '#77DD77', '#AEC6CF', '#F49AC2', '#B39EB5', '#FFD700', '#FF6F61', '#6EC6FF', '#C1E1C1'
];

const mascotMessages: Record<string, string> = {
  initial: "Let's start sorting our candies!",
  choosing_pivot: "Pick a special candy (the helper) to help us split the group!",
  comparing: "Let's see if this candy is smaller than our helper.",
  swapping: "Time to swap places! Watch the candies jump!",
  placing_pivot: "Our helper candy goes to its perfect spot!",
  recursive_left: "Let's sort the left side now!",
  recursive_right: "Now, let's sort the right side!",
  sorted: "Yay! All candies are sorted! Great job! 🎉"
};

const getStepTitle = (stepType?: string) => {
  switch (stepType) {
    case 'choosing_pivot': return 'Choosing the Helper Candy';
    case 'comparing': return 'Comparing Candies';
    case 'swapping': return 'Swapping Candies!';
    case 'placing_pivot': return 'Placing the Helper';
    case 'recursive_left': return 'Sort Left Side';
    case 'recursive_right': return 'Sort Right Side';
    case 'sorted': return 'All Done!';
    default: return 'Let’s Sort!';
  }
};

// Define props interface
interface KidFriendlyQuickSortProps {
  steps: AlgorithmStep[];
  currentStep: number;
  isPlaying: boolean;
  playbackSpeed: number; // Add playbackSpeed prop
  handleNext: () => void;
  handleBack: () => void;
  handlePlay: () => void;
  handleReset: () => void;
  onSpeedChange: (speed: number) => void; // Add onSpeedChange prop
}

const KidFriendlyQuickSort: React.FC<KidFriendlyQuickSortProps> = ({
  steps,
  currentStep,
  isPlaying,
  playbackSpeed, // Destructure new prop
  handleNext,
  handleBack,
  handlePlay,
  handleReset,
  onSpeedChange // Destructure new prop
}) => {
  const [isCelebrating, setIsCelebrating] = useState(false); // Keep celebration state local

  // Update celebration logic based on props
  useEffect(() => {
    if (currentStep === steps.length - 1) {
      setIsCelebrating(true);
    } else {
      setIsCelebrating(false);
    }
  }, [currentStep, steps.length]);


  const step = steps[currentStep] || {};
  const maxVal = Math.max(...(step.array || [1]));

  // Animation helpers
  const getCandyStyle = (idx: number) => {
    let style: React.CSSProperties = {
      height: `${((step.array?.[idx] || 1) / maxVal) * 120 + 40}px`,
      background: funColors[idx % funColors.length],
      borderRadius: '18px',
      width: 38,
      margin: '0 8px',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: 20,
      color: '#fff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      transition: 'all 0.5s cubic-bezier(.68,-0.55,.27,1.55)',
      position: 'relative',
      border: idx === step.pivot_index ? '4px solid #FFD700' : '2px solid #fff',
      transform: step.swapped_indices?.includes(idx)
        ? 'translateY(-18px) scale(1.1)'
        : step.comparison_indices?.includes(idx)
        ? 'scale(1.08)'
        : 'none',
      zIndex: step.pivot_index === idx ? 2 : 1
    };
    return style;
  };

  return (
    <KidFriendlyContainer>
      <div style={{
        background: '#FFD700',
        color: '#B22222',
        fontWeight: 'bold',
        fontSize: 22,
        padding: '10px 0',
        borderRadius: 12,
        textAlign: 'center',
        marginBottom: 16,
        letterSpacing: 1,
        boxShadow: '0 2px 8px rgba(255,215,0,0.15)'
      }}>
        🎈 Kid Mode is ON! 🎈
      </div>
      {/* {console.log('KidFriendlyQuickSort rendered!')} */}
      <CharacterContainer>
        <CharacterImage />
        <SpeechBubble>
          <h3>{getStepTitle(step.step_type)}</h3>
          <p>{mascotMessages[step.step_type || 'initial']}</p>
          <p style={{ fontSize: 15, color: '#888' }}>{step.description}</p>
        </SpeechBubble>
      </CharacterContainer>
      <InteractiveExample>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', minHeight: 180, marginBottom: 24 }}>
          {(step.array || []).map((val: number, idx: number) => (
            <div key={idx} style={getCandyStyle(idx)}>
              🍬
              <span style={{ position: 'absolute', bottom: -28, left: 0, right: 0, textAlign: 'center', color: '#333', fontWeight: 600, fontSize: 16 }}>{val}</span>
              {step.pivot_index === idx && <span style={{ position: 'absolute', top: -28, left: 0, right: 0, textAlign: 'center', color: '#FFD700', fontWeight: 700, fontSize: 18 }}>⭐</span>}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 12, flexWrap: 'wrap' }}>
          {/* Use handlers from props */}
          <button onClick={handleBack} disabled={currentStep === 0} style={{ fontSize: 22, padding: '8px 18px', borderRadius: 12, background: '#FFD700', border: 'none', marginRight: 8, opacity: currentStep === 0 ? 0.5 : 1 }}>⏮️ Back</button>
          <button onClick={handlePlay} style={{ fontSize: 22, padding: '8px 18px', borderRadius: 12, background: '#77DD77', border: 'none', marginRight: 8 }}>{isPlaying ? '⏸️ Pause' : '▶️ Play'}</button>
          <button onClick={handleNext} disabled={currentStep === steps.length - 1} style={{ fontSize: 22, padding: '8px 18px', borderRadius: 12, background: '#FFD700', border: 'none', opacity: currentStep === steps.length - 1 ? 0.5 : 1 }}>Next ⏭️</button>
          <button onClick={handleReset} style={{ fontSize: 18, padding: '8px 12px', borderRadius: 10, background: '#AEC6CF', border: 'none', marginLeft: 8 }}>🔄 Reset</button>
        </div>
        {/* Speed Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 10, marginBottom: 12 }}>
          <span style={{ alignSelf: 'center', marginRight: 5, fontWeight: 600, color: '#555' }}>Speed:</span>
          <SpeedControlButton onClick={() => onSpeedChange(0.2)} active={playbackSpeed === 0.2}>🐢 Slow</SpeedControlButton>
          <SpeedControlButton onClick={() => onSpeedChange(0.5)} active={playbackSpeed === 0.5}>🐇 Normal</SpeedControlButton>
          <SpeedControlButton onClick={() => onSpeedChange(1)} active={playbackSpeed === 1}>🐆 Fast</SpeedControlButton>
        </div>
        <div style={{ height: 12, background: '#F49AC2', borderRadius: 8, margin: '0 0 8px 0', overflow: 'hidden' }}>
          <div style={{ width: `${((currentStep + 1) / steps.length) * 100}%`, height: '100%', background: '#77DD77', transition: 'width 0.5s' }} />
        </div>
        {isCelebrating && (
          <div style={{ textAlign: 'center', fontSize: 28, color: '#FF6B6B', marginTop: 12 }}>
            🎉 Hooray! You sorted all the candies! 🎉
          </div>
        )}
      </InteractiveExample>
    </KidFriendlyContainer>
  );
};

export default KidFriendlyQuickSort;
