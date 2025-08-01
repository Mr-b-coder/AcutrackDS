// FILE: components/sections/ForDevelopersSection.tsx

import React from 'react';
import { SectionContainer, SubSection } from '../Content.tsx';
import { Icon } from '../icons.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';
import CodeBlock from '../CodeBlock.tsx';

const componentUsageCode = `import React from 'react';
import { Button, Icon } from 'acutrack-design-system';

function MyComponent() {
    return (
        <Button 
            variant="primary" 
            size="lg" 
            leftIcon={<Icon>check</Icon>}
            onClick={() => alert('Clicked!')}
        >
            Confirm
        </Button>
    );
}`;

const stylingCode = `<div className="bg-bg-primary p-4 rounded-lg border border-border-color">
  <h3 className="font-heading text-text-primary text-2xl">A Card Title</h3>
  <p className="font-body text-text-secondary mt-2">
    This component's styles are entirely defined by utility classes.
  </p>
</div>
`;

export const ForDevelopersSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => (
    <SectionContainer id={id}>
        <Breadcrumb group={groupTitle} section={sectionTitle} />
        <h2 className="section-title">Developer Guide</h2>
        <p className="section-subtitle">This guide provides developers with a complete overview of the Acutrack Design System's architecture, technology stack, and the core philosophies behind its construction. Understanding these principles is key to using and contributing to the system effectively.</p>
        
        <SubSection title="The Developer Workflow">
            <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                Using the design system is a straightforward process. Here’s how to go from idea to implementation:
            </p>
            <div className="space-y-8 not-prose">
                <div className="flex items-start gap-6 p-6 rounded-lg bg-bg-secondary dark:bg-dark-bg-secondary border border-border-color dark:border-dark-border-color">
                    <span className="text-4xl font-heading text-brand-orange">1</span>
                    <div>
                        <h4 className="font-bold text-lg text-text-primary dark:text-dark-text-primary">Find a Component</h4>
                        <p className="text-text-secondary dark:text-dark-text-secondary">Use the sidebar navigation to find the component you need. For example, to find the button component, navigate to <strong>Forms → Buttons</strong>.</p>
                    </div>
                </div>
                <div className="flex items-start gap-6 p-6 rounded-lg bg-bg-secondary dark:bg-dark-bg-secondary border border-border-color dark:border-dark-border-color">
                    <span className="text-4xl font-heading text-brand-orange">2</span>
                    <div>
                        <h4 className="font-bold text-lg text-text-primary dark:text-dark-text-primary">Use the Interactive Workbench</h4>
                        <p className="text-text-secondary dark:text-dark-text-secondary">Most component pages feature an "Interactive Workbench." Use the controls to configure the component's props and see a live preview update in real-time.</p>
                    </div>
                </div>
                <div className="flex items-start gap-6 p-6 rounded-lg bg-bg-secondary dark:bg-dark-bg-secondary border border-border-color dark:border-dark-border-color">
                    <span className="text-4xl font-heading text-brand-orange">3</span>
                    <div>
                        <h4 className="font-bold text-lg text-text-primary dark:text-dark-text-primary">Copy the Code Snippet</h4>
                        <p className="text-text-secondary dark:text-dark-text-secondary">As you configure the component, the code snippet below it updates automatically. This generated snippet shows the exact JSX needed to render the component with your selected props.</p>
                    </div>
                </div>
            </div>
        </SubSection>

        <SubSection title="Technology Stack">
            <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary dark:text-dark-text-secondary">
                <p>The system is built on a modern, robust technology stack chosen for its scalability and developer experience:</p>
                <ul>
                    <li><strong>React & TypeScript:</strong> All components are built as React functional components with strict TypeScript typing. This ensures type safety and provides excellent autocompletion in your IDE.</li>
                    <li><strong>Tailwind CSS:</strong> Styling is handled exclusively through Tailwind's utility classes. There are no separate CSS files to manage. This utility-first approach allows for rapid prototyping and ensures all styling adheres to the system's design tokens.</li>
                </ul>
            </div>
        </SubSection>
        
        <SubSection title="Core Philosophy: Styling with Design Tokens">
            <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                The most important principle to understand is that all styling is based on a central set of **design tokens**. These tokens (for colors, spacing, fonts, etc.) are defined in the <code>tailwind.config</code> and are applied using utility classes.
            </p>
            <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary dark:text-dark-text-secondary">
               <p><strong>You should never use hard-coded values.</strong> Instead of writing <code>color: '#1B3A7B'</code>, you use the utility class <code>text-brand-navy</code>. This ensures that every visual element is consistent and that the entire application's theme can be updated from a single source of truth.</p>
            </div>
            <CodeBlock code={stylingCode} />
        </SubSection>

        <SubSection title="Component Usage">
            <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                All components are exported from the design system package. You can import and use them in your own components as shown below. Most components accept props for customization, which are documented in their respective sections.
            </p>
            <CodeBlock code={componentUsageCode} />
        </SubSection>

        <SubSection title="State Management Philosophy">
             <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                Our components are designed to be "controlled" components. This means they are stateless and their behavior is controlled by props passed from a parent component. For example, to open a <code>{'<Modal>'}</code>, you pass it an <code>isOpen={true}</code> prop. The design system does not manage its own state; your application does. This makes our components highly flexible and easy to integrate into any state management solution (e.g., React's `useState`, Redux, etc.).
            </p>
        </SubSection>
    </SectionContainer>
);
