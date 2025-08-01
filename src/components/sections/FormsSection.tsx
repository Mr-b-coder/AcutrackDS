// FILE: components/sections/FormsSection.tsx
// This section documents the styles for form elements like inputs and checkboxes.

import React, {useState} from 'react';
import {
    SectionContainer,
    ComponentPreview,
    SubSection,
    Input,
    Checkbox,
    Radio,
    Textarea,
    ToggleSwitch,
    PropsTable,
} from '../Content.tsx';
import { Select, SelectOption } from '../Select.tsx';
import { Icon } from '../icons.tsx';
import CodeBlock from '../CodeBlock.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';
import { PropDef } from '../../types.ts';

const inputProps: PropDef[] = [
    { name: 'label', type: 'string', default: 'N/A', description: 'The text label displayed above the input.' },
    { name: 'id', type: 'string', default: 'N/A', description: 'A unique ID for the input, used to link the label.' },
    { name: 'error', type: 'string', default: 'undefined', description: 'If present, displays an error message below the input.' },
    { name: 'className', type: 'string', default: '""', description: 'Optional classes for the input element.' },
];
const selectOptions: SelectOption[] = [
    { value: '', label: 'Select a category' },
    { value: 'books', label: 'Book Fulfillment' },
    { value: 'media', label: 'Media Manufacturing' },
    { value: 'ecommerce', label: 'E-Commerce Shipping' },
];
const checkboxRadioProps: PropDef[] = [
    { name: 'label', type: 'string', default: 'N/A', description: 'The text label displayed next to the control.' },
    { name: 'id', type: 'string', default: 'N/A', description: 'A unique ID, used to link the label.' },
];
const selectProps: PropDef[] = [
    { name: 'label', type: 'string', default: 'N/A', description: 'The text label displayed above the select dropdown.' },
    { name: 'id', type: 'string', default: 'N/A', description: 'A unique ID, used to link the label.' },
    { name: 'options', type: '{value: string; label: string;}[]', default: '[]', description: 'An array of option objects for the dropdown.' },
    { name: 'value', type: 'string | number', default: 'N/A', description: 'The current value of the select component.' },
    { name: 'onChange', type: '(value: string | number) => void', default: 'N/A', description: 'Callback function when a new option is selected.' },
    { name: 'error', type: 'string', default: 'undefined', description: 'If present, displays an error message below the select.' },
];

const formsCode = `import { Input, Textarea, Checkbox, Radio, ToggleSwitch } from './Content.tsx';
import { Select } from './Select.tsx';

const [selectValue, setSelectValue] = useState('');
const options = [{ value: 'books', label: 'Books' }];
<Select 
    label="Category" 
    id="category" 
    options={options} 
    value={selectValue}
    onChange={(value) => setSelectValue(String(value))}
/>

<Input label="Name" id="name" type="text" placeholder="John Doe" />

<Textarea label="Your Message" id="message" rows={4} />

<Checkbox label="I agree" id="terms" />

<Radio label="Option 1" id="radio1" name="options" />

<ToggleSwitch label="Enable notifications" id="notifications" />`;

