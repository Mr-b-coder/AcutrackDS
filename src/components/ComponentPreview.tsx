// FILE: components/ComponentPreview.tsx
// This component provides a consistent wrapper for showcasing components in the design system.

import React from 'react';

export const ComponentPreview: React.FC<{ children: React.ReactNode; className?: string, isColumn?: boolean }> = ({ children, className = "", isColumn = false }) => (
    <div className={`component-preview not-prose flex flex-wrap items-center gap-4 ${isColumn ? 'flex-col items-start' : 'justify-center'} ${className}`}>
        {children}
    </div>
);
