// FILE: components/Accordion.tsx
// This component displays a collapsible content panel.

import React from 'react';
import { Icon } from './icons.tsx';

export const Accordion: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean; }> = ({ title, children, defaultOpen }) => (
    <details className="group rounded-lg bg-bg-secondary dark:bg-dark-bg-tertiary border border-border-color dark:border-dark-border-color" open={defaultOpen}>
        <summary className="flex cursor-pointer items-center justify-between p-4 list-none">
            <span className="font-bold text-text-primary dark:text-dark-text-primary">{title}</span>
            <Icon className="transition-transform duration-300 group-open:-rotate-180">expand_more</Icon>
        </summary>
        <div className="prose prose-sm dark:prose-invert max-w-none p-4 pt-0 text-text-secondary dark:text-dark-text-secondary">
            {children}
        </div>
    </details>
);
