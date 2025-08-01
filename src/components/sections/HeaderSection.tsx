

import React from 'react';
import {
    SectionContainer,
    ComponentPreview,
    SubSection,
    PropsTable,
    BrowserCompatibility,
} from '../Content.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';
import CodeBlock from '../CodeBlock.tsx';
import { PropDef } from '../../../types.ts';
import { Header } from '../Header.tsx';

// Data for the demo and docs
const headerLinks = [
    { href: '#', label: 'Services' },
    { href: '#', label: 'Integrations' },
    { href: '#', label: 'Pricing' },
    { href: '#', label: 'About Us' },
];

const userMenuLinks = [
    { href: '#', label: 'Profile', icon: 'person' },
    { href: '#', label: 'Settings', icon: 'settings' },
    { href: '#', label: 'Logout', icon: 'logout' },
];

const headerProps: PropDef[] = [
    { name: 'links', type: '{ href: string; label: string; }[]', default: '[]', description: 'Array of navigation links for the main menu.' },
    { name: 'user', type: '{ name: string; avatarUrl?: string; }', default: 'undefined', description: 'User object. If present, shows the user avatar menu.' },
    { name: 'userMenuLinks', type: '{ href, label, icon }[]', default: '[]', description: 'Links to display in the user dropdown menu.' },
    { name: 'onLogin', type: '() => void', default: 'N/A', description: 'Callback function for the "Log In" button click.' },
    { name: 'onSignUp', type: '() => void', default: 'N/A', description: 'Callback function for the "Sign Up" / "Get Started" button click.' },
];

const headerCode = `import { Header } from './components/Header.tsx';

const links = [
    { href: '#', label: 'Services' },
    { href: '#', label: 'Pricing' },
];

// Logged Out State
<Header
    links={links}
    onLogin={() => alert('Login clicked')}
    onSignUp={() => alert('Sign Up clicked')}
/>

// Logged In State
<Header
    links={links}
    user={{ name: 'Jane Doe', avatarUrl: '...' }}
    userMenuLinks={[
        { href: '#', label: 'Profile', icon: 'person' },
        { href: '#', label: 'Logout', icon: 'logout' },
    ]}
/>
`;

export const HeaderSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => {
    return (
        <SectionContainer id={id}>
            <Breadcrumb group={groupTitle} section={sectionTitle} />
            <h2 className="section-title">Header</h2>
            <p className="section-subtitle">
                The header is a critical navigation component that provides consistent access to main sections of a website or application. It's responsive, adapting from a full desktop menu to a compact mobile version.
            </p>

            <SubSection title="Live Demo">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    This is a fully functional preview of the Header component. It showcases both logged-out and logged-in states, and is fully responsive.
                </p>
                <BrowserCompatibility>
                    The sticky header uses a <code>backdrop-blur</code> effect that may not render in all browsers (like Firefox by default), but it will gracefully degrade to a semi-transparent background.
                </BrowserCompatibility>
                <div className="w-full space-y-8 mt-6">
                    <div>
                        <h3 className="font-bold mb-4 text-text-primary dark:text-dark-text-primary">Logged Out State</h3>
                        <ComponentPreview className="!p-0 !bg-transparent !border-none">
                            <div className="w-full rounded-lg border border-border-color dark:border-dark-border-color overflow-hidden">
                                <Header
                                    links={headerLinks}
                                    onLogin={() => alert('Login clicked')}
                                    onSignUp={() => alert('Get Started clicked')}
                                    userMenuLinks={userMenuLinks}
                                />
                                <div className="p-4 bg-bg-secondary dark:bg-dark-bg-secondary text-center text-sm">Page content would go here...</div>
                            </div>
                        </ComponentPreview>
                    </div>
                    <div>
                         <h3 className="font-bold mb-4 text-text-primary dark:text-dark-text-primary">Logged In State</h3>
                        <ComponentPreview className="!p-0 !bg-transparent !border-none">
                            <div className="w-full rounded-lg border border-border-color dark:border-dark-border-color overflow-hidden">
                                <Header
                                    links={headerLinks}
                                    user={{ name: 'Jane Doe', avatarUrl: 'https://i.pravatar.cc/40?u=jane' }}
                                    userMenuLinks={userMenuLinks}
                                    onLogin={() => {}}
                                    onSignUp={() => {}}
                                />
                                <div className="p-4 bg-bg-secondary dark:bg-dark-bg-secondary text-center text-sm">Page content would go here...</div>
                            </div>
                        </ComponentPreview>
                    </div>
                </div>
                 <CodeBlock code={headerCode} />
            </SubSection>
            
            <SubSection title="Props: <Header />">
                <PropsTable data={headerProps} />
            </SubSection>
        </SectionContainer>
    );
};