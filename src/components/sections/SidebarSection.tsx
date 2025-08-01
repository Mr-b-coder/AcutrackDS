import React, { useState, useMemo } from 'react';
import {
    SectionContainer,
    ComponentPreview,
    SubSection,
    PropsTable,
    ToggleSwitch,
    Radio,
    BrowserCompatibility,
} from '../Content.tsx';
import { Icon } from '../icons.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';
import CodeBlock from '../CodeBlock.tsx';
import { PropDef, NavItemGroup } from '../../types.ts';
import { CollapsibleSidebar } from '../Sidebars/CollapsibleSidebar.tsx';

const sidebarNavGroups: NavItemGroup[] = [
    {
        title: 'Dashboard',
        icon: <Icon>dashboard</Icon>,
        items: [
            { href: '#demo-home', label: 'Home' },
            { href: '#demo-analytics', label: 'Analytics' },
            { href: '#demo-reports', label: 'Reports' },
        ],
    },
    {
        title: 'Management',
        icon: <Icon>settings</Icon>,
        items: [
            { href: '#demo-users', label: 'Users' },
            { href: '#demo-products', label: 'Products' },
            { href: '#demo-orders', label: 'Orders' },
        ],
    },
    {
        title: 'Account',
        icon: <Icon>person</Icon>,
        items: [
            { href: '#demo-profile', label: 'Profile' },
            { href: '#demo-billing', label: 'Billing' },
            { href: '#demo-security', label: 'Security' },
        ],
    },
];

const sidebarProps: PropDef[] = [
    { name: 'navGroups', type: 'NavItemGroup[]', default: '[]', description: 'An array of navigation groups, each with a title, icon, and items.' },
    { name: 'activeHref', type: 'string', default: 'undefined', description: 'The href of the currently active link to be highlighted.' },
    { name: 'onLinkClick', type: '(href: string) => void', default: 'N/A', description: 'Callback function when a navigation link is clicked.' },
    { name: 'defaultCollapsed', type: 'boolean', default: 'false', description: 'If true, the sidebar will be collapsed by default on initial render.' },
    { name: 'color', type: "'default' | 'inverse' | 'accent' | 'dark'", default: "'default'", description: 'Sets the color theme of the sidebar.' },
    { name: 'showIcons', type: 'boolean', default: 'true', description: 'If true, displays icons next to group titles.' },
];

export const SidebarSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => {
    const [activeLink, setActiveLink] = useState('#demo-analytics');
    const [isDefaultCollapsed, setIsDefaultCollapsed] = useState(false);
    const [color, setColor] = useState<'default' | 'inverse' | 'accent' | 'dark'>('default');
    const [showIcons, setShowIcons] = useState(true);
    
    const generatedCode = useMemo(() => {
        const props = [];
        if (color !== 'default') props.push(`color="${color}"`);
        if (!showIcons) props.push('showIcons={false}');
        if (isDefaultCollapsed) props.push('defaultCollapsed');
        const propsString = props.length > 0 ? `\n            ${props.join('\n            ')}` : '';

        return `import { CollapsibleSidebar } from './Sidebars/CollapsibleSidebar';
import { useState } from 'react';

const navGroups = [/* ... */];

function AppLayout() {
    const [activeLink, setActiveLink] = useState('#demo-analytics');

    return (
        <CollapsibleSidebar 
            navGroups={navGroups}
            activeHref={activeLink}
            onLinkClick={setActiveLink}${propsString}
        />
    )
}`;
    }, [isDefaultCollapsed, color, showIcons]);


    return (
        <SectionContainer id={id}>
            <Breadcrumb group={groupTitle} section={sectionTitle} />
            <h2 className="section-title">Sidebar</h2>
            <p className="section-subtitle">
                A collapsible sidebar is a common navigation pattern for applications that require a persistent, hierarchical menu. It supports multiple states (expanded and collapsed) to maximize screen real estate, and features accordion-style groups for organizing links.
            </p>

            <SubSection title="Interactive Workbench">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    Use the controls below to configure the sidebar's properties and see the results instantly. The code snippet will update automatically.
                </p>
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Controls */}
                    <div className="lg:col-span-1 space-y-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Color Theme</h4>
                             <div className="p-4 rounded-lg bg-bg-secondary dark:bg-dark-bg-secondary border border-border-color dark:border-dark-border-color space-y-2">
                                <Radio id="sidebar-wb-c-default" name="sidebar-wb-color" label="Default" value="default" checked={color === 'default'} onChange={() => setColor('default')} />
                                <Radio id="sidebar-wb-c-inverse" name="sidebar-wb-color" label="Inverse (Navy)" value="inverse" checked={color === 'inverse'} onChange={() => setColor('inverse')} />
                                <Radio id="sidebar-wb-c-dark" name="sidebar-wb-color" label="Dark (Grey)" value="dark" checked={color === 'dark'} onChange={() => setColor('dark')} />
                                <Radio id="sidebar-wb-c-accent" name="sidebar-wb-color" label="Accent (Teal)" value="accent" checked={color === 'accent'} onChange={() => setColor('accent')} />
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Configuration</h4>
                            <div className="p-4 rounded-lg bg-bg-secondary dark:bg-dark-bg-secondary border border-border-color dark:border-dark-border-color space-y-3">
                                 <ToggleSwitch
                                    id="sidebar-wb-collapsed"
                                    label="Start Collapsed"
                                    checked={isDefaultCollapsed}
                                    onChange={(e) => setIsDefaultCollapsed(e.target.checked)}
                                />
                                <ToggleSwitch
                                    id="sidebar-wb-icons"
                                    label="Show Icons"
                                    checked={showIcons}
                                    onChange={(e) => setShowIcons(e.target.checked)}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Preview */}
                    <div className="lg:col-span-2">
                        <ComponentPreview className="!p-0 !bg-transparent !border-none h-[70vh] w-full">
                            <div className="flex w-full h-full rounded-lg border border-border-color dark:border-dark-border-color overflow-hidden">
                                <CollapsibleSidebar 
                                    key={`${isDefaultCollapsed}-${color}-${showIcons}`} // Force remount to respect defaults
                                    navGroups={sidebarNavGroups}
                                    activeHref={activeLink}
                                    onLinkClick={setActiveLink}
                                    defaultCollapsed={isDefaultCollapsed}
                                    color={color}
                                    showIcons={showIcons}
                                />
                                <main className="flex-grow p-8 bg-bg-primary dark:bg-dark-bg-primary">
                                    <h3 className="font-bold text-2xl text-text-primary dark:text-dark-text-primary">Page Content</h3>
                                    <p className="mt-2 text-text-secondary dark:text-dark-text-secondary">
                                        This area represents the main content of your page. The active link is currently: <code className="font-mono bg-bg-tertiary dark:bg-dark-bg-tertiary p-1 rounded-md">{activeLink}</code>
                                    </p>
                                </main>
                            </div>
                        </ComponentPreview>
                        <CodeBlock code={generatedCode} />
                    </div>
                </div>
            </SubSection>
            
            <SubSection title="Props: <CollapsibleSidebar />">
                 <BrowserCompatibility>
                    The scrollable navigation area uses the <code>custom-scrollbar</code> class, which will render differently in Firefox versus Webkit browsers.
                </BrowserCompatibility>
                <div className="mt-6">
                    <PropsTable data={sidebarProps} />
                </div>
            </SubSection>
        </SectionContainer>
    );
};