
// FILE: components/sections/DropdownSection.tsx

import React, { useState, useMemo } from 'react';
import { SectionContainer, SubSection, ComponentPreview, Button, PropsTable, Avatar, BrowserCompatibility, Checkbox, Radio, SplitButton, Spinner } from '../Content.tsx';
import { Icon } from '../icons.tsx';
import CodeBlock from '../CodeBlock.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';
import { PropDef } from '../../../types.ts';
import { Dropdown, DropdownPosition } from '../Dropdown.tsx';

const dropdownRootProps: PropDef[] = [
    { name: 'children', type: 'React.ReactNode', default: 'N/A', description: 'Should contain a Trigger and Content component.' },
];
const dropdownContentProps: PropDef[] = [
    { name: 'children', type: 'React.ReactNode', default: 'N/A', description: 'The menu items and separators to display.' },
    { name: 'position', type: 'DropdownPosition', default: "'bottom-start'", description: "Sets the opening direction and alignment of the dropdown." },
    { name: 'className', type: 'string', default: "''", description: "Custom classes for the content container." },
];
const dropdownItemProps: PropDef[] = [
    { name: 'children', type: 'React.ReactNode', default: 'N/A', description: 'The label for the menu item.' },
    { name: 'icon', type: 'string', default: 'undefined', description: 'Name of a Material Symbol to display.' },
    { name: 'onSelect', type: '() => void', default: 'undefined', description: 'Callback executed when the item is clicked.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the item.' },
];

