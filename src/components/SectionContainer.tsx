// FILE: components/SectionContainer.tsx
// This component is the main container for each full-screen section in the design system.

import React from 'react';

export const SectionContainer: React.FC<{ id: string; children: React.ReactNode; centerContent?: boolean; }> = ({ id, children, centerContent = false }) => {
    const baseClasses = 'h-screen w-full snap-start';
    
    if (centerContent) {
        return (
            <section id={id} className={`${baseClasses} flex flex-col justify-center`}>
                <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                    {children}
                </div>
            </section>
        );
    }

    return (
        <section id={id} className={baseClasses}>
            <div className="h-full w-full overflow-y-auto pt-20 pb-12 px-4 sm:px-6 md:px-8 custom-scrollbar">
                <div className="mx-auto max-w-6xl">
                    {children}
                </div>
            </div>
        </section>
    );
};
