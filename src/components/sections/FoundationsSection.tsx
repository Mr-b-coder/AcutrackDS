

// FILE: components/sections/FoundationsSection.tsx
// This section outlines the core principles of the design system.

import React from 'react';
import { SectionContainer, CopiedFeedback, SubSection } from '../Content.tsx';
import { useCopyToClipboard, Icon } from '../icons.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';

const FontPhilosophyCard: React.FC<{ copyText: string; children: React.ReactNode }> = ({ copyText, children }) => {
    const [copy, isCopied] = useCopyToClipboard();
    return (
        <button 
            onClick={() => copy(copyText)} 
            className="relative w-full text-left p-6 bg-bg-secondary dark:bg-dark-bg-secondary rounded-lg border border-border-color dark:border-dark-border-color group hover:border-brand-orange transition-colors"
        >
            {children}
            {isCopied && (
                 <span className="absolute top-3 right-3 flex items-center gap-1 text-xs font-bold text-brand-orange">
                    <Icon className="!text-sm">check</Icon> Copied!
                 </span>
            )}
        </button>
    )
}

export const FoundationsSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => {
    const [copyBlue, isBlueCopied] = useCopyToClipboard();
    const [copyTeal, isTealCopied] = useCopyToClipboard();

    return (
        <SectionContainer id={id}>
            <Breadcrumb group={groupTitle} section={sectionTitle} />
            <h2 className="section-title">Foundations & Principles</h2>
            <p className="section-subtitle">The core values and visual identity that guide the Acutrack brand experience. This section covers our foundational principles, color psychology, and typographic philosophy. Click any color or font example to copy its value.</p>
            
            <SubSection title="Core Principles">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-bg-secondary dark:bg-dark-bg-secondary p-6 rounded-lg border border-border-color dark:border-dark-border-color">
                        <h3 className="font-bold font-heading text-text-primary dark:text-dark-text-primary">Cohesive</h3>
                        <p className="mt-2 text-sm">Every component feels like part of a unified family. Consistency in spacing, color, and interaction patterns creates a predictable and trustworthy user experience.</p>
                    </div>
                    <div className="bg-bg-secondary dark:bg-dark-bg-secondary p-6 rounded-lg border border-border-color dark:border-dark-border-color">
                        <h3 className="font-bold font-heading text-text-primary dark:text-dark-text-primary">Accessible</h3>
                        <p className="mt-2 text-sm">We design for everyone. Our components meet WCAG AA standards for color contrast and are built with semantic HTML and ARIA attributes for screen reader compatibility.</p>
                    </div>
                    <div className="bg-bg-secondary dark:bg-dark-bg-secondary p-6 rounded-lg border border-border-color dark:border-dark-border-color">
                        <h3 className="font-bold font-heading text-text-primary dark:text-dark-text-primary">Efficient</h3>
                        <p className="mt-2 text-sm">By providing reusable, well-documented components, we enable teams to build high-quality interfaces faster, reducing redundancy and focusing on solving user problems.</p>
                    </div>
                </div>
            </SubSection>
        </SectionContainer>
    );
};