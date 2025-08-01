// FILE: components/sections/ButtonsSection.tsx
// This section documents the reusable Button component and its variations.

import React, { useState, useMemo } from 'react';
import {
    SectionContainer,
    ComponentPreview,
    PropsTable,
    Button,
    ButtonGroup,
    SubSection,
    Radio,
    Checkbox,
    Slider,
} from '../Content.tsx';
import CodeBlock from '../CodeBlock.tsx';
import { PropDef } from '../../types.ts';
import { Breadcrumb } from '../Breadcrumb.tsx';
import { Icon } from '../icons.tsx';

const buttonProps: PropDef[] = [
    { name: 'variant', type: "'primary' | 'secondary' | 'text'", default: "'primary'", description: 'Determines the visual style of the button.' },
    { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Sets the padding and font size of the button.' },
    { name: 'leftIcon', type: 'React.ReactElement', default: 'N/A', description: 'Icon to display on the left side of the text.' },
    { name: 'rightIcon', type: 'React.ReactElement', default: 'N/A', description: 'Icon to display on the right side of the text.' },
    { name: 'children', type: 'React.ReactNode', default: 'N/A', description: 'The content (usually text) to display inside the button.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'If true, the button will be disabled and styled accordingly.' },
    { name: 'className', type: 'string', default: '""', description: 'Optional additional CSS classes to apply to the button element.' },
];

const iconButtonCode = `// Icon-only button (use utility classes for flexibility)
<button 
  className="p-2.5 rounded-md text-text-primary hover:bg-bg-tertiary"
  aria-label="Copy content"
>
  <Icon className="!text-2xl">content_copy</Icon>
</button>`;

export const ButtonsSection: React.FC<{ groupTitle: string; sectionTitle: string; }> = ({ groupTitle, sectionTitle }) => {
    // State for main button workbench
    const [variant, setVariant] = useState<'primary' | 'secondary' | 'text'>('primary');
    const [size, setSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
    const [isDisabled, setIsDisabled] = useState(false);
    const [hasLeftIcon, setHasLeftIcon] = useState(false);
    const [hasRightIcon, setHasRightIcon] = useState(false);

    // State for button group workbench
    const [groupType, setGroupType] = useState<'icons' | 'text' | 'mixed'>('text');
    const [numInGroup, setNumInGroup] = useState(3);

    const generatedCode = useMemo(() => {
        const props = [];
        if (variant !== 'primary') props.push(`variant="${variant}"`);
        if (size !== 'md') props.push(`size="${size}"`);
        if (hasLeftIcon) props.push('leftIcon={<Icon>favorite</Icon>}');
        if (hasRightIcon) props.push('rightIcon={<Icon>arrow_forward</Icon>}');
        if (isDisabled) props.push('disabled');

        const propsString = props.length > 0 ? ` ${props.join(' ')}` : '';

        return `<Button${propsString}>
  Interactive Button
</Button>`;
    }, [variant, size, isDisabled, hasLeftIcon, hasRightIcon]);

    const groupIcons = ['format_align_left', 'format_align_center', 'format_align_right', 'format_bold', 'format_italic'];
    
    const generatedGroupCode = useMemo(() => {
        let innerJsx = '';
        for (let i = 0; i < numInGroup; i++) {
            let buttonContent = '';
            switch (groupType) {
                case 'icons':
                    buttonContent = `<Icon>${groupIcons[i % groupIcons.length]}</Icon>`;
                    break;
                case 'text':
                    buttonContent = `Option ${i + 1}`;
                    break;
                case 'mixed':
                    buttonContent = i === 0 ? `<Icon>${groupIcons[i]}</Icon>` : `Option ${i + 1}`;
                    break;
            }
            innerJsx += `    <Button variant="secondary">${buttonContent}</Button>\n`;
        }
        return `<ButtonGroup>\n${innerJsx}</ButtonGroup>`;
    }, [groupType, numInGroup]);
    
    return (
        <SectionContainer id="buttons">
            <Breadcrumb group={groupTitle} section={sectionTitle} />
            <h2 className="section-title">Buttons</h2>
            <p className="section-subtitle">Buttons are the cornerstone of user interaction, designed to be clear, predictable, and accessible. Our system offers a range of styles and sizes to cover all actions, from high-emphasis calls-to-action to subtle, inline links.</p>
            
            <SubSection title="Interactive Workbench">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    Use the controls below to configure the button and see its states in real-time. The code snippet will update automatically.
                </p>
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Controls */}
                    <div className="lg:col-span-1 space-y-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Variant</h4>
                            <div className="flex flex-col gap-2">
                                <Radio id="btn-wb-v-primary" name="btn-wb-variant" label="Primary" value="primary" checked={variant === 'primary'} onChange={() => setVariant('primary')} />
                                <Radio id="btn-wb-v-secondary" name="btn-wb-variant" label="Secondary" value="secondary" checked={variant === 'secondary'} onChange={() => setVariant('secondary')} />
                                <Radio id="btn-wb-v-text" name="btn-wb-variant" label="Text" value="text" checked={variant === 'text'} onChange={() => setVariant('text')} />
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Size</h4>
                            <div className="flex flex-col gap-2">
                                <Radio id="btn-wb-s-xs" name="btn-wb-size" label="Extra Small (xs)" value="xs" checked={size === 'xs'} onChange={() => setSize('xs')} />
                                <Radio id="btn-wb-s-sm" name="btn-wb-size" label="Small (sm)" value="sm" checked={size === 'sm'} onChange={() => setSize('sm')} />
                                <Radio id="btn-wb-s-md" name="btn-wb-size" label="Medium (md)" value="md" checked={size === 'md'} onChange={() => setSize('md')} />
                                <Radio id="btn-wb-s-lg" name="btn-wb-size" label="Large (lg)" value="lg" checked={size === 'lg'} onChange={() => setSize('lg')} />
                                <Radio id="btn-wb-s-xl" name="btn-wb-size" label="Extra Large (xl)" value="xl" checked={size === 'xl'} onChange={() => setSize('xl')} />
                            </div>
                        </div>
                        
                        <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Modifiers</h4>
                            <div className="flex flex-col gap-3">
                                <Checkbox id="btn-wb-mod-left" label="Left Icon" checked={hasLeftIcon} onChange={(e) => setHasLeftIcon(e.target.checked)} />
                                <Checkbox id="btn-wb-mod-right" label="Right Icon" checked={hasRightIcon} onChange={(e) => setHasRightIcon(e.target.checked)} />
                                <Checkbox id="btn-wb-mod-disabled" label="Disabled" checked={isDisabled} onChange={(e) => setIsDisabled(e.target.checked)} />
                            </div>
                        </div>
                    </div>
                    
                    {/* Preview */}
                    <div className="lg:col-span-2">
                        <ComponentPreview className="h-64">
                            <Button 
                                variant={variant}
                                size={size}
                                disabled={isDisabled}
                                leftIcon={hasLeftIcon ? <Icon>favorite</Icon> : undefined}
                                rightIcon={hasRightIcon ? <Icon>arrow_forward</Icon> : undefined}
                            >
                                Interactive Button
                            </Button>
                        </ComponentPreview>
                        <CodeBlock code={generatedCode} />
                    </div>
                </div>
            </SubSection>

            <SubSection title="Icons">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    For actions without text, use an icon-only button, ensuring an `aria-label` is provided for accessibility.
                </p>
                <ComponentPreview className="flex-col items-start gap-8">
                    <div className="flex flex-wrap items-center gap-6">
                        <button className="p-2.5 rounded-md text-text-primary dark:text-dark-text-primary hover:bg-bg-tertiary dark:hover:bg-dark-bg-tertiary active:scale-90 transition-transform" aria-label="Copy content"><Icon className="!text-2xl">content_copy</Icon></button>
                        <button className="p-2 rounded-lg text-text-primary dark:text-dark-text-primary hover:bg-bg-tertiary dark:hover:bg-dark-bg-tertiary active:scale-90 transition-transform" aria-label="Settings"><Icon className="!text-3xl">settings</Icon></button>
                        <button disabled className="p-2.5 rounded-md text-text-primary dark:text-dark-text-primary opacity-50 cursor-not-allowed" aria-label="Delete"><Icon className="!text-2xl">delete</Icon></button>
                    </div>
                </ComponentPreview>
                <CodeBlock code={iconButtonCode} />
            </SubSection>
            
            <SubSection title="Button Group Workbench">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">Group related actions into a single, attached container. Our `ButtonGroup` component automatically handles the styling for you, allowing you to create icon-only, text-only, or mixed-content groups.</p>
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                     {/* Controls */}
                    <div className="lg:col-span-1 space-y-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Content Type</h4>
                            <div className="flex flex-col gap-2">
                                <Radio id="btn-grp-wb-gt-icons" name="btn-grp-wb-group-type" label="Icons Only" value="icons" checked={groupType === 'icons'} onChange={() => setGroupType('icons')} />
                                <Radio id="btn-grp-wb-gt-text" name="btn-grp-wb-group-type" label="Text Only" value="text" checked={groupType === 'text'} onChange={() => setGroupType('text')} />
                                <Radio id="btn-grp-wb-gt-mixed" name="btn-grp-wb-group-type" label="Mixed" value="mixed" checked={groupType === 'mixed'} onChange={() => setGroupType('mixed')} />
                            </div>
                        </div>
                        <div>
                             <Slider 
                                id="num-buttons"
                                label="Number of Buttons"
                                value={numInGroup}
                                onChange={(e) => setNumInGroup(Number(e.target.value))}
                                min={2}
                                max={5}
                             />
                        </div>
                    </div>
                    {/* Preview */}
                    <div className="lg:col-span-2">
                        <ComponentPreview className="flex-wrap items-center gap-6">
                           <ButtonGroup>
                                {Array.from({ length: numInGroup }).map((_, i) => {
                                    let content;
                                    switch(groupType) {
                                        case 'icons':
                                            content = <Icon>{groupIcons[i % groupIcons.length]}</Icon>;
                                            break;
                                        case 'text':
                                            content = `Option ${i + 1}`;
                                            break;
                                        case 'mixed':
                                            content = i === 0 ? <Icon>{groupIcons[i]}</Icon> : `Option ${i + 1}`;
                                            break;
                                    }
                                    return <Button key={i} variant="secondary">{content}</Button>;
                                })}
                            </ButtonGroup>
                        </ComponentPreview>
                        <CodeBlock code={generatedGroupCode} />
                    </div>
                </div>
            </SubSection>

            <SubSection title="Usage Guidelines">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <Icon className="!text-2xl text-system-success mt-1 shrink-0">check_circle</Icon>
                            <div>
                                <h4 className="font-bold text-text-primary dark:text-dark-text-primary">One Primary Button</h4>
                                <p className="text-sm">Limit to one primary button per screen or view to avoid overwhelming the user and to clarify the main call-to-action.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Icon className="!text-2xl text-system-success mt-1 shrink-0">check_circle</Icon>
                            <div>
                                <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Clear & Concise Labels</h4>
                                <p className="text-sm">Button text should be explicit and verb-driven (e.g., "Save Changes," "Create Account") instead of vague labels like "OK" or "Submit."</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <Icon className="!text-2xl text-system-success mt-1 shrink-0">check_circle</Icon>
                            <div>
                                <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Accessibility First</h4>
                                <p className="text-sm">Ensure icon-only buttons have an `aria-label` that describes the action for screen reader users.</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <Icon className="!text-2xl text-system-error mt-1 shrink-0">cancel</Icon>
                            <div>
                                <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Avoid Mismatched Elements</h4>
                                <p className="text-sm">Don't style an `{'<a>'}` tag to look like a button. Buttons trigger actions; links navigate. Use the correct semantic element for the job.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Icon className="!text-2xl text-system-error mt-1 shrink-0">cancel</Icon>
                            <div>
                                <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Don't Overuse Icons</h4>
                                <p className="text-sm">Icons should enhance clarity, not replace it. Only use icon-only buttons for universally understood actions (like delete, close, edit).</p>
                            </div>
                        </div>
                    </div>
                </div>
            </SubSection>

             <SubSection title="Props: <Button />">
                <div className="component-preview !p-0 !bg-transparent !border-none">
                    <PropsTable data={buttonProps} />
                </div>
            </SubSection>
        </SectionContainer>
    );
}