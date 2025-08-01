// FILE: components/Popover.tsx
import React, { useState, useRef, createContext, useContext } from 'react';
import { useOnClickOutside } from './icons.tsx';

// --- TYPES & CONTEXT ---
export type PopoverPosition =
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'top' | 'top-start' | 'top-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end';

interface PopoverContextType {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const PopoverContext = createContext<PopoverContextType | null>(null);

export const usePopover = () => {
    const context = useContext(PopoverContext);
    if (!context) throw new Error('usePopover must be used within a Popover.Root');
    return context;
};

// --- ROOT ---
const PopoverRoot: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(popoverRef, () => setIsOpen(false));

    return (
        <PopoverContext.Provider value={{ isOpen, setIsOpen }}>
            <div ref={popoverRef} className="relative inline-block">{children}</div>
        </PopoverContext.Provider>
    );
};
PopoverRoot.displayName = 'Popover.Root';

// --- TRIGGER ---
const PopoverTrigger: React.FC<{ children: React.ReactElement<any> }> = ({ children }) => {
    const { isOpen, setIsOpen } = usePopover();
    const child = React.Children.only(children);
    
    return React.cloneElement(child, {
        onClick: (e: React.MouseEvent) => {
            e.preventDefault();
            setIsOpen(prev => !prev);
            child.props.onClick?.(e);
        },
        'aria-haspopup': 'dialog',
        'aria-expanded': isOpen,
        'data-state': isOpen ? 'open' : 'closed',
    });
};
PopoverTrigger.displayName = 'Popover.Trigger';

// --- CONTENT ---
interface PopoverContentProps {
    children: React.ReactNode;
    position?: PopoverPosition;
    className?: string;
}
const PopoverContent: React.FC<PopoverContentProps> = ({ children, position = 'bottom', className = '' }) => {
    const { isOpen } = usePopover();

    const positionClasses: Record<PopoverPosition, string> = {
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
            role="dialog"
            className={`absolute z-30 w-screen max-w-lg rounded-lg shadow-2xl bg-bg-secondary dark:bg-dark-bg-secondary border border-border-color dark:border-dark-border-color focus:outline-none p-4 transition-all duration-150 ease-out ${positionClasses[position]} ${visibilityClasses} ${className}`}
        >
            {children}
        </div>
    );
};
PopoverContent.displayName = 'Popover.Content';

export const Popover = Object.assign(PopoverRoot, {
    Trigger: PopoverTrigger,
    Content: PopoverContent,
});