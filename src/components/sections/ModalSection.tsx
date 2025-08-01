// FILE: components/sections/ModalSection.tsx
// This section documents the modal/dialog component.

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
import { Modal } from '../Modal.tsx';
import CodeBlock from '../CodeBlock.tsx';
import { PropDef } from '../../../types.ts';
import type { ModalSize } from '../Modal.tsx';
import { Icon } from '../icons.tsx';

const modalProps: PropDef[] = [
    { name: 'isOpen', type: 'boolean', default: 'N/A', description: 'Controls whether the modal is visible.' },
    { name: 'onClose', type: '() => void', default: 'N/A', description: 'Function called when the modal requests to be closed (e.g., via Esc key, backdrop click, or close button).' },
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | '2xl'", default: "'md'", description: 'Sets the max-width of the modal.' },
    { name: 'verticalAlign', type: "'center' | 'top'", default: "'center'", description: "Sets the modal's vertical alignment within the viewport." },
    { name: 'children', type: 'React.ReactNode', default: 'N/A', description: 'The inner content of the modal, composed of Modal.Header, Modal.Body, and Modal.Footer.' },
];

const basicModalCode = `import { Modal, Button } from './components';

function MyComponent() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="sm">
                <Modal.Header>Delete Item</Modal.Header>
                <Modal.Body>
                    <p>
                        Are you sure you want to delete this item? 
                        This action cannot be undone.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={() => setIsOpen(false)}
                        className="!bg-system-error !text-white hover:!bg-red-600"
                    >
                        Delete Item
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}`;

const formModalCode = `<Modal isOpen={isOpen} onClose={closeModal} size="lg">
    <Modal.Header>Create New Project</Modal.Header>
    <Modal.Body>
        <div className="space-y-6">
            <Input
                label="Project Name"
                id="project-name"
                placeholder="e.g., Q3 Marketing Campaign"
            />
            <Textarea
                label="Project Description"
                id="project-desc"
                rows={4}
                placeholder="Describe the project goals..."
            />
        </div>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>Cancel</Button>
        <Button variant="primary">Create Project</Button>
    </Modal.Footer>
</Modal>`;

const scrollableModalCode = `<Modal isOpen={isOpen} onClose={closeModal} verticalAlign="top">
    <Modal.Header>Terms of Service</Modal.Header>
    <Modal.Body>
        {/* ... very long content ... */}
    </Modal.Body>
    <Modal.Footer>
        <Button variant="primary">I Agree</Button>
    </Modal.Footer>
</Modal>`;

const longContent = Array.from({ length: 20 }).map((_, i) => (
    <p key={i} className="mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.
    </p>
));


