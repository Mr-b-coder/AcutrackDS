// FILE: components/Progress.tsx
// This component displays a progress bar.

import React from 'react';

export interface ProgressProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'info' | 'warning' | 'error';
  label?: React.ReactNode;
  striped?: boolean;
  animated?: boolean;
}
export const Progress: React.FC<ProgressProps> = ({ value, size = 'md', color = 'primary', label, striped, animated }) => {
    const sizeClasses = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' };
    const colorClasses = {
        primary: 'bg-brand-orange', success: 'bg-system-success', info: 'bg-system-info', warning: 'bg-system-warning', error: 'bg-system-error',
    };
    const progress = Math.max(0, Math.min(100, value));
    
    return (
        <div className="w-full">
            {label && <div className="flex justify-between mb-1"><span className="text-sm font-medium text-text-primary dark:text-dark-text-primary">{label}</span><span className="text-sm font-medium text-text-secondary dark:text-dark-text-secondary">{Math.round(progress)}%</span></div>}
            <div className={`w-full bg-bg-tertiary rounded-full dark:bg-dark-bg-tertiary ${sizeClasses[size!]}`}>
                <div
                    className={`rounded-full transition-all duration-300 ${sizeClasses[size!]} ${colorClasses[color!]} ${striped ? 'bg-stripes' : ''} ${animated ? 'animate-progress-stripes' : ''}`}
                    style={{ 
                        width: `${progress}%`,
                        backgroundImage: striped ? `linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)` : 'none',
                        backgroundSize: striped ? '1rem 1rem' : 'auto'
                    }}
                ></div>
            </div>
        </div>
    );
};
