// FILE: components/Stepper.tsx
// This component guides users through a multi-step process.

import React, { createContext, useContext } from 'react';
import { Icon } from './icons.tsx';

interface StepperContextProps { currentStep: number; totalSteps: number; }
const StepperContext = React.createContext<StepperContextProps | null>(null);
const StepperStep: React.FC<{ stepNumber: number; title: string; description?: string; }> = ({ stepNumber, title, description }) => {
    const context = useContext(StepperContext);
    if (!context) throw new Error("Stepper.Step must be used within a Stepper");
    const { currentStep } = context;
    const isCompleted = stepNumber < currentStep;
    const isActive = stepNumber === currentStep;
    const statusClasses = {
        completed: 'bg-brand-orange text-white',
        active: 'border-2 border-brand-orange text-brand-orange',
        future: 'bg-bg-tertiary dark:bg-dark-bg-tertiary border-2 border-transparent text-text-secondary dark:text-dark-text-secondary',
    };
    let status: 'completed' | 'active' | 'future' = 'future';
    if (isCompleted) status = 'completed';
    if (isActive) status = 'active';
    return (
        <div className="flex items-start">
            <div className="flex flex-col items-center mr-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${statusClasses[status]}`}>
                    {isCompleted ? <Icon>check</Icon> : stepNumber}
                </div>
                { (stepNumber < context.totalSteps) && <div className="w-0.5 h-16 mt-2 bg-border-color dark:bg-dark-border-color" />}
            </div>
            <div>
                <h4 className={`font-bold ${isActive ? 'text-text-primary dark:text-dark-text-primary' : 'text-text-secondary dark:text-dark-text-secondary'}`}>{title}</h4>
                {description && <p className="text-sm text-text-secondary dark:text-dark-text-secondary">{description}</p>}
            </div>
        </div>
    );
};
const StepperRoot: React.FC<{ currentStep: number; children: React.ReactNode; }> = ({ currentStep, children }) => {
    const totalSteps = React.Children.count(children);
    return (
        <StepperContext.Provider value={{ currentStep, totalSteps }}>
            <div className="space-y-0">{children}</div>
        </StepperContext.Provider>
    );
};
export const Stepper = Object.assign(StepperRoot, { Step: StepperStep });
