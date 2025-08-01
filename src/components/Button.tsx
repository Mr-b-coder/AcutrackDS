// FILE: components/Button.tsx
// This is the primary interactive button component for the design system.

import React from 'react';
import { Spinner } from './Spinner.tsx';
import { Icon } from './icons.tsx';

type ButtonOwnProps<C extends React.ElementType> = {
    as?: C;
    children: React.ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary' | 'text';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    disabled?: boolean;
};

type ButtonProps<C extends React.ElementType> = ButtonOwnProps<C> &
  Omit<React.ComponentPropsWithRef<C>, keyof ButtonOwnProps<C>>;

const ButtonInner = <C extends React.ElementType = 'button'>(
    {
        children,
        className,
        variant = 'primary',
        size = 'md',
        leftIcon,
        rightIcon,
        disabled = false,
        as,
        ...rest
    }: ButtonProps<C>,
    ref: React.ComponentPropsWithRef<C>['ref']
) => {
    const Component = as || 'button';
    const baseClasses =
        'inline-flex items-center justify-center font-bold border rounded-md transition-all duration-150 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-dark-bg-primary focus-visible:ring-brand-orange disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]';

    const sizeClasses: Record<NonNullable<ButtonOwnProps<'button'>['size']>, string> = {
        xs: 'px-2.5 py-1.5 text-xs gap-1 h-8',
        sm: 'px-3 py-2 text-sm gap-1.5 h-10',
        md: 'px-4 py-2.5 text-sm gap-2 h-12',
        lg: 'px-5 py-3 text-base gap-2.5 h-14',
        xl: 'px-6 py-3.5 text-lg gap-3 h-16',
    };

    const variantClasses: Record<NonNullable<ButtonOwnProps<'button'>['variant']>, string> = {
        primary: 'bg-brand-orange border-transparent text-white hover:bg-brand-orange-hover disabled:hover:bg-brand-orange',
        secondary: 'bg-bg-tertiary dark:bg-dark-bg-tertiary border-border-color dark:border-dark-text-secondary text-text-primary dark:text-dark-text-primary hover:bg-border-color/60 dark:hover:bg-dark-border-color/60',
        text: 'bg-transparent border-transparent text-text-primary dark:text-dark-text-primary hover:bg-bg-tertiary dark:hover:bg-dark-bg-tertiary',
    };

    const combinedClasses = [baseClasses, sizeClasses[size!], variantClasses[variant!], className]
        .filter(Boolean)
        .join(' ');

    const iconSizeClasses: Record<NonNullable<ButtonOwnProps<'button'>['size']>, string> = {
        xs: '!text-base',
        sm: '!text-base',
        md: '!text-xl',
        lg: '!text-xl',
        xl: '!text-2xl',
    };

    const renderIcon = (icon: React.ReactNode) => {
        if (React.isValidElement<{ className?: string }>(icon)) {
            return React.cloneElement(icon, { className: `${iconSizeClasses[size!]} ${icon.props.className || ''}` });
        }
        return icon;
    };

    return (
        <Component className={combinedClasses} disabled={disabled} ref={ref} {...rest}>
            {leftIcon && renderIcon(leftIcon)}
            {children}
            {rightIcon && renderIcon(rightIcon)}
        </Component>
    );
};

export const Button = React.forwardRef(ButtonInner) as <C extends React.ElementType = 'button'>(props: ButtonProps<C>) => React.ReactElement | null;
