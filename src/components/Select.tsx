import React, { useMemo } from 'react';
import { Dropdown } from './Dropdown.tsx';
import { Icon } from './icons.tsx';

// --- SELECT COMPONENT ---
export type SelectOption = {
    value: string | number;
    label: string;
};

type SelectProps = {
    label: string;
    id: string;
    options: SelectOption[];
    value: string | number;
    onChange: (value: string | number) => void;
    error?: string;
    disabled?: boolean;
    className?: string;
};

export const Select: React.FC<SelectProps> = ({ label, id, options, value, onChange, error, disabled = false, className = '' }) => {
    const selectedOption = useMemo(() => options.find(opt => opt.value === value) || options[0], [options, value]);

    const baseClasses = "w-full h-14 px-4 bg-bg-tertiary dark:bg-dark-bg-primary border rounded-lg focus:outline-none focus:ring-0 focus:border-2 text-left flex items-center justify-between";
    const defaultBorder = "border-border-color dark:border-dark-border-color data-[state=open]:border-brand-navy dark:data-[state=open]:border-dark-brand-orange focus:border-brand-navy dark:focus:border-dark-brand-orange";
    const errorBorder = "border-2 border-system-error";

    const combinedClasses = [
        baseClasses,
        error ? errorBorder : defaultBorder,
        disabled ? 'opacity-60 cursor-not-allowed' : '',
    ].join(' ');

    return (
        <div className={`w-full ${className}`}>
            <label htmlFor={id} className="block text-sm font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                {label}
            </label>
            <Dropdown>
                <Dropdown.Trigger>
                    <button id={id} type="button" className={combinedClasses} disabled={disabled} data-state-error={!!error}>
                        <span>{selectedOption?.label}</span>
                        <Icon className="transition-transform data-[state=open]:-rotate-180">unfold_more</Icon>
                    </button>
                </Dropdown.Trigger>
                <Dropdown.Content className="w-full max-h-60 overflow-y-auto custom-scrollbar">
                    {options.map(option => (
                        <Dropdown.Item key={option.value} onSelect={() => onChange(option.value)}>
                            <span className="flex items-center">
                                <span className={`mr-3 h-5 w-5 flex items-center justify-center ${option.value === value ? 'opacity-100' : 'opacity-0'}`}>
                                    <Icon className="!text-xl">check</Icon>
                                </span>
                                {option.label}
                            </span>
                        </Dropdown.Item>
                    ))}
                </Dropdown.Content>
            </Dropdown>
            {error && <p className="text-sm text-system-error mt-1">{error}</p>}
        </div>
    );
};