import React from 'react';
import styled from 'styled-components';
import { AlgorithmComplexity } from '../../types';

interface ComplexityDisplayProps {
  complexity: AlgorithmComplexity;
}

const ComplexityContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  overflow: hidden;
`;

const ComplexityTitle = styled.div`
  background-color: #f5f5f5;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border-color);
  font-weight: 500;
`;

const ComplexityContent = styled.div`
  padding: 1rem;
`;

const ComplexityTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  
  th, td {
    padding: 0.5rem;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
  }
  
  th {
    font-weight: 500;
    color: #666;
  }
`;

const ComplexityDescription = styled.p`
  color: #555;
  line-height: 1.5;
`;

const ComplexityDisplay: React.FC<ComplexityDisplayProps> = ({ complexity }) => {
  return (
    <ComplexityContainer>
      <ComplexityTitle>Complexity Analysis: {complexity.name}</ComplexityTitle>
      <ComplexityContent>
        <ComplexityTable>
          <thead>
            <tr>
              <th>Case</th>
              <th>Time Complexity</th>
              <th>Space Complexity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Best</td>
              <td>{complexity.timeComplexity.best}</td>
              <td>{complexity.spaceComplexity.best}</td>
            </tr>
            <tr>
              <td>Average</td>
              <td>{complexity.timeComplexity.average}</td>
              <td>{complexity.spaceComplexity.average}</td>
            </tr>
            <tr>
              <td>Worst</td>
              <td>{complexity.timeComplexity.worst}</td>
              <td>{complexity.spaceComplexity.worst}</td>
            </tr>
          </tbody>
        </ComplexityTable>
        <ComplexityDescription>{complexity.description}</ComplexityDescription>
      </ComplexityContent>
    </ComplexityContainer>
  );
};

export default ComplexityDisplay;