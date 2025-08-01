
// FILE: components/Dropdown.tsx
import React, { useState, useRef, createContext, useContext } from 'react';
import { Icon, useOnClickOutside } from './icons.tsx';

// --- TYPES & CONTEXT ---
export type DropdownPosition =
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'top' | 'top-start' | 'top-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end';

interface DropdownContextType {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const DropdownContext = createContext<DropdownContextType | null>(null);

export const useDropdown = () => {
    const context = useContext(DropdownContext);
    if (!context) throw new Error('useDropdown must be used within a Dropdown.Root');
    return context;
};

// --- ROOT ---
const DropdownRoot: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(dropdownRef, () => setIsOpen(false));

    return (
        <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
            <div ref={dropdownRef} className="relative inline-block text-left">{children}</div>
        </DropdownContext.Provider>
    );
};
DropdownRoot.displayName = 'Dropdown.Root';

// --- TRIGGER ---
const DropdownTrigger: React.FC<{ children: React.ReactElement<any> }> = ({ children }) => {
    const { isOpen, setIsOpen } = useDropdown();
    const child = React.Children.only(children);
    
    return React.cloneElement(child, {
        onClick: (e: React.MouseEvent) => {
            e.preventDefault();
            setIsOpen(prev => !prev);
            child.props.onClick?.(e);
        },
        'aria-haspopup': 'menu',
        'aria-expanded': isOpen,
    });
};
DropdownTrigger.displayName = 'Dropdown.Trigger';

// --- CONTENT ---
interface DropdownContentProps {
    children: React.ReactNode;
    position?: DropdownPosition;
    className?: string;
}
const DropdownContent: React.FC<DropdownContentProps> = ({ children, position = 'bottom-start', className = '' }) => {
    const { isOpen } = useDropdown();
    
    const positionClasses: Record<DropdownPosition, string> = {
        'top': 'bottom-full left-1/2 -translate-x-1/2 mb-2 origin-bottom',
        'top-start': 'bottom-full left-0 mb-2 origin-bottom-left',
        'top-end': 'bottom-full right-0 mb-2 origin-bottom-right',
        'bottom': 'top-full left-1/2 -translate-x-1/2 mt-2 origin-top',
        'bottom-start': 'top-full left-0 mt-2 origin-top-left',
        'bottom-end': 'top-full right-0 mt-2 origin-top-right',
        'left': 'right-full top-1/2 -translate-y-1/2 mr-2 origin-right',
        'left-start': 'right-full top-0 mr-2 origin-top-right',
        'left-end': 'right-full bottom-0 mr-2 origin-bottom-right',
        'right': 'left-full top-1/2 -translate-y-1/2 ml-2 origin-left',
        'right-start': 'left-full top-0 ml-2 origin-top-left',
        'right-end': 'left-full bottom-0 ml-2 origin-bottom-left',
    };

    const visibilityClasses = isOpen
        ? 'opacity-100 scale-100'
        : 'opacity-0 scale-95 pointer-events-none';

    return (
        <div
            role="menu"
            className={`absolute z-30 w-56 rounded-lg shadow-2xl bg-bg-secondary dark:bg-dark-bg-secondary border border-border-color dark:border-dark-border-color focus:outline-none py-1 transition-all duration-150 ease-out ${positionClasses[position]} ${visibilityClasses} ${className}`}
        >
            {children}
        </div>
    );
};
DropdownContent.displayName = 'Dropdown.Content';

// --- ITEM ---
interface DropdownItemProps {
    children: React.ReactNode;
    icon?: string;
    onSelect?: () => void;
    disabled?: boolean;
    className?: string;
}
const DropdownItem: React.FC<DropdownItemProps> = ({ children, icon, onSelect, disabled = false, className = '' }) => {
    const { setIsOpen } = useDropdown();
    const handleSelect = () => {
        if (disabled) return;
        onSelect?.();
        setIsOpen(false);
    };
    return (
        <button
            role="menuitem"
            onClick={handleSelect}
            disabled={disabled}
            className={`w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-text-secondary dark:text-dark-text-secondary hover:bg-bg-tertiary dark:hover:bg-dark-bg-tertiary hover:text-text-primary dark:hover:text-dark-text-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-transparent ${className}`}
        >
            {icon && <Icon className="!text-xl">{icon}</Icon>}
            <span>{children}</span>
        </button>
    );
};
DropdownItem.displayName = 'Dropdown.Item';

// --- SEPARATOR ---
const DropdownSeparator: React.FC = () => (
    <div className="my-1 h-px bg-border-color dark:bg-dark-border-color" />
);
DropdownSeparator.displayName = 'Dropdown.Separator';

export const Dropdown = Object.assign(DropdownRoot, {
    Trigger: DropdownTrigger,
    Content: DropdownContent,
    Item: DropdownItem,
    Separator: DropdownSeparator,
});