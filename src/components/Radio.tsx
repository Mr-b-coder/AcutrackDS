// FILE: components/Radio.tsx
// This component provides a styled radio button input.

import React from 'react';

type RadioProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
};
export const Radio: React.FC<RadioProps> = ({ label, id, className = '', ...props }) => (
    <div className="flex items-center gap-3">
        <input
            type="radio"
            id={id}
            className={`h-5 w-5 shrink-0 border-border-color dark:border-dark-border-color text-brand-orange focus:ring-brand-orange focus:ring-offset-bg-secondary dark:focus:ring-offset-dark-bg-secondary ${className}`}
            {...props}
        />
        <label htmlFor={id} className={`text-sm font-medium text-text-primary dark:text-dark-text-primary ${props.disabled ? 'opacity-60' : ''}`}>{label}</label>
    </div>
);
