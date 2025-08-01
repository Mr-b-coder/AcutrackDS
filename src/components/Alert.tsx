// FILE: components/Alert.tsx
// This component displays a contextual feedback message.

import React, { useState } from 'react';
import { Icon } from './icons.tsx';

export type AlertVariant = 'success' | 'warning' | 'error' | 'info';

export interface AlertProps {
  variant?: AlertVariant;
  title: string;
  children: React.ReactNode;
  isDismissible?: boolean;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ variant = 'info', title, children, isDismissible, className = '' }) => {
    const [isOpen, setIsOpen] = useState(true);
    if (!isOpen) return null;
    const variantConfig = {
        info: { icon: 'info', classes: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200' },
        success: { icon: 'check_circle', classes: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200' },
        warning: { icon: 'warning', classes: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200' },
        error: { icon: 'cancel', classes: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200' },
    };
    const styles = variantConfig[variant!];
    return (
        <div className={`w-full p-4 rounded-lg flex items-start gap-4 ${styles.classes} ${className}`} role="alert">
            <Icon className="!text-2xl mt-0.5 shrink-0">{styles.icon}</Icon>
            <div className="flex-grow">
                <h4 className="font-bold">{title}</h4>
                <div className="text-sm mt-1">{children}</div>
            </div>
            {isDismissible && (
                <button onClick={() => setIsOpen(false)} aria-label="Dismiss alert" className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10">
                    <Icon className="!text-xl">close</Icon>
                </button>
            )}
        </div>
    );
};