export const ModalSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({groupTitle, sectionTitle, id}) => {
    const [isConfirmOpen, setConfirmOpen] = useState(false);
    const [isFormOpen, setFormOpen] = useState(false);
    const [isScrollOpen, setScrollOpen] = useState(false);
    
    // State for interactive workbench
    const [workbenchSize, setWorkbenchSize] = useState<ModalSize>('md');
    const [verticalAlign, setVerticalAlign] = useState<'center' | 'top'>('center');
    const [isWorkbenchOpen, setWorkbenchOpen] = useState(false);

    const generatedCode = useMemo(() => {
        const props = [];
        if (workbenchSize !== 'md') {
            props.push(`size="${workbenchSize}"`);
        }
        if (verticalAlign !== 'center') {
            props.push(`verticalAlign="${verticalAlign}"`);
        }
        const propsString = props.length > 0 ? ` ${props.join(' ')}` : '';
        return `
const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Open Modal</Button>
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}${propsString}>
    <Modal.Header>Interactive Modal</Modal.Header>
    <Modal.Body>
        <p>This modal is using the '${workbenchSize}' size and '${verticalAlign}' alignment.</p>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="primary" onClick={() => setIsOpen(false)}>
            Close
        </Button>
    </Modal.Footer>
</Modal>`;
    }, [workbenchSize, verticalAlign]);
    
    return (
        <SectionContainer id={id}>
            <Breadcrumb group={groupTitle} section={sectionTitle} />
            <h2 className="section-title">Modals</h2>
            <p className="section-subtitle">
                A modal is a dialog box/popup window that is displayed on top of the current page. It is architected as a flexible compound component for maximum reusability. It includes focus-trapping and is keyboard accessible.
            </p>
            <BrowserCompatibility>
                The <code>backdrop-blur</code> effect is not supported by default in some browsers like Firefox. The modal will gracefully degrade to a semi-transparent background.
            </BrowserCompatibility>
            
            <SubSection title="Confirmation Modal">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    A simple modal for confirming a user action. This example uses a small size (`sm`).
                </p>
                <ComponentPreview>
                    <Button onClick={() => setConfirmOpen(true)}>Open Confirmation Modal</Button>
                </ComponentPreview>
                <CodeBlock code={basicModalCode} />
            </SubSection>

            <SubSection title="Form Modal">
                 <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    Because the modal body is flexible, you can easily embed forms or any other complex content.
                </p>
                <ComponentPreview>
                    <Button onClick={() => setFormOpen(true)}>Open Form Modal</Button>
                </ComponentPreview>
                 <CodeBlock code={formModalCode} />
            </SubSection>

            <SubSection title="Scrollable Content">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    When content inside <code>{'<Modal.Body>'}</code> exceeds the available height, it automatically becomes scrollable while the header and footer remain fixed. Using <code>verticalAlign="top"</code> is recommended for long content.
                </p>
                <ComponentPreview>
                    <Button onClick={() => setScrollOpen(true)}>Open Scrollable Modal</Button>
                </ComponentPreview>
                <CodeBlock code={scrollableModalCode} />
            </SubSection>
            
            <SubSection title="Interactive Workbench">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    Use the controls to configure the modal's properties and see the result instantly.
                </p>
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Controls */}
                    <div className="lg:col-span-1 space-y-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Size</h4>
                            <div className="flex flex-col gap-2">
                                {(['sm', 'md', 'lg', 'xl', '2xl'] as ModalSize[]).map(size => (
                                    <Radio 
                                        key={size}
                                        id={`modal-wb-size-${size}`}
                                        name="modal-wb-size"
                                        label={`${size.toUpperCase()} (${{sm: 'Small', md: 'Medium', lg: 'Large', xl: 'Extra Large', '2xl': '2XL'}[size]})`}
                                        value={size}
                                        checked={workbenchSize === size}
                                        onChange={() => setWorkbenchSize(size)}
                                    />
                                ))}
                            </div>
                        </div>
                         <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Vertical Align</h4>
                            <div className="flex flex-col gap-2">
                                 <Radio 
                                    key="center"
                                    id="modal-wb-valign-center"
                                    name="modal-wb-valign"
                                    label="Center (Default)"
                                    value="center"
                                    checked={verticalAlign === 'center'}
                                    onChange={() => setVerticalAlign('center')}
                                />
                                <Radio 
                                    key="top"
                                    id="modal-wb-valign-top"
                                    name="modal-wb-valign"
                                    label="Top"
                                    value="top"
                                    checked={verticalAlign === 'top'}
                                    onChange={() => setVerticalAlign('top')}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Preview */}
                    <div className="lg:col-span-2">
                        <ComponentPreview className="h-64">
                            <Button
                                variant="secondary"
                                onClick={() => setWorkbenchOpen(true)}
                                leftIcon={<Icon>open_in_new</Icon>}
                            >
                                Open Interactive Modal
                            </Button>
                        </ComponentPreview>
                        <CodeBlock code={generatedCode} />
                    </div>
                </div>
            </SubSection>

            <SubSection title="Props: <Modal />">
                <PropsTable data={modalProps} />
                 <p className="mt-4 text-sm text-text-secondary dark:text-dark-text-secondary">
                    The Modal component also exposes <code>Modal.Header</code>, <code>Modal.Body</code>, and <code>Modal.Footer</code> sub-components, which accept <code>children</code> and an optional <code>className</code>.
                </p>
            </SubSection>


            {/* Modal Definitions */}
            <Modal isOpen={isConfirmOpen} onClose={() => setConfirmOpen(false)} size="sm">
                <Modal.Header>Delete Item</Modal.Header>
                <Modal.Body>
                    <p className="text-text-secondary dark:text-dark-text-secondary">
                        Are you sure you want to delete this item? This action cannot be undone.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setConfirmOpen(false)}>Cancel</Button>
                    <Button 
                        onClick={() => setConfirmOpen(false)}
                        className="!bg-system-error !text-white hover:!bg-red-600 focus-visible:!ring-red-500"
                    >
                        Delete Item
                    </Button>
                </Modal.Footer>
            </Modal>

             <Modal isOpen={isFormOpen} onClose={() => setFormOpen(false)} size="lg">
                <Modal.Header>Create New Project</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <Input
                            label="Project Name"
                            id="project-name"
                            placeholder="e.g., Q3 Marketing Campaign"
                        />
                        <Textarea
                            label="Project Description"
                            id="project-desc"
                            rows={4}
                            placeholder="Describe the project goals, target audience, and key deliverables..."
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setFormOpen(false)}>Cancel</Button>
                    <Button variant="primary" onClick={() => setFormOpen(false)}>Create Project</Button>
                </Modal.Footer>
            </Modal>

            <Modal isOpen={isScrollOpen} onClose={() => setScrollOpen(false)} size="md" verticalAlign="top">
                <Modal.Header>Terms of Service</Modal.Header>
                <Modal.Body>
                    <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary dark:text-dark-text-secondary">
                        {longContent}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setScrollOpen(false)}>Decline</Button>
                    <Button variant="primary" onClick={() => setScrollOpen(false)}>I Agree</Button>
                </Modal.Footer>
            </Modal>
            
            <Modal isOpen={isWorkbenchOpen} onClose={() => setWorkbenchOpen(false)} size={workbenchSize} verticalAlign={verticalAlign}>
                <Modal.Header>Interactive Modal</Modal.Header>
                <Modal.Body>
                    <p>This modal is using the <code className="font-mono bg-bg-tertiary dark:bg-dark-bg-tertiary px-1 py-0.5 rounded">{workbenchSize}</code> size and <code className="font-mono bg-bg-tertiary dark:bg-dark-bg-tertiary px-1 py-0.5 rounded">{verticalAlign}</code> alignment.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setWorkbenchOpen(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

        </SectionContainer>
    );
};