// FILE: components/SplitButton.tsx
// This component combines a primary action button with a dropdown of secondary actions.

import React from 'react';
import { Button } from './Button.tsx';
import { Dropdown } from './Dropdown.tsx';
import { Icon } from './icons.tsx';
import { Spinner } from './Spinner.tsx';

// Re-declaring this type locally to avoid circular dependencies if Button needs it
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

interface SplitButtonProps {
    primaryActionLabel: React.ReactNode;
    onPrimaryClick: () => void;
    children: React.ReactNode;
    variant?: ButtonOwnProps<'button'>['variant'];
    size?: ButtonOwnProps<'button'>['size'];
    leftIcon?: ButtonOwnProps<'button'>['leftIcon'];
    disabled?: boolean;
    isLoading?: boolean;
    loadingText?: string;
}
export const SplitButton: React.FC<SplitButtonProps> = ({ primaryActionLabel, onPrimaryClick, children, variant, size, leftIcon, disabled, isLoading, loadingText = "Saving..." }) => (
    <div className="inline-flex">
        <Button
            variant={variant}
            size={size}
            leftIcon={isLoading ? <Spinner size="sm" color={variant === 'primary' ? 'white' : 'primary'} /> : leftIcon}
            onClick={onPrimaryClick}
            disabled={disabled || isLoading}
            className="rounded-r-none focus:z-10"
        >
            {isLoading ? loadingText : primaryActionLabel}
        </Button>
        <Dropdown>
            <Dropdown.Trigger>
                <Button
                    variant={variant}
                    size={size}
                    disabled={disabled || isLoading}
                    className="rounded-l-none -ml-px px-2"
                >
                    <Icon>arrow_drop_down</Icon>
                </Button>
            </Dropdown.Trigger>
            <Dropdown.Content position="bottom-end">
                {children}
            </Dropdown.Content>
        </Dropdown>
    </div>
);
