import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export const Title = styled.h1`
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const CodeExplanationSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const VisualizationSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Visualization = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    padding: 1rem;
    min-height: 250px;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem;
    min-height: 200px;
  }
`;

export const VisualizationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

export const StepDescription = styled.div`
  background-color: #f8f9fa;
  padding: 0.75rem;
  border-radius: 4px;
  border-left: 4px solid var(--primary-color);
  margin-bottom: 1.5rem;
  font-size: 1rem;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.5rem 0.75rem;
    margin-bottom: 1rem;
  }
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

export const StepByStepGuide = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

export const GuideTitle = styled.h3`
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color);
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
`;

export const StepList = styled.ol`
  margin-left: 1.5rem;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    margin-left: 1rem;
    font-size: 0.9rem;
  }
`;