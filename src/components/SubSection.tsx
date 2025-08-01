// FILE: components/SubSection.tsx
// This component provides a wrapper for logical sub-sections within a larger section.

import React from 'react';

export const SubSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-12">
        <h3 className="component-title">{title}</h3>
        {children}
    </div>
);
