import React from 'react';
import { SectionContainer, SubSection, CodeBlock } from '../Content.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';

export const ComponentsSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => {
    const components = [
        { name: 'Accordion', usage: '<Accordion>' },
        { name: 'Alert', usage: '<Alert>' },
        { name: 'Autocomplete', usage: '<Autocomplete>' },
        { name: 'Avatar', usage: '<Avatar>' },
        { name: 'Badge', usage: '<Badge>' },
        { name: 'Banner', usage: '<Banner>' },
        { name: 'Breadcrumb', usage: '<Breadcrumb>' },
        { name: 'BrowserCompatibility', usage: '<BrowserCompatibility>' },
        { name: 'Button', usage: '<Button>' },
        { name: 'ButtonGroup', usage: '<ButtonGroup>' },
        { name: 'Calendar', usage: '<Calendar>' },
        { name: 'Card', usage: '<Card>' },
        { name: 'Checkbox', usage: '<Checkbox>' },
        { name: 'Container', usage: '<Container>' },
        { name: 'DatePicker', usage: '<DatePicker>' },
        { name: 'DateRangePicker', usage: '<DateRangePicker>' },
        { name: 'Drawer', usage: '<Drawer>' },
        { name: 'Dropdown', usage: '<Dropdown>' },
        { name: 'EmptyState', usage: '<EmptyState>' },
        { name: 'FileUploader', usage: '<FileUploader>' },
        { name: 'Grid', usage: '<Grid>' },
        { name: 'Header', usage: '<Header>' },
        { name: 'Input', usage: '<Input>' },
        { name: 'Modal', usage: '<Modal>' },
        { name: 'MultiSelect', usage: '<MultiSelect>' },
        { name: 'Pagination', usage: '<Pagination>' },
        { name: 'Popover', usage: '<Popover>' },
        { name: 'Progress', usage: '<Progress>' },
        { name: 'Radio', usage: '<Radio>' },
        { name: 'Select', usage: '<Select>' },
        { name: 'Sidebar', usage: '<Sidebar>' },
        { name: 'Skeleton', usage: '<Skeleton>' },
        { name: 'Slider', usage: '<Slider>' },
        { name: 'SplitButton', usage: '<SplitButton>' },
        { name: 'Stack', usage: '<Stack>' },
        { name: 'Stepper', usage: '<Stepper>' },
        { name: 'Table', usage: '<Table>' },
        { name: 'Textarea', usage: '<Textarea>' },
        { name: 'Toast', usage: '<Toast>' },
        { name: 'ToggleSwitch', usage: '<ToggleSwitch>' },
        { name: 'Tooltip', usage: '<Tooltip>' },
        { name: 'TreeView', usage: '<TreeView>' },
    ];

    return (
        <SectionContainer id={id}>
            <Breadcrumb group={groupTitle} section={sectionTitle} />
            <h2 className="section-title">All Components</h2>
            <p className="section-subtitle">
                This section provides a comprehensive list of all reusable components available in the Acutrack Design System, along with their basic usage.
            </p>

            <SubSection title="Component List">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {components.map((component, index) => (
                        <div key={index} className="bg-bg-secondary dark:bg-dark-bg-secondary p-6 rounded-lg border border-border-color dark:border-dark-border-color">
                            <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-2">{component.name}</h3>
                            <p className="text-text-secondary dark:text-dark-text-secondary mb-4">Example Usage:</p>
                            <CodeBlock code={component.usage} />
                        </div>
                    ))}
                </div>
            </SubSection>
        </SectionContainer>
    );
};
