import React from 'react';

interface AlgorithmVisualizationProps {
  children: React.ReactNode;
  label?: string;
}

const AlgorithmVisualization: React.FC<AlgorithmVisualizationProps> = ({ children, label }) => (
  <div className="border rounded-md p-4 bg-gray-50 mb-4">
    {label && <div className="font-semibold mb-2">{label}</div>}
    <div>{children}</div>
  </div>
);

export default AlgorithmVisualization;
