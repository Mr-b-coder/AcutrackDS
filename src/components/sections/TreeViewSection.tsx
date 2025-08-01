// FILE: components/sections/TreeViewSection.tsx
// This section documents the Tree View component for displaying hierarchical data.

import React from 'react';
import {
    SectionContainer,
    ComponentPreview,
    SubSection,
    PropsTable,
    TreeView,
    Card,
} from '../Content.tsx';
import CodeBlock from '../CodeBlock.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';
import { PropDef, TreeNodeData } from '../../../types.ts';

const fileExplorerData: TreeNodeData[] = [
    {
        id: 'project',
        label: 'Project Root',
        icon: 'folder_open',
        children: [
            {
                id: 'src',
                label: 'src',
                icon: 'folder_open',
                children: [
                    {
                        id: 'components',
                        label: 'components',
                        icon: 'folder_open',
                        children: [
                            { id: 'button', label: 'Button.tsx', icon: 'code_blocks' },
                            { id: 'card', label: 'Card.tsx', icon: 'code_blocks' },
                        ],
                    },
                    { id: 'app', label: 'App.tsx', icon: 'code_blocks' },
                    { id: 'index', label: 'index.tsx', icon: 'code_blocks' },
                ],
            },
            {
                id: 'public',
                label: 'public',
                icon: 'folder_open',
                children: [
                    { id: 'index-html', label: 'index.html', icon: 'html' },
                    { id: 'favicon', label: 'favicon.ico', icon: 'image' },
                ],
            },
            { id: 'package', label: 'package.json', icon: 'description' },
            { id: 'readme', label: 'README.md', icon: 'article' },
        ],
    },
];

const orgChartData: TreeNodeData[] = [
    {
        id: 'ceo',
        label: 'CEO',
        icon: 'corporate_fare',
        children: [
            { id: 'vp-eng', label: 'VP of Engineering', icon: 'manage_accounts', children: [
                { id: 'dir-frontend', label: 'Director of Frontend', icon: 'groups', children: [
                    { id: 'lead-fe', label: 'Lead Frontend Engineer', icon: 'person' },
                    { id: 'sr-fe', label: 'Senior Frontend Engineer', icon: 'person' },
                ]},
                { id: 'dir-backend', label: 'Director of Backend', icon: 'groups', children: [
                     { id: 'lead-be', label: 'Lead Backend Engineer', icon: 'person' },
                ]},
            ]},
            { id: 'vp-prod', label: 'VP of Product', icon: 'manage_accounts', children: [
                { id: 'pm-1', label: 'Product Manager', icon: 'person' },
            ]},
        ],
    },
];

const categoriesData: TreeNodeData[] = [
    {
        id: 'electronics',
        label: 'Electronics',
        icon: 'devices',
        children: [
            { id: 'computers', label: 'Computers & Accessories', icon: 'laptop_mac', children: [
                { id: 'laptops', label: 'Laptops', icon: 'laptop_chromebook' },
                { id: 'monitors', label: 'Monitors', icon: 'desktop_windows' },
                { id: 'keyboards', label: 'Keyboards', icon: 'keyboard' },
            ]},
            { id: 'audio', label: 'Audio', icon: 'headphones', children: [
                { id: 'headphones', label: 'Headphones', icon: 'headset' },
                { id: 'speakers', label: 'Speakers', icon: 'speaker' },
            ]},
        ],
    },
    {
        id: 'books',
        label: 'Books',
        icon: 'menu_book',
        children: [
            { id: 'fiction', label: 'Fiction', icon: 'auto_stories' },
            { id: 'non-fiction', label: 'Non-Fiction', icon: 'auto_stories' },
        ]
    },
];

const treeViewProps: PropDef[] = [
    { name: 'data', type: 'TreeNodeData[]', default: '[]', description: 'An array of node objects representing the root of the tree.' },
    { name: 'className', type: 'string', default: '""', description: 'Optional CSS classes for the root `<ul>` element.' },
];

const treeNodeDataType = `interface TreeNodeData {
  id: string;
  label: string;
  icon?: string;
  children?: TreeNodeData[];
}`;

const fileExplorerCode = `import { TreeView } from './Content.tsx';
/* ... see data structure below ... */

<TreeView data={fileExplorerData} />
`;

const orgChartCode = `const orgChartData = [
  { id: 'ceo', label: 'CEO', icon: 'corporate_fare',
    children: [ { id: 'vp-eng', label: 'VP of Engineering', /*...*/ } ]
  }
];

<TreeView data={orgChartData} />
`;

const categoriesCode = `const categoriesData = [
  { id: 'electronics', label: 'Electronics', icon: 'devices',
    children: [ { id: 'computers', label: 'Computers & Accessories', /*...*/ } ]
  },
  { id: 'books', label: 'Books', icon: 'menu_book', /*...*/ }
];

<TreeView data={categoriesData} />
`;

export const TreeViewSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => {
    return (
        <SectionContainer id={id}>
            <Breadcrumb group={groupTitle} section={sectionTitle} />
            <h2 className="section-title">Tree View</h2>
            <p className="section-subtitle">
                A Tree View is used to represent a hierarchical structure of items, such as a file system, organizational chart, or nested categories. It allows users to explore the hierarchy by expanding and collapsing nodes.
            </p>
            
            <SubSection title="File Explorer Example">
                <ComponentPreview>
                    <Card isInteractive={false} className="w-full max-w-md p-4">
                        <TreeView data={fileExplorerData} />
                    </Card>
                </ComponentPreview>
                <CodeBlock code={fileExplorerCode} />
            </SubSection>
            
            <SubSection title="Organizational Chart Example">
                 <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    Demonstrates a corporate hierarchy with role-specific icons.
                </p>
                <ComponentPreview>
                    <Card isInteractive={false} className="w-full max-w-md p-4">
                        <TreeView data={orgChartData} />
                    </Card>
                </ComponentPreview>
                <CodeBlock code={orgChartCode} />
            </SubSection>

            <SubSection title="Nested Categories Example">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    Ideal for e-commerce sites or documentation with nested topics.
                </p>
                <ComponentPreview>
                    <Card isInteractive={false} className="w-full max-w-md p-4">
                        <TreeView data={categoriesData} />
                    </Card>
                </ComponentPreview>
                <CodeBlock code={categoriesCode} />
            </SubSection>

            <SubSection title="Data Structure">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    The `TreeView` component accepts an array of `TreeNodeData` objects. Each object can have an optional `children` array of the same type to create nested structures.
                </p>
                <CodeBlock code={treeNodeDataType} />
            </SubSection>

            <SubSection title="Props: <TreeView />">
                <PropsTable data={treeViewProps} />
            </SubSection>
        </SectionContainer>
    );
};