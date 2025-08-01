// FILE: components/DateRangePicker.tsx
// This component provides a user-friendly way to select a date range.

import React, { useState, useMemo } from 'react';
import { Popover } from './Popover.tsx';
import { Button } from './Button.tsx';
import { Icon } from './icons.tsx';
import { Calendar } from './Calendar.tsx';
import { CalendarGridView } from './CalendarGridView.tsx';
import { formatDate, getPresetRanges } from './date-helpers.ts';
import { monthNames } from './date-helpers.ts';

export type DateRange = { start: Date | null; end: Date | null };

const PresetPanel: React.FC<{ onSelect: (range: DateRange) => void }> = ({ onSelect }) => {
    const presets = [
        { label: 'Today', range: getPresetRanges().today },
        { label: 'Yesterday', range: getPresetRanges().yesterday },
        { label: 'This Week', range: getPresetRanges().thisWeek },
        { label: 'Last 7 Days', range: getPresetRanges().last7Days },
        { label: 'This Month', range: getPresetRanges().thisMonth },
        { label: 'Last Month', range: getPresetRanges().lastMonth },
    ];

    return (
        <div className="w-full sm:w-40 p-2 border-b sm:border-b-0 sm:border-r border-border-color dark:border-dark-border-color">
            <ul className="space-y-1">
                {presets.map(({ label, range }) => (
                    <li key={label}>
                        <button
                            onClick={() => onSelect(range)}
                            className="w-full text-left px-3 py-1.5 text-sm rounded-md hover:bg-bg-tertiary dark:hover:bg-dark-bg-tertiary text-text-primary dark:text-dark-text-primary"
                        >
                            {label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const DateRangePicker: React.FC<{ label: string, id: string, value: DateRange, onChange: (d: DateRange) => void, disabled?: boolean, error?: string }> = ({label, id, value, onChange, disabled, error}) => {
    const [displayDate, setDisplayDate] = useState(value.start || new Date());
    const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
    const [selecting, setSelecting] = useState<'start' | 'end'>('start');
    const [view, setView] = useState<'days' | 'months' | 'years'>('days');

    const rightDisplayDate = useMemo(() => {
        const d = new Date(displayDate);
        d.setMonth(d.getMonth() + 1);
        return d;
    }, [displayDate]);

    const handleDateSelect = (date: Date) => {
        if (selecting === 'start' || !value.start || date < value.start) {
            onChange({ start: date, end: null });
            setSelecting('end');
        } else {
            onChange({ ...value, end: date });
            setSelecting('start');
        }
    };
    
    const handlePresetSelect = (range: DateRange) => {
        onChange(range);
        if (range.start) {
            setDisplayDate(range.start);
        }
    };
    
    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange({ start: null, end: null });
    };

    const year = displayDate.getFullYear();
    const currentDecadeStart = Math.floor(year / 12) * 12;
    let headerTitle = '';
    if (view === 'months') headerTitle = `${year}`;
    else if (view === 'years') headerTitle = `${currentDecadeStart} - ${currentDecadeStart + 11}`;

    const handleHeaderClick = () => {
        if (view === 'months') setView('years');
    };

    const handlePrevPeriod = () => {
        if (view === 'days') setDisplayDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
        if (view === 'months') setDisplayDate(d => new Date(d.getFullYear() - 1, d.getMonth(), 1));
        if (view === 'years') setDisplayDate(d => new Date(currentDecadeStart - 12, d.getMonth(), 1));
    };

    const handleNextPeriod = () => {
        if (view === 'days') setDisplayDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));
        if (view === 'months') setDisplayDate(d => new Date(d.getFullYear() + 1, d.getMonth(), 1));
        if (view === 'years') setDisplayDate(d => new Date(currentDecadeStart + 12, d.getMonth(), 1));
    };

     return (
         <div className="w-full">
             <label htmlFor={id} className="block text-sm font-semibold text-text-primary dark:text-dark-text-primary mb-2">{label}</label>
            <Popover>
                <Popover.Trigger>
                    <button id={id} type="button" disabled={disabled} className={`w-full h-14 pl-4 pr-16 relative bg-bg-tertiary dark:bg-dark-bg-primary border rounded-lg focus:outline-none focus:ring-0 focus:border-2 text-left flex items-center data-[state=open]:border-brand-navy dark:data-[state=open]:border-dark-brand-orange ${error ? 'border-2 border-system-error' : 'border-border-color dark:border-dark-border-color'} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}>
                        <span className="truncate">
                            {value.start && value.end ? (
                                <span className="text-text-primary dark:text-dark-text-primary">
                                    {formatDate(value.start)} - {formatDate(value.end)}
                                </span>
                            ) : (
                                <span className="text-gray-400 italic">Select date range</span>
                            )}
                        </span>
                        {value.start && !disabled && (
                            <button type="button" onClick={handleClear} className="absolute right-10 top-1/2 -translate-y-1/2 p-1 rounded-full text-text-secondary/80 hover:bg-black/10 dark:hover:bg-white/10" aria-label="Clear date range">
                                <Icon className="!text-xl">close</Icon>
                            </button>
                        )}
                        <Icon className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary/80">calendar_today</Icon>
                    </button>
                </Popover.Trigger>
                <Popover.Content className="!w-auto !max-w-none !p-0">
                    <div className="flex flex-col sm:flex-row">
                        <PresetPanel onSelect={handlePresetSelect} />
                        {view === 'days' ? (
                            <div className="flex flex-col">
                                <div className="flex justify-between items-center px-4 pt-2">
                                    <Button variant="text" size="sm" className="!p-2" onClick={handlePrevPeriod} aria-label="Previous month"><Icon>chevron_left</Icon></Button>
                                    <div className="flex gap-8">
                                        <Button variant="text" size="sm" className="font-bold text-text-primary dark:text-dark-text-primary w-32 justify-center" onClick={() => setView('months')}>
                                            {monthNames[displayDate.getMonth()]} {displayDate.getFullYear()}
                                        </Button>
                                        <Button variant="text" size="sm" className="font-bold text-text-primary dark:text-dark-text-primary w-32 justify-center" onClick={() => setView('months')}>
                                            {monthNames[rightDisplayDate.getMonth()]} {rightDisplayDate.getFullYear()}
                                        </Button>
                                    </div>
                                    <Button variant="text" size="sm" className="!p-2" onClick={handleNextPeriod} aria-label="Next month"><Icon>chevron_right</Icon></Button>
                                </div>
                                <div className="flex" onMouseLeave={() => setHoveredDate(null)}>
                                    <Calendar selectedValue={value} onDateSelect={handleDateSelect} displayDate={displayDate} onDisplayDateChange={setDisplayDate} showNav={false} hoveredDate={hoveredDate} onDateHover={setHoveredDate} />
                                    <div className="border-l border-border-color dark:border-dark-border-color my-2"></div>
                                    <Calendar selectedValue={value} onDateSelect={handleDateSelect} displayDate={rightDisplayDate} onDisplayDateChange={() => {}} showNav={false} hoveredDate={hoveredDate} onDateHover={setHoveredDate} />
                                </div>
                            </div>
                        ) : (
                            <div className="p-2 w-[18.5rem]">
                                <div className="flex justify-between items-center mb-2 px-2">
                                    <Button variant="text" size="sm" className="!p-2" onClick={handlePrevPeriod} aria-label="Previous period"><Icon>chevron_left</Icon></Button>
                                    <Button variant="text" size="sm" className="font-bold text-text-primary dark:text-dark-text-primary" onClick={handleHeaderClick} disabled={view === 'years'}>
                                        {headerTitle}
                                    </Button>
                                    <Button variant="text" size="sm" className="!p-2" onClick={handleNextPeriod} aria-label="Next period"><Icon>chevron_right</Icon></Button>
                                </div>
                                <CalendarGridView
                                    view={view}
                                    displayDate={displayDate}
                                    onMonthSelect={(monthIndex) => {
                                        setDisplayDate(new Date(displayDate.getFullYear(), monthIndex, 1));
                                        setView('days');
                                    }}
                                    onYearSelect={(year) => {
                                        setDisplayDate(new Date(year, displayDate.getMonth(), 1));
                                        setView('months');
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </Popover.Content>
            </Popover>
             {error && <p className="text-sm text-system-error mt-1">{error}</p>}
        </div>
    );
};
