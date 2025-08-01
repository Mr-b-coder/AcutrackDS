// FILE: components/PropsTable.tsx
// This component renders a table for displaying component prop definitions.

import React from 'react';
import { PropDef } from '../../types.ts';

export const PropsTable: React.FC<{data: PropDef[]}> = ({data}) => (
    <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
            <thead className="border-b border-border-color dark:border-dark-border-color">
                <tr>
                    <th className="p-3 text-sm font-bold text-text-primary dark:text-dark-text-primary">Prop</th>
                    <th className="p-3 text-sm font-bold text-text-primary dark:text-dark-text-primary">Type</th>
                    <th className="p-3 text-sm font-bold text-text-primary dark:text-dark-text-primary">Default</th>
                    <th className="p-3 text-sm font-bold text-text-primary dark:text-dark-text-primary">Description</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-border-color dark:divide-dark-border-color">
                {data.map(prop => (
                     <tr key={prop.name}>
                        <td className="p-3 font-mono text-sm text-brand-orange">{prop.name}</td>
                        <td className="p-3 font-mono text-sm text-text-secondary dark:text-dark-text-secondary">{prop.type}</td>
                        <td className="p-3 font-mono text-sm text-text-secondary dark:text-dark-text-secondary">{prop.default}</td>
                        <td className="p-3 text-sm text-text-secondary dark:text-dark-text-secondary">{prop.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
