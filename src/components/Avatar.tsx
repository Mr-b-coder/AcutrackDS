// FILE: components/Avatar.tsx
// This component displays a user's avatar or initials, with an optional status indicator.

import React from 'react';

export interface AvatarProps {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'away';
  className?: string;
}
export const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'md', status, className = '' }) => {
    const getInitials = (name: string) => {
        const parts = name.split(' ').filter(Boolean);
        if (parts.length === 0) return '?';
        const first = parts[0][0];
        const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
        return `${first}${last}`.toUpperCase();
    };

    const sizeClasses = {
        xs: 'h-6 w-6 text-xs', sm: 'h-8 w-8 text-sm', md: 'h-10 w-10 text-base', lg: 'h-12 w-12 text-lg', xl: 'h-16 w-16 text-xl',
    };
    const statusSizeClasses = {
        xs: 'h-1.5 w-1.5', sm: 'h-2 w-2', md: 'h-2.5 w-2.5', lg: 'h-3 w-3', xl: 'h-4 w-4',
    };
    const statusColorClasses = {
        online: 'bg-system-success', away: 'bg-system-warning', offline: 'bg-gray-400',
    };

    return (
        <div className={`relative inline-block shrink-0 ${sizeClasses[size!]} ${className}`}>
            {src ? (
                <img src={src} alt={name} className="h-full w-full rounded-full object-cover" />
            ) : (
                <div className="h-full w-full rounded-full bg-brand-navy flex items-center justify-center font-bold text-white">
                    {getInitials(name)}
                </div>
            )}
            {status && (
                <span className={`absolute bottom-0 right-0 block rounded-full ring-2 ring-bg-secondary dark:ring-dark-bg-secondary ${statusSizeClasses[size!]} ${statusColorClasses[status]}`} />
            )}
        </div>
    );
};

export const AvatarGroup: React.FC<{ children: React.ReactNode; max?: number; className?: string; }> = ({ children, max = 4, className = '' }) => {
    const avatars = React.Children.toArray(children);
    const visibleAvatars = avatars.slice(0, max);
    const hiddenCount = avatars.length - max;
    return (
        <div className={`flex items-center -space-x-3 ${className}`}>
            {visibleAvatars}
            {hiddenCount > 0 && (
                <div className="relative z-10 h-10 w-10 text-sm flex items-center justify-center rounded-full bg-bg-tertiary dark:bg-dark-bg-tertiary border-2 border-bg-secondary dark:border-dark-bg-secondary font-bold text-text-secondary dark:text-dark-text-secondary">
                    +{hiddenCount}
                </div>
            )}
        </div>
    );
};
