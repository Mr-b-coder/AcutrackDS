// FILE: components/ToggleSwitch.tsx
// This component provides a styled toggle switch input.

import React from 'react';

type ToggleSwitchProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    label: string;
    id: string;
};
export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, id, disabled, ...props }) => (
    <label htmlFor={id} className={`flex items-center ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}>
        <div className="relative">
            <input type="checkbox" id={id} className="sr-only peer" disabled={disabled} {...props} />
            <div className="block bg-bg-tertiary dark:bg-dark-bg-primary w-12 h-7 rounded-full peer-checked:bg-brand-orange transition-colors"></div>
            <div className="dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform peer-checked:translate-x-full"></div>
        </div>
        <div className="ml-3 text-sm font-medium text-text-primary dark:text-dark-text-primary">{label}</div>
    </label>
);
