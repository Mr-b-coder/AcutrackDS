// FILE: components/sections/AutocompleteSection.tsx

import React, { useState } from 'react';
import {
    SectionContainer,
    ComponentPreview,
    SubSection,
    PropsTable,
    Autocomplete,
} from '../Content.tsx';
import CodeBlock from '../CodeBlock.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';
import { PropDef } from '../../../types.ts';

const countryOptions = [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'MX', label: 'Mexico' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'JP', label: 'Japan' },
    { value: 'AU', label: 'Australia' },
    { value: 'BR', label: 'Brazil' },
    { value: 'IN', label: 'India' },
];

const autocompleteProps: PropDef[] = [
    { name: 'label', type: 'string', default: 'N/A', description: 'The text label displayed above the input.' },
    { name: 'id', type: 'string', default: 'N/A', description: 'A unique ID for the input.' },
    { name: 'options', type: '{value: string, label: string}[]', default: '[]', description: 'The list of all possible options to filter from.' },
    { name: 'value', type: 'string | number', default: 'N/A', description: 'The currently selected value of the component.' },
    { name: 'onValueChange', type: '(value: string | number) => void', default: 'N/A', description: 'Callback executed when an option is selected or cleared.' },
    { name: 'placeholder', type: 'string', default: '""', description: 'Placeholder text for the input.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the component.' },
    { name: 'error', type: 'string', default: 'undefined', description: 'Displays an error message.' },
];

const autocompleteCode = `import { Autocomplete } from './Content.tsx';

const [country, setCountry] = useState('');

const countryOptions = [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    // ... more countries
];

<Autocomplete
    label="Country"
    id="country-autocomplete"
    options={countryOptions}
    value={country}
    onValueChange={(v) => setCountry(String(v))}
    placeholder="Search for a country..."
/>`;

export const AutocompleteSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => {
    const [country, setCountry] = useState('');
    const [disabledCountry, setDisabledCountry] = useState('CA');

    return (
        <SectionContainer id={id}>
            <Breadcrumb group={groupTitle} section={sectionTitle} />
            <h2 className="section-title">Autocomplete</h2>
            <p className="section-subtitle">
                An Autocomplete (or Combobox) is an input field that provides real-time suggestions as the user types. It's an enhanced alternative to a standard `Select` dropdown for long lists of options.
            </p>
            
            <SubSection title="Live Demo">
                <ComponentPreview>
                    <div className="w-full max-w-sm space-y-8">
                        <Autocomplete
                            label="Country"
                            id="country-autocomplete"
                            options={countryOptions}
                            value={country}
                            onValueChange={(v) => setCountry(String(v))}
                            placeholder="Search for a country..."
                        />
                        <Autocomplete
                            label="Disabled Autocomplete"
                            id="country-autocomplete-disabled"
                            options={countryOptions}
                            value={disabledCountry}
                            onValueChange={(v) => setDisabledCountry(String(v))}
                            placeholder="Search for a country..."
                            disabled
                        />
                    </div>
                </ComponentPreview>
                <CodeBlock code={autocompleteCode} />
            </SubSection>

            <SubSection title="Props: <Autocomplete />">
                <PropsTable data={autocompleteProps} />
            </SubSection>
        </SectionContainer>
    );
};
