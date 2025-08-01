// FILE: components/DatePicker.tsx
// This component provides a user-friendly way to select a single date.

import React, { useState } from 'react';
import { Popover, usePopover } from './Popover.tsx';
import { Button } from './Button.tsx';
import { Icon } from './icons.tsx';
import { Calendar } from './Calendar.tsx';
import { formatDate } from './date-helpers.ts';

// Wrapper to get popover context for closing on select
const DatePickerPopoverContent: React.FC<{
    value: Date | null;
    onChange: (d: Date | null) => void;
    displayDate: Date;
    setDisplayDate: (d: Date) => void;
}> = ({ value, onChange, displayDate, setDisplayDate }) => {
    const { setIsOpen } = usePopover();

    const handleDateSelect = (date: Date) => {
        onChange(date);
        setIsOpen(false);
    };

    const handleTodayClick = () => {
        const today = new Date();
        setDisplayDate(today);
        onChange(today);
        setIsOpen(false);
    };
    
    const handleClearClick = () => {
        onChange(null);
        setIsOpen(false);
    };

    return (
        <>
            <Calendar 
                selectedValue={value} 
                onDateSelect={handleDateSelect} 
                displayDate={displayDate} 
                onDisplayDateChange={setDisplayDate} 
            />
            <div className="p-2 border-t border-border-color dark:border-dark-border-color mt-2 flex justify-between">
                <Button variant="text" size="sm" onClick={handleTodayClick}>Today</Button>
                <Button variant="text" size="sm" onClick={handleClearClick}>Clear</Button>
            </div>
        </>
    );
};


export const DatePicker: React.FC<{ label: string, id: string, value: Date | null, onChange: (d: Date | null) => void, disabled?: boolean, error?: string }> = ({label, id, value, onChange, disabled, error}) => {
    const [displayDate, setDisplayDate] = useState(value || new Date());
    
    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(null);
    };

    return (
         <div className="w-full">
             <label htmlFor={id} className="block text-sm font-semibold text-text-primary dark:text-dark-text-primary mb-2">{label}</label>
            <Popover>
                <Popover.Trigger>
                    <button id={id} type="button" disabled={disabled} className={`w-full h-14 pl-4 pr-16 relative bg-bg-tertiary dark:bg-dark-bg-primary border rounded-lg focus:outline-none focus:ring-0 focus:border-2 text-left flex items-center data-[state=open]:border-brand-navy dark:data-[state=open]:border-dark-brand-orange ${error ? 'border-2 border-system-error' : 'border-border-color dark:border-dark-border-color'} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}>
                        {value ? (
                            <span className="text-text-primary dark:text-dark-text-primary">{formatDate(value)}</span>
                        ) : (
                            <span className="text-gray-400 italic">Select date</span>
                        )}
                        {value && !disabled && (
                            <button type="button" onClick={handleClear} className="absolute right-10 top-1/2 -translate-y-1/2 p-1 rounded-full text-text-secondary/80 hover:bg-black/10 dark:hover:bg-white/10" aria-label="Clear date">
                                <Icon className="!text-xl">close</Icon>
                            </button>
                        )}
                        <Icon className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary/80">calendar_today</Icon>
                    </button>
                </Popover.Trigger>
                <Popover.Content className="!w-auto !p-0">
                    <DatePickerPopoverContent
                        value={value}
                        onChange={onChange}
                        displayDate={displayDate}
                        setDisplayDate={setDisplayDate}
                    />
                </Popover.Content>
            </Popover>
            {error && <p className="text-sm text-system-error mt-1">{error}</p>}
        </div>
    );
};
