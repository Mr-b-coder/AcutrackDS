// FILE: components/Checkbox.tsx
// This component provides a styled checkbox input.

import React, { useRef, useEffect } from 'react';

type RawCheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  indeterminate?: boolean;
};

export const RawCheckbox = React.forwardRef<HTMLInputElement, RawCheckboxProps>(
  ({ className, indeterminate, ...props }, ref) => {
    const defaultRef = useRef<HTMLInputElement>(null);
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      if (typeof resolvedRef === 'object' && resolvedRef.current) {
        resolvedRef.current.indeterminate = !!indeterminate;
      }
    }, [resolvedRef, indeterminate]);

    return (
      <input
        type="checkbox"
        ref={resolvedRef}
        className={`h-5 w-5 shrink-0 rounded-md border-border-color dark:border-dark-border-color text-brand-orange focus:ring-brand-orange focus:ring-offset-bg-secondary dark:focus:ring-offset-dark-bg-secondary ${className}`}
        {...props}
      />
    );
  }
);
RawCheckbox.displayName = 'RawCheckbox';


type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string;
  id: string;
};
export const Checkbox: React.FC<CheckboxProps> = ({ label, id, className = '', ...props }) => (
    <div className="flex items-center gap-3">
        <RawCheckbox id={id} className={className} {...props} />
        <label htmlFor={id} className={`text-sm font-medium text-text-primary dark:text-dark-text-primary ${props.disabled ? 'opacity-60' : ''}`}>{label}</label>
    </div>
);
