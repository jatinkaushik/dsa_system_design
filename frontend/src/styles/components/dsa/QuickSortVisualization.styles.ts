import styled from 'styled-components';

export const ArrayContainer = styled.div`
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

export const ArrayBar = styled.div<ArrayBarProps>`
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

export const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 30px;
  justify-content: center;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.85rem;
`;

export const LegendColor = styled.div<{color: string}>`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background-color: ${props => props.color};
  margin-right: 5px;
`;

export const CardRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 1rem 0;
  flex-wrap: wrap;
`;

export const NumberCard = styled.div<{bg?: string, isAnimated?: boolean, label?: string}>`
  width: 50px;
  height: 70px;
  background-color: ${props => props.bg || '#6366f1'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  
  ${props => props.isAnimated && `
    animation: ${props.theme.bounceAnimation} 1s ease-in-out infinite;
  `}
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:after {
    content: '${props => props.label || ''}';
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.75rem;
    color: #666;
    white-space: nowrap;
  }
`;