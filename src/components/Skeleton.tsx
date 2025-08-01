// FILE: components/Skeleton.tsx
// This component is used to create placeholder previews of content while it's loading.

import React from 'react';

export const Skeleton: React.FC<{ height: string | number; width: string | number; className?: string; }> = ({ height, width, className = '' }) => (
    <div
        style={{ height, width }}
        className={`relative overflow-hidden bg-bg-tertiary dark:bg-dark-bg-tertiary rounded-md ${className}`}
    >
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-bg-primary/50 dark:via-dark-bg-primary/50 to-transparent" />
    </div>
);
