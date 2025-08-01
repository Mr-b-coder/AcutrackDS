// FILE: components/sections/DesignerGuidelinesSection.tsx
// This section provides a high-level guide for designers using the system.

import React from 'react';
import { SectionContainer, SubSection, Button } from '../Content.tsx';
import { Icon } from '../icons.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';

export const DesignerGuidelinesSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => (
    <SectionContainer id={id}>
        <Breadcrumb group={groupTitle} section={sectionTitle} />
        <h2 className="section-title">Designer Guidelines</h2>
        <p className="section-subtitle">This guide provides designers with the core principles and best practices for using the Acutrack Design System. Following these guidelines will ensure our products remain consistent, accessible, and aligned with our brand identity.</p>
        
        <SubSection title="Design Assets">
            <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                The official Figma library is the single source of truth for all design components and styles. Use it as the starting point for all new designs.
            </p>
             <div className="not-prose">
                <Button as="a" href="#" target="_blank" variant="primary" size="lg" leftIcon={<Icon>design_services</Icon>}>
                    Open Figma Library
                </Button>
            </div>
        </SubSection>

        <SubSection title="Using the Color Palette">
            <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary dark:text-dark-text-secondary">
                <p>Color is used intentionally to create hierarchy and communicate meaning. Refer to the <a href="#colors">Colors section</a> for the full palette.</p>
                <ul>
                    <li><strong>Brand Colors (`brand-navy`, `brand-orange`):</strong> Use these for major branding moments like sidebars and primary calls-to-action. `brand-orange` should be used sparingly to draw attention to the most important action on a page.</li>
                    <li><strong>UI Colors (`bg-primary`, `text-secondary`, etc.):</strong> These semantic tokens should be used for all standard interface elements. They automatically adapt for light and dark modes.</li>
                    <li><strong>System Colors (`system-success`, `system-error`, etc.):</strong> Use these exclusively for feedback like alerts and validation messages. Do not use them for decoration.</li>
                </ul>
            </div>
        </SubSection>

        <SubSection title="Component Choice">
            <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                Choosing the right component is key to an intuitive user experience.
            </p>
            <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary dark:text-dark-text-secondary">
                <ul>
                    <li><strong>Button vs. Link:</strong> Use a Button for an *action* (e.g., "Save", "Submit", "Delete"). Use a Link for *navigation* (to go to another page).</li>
                    <li><strong>Modal vs. Alert:</strong> Use a Modal to interrupt the user's workflow and require an action (e.g., confirming a deletion). Use an Alert to display a persistent, non-interruptive message.</li>
                    <li><strong>Primary vs. Secondary Button:</strong> A screen should only have one primary Button to guide the user to the main intended action. Use secondary buttons for less important, alternative actions.</li>
                </ul>
            </div>
        </SubSection>
        
        <SubSection title="Layout & Responsiveness">
             <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                A consistent layout creates a predictable and harmonious experience.
            </p>
            <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary dark:text-dark-text-secondary">
                <ul>
                    <li><strong>8-Point Grid:</strong> All spacing (padding, margins, gaps) should be multiples of 8px. This ensures a consistent rhythm throughout the UI. See the <a href="#layout">Layout section</a> for details.</li>
                    <li><strong>Breakpoints:</strong> Design for mobile first, then use our standard breakpoints (`sm`, `md`, `lg`, `xl`) to adapt the layout for larger screens.</li>
                    <li><strong>Page Container:</strong> Main page content should be placed within a container with a maximum width to ensure readability on large screens.</li>
                </ul>
            </div>
        </SubSection>

         <SubSection title="Accessibility (A11y)">
            <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                We design for everyone. Accessibility is not an afterthought.
            </p>
            <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary dark:text-dark-text-secondary">
                <ul>
                    <li><strong>Color Contrast:</strong> Ensure that text has sufficient contrast against its background. The target is a minimum of 4.5:1 for normal text (WCAG AA).</li>
                    <li><strong>Focus States:</strong> All interactive elements must have a clear, visible focus state to allow for keyboard navigation. Our components have this built-in.</li>
                    <li><strong>Labels:</strong> All form inputs must have clear, visible labels. Icon-only buttons must have an accessible name (e.g., an `aria-label`).</li>
                </ul>
            </div>
        </SubSection>
    </SectionContainer>
);