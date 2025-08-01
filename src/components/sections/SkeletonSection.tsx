// FILE: components/sections/SkeletonSection.tsx

import React, { useState, useMemo } from 'react';
import { SectionContainer, SubSection, ComponentPreview, Skeleton, PropsTable, Card, Slider, Checkbox } from '../Content.tsx';
import CodeBlock from '../CodeBlock.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';
import { PropDef } from '../../../types.ts';

const skeletonProps: PropDef[] = [
    { name: 'height', type: 'string | number', default: 'N/A', description: 'Sets the height of the skeleton element (e.g., "1rem", 16).' },
    { name: 'width', type: 'string | number', default: 'N/A', description: 'Sets the width of the skeleton element (e.g., "100%", 200).' },
    { name: 'className', type: 'string', default: "''", description: "Additional classes for styling, e.g., 'rounded-full' for circles." },
];

const skeletonCode = `import { Skeleton } from './Content.tsx';

// A circular skeleton
<Skeleton className="rounded-full" height={48} width={48} />

// A text-line skeleton
<Skeleton height="1rem" width="80%" />
`;

const cardSkeletonCode = `import { Skeleton, Card } from './Content.tsx';

<Card className="max-w-sm" disabled>
    <Skeleton height={192} width="100%" className="!rounded-b-none" />
    <Card.Body>
        <Skeleton height="1.25rem" width="60%" className="mb-4" />
        <Skeleton height="1rem" width="90%" />
        <Skeleton height="1rem" width="80%" className="mt-2" />
    </Card.Body>
</Card>
`;


export const SkeletonSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => {
    const [showAvatar, setShowAvatar] = useState(true);
    const [numLines, setNumLines] = useState(2);
    const [showAction, setShowAction] = useState(false);

    const generatedListCode = useMemo(() => {
        const avatarCode = `    <Skeleton className="rounded-full shrink-0" height={48} width={48} />\n`;
        
        const linesCode = Array.from({ length: numLines }).map((_, i) => 
            `        <Skeleton height="1rem" width="${i === 0 ? '50%' : '80%'}" />`
        ).join('\n');
        
        const textBlockCode = `    <div className="flex-grow space-y-2">\n${linesCode}\n    </div>\n`;

        const actionCode = `    <Skeleton height={36} width={80} className="shrink-0" />\n`;

        let finalCode = `<div className="flex items-center gap-4 p-4 w-full">\n`;
        if (showAvatar) finalCode += avatarCode;
        finalCode += textBlockCode;
        if (showAction) finalCode += actionCode;
        finalCode += `</div>`;

        return finalCode;
    }, [showAvatar, numLines, showAction]);
    
    return (
        <SectionContainer id={id}>
            <Breadcrumb group={groupTitle} section={sectionTitle} />
            <h2 className="section-title">Skeletons</h2>
            <p className="section-subtitle">
                Skeleton loaders provide a better user experience than traditional spinners for content-heavy areas. They show a preview of the upcoming content, which reduces cognitive load and makes the app feel faster and more responsive.
            </p>

            <SubSection title="Basic Shapes">
                 <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    The `Skeleton` component can be shaped using standard Tailwind CSS classes.
                </p>
                <ComponentPreview>
                    <div className="flex flex-col items-start gap-4 w-full max-w-xs">
                        <Skeleton className="rounded-full" height={48} width={48} />
                        <Skeleton height="1.25rem" width="60%" />
                        <Skeleton height="1rem" width="100%" />
                        <Skeleton height="1rem" width="80%" />
                    </div>
                </ComponentPreview>
                <CodeBlock code={skeletonCode} />
            </SubSection>
            
            <SubSection title="Interactive Skeleton Composer">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                   Use the controls to compose a skeleton for a common list item pattern and see the code update in real-time.
                </p>
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Controls */}
                    <div className="lg:col-span-1 space-y-6">
                         <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Elements</h4>
                            <div className="flex flex-col gap-3 p-4 rounded-lg bg-bg-secondary dark:bg-dark-bg-secondary border border-border-color dark:border-dark-border-color">
                                <Checkbox
                                    id="skeleton-avatar"
                                    label="Show Avatar"
                                    checked={showAvatar}
                                    onChange={(e) => setShowAvatar(e.target.checked)}
                                />
                                <Checkbox
                                    id="skeleton-action"
                                    label="Show Action Button"
                                    checked={showAction}
                                    onChange={(e) => setShowAction(e.target.checked)}
                                />
                            </div>
                        </div>
                        <div>
                             <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Content Lines</h4>
                            <div className="p-4 rounded-lg bg-bg-secondary dark:bg-dark-bg-secondary border border-border-color dark:border-dark-border-color">
                               <Slider
                                    id="skeleton-lines"
                                    label="Number of Text Lines"
                                    value={numLines}
                                    onChange={(e) => setNumLines(Number(e.target.value))}
                                    min={1}
                                    max={4}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Preview */}
                    <div className="lg:col-span-2">
                        <ComponentPreview className="!items-start !justify-start">
                             <div className="flex items-center gap-4 p-4 rounded-lg bg-bg-secondary dark:bg-dark-bg-secondary w-full max-w-md border border-border-color dark:border-dark-border-color">
                                {showAvatar && <Skeleton className="rounded-full shrink-0" height={48} width={48} />}
                                <div className="flex-grow space-y-2">
                                    {Array.from({ length: numLines }).map((_, i) => (
                                         <Skeleton key={i} height="1rem" width={i === 0 ? '50%' : '80%'} />
                                    ))}
                                </div>
                                {showAction && <Skeleton height={36} width={80} className="shrink-0" />}
                            </div>
                        </ComponentPreview>
                        <CodeBlock code={generatedListCode} />
                    </div>
                </div>
            </SubSection>

            <SubSection title="Composed Skeleton: Card">
                 <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    Combine multiple `Skeleton` components to create a placeholder that mimics your actual UI. This provides the best user experience.
                </p>
                <ComponentPreview>
                    <Card className="w-full max-w-sm" disabled>
                        <Skeleton height={192} width="100%" className="!rounded-b-none" />
                        <Card.Body>
                            <Skeleton height="1.25rem" width="60%" className="mb-4" />
                            <Skeleton height="1rem" width="90%" />
                            <Skeleton height="1rem" width="80%" className="mt-2" />
                        </Card.Body>
                    </Card>
                </ComponentPreview>
                <CodeBlock code={cardSkeletonCode} />
            </SubSection>

            <SubSection title="Props: <Skeleton />">
                <PropsTable data={skeletonProps} />
            </SubSection>
        </SectionContainer>
    );
};