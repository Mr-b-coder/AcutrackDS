// FILE: components/Calendar.tsx
// This is the core calendar grid component used by the date pickers.

import React, { useState } from 'react';
import { DateRange } from './DateRangePicker.tsx';
import { dayNames, monthNames, isSameDay } from './date-helpers.ts';
import { CalendarGridView } from './CalendarGridView.tsx';
import { Button } from './Button.tsx';
import { Icon } from './icons.tsx';

export const Calendar: React.FC<{
  displayDate: Date;
  onDisplayDateChange: (d: Date) => void;
  selectedValue: Date | null | DateRange;
  onDateSelect: (d: Date) => void;
  hoveredDate?: Date | null;
  onDateHover?: (d: Date | null) => void;
  showNav?: boolean;
}> = ({ displayDate, onDisplayDateChange, selectedValue, onDateSelect, hoveredDate, onDateHover, showNav = true }) => {
    const [view, setView] = useState<'days' | 'months' | 'years'>('days');
    const year = displayDate.getFullYear();
    const month = displayDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dates = Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
    const paddingDays = Array.from({ length: firstDay });
    
    const handleHeaderClick = () => {
        if (view === 'days') setView('months');
        if (view === 'months') setView('years');
    };
    
    const currentDecadeStart = Math.floor(year / 12) * 12;
    const handlePrevClick = () => {
        if (view === 'days') onDisplayDateChange(new Date(year, month - 1, 1));
        if (view === 'months') onDisplayDateChange(new Date(year - 1, month, 1));
        if (view === 'years') onDisplayDateChange(new Date(currentDecadeStart - 12, month, 1));
    };

    const handleNextClick = () => {
        if (view === 'days') onDisplayDateChange(new Date(year, month + 1, 1));
        if (view === 'months') onDisplayDateChange(new Date(year + 1, month, 1));
        if (view === 'years') onDisplayDateChange(new Date(currentDecadeStart + 12, month, 1));
    };
    
    let headerTitle = '';
    if (view === 'days') headerTitle = `${monthNames[month]} ${year}`;
    else if (view === 'months') headerTitle = `${year}`;
    else headerTitle = `${currentDecadeStart} - ${currentDecadeStart + 11}`;

    return (
        <div className="p-2 w-[18.5rem] shrink-0">
            {showNav && (
                <div className="flex justify-between items-center mb-2 px-2">
                    <Button variant="text" size="sm" className="!p-2" onClick={handlePrevClick} aria-label="Previous period"><Icon>chevron_left</Icon></Button>
                     <Button variant="text" size="sm" className="font-bold text-text-primary dark:text-dark-text-primary" onClick={handleHeaderClick} disabled={view === 'years'}>
                        {headerTitle}
                    </Button>
                    <Button variant="text" size="sm" className="!p-2" onClick={handleNextClick} aria-label="Next period"><Icon>chevron_right</Icon></Button>
                </div>
            )}
            
            {view === 'days' && (
                <>
                    <div className="grid grid-cols-7 text-center text-xs text-text-secondary dark:text-dark-text-secondary">
                        {dayNames.map(day => <div key={day} className="w-10 h-10 flex items-center justify-center font-bold" aria-hidden="true">{day}</div>)}
                    </div>
                    <div className="grid grid-cols-7" onMouseLeave={() => onDateHover?.(null)}>
                        {paddingDays.map((_, i) => <div key={`pad-${i}`} className="w-10 h-10"></div>)}
                        {dates.map(date => {
                            const isSelected = selectedValue && !('start' in selectedValue) && selectedValue && isSameDay(date, selectedValue);
                            
                             const [effectiveStart, effectiveEnd] = (() => {
                                if (!selectedValue || !('start' in selectedValue) || !selectedValue.start) return [null, null];
                                let start = selectedValue.start;
                                let end = selectedValue.end;
                                if (!end && hoveredDate) {
                                    end = hoveredDate;
                                }
                                if (start && end && start > end) {
                                    return [end, start];
                                }
                                return [start, end];
                            })();

                            const isSelectionStart = effectiveStart && isSameDay(date, effectiveStart);
                            const isSelectionEnd = effectiveEnd && isSameDay(date, effectiveEnd);
                            const isWithinSelection = effectiveStart && effectiveEnd && date >= effectiveStart && date <= effectiveEnd;
                            const isSingleDayRange = effectiveStart && effectiveEnd && isSameDay(effectiveStart, effectiveEnd);
                            
                            let containerClasses = "w-10 h-10 flex items-center justify-center";
                            
                            if (isWithinSelection && !isSingleDayRange) {
                                containerClasses += " bg-brand-orange/10 dark:bg-dark-brand-orange/20";
                                
                                if (isSelectionStart || date.getDay() === 0) {
                                    containerClasses += ' rounded-l-full';
                                }
                                if (isSelectionEnd || date.getDay() === 6) {
                                    containerClasses += ' rounded-r-full';
                                }
                            }

                            const baseClasses = "relative z-10 w-9 h-9 flex items-center justify-center rounded-full cursor-pointer transition-colors";
                            const hoverClasses = !(isSelectionStart || isSelectionEnd) ? "hover:bg-brand-orange/10 dark:hover:bg-dark-brand-orange/20" : "";
                            const selectedClasses = isSelected || isSelectionStart || isSelectionEnd ? "bg-brand-orange text-white hover:!bg-brand-orange-hover" : "text-text-primary dark:text-dark-text-primary";

                            return (
                                <div key={date.toString()} className={containerClasses}>
                                     <button
                                        onClick={() => onDateSelect(date)}
                                        onMouseEnter={() => onDateHover?.(date)}
                                        className={`${baseClasses} ${hoverClasses} ${selectedClasses}`}
                                    >{date.getDate()}</button>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
            {(view === 'months' || view === 'years') && (
                <CalendarGridView 
                    view={view}
                    displayDate={displayDate}
                    onMonthSelect={(monthIndex) => {
                        onDisplayDateChange(new Date(year, monthIndex, 1));
                        setView('days');
                    }}
                    onYearSelect={(selectedYear) => {
                        onDisplayDateChange(new Date(selectedYear, month, 1));
                        setView('months');
                    }}
                />
            )}
        </div>
    );
};
