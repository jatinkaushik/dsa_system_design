import styled, { keyframes } from 'styled-components';

export const bounceAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

export const KidFriendlyContainer = styled.div`
  background: linear-gradient(135deg, #FFC3A0, #FFAFBD);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 3px dashed #FF8C94;
  box-shadow: 0 8px 16px rgba(255, 140, 148, 0.2);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: -20px;
    right: -20px;
    width: 120px;
    height: 120px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FFFFFF' stroke='%23FF6B6B' stroke-width='1'%3E%3Cpath d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z'/%3E%3C/svg%3E") no-repeat center center;
    opacity: 0.3;
    transform: rotate(15deg);
  }
`;

export const CharacterContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 1rem;
`;

export const CharacterImage = styled.div`
  width: 80px;
  height: 80px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FFCC80' stroke='%23E65100' stroke-width='0.5'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01'/%3E%3C/svg%3E") no-repeat center center;
  background-size: contain;
  margin-right: 1rem;
  animation: ${bounceAnimation} 3s ease-in-out infinite;
`;

export const SpeechBubble = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 16px;
  border-bottom-left-radius: 0;
  position: relative;
  max-width: 75%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: -10px;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 0 0 16px 0;
    clip-path: polygon(0 0, 100% 0, 100% 100%);
  }
  
  h3 {
    color: #FF6B6B;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }
  
  p {
    color: #333;
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 0.5rem;
  }
`;

export const InteractiveExample = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 1rem;
  margin-top: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const StepTitle = styled.h3`
  color: #FF6B6B;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 8px;
    width: 24px;
    height: 24px;
  }
`;

export const RealWorldExample = styled.div`
  margin-top: 1.5rem;
  background-color: #E0F7FA;
  padding: 1rem;
  border-radius: 12px;
  border-left: 4px solid #00BCD4;
`;

export const QuizSection = styled.div`
  margin-top: 1.5rem;
  background-color: #F3E5F5;
  padding: 1rem;
  border-radius: 12px;
  border-left: 4px solid #9C27B0;
`;

export const QuizQuestion = styled.div`
  margin-bottom: 1rem;
  
  h4 {
    margin-bottom: 0.5rem;
    color: #6A1B9A;
  }
`;

export const QuizOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const QuizOption = styled.button<{isCorrect?: boolean}>`
  background-color: white;
  border: 2px solid #9C27B0;
  border-radius: 8px;
  padding: 0.75rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #F3E5F5;
  }
  
  &.selected {
    background-color: ${props => props.isCorrect ? '#E8F5E9' : '#FFEBEE'};
    border-color: ${props => props.isCorrect ? '#4CAF50' : '#F44336'};
  }
`;

export const FeedbackMessage = styled.div<{isCorrect?: boolean, show?: boolean}>`
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  background-color: ${props => props.isCorrect ? '#E8F5E9' : '#FFEBEE'};
  color: ${props => props.isCorrect ? '#2E7D32' : '#C62828'};
  display: ${props => props.show ? 'block' : 'none'};
`;