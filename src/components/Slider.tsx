// FILE: components/Slider.tsx
// This component provides a styled range input slider.

import React from 'react';

type SliderProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    id: string;
};
export const Slider: React.FC<SliderProps> = ({ label, id, value, ...props }) => (
    <div className="w-full">
        <label htmlFor={id} className="flex items-center justify-between text-sm font-semibold text-text-primary dark:text-dark-text-primary mb-2">
            <span>{label}</span>
            <span className="px-2 py-1 text-xs rounded-md bg-bg-tertiary dark:bg-dark-bg-primary">{value}</span>
        </label>
        <input type="range" id={id} value={value} className="custom-slider" {...props} />
    </div>
);
