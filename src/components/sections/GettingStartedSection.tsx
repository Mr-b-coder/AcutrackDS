// FILE: components/sections/GettingStartedSection.tsx
// This section provides a welcome message and developer-focused overview of the design system.

import React from 'react';
import { SectionContainer, SubSection, Card } from '../Content.tsx';
import { Icon } from '../icons.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';

const features = [
    {
        icon: 'widgets',
        title: 'Comprehensive Library',
        description: 'From basic buttons to complex data tables, everything you need is included.',
        href: '#buttons',
    },
    {
        icon: 'build_circle',
        title: 'Interactive Workbenches',
        description: 'Visually configure components and get production-ready code snippets instantly.',
        href: '#cards',
    },
    {
        icon: 'contrast',
        title: 'Theming & Dark Mode',
        description: 'All components support light and dark modes out of the box, powered by Tailwind CSS.',
        href: '#colors',
    },
    {
        icon: 'architecture',
        title: 'Application Patterns',
        description: 'Build complex UIs faster with pre-built patterns for layouts, settings pages, and wizards.',
        href: '#layoutpatterns',
    },
    {
        icon: 'monitoring',
        title: 'Data Visualization',
        description: 'A library of interactive charts including Bar, Line, Area, and Pie charts.',
        href: '#data-visualization',
    },
    {
        icon: 'accessibility_new',
        title: 'Accessibility First',
        description: 'Components are built with semantic HTML and ARIA attributes to be accessible to all users.',
        href: '#foundations',
    },
];

const FeatureCard: React.FC<{ icon: string; title: string; description: string; href: string; }> = ({ icon, title, description, href }) => (
    <Card as="a" href={href}>
        <Card.Body>
            <Icon className="text-brand-orange !text-4xl mb-4">{icon}</Icon>
            <h3 className="font-bold font-heading text-text-primary dark:text-dark-text-primary text-lg">{title}</h3>
            <p className="text-sm mt-2">{description}</p>
        </Card.Body>
    </Card>
);

export const GettingStartedSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => (
    <SectionContainer id={id}>
        <Breadcrumb group={groupTitle} section={sectionTitle} />
        <h2 className="section-title">Key Features</h2>
        <p className="section-subtitle">The Acutrack Design System is more than just a component library; it's a complete toolkit for building high-quality applications. Here are some of the key features that make it powerful and easy to use.</p>
        
        <SubSection title="System Highlights">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 not-prose">
                {features.map(feature => (
                    <FeatureCard key={feature.title} {...feature} />
                ))}
            </div>
        </SubSection>
    </SectionContainer>
);
