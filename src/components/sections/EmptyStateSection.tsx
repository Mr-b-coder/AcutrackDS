// FILE: components/sections/EmptyStateSection.tsx
import React, { useState, useMemo } from 'react';
import {
    SectionContainer,
    ComponentPreview,
    SubSection,
    PropsTable,
    EmptyState,
    Button,
    Input,
    Textarea,
    Checkbox,
} from '../Content.tsx';
import { Icon } from '../icons.tsx';
import CodeBlock from '../CodeBlock.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';
import { PropDef } from '../../../types.ts';


const emptyStateProps: PropDef[] = [
    { name: 'icon', type: 'string', default: 'N/A', description: 'Name of a Material Symbol to display.' },
    { name: 'title', type: 'string', default: 'N/A', description: 'The main headline for the empty state.' },
    { name: 'description', type: 'string', default: 'N/A', description: 'Supporting text below the title.' },
    { name: 'action', type: 'React.ReactNode', default: 'undefined', description: 'An optional action, typically a <Button> component.' },
    { name: 'className', type: 'string', default: '""', description: 'Optional additional CSS classes for the container.' },
];

export const EmptyStateSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => {
    const [icon, setIcon] = useState('draft');
    const [title, setTitle] = useState('You Have No Projects');
    const [description, setDescription] = useState("Get started by creating your first project. It only takes a few minutes.");
    const [hasAction, setHasAction] = useState(true);

    const generatedCode = useMemo(() => {
        const props = [];
        if (icon) props.push(`icon="${icon}"`);
        if (title) props.push(`title="${title}"`);
        if (description) props.push(`description="${description}"`);
        if (hasAction) {
            props.push(`action={
        <Button variant="primary" leftIcon={<Icon>add</Icon>}>
            Create Project
        </Button>
    }`);
        }
        
        const propsString = props.length > 0 ? `\n    ${props.join('\n    ')}\n` : '';
        
        return `<EmptyState${propsString}/>`;
    }, [icon, title, description, hasAction]);

    return (
        <SectionContainer id="emptystates">
            <Breadcrumb group={groupTitle} section={sectionTitle} />
            <h2 className="section-title">Empty States</h2>
            <p className="section-subtitle">
                An empty state (or zero state) occurs when there is no content to display. Instead of showing a blank screen, a well-designed empty state improves the user experience by acknowledging the situation, explaining why it's empty, and guiding the user on what to do next.
            </p>

            <SubSection title="Interactive Workbench">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    Configure the Empty State component's props and see the live result.
                </p>
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Controls */}
                    <div className="lg:col-span-1 space-y-4">
                        <Input id="empty-title" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <Textarea id="empty-desc" label="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
                        <Input id="empty-icon" label="Icon Name" value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="e.g., search_off" />
                        <Checkbox id="empty-action" label="Show Action Button" checked={hasAction} onChange={(e) => setHasAction(e.target.checked)} />
                    </div>

                    {/* Preview */}
                    <div className="lg:col-span-2">
                        <ComponentPreview className="!bg-bg-primary dark:!bg-dark-bg-primary">
                            <EmptyState
                                className="w-full max-w-xl"
                                icon={icon}
                                title={title}
                                description={description}
                                action={hasAction ? <Button variant="primary" leftIcon={<Icon>add</Icon>}>Create Project</Button> : undefined}
                            />
                        </ComponentPreview>
                        <CodeBlock code={generatedCode} />
                    </div>
                </div>
            </SubSection>
            
            <SubSection title="Props: <EmptyState />">
                <PropsTable data={emptyStateProps} />
            </SubSection>
        </SectionContainer>
    );
};