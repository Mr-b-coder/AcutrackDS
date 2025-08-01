// FILE: components/EmptyState.tsx
// This component is used to communicate a state with no content.

import React from 'react';
import { Icon } from './icons.tsx';

export const EmptyState: React.FC<{ icon: string; title: string; description: string; action?: React.ReactNode; className?: string; }> = ({ icon, title, description, action, className = '' }) => (
    <div className={`text-center p-8 rounded-lg border-2 border-dashed border-border-color dark:border-dark-border-color bg-bg-secondary dark:bg-dark-bg-tertiary ${className}`}>
        <div className="w-16 h-16 mx-auto rounded-full bg-bg-tertiary dark:bg-dark-bg-primary flex items-center justify-center">
            <Icon className="!text-4xl text-text-secondary dark:text-dark-text-secondary">{icon}</Icon>
        </div>
        <h3 className="mt-6 text-xl font-bold text-text-primary dark:text-dark-text-primary">{title}</h3>
        <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary max-w-sm mx-auto">{description}</p>
        {action && <div className="mt-6">{action}</div>}
    </div>
);
