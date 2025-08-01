// FILE: components/BrowserCompatibility.tsx
// This component displays a note about browser compatibility.

import React from 'react';
import { Icon } from './icons.tsx';

export const BrowserCompatibility: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="mt-6 p-4 text-sm text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/40 rounded-lg border border-amber-200 dark:border-amber-500/30 flex items-start gap-3 not-prose">
        <Icon className="!text-xl mt-0.5 shrink-0">science</Icon>
        <div>
            <span className="font-bold">Browser Compatibility:</span> {children}
        </div>
    </div>
);
