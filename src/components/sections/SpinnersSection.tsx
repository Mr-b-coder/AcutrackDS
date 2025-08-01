// FILE: components/sections/SpinnersSection.tsx
// This section documents the Spinner component for indicating loading states.

import React, { useState, useMemo } from 'react';
import { SectionContainer, ComponentPreview, SubSection, Spinner, Button, PropsTable, Radio } from '../Content.tsx';
import type { SpinnerProps } from '../Content.tsx';
import { PropDef } from '../../types.ts';
import { Breadcrumb } from '../Breadcrumb.tsx';
import CodeBlock from '../CodeBlock.tsx';
import { Icon } from '../icons.tsx';


const fullPageLoaderCode = `// In your component state
const [isLoading, setIsLoading] = useState(false);

// ... later in your JSX
{isLoading && (
    <div 
        role="status" 
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-secondary/80 dark:bg-dark-bg-primary/80 backdrop-blur-sm"
    >
        <Spinner size="lg" variant="ring" />
        <p className="mt-4 text-lg font-bold text-text-primary dark:text-dark-text-primary">
            Loading content...
        </p>
    </div>
)}
`;

const spinnerProps: PropDef[] = [
    { name: 'variant', type: "'ring' | 'dots' | 'bars' | 'grid' | 'pulsar' | 'dual-ring'", default: "'ring'", description: 'Determines the visual style of the spinner.' },
    { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Sets the size of the spinner.' },
    { name: 'color', type: "'primary' | 'white' | 'current'", default: "'primary'", description: "Sets the spinner's color. 'current' inherits from text color." },
    { name: 'className', type: 'string', default: '""', description: 'Optional additional CSS classes to apply to the spinner container.' },
];

export const SpinnersSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => {
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    
    // State for main workbench
    const [variant, setVariant] = useState<SpinnerProps['variant']>('ring');
    const [size, setSize] = useState<SpinnerProps['size']>('md');
    const [color, setColor] = useState<SpinnerProps['color']>('primary');
    
    // State for button workbench
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [buttonVariant, setButtonVariant] = useState<'primary' | 'secondary' | 'text'>('primary');
    const [buttonSize, setButtonSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
    const [spinnerPosition, setSpinnerPosition] = useState<'left' | 'right'>('left');
    const [spinnerVariant, setSpinnerVariant] = useState<SpinnerProps['variant']>('ring');


    const handleButtonClick = () => {
        setIsButtonLoading(true);
        setTimeout(() => {
            setIsButtonLoading(false);
        }, 2000);
    };


    const generatedCode = useMemo(() => {
        const props = [];
        if (variant !== 'ring') props.push(`variant="${variant}"`);
        if (size !== 'md') props.push(`size="${size}"`);
        if (color !== 'primary') props.push(`color="${color}"`);
        
        const propsString = props.length > 0 ? ` ${props.join(' ')}` : '';
        return `<Spinner${propsString} />`;
    }, [variant, size, color]);
    
    const spinnerSizeForButtonMap: Record<typeof buttonSize, SpinnerProps['size']> = {
        xs: 'xs', sm: 'xs', md: 'sm', lg: 'sm', xl: 'md'
    };
    
    const generatedButtonSpinnerCode = useMemo(() => {
        const spinnerColor = buttonVariant === 'primary' ? 'white' : 'primary';
        
        const spinnerSize = spinnerSizeForButtonMap[buttonSize];

        const spinnerJsx = `<Spinner variant="${spinnerVariant}" size="${spinnerSize}" color="${spinnerColor}" />`;
        const loadingContent = spinnerPosition === 'left' 
            ? `
                ${spinnerJsx}
                Loading...` 
            : `Loading...
                ${spinnerJsx}
            `;

        return `const [isLoading, setIsLoading] = useState(false);

const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
};

<Button
    variant="${buttonVariant}"
    size="${buttonSize}"
    onClick={handleClick}
    disabled={isLoading}
    // Add a fixed width if needed to prevent layout shift
    className="min-w-[10rem] justify-center" 
>
    {isLoading ? (
        <span className="flex items-center gap-2">
            ${loadingContent.trim()}
        </span>
    ) : (
        'Click to Load'
    )}
</Button>`;
    }, [buttonVariant, buttonSize, spinnerPosition, spinnerVariant]);

    return (
        <SectionContainer id={id}>
            <Breadcrumb group={groupTitle} section={sectionTitle} />
            <h2 className="section-title">Spinners</h2>
            <p className="section-subtitle">Spinners are used to indicate a loading state, providing visual feedback that a process is underway. They should be used for indeterminate waits of 2 seconds or more.</p>
            
            <SubSection title="Interactive Workbench">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    Use the controls below to configure the spinner and see the results instantly. The code snippet will update automatically.
                </p>
                 <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Controls */}
                    <div className="lg:col-span-1 space-y-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Variant</h4>
                            <div className="flex flex-col gap-2">
                                {(['ring', 'dots', 'bars', 'grid', 'pulsar', 'dual-ring'] as SpinnerProps['variant'][]).map(v => (
                                    <Radio key={v} id={`spinner-wb-v-${v}`} name="spinner-wb-variant" label={v} value={v} checked={variant === v} onChange={() => setVariant(v)} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Size</h4>
                            <div className="flex flex-col gap-2">
                                {(['xs', 'sm', 'md', 'lg', 'xl'] as SpinnerProps['size'][]).map(s => (
                                    <Radio key={s} id={`spinner-wb-s-${s}`} name="spinner-wb-size" label={s} value={s} checked={size === s} onChange={() => setSize(s)} />
                                ))}
                            </div>
                        </div>
                         <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Color</h4>
                            <div className="flex flex-col gap-2">
                                {(['primary', 'white', 'current'] as SpinnerProps['color'][]).map(c => (
                                    <Radio key={c} id={`spinner-wb-c-${c}`} name="spinner-wb-color" label={c} value={c} checked={color === c} onChange={() => setColor(c)} />
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Preview */}
                    <div className="lg:col-span-2 min-w-0">
                        <ComponentPreview className="h-64">
                            <Spinner variant={variant} size={size} color={color} />
                        </ComponentPreview>
                        <CodeBlock code={generatedCode} />
                    </div>
                </div>
            </SubSection>

            <SubSection title="Usage in Buttons Workbench">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                   To indicate a loading state after a button is clicked, add a spinner and disable the button. Use the controls below to build a loading button.
                </p>
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-y-6 gap-x-4">
                            <div>
                                <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Button Variant</h4>
                                <div className="flex flex-col gap-2">
                                    {(['primary', 'secondary', 'text'] as const).map(v => (
                                        <Radio key={v} id={`spinner-btn-wb-v-${v}`} name="spinner-btn-wb-variant" label={v} value={v} checked={buttonVariant === v} onChange={() => setButtonVariant(v)} />
                                    ))}
                                </div>
                            </div>
                             <div>
                                <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Spinner Variant</h4>
                                <div className="flex flex-col gap-2">
                                    {(['ring', 'dots', 'bars', 'grid', 'pulsar', 'dual-ring'] as SpinnerProps['variant'][]).map(v => (
                                        <Radio key={v} id={`spinner-btn-wb-sv-${v}`} name="spinner-btn-wb-s-variant" label={v} value={v} checked={spinnerVariant === v} onChange={() => setSpinnerVariant(v)} />
                                    ))}
                                </div>
                            </div>
                             <div>
                                <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Button Size</h4>
                                <div className="flex flex-col gap-2">
                                    {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(s => (
                                        <Radio key={s} id={`spinner-btn-wb-s-${s}`} name="spinner-btn-wb-size" label={s} value={s} checked={buttonSize === s} onChange={() => setButtonSize(s)} />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Spinner Position</h4>
                                <div className="flex flex-col gap-2">
                                    {(['left', 'right'] as const).map(p => (
                                        <Radio key={p} id={`spinner-btn-wb-p-${p}`} name="spinner-btn-wb-pos" label={p} value={p} checked={spinnerPosition === p} onChange={() => setSpinnerPosition(p as 'left' | 'right')} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <ComponentPreview className="h-40">
                             <Button 
                                variant={buttonVariant} 
                                size={buttonSize}
                                onClick={handleButtonClick}
                                disabled={isButtonLoading}
                                className="min-w-[12rem] justify-center"
                            >
                                {isButtonLoading ? (
                                    <span className="flex items-center gap-2">
                                        {spinnerPosition === 'left' && <Spinner variant={spinnerVariant} size={spinnerSizeForButtonMap[buttonSize]} color={buttonVariant === 'primary' ? 'white' : 'primary'} />}
                                        <span>Loading...</span>
                                        {spinnerPosition === 'right' && <Spinner variant={spinnerVariant} size={spinnerSizeForButtonMap[buttonSize]} color={buttonVariant === 'primary' ? 'white' : 'primary'} />}
                                    </span>
                                ) : (
                                    'Click to Load'
                                )}
                            </Button>
                        </ComponentPreview>
                         <CodeBlock code={generatedButtonSpinnerCode} />
                    </div>
                </div>
            </SubSection>
            
            <SubSection title="Full-Page Overlay">
                 <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                   A common use case for spinners is a full-page loader to prevent user interaction while data is fetching. This can be achieved by placing the spinner in a fixed-position container with a backdrop.
                </p>
                <ComponentPreview>
                    <Button onClick={() => setOverlayVisible(true)}>Show Full-Page Loader</Button>
                    {isOverlayVisible && (
                        <div 
                            role="status" 
                            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-secondary/80 dark:bg-dark-bg-primary/80 backdrop-blur-sm"
                        >
                            <Spinner size="lg" variant="ring" />
                            <p className="mt-4 text-lg font-bold text-text-primary dark:text-dark-text-primary">Loading content...</p>
                            <Button variant="text" onClick={() => setOverlayVisible(false)} className="mt-2">Close</Button>
                        </div>
                    )}
                </ComponentPreview>
                <CodeBlock code={fullPageLoaderCode} />
            </SubSection>

            <SubSection title="Props: <Spinner />">
                <div className="component-preview !p-0 !bg-transparent !border-none">
                    <PropsTable data={spinnerProps} />
                </div>
            </SubSection>
        </SectionContainer>
    );
};