const splitButtonProps: PropDef[] = [
    { name: 'primaryActionLabel', type: 'React.ReactNode', default: 'N/A', description: 'The text or content for the primary action button.' },
    { name: 'onPrimaryClick', type: '() => void', default: 'N/A', description: 'Callback executed when the primary action button is clicked.' },
    { name: 'children', type: 'React.ReactNode', default: 'N/A', description: 'The Dropdown.Item components for the menu.' },
    { name: 'variant', type: "'primary' | 'secondary' | 'text'", default: "'primary'", description: 'Determines the visual style of the button.' },
    { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Sets the padding and font size of the button.' },
    { name: 'leftIcon', type: 'React.ReactElement', default: 'N/A', description: 'Icon to display on the left side of the primary action.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'If true, the entire button group is disabled.' },
    { name: 'isLoading', type: 'boolean', default: 'false', description: 'If true, shows a spinner and disables the button.' },
    { name: 'loadingText', type: 'string', default: "'Saving...'", description: 'Text to display next to the spinner when isLoading is true.' },
];

const userProfileMenuCode = `<Dropdown>
    <Dropdown.Trigger>
        <button aria-label="Open user menu">
            <Avatar 
                name="Jane Doe" 
                src="https://i.pravatar.cc/48?u=jane" 
                status="online" 
            />
        </button>
    </Dropdown.Trigger>
    <Dropdown.Content position="bottom-end">
        <Dropdown.Item icon="account_circle">View Profile</Dropdown.Item>
        <Dropdown.Item icon="credit_card">Billing</Dropdown.Item>
        <Dropdown.Item icon="settings">Settings</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item icon="logout">Logout</Dropdown.Item>
    </Dropdown.Content>
</Dropdown>`;


export const DropdownSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => {
    // State for workbench
    const [position, setPosition] = useState<DropdownPosition>('bottom-start');
    const [showIcons, setShowIcons] = useState(true);
    const [showSeparator, setShowSeparator] = useState(true);

    const [splitVariant, setSplitVariant] = useState<'primary' | 'secondary' | 'text'>('primary');
    const [splitSize, setSplitSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
    const [isSplitDisabled, setIsSplitDisabled] = useState(false);
    const [isSplitLoading, setIsSplitLoading] = useState(false);

    const generatedCode = useMemo(() => {
      const props = [];
      if (position !== 'bottom-start') props.push(`position="${position}"`);

      const propsString = props.length > 0 ? `\n    ${props.join('\n    ')}\n  ` : ' ';
      
      const items = [];
      items.push(`<Dropdown.Item${showIcons ? ' icon="edit"' : ''} onSelect={() => alert('Editing!')}>Edit</Dropdown.Item>`);
      items.push(`<Dropdown.Item${showIcons ? ' icon="content_copy"' : ''} onSelect={() => alert('Copied!')}>Duplicate</Dropdown.Item>`);
      if (showSeparator) items.push(`<Dropdown.Separator />`);
      items.push(`<Dropdown.Item${showIcons ? ' icon="delete"' : ''} disabled>Delete</Dropdown.Item>`);

      return `<Dropdown>
  <Dropdown.Trigger>
    <Button rightIcon={<Icon>expand_more</Icon>}>
      Options
    </Button>
  </Dropdown.Trigger>
  <Dropdown.Content${propsString}>
    ${items.join('\n    ')}
  </Dropdown.Content>
</Dropdown>`;
    }, [position, showIcons, showSeparator]);

    const generatedSplitCode = useMemo(() => {
        const props = [];
        if (splitVariant !== 'primary') props.push(`variant="${splitVariant}"`);
        if (splitSize !== 'md') props.push(`size="${splitSize}"`);
        if (isSplitDisabled) props.push('disabled');
        if (isSplitLoading) props.push('isLoading');
        
        return `<SplitButton
    primaryActionLabel="Save"
    onPrimaryClick={() => alert('Primary action!')}
    ${props.join('\n    ')}
>
  <Dropdown.Item icon="save_as">Save as...</Dropdown.Item>
  <Dropdown.Item icon="ios_share">Export as PDF</Dropdown.Item>
</SplitButton>`;
    }, [splitVariant, splitSize, isSplitDisabled, isSplitLoading]);


    return (
        <SectionContainer id="dropdowns">
            <Breadcrumb group={groupTitle} section={sectionTitle} />
            <h2 className="section-title">Dropdowns</h2>
            <p className="section-subtitle">
                Dropdowns (or popover menus) display a list of actions or options in a temporary view. They are triggered by a button and are used to keep the UI clean by hiding less-frequently used actions. Our component is built for flexibility and accessibility.
            </p>

            <SubSection title="Interactive Workbench">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    Use the controls to configure the dropdown's position and content. The code snippet will update automatically.
                </p>
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Controls */}
                    <div className="lg:col-span-1 space-y-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Position</h4>
                            <div className="grid grid-cols-2 gap-4">
                                {(['bottom', 'top', 'left', 'right'] as const).map(side => (
                                    <div key={side}>
                                        <h5 className="font-semibold text-sm capitalize mb-1">{side}</h5>
                                        <div className="flex flex-col gap-1">
                                            {(['start', '', 'end'] as const).map(align => {
                                                const pos = (align ? `${side}-${align}` : side) as DropdownPosition;
                                                return <Radio key={pos} id={`dropdown-pos-${pos}`} name="dropdown-position" label={align || 'center'} value={pos} checked={position === pos} onChange={() => setPosition(pos)} />
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Content</h4>
                             <div className="flex flex-col gap-3">
                                <Checkbox id="dd-icons" label="Show Icons" checked={showIcons} onChange={(e) => setShowIcons(e.target.checked)} />
                                <Checkbox id="dd-separator" label="Show Separator" checked={showSeparator} onChange={(e) => setShowSeparator(e.target.checked)} />
                            </div>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="lg:col-span-2">
                        <ComponentPreview className="h-64 justify-center">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <Button size="lg" rightIcon={<Icon>expand_more</Icon>}>
                                        Options
                                    </Button>
                                </Dropdown.Trigger>
                                <Dropdown.Content position={position}>
                                    <Dropdown.Item icon={showIcons ? 'edit' : undefined} onSelect={() => alert('Editing!')}>Edit</Dropdown.Item>
                                    <Dropdown.Item icon={showIcons ? 'content_copy' : undefined} onSelect={() => alert('Copied!')}>Duplicate</Dropdown.Item>
                                    {showSeparator && <Dropdown.Separator />}
                                    <Dropdown.Item icon={showIcons ? 'delete' : undefined} disabled>Delete</Dropdown.Item>
                                </Dropdown.Content>
                            </Dropdown>
                        </ComponentPreview>
                        <CodeBlock code={generatedCode} />
                    </div>
                </div>
            </SubSection>


            <SubSection title="Basic Dropdown">
                 <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    A standard dropdown menu with a button trigger. The <code>position</code> prop on <code>Dropdown.Content</code> controls its alignment.
                </p>
                <ComponentPreview className="h-48 justify-around">
                     <Dropdown>
                        <Dropdown.Trigger>
                            <Button rightIcon={<Icon>expand_more</Icon>}>
                                Options (Start)
                            </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Content position="bottom-start">
                            <Dropdown.Item icon="edit" onSelect={() => alert('Editing!')}>Edit</Dropdown.Item>
                            <Dropdown.Item icon="content_copy" onSelect={() => alert('Copied!')}>Duplicate</Dropdown.Item>
                            <Dropdown.Separator />
                            <Dropdown.Item icon="archive">Archive</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown>
                    
                     <Dropdown>
                        <Dropdown.Trigger>
                            <Button variant="secondary" rightIcon={<Icon>expand_more</Icon>}>
                                Actions (End)
                            </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Content position="bottom-end">
                            <Dropdown.Item icon="share">Share</Dropdown.Item>
                            <Dropdown.Item icon="link">Copy Link</Dropdown.Item>
                            <Dropdown.Separator />
                            <Dropdown.Item icon="delete">Delete</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown>
                </ComponentPreview>
            </SubSection>

            <SubSection title="User Profile Menu">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    A common use case for dropdowns is a user profile menu, triggered by an Avatar.
                </p>
                <ComponentPreview className="h-48 justify-center">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button aria-label="Open user menu">
                                <Avatar name="Jane Doe" src="https://i.pravatar.cc/48?u=jane" status="online" />
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content position="bottom-end">
                            <Dropdown.Item icon="account_circle">View Profile</Dropdown.Item>
                            <Dropdown.Item icon="credit_card">Billing</Dropdown.Item>
                            <Dropdown.Item icon="settings">Settings</Dropdown.Item>
                            <Dropdown.Separator />
                            <Dropdown.Item icon="logout">Logout</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown>
                </ComponentPreview>
                <CodeBlock code={userProfileMenuCode} />
            </SubSection>
            
             <SubSection title="Split Dropdown Buttons">
                 <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                     A split button combines a primary action with a dropdown of secondary actions. This is useful for exposing a default action while keeping related, less-common actions accessible.
                 </p>
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Controls */}
                    <div className="lg:col-span-1 space-y-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Variant</h4>
                            <div className="flex flex-col gap-2">
                                <Radio id="sv-primary" name="split-variant" label="Primary" value="primary" checked={splitVariant === 'primary'} onChange={() => setSplitVariant('primary')} />
                                <Radio id="sv-secondary" name="split-variant" label="Secondary" value="secondary" checked={splitVariant === 'secondary'} onChange={() => setSplitVariant('secondary')} />
                                <Radio id="sv-text" name="split-variant" label="Text" value="text" checked={splitVariant === 'text'} onChange={() => setSplitVariant('text')} />
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Size</h4>
                            <div className="flex flex-col gap-2">
                                <Radio id="ss-xs" name="split-size" label="Extra Small (xs)" value="xs" checked={splitSize === 'xs'} onChange={() => setSplitSize('xs')} />
                                <Radio id="ss-sm" name="split-size" label="Small (sm)" value="sm" checked={splitSize === 'sm'} onChange={() => setSplitSize('sm')} />
                                <Radio id="ss-md" name="split-size" label="Medium (md)" value="md" checked={splitSize === 'md'} onChange={() => setSplitSize('md')} />
                                <Radio id="ss-lg" name="split-size" label="Large (lg)" value="lg" checked={splitSize === 'lg'} onChange={() => setSplitSize('lg')} />
                                <Radio id="ss-xl" name="split-size" label="Extra Large (xl)" value="xl" checked={splitSize === 'xl'} onChange={() => setSplitSize('xl')} />
                            </div>
                        </div>
                        
                        <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">State</h4>
                            <div className="flex flex-col gap-3">
                                <Checkbox id="split-mod-disabled" label="Disabled" checked={isSplitDisabled} onChange={(e) => setIsSplitDisabled(e.target.checked)} />
                                <Checkbox id="split-mod-loading" label="Is Loading" checked={isSplitLoading} onChange={(e) => setIsSplitLoading(e.target.checked)} />
                            </div>
                        </div>
                    </div>
                    
                    {/* Preview */}
                    <div className="lg:col-span-2">
                        <ComponentPreview className="h-40">
                             <SplitButton
                                variant={splitVariant}
                                size={splitSize}
                                disabled={isSplitDisabled}
                                isLoading={isSplitLoading}
                                onPrimaryClick={() => alert('Primary action clicked!')}
                                primaryActionLabel="Save Changes"
                            >
                                <Dropdown.Item icon="save_as" onSelect={() => alert('Save as...')}>
                                    Save as...
                                </Dropdown.Item>
                                <Dropdown.Item icon="ios_share" onSelect={() => alert('Exporting...')}>
                                    Export as PDF
                                </Dropdown.Item>
                                <Dropdown.Item icon="delete" onSelect={() => alert('Deleting draft')} disabled>
                                    Delete Draft
                                </Dropdown.Item>
                            </SplitButton>
                        </ComponentPreview>
                        <CodeBlock code={generatedSplitCode} />
                    </div>
                </div>
            </SubSection>

            <SubSection title="Props">
                <BrowserCompatibility>
                    If a dropdown's content becomes scrollable, it uses the <code>custom-scrollbar</code> class, which will render differently in Firefox versus Webkit browsers.
                </BrowserCompatibility>
                <div className="space-y-12 mt-6">
                    <div>
                        <h4 className="font-bold mb-2 text-text-primary dark:text-dark-text-primary">{'<Dropdown>'}</h4>
                        <PropsTable data={dropdownRootProps} />
                    </div>
                     <div>
                        <h4 className="font-bold mb-2 text-text-primary dark:text-dark-text-primary">{'<Dropdown.Content>'}</h4>
                        <PropsTable data={dropdownContentProps} />
                    </div>
                     <div>
                        <h4 className="font-bold mb-2 text-text-primary dark:text-dark-text-primary">{'<Dropdown.Item>'}</h4>
                        <PropsTable data={dropdownItemProps} />
                    </div>
                     <div>
                        <h4 className="font-bold mb-2 text-text-primary dark:text-dark-text-primary">{'<SplitButton />'}</h4>
                        <PropsTable data={splitButtonProps} />
                    </div>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                       <code>{'<Dropdown.Trigger>'}</code> accepts a single React element as a child, and <code>{'<Dropdown.Separator>'}</code> takes no props.
                    </p>
                </div>
            </SubSection>
        </SectionContainer>
    );
};