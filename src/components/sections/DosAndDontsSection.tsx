// FILE: components/sections/DosAndDontsSection.tsx
import React from 'react';
import { SectionContainer, SubSection } from '../Content.tsx';
import { Table } from '../Table.tsx';
import { Icon } from '../icons.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';

const dosAndDontsData = [
    {
        principle: 'Component Usage',
        do: 'Always look for an existing component in the design system first. Import and use it directly.',
        do_example: `import { Button } from 'acutrack-design-system';

<Button>Save Changes</Button>`,
        dont: "Don't rebuild a component from scratch because you need a minor variation. If a component doesn't meet your needs, propose a change to the system first.",
        dont_example: `// Creates inconsistency and tech debt
<div className="my-custom-button">
  Save
</div>`,
    },
    {
        principle: 'Styling and Theming',
        do: 'Use the provided Tailwind utility classes exclusively for all styling. This ensures your component respects our theming and design tokens.',
        do_example: `<div className="bg-brand-navy p-4 rounded-lg">
  ...
</div>`,
        dont: "Never use inline styles or create separate CSS files to style a component. This breaks the connection to our design tokens and makes theming impossible.",
        dont_example: `// This breaks theming and responsiveness
<div style={{ backgroundColor: '#1B3A7B' }}>
  ...
</div>`,
    },
    {
        principle: 'Using Design Tokens',
        do: 'Use the semantic token names for colors, spacing, fonts, etc. (e.g., `text-acu-navy`, `p-4`). They are predictable and consistent.',
        do_example: `<div className="p-4 text-brand-navy">
  Correct
</div>`,
        dont: 'Avoid using "magic numbers" or hard-coded values in utility classes. These arbitrary values are not part of the system and create visual inconsistencies.',
        dont_example: `<div className="p-[17px] text-[#1B3A7B]">
  Incorrect
</div>`,
    },
    {
        principle: 'Composition',
        do: 'Build complex UIs by composing smaller, single-purpose components together. This is the core philosophy of React and our system.',
        do_example: `// An icon button is made by placing an
// <Icon> inside a <Button>.
<Button>
  <Icon>add_circle</Icon>
  Add Item
</Button>`,
        dont: "Don't try to modify the internal code of a component or create monolithic, inflexible components that try to do too much.",
        dont_example: `// Avoid this anti-pattern:
<MonolithicCard
  title="My Card"
  showButton={true}
  buttonText="Click"
/>`,
    },
    {
        principle: 'Component Logic',
        do: "Use the component's existing props to control its behavior and appearance (e.g., `<Button variant=\"secondary\">`).",
        do_example: `// Use the 'variant' prop to change the style
<Button variant="secondary" />`,
        dont: "Don't wrap a component in a `div` just to override its styles or behavior. This often indicates you're fighting the system.",
        dont_example: `// Don't do this to make a button red
<div className="make-my-button-red">
  <Button />
</div>`,
    },
    {
        principle: 'Accessibility',
        do: 'Ensure all interactive elements have text or an `aria-label`. Use our components semantically and provide `alt` text for images.',
        do_example: `<Button aria-label="Add a new item">
  <Icon>add_circle</Icon>
</Button>`,
        dont: "Don't assume the component is automatically accessible without providing the necessary content. An icon-only button without an `aria-label` is invisible to screen readers.",
        dont_example: `<Button>
  <Icon>add_circle</Icon>
</Button>`,
    },
    {
        principle: 'System Updates',
        do: "Regularly update to the latest version of the `acutrack-design-system` package to receive bug fixes and new features.",
        do_example: `// In package.json (allows minor/patch updates)
"dependencies": {
  "acutrack-design-system": "^1.2.3"
}`,
        dont: "Don't pin your project to an old, outdated version of the design system. This leads to fragmentation and makes it difficult to adopt new standards.",
        dont_example: `// Stuck on an old version
"dependencies": {
  "acutrack-design-system": "0.1.0"
}`,
    },
];

export const DosAndDontsSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => (
    <SectionContainer id={id}>
        <Breadcrumb group={groupTitle} section={sectionTitle} />
        <h2 className="section-title">Resource: Best Practices & Guardrails</h2>
        <p className="section-subtitle">
            This guide isn't a list of restrictive rules. It's a set of guardrails designed to help us all build better products, faster. By following these best practices, we ensure our user experiences are consistent, our code is maintainable, and we can focus on solving user problems instead of reinventing the wheel.
        </p>

        <SubSection title="Core Principles">
            <div className="w-full overflow-x-auto custom-scrollbar">
                <Table>
                    <Table.Header>
                        <Table.HeadCell>Principle</Table.HeadCell>
                        <Table.HeadCell>✅ Do (The Right Way)</Table.HeadCell>
                        <Table.HeadCell>❌ Don't (The Common Pitfall)</Table.HeadCell>
                    </Table.Header>
                    <Table.Body>
                        {dosAndDontsData.map((item) => (
                            <Table.Row key={item.principle}>
                                <Table.Cell className="font-bold text-text-primary dark:text-dark-text-primary whitespace-nowrap align-top">
                                    {item.principle}
                                </Table.Cell>
                                <Table.Cell className="align-top">
                                    <p className="mb-2">{item.do}</p>
                                    <pre className="p-2 rounded-lg bg-bg-tertiary dark:bg-dark-bg-tertiary text-xs"><code className="font-mono">{item.do_example}</code></pre>
                                </Table.Cell>
                                <Table.Cell className="align-top">
                                    <p className="mb-2">{item.dont}</p>
                                    <pre className="p-2 rounded-lg bg-bg-tertiary dark:bg-dark-bg-tertiary text-xs"><code className="font-mono">{item.dont_example}</code></pre>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </SubSection>

        <SubSection title="Conclusion">
            <p className="text-text-secondary dark:text-dark-text-secondary">
                The Acutrack Design System is a living product that will grow and evolve with us. Your feedback, contributions, and ideas are what will make it truly powerful. Let's keep building.
            </p>
        </SubSection>
    </SectionContainer>
);