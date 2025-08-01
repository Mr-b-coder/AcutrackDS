// FILE: components/sections/IntroductionSection.tsx
// This section provides a welcome message and overview of the design system.

import React from 'react';
import { SectionContainer } from '../Content.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';

export const IntroductionSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => (
    <SectionContainer id={id} centerContent>
        <div>
            <Breadcrumb group={groupTitle} section={sectionTitle} />
            <h2 className="section-title !mb-2">Introduction</h2>
            <p className="section-subtitle">Welcome to the Acutrack Design System. This is the single source of truth for our brand identity, user interface components, and foundational design principles. Its purpose is to ensure we build cohesive, high-quality, and consistent user experiences efficiently across all our digital products.</p>
        </div>
    </SectionContainer>
);