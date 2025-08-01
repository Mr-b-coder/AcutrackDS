// FILE: components/sections/FeedbackSection.tsx
// This section documents feedback components like alerts, badges, and tooltips.

import React, { useState, useMemo } from 'react';
import { SectionContainer, ComponentPreview, SubSection, Alert, Badge, PropsTable, Button, Radio, Checkbox, AlertVariant, BadgeProps, Input } from '../Content.tsx';
import { Tooltip } from '../Tooltip.tsx';
import { Icon } from '../icons.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';
import CodeBlock from '../CodeBlock.tsx';
import { PropDef } from '../../types.ts';

const alertProps: PropDef[] = [
    { name: 'variant', type: "'success' | 'warning' | 'error' | 'info'", default: "'info'", description: 'Determines the color and icon of the alert.' },
    { name: 'title', type: 'string', default: 'N/A', description: 'The bolded title text of the alert.' },
    { name: 'children', type: 'React.ReactNode', default: 'N/A', description: 'The main content/body of the alert.' },
    { name: 'isDismissible', type: 'boolean', default: 'false', description: 'If true, shows a close button to dismiss the alert.' },
    { name: 'className', type: 'string', default: '""', description: 'Optional additional CSS classes for styling.' },
];

const badgeProps: PropDef[] = [
    { name: 'variant', type: "'success' | 'warning' | 'error' | 'info' | 'default'", default: "'default'", description: 'Determines the color of the badge.' },
    { name: 'children', type: 'React.ReactNode', default: 'N/A', description: 'The content of the badge.' },
    { name: 'className', type: 'string', default: '""', description: 'Optional additional CSS classes for styling.' },
];

