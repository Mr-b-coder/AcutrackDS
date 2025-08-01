// FILE: components/sections/MotionSection.tsx
import React, { useState } from 'react';
import { SectionContainer, SubSection, ComponentPreview, Card, Button } from '../Content.tsx';
import { Table } from '../Table.tsx';
import { Icon } from '../icons.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';
import CodeBlock from '../CodeBlock.tsx';

const durationData = [
    { name: 'fast', value: '150ms', utility: 'duration-fast', description: 'For small, quick feedback like hover effects on buttons or links.' },
    { name: 'normal', value: '300ms', utility: 'duration-normal', description: 'The default for most component transitions like modals, drawers, and accordions.' },
    { name: 'slow', value: '500ms', utility: 'duration-slow', description: 'For larger, more significant screen transitions or background fades.' },
];

const easingData = [
    { name: 'ease-out', utility: 'ease-out', description: 'Starts fast, then decelerates. Best for elements entering the screen (e.g., modals, dropdowns). Makes the UI feel responsive.' },
    { name: 'ease-in', utility: 'ease-in', description: 'Starts slow, then accelerates. Best for elements exiting the screen. The acceleration feels like it\'s "leaving with purpose".' },
    { name: 'ease-in-out', utility: 'ease-in-out', description: 'Starts and ends slow, fast in the middle. A good default for elements that move within the screen or change state in place.' },
    { name: 'linear', utility: 'ease-linear', description: 'Constant speed. Best for continuous animations like spinners or looping progress bars.' },
];

const MotionBox: React.FC<{ transitionClass: string, isToggled: boolean }> = ({ transitionClass, isToggled }) => (
    <div className={`w-16 h-16 rounded-lg bg-brand-orange transition-transform ${transitionClass} ${isToggled ? 'translate-x-48' : ''}`}></div>
);

export const MotionSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => {
    const [toggledStates, setToggledStates] = useState<Record<string, boolean>>({});

    const handleToggle = (key: string) => {
        setToggledStates(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <SectionContainer id={id}>
            <Breadcrumb group={groupTitle} section={sectionTitle} />
            <h2 className="section-title">Motion & Animation</h2>
            <p className="section-subtitle">
                Our animation principles are designed to create a fluid, responsive, and intuitive user experience. Motion should always be purposeful, providing feedback and guiding the user without being distracting or getting in the way.
            </p>

            <SubSection title="Duration Scale">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    We use a standard scale for animation durations to ensure a consistent rhythm across the application. These values are available as Tailwind utility classes.
                </p>
                <Table>
                    <Table.Header>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Value</Table.HeadCell>
                        <Table.HeadCell>Utility Class</Table.HeadCell>
                        <Table.HeadCell>Usage</Table.HeadCell>
                    </Table.Header>
                    <Table.Body>
                        {durationData.map(item => (
                            <Table.Row key={item.name}>
                                <Table.Cell className="font-bold text-text-primary dark:text-dark-text-primary">{item.name}</Table.Cell>
                                <Table.Cell>{item.value}</Table.Cell>
                                <Table.Cell><code className="font-mono">{item.utility}</code></Table.Cell>
                                <Table.Cell>{item.description}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </SubSection>

            <SubSection title="Easing Curves">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    Easing controls the rate of change of an animation, making it feel more natural and physical. Choose the right curve for the right context.
                </p>
                <ComponentPreview isColumn>
                    <div className="w-full space-y-8">
                        {easingData.map(item => (
                            <div key={item.name}>
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <h4 className="font-bold text-text-primary dark:text-dark-text-primary">{item.name}</h4>
                                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">{item.description}</p>
                                    </div>
                                    <Button size="sm" variant="secondary" onClick={() => handleToggle(item.name)}>Toggle</Button>
                                </div>
                                <div className="h-20 flex items-center p-2 bg-bg-tertiary dark:bg-dark-bg-tertiary rounded-lg">
                                    <MotionBox transitionClass={`duration-slow ${item.utility}`} isToggled={!!toggledStates[item.name]} />
                                </div>
                            </div>
                        ))}
                    </div>
                </ComponentPreview>
            </SubSection>
            
            <SubSection title="Usage Guidelines">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <Icon className="!text-2xl text-system-success mt-1 shrink-0">check_circle</Icon>
                            <div>
                                <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Animate with Purpose</h4>
                                <p className="text-sm">Use motion to provide feedback (e.g., a button press), guide focus, or show relationships between elements. Animation should have a clear job to do.</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <Icon className="!text-2xl text-system-success mt-1 shrink-0">check_circle</Icon>
                            <div>
                                <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Animate Performant Properties</h4>
                                <p className="text-sm">Prioritize animating `transform` (translate, scale, rotate) and `opacity`. These are cheap for browsers to animate and result in smoother motion.</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <Icon className="!text-2xl text-system-error mt-1 shrink-0">cancel</Icon>
                            <div>
                                <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Don't Use Long Durations</h4>
                                <p className="text-sm">Animations that are too slow can make the UI feel sluggish. Stick to the defined duration scale to keep the interface feeling snappy and responsive.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Icon className="!text-2xl text-system-error mt-1 shrink-0">cancel</Icon>
                            <div>
                                <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Avoid Animating Layout Properties</h4>
                                <p className="text-sm">Avoid animating properties like `width`, `height`, `margin`, or `padding`. These trigger expensive browser repaints and can lead to janky, stuttering animations.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </SubSection>
        </SectionContainer>
    );
};