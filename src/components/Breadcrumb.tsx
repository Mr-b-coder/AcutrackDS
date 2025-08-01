// FILE: components/Breadcrumb.tsx
// This component displays the navigation context for the current section.

import React from 'react';

interface BreadcrumbProps {
    group: string;
    section: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ group, section }) => {
    if (!group || !section) {
        return null;
    }
    return (
        <div className="mb-4 text-xs font-semibold text-text-secondary/70 dark:text-dark-text-secondary/70 tracking-wider uppercase">
            {group}
            <span className="mx-2">/</span>
            <span>{section}</span>
        </div>
    );
};
