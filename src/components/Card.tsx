// FILE: components/Card.tsx
// This component is a flexible content container.

import React from 'react';
import { Icon } from './icons.tsx';

type CardOwnProps<E extends React.ElementType = 'div'> = {
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    featured?: boolean;
    isInteractive?: boolean;
    as?: E;
    featuredText?: string;
}

type CardProps<E extends React.ElementType> = CardOwnProps<E> & Omit<React.ComponentPropsWithoutRef<E>, keyof CardOwnProps<E>>;

const CardRoot = <E extends React.ElementType = 'div'>({ children, className, disabled = false, featured = false, isInteractive = true, as, featuredText = 'Featured', ...props }: CardProps<E>) => {
    const Component = as || 'div';

    // 1. Disabled Card (highest priority)
    if (disabled) {
        const disabledClasses = "group relative rounded-xl bg-bg-secondary dark:bg-dark-bg-tertiary border-2 transition-all duration-300 overflow-hidden shadow-md border-transparent cursor-not-allowed opacity-60";
        return (
            <Component className={`${disabledClasses} ${className}`} {...props}>
                 {featured && (
                    <div className="absolute top-0 -mt-px left-6 z-10">
                        <div className="relative h-6 px-3 flex items-center justify-center bg-brand-orange rounded-b-md text-white font-bold text-xs uppercase tracking-wider">
                            <Icon className="text-white !text-sm mr-1.5">star</Icon>
                            {featuredText}
                        </div>
                    </div>
                )}
                {children}
            </Component>
        );
    }

    // 2. Featured Card
    if (featured) {
        const interactionClasses = isInteractive ? "motion-safe:hover:shadow-2xl motion-safe:hover:-translate-y-1 cursor-pointer" : "";
        const combinedClasses = [
            "group relative rounded-xl p-[2px] shadow-xl transition-all duration-300",
            "bg-gradient-to-br from-system-info via-brand-orange to-dark-brand-orange-hover",
            "motion-safe:animate-gradient-pan [background-size:200%_200%]",
            interactionClasses,
            className,
        ].filter(Boolean).join(' ');

        return (
            <Component className={combinedClasses} {...props}>
                <div className="relative w-full h-full bg-bg-secondary dark:bg-dark-bg-tertiary rounded-[10px] overflow-hidden">
                    <div className="absolute top-0 -mt-px left-6 z-10">
                        <div className="relative h-6 px-3 flex items-center justify-center bg-brand-orange rounded-b-md text-white font-bold text-xs uppercase tracking-wider motion-safe:animate-badge-pulse">
                            <Icon className="text-white !text-sm mr-1.5">star</Icon>
                            {featuredText}
                            <span className="sr-only"> (Featured)</span>
                        </div>
                    </div>
                    {children}
                </div>
            </Component>
        );
    }

    // 3. Standard Card
    const baseClasses = "group relative rounded-xl bg-bg-secondary dark:bg-dark-bg-tertiary border-2 transition-all duration-300 overflow-hidden";
    const stateClasses = "shadow-md border-transparent";
    const interactionClasses = isInteractive ? "cursor-pointer hover:shadow-xl hover:border-brand-orange/50 dark:hover:border-dark-brand-orange/50 motion-safe:hover:-translate-y-1" : "";
    
    const combinedClasses = [
        baseClasses,
        stateClasses,
        interactionClasses,
        className,
    ].filter(Boolean).join(' ');

    return (
        <Component className={combinedClasses} {...props}>
            {children}
        </Component>
    );
};

const CardImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ className, ...props }) => {
    const combinedClasses = `w-full h-48 object-cover ${className || ''}`;
    return <img className={combinedClasses} {...props} />;
};
CardImage.displayName = 'Card.Image';

const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    const combinedClasses = `p-6 border-b border-border-color dark:border-dark-border-color ${className || ''}`;
    return <div className={combinedClasses}>{children}</div>;
};
CardHeader.displayName = 'Card.Header';

const CardBody: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    const combinedClasses = `p-6 ${className || ''}`;
    return <div className={combinedClasses}>{children}</div>;
};
CardBody.displayName = 'Card.Body';

const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    const defaultFooterClasses = 'px-6 pb-6 pt-4 flex items-center justify-end gap-4';
    const combinedClasses = `${defaultFooterClasses} ${className || ''}`;
    return <div className={combinedClasses}>{children}</div>;
};
CardFooter.displayName = 'Card.Footer';

export const Card = Object.assign(CardRoot, {
    Image: CardImage,
    Header: CardHeader,
    Body: CardBody,
    Footer: CardFooter,
});