export const FormsSection: React.FC<{ groupTitle: string; sectionTitle:string; }> = ({ groupTitle, sectionTitle }) => {
    const [radioValue, setRadioValue] = useState('selected');
    const [selectValue, setSelectValue] = useState('');
    
    return (
        <SectionContainer id="forms">
            <Breadcrumb group={groupTitle} section={sectionTitle} />
            <h2 className="section-title">Forms & Inputs</h2>
            <p className="section-subtitle">
                Clear, consistent, and accessible form controls are vital for a good user experience. Our forms are encapsulated into reusable components to be intuitive and provide clear feedback for all interaction states.
            </p>
            
            <SubSection title="Text Inputs & Textareas">
              <ComponentPreview className="flex-col !items-start gap-8">
                <Input
                    label="Full Name"
                    id="default-input"
                    type="text"
                    placeholder="e.g., Jane Doe"
                />
                <Textarea
                    label="Your Message"
                    id="default-textarea"
                    placeholder="Let us know how we can help..."
                    rows={4}
                />
                <Input
                    label="Email Address (Error)"
                    id="error-input"
                    type="email"
                    defaultValue="invalid-email"
                    error="Please enter a valid email address."
                />
                <Input
                    label="Company Name (Disabled)"
                    id="disabled-input"
                    type="text"
                    placeholder="Acutrack"
                    disabled
                />
              </ComponentPreview>
            </SubSection>

            <SubSection title="Select Dropdown">
                <ComponentPreview className="flex-col !items-start gap-8">
                    <Select 
                        label="Service Category" 
                        id="select-default" 
                        options={selectOptions} 
                        value={selectValue}
                        onChange={(value) => setSelectValue(String(value))}
                    />
                    <Select 
                        label="Service Category (Disabled)" 
                        id="select-disabled" 
                        options={selectOptions} 
                        value={selectValue}
                        onChange={(value) => setSelectValue(String(value))}
                        disabled 
                    />
                </ComponentPreview>
            </SubSection>

            <SubSection title="Selection Controls">
                <ComponentPreview>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 w-full">
                        <div className="space-y-6">
                            <h4 className="font-semibold text-text-primary dark:text-dark-text-primary">Checkboxes</h4>
                            <Checkbox label="Default" id="check-default" />
                            <Checkbox label="Checked" id="check-checked" defaultChecked />
                            <Checkbox label="Disabled" id="check-disabled" disabled />
                        </div>
                        <div className="space-y-6">
                            <h4 className="font-semibold text-text-primary dark:text-dark-text-primary">Radio Buttons</h4>
                             <Radio label="Default" id="radio-default" name="plan" value="default" checked={radioValue === 'default'} onChange={(e) => setRadioValue(e.target.value)} />
                            <Radio label="Selected" id="radio-selected" name="plan" value="selected" checked={radioValue === 'selected'} onChange={(e) => setRadioValue(e.target.value)} />
                            <Radio label="Disabled" id="radio-disabled" name="plan-disabled" disabled />
                        </div>
                        <div className="space-y-6">
                            <h4 className="font-semibold text-text-primary dark:text-dark-text-primary">Toggle Switches</h4>
                             <ToggleSwitch label="Notifications" id="toggle-default" />
                            <ToggleSwitch label="Marketing emails" id="toggle-checked" defaultChecked />
                            <ToggleSwitch label="Sync data" id="toggle-disabled" disabled />
                        </div>
                    </div>
                </ComponentPreview>
            </SubSection>
            
            <SubSection title="Usage Guidelines">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <Icon className="!text-2xl text-system-success mt-1 shrink-0">check_circle</Icon>
                            <div>
                                <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Always Use Labels</h4>
                                <p className="text-sm">Every form control must have a corresponding `{'<label>'}`. This is critical for screen reader accessibility.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Icon className="!text-2xl text-system-success mt-1 shrink-0">check_circle</Icon>
                            <div>
                                <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Provide Helpful Error Messages</h4>
                                <p className="text-sm">When validation fails, clearly state what is wrong and how to fix it (e.g., "Password must be at least 8 characters long").</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <Icon className="!text-2xl text-system-error mt-1 shrink-0">cancel</Icon>
                            <div>
                                <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Don't Use Placeholders as Labels</h4>
                                <p className="text-sm">Placeholder text disappears on input, which forces users to rely on memory. Use them only as hints or examples (e.g., "jane.doe@example.com").</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Icon className="!text-2xl text-system-error mt-1 shrink-0">cancel</Icon>
                            <div>
                                <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Avoid Long Select Lists</h4>
                                <p className="text-sm">For lists with more than 15 options, consider an autocomplete input instead of a `{'<select>'}` to improve usability.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </SubSection>

            <SubSection title="Component Props">
                <div className="space-y-12">
                     <div>
                        <h4 className="font-bold mb-2 text-text-primary dark:text-dark-text-primary">{'<Input /> & <Textarea />'}</h4>
                        <div className="component-preview !p-0 !bg-transparent !border-none"><PropsTable data={inputProps} /></div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2 text-text-primary dark:text-dark-text-primary">{'<Select />'}</h4>
                        <div className="component-preview !p-0 !bg-transparent !border-none"><PropsTable data={selectProps} /></div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2 text-text-primary dark:text-dark-text-primary">{'<Checkbox />, <Radio />, & <ToggleSwitch />'}</h4>
                        <div className="component-preview !p-0 !bg-transparent !border-none"><PropsTable data={checkboxRadioProps} /></div>
                    </div>
                </div>
            </SubSection>

            <SubSection title="Implementation Example">
                <CodeBlock code={formsCode} />
            </SubSection>

        </SectionContainer>
    );
}