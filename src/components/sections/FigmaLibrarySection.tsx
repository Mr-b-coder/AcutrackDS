// FILE: components/sections/FigmaLibrarySection.tsx
// This section provides a guide for designers to create a Figma library from the coded system.

import React from 'react';
import { SectionContainer, SubSection } from '../Content.tsx';
import { Icon } from '../icons.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';
import CodeBlock from '../CodeBlock.tsx';

const colorStylesRecipe = `
// Naming convention: group/name
// Example: brand/navy, ui/light/bg-primary

// --- Brand Colors ---
brand/navy: #1B3A7B
brand/orange: #35B0AB
brand/orange-hover: #2d8f8a

// --- UI Colors (Light) ---
ui/light/text-primary: #1B3A7B
ui/light/text-secondary: #3C4858
ui/light/bg-primary: #F6F8FD
ui/light/bg-secondary: #FFFFFF
// ...and so on for all UI colors

// --- UI Colors (Dark) ---
ui/dark/text-primary: #F6F8FD
ui/dark/text-secondary: #9CA3AF
// ...and so on for all dark UI colors

// --- System Colors ---
system/success: #22c55e
system/error: #ef4444
system/warning: #f59e0b
system/info: #3b82f6
`;

const textStylesRecipe = `
// Naming convention: type/level
// Example: heading/h1, body/paragraph

// --- Headings (Font: Raleway) ---
heading/h1: 48px, extrabold
heading/h2: 36px, bold
heading/h3: 30px, bold
heading/h4: 24px, bold
heading/h5: 20px, bold
heading/h6: 18px, bold

// --- Body (Font: Inter) ---
body/paragraph: 16px, regular
body/small: 14px, regular
`;

const buttonVariantsRecipe = `
1. Create the base button component using Auto Layout.
2. Turn it into a component.
3. Add the following variants:

// --- Properties & Values ---
Property 1: variant (primary, secondary, text)
Property 2: size (xs, sm, md, lg, xl)
Property 3: state (default, hover, active, focus, disabled)
Property 4: iconLeft (boolean: true/false)
Property 5: iconRight (boolean: true/false)

// --- Example Combination ---
- variant: primary, size: md, state: default, iconLeft: false, iconRight: false
- Apply 'brand/orange' color style to the fill.
- Apply 'ui/light/text-on-accent' to the text label.
- Set corner radius to 6px.

- variant: secondary, size: md, state: hover
- Apply 'brand/navy' to border stroke.
- Apply 'ui/light/bg-tertiary' to fill.
`;

export const FigmaLibrarySection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => (
    <SectionContainer id={id}>
        <Breadcrumb group={groupTitle} section={sectionTitle} />
        <h2 className="section-title">Building the Figma Library</h2>
        <p className="section-subtitle">
            This guide provides a step-by-step recipe for designers to translate the coded design system into a robust and accurate Figma library. Following these instructions will ensure a perfect 1:1 match between design and code.
        </p>

        <SubSection title="Step 1: Create Foundation Styles">
            <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                The first step is to define all the colors and fonts as reusable styles in Figma. This is the most critical step for maintaining consistency.
            </p>
            <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary dark:text-dark-text-secondary">
                <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Color Styles</h4>
                <p>In Figma, create a new Color Style for every color token in the system. Use a slash in the name (e.g., `brand/navy`) to group them into folders.</p>
                <CodeBlock code={colorStylesRecipe} />

                <h4 className="mt-8 font-bold text-text-primary dark:text-dark-text-primary">Text Styles</h4>
                <p>Next, create Text Styles for all the defined typographic elements. This ensures all text across your designs is consistent.</p>
                <CodeBlock code={textStylesRecipe} />
            </div>
        </SubSection>

        <SubSection title="Step 2: Build Components with Variants">
            <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                Build each UI element as a master component and use Figma's Variants feature to represent its different states and sizes. Use Auto Layout for everything to create flexible, responsive components.
            </p>
             <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary dark:text-dark-text-secondary">
                <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Recipe for a Button Component</h4>
                <p>The Button is a great first component to build. Here's how to set up its variants to match the coded component.</p>
                <CodeBlock code={buttonVariantsRecipe} />
                
                <h4 className="mt-8 font-bold text-text-primary dark:text-dark-text-primary">Recipe for a Card Component</h4>
                <p>For the Card component, use boolean properties for states like `featured` and `disabled`.</p>
                 <ul>
                    <li>Create the base card using Auto Layout.</li>
                    <li>Add Component Properties (in the right-hand panel):
                        <ul>
                           <li>Boolean property named `featured`. Set the value to `false`.</li>
                           <li>Boolean property named `disabled`. Set the value to `false`.</li>
                        </ul>
                    </li>
                    <li>Use layers to control visibility. For example, the `star` icon layer on the featured card should only be visible when the `featured` property is `true`.</li>
                 </ul>
            </div>
        </SubSection>

        <SubSection title="Step 3: Organize and Publish">
            <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                A clean library is a usable library.
            </p>
             <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary dark:text-dark-text-secondary">
                <ul>
                    <li><strong>Use Pages:</strong> Organize your Figma file with pages like "Cover", "Foundations", "Components", "Patterns", and "Icons".</li>
                    <li><strong>Add Descriptions:</strong> Add descriptions to your components and styles in Figma to explain their purpose, just like in this documentation.</li>
                    <li><strong>Publish:</strong> Once your library is ready, publish it so that other designers on your team can use it in their project files.</li>
                </ul>
            </div>
        </SubSection>
    </SectionContainer>
);