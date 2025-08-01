// FILE: components/sections/MultiSelectSection.tsx

import React, { useState } from 'react';
import {
    SectionContainer,
    ComponentPreview,
    SubSection,
    PropsTable,
    MultiSelect,
} from '../Content.tsx';
import { Icon } from '../icons.tsx';
import CodeBlock from '../CodeBlock.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';
import { PropDef } from '../../../types.ts';

const userOptions = [
    { value: '1', label: 'Alice Smith' },
    { value: '2', label: 'Bob Johnson' },
    { value: '3', label: 'Charlie Brown' },
    { value: '4', label: 'Diana Prince' },
    { value: '5', label: 'Ethan Hunt' },
    { value: '6', label: 'Fiona Glenanne' },
    { value: '7', label: 'George Costanza' },
    { value: '8', label: 'Hannah Montana' },
];

const multiSelectProps: PropDef[] = [
    { name: 'label', type: 'string', default: 'N/A', description: 'The text label displayed above the input.' },
    { name: 'id', type: 'string', default: 'N/A', description: 'A unique ID for the input.' },
    { name: 'options', type: '{value: string, label: string}[]', default: '[]', description: 'The master list of all possible options.' },
    { name: 'selectedValues', type: '(string|number)[]', default: '[]', description: 'An array of the values of the currently selected options.' },
    { name: 'onSelectedValuesChange', type: '(values: (string|number)[]) => void', default: 'N/A', description: 'Callback executed when the selection changes.' },
    { name: 'placeholder', type: 'string', default: '""', description: 'Placeholder text for the input when empty.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the component.' },
    { name: 'error', type: 'string', default: 'undefined', description: 'Displays an error message.' },
];

const multiSelectCode = `import { MultiSelect } from './Content.tsx';

const [assignees, setAssignees] = useState(['1', '3']);

const userOptions = [
    { value: '1', label: 'Alice Smith' },
    { value: '2', label: 'Bob Johnson' },
    // ... more users
];

<MultiSelect
    label="Assignees"
    id="assignees-multiselect"
    options={userOptions}
    selectedValues={assignees}
    onSelectedValuesChange={(values) => setAssignees(values.map(String))}
    placeholder="Search for users to assign..."
/>`;

export const MultiSelectSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => {
    const [selectedUsers, setSelectedUsers] = useState(['2', '4']);

    return (
        <SectionContainer id={id}>
            <Breadcrumb group={groupTitle} section={sectionTitle} />
            <h2 className="section-title">Multi-Select</h2>
            <p className="section-subtitle">
                The Multi-Select component allows users to select multiple items from a list in an intuitive way. It combines an autocomplete input with "pills" or "tags" to display the current selection, making it ideal for assigning tags, selecting team members, or filtering by multiple categories.
            </p>
            
            <SubSection title="Live Demo">
                <ComponentPreview>
                    <div className="w-full max-w-lg space-y-8">
                        <MultiSelect
                            label="Assign Team Members"
                            id="team-multiselect"
                            options={userOptions}
                            selectedValues={selectedUsers}
                            onSelectedValuesChange={(values) => setSelectedUsers(values.map(String))}
                            placeholder="Search by name..."
                        />
                    </div>
                </ComponentPreview>
                <CodeBlock code={multiSelectCode} />
            </SubSection>

            <SubSection title="Props: <MultiSelect />">
                <PropsTable data={multiSelectProps} />
            </SubSection>
        </SectionContainer>
    );
};
