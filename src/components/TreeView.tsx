// FILE: components/TreeView.tsx
// This component displays hierarchical data in a tree structure.

import React, { useState } from 'react';
import { TreeViewProps } from '../../types.ts';
import { Icon } from './icons.tsx';

const TreeItem: React.FC<{ node: TreeNodeData }> = ({ node }) => {
    const [isOpen, setIsOpen] = useState(node.icon?.includes('open'));
    const hasChildren = node.children && node.children.length > 0;
    const handleToggle = () => { if (hasChildren) setIsOpen(!isOpen); };

    return (
        <li>
            <div
                onClick={handleToggle}
                className={`flex items-center gap-2 p-1.5 rounded-md cursor-pointer hover:bg-bg-tertiary dark:hover:bg-dark-bg-tertiary`}
            >
                {hasChildren && <Icon className={`transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}>chevron_right</Icon>}
                {!hasChildren && <div className="w-6 h-6"></div>}
                {node.icon && <Icon>{node.icon}</Icon>}
                <span>{node.label}</span>
            </div>
            {hasChildren && isOpen && (
                <ul className="pl-6 border-l ml-3 border-border-color dark:border-dark-border-color">
                    {node.children!.map(child => <TreeItem key={child.id} node={child} />)}
                </ul>
            )}
        </li>
    );
};
export const TreeView: React.FC<{ data: TreeNodeData[]; className?: string }> = ({ data, className = '' }) => (
    <ul className={`space-y-1 ${className}`}>
        {data.map(node => <TreeItem key={node.id} node={node} />)}
    </ul>
);
