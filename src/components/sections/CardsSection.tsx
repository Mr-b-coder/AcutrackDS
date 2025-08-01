// FILE: components/sections/CardsSection.tsx
import React, { useState, useMemo } from 'react';
import { SectionContainer, SubSection, ComponentPreview, Card, Button, PropsTable, Radio, Checkbox } from '../Content.tsx';
import CodeBlock from '../CodeBlock.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';
import { PropDef } from '../../types.ts';
import { Icon } from '../icons.tsx';

const basicCardCode = `import { Card } from './components/Content.tsx';

// An interactive card (default)
<Card>
    <Card.Body>
        <p>This card has hover effects.</p>
    </Card.Body>
</Card>

// A static, non-interactive card
<Card isInteractive={false}>
    <Card.Body>
        <p>This card is just a container.</p>
    </Card.Body>
</Card>`;

const selectableCardCode = `import React, { useState } from 'react';
import { Card } from './components/Content.tsx';

function PricingSelector() {
    const [selectedPlan, setSelectedPlan] = useState('pro');

    return (
        <fieldset>
            <legend className="sr-only">Pricing plans</legend>
            <div className="grid md:grid-cols-3 gap-8">
                {/* Plan 1 */}
                <div>
                    <input 
                        type="radio" 
                        id="plan-basic" 
                        name="plan"
                        value="basic"
                        className="sr-only peer"
                        checked={selectedPlan === 'basic'}
                        onChange={(e) => setSelectedPlan(e.target.value)}
                    />
                    <Card as="label" htmlFor="plan-basic" className="peer-checked:border-brand-orange peer-checked:shadow-xl peer-checked:-translate-y-1 h-full">
                        {/* Card Content... */}
                    </Card>
                </div>
                {/* Plan 2 (Featured) */}
                <div>
                    <input 
                        type="radio" 
                        id="plan-pro" 
                        name="plan"
                        value="pro"
                        className="sr-only peer"
                        checked={selectedPlan === 'pro'}
                        onChange={(e) => setSelectedPlan(e.target.value)}
                    />
                    <Card as="label" htmlFor="plan-pro" featured className="peer-checked:border-brand-orange peer-checked:shadow-xl peer-checked:-translate-y-1 h-full">
                        {/* Card Content... */}
                    </Card>
                </div>
                {/* Plan 3 (Disabled) */}
                 <div>
                    <input 
                        type="radio" 
                        id="plan-enterprise" 
                        name="plan"
                        value="enterprise"
                        className="sr-only peer"
                        disabled
                    />
                    <Card as="label" htmlFor="plan-enterprise" disabled className="h-full">
                         {/* Card Content... */}
                    </Card>
                </div>
            </div>
        </fieldset>
    );
}`;

const actionsCardCode = `import { Card, Button } from './components/Content.tsx';

<Card isInteractive={false}>
    <Card.Body>
        <h3 className="font-bold font-heading text-text-primary dark:text-dark-text-primary">
            Take Action
        </h3>
        <p className="mt-2">
            Cards can include actions in a dedicated footer area.
        </p>
    </Card.Body>
    <Card.Footer>
        <Button variant="text" size="sm">Details</Button>
        <Button variant="primary" size="sm">Sign Up</Button>
    </Card.Footer>
</Card>`;

const horizontalCardCode = `import { Card, Button, Icon } from './components/Content.tsx';

<Card className="md:flex" isInteractive={false}>
    <Card.Image 
        src="https://picsum.photos/seed/horizontal/600/600" 
        alt="Abstract art"
        className="md:w-48 md:h-full h-48 w-full object-cover"
    />
    <div className="flex flex-col flex-1">
        <Card.Body>
            <h3 className="font-bold font-heading text-text-primary dark:text-dark-text-primary">
                Horizontal Layout
            </h3>
            <p className="mt-2">
                Combine cards with flex utilities for different layouts.
            </p>
        </Card.Body>
        <Card.Footer className="mt-auto justify-start">
            <Button rightIcon={<Icon>arrow_forward</Icon>}>Read More</Button>
        </Card.Footer>
    </div>
</Card>`;

