// FILE: components/sections/ProgressSection.tsx
// This section documents the Progress component for showing determinate loading states.

import React, { useState, useMemo } from 'react';
import {
    SectionContainer,
    ComponentPreview,
    SubSection,
    Progress,
    PropsTable,
    Slider,
    Radio,
    Checkbox
} from '../Content.tsx';
import type { ProgressProps } from '../Content.tsx';
import { PropDef } from '../../../types.ts';
import { Breadcrumb } from '../Breadcrumb.tsx';
import CodeBlock from '../CodeBlock.tsx';

const progressProps: PropDef[] = [
    { name: 'value', type: 'number', default: 'N/A', description: 'The current progress value (0-100).' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Sets the height of the progress bar.' },
    { name: 'color', type: "'primary' | 'success' | 'info' | 'warning' | 'error'", default: "'primary'", description: "Sets the color of the progress bar's fill." },
    { name: 'label', type: 'React.ReactNode', default: 'undefined', description: 'An optional label to display above the progress bar.' },
    { name: 'striped', type: 'boolean', default: 'false', description: 'If true, adds a static striped pattern to the fill.' },
    { name: 'animated', type: 'boolean', default: 'false', description: 'If true, animates the striped pattern.' },
];

export const ProgressSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => {
    const [value, setValue] = useState(65);
    const [size, setSize] = useState<ProgressProps['size']>('md');
    const [color, setColor] = useState<ProgressProps['color']>('primary');
    const [striped, setStriped] = useState(false);
    const [animated, setAnimated] = useState(false);
    const [showLabel, setShowLabel] = useState(true);

    const generatedCode = useMemo(() => {
        const props = [];
        props.push(`value={${value}}`);
        if (size !== 'md') props.push(`size="${size}"`);
        if (color !== 'primary') props.push(`color="${color}"`);
        if (showLabel) props.push(`label="${size!.charAt(0).toUpperCase() + size!.slice(1)} Progress"`);
        if (striped) props.push('striped');
        if (animated && striped) props.push('animated');

        const propsString = props.length > 0 ? `\n    ${props.join('\n    ')}\n` : '';
        return `<Progress${propsString}/>`;
    }, [value, size, color, showLabel, striped, animated]);

    return (
        <SectionContainer id={id}>
            <Breadcrumb group={groupTitle} section={sectionTitle} />
            <h2 className="section-title">Progress</h2>
            <p className="section-subtitle">Progress indicators are used to display the status of a lengthy operation with a known duration, such as a file upload. They provide users with clear feedback on how close the process is to completion.</p>

            <SubSection title="Interactive Workbench">
                 <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    Use the controls below to configure the Progress component and see the results instantly. The code snippet will update automatically.
                </p>
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Controls */}
                    <div className="lg:col-span-1 space-y-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Value</h4>
                            <Slider id="progress-wb-value" label="Progress Value" value={value} onChange={(e) => setValue(Number(e.target.value))} min={0} max={100} />
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Size</h4>
                            <div className="flex flex-col gap-2">
                                {(['sm', 'md', 'lg'] as Required<ProgressProps>['size'][]).map(s => (
                                    <Radio key={s} id={`progress-wb-size-${s}`} name="progress-wb-size" label={s!.charAt(0).toUpperCase() + s!.slice(1)} value={s} checked={size === s} onChange={() => setSize(s)} />
                                ))}
                            </div>
                        </div>
                         <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Color</h4>
                            <div className="flex flex-col gap-2">
                                {(['primary', 'success', 'info', 'warning', 'error'] as Required<ProgressProps>['color'][]).map(c => (
                                    <Radio key={c} id={`progress-wb-color-${c}`} name="progress-wb-color" label={c!.charAt(0).toUpperCase() + c!.slice(1)} value={c} checked={color === c} onChange={() => setColor(c)} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Modifiers</h4>
                            <div className="flex flex-col gap-3">
                                <Checkbox id="progress-wb-label" label="Show Label" checked={showLabel} onChange={(e) => setShowLabel(e.target.checked)} />
                                <Checkbox id="progress-wb-striped" label="Striped" checked={striped} onChange={(e) => setStriped(e.target.checked)} />
                                <Checkbox id="progress-wb-animated" label="Animated Stripes" checked={animated} onChange={(e) => setAnimated(e.target.checked)} disabled={!striped} />
                            </div>
                        </div>
                    </div>
                    {/* Preview */}
                    <div className="lg:col-span-2">
                        <ComponentPreview className="h-64 flex-col !items-stretch !justify-center">
                            <Progress
                                value={value}
                                size={size}
                                color={color}
                                label={showLabel ? `${size!.charAt(0).toUpperCase() + size!.slice(1)} Progress` : undefined}
                                striped={striped}
                                animated={animated && striped}
                            />
                        </ComponentPreview>
                        <CodeBlock code={generatedCode} />
                    </div>
                </div>
            </SubSection>

            <SubSection title="Props: <Progress />">
                <div className="component-preview !p-0">
                    <PropsTable data={progressProps} />
                </div>
            </SubSection>
        </SectionContainer>
    );
};