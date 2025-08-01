// FILE: components/sections/BannerSection.tsx

import React, { useState, useMemo } from 'react';
import { SectionContainer, SubSection, ComponentPreview, Button, PropsTable, Radio, Checkbox, Input } from '../Content.tsx';
import { Banner, BannerProps, BannerVariant } from '../Banner.tsx';
import { useToast } from '../Toast.tsx';
import CodeBlock from '../CodeBlock.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';
import { PropDef } from '../../types.ts';
import { Icon } from '../icons.tsx';

const bannerProps: PropDef[] = [
    { name: 'variant', type: "'success' | 'warning' | 'error' | 'info'", default: "'info'", description: 'Determines the color and icon of the banner.' },
    { name: 'children', type: 'React.ReactNode', default: 'N/A', description: 'The main text content of the banner.' },
    { name: 'icon', type: 'string', default: 'undefined', description: 'Overrides the default icon for the variant.' },
    { name: 'onDismiss', type: '() => void', default: 'undefined', description: 'If provided, a close button is shown and this function is called on click.' },
    { name: 'actions', type: 'React.ReactNode', default: 'undefined', description: 'Optional action buttons to display on the right.' },
];

const BannerSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => {
    const toast = useToast();

    // State for workbench
    const [variant, setVariant] = useState<BannerVariant>('info');
    const [content, setContent] = useState('A new version of our app is available. Please refresh to update.');
    const [isDismissible, setIsDismissible] = useState(true);
    const [showActions, setShowActions] = useState(false);
    
    // This state is just to make the preview banner re-appear after dismissal in the demo
    const [previewKey, setPreviewKey] = useState(Date.now());
    
    const handleDismiss = () => {
        toast.showToast({ variant: 'info', title: 'Banner Dismissed' });
        setTimeout(() => setPreviewKey(Date.now()), 1000); // bring it back after 1 sec for demo
    };

    const generatedCode = useMemo(() => {
        const props = [];
        if (variant !== 'info') props.push(`variant="${variant}"`);
        if (isDismissible) props.push(`onDismiss={() => { /* handle dismissal */ }}`);
        if (showActions) {
            props.push(`actions={
        <Button size="sm" variant="text" className="!text-current !font-bold">
            Learn More
        </Button>
    }`);
        }
        const propsString = props.length > 0 ? `\n    ${props.join('\n    ')}\n` : '';
        
        return `<Banner${propsString}>
    ${content}
</Banner>`;
    }, [variant, content, isDismissible, showActions]);

    return (
        <SectionContainer id="banners">
            <Breadcrumb group={groupTitle} section={sectionTitle} />
            <h2 className="section-title">Banners</h2>
            <p className="section-subtitle">
                Banners are used for prominent, persistent messages that relate to the entire page or application. They remain visible until the user dismisses them or the condition that triggered them is resolved.
            </p>
            
            <SubSection title="When to use a Banner">
                 <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary dark:text-dark-text-secondary">
                    <p>Banners fill an important gap between Alerts and Toasts:</p>
                    <ul>
                        <li>Use a <strong>Toast</strong> for temporary, low-priority feedback on an action (e.g., "Changes saved").</li>
                        <li>Use an <strong>Alert</strong> for contextual information within a specific section of a page (e.g., "Your password is weak" next to the password field).</li>
                        <li>Use a <strong>Banner</strong> for high-priority, page-level or app-level information (e.g., "System maintenance is scheduled for tonight" or "Your free trial is ending soon").</li>
                    </ul>
                </div>
            </SubSection>

            <SubSection title="Interactive Workbench">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    Configure the Banner's props and see the live result.
                </p>
                 <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Controls */}
                    <div className="lg:col-span-1 space-y-6">
                        <div>
                            <Input
                                id="banner-content"
                                label="Banner Content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Variant</h4>
                            <div className="flex flex-col gap-2">
                                {(['info', 'success', 'warning', 'error'] as BannerVariant[]).map(v => (
                                    <Radio key={v} id={`banner-v-${v}`} name="banner-variant" label={v.charAt(0).toUpperCase() + v.slice(1)} value={v} checked={variant === v} onChange={() => setVariant(v)} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Modifiers</h4>
                            <div className="flex flex-col gap-3">
                                <Checkbox id="banner-dismissible" label="Dismissible" checked={isDismissible} onChange={(e) => setIsDismissible(e.target.checked)} />
                                <Checkbox id="banner-actions" label="Show Actions" checked={showActions} onChange={(e) => setShowActions(e.target.checked)} />
                            </div>
                        </div>
                    </div>
                    {/* Preview */}
                    <div className="lg:col-span-2">
                        <ComponentPreview className="h-40 items-start">
                            <Banner 
                                key={previewKey}
                                variant={variant}
                                onDismiss={isDismissible ? handleDismiss : undefined}
                                actions={showActions ? (
                                    <Button size="sm" variant="text" className="!text-current !font-bold hover:!bg-black/10">
                                        Learn More
                                    </Button>
                                ) : undefined}
                            >
                               {content}
                            </Banner>
                        </ComponentPreview>
                        <CodeBlock code={generatedCode} />
                    </div>
                </div>
            </SubSection>

            <SubSection title="Props: <Banner />">
                <PropsTable data={bannerProps} />
            </SubSection>
        </SectionContainer>
    );
};

export { BannerSection };