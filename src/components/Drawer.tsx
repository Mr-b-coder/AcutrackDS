// FILE: components/Drawer.tsx
import React, { useRef, useEffect, createContext, useContext, useState } from 'react';
import { Icon } from './icons.tsx';

const useFocusTrap = (ref: React.RefObject<HTMLElement>, isOpen: boolean) => {
    const triggerElementRef = useRef<HTMLElement | null>(null);
    useEffect(() => {
        if (isOpen) {
            triggerElementRef.current = document.activeElement as HTMLElement;
            const focusableElements = ref.current?.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            if (!focusableElements || focusableElements.length === 0) return;
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            setTimeout(() => firstElement.focus(), 100);
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key !== 'Tab') return;
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            };
            const drawerElement = ref.current;
            drawerElement?.addEventListener('keydown', handleKeyDown);
            return () => {
                drawerElement?.removeEventListener('keydown', handleKeyDown);
                triggerElementRef.current?.focus();
            };
        }
    }, [isOpen, ref]);
};


// --- TYPES & CONTEXT ---
type DrawerPosition = 'left' | 'right';
const DrawerContext = createContext<{ onClose: () => void; position: DrawerPosition } | null>(null);
const useDrawerContext = () => {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error('Drawer sub-components must be used within a Drawer.Root component.');
    }
    return context;
};

// --- SUB-COMPONENTS ---
const DrawerHeader: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => {
    const { onClose } = useDrawerContext();
    return (
        <div className={`flex items-start justify-between p-6 border-b border-border-color dark:border-dark-border-color shrink-0 ${className}`}>
            <h3 id="drawer-title" className="text-xl font-bold font-heading text-text-primary dark:text-dark-text-primary">{children}</h3>
            <button onClick={onClose} aria-label="Close drawer" className="p-1 -mt-1 -mr-2 rounded-full text-text-secondary dark:text-dark-text-secondary hover:bg-bg-tertiary dark:hover:bg-dark-bg-tertiary transition-colors">
                <Icon>close</Icon>
            </button>
        </div>
    );
};
DrawerHeader.displayName = 'Drawer.Header';

const DrawerBody: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
    <div id="drawer-description" className={`p-6 overflow-y-auto custom-scrollbar flex-grow ${className}`}>
        {children}
    </div>
);
DrawerBody.displayName = 'Drawer.Body';

const DrawerFooter: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
    <div className={`flex justify-end items-center gap-4 p-6 bg-bg-tertiary/50 dark:bg-dark-bg-tertiary/20 border-t border-border-color dark:border-dark-border-color shrink-0 ${className}`}>
        {children}
    </div>
);
DrawerFooter.displayName = 'Drawer.Footer';

// --- ROOT COMPONENT ---
interface DrawerRootProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    position?: DrawerPosition;
}

const DrawerRoot: React.FC<DrawerRootProps> = ({ isOpen, onClose, children, position = 'right' }) => {
    const drawerRef = useRef<HTMLDivElement>(null);
    const [isAnimatingOut, setAnimatingOut] = useState(false);

    useFocusTrap(drawerRef, isOpen);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    const handleClose = () => {
        setAnimatingOut(true);
    };

    const handleAnimationEnd = () => {
        if (isAnimatingOut) {
            setAnimatingOut(false);
            onClose();
        }
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };
    
    if (!isOpen && !isAnimatingOut) {
        return null;
    }

    const positionClasses = {
        left: 'left-0',
        right: 'right-0',
    };

    const animationClasses = {
        left: {
            in: 'animate-slide-in-left',
            out: 'animate-slide-out-left',
        },
        right: {
            in: 'animate-slide-in-right',
            out: 'animate-slide-out-right',
        }
    };

    const animation = isAnimatingOut ? animationClasses[position].out : animationClasses[position].in;

    const backdropClasses = `fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen && !isAnimatingOut ? 'opacity-100' : 'opacity-0'}`;
    const panelClasses = `fixed top-0 h-full w-full max-w-md bg-bg-secondary dark:bg-dark-bg-secondary shadow-2xl flex flex-col border-black/5 dark:border-white/5`;

    return (
        <div id="drawer-container" className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
            <div onClick={handleBackdropClick} className={backdropClasses} />
            <div
                ref={drawerRef}
                onAnimationEnd={handleAnimationEnd}
                className={`${panelClasses} ${positionClasses[position]} ${animation}`}
            >
                <DrawerContext.Provider value={{ onClose: handleClose, position }}>
                    {children}
                </DrawerContext.Provider>
            </div>
        </div>
    );
};
DrawerRoot.displayName = 'Drawer.Root';

export const Drawer = Object.assign(DrawerRoot, {
    Header: DrawerHeader,
    Body: DrawerBody,
    Footer: DrawerFooter,
});