// FILE: components/sections/TypographySection.tsx
// This section demonstrates the typographic scale and font usage.

import React from 'react';
import { SectionContainer, SubSection, ComponentPreview } from '../Content.tsx';
import { useCopyToClipboard, Icon } from '../icons.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';
import CodeBlock from '../CodeBlock.tsx';

// Data for headings
const headingStyles = [
    { level: 'H1', class: 'text-5xl font-extrabold', size: '3rem (48px)' },
    { level: 'H2', class: 'text-4xl font-bold', size: '2.25rem (36px)' },
    { level: 'H3', class: 'text-3xl font-bold', size: '1.875rem (30px)' },
    { level: 'H4', class: 'text-2xl font-bold', size: '1.5rem (24px)' },
    { level: 'H5', class: 'text-xl font-bold', size: '1.25rem (20px)' },
    { level: 'H6', class: 'text-lg font-bold', size: '1.125rem (18px)' },
];

const HeadingSpecimen: React.FC<{ level: string, className: string, size: string }> = ({ level, className, size }) => {
    const [copy, isCopied] = useCopyToClipboard();
    const fullClass = `font-heading ${className}`;
    
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 border-b border-border-color dark:border-dark-border-color last:border-b-0">
            <p className={`${fullClass} text-text-primary dark:text-dark-text-primary`}>{level} Heading</p>
            <div className="flex items-center gap-4 mt-2 sm:mt-0">
                <span className="font-mono text-sm text-text-secondary dark:text-dark-text-secondary w-32">{size}</span>
                <button 
                    onClick={() => copy(fullClass)} 
                    className="flex items-center gap-2 text-xs font-bold text-brand-orange hover:text-brand-orange-hover dark:hover:text-dark-brand-orange-hover"
                >
                    {isCopied ? <><Icon className="!text-base">check</Icon> Copied</> : <><Icon className="!text-base">content_copy</Icon> Copy Class</>}
                </button>
            </div>
        </div>
    );
};

const proseExampleCode = `<div class="prose dark:prose-invert">
    <h2>Content Styling</h2>
    <p>
        The Inter font is used for all body copy to ensure maximum clarity and readability. 
        When you wrap long-form text content in a div with the 'prose' class...
    </p>
    <ul>
        <li>Styling for lists is handled automatically.</li>
        <li>As is styling for <a href="#">links and other elements</a>.</li>
        <li>This creates a beautiful and consistent reading experience.</li>
    </ul>
</div>`;

export const TypographySection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => (
    <SectionContainer id={id}>
        <Breadcrumb group={groupTitle} section={sectionTitle} />
        <h2 className="section-title">Typography</h2>
        <p className="section-subtitle">
            Our type system is built on a clear hierarchy to guide the user's eye and create a readable, elegant interface. We use two font families: <strong>Raleway</strong> for impactful headings and <strong>Inter</strong> for clear, legible body text. Both are available via Google Fonts and can be downloaded here: <a href="https://fonts.google.com/specimen/Raleway" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-orange hover:underline dark:text-dark-brand-orange dark:hover:text-dark-brand-orange-hover">Raleway</a> & <a href="https://fonts.google.com/specimen/Inter" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-orange hover:underline dark:text-dark-brand-orange dark:hover:text-dark-brand-orange-hover">Inter</a>.
        </p>

        <SubSection title="Headings (Raleway)">
            <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                Headings use the 'Raleway' font family. Use these classes to establish a strong visual hierarchy on your page.
            </p>
            <ComponentPreview className="!p-0 !bg-transparent !border-none">
                <div className="rounded-lg border border-border-color dark:border-dark-border-color bg-bg-secondary dark:bg-dark-bg-secondary px-4">
                    {headingStyles.map(style => <HeadingSpecimen key={style.level} level={style.level} className={style.class} size={style.size} />)}
                </div>
            </ComponentPreview>
        </SubSection>

        <SubSection title="Body & Paragraph Styles (Inter)">
             <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                For long-form content like articles or documentation, use the <code>prose</code> class from the Tailwind Typography plugin. This automatically applies beautiful styling to paragraphs, lists, links, and more.
            </p>
            <ComponentPreview>
                <div className="prose dark:prose-invert max-w-none text-text-secondary dark:text-dark-text-secondary prose-headings:text-text-primary dark:prose-headings:text-dark-text-primary prose-a:text-brand-orange hover:prose-a:text-brand-orange-hover dark:prose-a:text-dark-brand-orange dark:hover:prose-a:text-dark-brand-orange-hover prose-strong:text-text-primary dark:prose-strong:text-dark-text-primary">
                    <h2>Content Styling with Prose</h2>
                    <p>
                        The <strong>Inter</strong> font is used for all body copy to ensure maximum clarity and readability. 
                        When you wrap long-form text content in a div with the 'prose' class, you get elegant styling for all standard HTML text elements out of the box.
                    </p>
                    <ul>
                        <li>Styling for unordered lists is handled automatically.</li>
                        <li>As is styling for <a href="#typography">links and other elements</a>.</li>
                        <li>This creates a beautiful and consistent reading experience with minimal effort.</li>
                    </ul>
                    <p>This approach is perfect for blog posts, documentation, or any text-heavy page.</p>
                </div>
            </ComponentPreview>
            <CodeBlock code={proseExampleCode} />
        </SubSection>

        <SubSection title="Usage Guidelines">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <Icon className="!text-2xl text-system-success mt-1 shrink-0">check_circle</Icon>
                        <div>
                            <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Maintain Hierarchy</h4>
                            <p className="text-sm">Use heading levels (`H1` through `H6`) semantically. A page should have only one `H1`, and heading levels should not be skipped (e.g., an `H3` should not directly follow an `H1`).</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <Icon className="!text-2xl text-system-success mt-1 shrink-0">check_circle</Icon>
                        <div>
                            <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Use `prose` for Content</h4>
                            <p className="text-sm">For blocks of long-form text, always wrap the content in a `div` with the `prose` class to ensure consistent styling for paragraphs, lists, and links.</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <Icon className="!text-2xl text-system-error mt-1 shrink-0">cancel</Icon>
                        <div>
                            <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Don't Use Heading Fonts for Body</h4>
                            <p className="text-sm">Never use the `font-heading` (Raleway) for paragraphs or long-form text. It is designed for impact, not for readability at small sizes.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Icon className="!text-2xl text-system-error mt-1 shrink-0">cancel</Icon>
                        <div>
                            <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Avoid Overly Long Lines</h4>
                            <p className="text-sm">For optimal readability, text lines should not exceed 70-80 characters. Use containers with a `max-w` utility to constrain text width.</p>
                        </div>
                    </div>
                </div>
            </div>
        </SubSection>
    </SectionContainer>
);