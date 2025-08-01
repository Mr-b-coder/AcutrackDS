// FILE: components/Badge.tsx
// This component displays a small status descriptor.

import React from 'react';

export interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
  children: React.ReactNode;
  className?: string;
}
export const Badge: React.FC<BadgeProps> = ({ variant = 'default', children, className = '' }) => {
    const variantClasses = {
        default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
        error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${variantClasses[variant!]} ${className}`}>
            {children}
        </span>
    );
};
