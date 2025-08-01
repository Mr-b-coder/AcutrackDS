// FILE: components/sections/PopoverSection.tsx

import React, { useState, useMemo } from 'react';
import { SectionContainer, SubSection, ComponentPreview, Button, PropsTable, Radio, Input, ToggleSwitch } from '../Content.tsx';
import { Select, SelectOption } from '../Select.tsx';
import { Popover, PopoverPosition } from '../Popover.tsx';
import { Icon } from '../icons.tsx';
import CodeBlock from '../CodeBlock.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';
import { PropDef } from '../../types.ts';

const popoverRootProps: PropDef[] = [
    { name: 'children', type: 'React.ReactNode', default: 'N/A', description: 'Should contain a Popover.Trigger and a Popover.Content component.' },
];
const popoverContentProps: PropDef[] = [
    { name: 'children', type: 'React.ReactNode', default: 'N/A', description: 'Any rich content to display inside the popover.' },
    { name: 'position', type: 'PopoverPosition', default: "'bottom'", description: "Sets the opening direction and alignment of the popover." },
    { name: 'className', type: 'string', default: "''", description: "Custom classes for the content container." },
];

const useCaseOptions: SelectOption[] = [
    { value: 'settings', label: 'Settings Panel' },
    { value: 'form', label: 'Simple Form' },
    { value: 'text', label: 'Text Content' },
];

const PopoverSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => {
    const [position, setPosition] = useState<PopoverPosition>('bottom-end');
    const [useCase, setUseCase] = useState<string>('settings');

    const generatedCode = useMemo(() => {
        const props = [];
        if (position !== 'bottom') props.push(`position="${position}"`);
        const propsString = props.length > 0 ? `\n    ${props.join('\n    ')}\n  ` : ' ';
        
        let contentCode = '<p>Your rich content here...</p>';
        if (useCase === 'settings') {
            contentCode = `<div className="space-y-4">
      <h4 className="font-bold">Notification Settings</h4>
      <ToggleSwitch id="popover-toggle" label="Push Notifications" defaultChecked/>
    </div>`;
        } else if (useCase === 'form') {
            contentCode = `<form className="space-y-4">
      <Input id="popover-email" label="Email" placeholder="you@example.com"/>
      <Button variant="primary" size="sm" className="w-full">Subscribe</Button>
    </form>`;
        }
        
        return `<Popover>
  <Popover.Trigger>
    <Button rightIcon={<Icon>settings</Icon>}>
      Settings
    </Button>
  </Popover.Trigger>
  <Popover.Content${propsString}>
    ${contentCode}
  </Popover.Content>
</Popover>`;
    }, [position, useCase]);

    return (
        <SectionContainer id="popovers">
            <Breadcrumb group={groupTitle} section={sectionTitle} />
            <h2 className="section-title">Popovers</h2>
            <p className="section-subtitle">
                A Popover is a flexible container that displays rich content in a layer above the page, anchored to a trigger element. Unlike a Dropdown (for menus) or a Tooltip (for text), a Popover can contain any interactive content, like forms, settings, or complex information.
            </p>
            
             <SubSection title="Interactive Workbench">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    Use the controls to configure the Popover's position and content. The code snippet will update automatically.
                </p>
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Controls */}
                    <div className="lg:col-span-1 space-y-6">
                         <div>
                            <Select
                                id="popover-usecase"
                                label="Content Use Case"
                                value={useCase}
                                onChange={(val) => setUseCase(String(val))}
                                options={useCaseOptions}
                            />
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Position</h4>
                            <div className="grid grid-cols-2 gap-4">
                                {(['bottom', 'top', 'left', 'right'] as const).map(side => (
                                    <div key={side}>
                                        <h5 className="font-semibold text-sm capitalize mb-1">{side}</h5>
                                        <div className="flex flex-col gap-1">
                                            {(['start', '', 'end'] as const).map(align => {
                                                const pos = (align ? `${side}-${align}` : side) as PopoverPosition;
                                                return <Radio key={pos} id={`popover-pos-${pos}`} name="popover-position" label={align || 'center'} value={pos} checked={position === pos} onChange={() => setPosition(pos)} />
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="lg:col-span-2">
                        <ComponentPreview className="h-80 justify-center">
                            <Popover>
                                <Popover.Trigger>
                                    <Button size="lg" rightIcon={<Icon>settings</Icon>}>
                                        Settings
                                    </Button>
                                </Popover.Trigger>
                                <Popover.Content position={position}>
                                    {useCase === 'settings' && (
                                        <div className="space-y-4">
                                            <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Notification Settings</h4>
                                            <p className="text-sm text-text-secondary dark:text-dark-text-secondary">Manage how you receive alerts.</p>
                                            <hr className="border-border-color dark:border-dark-border-color"/>
                                            <SubSection title="Email Notifications">
                                                <div className="space-y-4">
                                                    <ToggleSwitch label="Weekly Newsletter" id="news-toggle" defaultChecked />
                                                    <ToggleSwitch label="Product Updates" id="prod-toggle" defaultChecked />
                                                </div>
                                            </SubSection>
                                        </div>
                                    )}
                                    {useCase === 'form' && (
                                        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                                            <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Subscribe</h4>
                                            <Input id="popover-email" label="Email" placeholder="you@example.com"/>
                                            <Button type="submit" variant="primary" size="sm" className="w-full">Subscribe</Button>
                                        </form>
                                    )}
                                    {useCase === 'text' && (
                                        <div className="prose prose-sm dark:prose-invert">
                                            <h4>About Popovers</h4>
                                            <p>This is a popover. It can contain any arbitrary rich text content, including paragraphs, lists, and <a href="#">links</a>.</p>
                                        </div>
                                    )}
                                </Popover.Content>
                            </Popover>
                        </ComponentPreview>
                        <CodeBlock code={generatedCode} />
                    </div>
                </div>
            </SubSection>
            
            <SubSection title="Props">
                <div className="space-y-12 mt-6">
                    <div>
                        <h4 className="font-bold mb-2 text-text-primary dark:text-dark-text-primary">{'<Popover.Root>'}</h4>
                        <PropsTable data={popoverRootProps} />
                    </div>
                     <div>
                        <h4 className="font-bold mb-2 text-text-primary dark:text-dark-text-primary">{'<Popover.Content>'}</h4>
                        <PropsTable data={popoverContentProps} />
                    </div>
                     <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                       <code>{'<Popover.Trigger>'}</code> accepts a single React element as a child.
                    </p>
                </div>
            </SubSection>

        </SectionContainer>
    );
};

export { PopoverSection };