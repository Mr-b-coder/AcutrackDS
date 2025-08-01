// FILE: components/Tooltip.tsx
import React from 'react';

type TooltipProps = {
    label: string;
    children: React.ReactNode;
    className?: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    color?: 'default' | 'primary' | 'accent' | 'info' | 'success' | 'error';
}

export const Tooltip: React.FC<TooltipProps> = ({ label, children, className = '', position = 'top', color = 'default' }) => {
    
    const colorConfig = {
        default: {
            body: 'bg-grey-700 text-white dark:bg-dark-bg-tertiary dark:text-dark-text-primary',
            arrow: {
                top: 'border-t-grey-700 dark:border-t-dark-bg-tertiary',
                bottom: 'border-b-grey-700 dark:border-b-dark-bg-tertiary',
                left: 'border-l-grey-700 dark:border-l-dark-bg-tertiary',
                right: 'border-r-grey-700 dark:border-r-dark-bg-tertiary',
            },
        },
        primary: {
            body: 'bg-brand-navy text-white',
            arrow: {
                top: 'border-t-brand-navy',
                bottom: 'border-b-brand-navy',
                left: 'border-l-brand-navy',
                right: 'border-r-brand-navy',
            },
        },
        accent: {
            body: 'bg-brand-orange text-white',
            arrow: {
                top: 'border-t-brand-orange',
                bottom: 'border-b-brand-orange',
                left: 'border-l-brand-orange',
                right: 'border-r-brand-orange',
            },
        },
        info: {
            body: 'bg-system-info text-white',
            arrow: {
                top: 'border-t-system-info',
                bottom: 'border-b-system-info',
                left: 'border-l-system-info',
                right: 'border-r-system-info',
            },
        },
        success: {
            body: 'bg-system-success text-white',
            arrow: {
                top: 'border-t-system-success',
                bottom: 'border-b-system-success',
                left: 'border-l-system-success',
                right: 'border-r-system-success',
            },
        },
        error: {
            body: 'bg-system-error text-white',
            arrow: {
                top: 'border-t-system-error',
                bottom: 'border-b-system-error',
                left: 'border-l-system-error',
                right: 'border-r-system-error',
            },
        },
    };

    const styles = colorConfig[color];

    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    const arrowPositionClasses = {
        top: 'bottom-[-4px] left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent',
        bottom: 'top-[-4px] left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent',
        left: 'right-[-4px] top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent',
        right: 'left-[-4px] top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent',
    };

    const visibilityClasses = label ? 'opacity-0 group-hover:opacity-100' : 'opacity-0';

    return (
        <div className={`relative group inline-block ${className}`}>
            {children}
            <div
                role="tooltip"
                className={`absolute z-50 w-max max-w-xs px-3 py-1.5 text-sm font-medium rounded-lg shadow-sm transition-opacity duration-150 whitespace-nowrap ${styles.body} ${visibilityClasses} ${positionClasses[position]}`}
            >
                {label}
                <div className={`absolute w-0 h-0 border-4 ${arrowPositionClasses[position]} ${styles.arrow[position]}`} />
            </div>
        </div>
    );
}