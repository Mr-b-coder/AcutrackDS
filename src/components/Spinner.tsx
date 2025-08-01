// FILE: components/Spinner.tsx
// This component provides various animated spinners to indicate loading states.

import React from 'react';

export type SpinnerProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'ring' | 'dots' | 'bars' | 'grid' | 'pulsar' | 'dual-ring';
  color?: 'primary' | 'white' | 'current';
  className?: string;
};

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', variant = 'ring', color = 'primary', className = '' }) => {

    const sizeClasses = {
        xs: 'h-4 w-4', sm: 'h-6 w-6', md: 'h-8 w-8', lg: 'h-12 w-12', xl: 'h-16 w-16',
    };
    
    const colorClass = {
        primary: 'text-brand-orange dark:text-dark-brand-orange',
        white: 'text-white',
        current: 'text-current',
    }[color!];

    if (variant === 'grid') {
        const dotSizeClasses = {
            xs: 'h-1 w-1', sm: 'h-1.5 w-1.5', md: 'h-2 w-2', lg: 'h-2.5 w-2.5', xl: 'h-3 w-3',
        };
        const gapClasses = {
             xs: 'gap-0.5', sm: 'gap-1', md: 'gap-1', lg: 'gap-1.5', xl: 'gap-2',
        };
        const combinedClasses = ['grid grid-cols-3', gapClasses[size!], sizeClasses[size!], className].join(' ');
        const gridDelays = ['0.2s', '0.3s', '0.4s', '0.1s', '0.2s', '0.3s', '0.0s', '0.1s', '0.2s'];

        return (
            <div role="status" className={combinedClasses}>
                <span className="sr-only">Loading...</span>
                {gridDelays.map((delay, i) => (
                    <div 
                        key={i} 
                        className={`animate-grid-fade rounded-full bg-current ${colorClass} ${dotSizeClasses[size!]}`} 
                        style={{ animationDelay: delay }}
                    />
                ))}
            </div>
        );
    }
    
    if (variant === 'pulsar') {
        const combinedClasses = ['relative', sizeClasses[size!], className].join(' ');
        return (
            <div role="status" className={combinedClasses}>
                <span className="sr-only">Loading...</span>
                <div className={`absolute inset-0 animate-pulsar rounded-full bg-current ${colorClass}`} />
                <div className={`absolute inset-0 animate-pulsar rounded-full bg-current ${colorClass}`} style={{ animationDelay: '0.6s' }} />
            </div>
        );
    }
    
    if (variant === 'dual-ring') {
        const borderSizeClasses = {
            xs: 'border-2', sm: 'border-2', md: 'border-[3px]', lg: 'border-4', xl: 'border-4',
        };
        const combinedClasses = ['relative', sizeClasses[size!], className].join(' ');
        const ringClasses = `absolute inset-0 rounded-full border-solid border-current border-t-transparent ${borderSizeClasses[size!]} ${colorClass}`;
        return (
            <div role="status" className={combinedClasses}>
                <span className="sr-only">Loading...</span>
                <div className={`${ringClasses} animate-spin`} />
                <div className={`${ringClasses} animate-spin-reverse scale-75`} />
            </div>
        );
    }

    if (variant === 'bars') {
        const barSizeClasses = {
            xs: 'w-0.5', sm: 'w-1', md: 'w-1.5', lg: 'w-2', xl: 'w-2.5',
        };
        const gapClasses = {
            xs: 'gap-0.5', sm: 'gap-1', md: 'gap-1.5', lg: 'gap-1.5', xl: 'gap-2',
        };
        const combinedClasses = ['flex items-center justify-center', gapClasses[size!], sizeClasses[size!], className].join(' ');
        const barColorClass = colorClass.replace('text-', 'bg-');

        return (
            <div role="status" className={combinedClasses}>
                <span className="sr-only">Loading...</span>
                <div className={`animate-bar-scale rounded-full h-full ${barColorClass} ${barSizeClasses[size!]}`}></div>
                <div className={`animate-bar-scale rounded-full h-full ${barColorClass} ${barSizeClasses[size!]} [animation-delay:0.2s]`}></div>
                <div className={`animate-bar-scale rounded-full h-full ${barColorClass} ${barSizeClasses[size!]} [animation-delay:0.4s]`}></div>
                <div className={`animate-bar-scale rounded-full h-full ${barColorClass} ${barSizeClasses[size!]} [animation-delay:0.6s]`}></div>
            </div>
        );
    }

    if (variant === 'dots') {
        const dotSizeClasses = {
            xs: 'h-1.5 w-1.5', sm: 'h-2 w-2', md: 'h-2.5 w-2.5', lg: 'h-3 w-3', xl: 'h-4 w-4',
        };
        const gapClasses = {
            xs: 'gap-1', sm: 'gap-1.5', md: 'gap-2', lg: 'gap-2.5', xl: 'gap-3',
        };
        const combinedClasses = ['flex items-center justify-center', gapClasses[size!], sizeClasses[size!], className].join(' ');
        const dotColorClass = colorClass.replace('text-', 'bg-');
        const delays = ['0s', '0.1s', '0.2s'];
        
        return (
            <div role="status" className={combinedClasses}>
                <span className="sr-only">Loading...</span>
                {delays.map(delay => (
                    <div
                        key={delay}
                        className={`animate-bounce rounded-full ${dotColorClass} ${dotSizeClasses[size!]}`}
                        style={{ animationDelay: delay }}
                    />
                ))}
            </div>
        );
    }

    // Default 'ring' variant
    const borderSizeClasses = {
        xs: 'border-2', sm: 'border-2', md: 'border-[3px]', lg: 'border-4', xl: 'border-4',
    };
    const combinedClasses = ['animate-spin rounded-full', sizeClasses[size!], borderSizeClasses[size!], 'border-current', colorClass, className].join(' ');
    
    return (
        <div role="status">
            <span className="sr-only">Loading...</span>
            <div className={`${combinedClasses} border-solid border-b-transparent border-l-transparent`} />
        </div>
    );
};
