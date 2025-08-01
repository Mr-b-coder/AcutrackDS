

import React, { useState, useEffect, RefObject } from 'react';

// Reusable hook for clicking outside an element
export const useOnClickOutside = (ref: RefObject<HTMLElement>, handler: (event: MouseEvent | TouchEvent) => void) => {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            // Do nothing if clicking ref's element or descendent elements
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            handler(event);
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
};


// Reusable hook for clipboard functionality
export const useCopyToClipboard = (): [(text: string) => void, boolean] => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = (text: string) => {
    if (isCopied) return;
    
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
  };

  return [copy, isCopied];
};

// Reusable component for Google Material Symbols
export const Icon: React.FC<{ children: string; className?: string }> = ({ children, className }) => (
    <span className={`material-symbols-outlined ${className || ''}`}>{children}</span>
);