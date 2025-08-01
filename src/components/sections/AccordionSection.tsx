// FILE: components/sections/AccordionSection.tsx

import React from 'react';
import { SectionContainer, SubSection, ComponentPreview, Accordion, PropsTable } from '../Content.tsx';
import { Icon } from '../icons.tsx';
import CodeBlock from '../CodeBlock.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';
import { PropDef } from '../../types.ts';

const accordionProps: PropDef[] = [
    { name: 'title', type: 'string', default: 'N/A', description: 'The visible title of the accordion header.' },
    { name: 'children', type: 'React.ReactNode', default: 'N/A', description: 'The content that is revealed when the accordion is opened.' },
    { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'If true, the accordion will be open by default on initial render.' },
];

const accordionCode = `import { Accordion } from './Content.tsx';

<Accordion title="What is a design system?">
    <p>
        A design system is a collection of reusable components, 
        guided by clear standards, that can be assembled together 
        to build any number of applications.
    </p>
</Accordion>
`;

export const AccordionSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => (
    <SectionContainer id={id}>
        <Breadcrumb group={groupTitle} section={sectionTitle} />
        <h2 className="section-title">Accordions</h2>
        <p className="section-subtitle">
            Accordions are used to toggle the visibility of sections of content. They are a great way to manage information density, allowing users to focus on what's important and explore more detailed content as needed. Our component uses the native `{'<details>'}` element for accessibility.
        </p>
        
        <SubSection title="Basic Accordion">
             <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                This is the standard accordion. You can have multiple items open simultaneously.
            </p>
            <ComponentPreview className="!items-start !flex-col !w-full max-w-3xl">
                <div className="w-full space-y-4">
                    <Accordion title="What is a design system?">
                        <p>A design system is a set of standards to manage design at scale by reducing redundancy while creating a shared language and visual consistency across different pages and channels.</p>
                    </Accordion>
                    <Accordion title="What are the benefits?">
                        <ul>
                            <li><strong>Efficiency:</strong> Build products faster by reusing components.</li>
                            <li><strong>Consistency:</strong> Ensure a cohesive brand experience everywhere.</li>
                            <li><strong>Collaboration:</strong> Create a shared language between designers and developers.</li>
                        </ul>
                    </Accordion>
                    <Accordion title="How do I contribute?">
                        <p>You can contribute by reporting bugs, requesting features, or submitting pull requests. See the FAQ section for more details.</p>
                    </Accordion>
                </div>
            </ComponentPreview>
            <CodeBlock code={accordionCode} />
        </SubSection>
        
        <SubSection title="Default Open">
            <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                Use the <code>defaultOpen</code> prop to have an accordion item be expanded on page load.
            </p>
             <ComponentPreview className="!items-start !w-full max-w-3xl">
                <Accordion title="This item is open by default" defaultOpen>
                    <p>This content is visible on page load because the <code>defaultOpen</code> prop was set to true. This is useful for drawing attention to the most important item in a list.</p>
                </Accordion>
            </ComponentPreview>
        </SubSection>
        
        <SubSection title="Usage Guidelines">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <Icon className="!text-2xl text-system-success mt-1 shrink-0">check_circle</Icon>
                        <div>
                            <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Keep Titles Concise</h4>
                            <p className="text-sm">Accordion titles should be short and descriptive, clearly indicating the content within. Full questions work well.</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <Icon className="!text-2xl text-system-error mt-1 shrink-0">cancel</Icon>
                        <div>
                            <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Don't Nest Accordions</h4>
                            <p className="text-sm">Avoid placing an accordion inside another accordion. This can create a confusing and difficult-to-navigate user experience.</p>
                        </div>
                    </div>
                </div>
            </div>
        </SubSection>

        <SubSection title="Props: <Accordion />">
            <PropsTable data={accordionProps} />
        </SubSection>
    </SectionContainer>
);