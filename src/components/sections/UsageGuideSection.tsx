// FILE: components/sections/UsageGuideSection.tsx
import React from 'react';
import { SectionContainer, SubSection, Button } from '../Content.tsx';
import { Icon } from '../icons.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';

export const UsageGuideSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => (
    <SectionContainer id={id}>
        <Breadcrumb group={groupTitle} section={sectionTitle} />
        <h2 className="section-title">Acutrack Design_System</h2>
        <p className="section-subtitle">A Complete Guide to Usage and Best Practices.</p>

        <main className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings:text-text-primary dark:prose-headings:text-dark-text-primary prose-a:text-brand-orange hover:prose-a:text-brand-orange-hover">
            
            <section id="introduction">
                <h3>Introduction</h3>
                <p>Welcome to the Acutrack Design System documentation. This guide serves as the central resource for designers and developers, providing everything you need to build consistent, high-quality, and scalable user interfaces. Its purpose is to accelerate our development process by providing a shared language and a reusable library of components.</p>
            </section>
            
            <hr className="my-12 border-border-color dark:border-dark-border-color"/>

            <section id="core-concepts">
                <h3>Core Concepts</h3>
                <p>To use the system effectively, it's essential to understand its foundational principles.</p>
                
                <h4>Technology Stack</h4>
                <ul>
                    <li><strong>React & TypeScript:</strong> All components are built as React functional components with strict TypeScript typings for robustness and a great developer experience.</li>
                    <li><strong>Tailwind CSS:</strong> All styling is handled via utility classes. There are no traditional CSS files. This ensures all styles are derived from a central configuration.</li>
                </ul>

                <h4>The Utility-First Philosophy</h4>
                <p>The most important concept to grasp is that this system is <strong>utility-first</strong>. Instead of pre-built style variants like <code>button-danger</code>, you compose styles using utility classes. This provides maximum flexibility while still adhering to the system's constraints.</p>
                <div className="p-4 rounded-lg bg-bg-secondary dark:bg-dark-bg-secondary border border-border-color dark:border-dark-border-color not-prose text-sm">
                    <pre><code className="font-mono text-text-secondary dark:text-dark-text-secondary">{'<div class="bg-brand-navy p-4 rounded-lg">...</div>'}</code></pre>
                    <p className="mt-2">Here, <code>bg-brand-navy</code> and <code>p-4</code> are not arbitrary values; they are <strong>design tokens</strong> that map to specific brand colors and spacing units defined in the system's configuration.</p>
                </div>
            </section>
            
            <hr className="my-12 border-border-color dark:border-dark-border-color"/>
            
            <section id="workflow">
                <h3>The Developer Workflow</h3>
                <p>Here is a step-by-step guide on how to find, use, and customize a component from the design system documentation app.</p>
                
                <div className="space-y-8 not-prose">
                    <div className="flex items-start gap-6 p-6 rounded-lg bg-bg-secondary dark:bg-dark-bg-secondary border border-border-color dark:border-dark-border-color">
                        <span className="text-4xl font-heading text-brand-orange">1</span>
                        <div>
                            <h4 className="font-bold text-lg text-text-primary dark:text-dark-text-primary">Find a Component</h4>
                            <p className="text-text-secondary dark:text-dark-text-secondary">Use the sidebar navigation to find the component you need. For example, to find the button component, navigate to <strong>Forms → Buttons</strong>. The page will automatically scroll to the correct section.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-6 p-6 rounded-lg bg-bg-secondary dark:bg-dark-bg-secondary border border-border-color dark:border-dark-border-color">
                        <span className="text-4xl font-heading text-brand-orange">2</span>
                        <div>
                            <h4 className="font-bold text-lg text-text-primary dark:text-dark-text-primary">Use the Interactive Workbench</h4>
                            <p className="text-text-secondary dark:text-dark-text-secondary">Most component pages feature an "Interactive Workbench." Use the controls to configure the component's props (like <code>variant</code>, <code>size</code>, or <code>disabled</code>) and see a live preview of the component update in real-time.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-6 p-6 rounded-lg bg-bg-secondary dark:bg-dark-bg-secondary border border-border-color dark:border-dark-border-color">
                        <span className="text-4xl font-heading text-brand-orange">3</span>
                        <div>
                            <h4 className="font-bold text-lg text-text-primary dark:text-dark-text-primary">Copy the Code Snippet</h4>
                            <p className="text-text-secondary dark:text-dark-text-secondary">As you configure the component in the workbench, the code snippet below it updates automatically. This generated snippet shows the exact JSX needed to render the component with your selected props. Use the copy button to grab the code.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-6 p-6 rounded-lg bg-bg-secondary dark:bg-dark-bg-secondary border border-border-color dark:border-dark-border-color">
                        <span className="text-4xl font-heading text-brand-orange">4</span>
                        <div>
                            <h4 className="font-bold text-lg text-text-primary dark:text-dark-text-primary">Customize Responsibly</h4>
                            <p className="text-text-secondary dark:text-dark-text-secondary">Once you have the code, follow these critical do's and don'ts to ensure your implementation is consistent and maintainable. This is the key to leveraging the power of the design system.</p>
                            <div className="mt-4 text-sm space-y-4">
                               <div className="flex items-start gap-3 p-3 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                                    <Icon className="text-system-success mt-0.5">check_circle</Icon>
                                    <div>
                                        <p className="font-bold text-green-800 dark:text-green-300">DO use props to control variants.</p>
                                        <pre className="mt-1"><code className="font-mono text-green-700 dark:text-green-400">{'<Button variant="secondary" size="sm">Click</Button>'}</code></pre>
                                    </div>
                               </div>
                               <div className="flex items-start gap-3 p-3 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                                    <Icon className="text-system-success mt-0.5">check_circle</Icon>
                                    <div>
                                        <p className="font-bold text-green-800 dark:text-green-300">DO use `className` for layout adjustments.</p>
                                        <pre className="mt-1"><code className="font-mono text-green-700 dark:text-green-400">{'<Button className="mt-4">Click</Button>'}</code></pre>
                                    </div>
                               </div>
                               <div className="flex items-start gap-3 p-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                                    <Icon className="text-system-error mt-0.5">cancel</Icon>
                                    <div>
                                        <p className="font-bold text-red-800 dark:text-red-300">DON'T use inline styles.</p>
                                        <pre className="mt-1"><code className="font-mono text-red-700 dark:text-red-400 line-through">{'<Button style={{ color: "blue" }}>Click</Button>'}</code></pre>
                                    </div>
                               </div>
                               <div className="flex items-start gap-3 p-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                                    <Icon className="text-system-error mt-0.5">cancel</Icon>
                                    <div>
                                        <p className="font-bold text-red-800 dark:text-red-300">DON'T use arbitrary values.</p>
                                        <pre className="mt-1"><code className="font-mono text-red-700 dark:text-red-400 line-through">{'<Button className="p-[17px]">Click</Button>'}</code></pre>
                                    </div>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <hr className="my-12 border-border-color dark:border-dark-border-color"/>

            <section id="contributing">
                <h3>Contribution & Support</h3>
                <p>The design system is a living product that evolves with our needs. Your feedback and contributions are vital. For bug reports or feature requests, please refer to the "FAQ" section in the main documentation application for guidance on how to submit an issue.
                For a complete reference of best practices, see the "Do's & Don'ts" guide.</p>
            </section>
        </main>
    </SectionContainer>
);