// FILE: components/Autocomplete.tsx
// This component provides an input with type-ahead suggestions.

import React, { useState, useRef, useEffect } from 'react';
import { useOnClickOutside } from './icons.tsx';
import { SelectOption } from './Select.tsx';
import { Input } from './Input.tsx';

export const Autocomplete: React.FC<{ label: string, id: string, options: SelectOption[], value: string | number, onValueChange: (v: string | number) => void, placeholder?: string, disabled?: boolean, error?:string }> = ({label, id, options, value, onValueChange, placeholder, disabled, error}) => {
    const [inputValue, setInputValue] = useState(() => options.find(opt => opt.value === value)?.label || '');
    const [filteredOptions, setFilteredOptions] = useState<SelectOption[]>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleSelect = (option: SelectOption) => {
        setInputValue(option.label);
        onValueChange(option.value);
        setFilteredOptions([]);
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setInputValue(query);
        if (query) {
            setFilteredOptions(options.filter(opt => opt.label.toLowerCase().includes(query.toLowerCase())));
        } else {
            setFilteredOptions([]);
            onValueChange('');
        }
    };
    
    useOnClickOutside(wrapperRef, () => setFilteredOptions([]));

    useEffect(() => {
        setInputValue(options.find(opt => opt.value === value)?.label || '');
    }, [value, options]);

    return (
        <div className="relative w-full" ref={wrapperRef}>
            <Input 
                id={id} 
                label={label} 
                value={inputValue} 
                onChange={handleChange}
                placeholder={placeholder}
                disabled={disabled}
                error={error}
            />
            {filteredOptions.length > 0 && (
                 <div className="absolute z-10 w-full mt-1 bg-bg-secondary dark:bg-dark-bg-secondary border border-border-color dark:border-dark-border-color rounded-lg shadow-lg max-h-60 overflow-y-auto custom-scrollbar">
                    {filteredOptions.map(option => (
                        <button key={option.value} onClick={() => handleSelect(option)} className="w-full text-left px-4 py-2.5 text-sm text-text-secondary dark:text-dark-text-secondary hover:bg-bg-tertiary dark:hover:bg-dark-bg-tertiary">
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
