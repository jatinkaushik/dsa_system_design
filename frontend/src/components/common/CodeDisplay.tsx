import React from 'react';
import styled from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface CodeDisplayProps {
  code: string;
  language: string;
  highlightLines?: number[];
  currentStep?: number;
  codeExplanation?: string;
}

const CodeContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CodeTitle = styled.div`
  background-color: #f5f5f5;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border-color);
  font-weight: 500;
`;

const StepExplanation = styled.div`
  background-color: #f8f9fa;
  padding: 0.75rem;
  border-left: 4px solid var(--primary-color);
  margin: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const CodeDisplay: React.FC<CodeDisplayProps> = ({ 
  code, 
  language, 
  highlightLines = [],
  currentStep,
  codeExplanation
}) => {
  return (
    <CodeContainer>
      <CodeTitle>
        Implementation {currentStep !== undefined ? `- Step ${currentStep + 1}` : ""}
      </CodeTitle>
      
      {codeExplanation && (
        <StepExplanation>
          {codeExplanation}
        </StepExplanation>
      )}
      
      <SyntaxHighlighter 
        language={language} 
        style={docco}
        customStyle={{ 
          margin: 0,
          padding: '1rem',
          borderRadius: '0 0 8px 8px',
          fontSize: '0.9rem',
          lineHeight: 1.5,
          flex: 1,
          overflow: 'auto'
        }}
        wrapLines={true}
        showLineNumbers={true}
        lineProps={(lineNumber) => {
          const style: React.CSSProperties = { display: 'block' };
          if (highlightLines.includes(lineNumber)) {
            style.backgroundColor = 'rgba(255, 255, 0, 0.2)';
            style.borderLeft = '3px solid #f9c74f';
            style.paddingLeft = '1rem';
          }
          return { style };
        }}
      >
        {code}
      </SyntaxHighlighter>
    </CodeContainer>
  );
};

export default CodeDisplay;