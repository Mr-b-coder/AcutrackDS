


import React, { useState } from 'react';
import { Icon } from './icons.tsx';

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div className="code-block mt-4">
      <button 
        onClick={handleCopy}
        className="copy-button"
        aria-label={isCopied ? 'Copied' : 'Copy code'}
      >
        {isCopied ? (
            <Icon className="!text-xl text-system-success">check</Icon>
        ) : (
            <Icon className="!text-xl">content_copy</Icon>
        )}
      </button>
      <pre className="custom-scrollbar">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;