// FILE: components/sections/MegaMenuSection.tsx
// This section demonstrates the large, multi-column Mega Menu component.

import React from 'react';
import { SectionContainer, ComponentPreview, Button } from '../Content.tsx';
import { Icon } from '../icons.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';
import { Dropdown } from '../Dropdown.tsx';

export const MegaMenuSection: React.FC<{ groupTitle: string; sectionTitle: string; }> = ({ groupTitle, sectionTitle }) => (
    <SectionContainer id="mega-menu">
        <Breadcrumb group={groupTitle} section={sectionTitle} />
        <h2 className="section-title">Mega Menu</h2>
        <p className="section-subtitle">
            A large, multi-column dropdown panel for displaying a rich set of navigation links and content. It's ideal for guiding users through complex product offerings or site structures.
        </p>
        <ComponentPreview className="min-h-96 flex items-start justify-center pt-8 bg-bg-tertiary dark:bg-dark-bg-primary">
             <Dropdown>
                <Dropdown.Trigger>
                    <Button size="md" rightIcon={<Icon className="transition-transform data-[state=open]:rotate-180">expand_more</Icon>}>
                        Solutions
                    </Button>
                </Dropdown.Trigger>
                <Dropdown.Content className="!w-[90vw] !max-w-4xl !p-8 !py-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8">
                        {/* Column 1: Core Services */}
                        <div className="flex flex-col gap-6">
                            <h4 className="font-bold text-text-primary dark:text-dark-text-primary border-b border-border-color dark:border-dark-border-color pb-2">Core Services</h4>
                            <a href="#" className="block p-3 -m-3 rounded-lg hover:bg-bg-primary dark:hover:bg-dark-bg-tertiary">
                                <div className="flex items-start gap-4">
                                    <Icon className="w-6 h-6 text-brand-orange shrink-0 mt-1">book</Icon>
                                    <div>
                                        <p className="font-bold text-text-primary dark:text-dark-text-primary">Book Fulfillment</p>
                                        <p className="text-sm">Print-on-demand, storage, and distribution for authors.</p>
                                    </div>
                                </div>
                            </a>
                             <a href="#" className="block p-3 -m-3 rounded-lg hover:bg-bg-primary dark:hover:bg-dark-bg-tertiary">
                                <div className="flex items-start gap-4">
                                    <Icon className="w-6 h-6 text-brand-orange shrink-0 mt-1">play_circle</Icon>
                                    <div>
                                        <p className="font-bold text-text-primary dark:text-dark-text-primary">Media Manufacturing</p>
                                        <p className="text-sm">High-quality CD, DVD, and USB duplication services.</p>
                                    </div>
                                </div>
                            </a>
                             <a href="#" className="block p-3 -m-3 rounded-lg hover:bg-bg-primary dark:hover:bg-dark-bg-tertiary">
                                <div className="flex items-start gap-4">
                                    <Icon className="w-6 h-6 text-brand-orange shrink-0 mt-1">storefront</Icon>
                                    <div>
                                        <p className="font-bold text-text-primary dark:text-dark-text-primary">E-Commerce</p>
                                        <p className="text-sm">Automated product fulfillment for online stores.</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        {/* Column 2: Resources */}
                        <div className="flex flex-col gap-6">
                            <h4 className="font-bold text-text-primary dark:text-dark-text-primary border-b border-border-color dark:border-dark-border-color pb-2">Resources</h4>
                            <a href="#" className="flex items-center gap-3 p-2 -m-2 rounded-lg hover:bg-bg-primary dark:hover:bg-dark-bg-tertiary font-medium text-text-secondary hover:text-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary">
                                <Icon className="w-5 h-5">article</Icon> Blog
                            </a>
                            <a href="#" className="flex items-center gap-3 p-2 -m-2 rounded-lg hover:bg-bg-primary dark:hover:bg-dark-bg-tertiary font-medium text-text-secondary hover:text-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary">
                                <Icon className="w-5 h-5">article</Icon> Case Studies
                            </a>
                            <a href="#" className="flex items-center gap-3 p-2 -m-2 rounded-lg hover:bg-bg-primary dark:hover:bg-dark-bg-tertiary font-medium text-text-secondary hover:text-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary">
                                <Icon className="w-5 h-5">support_agent</Icon> Support Center
                            </a>
                        </div>
                        {/* Column 3: Featured CTA */}
                        <div className="md:col-span-1">
                             <div className="h-full rounded-lg bg-cover bg-center p-6 flex flex-col justify-end text-white" style={{backgroundImage: "url('https://picsum.photos/seed/business/600/800')"}}>
                                <div className="bg-black/50 p-4 rounded-md backdrop-blur-sm">
                                    <h4 className="font-bold text-lg">Ready to Scale?</h4>
                                    <p className="text-sm mt-1 mb-4">Let our fulfillment experts build a custom solution for your business.</p>
                                    <button className="w-full px-4 py-2 text-sm font-bold rounded-md bg-brand-orange text-text-on-accent hover:bg-brand-orange-hover transition-colors">
                                        Get a Quote
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dropdown.Content>
            </Dropdown>
        </ComponentPreview>
    </SectionContainer>
);