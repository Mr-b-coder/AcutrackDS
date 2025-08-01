

import React, { useRef, useEffect, createContext, useContext, useState } from 'react';
import { Icon } from './icons.tsx';

// FOCUS TRAP HOOK (retained from original for accessibility)
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
            setTimeout(() => firstElement.focus(), 100); // Delay focus to allow for animation
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
            const modalElement = ref.current;
            modalElement?.addEventListener('keydown', handleKeyDown);
            return () => {
                modalElement?.removeEventListener('keydown', handleKeyDown);
                triggerElementRef.current?.focus();
            };
        }
    }, [isOpen, ref]);
};

// --- TYPES & CONTEXT ---
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
const ModalContext = createContext<{ onClose: () => void } | null>(null);
const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('Modal sub-components must be used within a Modal.Root component.');
    }
    return context;
};

// --- SUB-COMPONENTS ---
const ModalHeader: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => {
    const { onClose } = useModalContext();
    return (
        <div className={`flex items-start justify-between p-6 border-b border-border-color dark:border-dark-border-color shrink-0 ${className}`}>
            <h3 id="modal-title" className="text-xl font-bold font-heading text-text-primary dark:text-dark-text-primary">{children}</h3>
            <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-1 -mt-1 -mr-2 rounded-full text-text-secondary dark:text-dark-text-secondary hover:bg-bg-tertiary dark:hover:bg-dark-bg-tertiary transition-colors"
            >
                <Icon>close</Icon>
            </button>
        </div>
    );
};
ModalHeader.displayName = 'Modal.Header';

const ModalBody: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
    <div id="modal-description" className={`p-6 overflow-y-auto custom-scrollbar ${className}`}>
        {children}
    </div>
);
ModalBody.displayName = 'Modal.Body';

const ModalFooter: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
    <div className={`flex justify-end items-center gap-4 p-6 bg-bg-tertiary/50 dark:bg-dark-bg-tertiary/20 border-t border-border-color dark:border-dark-border-color shrink-0 ${className}`}>
        {children}
    </div>
);
ModalFooter.displayName = 'Modal.Footer';

// --- ROOT COMPONENT ---
interface ModalRootProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    size?: ModalSize;
    verticalAlign?: 'center' | 'top';
}

const ModalRoot: React.FC<ModalRootProps> = ({ isOpen, onClose, children, size = 'md', verticalAlign = 'center' }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [isMounted, setMounted] = useState(isOpen);

    useFocusTrap(modalRef, isOpen);

    useEffect(() => {
        if (isOpen) {
            setMounted(true);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isMounted) {
        return null;
    }

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const sizeClasses: Record<ModalSize, string> = {
        sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-xl', '2xl': 'max-w-2xl',
    };
    
    const alignmentClasses: Record<NonNullable<ModalRootProps['verticalAlign']>, string> = {
        center: 'items-center',
        top: 'items-start pt-16 md:pt-24'
    };

    const containerClasses = `fixed inset-0 z-50 flex justify-center p-4 transition-opacity duration-300 ease-in-out ${alignmentClasses[verticalAlign]}`;
    const backdropClasses = "fixed inset-0 bg-black/60 backdrop-blur-sm";
    const contentClasses = "relative flex flex-col bg-bg-secondary dark:bg-dark-bg-secondary w-full rounded-xl shadow-2xl overflow-hidden max-h-[90vh] border border-black/5 dark:border-white/5 transition-all duration-300 ease-in-out";

    return (
        <div
            id="modal-container"
            onClick={handleBackdropClick}
            className={`${containerClasses} ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            onTransitionEnd={() => { if (!isOpen) setMounted(false); }}
        >
            <div className={backdropClasses} />
            <div
                ref={modalRef}
                id="modal-content"
                className={`${contentClasses} ${sizeClasses[size]} ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95'}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <ModalContext.Provider value={{ onClose }}>
                    {children}
                </ModalContext.Provider>
            </div>
        </div>
    );
};
ModalRoot.displayName = 'Modal.Root';

// Final export
export const Modal = Object.assign(ModalRoot, {
    Header: ModalHeader, Body: ModalBody, Footer: ModalFooter,
});