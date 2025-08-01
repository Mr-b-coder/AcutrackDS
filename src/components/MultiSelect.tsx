// FILE: components/MultiSelect.tsx
// This component allows users to select multiple options from a list.

import React, { useState, useMemo } from 'react';
import { SelectOption } from './Select.tsx';
import { Dropdown } from './Dropdown.tsx';
import { Icon } from './icons.tsx';

export const MultiSelect: React.FC<{ label: string, id: string, options: SelectOption[], selectedValues: (string|number)[], onSelectedValuesChange: (v:(string|number)[]) => void, placeholder?: string, disabled?: boolean, error?: string }> = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const availableOptions = useMemo(() =>
        props.options.filter(opt =>
            !props.selectedValues.includes(opt.value) &&
            opt.label.toLowerCase().includes(searchTerm.toLowerCase())
        ), [props.options, props.selectedValues, searchTerm]
    );

    const handleSelect = (value: string|number) => {
        props.onSelectedValuesChange([...props.selectedValues, value]);
        setSearchTerm('');
    };

    const handleRemove = (value: string|number) => {
        props.onSelectedValuesChange(props.selectedValues.filter(v => v !== value));
    };

    return (
        <div className="w-full">
            <label htmlFor={props.id} className="block text-sm font-semibold text-text-primary dark:text-dark-text-primary mb-2">{props.label}</label>
             <Dropdown>
                <Dropdown.Trigger>
                    <div className="w-full p-2 bg-bg-tertiary dark:bg-dark-bg-primary border border-border-color dark:border-dark-border-color rounded-lg flex flex-wrap items-center gap-2 min-h-[3.5rem] data-[state=open]:border-brand-navy dark:data-[state=open]:border-dark-brand-orange">
                        {props.selectedValues.map(val => {
                            const option = props.options.find(o => o.value === val);
                            return (
                                <div key={val} className="flex items-center gap-1.5 bg-brand-orange/20 text-brand-navy dark:bg-dark-brand-orange/30 dark:text-dark-text-primary rounded-md px-2 py-1 text-sm font-bold">
                                    <span>{option?.label}</span>
                                    <button type="button" onClick={() => handleRemove(val)} className="-mr-0.5 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10">
                                        <Icon className="!text-base">close</Icon>
                                    </button>
                                </div>
                            );
                        })}
                        <input
                            id={props.id}
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={props.selectedValues.length === 0 ? props.placeholder : ''}
                            className="flex-grow bg-transparent focus:outline-none p-2"
                            disabled={props.disabled}
                        />
                    </div>
                </Dropdown.Trigger>
                <Dropdown.Content className="w-full max-h-60 overflow-y-auto custom-scrollbar">
                    {availableOptions.length > 0 ? availableOptions.map(option => (
                        <Dropdown.Item key={option.value} onSelect={() => handleSelect(option.value)}>
                            {option.label}
                        </Dropdown.Item>
                    )) : <div className="px-4 py-2 text-sm text-text-secondary">No options found.</div>}
                </Dropdown.Content>
            </Dropdown>
            {props.error && <p className="text-sm text-system-error mt-1">{props.error}</p>}
        </div>
    );
};
