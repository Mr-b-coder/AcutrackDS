// FILE: components/sections/LayoutSection.tsx
// This section documents the foundational layout components.

import React from 'react';
import { SectionContainer, SubSection, ComponentPreview, Card, PropsTable, Container, Stack, Grid } from '../Content.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';
import CodeBlock from '../CodeBlock.tsx';
import { PropDef } from '../../types.ts';

const containerProps: PropDef[] = [
    { name: 'children', type: 'React.ReactNode', default: 'N/A', description: 'The content to be placed inside the container.' },
    { name: 'as', type: 'React.ElementType', default: "'div'", description: 'The HTML element to render the container as.' },
    { name: 'className', type: 'string', default: '""', description: 'Additional CSS classes to apply to the container.' },
];
const containerCode = `<Container>
  {/* Your page content goes here */}
</Container>`;

const stackProps: PropDef[] = [
    { name: 'children', type: 'React.ReactNode', default: 'N/A', description: 'The elements to be stacked vertically.' },
    { name: 'gap', type: '1 | 2 | 3 | 4 | 6 | 8 | ...', default: '4', description: 'The spacing gap between children, based on the 8-point system.' },
    { name: 'as', type: 'React.ElementType', default: "'div'", description: 'The HTML element to render as.' },
];
const stackCode = `<Stack gap={8}>
  <Card isInteractive={false}>...</Card>
  <Card isInteractive={false}>...</Card>
  <Card isInteractive={false}>...</Card>
</Stack>`;

const gridProps: PropDef[] = [
    { name: 'children', type: 'React.ReactNode', default: 'N/A', description: 'The elements to be placed in the grid.' },
    { name: 'columns', type: 'number | { sm?, md?, lg?, xl? }', default: '1', description: 'Number of columns, or an object for responsive columns (e.g., { sm: 2, md: 3 }).' },
    { name: 'gap', type: '1 | 2 | 3 | 4 | 6 | 8 | ...', default: '8', description: 'The spacing gap between grid items.' },
    { name: 'as', type: 'React.ElementType', default: "'div'", description: 'The HTML element to render as.' },
];
const gridCode = `<Grid columns={{ sm: 2, lg: 3 }} gap={6}>
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</Grid>`;

export const LayoutSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => (
    <SectionContainer id={id}>
        <Breadcrumb group={groupTitle} section={sectionTitle} />
        <h2 className="section-title">Layout & Grid Components</h2>
        <p className="section-subtitle">A consistent layout is the foundation of a good user experience. These declarative layout components encapsulate our spacing and responsive design principles, making it fast and easy to build balanced and predictable interfaces.</p>
        
        <SubSection title="<Container />">
            <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                The `<Container />` component constrains your content to a standard, centered max-width. Use it as the main wrapper for your page content to ensure readability on wide screens.
            </p>
            <ComponentPreview>
                <Container className="w-full bg-bg-tertiary dark:bg-dark-bg-tertiary p-4 rounded-lg">
                    <div className="bg-bg-secondary dark:bg-dark-bg-secondary py-6 rounded text-center">
                        <p className="font-bold text-text-primary dark:text-dark-text-primary">Content Area</p>
                        <p className="text-sm font-mono text-text-secondary dark:text-dark-text-secondary mt-1">max-w-6xl with padding</p>
                    </div>
                </Container>
            </ComponentPreview>
            <CodeBlock code={containerCode} />
            <div className="mt-8"><PropsTable data={containerProps} /></div>
        </SubSection>

        <SubSection title="<Stack />">
            <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                The `<Stack />` component is used to arrange a group of elements in a vertical column with a consistent gap between them. It's the ideal way to manage vertical rhythm without adding manual margins to each element.
            </p>
            <ComponentPreview>
                <Stack gap={6} className="w-full max-w-md">
                   <Card isInteractive={false}><Card.Body><p>Item 1</p></Card.Body></Card>
                   <Card isInteractive={false}><Card.Body><p>Item 2</p></Card.Body></Card>
                   <Card isInteractive={false}><Card.Body><p>Item 3</p></Card.Body></Card>
                </Stack>
            </ComponentPreview>
            <CodeBlock code={stackCode} />
            <div className="mt-8"><PropsTable data={stackProps} /></div>
        </SubSection>
        
        <SubSection title="<Grid />">
            <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                The `<Grid />` component is a declarative way to create responsive grid layouts. Pass a number to `columns` for a simple grid, or an object for a grid that adapts to different breakpoints.
            </p>
            <ComponentPreview>
                <Grid columns={{ sm: 2, lg: 3 }} gap={6} className="w-full">
                   <Card><Card.Body><p>Item 1</p></Card.Body></Card>
                   <Card><Card.Body><p>Item 2</p></Card.Body></Card>
                   <Card><Card.Body><p>Item 3</p></Card.Body></Card>
                   <Card><Card.Body><p>Item 4</p></Card.Body></Card>
                   <Card><Card.Body><p>Item 5</p></Card.Body></Card>
                   <Card><Card.Body><p>Item 6</p></Card.Body></Card>
                </Grid>
            </ComponentPreview>
            <CodeBlock code={gridCode} />
            <div className="mt-8"><PropsTable data={gridProps} /></div>
        </SubSection>
    </SectionContainer>
);
