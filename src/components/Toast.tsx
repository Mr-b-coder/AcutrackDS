// FILE: components/Toast.tsx

import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { Icon } from './icons.tsx';

// --- TYPES ---
export type ToastVariant = 'success' | 'error' | 'info';

interface ToastMessage {
    id: string;
    title: string;
    description?: string;
    variant: ToastVariant;
}

interface ToastContextType {
    showToast: (options: Omit<ToastMessage, 'id'>) => void;
}

// --- CONTEXT & HOOK ---
const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

// --- INDIVIDUAL TOAST COMPONENT ---
interface ToastProps {
    toast: ToastMessage;
    onDismiss: (id: string) => void;
}
const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExiting(true);
        }, 5000); // 5 second auto-dismiss

        return () => clearTimeout(timer);
    }, []);

    const handleDismiss = () => {
        setIsExiting(true);
    };

    const variantConfig: Record<ToastVariant, { icon: string; containerClasses: string; textClasses: string; }> = {
        success: { 
            icon: 'check_circle', 
            containerClasses: 'bg-green-100 dark:bg-green-900', 
            textClasses: 'text-green-800 dark:text-green-300' 
        },
        error: { 
            icon: 'cancel', 
            containerClasses: 'bg-red-100 dark:bg-red-900', 
            textClasses: 'text-red-800 dark:text-red-300' 
        },
        info: { 
            icon: 'info', 
            containerClasses: 'bg-blue-100 dark:bg-blue-900', 
            textClasses: 'text-blue-800 dark:text-blue-300' 
        },
    };

    const styles = variantConfig[toast.variant];

    return (
        <div
            onAnimationEnd={() => {
                if (isExiting) onDismiss(toast.id);
            }}
            className={`flex items-start gap-4 w-full max-w-sm p-4 rounded-xl shadow-2xl ${styles.containerClasses} ${isExiting ? 'animate-toast-out' : 'animate-toast-in'}`}
            role="status"
            aria-live="polite"
        >
            <Icon className={`!text-2xl mt-0.5 shrink-0 ${styles.textClasses}`}>{styles.icon}</Icon>
            <div className={`flex-grow ${styles.textClasses}`}>
                <p className="font-bold">{toast.title}</p>
                {toast.description && <p className="text-sm mt-1 opacity-80">{toast.description}</p>}
            </div>
            <button
                onClick={handleDismiss}
                aria-label="Dismiss notification"
                className={`-mr-1 -mt-1 p-1 rounded-full transition-opacity ${styles.textClasses} opacity-70 hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10`}
            >
                <Icon>close</Icon>
            </button>
        </div>
    );
};

// --- TOAST PROVIDER ---
export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const showToast = (options: Omit<ToastMessage, 'id'>) => {
        const id = crypto.randomUUID();
        setToasts(prev => [...prev, { id, ...options }]);
    };
    
    const dismissToast = (id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {typeof window === 'object' && ReactDOM.createPortal(
                <div 
                    id="toast-container" 
                    className="fixed top-4 right-4 z-[9999] w-full max-w-sm space-y-3"
                >
                    {toasts.map(toast => (
                        <Toast key={toast.id} toast={toast} onDismiss={dismissToast} />
                    ))}
                </div>,
                document.body
            )}
        </ToastContext.Provider>
    );
};