// FILE: components/sections/ColorsSection.tsx
// This section displays the brand's primary color palette.

import React from 'react';
import { SectionContainer, SubSection } from '../Content.tsx';
import { useCopyToClipboard, Icon } from '../icons.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';

interface ColorCardProps {
    name: string;
    description: string;
    tailwindClass: string;
    hex: string;
}

const ColorCard: React.FC<ColorCardProps> = ({ name, description, tailwindClass, hex }) => {
    const [copy, isCopied] = useCopyToClipboard();
    
    return (
        <div className="overflow-hidden rounded-lg border border-border-color bg-bg-secondary dark:border-dark-border-color dark:bg-dark-bg-secondary">
            <div className={`${tailwindClass} h-24 w-full`}></div>
            <div className="p-4">
                <h3 className="font-bold text-text-primary dark:text-dark-text-primary">{name}</h3>
                <p className="mt-1 text-xs text-text-secondary dark:text-dark-text-secondary">{description}</p>
                <div className="mt-4 flex items-center justify-between">
                    <code className="rounded bg-bg-tertiary p-1 text-xs font-mono text-text-secondary dark:bg-dark-bg-tertiary dark:text-dark-text-primary">{hex}</code>
                     <button 
                        onClick={() => copy(tailwindClass.split(' ')[0])} 
                        className="flex items-center gap-2 text-xs font-bold text-brand-orange hover:text-brand-orange-hover dark:hover:text-dark-brand-orange-hover"
                     >
                        {isCopied ? <><Icon className="!text-base">check</Icon> Copied</> : <><Icon className="!text-base">content_copy</Icon> Copy Class</>}
                     </button>
                </div>
            </div>
        </div>
    );
};

const TextColorDemo: React.FC<{ name: string; tailwindClass: string; description: string; bgClass: string; }> = ({ name, tailwindClass, description, bgClass }) => {
    const [copy, isCopied] = useCopyToClipboard();
    return (
        <div className={`flex items-center justify-between rounded-lg p-4 border border-border-color dark:border-dark-border-color ${bgClass}`}>
            <div>
                <p className={`font-bold ${tailwindClass}`}>{name}</p>
                <p className="text-xs mt-1 text-text-secondary dark:text-dark-text-secondary">{description}</p>
            </div>
            <button onClick={() => copy(tailwindClass)} className="flex items-center gap-2 text-xs font-bold text-brand-orange hover:text-brand-orange-hover">
                {isCopied ? <><Icon className="!text-base">check</Icon> Copied</> : <><Icon className="!text-base">content_copy</Icon> Copy Class</>}
            </button>
        </div>
    );
}

const brandColors = [
    { name: 'Acutrack Teal', description: 'Primary action color for buttons, links, and highlights.', tailwindClass: 'bg-brand-orange', hex: '#35B0AB' },
    { name: 'Acutrack Navy', description: 'Core brand color for backgrounds, sidebars, and primary text.', tailwindClass: 'bg-brand-navy', hex: '#1B3A7B' },
];

const uiColors = [
    { name: 'Primary Background', lightClass: 'bg-bg-primary', darkClass: 'bg-dark-bg-primary', description: 'Main page background.' },
    { name: 'Secondary Background', lightClass: 'bg-bg-secondary', darkClass: 'bg-dark-bg-secondary', description: 'Cards, modals, component backgrounds.' },
    { name: 'Tertiary Background', lightClass: 'bg-bg-tertiary', darkClass: 'bg-dark-bg-tertiary', description: 'Hover states, subtle dividers.' },
    { name: 'Primary Text', lightClass: 'text-text-primary', darkClass: 'text-dark-text-primary', description: 'Headings, primary information.' },
    { name: 'Secondary Text', lightClass: 'text-text-secondary', darkClass: 'text-dark-text-secondary', description: 'Body copy, descriptions, labels.' },
    { name: 'Border', lightClass: 'border-border-color', darkClass: 'border-dark-border-color', description: 'Standard component borders.' },
];

const systemColors = [
    { name: 'Success', description: 'Positive feedback, confirmations.', tailwindClass: 'bg-system-success', hex: '#22c55e' },
    { name: 'Error', description: 'Destructive actions, validation errors.', tailwindClass: 'bg-system-error', hex: '#ef4444' },
    { name: 'Warning', description: 'Non-critical alerts, pending states.', tailwindClass: 'bg-system-warning', hex: '#f59e0b' },
    { name: 'Info', description: 'Informational messages, neutral feedback.', tailwindClass: 'bg-system-info', hex: '#3b82f6' },
];


