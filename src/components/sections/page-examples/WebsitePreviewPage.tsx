// FILE: components/sections/page-examples/WebsitePreviewPage.tsx
// This section demonstrates a full website homepage layout.

import React from 'react';
import { SectionContainer, Card, Button } from '../../Content.tsx';
import { Dropdown } from '../../Dropdown.tsx';
import { Icon } from '../../icons.tsx';
import { PageExampleFrame } from './PageExampleFrame.tsx';

// --- Reusable Child Components for the page ---

// Header component with Mega Menus
const Header: React.FC = () => {
    const solutionsMenuItems = [
        { icon: 'book', title: 'Book Fulfillment', description: 'Print-on-demand, storage, and distribution.' },
        { icon: 'play_circle', title: 'Media Manufacturing', description: 'High-quality CD, DVD, and USB duplication.' },
        { icon: 'storefront', title: 'E-Commerce', description: 'Automated product fulfillment for online stores.' },
    ];
    const resourcesMenuItems = [
        { icon: 'article', title: 'Blog' },
        { icon: 'collections_bookmark', title: 'Case Studies' },
        { icon: 'support_agent', title: 'Support Center' },
    ];
    const integrationsMenuItems = [
        { platform: 'Shopify', iconUrl: 'https://cdn.worldvectorlogo.com/logos/shopify.svg' },
        { platform: 'WooCommerce', iconUrl: 'https://cdn.worldvectorlogo.com/logos/woocommerce.svg' },
        { platform: 'Amazon', iconUrl: 'https://cdn.worldvectorlogo.com/logos/amazon-2.svg' },
        { platform: 'BigCommerce', iconUrl: 'https://cdn.worldvectorlogo.com/logos/bigcommerce-1.svg' },
        { platform: 'Squarespace', iconUrl: 'https://cdn.worldvectorlogo.com/logos/squarespace-2.svg' },
        { platform: 'Etsy', iconUrl: 'https://cdn.worldvectorlogo.com/logos/etsy.svg' },
    ];

    return (
        <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-dark-bg-primary/80 backdrop-blur-sm border-b border-border-color dark:border-dark-border-color">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <h1 className="text-2xl font-bold font-heading">
                            <span className="text-brand-navy dark:text-white">Acutrack</span>
                        </h1>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                         <Dropdown>
                            <Dropdown.Trigger>
                                <Button variant="text" size="md" rightIcon={<Icon>expand_more</Icon>} className="!font-bold">Services</Button>
                            </Dropdown.Trigger>
                            <Dropdown.Content className="!w-[90vw] !max-w-4xl !p-8">
                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8">
                                    <div className="flex flex-col gap-6">
                                        <h4 className="font-bold text-text-primary dark:text-dark-text-primary border-b border-border-color dark:border-dark-border-color pb-2">Core Services</h4>
                                        {solutionsMenuItems.map(item => (
                                            <a key={item.title} href="#" className="block p-3 -m-3 rounded-lg hover:bg-bg-tertiary dark:hover:bg-dark-bg-tertiary">
                                                <div className="flex items-start gap-4">
                                                    <Icon className="w-6 h-6 text-brand-orange shrink-0 mt-1">{item.icon}</Icon>
                                                    <div>
                                                        <p className="font-bold text-text-primary dark:text-dark-text-primary">{item.title}</p>
                                                        <p className="text-sm">{item.description}</p>
                                                    </div>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                    <div className="flex flex-col gap-6">
                                        <h4 className="font-bold text-text-primary dark:text-dark-text-primary border-b border-border-color dark:border-dark-border-color pb-2">Resources</h4>
                                        {resourcesMenuItems.map(item => (
                                             <a key={item.title} href="#" className="flex items-center gap-3 p-2 -m-2 rounded-lg hover:bg-bg-tertiary dark:hover:bg-dark-bg-tertiary font-medium text-text-secondary hover:text-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary">
                                                <Icon className="w-5 h-5">{item.icon}</Icon> {item.title}
                                            </a>
                                        ))}
                                    </div>
                                    <div className="md:col-span-1">
                                        <div className="h-full rounded-lg bg-cover bg-center p-6 flex flex-col justify-end text-white" style={{backgroundImage: "url('https://picsum.photos/seed/business/600/800')"}}>
                                            <div className="bg-black/50 p-4 rounded-md backdrop-blur-sm">
                                                <h4 className="font-bold text-lg">Ready to Scale?</h4>
                                                <p className="text-sm mt-1 mb-4">Let our fulfillment experts build a custom solution.</p>
                                                <Button variant="primary" size="sm" className="w-full">Get a Quote</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dropdown.Content>
                        </Dropdown>

                        <Dropdown>
                             <Dropdown.Trigger>
                                <Button variant="text" size="md" rightIcon={<Icon>expand_more</Icon>} className="!font-bold">Integrations</Button>
                            </Dropdown.Trigger>
                            <Dropdown.Content className="!w-[32rem] !p-6">
                                <div className="grid grid-cols-2 gap-4">
                                    {integrationsMenuItems.map(item => (
                                        <a key={item.platform} href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-bg-tertiary dark:hover:bg-dark-bg-tertiary">
                                            <img src={item.iconUrl} alt={`${item.platform} logo`} className="h-6 w-6 object-contain" />
                                            <span className="font-semibold text-text-secondary dark:text-dark-text-secondary">{item.platform}</span>
                                        </a>
                                    ))}
                                </div>
                            </Dropdown.Content>
                        </Dropdown>
                        
                        <Button variant="text" size="md" className="!font-bold">Pricing</Button>
                        <Button variant="text" size="md" className="!font-bold">About Us</Button>
                    </nav>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-2">
                        <Button variant="text" size="md" className="!font-bold">Log In</Button>
                        <Button variant="primary" size="md">Get Started</Button>
                    </div>

                     {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button variant="text"><Icon>menu</Icon></Button>
                    </div>
                </div>
            </div>
        </header>
    );
};

// Footer Component
const Footer: React.FC = () => (
    <footer className="bg-brand-navy text-white/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                <div className="col-span-2 lg:col-span-1">
                    <h2 className="text-2xl font-bold font-heading text-white">Acutrack</h2>
                    <p className="text-sm mt-2 opacity-80">Technology-driven printing and fulfillment services.</p>
                </div>
                <div className="space-y-4">
                    <h3 className="font-bold text-sm uppercase tracking-wider text-white">Services</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white hover:underline">Book Fulfillment</a></li>
                        <li><a href="#" className="hover:text-white hover:underline">Media Mfg</a></li>
                        <li><a href="#" className="hover:text-white hover:underline">E-Commerce</a></li>
                    </ul>
                </div>
                 <div className="space-y-4">
                    <h3 className="font-bold text-sm uppercase tracking-wider text-white">Resources</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white hover:underline">Blog</a></li>
                        <li><a href="#" className="hover:text-white hover:underline">Case Studies</a></li>
                        <li><a href="#" className="hover:text-white hover:underline">Support</a></li>
                    </ul>
                </div>
                 <div className="space-y-4">
                    <h3 className="font-bold text-sm uppercase tracking-wider text-white">Company</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white hover:underline">About Us</a></li>
                        <li><a href="#" className="hover:text-white hover:underline">Careers</a></li>
                        <li><a href="#" className="hover:text-white hover:underline">Contact</a></li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} Acutrack, Inc. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

// Main Page Component
export const WebsitePreviewPage: React.FC<{ id: string; }> = ({ id }) => {
    return (
        <SectionContainer id={id}>
            <PageExampleFrame title="https://www.acutrack.com">
                <div className="bg-bg-secondary dark:bg-dark-bg-secondary w-full">
                    <Header />
                    <main>
                        {/* Hero Section */}
                         <div className="relative bg-brand-navy text-white overflow-hidden">
                            <div 
                                className="absolute inset-0 bg-cover bg-center opacity-20"
                                style={{ backgroundImage: "url('https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }} 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-brand-navy/40" />
                            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-20 text-center">
                                <h1 className="font-heading text-5xl md:text-6xl text-white">
                                    Print, Fulfill, and Ship. <br />
                                    <span className="text-brand-orange dark:text-dark-brand-orange">All-in-One.</span>
                                </h1>
                                <p className="mt-6 max-w-2xl mx-auto text-lg text-white/90">
                                    Acutrack is your technology-driven partner for book printing, media manufacturing, and global e-commerce fulfillment. Automate your logistics and focus on growing your business.
                                </p>
                                <div className="mt-8 flex justify-center gap-4">
                                    <Button variant="primary" size="lg">Get a Free Quote</Button>
                                    <Button variant="secondary" size="lg" rightIcon={<Icon>arrow_forward</Icon>}>Explore Services</Button>
                                </div>
                            </div>
                        </div>

                         {/* Services Section */}
                        <div className="py-20">
                            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                                 <div className="text-center mb-12">
                                    <h2 className="font-heading text-4xl text-text-primary dark:text-dark-text-primary">Our Core Offerings</h2>
                                    <p className="mt-4 max-w-2xl mx-auto text-text-secondary dark:text-dark-text-secondary">
                                        From authors to entrepreneurs, we provide the tools to bring your products to the world.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <Card>
                                        <Card.Image src="https://images.pexels.com/photos/3847614/pexels-photo-3847614.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Stack of books" />
                                        <Card.Body>
                                            <h3 className="font-bold font-heading text-text-primary dark:text-dark-text-primary">Book Fulfillment</h3>
                                            <p className="mt-2 text-sm">Flexible, high-quality book printing and global distribution. A modern alternative to traditional print-on-demand.</p>
                                        </Card.Body>
                                    </Card>
                                    <Card featured>
                                         <Card.Image src="https://images.pexels.com/photos/159711/books-bookstore-book-stack-literature-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Boxes ready for shipping" />
                                        <Card.Body>
                                            <h3 className="font-bold font-heading text-text-primary dark:text-dark-text-primary">E-Commerce Fulfillment</h3>
                                            <p className="mt-2 text-sm">Seamlessly integrate with Shopify, Amazon, and more to automate your order fulfillment and shipping process.</p>
                                        </Card.Body>
                                    </Card>
                                    <Card>
                                         <Card.Image src="https://images.pexels.com/photos/265147/pexels-photo-265147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="CDs and DVDs" />
                                        <Card.Body>
                                            <h3 className="font-bold font-heading text-text-primary dark:text-dark-text-primary">Media Manufacturing</h3>
                                            <p className="mt-2 text-sm">Reliable duplication and packaging services for DVDs, Blu-ray discs, CDs, and USB drives.</p>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
            </PageExampleFrame>
        </SectionContainer>
    );
};