// FILE: components/sections/LoadingStatesSection.tsx
import React, { useState } from 'react';
import { SectionContainer, SubSection, ComponentPreview, Card, Skeleton, Button, Spinner } from '../Content.tsx';
import { Table } from '../Table.tsx';
import { Icon } from '../icons.tsx';
import CodeBlock from '../CodeBlock.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';

const skeletonCardCode = `<Card className="max-w-sm" disabled>
    <Skeleton height={192} width="100%" className="!rounded-b-none" />
    <Card.Body>
        <Skeleton height="1.25rem" width="60%" className="mb-4" />
        <Skeleton height="1rem" width="90%" />
        <Skeleton height="1rem" width="80%" className="mt-2" />
    </Card.Body>
</Card>
`;

const spinnerButtonCode = `const [isSaving, setIsSaving] = useState(false);

const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => setIsSaving(false), 2000);
};

<Button variant="primary" onClick={handleSave} disabled={isSaving}>
    {isSaving ? (
        <>
            <Spinner size="sm" color="white" className="mr-3" />
            Saving...
        </>
    ) : (
        'Save Changes'
    )}
</Button>
`;

export const LoadingStatesSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => {
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 2000);
    };

    return (
        <SectionContainer id="loadingstates">
            <Breadcrumb group={groupTitle} section={sectionTitle} />
            <h2 className="section-title">Loading State Patterns</h2>
            <p className="section-subtitle">
                Communicating loading states effectively is crucial for a good user experience. It reduces uncertainty and makes the application feel more responsive. This section provides guidance on when to use our two primary loading indicators: Skeletons and Spinners.
            </p>

            <SubSection title="When to Use Skeletons">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    **Use a Skeleton when you are loading content for the first time on a page or in a component.** Skeletons provide a low-fidelity preview of the UI, which reduces cognitive load and makes the app feel faster because the user can anticipate the content structure.
                </p>
                <ComponentPreview>
                    <Card className="w-full max-w-sm" disabled>
                        <Skeleton height={192} width="100%" className="!rounded-b-none" />
                        <Card.Body>
                            <Skeleton height="1.25rem" width="60%" className="mb-4" />
                            <Skeleton height="1rem" width="90%" />
                            <Skeleton height="1rem" width="80%" className="mt-2" />
                        </Card.Body>
                    </Card>
                </ComponentPreview>
                <CodeBlock code={skeletonCardCode} />
            </SubSection>
            
            <SubSection title="When to Use Spinners">
                 <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    **Use a Spinner for user-initiated actions where the context is already on screen.** Spinners are best for indeterminate processes triggered by an action like submitting a form or saving changes, where the underlying UI doesn't need to be replaced.
                </p>
                <ComponentPreview>
                    <Button variant="primary" onClick={handleSave} disabled={isSaving} className="w-48">
                        {isSaving ? (
                            <>
                                <Spinner size="sm" color="white" className="mr-3" />
                                Saving...
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </Button>
                </ComponentPreview>
                <CodeBlock code={spinnerButtonCode} />
            </SubSection>

            <SubSection title="Summary of Guidelines">
                 <Table>
                    <Table.Header>
                        <Table.HeadCell>{''}</Table.HeadCell>
                        <Table.HeadCell>Skeletons</Table.HeadCell>
                        <Table.HeadCell>Spinners</Table.HeadCell>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell className="font-bold text-text-primary dark:text-dark-text-primary">Best For</Table.Cell>
                            <Table.Cell>Initial page/component load</Table.Cell>
                            <Table.Cell>User-initiated actions (form submission, etc.)</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell className="font-bold text-text-primary dark:text-dark-text-primary">User Perception</Table.Cell>
                            <Table.Cell>Reduces cognitive load; feels faster</Table.Cell>
                            <Table.Cell>Confirms a background process has started</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell className="font-bold text-text-primary dark:text-dark-text-primary">Example</Table.Cell>
                            <Table.Cell>Loading a user profile page</Table.Cell>
                            <Table.Cell>Clicking the "Save" button on that page</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </SubSection>
        </SectionContainer>
    );
};
