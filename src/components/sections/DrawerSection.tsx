// FILE: components/sections/DrawerSection.tsx

import React, { useState, useMemo } from 'react';
import { 
    SectionContainer, 
    ComponentPreview, 
    SubSection, 
    Button,
    Input,
    Textarea,
    PropsTable,
    Radio,
    BrowserCompatibility
} from '../Content.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';
import { Drawer } from '../Drawer.tsx';
import CodeBlock from '../CodeBlock.tsx';
import { PropDef } from '../../../types.ts';

const drawerProps: PropDef[] = [
    { name: 'isOpen', type: 'boolean', default: 'N/A', description: 'Controls whether the drawer is visible.' },
    { name: 'onClose', type: '() => void', default: 'N/A', description: 'Function called when the drawer requests to be closed (e.g., via Esc key, backdrop click, or close button).' },
    { name: 'position', type: "'left' | 'right'", default: "'right'", description: 'Sets which side the drawer slides in from.' },
    { name: 'children', type: 'React.ReactNode', default: 'N/A', description: 'The inner content of the drawer, composed of Drawer.Header, Drawer.Body, and Drawer.Footer.' },
];

export const DrawerSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({groupTitle, sectionTitle, id}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState<'left' | 'right'>('right');

    const generatedCode = useMemo(() => {
        const props = [];
        if (position !== 'right') {
            props.push(`position="${position}"`);
        }
        const propsString = props.length > 0 ? ` ${props.join(' ')}` : '';
        return `import { Drawer, Button } from './components';

function MyComponent() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
            <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}${propsString}>
                <Drawer.Header>Panel Title</Drawer.Header>
                <Drawer.Body>
                    <p>Drawer content goes here.</p>
                </Drawer.Body>
                <Drawer.Footer>
                    <Button variant="secondary" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => setIsOpen(false)}>
                        Save Changes
                    </Button>
                </Drawer.Footer>
            </Drawer>
        </>
    )
}`;
    }, [position]);
    
    return (
        <SectionContainer id={id}>
            <Breadcrumb group={groupTitle} section={sectionTitle} />
            <h2 className="section-title">Drawer</h2>
            <p className="section-subtitle">
                A drawer, or off-canvas panel, slides in from the side of the screen. It's useful for displaying navigation, filters, or forms without taking up the full screen like a modal.
            </p>
             <BrowserCompatibility>
                The <code>backdrop-blur</code> effect on the overlay is not supported by default in some browsers like Firefox. The drawer will gracefully degrade to a semi-transparent background.
            </BrowserCompatibility>
            
            <SubSection title="Interactive Workbench">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    Use the controls to configure the drawer's `position` and see the result instantly.
                </p>
                 <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Controls */}
                    <div className="lg:col-span-1 space-y-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Position</h4>
                            <div className="flex flex-col gap-2">
                                <Radio 
                                    id="drawer-wb-right"
                                    name="drawer-wb-pos"
                                    label="Right (Default)"
                                    value="right"
                                    checked={position === 'right'}
                                    onChange={() => setPosition('right')}
                                />
                                <Radio 
                                    id="drawer-wb-left"
                                    name="drawer-wb-pos"
                                    label="Left"
                                    value="left"
                                    checked={position === 'left'}
                                    onChange={() => setPosition('left')}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Preview */}
                    <div className="lg:col-span-2">
                        <ComponentPreview>
                           <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
                        </ComponentPreview>
                        <CodeBlock code={generatedCode} />
                    </div>
                </div>
            </SubSection>

            <SubSection title="Props: <Drawer />">
                <PropsTable data={drawerProps} />
                 <p className="mt-4 text-sm text-text-secondary dark:text-dark-text-secondary">
                    The Drawer component also exposes <code>Drawer.Header</code>, <code>Drawer.Body</code>, and <code>Drawer.Footer</code> sub-components, which accept <code>children</code> and an optional <code>className</code>.
                </p>
            </SubSection>

            {/* Drawer Definition */}
            <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} position={position}>
                <Drawer.Header>Edit Profile</Drawer.Header>
                <Drawer.Body>
                    <div className="space-y-6">
                        <Input
                            label="Full Name"
                            id="drawer-name"
                            placeholder="e.g., Jane Doe"
                        />
                        <Textarea
                            label="Your Bio"
                            id="drawer-bio"
                            rows={4}
                            placeholder="Tell us a little about yourself..."
                        />
                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                            This panel contains a form. Because it has focus-trapping, you can tab through the form elements without leaving the drawer.
                        </p>
                    </div>
                </Drawer.Body>
                <Drawer.Footer>
                    <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button variant="primary" onClick={() => setIsOpen(false)}>Save Changes</Button>
                </Drawer.Footer>
            </Drawer>

        </SectionContainer>
    );
};