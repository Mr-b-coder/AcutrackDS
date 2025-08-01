// FILE: components/sections/NavigationSection.tsx
// This section documents navigation components like breadcrumbs, pagination, and tabs.

import React, { useState } from 'react';
import { SectionContainer, ComponentPreview, SubSection, PropsTable, Button, Pagination } from '../Content.tsx';
import { Icon } from '../icons.tsx';
import CodeBlock from '../CodeBlock.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';
import { PropDef } from '../../types.ts';

// --- Breadcrumbs Component ---
interface BreadcrumbItem {
  href?: string;
  label: string;
  icon?: string;
}

interface BreadcrumbTrailProps {
  items: BreadcrumbItem[];
  className?: string;
}

const BreadcrumbTrail: React.FC<BreadcrumbTrailProps> = ({ items, className = '' }) => (
    <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex items-center gap-2 text-sm overflow-x-auto custom-scrollbar py-1">
            {items.map((item, index) => (
                <li key={index} className="flex items-center gap-2 flex-shrink-0">
                    {index > 0 && <span className="text-text-secondary/50">/</span>}
                    <a 
                        href={item.href || '#'} 
                        className={`flex items-center gap-1.5 ${!item.href ? 'font-bold text-text-primary dark:text-dark-text-primary' : 'hover:underline'}`}
                        aria-current={!item.href ? 'page' : undefined}
                    >
                        {item.icon && <Icon className="!text-lg">{item.icon}</Icon>}
                        {item.label}
                    </a>
                </li>
            ))}
        </ol>
    </nav>
);

const breadcrumbItems: BreadcrumbItem[] = [
    { href: "#", label: "Home", icon: "home" },
    { href: "#", label: "Services" },
    { label: "Book Fulfillment" },
];

const breadcrumbProps: PropDef[] = [
    { name: 'items', type: '{ href?: string; label: string; icon?: string; }[]', default: '[]', description: 'An array of objects representing each level of the breadcrumb trail.' },
    { name: 'className', type: 'string', default: '""', description: 'Optional additional CSS classes to apply to the nav element.' },
];

const breadcrumbTrailCode = `const breadcrumbItems = [
    { href: "#", label: "Home", icon: "home" },
    { href: "#", label: "Services" },
    { label: "Book Fulfillment" }, // No href marks it as the current page
];

<BreadcrumbTrail items={breadcrumbItems} />
`;

// --- Pagination Component Props ---
const paginationProps: PropDef[] = [
    { name: 'currentPage', type: 'number', default: 'N/A', description: 'The currently active page number.' },
    { name: 'totalPages', type: 'number', default: 'N/A', description: 'The total number of pages available.' },
    { name: 'onPageChange', type: '(page: number) => void', default: 'N/A', description: 'Callback function triggered when a page number is clicked.' },
];

const paginationCode = `const [page, setPage] = useState(5);
const total = 10;

<Pagination 
    currentPage={page} 
    totalPages={total}
    onPageChange={setPage}
/>
`;

// --- Tabs Component ---
interface Tab {
    id: string;
    label: string;
    icon?: string;
}
interface TabsProps {
    tabs: Tab[];
    activeTab: string;
    onTabClick: (id: string) => void;
    className?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabClick, className = '' }) => (
    <div className={`border-b border-border-color dark:border-dark-border-color ${className}`}>
        <nav className="-mb-px flex gap-6" aria-label="Tabs">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => onTabClick(tab.id)}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    className={`shrink-0 flex items-center gap-2 px-1 py-3 text-sm font-bold border-b-2 transition-colors ${
                        activeTab === tab.id
                            ? 'border-brand-orange text-brand-orange'
                            : 'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300 dark:text-dark-text-secondary dark:hover:text-dark-text-primary dark:hover:border-gray-600'
                    }`}
                >
                    {tab.icon && <Icon>{tab.icon}</Icon>}
                    {tab.label}
                </button>
            ))}
        </nav>
    </div>
);

const tabItems: Tab[] = [
    { id: 'details', label: 'Details', icon: 'article' },
    { id: 'shipping', label: 'Shipping', icon: 'local_shipping' },
    { id: 'history', label: 'History', icon: 'history' },
];

const tabsProps: PropDef[] = [
    { name: 'tabs', type: '{ id: string; label: string; icon?: string; }[]', default: '[]', description: 'An array of tab objects to display.' },
    { name: 'activeTab', type: 'string', default: 'N/A', description: 'The `id` of the currently active tab.' },
    { name: 'onTabClick', type: '(id: string) => void', default: 'N/A', description: 'Callback function triggered when a tab is clicked.' },
];

const tabsCode = `const [activeTab, setActiveTab] = useState('details');
const tabItems = [
    { id: 'details', label: 'Details', icon: 'article' },
    { id: 'shipping', label: 'Shipping', icon: 'local_shipping' },
];

<Tabs 
    tabs={tabItems}
    activeTab={activeTab}
    onTabClick={setActiveTab}
/>
<div className="py-4">
    Content for {activeTab}
</div>
`;

// --- Main Section Component ---
export const NavigationSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => {
    const [currentPage, setCurrentPage] = useState(5);
    const [activeTab, setActiveTab] = useState('details');

    return (
        <SectionContainer id={id}>
            <Breadcrumb group={groupTitle} section={sectionTitle} />
            <h2 className="section-title">Page Navigation</h2>
            <p className="section-subtitle">A collection of essential components that help users orient themselves and navigate through page content and application views, including breadcrumbs, pagination, and tabs.</p>
            
            <SubSection title="Breadcrumbs">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    Use breadcrumbs to help users understand their location within the site hierarchy. The last item should not have an `href` prop, as it represents the current page.
                </p>
                <ComponentPreview>
                    <BreadcrumbTrail items={breadcrumbItems} />
                </ComponentPreview>
                <CodeBlock code={breadcrumbTrailCode} />
            </SubSection>

            <SubSection title="Pagination">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    For splitting up long lists of content into multiple pages. The component handles page numbers and disabled states automatically.
                </p>
                <ComponentPreview>
                    <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
                </ComponentPreview>
                <CodeBlock code={paginationCode} />
            </SubSection>

            <SubSection title="Tabs">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    Tabs are used to switch between different views or data sets within the same context, such as on a profile page or product details screen.
                </p>
                <ComponentPreview isColumn>
                    <Tabs tabs={tabItems} activeTab={activeTab} onTabClick={setActiveTab} />
                    <div className="py-4 text-text-secondary dark:text-dark-text-secondary">
                        <p>Content for the <span className="font-bold text-text-primary dark:text-dark-text-primary">{activeTab}</span> tab.</p>
                    </div>
                </ComponentPreview>
                <CodeBlock code={tabsCode} />
            </SubSection>

            <SubSection title="Component Props">
                <div className="space-y-12">
                     <div>
                        <h4 className="font-bold mb-2 text-text-primary dark:text-dark-text-primary">{'<BreadcrumbTrail />'}</h4>
                        <div className="component-preview !p-0 !bg-transparent !border-none"><PropsTable data={breadcrumbProps} /></div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2 text-text-primary dark:text-dark-text-primary">{'<Pagination />'}</h4>
                        <div className="component-preview !p-0 !bg-transparent !border-none"><PropsTable data={paginationProps} /></div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2 text-text-primary dark:text-dark-text-primary">{'<Tabs />'}</h4>
                        <div className="component-preview !p-0 !bg-transparent !border-none"><PropsTable data={tabsProps} /></div>
                    </div>
                </div>
            </SubSection>

        </SectionContainer>
    );
};