
import React, { useState } from 'react';
import { Icon } from './icons.tsx';

export type BannerVariant = 'success' | 'warning' | 'error' | 'info';

export interface BannerProps {
  variant?: BannerVariant;
  children: React.ReactNode;
  onDismiss?: () => void;
  icon?: string;
  actions?: React.ReactNode;
  className?: string;
}

export const Banner: React.FC<BannerProps> = ({
  variant = 'info',
  children,
  onDismiss,
  icon,
  actions,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    } else {
      setIsOpen(false);
    }
  };

  const variantConfig = {
    info: {
      icon: icon || 'info',
      classes: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200',
    },
    success: {
      icon: icon || 'check_circle',
      classes: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200',
    },
    warning: {
      icon: icon || 'warning',
      classes: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
    },
    error: {
      icon: icon || 'cancel',
      classes: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200',
    },
  };

  const styles = variantConfig[variant];

  return (
    <div className={`w-full p-4 rounded-lg flex items-center gap-4 ${styles.classes} ${className}`} role="alert">
      <Icon className="!text-2xl shrink-0">{styles.icon}</Icon>
      <div className="flex-grow font-medium text-sm">{children}</div>
      {actions && <div className="shrink-0">{actions}</div>}
      {onDismiss && (
        <button
          onClick={handleDismiss}
          aria-label="Dismiss banner"
          className="-mr-1 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
        >
          <Icon className="!text-xl">close</Icon>
        </button>
      )}
    </div>
  );
};