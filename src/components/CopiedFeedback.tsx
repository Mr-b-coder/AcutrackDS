// FILE: components/CopiedFeedback.tsx
// This component displays a "Copied" message, typically used with clipboard actions.

import React from 'react';
import { Icon } from './icons.tsx';

export const CopiedFeedback: React.FC<{overlay?: boolean}> = ({overlay = true}) => (
    <div className={`absolute inset-0 flex items-center justify-center rounded-lg ${overlay ? 'bg-black/60 backdrop-blur-sm' : ''}`}>
        <span className="flex items-center gap-1.5 rounded-full bg-system-success px-2 py-1 text-xs font-bold text-white">
            <Icon className="!text-base">check</Icon>
            Copied
        </span>
    </div>
);