const tooltipProps: PropDef[] = [
    { name: 'label', type: 'string', default: 'N/A', description: 'The text content to display inside the tooltip.' },
    { name: 'children', type: 'React.ReactNode', default: 'N/A', description: 'The trigger element that the tooltip is attached to.' },
    { name: 'position', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Sets the side where the tooltip appears relative to its child.' },
    { name: 'color', type: "'default' | 'primary' | 'accent' | 'info' | 'success' | 'error'", default: "'default'", description: 'Sets the color theme of the tooltip.' },
    { name: 'className', type: 'string', default: '""', description: 'Optional additional CSS classes for the wrapper element.' },
];

type TooltipColor = 'default' | 'primary' | 'accent' | 'info' | 'success' | 'error';

export const FeedbackSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => {
    
    // State for Alert Workbench
    const [alertVariant, setAlertVariant] = useState<AlertVariant>('info');
    const [isDismissible, setIsDismissible] = useState(false);
    
    const generatedAlertCode = useMemo(() => {
        const props = [];
        if (alertVariant !== 'info') props.push(`variant="${alertVariant}"`);
        if (isDismissible) props.push('isDismissible');

        const propsString = props.length > 0 ? ` ${props.join(' ')}` : '';
        
        return `<Alert${propsString} title="A Title Goes Here">
  This is the alert's description. It provides more details about the message.
</Alert>`;
    }, [alertVariant, isDismissible]);

    // State for Badge Workbench
    const [badgeVariant, setBadgeVariant] = useState<BadgeProps['variant']>('default');

    const generatedBadgeCode = useMemo(() => {
        const props = [];
        if (badgeVariant !== 'default') {
            props.push(`variant="${badgeVariant}"`);
        }
        const propsString = props.length > 0 ? ` ${props.join(' ')}` : '';
        return `<Badge${propsString}>${badgeVariant?.charAt(0).toUpperCase() + badgeVariant!.slice(1)}</Badge>`;
    }, [badgeVariant]);

    // State for Tooltip Workbench
    const [tooltipLabel, setTooltipLabel] = useState('This is a helpful tooltip.');
    const [tooltipPosition, setTooltipPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('top');
    const [tooltipColor, setTooltipColor] = useState<TooltipColor>('default');

    const generatedTooltipCode = useMemo(() => {
        const props = [];
        props.push(`label="${tooltipLabel}"`);
        if (tooltipPosition !== 'top') {
            props.push(`position="${tooltipPosition}"`);
        }
        if (tooltipColor !== 'default') {
            props.push(`color="${tooltipColor}"`);
        }
        const propsString = props.length > 0 ? `\n    ${props.join('\n    ')}\n` : '';

        return `<Tooltip${propsString}>
    <Button>Hover Me</Button>
</Tooltip>`;
    }, [tooltipLabel, tooltipPosition, tooltipColor]);


    return (
    <SectionContainer id={id}>
        <Breadcrumb group={groupTitle} section={sectionTitle} />
        <h2 className="section-title">Feedback Components</h2>
        <p className="section-subtitle">Use our feedback components to communicate important states and information to users. This section covers Alerts, Badges, and Tooltips.</p>
        
        <SubSection title="Alerts Workbench">
            <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                Use the controls to configure the Alert component and see the results instantly. The code snippet will update automatically.
            </p>
             <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="lg:col-span-1 space-y-6">
                    <div>
                        <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Variant</h4>
                        <div className="flex flex-col gap-2">
                            {(['info', 'success', 'warning', 'error'] as AlertVariant[]).map(v => (
                                <Radio key={v} id={`alert-wb-v-${v}`} name="alert-wb-variant" label={v.charAt(0).toUpperCase() + v.slice(1)} value={v} checked={alertVariant === v} onChange={() => setAlertVariant(v)} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Modifiers</h4>
                        <div className="flex flex-col gap-3">
                            <Checkbox id="alert-wb-dismissible" label="Dismissible" checked={isDismissible} onChange={(e) => setIsDismissible(e.target.checked)} />
                        </div>
                    </div>
                </div>
                {/* Preview */}
                <div className="lg:col-span-2">
                    <ComponentPreview className="h-64 items-start">
                        <Alert 
                            variant={alertVariant} 
                            title="A Title Goes Here"
                            isDismissible={isDismissible}
                        >
                            This is the alert's description. It provides more details about the message.
                        </Alert>
                    </ComponentPreview>
                    <CodeBlock code={generatedAlertCode} />
                </div>
            </div>
             <div className="mt-8">
                <PropsTable data={alertProps} />
            </div>
        </SubSection>

        <SubSection title="Badges Workbench">
             <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                Badges are used to highlight an item's status for quick recognition. Select a variant below to see the result.
            </p>
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                 {/* Controls */}
                <div className="lg:col-span-1 space-y-6">
                     <div>
                        <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Variant</h4>
                        <div className="flex flex-col gap-2">
                            {(['default', 'success', 'warning', 'error', 'info'] as BadgeProps['variant'][]).map(v => (
                                <Radio key={v} id={`badge-wb-v-${v}`} name="badge-wb-variant" label={v!.charAt(0).toUpperCase() + v!.slice(1)} value={v} checked={badgeVariant === v} onChange={() => setBadgeVariant(v)} />
                            ))}
                        </div>
                    </div>
                </div>
                {/* Preview */}
                <div className="lg:col-span-2">
                    <ComponentPreview className="h-40">
                         <Badge variant={badgeVariant}>
                           {badgeVariant!.charAt(0).toUpperCase() + badgeVariant!.slice(1)}
                        </Badge>
                    </ComponentPreview>
                    <CodeBlock code={generatedBadgeCode} />
                </div>
            </div>
             <div className="mt-8">
                <PropsTable data={badgeProps} />
            </div>
        </SubSection>
        
        <SubSection title="Tooltip Workbench">
            <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                A tooltip is a small pop-up that displays information about an element when hovered. Use the controls below to configure its properties and see the results instantly.
            </p>
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="lg:col-span-1 space-y-6">
                    <div>
                        <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Content</h4>
                        <Input
                            id="tooltip-wb-label"
                            label="Tooltip Label"
                            value={tooltipLabel}
                            onChange={(e) => setTooltipLabel(e.target.value)}
                        />
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Position</h4>
                        <div className="flex flex-col gap-2">
                            {(['top', 'bottom', 'left', 'right'] as const).map(p => (
                                <Radio key={p} id={`tooltip-wb-p-${p}`} name="tooltip-wb-position" label={p.charAt(0).toUpperCase() + p.slice(1)} value={p} checked={tooltipPosition === p} onChange={() => setTooltipPosition(p)} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Color</h4>
                        <div className="flex flex-col gap-2">
                            {(['default', 'primary', 'accent', 'info', 'success', 'error'] as const).map(c => (
                                <Radio key={c} id={`tooltip-wb-c-${c}`} name="tooltip-wb-color" label={c.charAt(0).toUpperCase() + c.slice(1)} value={c} checked={tooltipColor === c} onChange={() => setTooltipColor(c)} />
                            ))}
                        </div>
                    </div>
                </div>
                {/* Preview */}
                <div className="lg:col-span-2">
                    <ComponentPreview className="h-40">
                         <Tooltip label={tooltipLabel} position={tooltipPosition} color={tooltipColor}>
                            <Button variant="secondary" size="md" rightIcon={<Icon>info</Icon>}>
                                Hover Me
                            </Button>
                        </Tooltip>
                    </ComponentPreview>
                    <CodeBlock code={generatedTooltipCode} />
                </div>
            </div>
            <div className="mt-8">
                <PropsTable data={tooltipProps} />
            </div>
        </SubSection>
    </SectionContainer>
);
}