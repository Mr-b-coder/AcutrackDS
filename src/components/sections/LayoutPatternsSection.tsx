// FILE: components/sections/LayoutPatternsSection.tsx
import React, { useState } from 'react';
import { SectionContainer, SubSection, ComponentPreview, Card, Input, ToggleSwitch, Button, Stepper, Accordion, Badge, Avatar } from '../Content.tsx';
import { Select, SelectOption } from '../Select.tsx';
import { Table } from '../Table.tsx';
import { Icon } from '../icons.tsx';
import CodeBlock from '../CodeBlock.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';

const listDetailCode = `<div class="flex h-[80vh] gap-6">
  {/* List Panel */}
  <div class="w-1/3 flex flex-col">
    <Card isInteractive={false} className="flex-grow flex flex-col">
      <Card.Body>
        {/* Filters and Search */}
      </Card.Body>
      <div class="overflow-y-auto custom-scrollbar">
        <Table>
          {/* Table Content */}
        </Table>
      </div>
    </Card>
  </div>

  {/* Detail Panel */}
  <div class="w-2/3">
    <Card isInteractive={false} className="h-full">
      <Card.Body>
        {/* Detailed Content */}
      </Card.Body>
    </Card>
  </div>
</div>`;

const settingsPageCode = `<div class="space-y-8">
  <Card isInteractive={false}>
    <Card.Header>Profile Settings</Card.Header>
    <Card.Body>
      <Input label="Full Name" />
      <Input label="Email" type="email" />
    </Card.Body>
    <Card.Footer>
      <Button variant="primary">Save Profile</Button>
    </Card.Footer>
  </Card>

  <Card isInteractive={false}>
    <Card.Header>Notification Settings</Card.Header>
    <Card.Body>
      <Accordion title="Email Notifications">
        <ToggleSwitch label="Weekly Newsletter" />
        <ToggleSwitch label="Product Updates" />
      </Accordion>
    </Card.Body>
  </Card>
</div>
`;

const wizardFlowCode = `<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
  {/* Stepper */}
  <div class="md:col-span-1">
    <Stepper currentStep={currentStep}>
      <Stepper.Step stepNumber={1} title="Create Account" />
      <Stepper.Step stepNumber={2} title="Choose Plan" />
      <Stepper.Step stepNumber={3} title="Payment" />
    </Stepper>
  </div>

  {/* Content Panel */}
  <div class="md:col-span-3">
    <Card isInteractive={false}>
      <Card.Body>
        {/* Form content for the current step */}
      </Card.Body>
      <Card.Footer>
        <Button variant="secondary">Back</Button>
        <Button variant="primary">Next</Button>
      </Card.Footer>
    </Card>
  </div>
</div>
`;

const mockTableData = [
    { id: 'usr-001', name: 'Alice', role: 'Admin' },
    { id: 'usr-002', name: 'Bob', role: 'Editor' },
    { id: 'usr-003', name: 'Charlie', role: 'Viewer' },
    { id: 'usr-004', name: 'David', role: 'Viewer' },
    { id: 'usr-005', name: 'Eve', role: 'Editor' },
];

const planData = [
    { id: 'free', name: 'Free', price: '$0', description: 'For individuals and small projects.' },
    { id: 'pro', name: 'Pro', price: '$29', description: 'For growing teams and businesses.', featured: true },
    { id: 'enterprise', name: 'Enterprise', price: 'Custom', description: 'For large-scale applications.' },
];


