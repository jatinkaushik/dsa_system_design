import React from 'react';
import styled from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface CodeDisplayProps {
  code: string;
  language: string;
}

const CodeContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  overflow: hidden;
`;

const CodeTitle = styled.div`
  background-color: #f5f5f5;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border-color);
  font-weight: 500;
`;

const CodeDisplay: React.FC<CodeDisplayProps> = ({ code, language }) => {
  return (
    <CodeContainer>
      <CodeTitle>Implementation</CodeTitle>
      <SyntaxHighlighter 
        language={language} 
        style={docco}
        customStyle={{ 
          margin: 0,
          padding: '1rem',
          borderRadius: '0 0 8px 8px',
          fontSize: '0.9rem',
          lineHeight: 1.5
        }}
      >
        {code}
      </SyntaxHighlighter>
    </CodeContainer>
  );
};

export default CodeDisplay;