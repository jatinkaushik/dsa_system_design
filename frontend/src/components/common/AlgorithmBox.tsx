import React from 'react';

interface AlgorithmBoxProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const AlgorithmBox: React.FC<AlgorithmBoxProps> = ({ title, description, children }) => (
  <div className="rounded-lg shadow-md p-6 bg-white mb-6">
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    {description && <p className="mb-4 text-gray-600">{description}</p>}
    <div>{children}</div>
  </div>
);

export default AlgorithmBox;
