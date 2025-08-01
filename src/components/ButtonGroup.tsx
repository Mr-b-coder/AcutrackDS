// FILE: components/ButtonGroup.tsx
// This component groups multiple buttons together into a single, attached element.

import React from 'react';

export const ButtonGroup: React.FC<{ children: React.ReactNode; className?: string; }> = ({ children, className = '' }) => {
    const childCount = React.Children.count(children);
    return (
        <div className={`inline-flex rounded-md shadow-sm ${className}`} role="group">
            {React.Children.map(children, (child, index) => {
                if (!React.isValidElement<{ className?: string }>(child)) return child;
                const childClasses = child.props.className || '';
                let newClasses = 'focus:z-10';
                if (childCount > 1) {
                    if (index === 0) newClasses += ' rounded-r-none';
                    else if (index === childCount - 1) newClasses += ' rounded-l-none -ml-px';
                    else newClasses += ' rounded-none -ml-px';
                }
                return React.cloneElement(child, { className: `${childClasses} ${newClasses}` });
            })}
        </div>
    );
};
