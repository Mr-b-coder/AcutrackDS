// FILE: components/sections/FAQSection.tsx
// This section provides answers to frequently asked questions about the design system.

import React from 'react';
import { SectionContainer, SubSection, Accordion } from '../Content.tsx';
import { Icon } from '../icons.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';

export const FAQSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => (
    <SectionContainer id={id}>
        <Breadcrumb group={groupTitle} section={sectionTitle} />
        <h2 className="section-title">FAQ & Troubleshooting</h2>
        <p className="section-subtitle">
            Find answers to common questions about using and contributing to the Acutrack Design System.
        </p>

        <SubSection title="Frequently Asked Questions">
            <div className="space-y-4 not-prose max-w-4xl mx-auto">
                <Accordion title="How do I install this design system in my project?">
                    <p>
                        Currently, this design system is tightly integrated with this documentation application and is not published as a standalone installable package (e.g., on npm).
                    </p>
                    <p>
                        To use the components, you can copy the code directly from the component sections and their corresponding code blocks. The technology stack (React, TypeScript, Tailwind CSS) is standard, making the code portable to any modern React project with a similar setup.
                    </p>
                </Accordion>
                 <Accordion title="How is the system versioned and how are breaking changes handled?">
                    <p>
                        While not yet formally versioned as a package, we follow Semantic Versioning (SemVer) principles internally.
                    </p>
                    <ul>
                        <li><strong>Major Changes (Breaking):</strong> Changes to a component's API that are not backward-compatible (e.g., renaming a required prop). These are rare and will be communicated widely with a migration guide.</li>
                        <li><strong>Minor Changes (Features):</strong> Adding new components or new, non-breaking features to existing components (e.g., a new optional prop).</li>
                        <li><strong>Patches (Bugs):</strong> Backward-compatible bug fixes.</li>
                    </ul>
                    <p>
                        Our goal is to make updates as painless as possible. Always check the changelog when a new version is announced.
                    </p>
                </Accordion>
                 <Accordion title="What browsers are officially supported?">
                    <p>The Acutrack Design System officially supports the latest two stable versions of the following browsers:</p>
                    <ul>
                        <li>Google Chrome</li>
                        <li>Mozilla Firefox</li>
                        <li>Microsoft Edge</li>
                        <li>Apple Safari</li>
                    </ul>
                    <p>
                        The system does not support Internet Explorer 11. While components may function in other browsers, we do not actively test or provide bug fixes for them.
                    </p>
                </Accordion>
                <Accordion title="I need an icon that isn't in the library. What should I do?">
                    <p>
                        First, check the official <a href="https://fonts.google.com/icons" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">Google Material Symbols</a> library to see if a suitable icon exists. Our system is based on this library, and adding a new icon from it is trivial.
                    </p>
                    <p>
                        If no suitable icon exists, you can propose adding a custom SVG icon to the system by opening a feature request. In the meantime, for one-off cases, you can use an inline SVG within your project, but please consult with the design system team to ensure it aligns with our visual style.
                    </p>
                </Accordion>
                <Accordion title="How do I request a new component or a change to an existing one?">
                    <p>
                        To request a new component or suggest a change, please open an issue in our project's version control repository (e.g., GitHub, GitLab).
                        Provide a clear description of the problem, the proposed solution, and any relevant design mockups or use cases. This allows the team to review and prioritize the request.
                    </p>
                </Accordion>
                <Accordion title="What's the best way to report a bug in the design system?">
                    <p>
                        Similar to feature requests, bugs should be reported as issues in our repository. Please include:
                    </p>
                    <ul>
                        <li>A clear and concise title.</li>
                        <li>Steps to reproduce the bug.</li>
                        <li>The expected behavior.</li>
                        <li>The actual behavior, including screenshots or screen recordings if possible.</li>
                        <li>The browser and operating system where the bug occurred.</li>
                    </ul>
                </Accordion>
                <Accordion title="Can I override component styles?">
                    <p>
                        While it is possible to override styles by passing a <code>className</code> prop with Tailwind utility classes, this should be done sparingly. The goal of the design system is to maintain consistency.
                    </p>
                    <p>
                        If you find yourself frequently needing to override styles, it might indicate that the component needs a new variant or prop. In such cases, please consider submitting a change request instead. For one-off layout adjustments (e.g., margins), overrides are acceptable.
                    </p>
                </Accordion>
                 <Accordion title="The documentation seems out of date. How can I help?">
                    <p>
                        We strive to keep documentation current, but we welcome contributions! If you notice an error or an outdated example, please feel free to open a pull request with the suggested fix. All documentation lives within the <code>/components/sections/</code> directory.
                    </p>
                </Accordion>
            </div>
        </SubSection>
    </SectionContainer>
);