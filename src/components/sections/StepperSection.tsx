// FILE: components/sections/StepperSection.tsx
// This section documents the Stepper component for multi-step workflows.

import React, { useState } from 'react';
import { SectionContainer, ComponentPreview, SubSection, Stepper, Button, PropsTable, Card } from '../Content.tsx';
import { Icon } from '../icons.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';
import CodeBlock from '../CodeBlock.tsx';
import { PropDef } from '../../types.ts';

const stepperRootProps: PropDef[] = [
    { name: 'currentStep', type: 'number', default: 'N/A', description: 'The number of the currently active step (1-based).' },
    { name: 'children', type: 'React.ReactNode', default: 'N/A', description: 'A list of <Stepper.Step> components.' },
];

const stepperStepProps: PropDef[] = [
    { name: 'stepNumber', type: 'number', default: 'N/A', description: 'The number for this specific step in the sequence.' },
    { name: 'title', type: 'string', default: 'N/A', description: 'The main title of the step.' },
    { name: 'description', type: 'string', default: 'undefined', description: 'Optional description text displayed below the title.' },
];

const stepperCode = `import { Stepper, Button } from './Content.tsx';

function OnboardingProcess() {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;

    return (
        <div>
            <Stepper currentStep={currentStep}>
                <Stepper.Step 
                    stepNumber={1} 
                    title="Account Details" 
                    description="Enter your email and password." 
                />
                <Stepper.Step 
                    stepNumber={2} 
                    title="Verify Email" 
                    description="Check your inbox for a verification link." 
                />
                <Stepper.Step 
                    stepNumber={3} 
                    title="Complete Profile" 
                    description="Tell us a little about yourself." 
                />
            </Stepper>

            {/* Your logic for controlling the stepper */}
        </div>
    );
}`;

export const StepperSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;

    return (
        <SectionContainer id={id}>
            <Breadcrumb group={groupTitle} section={sectionTitle} />
            <h2 className="section-title">Stepper</h2>
            <p className="section-subtitle">The Stepper component guides users through a process by breaking it down into a series of logical steps. It's ideal for multi-page forms, setup wizards, or checkout flows, as it clearly shows what's completed, what's current, and what's next.</p>

            <SubSection title="Interactive Demo">
                <ComponentPreview>
                    <Card className="w-full max-w-2xl">
                        <Card.Body className="p-8">
                            <Stepper currentStep={currentStep}>
                                <Stepper.Step 
                                    stepNumber={1} 
                                    title="Account Details" 
                                    description="Enter your email and password." 
                                />
                                <Stepper.Step 
                                    stepNumber={2} 
                                    title="Verify Email" 
                                    description="Check your inbox for a verification link." 
                                />
                                <Stepper.Step 
                                    stepNumber={3} 
                                    title="Complete Profile" 
                                    description="Tell us a little about yourself." 
                                />
                            </Stepper>
                        </Card.Body>
                        <Card.Footer className="justify-between">
                            <Button 
                                variant="secondary"
                                onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                                disabled={currentStep === 1}
                            >
                                Back
                            </Button>
                            <Button 
                                variant="primary"
                                onClick={() => setCurrentStep(prev => Math.min(totalSteps, prev + 1))}
                                disabled={currentStep === totalSteps}
                            >
                                Next
                            </Button>
                        </Card.Footer>
                    </Card>
                </ComponentPreview>
                <CodeBlock code={stepperCode} />
            </SubSection>

            <SubSection title="Usage Guidelines">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <Icon className="!text-2xl text-system-success mt-1 shrink-0">check_circle</Icon>
                            <div>
                                <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Keep Step Titles Short</h4>
                                <p className="text-sm">Use clear, action-oriented titles for each step (e.g., "Shipping Address," "Payment Method").</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <Icon className="!text-2xl text-system-error mt-1 shrink-0">cancel</Icon>
                            <div>
                                <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Don't Use for Non-Linear Flows</h4>
                                <p className="text-sm">Steppers are for sequential processes. If a user can jump between steps freely, consider using Tabs instead.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </SubSection>

            <SubSection title="Component Props">
                <div className="space-y-12">
                    <div>
                        <h4 className="font-bold mb-2 text-text-primary dark:text-dark-text-primary">{'<Stepper>'}</h4>
                        <PropsTable data={stepperRootProps} />
                    </div>
                    <div>
                        <h4 className="font-bold mb-2 text-text-primary dark:text-dark-text-primary">{'<Stepper.Step>'}</h4>
                        <PropsTable data={stepperStepProps} />
                    </div>
                </div>
            </SubSection>
        </SectionContainer>
    );
};