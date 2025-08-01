// FILE: components/CalendarGridView.tsx
// This component displays the month or year grid for the date pickers.

import React from 'react';
import { monthNames } from './date-helpers.ts';

export const CalendarGridView: React.FC<{
    view: 'months' | 'years';
    displayDate: Date;
    onMonthSelect: (monthIndex: number) => void;
    onYearSelect: (year: number) => void;
}> = ({ view, displayDate, onMonthSelect, onYearSelect }) => {
    const year = displayDate.getFullYear();
    const currentDecadeStart = Math.floor(year / 12) * 12;

    if (view === 'months') {
        return (
            <div className="grid grid-cols-3 gap-2 p-2">
                {monthNames.map((m, i) => (
                    <button
                        key={m}
                        onClick={() => onMonthSelect(i)}
                        className={`p-2 h-14 rounded-lg text-sm font-semibold transition-colors text-text-primary dark:text-dark-text-primary hover:bg-bg-tertiary dark:hover:bg-dark-bg-tertiary`}
                    >
                        {m.substring(0, 3)}
                    </button>
                ))}
            </div>
        );
    }
    
    if (view === 'years') {
        return (
            <div className="grid grid-cols-4 gap-2 p-2">
                {Array.from({ length: 12 }).map((_, i) => {
                    const y = currentDecadeStart + i;
                    return (
                        <button
                            key={y}
                            onClick={() => onYearSelect(y)}
                            className={`p-2 h-14 rounded-lg text-sm font-semibold transition-colors text-text-primary dark:text-dark-text-primary hover:bg-bg-tertiary dark:hover:bg-dark-bg-tertiary`}
                        >
                            {y}
                        </button>
                    );
                })}
            </div>
        );
    }
    return null;
};