const cardProps: PropDef[] = [
    { name: 'children', type: 'React.ReactNode', default: 'N/A', description: 'The content of the card, typically Card sub-components.' },
    { name: 'as', type: 'React.ElementType', default: "'div'", description: 'The HTML element to render the card as (e.g., "label").' },
    { name: 'isInteractive', type: 'boolean', default: 'true', description: 'If true, the card has hover effects. Set to false for static containers.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Applies a disabled state (reduced opacity, no interactions).' },
    { name: 'featured', type: 'boolean', default: 'false', description: 'Applies a prominent style with a border, glow, and "Featured" badge to highlight the card.' },
    { name: 'className', type: 'string', default: '""', description: 'Additional CSS classes, useful for peer-checked selection styling.' },
];

export const CardsSection: React.FC<{ groupTitle: string; sectionTitle: string; }> = ({ groupTitle, sectionTitle }) => {
    const [selectedPlan, setSelectedPlan] = useState('pro');

    // State for the new workbench
    const [showImage, setShowImage] = useState(true);
    const [showHeader, setShowHeader] = useState(true);
    const [showFooter, setShowFooter] = useState(true);
    const [isInteractive, setIsInteractive] = useState(true);
    const [isFeatured, setIsFeatured] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [primaryBtnVariant, setPrimaryBtnVariant] = useState<'primary' | 'secondary' | 'text'>('primary');
    const [showSecondaryBtn, setShowSecondaryBtn] = useState(true);
    
    const generatedCode = useMemo(() => {
        const cardProps = [];
        if (!isInteractive) cardProps.push(`isInteractive={false}`);
        if (isFeatured) cardProps.push(`featured`);
        if (isDisabled) cardProps.push(`disabled`);

        const propsString = cardProps.length > 0 ? ` ${cardProps.join(' ')}` : '';

        const imageCode = showImage ? `    <Card.Image src="https://picsum.photos/seed/composer/600/400" alt="Card Image" />\n` : '';
        const headerCode = showHeader ? `    <Card.Header>\n        <h3 className="font-bold font-heading text-lg">Card Title</h3>\n    </Card.Header>\n` : '';
        
        const footerCode = showFooter ? `    <Card.Footer>
        ${showSecondaryBtn ? `<Button variant="text" size="sm">Details</Button>\n        ` : ''}<Button variant="${primaryBtnVariant}" size="sm">Action</Button>
    </Card.Footer>\n` : '';

        return `<Card${propsString}>
${imageCode}${headerCode}    <Card.Body>
        <p>This is the main body content of the card. It's flexible and can contain any elements you need.</p>
    </Card.Body>
${footerCode}</Card>`;
    }, [showImage, showHeader, showFooter, isInteractive, isFeatured, isDisabled, primaryBtnVariant, showSecondaryBtn]);
    
    return (
        <SectionContainer id="cards">
            <Breadcrumb group={groupTitle} section={sectionTitle} />
            <h2 className="section-title">Cards</h2>
            <p className="section-subtitle">
                Cards are flexible content containers. We've created a reusable <code>{'<Card />'}</code> component with sub-components like <code>{'<Card.Header />'}</code>, <code>{'<Card.Image />'}</code>, and <code>{'<Card.Footer />'}</code> to make building consistent UIs easy.
            </p>
            
            <SubSection title="Interactive Card Composer">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    Use the controls to compose a card component and see the code update in real-time.
                </p>
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Controls */}
                    <div className="lg:col-span-1 space-y-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Elements</h4>
                            <div className="flex flex-col gap-3">
                                <Checkbox id="card-wb-image" label="Show Image" checked={showImage} onChange={(e) => setShowImage(e.target.checked)} />
                                <Checkbox id="card-wb-header" label="Show Header" checked={showHeader} onChange={(e) => setShowHeader(e.target.checked)} />
                                <Checkbox id="card-wb-footer" label="Show Footer" checked={showFooter} onChange={(e) => setShowFooter(e.target.checked)} />
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">State</h4>
                            <div className="flex flex-col gap-3">
                                <Checkbox id="card-wb-interactive" label="Interactive (Hover Effect)" checked={isInteractive} onChange={(e) => setIsInteractive(e.target.checked)} />
                                <Checkbox id="card-wb-featured" label="Featured" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
                                <Checkbox id="card-wb-disabled" label="Disabled" checked={isDisabled} onChange={(e) => setIsDisabled(e.target.checked)} />
                            </div>
                        </div>

                        {showFooter && (
                            <div>
                                <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Footer Actions</h4>
                                <div className="space-y-4">
                                     <div>
                                        <div className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">Primary Button Variant</div>
                                        <div className="flex flex-col gap-2 mt-2">
                                            <Radio id="card-wb-btn-primary" name="card-wb-btn-variant" label="Primary" value="primary" checked={primaryBtnVariant === 'primary'} onChange={() => setPrimaryBtnVariant('primary')} />
                                            <Radio id="card-wb-btn-secondary" name="card-wb-btn-variant" label="Secondary" value="secondary" checked={primaryBtnVariant === 'secondary'} onChange={() => setPrimaryBtnVariant('secondary')} />
                                            <Radio id="card-wb-btn-text" name="card-wb-btn-variant" label="Text" value="text" checked={primaryBtnVariant === 'text'} onChange={() => setPrimaryBtnVariant('text')} />
                                        </div>
                                    </div>
                                    <Checkbox id="card-wb-secondary-btn" label="Show Secondary Button" checked={showSecondaryBtn} onChange={(e) => setShowSecondaryBtn(e.target.checked)} />
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Preview */}
                    <div className="lg:col-span-2">
                        <ComponentPreview className="h-auto items-start justify-center">
                            <Card 
                                className="w-full max-w-sm"
                                isInteractive={isInteractive}
                                featured={isFeatured}
                                disabled={isDisabled}
                            >
                                {showImage && <Card.Image src="https://picsum.photos/seed/composer/600/400" alt="Card Image" />}
                                {showHeader && (
                                    <Card.Header>
                                        <h3 className="font-bold font-heading text-lg text-text-primary dark:text-dark-text-primary">Card Title</h3>
                                    </Card.Header>
                                )}
                                <Card.Body>
                                    <p>This is the main body content of the card. It's flexible and can contain any elements you need.</p>
                                </Card.Body>
                                {showFooter && (
                                    <Card.Footer>
                                        {showSecondaryBtn && <Button variant="text" size="sm">Details</Button>}
                                        <Button variant={primaryBtnVariant} size="sm">Action</Button>
                                    </Card.Footer>
                                )}
                            </Card>
                        </ComponentPreview>
                        <CodeBlock code={generatedCode} />
                    </div>
                </div>
            </SubSection>

            <SubSection title="Basic Card">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    The card can be an interactive element or a simple static container. Use the <code>isInteractive</code> prop to control the lift-on-hover effect. By default, cards are interactive.
                </p>
                <ComponentPreview>
                    <div className="w-full max-w-sm">
                        <Card>
                            <Card.Body>
                                <h3 className="font-bold font-heading text-text-primary dark:text-dark-text-primary">Interactive Card (Default)</h3>
                                <p className="mt-2">This is the default card behavior. It lifts up and gains a border on hover, indicating it's clickable.</p>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="w-full max-w-sm">
                        <Card isInteractive={false}>
                            <Card.Body>
                                <h3 className="font-bold font-heading text-text-primary dark:text-dark-text-primary">Static Card</h3>
                                <p className="mt-2">Set <code>isInteractive=&#123;false&#125;</code> for cards that are just content containers and not meant to be clicked.</p>
                            </Card.Body>
                        </Card>
                    </div>
                </ComponentPreview>
                <CodeBlock code={basicCardCode} />
            </SubSection>
            
            <SubSection title="Selectable Cards & States">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    Render a Card <code>as="label"</code> to create a large, accessible form control. Combine this with <code>peer-checked</code> utilities for selection styling, and use the <code>featured</code> and <code>disabled</code> props to communicate different states.
                </p>
                <ComponentPreview>
                     <div className="w-full">
                        <fieldset>
                            <legend className="sr-only">Pricing plans</legend>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                
                                {/* Plan 1: Basic */}
                                <div>
                                    <input 
                                        type="radio" 
                                        id="plan-basic" 
                                        name="plan"
                                        value="basic"
                                        className="sr-only peer"
                                        checked={selectedPlan === 'basic'}
                                        onChange={(e) => setSelectedPlan(e.target.value)}
                                    />
                                    <Card as="label" htmlFor="plan-basic" className="peer-checked:border-brand-orange peer-checked:shadow-xl peer-checked:-translate-y-1 h-full flex flex-col">
                                        <Card.Body className="flex-grow">
                                            <h3 className="font-bold font-heading text-text-primary dark:text-dark-text-primary">Basic Plan</h3>
                                            <p className="text-2xl font-bold font-heading text-text-primary dark:text-dark-text-primary mt-2">$29<span className="text-base font-normal text-text-secondary">/mo</span></p>
                                            <p className="mt-2 text-sm">Ideal for startups and small projects.</p>
                                        </Card.Body>
                                        <Card.Footer className="justify-center">
                                            <span className="font-bold text-sm text-brand-orange">Current Plan</span>
                                        </Card.Footer>
                                    </Card>
                                </div>

                                {/* Plan 2: Pro (Featured) */}
                                <div>
                                    <input 
                                        type="radio" 
                                        id="plan-pro" 
                                        name="plan"
                                        value="pro"
                                        className="sr-only peer"
                                        checked={selectedPlan === 'pro'}
                                        onChange={(e) => setSelectedPlan(e.target.value)}
                                    />
                                    <Card as="label" htmlFor="plan-pro" featured className="peer-checked:border-brand-orange peer-checked:shadow-xl peer-checked:-translate-y-1 h-full flex flex-col">
                                         <Card.Body className="flex-grow">
                                            <h3 className="font-bold font-heading text-text-primary dark:text-dark-text-primary">Pro Plan</h3>
                                            <p className="text-2xl font-bold font-heading text-text-primary dark:text-dark-text-primary mt-2">$99<span className="text-base font-normal text-text-secondary">/mo</span></p>
                                            <p className="mt-2 text-sm">For growing businesses that need more power.</p>
                                        </Card.Body>
                                        <Card.Footer className="justify-center">
                                            <Button variant="primary" size="sm" className="w-full">Choose Pro</Button>
                                        </Card.Footer>
                                    </Card>
                                </div>

                                {/* Plan 3: Enterprise (Disabled) */}
                                <div>
                                    <input 
                                        type="radio" 
                                        id="plan-enterprise" 
                                        name="plan"
                                        value="enterprise"
                                        className="sr-only peer"
                                        disabled
                                    />
                                    <Card as="label" htmlFor="plan-enterprise" disabled className="h-full flex flex-col">
                                        <Card.Body className="flex-grow">
                                            <h3 className="font-bold font-heading text-text-primary dark:text-dark-text-primary">Enterprise Plan</h3>
                                            <p className="text-2xl font-bold font-heading text-text-primary dark:text-dark-text-primary mt-2">Custom</p>
                                            <p className="mt-2 text-sm">For large-scale applications and custom needs.</p>
                                        </Card.Body>
                                        <Card.Footer className="justify-center">
                                            <Button variant="secondary" size="sm" disabled className="w-full">Contact Us</Button>
                                        </Card.Footer>
                                    </Card>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </ComponentPreview>
                <CodeBlock code={selectableCardCode} />
            </SubSection>

            <SubSection title="Card with Actions">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    Cards often contain actions related to their content. Use the <code>Card.Footer</code> sub-component to consistently place actions at the bottom of a card.
                </p>
                <ComponentPreview>
                    <Card isInteractive={false} className="w-full max-w-sm">
                        <Card.Body>
                            <h3 className="font-bold font-heading text-text-primary dark:text-dark-text-primary">
                                Take Action
                            </h3>
                            <p className="mt-2">
                                Cards can include actions in a dedicated footer area.
                            </p>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="text" size="sm">Details</Button>
                            <Button variant="primary" size="sm">Sign Up</Button>
                        </Card.Footer>
                    </Card>
                </ComponentPreview>
                <CodeBlock code={actionsCardCode} />
            </SubSection>

            <SubSection title="Horizontal Card Layout">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    Combine the Card component with flexbox utilities to create horizontal layouts, ideal for list items or article previews.
                </p>
                <ComponentPreview>
                    <Card className="w-full max-w-2xl md:flex" isInteractive={false}>
                        <Card.Image 
                            src="https://picsum.photos/seed/horizontal/600/600" 
                            alt="Abstract art"
                            className="md:w-48 md:h-full h-48 w-full object-cover"
                        />
                        <div className="flex flex-col flex-1">
                            <Card.Body>
                                <h3 className="font-bold font-heading text-text-primary dark:text-dark-text-primary">
                                    Horizontal Layout
                                </h3>
                                <p className="mt-2">
                                    Combine cards with flex utilities for different layouts.
                                </p>
                            </Card.Body>
                            <Card.Footer className="mt-auto justify-start">
                                <Button rightIcon={<Icon>arrow_forward</Icon>}>Read More</Button>
                            </Card.Footer>
                        </div>
                    </Card>
                </ComponentPreview>
                <CodeBlock code={horizontalCardCode} />
            </SubSection>

            <SubSection title="Props: <Card />">
                <PropsTable data={cardProps} />
            </SubSection>
        </SectionContainer>
    );
};