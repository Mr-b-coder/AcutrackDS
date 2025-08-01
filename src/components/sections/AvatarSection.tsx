// FILE: components/sections/AvatarSection.tsx
// This section documents the avatar component.

import React, { useState, useMemo } from 'react';
import { 
    SectionContainer, 
    ComponentPreview, 
    SubSection, 
    Avatar, 
    AvatarGroup, 
    PropsTable, 
    Radio, 
    Checkbox, 
    Input,
    Slider,
    AvatarProps
} from '../Content.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';
import CodeBlock from '../CodeBlock.tsx';
import { PropDef } from '../../types.ts';

const avatarProps: PropDef[] = [
    { name: 'src', type: 'string', default: 'N/A', description: 'The URL of the user\'s image.' },
    { name: 'name', type: 'string', default: '""', description: 'The user\'s name, used for generating initials as a fallback.' },
    { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'The size of the avatar.' },
    { name: 'status', type: "'online' | 'offline' | 'away'", default: 'N/A', description: 'If present, displays a status indicator dot.' },
    { name: 'className', type: 'string', default: '""', description: 'Optional additional CSS classes for the avatar wrapper.' },
];

const avatarGroupProps: PropDef[] = [
    { name: 'children', type: 'React.ReactNode', default: 'N/A', description: 'A list of <Avatar /> components to display in the group.' },
    { name: 'max', type: 'number', default: '4', description: 'Maximum number of avatars to show before collapsing into a "+N" count.' },
    { name: 'className', type: 'string', default: '""', description: 'Optional additional CSS classes for the group wrapper.' },
];

const dummyUsers = [
    { name: 'Alex Ray', src: 'https://i.pravatar.cc/48?u=a' },
    { name: 'Beth Ray', src: 'https://i.pravatar.cc/48?u=b' },
    { name: 'Casey Ray', src: 'https://i.pravatar.cc/48?u=c' },
    { name: 'Drew Ray', src: 'https://i.pravatar.cc/48?u=d' },
    { name: 'Eli Ray', src: 'https://i.pravatar.cc/48?u=e' },
    { name: 'Fay Green', src: 'https://i.pravatar.cc/48?u=f' },
    { name: 'Gia Hill', src: 'https://i.pravatar.cc/48?u=g' },
    { name: 'Ian Jones', src: 'https://i.pravatar.cc/48?u=h' },
];

export const AvatarSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({groupTitle, sectionTitle, id}) => {
    // State for Avatar workbench
    const [size, setSize] = useState<AvatarProps['size']>('lg');
    const [name, setName] = useState('Jane Doe');
    const [showImage, setShowImage] = useState(true);
    const [status, setStatus] = useState<AvatarProps['status']>('online');
    
    // State for AvatarGroup workbench
    const [numAvatars, setNumAvatars] = useState(6);
    const [maxAvatars, setMaxAvatars] = useState(4);
    
    const generatedAvatarCode = useMemo(() => {
        const props = [];
        if (size !== 'md') props.push(`size="${size}"`);
        if (showImage) props.push(`src="https://i.pravatar.cc/96?u=jane"`);
        props.push(`name="${name}"`);
        if (status) props.push(`status="${status}"`);
        
        const propsString = props.length > 0 ? `\n    ${props.join('\n    ')}\n` : '';
        return `<Avatar${propsString}/>`;
    }, [size, name, showImage, status]);
    
    const generatedGroupCode = useMemo(() => {
        const avatars = Array.from({ length: numAvatars }).map((_, i) => 
            `    <Avatar name="${dummyUsers[i % dummyUsers.length].name}" src="${dummyUsers[i % dummyUsers.length].src}" />`
        ).join('\n');

        return `<AvatarGroup max={${maxAvatars}}>
${avatars}
</AvatarGroup>`;
    }, [numAvatars, maxAvatars]);

    return (
        <SectionContainer id={id}>
            <Breadcrumb group={groupTitle} section={sectionTitle} />
            <h2 className="section-title">Avatars</h2>
            <p className="section-subtitle">Avatars are used to represent users or brands. Our component supports image sources, falls back gracefully to user initials, and can be combined into stacked groups.</p>
            
            <SubSection title="Interactive Avatar Workbench">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    Configure a single avatar's properties and see the results instantly. The fallback to initials appears if you uncheck "Show Image".
                </p>
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Controls */}
                    <div className="lg:col-span-1 space-y-6">
                        <div>
                            <Input
                                label="Name (for initials)"
                                id="avatar-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Size</h4>
                            <div className="flex flex-col gap-2">
                                {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(s => (
                                    <Radio key={s} id={`avatar-size-${s}`} name="avatar-size" label={s.toUpperCase()} value={s} checked={size === s} onChange={() => setSize(s)} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Status</h4>
                            <div className="flex flex-col gap-2">
                                <Radio id="avatar-status-none" name="avatar-status" label="None" value="none" checked={!status} onChange={() => setStatus(undefined)} />
                                {(['online', 'away', 'offline'] as const).map(st => (
                                    <Radio key={st} id={`avatar-status-${st}`} name="avatar-status" label={st.charAt(0).toUpperCase() + st.slice(1)} value={st} checked={status === st} onChange={() => setStatus(st)} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <Checkbox id="avatar-show-image" label="Show Image" checked={showImage} onChange={(e) => setShowImage(e.target.checked)} />
                        </div>
                    </div>
                    {/* Preview */}
                    <div className="lg:col-span-2">
                        <ComponentPreview className="h-48">
                            <Avatar 
                                size={size}
                                name={name}
                                src={showImage ? 'https://i.pravatar.cc/96?u=jane' : undefined}
                                status={status}
                            />
                        </ComponentPreview>
                        <CodeBlock code={generatedAvatarCode} />
                    </div>
                </div>
            </SubSection>

            <SubSection title="Interactive AvatarGroup Workbench">
                 <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    Use the `AvatarGroup` component to stack multiple avatars. Adjust the sliders to see how the `max` prop controls the collapsing behavior.
                </p>
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 space-y-6">
                        <div>
                             <Slider 
                                id="num-avatars"
                                label="Number of Avatars in Group"
                                value={numAvatars}
                                onChange={(e) => setNumAvatars(Number(e.target.value))}
                                min={1}
                                max={8}
                             />
                        </div>
                        <div>
                             <Slider 
                                id="max-avatars"
                                label="Max Avatars to Show"
                                value={maxAvatars}
                                onChange={(e) => setMaxAvatars(Number(e.target.value))}
                                min={1}
                                max={8}
                             />
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <ComponentPreview className="h-48">
                            <AvatarGroup max={maxAvatars}>
                                {dummyUsers.slice(0, numAvatars).map((user, i) => (
                                    <Avatar key={i} name={user.name} src={user.src} />
                                ))}
                            </AvatarGroup>
                        </ComponentPreview>
                        <CodeBlock code={generatedGroupCode} />
                    </div>
                </div>
            </SubSection>

            <SubSection title="Component Props">
                 <div className="space-y-12">
                     <div>
                        <h4 className="font-bold mb-2 text-text-primary dark:text-dark-text-primary">{'<Avatar />'}</h4>
                        <div className="component-preview !p-0 !bg-transparent !border-none"><PropsTable data={avatarProps} /></div>
                    </div>
                     <div>
                        <h4 className="font-bold mb-2 text-text-primary dark:text-dark-text-primary">{'<AvatarGroup />'}</h4>
                        <div className="component-preview !p-0 !bg-transparent !border-none"><PropsTable data={avatarGroupProps} /></div>
                    </div>
                </div>
            </SubSection>
        </SectionContainer>
    );
};