export const ColorsSection: React.FC<{ groupTitle: string; sectionTitle: string; id:string; }> = ({ groupTitle, sectionTitle, id }) => (
    <SectionContainer id={id}>
        <Breadcrumb group={groupTitle} section={sectionTitle} />
        <h2 className="section-title">Colors</h2>
        <p className="section-subtitle">Our color palette is structured to be intentional and accessible. It’s divided into Brand, UI, and System colors to ensure consistency and clarity across all applications. Click to copy the Tailwind utility class.</p>
        
        <SubSection title="Brand Colors">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose">
                {brandColors.map(color => <ColorCard key={color.name} {...color} />)}
            </div>
        </SubSection>

        <SubSection title="UI Colors (Light & Dark)">
             <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                These semantic tokens automatically adapt to the current theme (light or dark). You should always use these for standard UI elements instead of raw color values to ensure your components are theme-aware.
            </p>
            <div className="space-y-6 not-prose">
                {uiColors.map(color => (
                    <div key={color.name}>
                        <h4 className="font-bold text-text-primary dark:text-dark-text-primary mb-2">{color.name}</h4>
                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-3 -mt-2">{color.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {color.lightClass.startsWith('text-') ? (
                                <>
                                    <TextColorDemo name="Light Mode" tailwindClass={color.lightClass} description={color.lightClass} bgClass="bg-bg-secondary" />
                                    <TextColorDemo name="Dark Mode" tailwindClass={color.darkClass} description={color.darkClass} bgClass="bg-dark-bg-secondary" />
                                </>
                            ) : (
                                <div className={`h-16 w-full rounded-md flex items-center justify-center text-sm font-mono ${color.lightClass} border border-border-color`}>{color.lightClass}</div>
                            )}
                            
                            {color.darkClass.startsWith('text-') ? null : (
                                 <div className={`h-16 w-full rounded-md flex items-center justify-center text-sm font-mono ${color.darkClass} border border-dark-border-color`}>{color.darkClass}</div>
                            )}

                             {color.lightClass.startsWith('border-') && (
                                <>
                                    <div className="md:col-start-1 h-16 w-full rounded-md flex items-center justify-center text-sm font-mono bg-bg-secondary border-2 ${color.lightClass}">{color.lightClass}</div>
                                    <div className="h-16 w-full rounded-md flex items-center justify-center text-sm font-mono bg-dark-bg-secondary border-2 ${color.darkClass}">{color.darkClass}</div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </SubSection>

        <SubSection title="System & Feedback Colors">
            <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                Use these colors to provide contextual feedback for user actions, such as in alerts and notifications.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 not-prose">
                {systemColors.map(color => <ColorCard key={color.name} {...color} />)}
            </div>
        </SubSection>

        <SubSection title="Usage Guidelines">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <Icon className="!text-2xl text-system-success mt-1 shrink-0">check_circle</Icon>
                        <div>
                            <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Use Semantic Tokens</h4>
                            <p className="text-sm">Always use UI color tokens (e.g., `bg-bg-secondary`, `text-text-primary`) instead of hard-coded hex values. This ensures your components automatically support dark mode.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Icon className="!text-2xl text-system-success mt-1 shrink-0">check_circle</Icon>
                        <div>
                            <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Ensure Sufficient Contrast</h4>
                            <p className="text-sm">When combining text and background colors, verify they meet WCAG AA contrast ratios, especially for body text. Use an online contrast checker if unsure.</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <Icon className="!text-2xl text-system-error mt-1 shrink-0">cancel</Icon>
                        <div>
                            <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Don't Use Brand Colors for Status</h4>
                            <p className="text-sm">Avoid using `brand-orange` or `brand-navy` to communicate success or error. Use the dedicated `system-success` and `system-error` colors for clarity.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Icon className="!text-2xl text-system-error mt-1 shrink-0">cancel</Icon>
                        <div>
                            <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Avoid Hard-coding Colors</h4>
                            <p className="text-sm">Do not apply raw hex values like `#FFFFFF` in components. Use the predefined Tailwind classes (e.g., `bg-white` or `bg-bg-secondary`) to maintain consistency.</p>
                        </div>
                    </div>
                </div>
            </div>
        </SubSection>

    </SectionContainer>
);