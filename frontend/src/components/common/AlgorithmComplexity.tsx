import React from 'react';

interface AlgorithmComplexityProps {
  time: string;
  space: string;
}

const AlgorithmComplexity: React.FC<AlgorithmComplexityProps> = ({ time, space }) => (
  <div className="flex flex-col gap-1 text-sm text-gray-700 mt-2">
    <div><span className="font-semibold">Time Complexity:</span> {time}</div>
    <div><span className="font-semibold">Space Complexity:</span> {space}</div>
  </div>
);

export default AlgorithmComplexity;
