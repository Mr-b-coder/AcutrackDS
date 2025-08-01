// FILE: components/Textarea.tsx
// This component provides a styled textarea field with a label.

import React from 'react';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  id: string;
  error?: string;
  containerClassName?: string;
};
export const Textarea: React.FC<TextareaProps> = ({ label, id, error, className = '', containerClassName = '', ...props }) => {
    const baseClasses = "w-full p-4 bg-bg-tertiary dark:bg-dark-bg-primary border rounded-lg focus:outline-none focus:ring-0 focus:border-2 text-text-primary dark:text-dark-text-primary";
    const defaultBorder = "border-border-color dark:border-dark-border-color focus:border-brand-navy dark:focus:border-dark-brand-orange";
    const errorBorder = "border-2 border-system-error";

    return (
        <div className={`w-full ${containerClassName}`}>
            <label htmlFor={id} className="block text-sm font-semibold text-text-primary dark:text-dark-text-primary mb-2">{label}</label>
            <textarea
                id={id}
                className={`${baseClasses} ${error ? errorBorder : defaultBorder} ${className} disabled:opacity-60 disabled:cursor-not-allowed`}
                {...props}
            />
            {error && <p className="text-sm text-system-error mt-1">{error}</p>}
        </div>
    );
};
