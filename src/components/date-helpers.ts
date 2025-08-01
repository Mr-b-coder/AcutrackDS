// FILE: components/date-helpers.ts
// This file contains shared helper functions for date picker components.

export const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
export const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const isSameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export const formatDate = (date: Date | null): string => {
  if (!date) return '';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const getPresetRanges = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const thisWeekStart = new Date(today);
    thisWeekStart.setDate(today.getDate() - today.getDay());
    const thisWeekEnd = new Date(thisWeekStart);
    thisWeekEnd.setDate(thisWeekStart.getDate() + 6);

    const last7DaysStart = new Date(today);
    last7DaysStart.setDate(today.getDate() - 6);
    
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const thisMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const lastMonthDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthStart = new Date(lastMonthDate.getFullYear(), lastMonthDate.getMonth(), 1);
    const lastMonthEnd = new Date(lastMonthDate.getFullYear(), lastMonthDate.getMonth() + 1, 0);
    
    return {
        today: { start: today, end: today },
        yesterday: { start: yesterday, end: yesterday },
        thisWeek: { start: thisWeekStart, end: thisWeekEnd },
        last7Days: { start: last7DaysStart, end: today },
        thisMonth: { start: thisMonthStart, end: thisMonthEnd },
        lastMonth: { start: lastMonthStart, end: lastMonthEnd },
    };
};
