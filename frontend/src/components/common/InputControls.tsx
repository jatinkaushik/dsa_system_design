import React, { useState } from 'react';
import styled from 'styled-components';

interface InputControlsProps {
  onInputChange: (input: number[]) => void;
  onGenerateRandom: () => void;
}

const InputContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  overflow: hidden;
`;

const InputTitle = styled.div`
  background-color: #f5f5f5;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border-color);
  font-weight: 500;
`;

const InputContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #3a5a84;
  }
`;

const ErrorMessage = styled.div`
  color: var(--error-color);
  font-size: 0.9rem;
`;

const HelpText = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const InputControls: React.FC<InputControlsProps> = ({ onInputChange, onGenerateRandom }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError('');
  };

  const handleSubmit = () => {
    try {
      // Parse the input as a comma-separated list of numbers
      const values = inputValue
        .split(',')
        .map(str => {
          const num = Number(str.trim());
          if (isNaN(num)) {
            throw new Error('Invalid number');
          }
          return num;
        });

      if (values.length < 2) {
        setError('Please enter at least two numbers');
        return;
      }

      onInputChange(values);
      setError('');
    } catch (err) {
      setError('Invalid input. Please enter comma-separated numbers (e.g., "5, 2, 8, 1, 9")');
    }
  };

  return (
    <InputContainer>
      <InputTitle>Input Controls</InputTitle>
      <InputContent>
        <InputRow>
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter numbers separated by commas (e.g., 5, 2, 8, 1, 9)"
          />
          <Button onClick={handleSubmit}>Apply</Button>
          <Button onClick={onGenerateRandom}>Random</Button>
        </InputRow>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <HelpText>
          Enter your own array of numbers to visualize, or click "Random" to generate a random array.
        </HelpText>
      </InputContent>
    </InputContainer>
  );
};

export default InputControls;