export const LayoutPatternsSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedPlan, setSelectedPlan] = useState('pro');
    
    return (
        <SectionContainer id="layoutpatterns">
            <Breadcrumb group={groupTitle} section={sectionTitle} />
            <h2 className="section-title">Layout Patterns</h2>
            <p className="section-subtitle">
                While individual components are the atoms of our UI, patterns are the molecules. They are reusable combinations of components that solve common design problems. Using these established patterns ensures a consistent and predictable user experience across the entire application.
            </p>

            <SubSection title="List/Detail View">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    A common pattern for managing a collection of items. The left panel contains a searchable or filterable list, and selecting an item displays its full details in the right panel. This pattern is ideal for managing users, products, or any set of data.
                </p>
                <ComponentPreview className="!p-0 w-full !bg-transparent !border-none">
                    <div className="flex h-[80vh] w-full gap-6">
                        {/* List Panel */}
                        <div className="w-1/3 flex flex-col">
                            <Card isInteractive={false} className="flex-grow flex flex-col">
                                <Card.Body className="shrink-0">
                                    <h3 className="font-bold text-lg mb-4 text-text-primary dark:text-dark-text-primary">Users</h3>
                                    <Input id="user-search" label="Search Users" placeholder="Filter by name or role..."/>
                                </Card.Body>
                                <div className="border-t border-border-color dark:border-dark-border-color overflow-y-auto custom-scrollbar">
                                    <Table hoverable>
                                        <Table.Header>
                                            <Table.HeadCell>Name</Table.HeadCell>
                                            <Table.HeadCell>Role</Table.HeadCell>
                                        </Table.Header>
                                        <Table.Body>
                                            {mockTableData.map(user => (
                                                <Table.Row key={user.id} selected={user.id === 'usr-001'}>
                                                    <Table.Cell className="font-bold text-text-primary dark:text-dark-text-primary">{user.name}</Table.Cell>
                                                    <Table.Cell><Badge>{user.role}</Badge></Table.Cell>
                                                </Table.Row>
                                            ))}
                                        </Table.Body>
                                    </Table>
                                </div>
                            </Card>
                        </div>

                        {/* Detail Panel */}
                        <div className="w-2/3">
                            <Card isInteractive={false} className="h-full">
                                <Card.Body className="flex flex-col">
                                    <div className="flex items-center gap-4">
                                        <Avatar name="Alice" size="lg" src="https://i.pravatar.cc/64?u=alice" />
                                        <div>
                                            <h3 className="font-bold text-2xl text-text-primary dark:text-dark-text-primary">Alice</h3>
                                            <p className="text-text-secondary dark:text-dark-text-secondary">Admin User</p>
                                        </div>
                                    </div>
                                    <div className="mt-6 border-t border-border-color dark:border-dark-border-color pt-6 space-y-4 flex-grow">
                                       <h4 className="font-semibold text-text-primary dark:text-dark-text-primary">User Details</h4>
                                       <p className="text-sm"><strong>Email:</strong> alice@example.com</p>
                                       <p className="text-sm"><strong>Last Login:</strong> 2 hours ago</p>
                                    </div>
                                    <div className="mt-6 flex justify-end gap-3">
                                        <Button variant="secondary" className="!border-system-error !text-system-error hover:!bg-red-50 dark:hover:!bg-red-500/10">Deactivate</Button>
                                        <Button variant="primary">Edit User</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </ComponentPreview>
                <CodeBlock code={listDetailCode} />
            </SubSection>

            <SubSection title="Settings Page">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    A standardized layout for user or application settings. Use `Card` components to group related settings, and `Accordion`s for sections that can be collapsed. Each card should have a clear "Save" action in its footer.
                </p>
                <ComponentPreview className="!p-0 w-full max-w-3xl !bg-transparent !border-none">
                    <div className="space-y-8 w-full">
                        <Card isInteractive={false}>
                            <Card.Body className="!pb-0">
                                <h3 className="font-bold text-lg text-text-primary dark:text-dark-text-primary">Profile</h3>
                                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">This information will be displayed publicly.</p>
                            </Card.Body>
                            <Card.Body>
                                <div className="space-y-4">
                                    <Input label="Full Name" id="settings-name" defaultValue="Alice" />
                                    <Input label="Email" id="settings-email" type="email" defaultValue="alice@example.com" />
                                </div>
                            </Card.Body>
                            <Card.Footer className="justify-end">
                                <Button variant="primary">Save Profile</Button>
                            </Card.Footer>
                        </Card>

                        <Card isInteractive={false}>
                            <Card.Body className="!pb-0">
                                <h3 className="font-bold text-lg text-text-primary dark:text-dark-text-primary">Notifications</h3>
                                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">Manage how you receive notifications.</p>
                            </Card.Body>
                            <Card.Body>
                                <Accordion title="Email Notifications" defaultOpen>
                                    <div className="space-y-4">
                                        <ToggleSwitch label="Weekly Newsletter" id="news-toggle" defaultChecked />
                                        <ToggleSwitch label="Product Updates" id="prod-toggle" defaultChecked />
                                        <ToggleSwitch label="Sync data" id="sec-toggle" disabled defaultChecked />
                                    </div>
                                </Accordion>
                            </Card.Body>
                        </Card>
                    </div>
                </ComponentPreview>
                <CodeBlock code={settingsPageCode} />
            </SubSection>

            <SubSection title="Wizard / Onboarding Flow">
                 <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    For multi-step processes like user onboarding or complex form submissions, combine the `Stepper` component with a content panel. The stepper visually indicates progress, while the panel shows the form for the current step.
                </p>
                <ComponentPreview className="!p-0 w-full !bg-transparent !border-none">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
                        <div className="md:col-span-1">
                            <Stepper currentStep={currentStep}>
                                <Stepper.Step stepNumber={1} title="Create Account" description="Basic info" />
                                <Stepper.Step stepNumber={2} title="Choose Plan" description="Select your tier" />
                                <Stepper.Step stepNumber={3} title="Payment" description="Add billing info" />
                            </Stepper>
                        </div>
                        <div className="md:col-span-3">
                             <Card isInteractive={false}>
                                <Card.Body className="min-h-[24rem]">
                                    <h3 className="font-bold text-lg text-text-primary dark:text-dark-text-primary mb-4">
                                       Step {currentStep}: {currentStep === 1 ? 'Create Account' : currentStep === 2 ? 'Choose Plan' : 'Payment'}
                                    </h3>
                                    {currentStep === 1 && (
                                        <div className="space-y-4">
                                            <Input label="Email Address" id="wiz-email" type="email" placeholder="you@example.com" />
                                            <Input label="Password" id="wiz-password" type="password" />
                                        </div>
                                    )}
                                    {currentStep === 2 && (
                                        <fieldset>
                                            <legend className="sr-only">Pricing plans</legend>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {planData.map(plan => (
                                                    <div key={plan.id}>
                                                        <input 
                                                            type="radio" 
                                                            id={`plan-${plan.id}`} 
                                                            name="plan"
                                                            value={plan.id}
                                                            className="sr-only peer"
                                                            checked={selectedPlan === plan.id}
                                                            onChange={(e) => setSelectedPlan(e.target.value)}
                                                        />
                                                        <Card as="label" htmlFor={`plan-${plan.id}`} featured={plan.featured} className="peer-checked:border-brand-orange peer-checked:shadow-lg peer-checked:-translate-y-0.5 h-full">
                                                            <Card.Body>
                                                                <h4 className="font-bold font-heading text-text-primary dark:text-dark-text-primary">{plan.name}</h4>
                                                                <p className="text-xl font-bold font-heading text-text-primary dark:text-dark-text-primary mt-1">{plan.price}</p>
                                                                <p className="mt-2 text-xs">{plan.description}</p>
                                                            </Card.Body>
                                                        </Card>
                                                    </div>
                                                ))}
                                            </div>
                                        </fieldset>
                                    )}
                                    {currentStep === 3 && (
                                        <div className="space-y-4">
                                            <Input label="Cardholder Name" id="wiz-cc-name" placeholder="Jane Doe" />
                                            <Input label="Card Number" id="wiz-cc-num" placeholder="•••• •••• •••• ••••" />
                                        </div>
                                    )}
                                </Card.Body>
                                <Card.Footer className="justify-between">
                                    <Button variant="secondary" onClick={() => setCurrentStep(p => Math.max(1, p - 1))} disabled={currentStep === 1}>Back</Button>
                                    <Button variant="primary" onClick={() => setCurrentStep(p => Math.min(3, p + 1))}>
                                        {currentStep === 3 ? 'Finish' : 'Next'}
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </div>
                    </div>
                </ComponentPreview>
                <CodeBlock code={wizardFlowCode} />
            </SubSection>

        </SectionContainer>
    );
};