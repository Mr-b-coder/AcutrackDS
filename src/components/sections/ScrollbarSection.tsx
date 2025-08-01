// FILE: components/sections/ScrollbarSection.tsx

import React from 'react';
import { SectionContainer, SubSection, ComponentPreview, BrowserCompatibility } from '../Content.tsx';
import { Icon } from '../icons.tsx';
import CodeBlock from '../CodeBlock.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';

const scrollbarCode = `/* in index.html */
@layer components {
  /* For Firefox */
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #DFE4E9 #F6F8FD;
  }
  .dark .custom-scrollbar {
    scrollbar-color: #1F3A61 #0A1931;
  }

  /* For Webkit */
  .custom-scrollbar::-webkit-scrollbar { @apply w-2; }
  .custom-scrollbar::-webkit-scrollbar-track { @apply bg-bg-tertiary/50 dark:bg-dark-bg-primary; }
  .custom-scrollbar::-webkit-scrollbar-thumb { @apply rounded-full bg-brand-navy/30 dark:bg-dark-bg-tertiary; }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover { @apply bg-brand-navy/50 dark:bg-dark-bg-secondary; }
}

/* In your component */
<div className="h-64 overflow-y-auto custom-scrollbar">
  {/* scrollable content */}
</div>
`;

export const ScrollbarSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => (
    <SectionContainer id={id}>
        <Breadcrumb group={groupTitle} section={sectionTitle} />
        <h2 className="section-title">Scrollbars</h2>
        <p className="section-subtitle">
            To create a fully immersive and consistent brand experience, we've implemented custom scrollbar styles. These styles are applied globally to the main content area and sidebar, but can also be used on any scrollable container.
        </p>
        
        <SubSection title="Custom Scrollbar Demo">
             <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                Add the <code>custom-scrollbar</code> class to any element with <code>overflow-auto</code> or <code>overflow-y-auto</code> to apply the theme-aware scrollbar styles.
            </p>
            <ComponentPreview>
                <div className="h-64 w-full max-w-md overflow-y-auto custom-scrollbar rounded-lg border border-border-color dark:border-dark-border-color bg-bg-primary dark:bg-dark-bg-primary p-4">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                        <p>This container has a custom scrollbar. It's subtle, branded, and works in both light and dark modes.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.</p>
                        <p>Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales.</p>
                        <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam. Proin magna. Sed in lacus ut enim adipiscing aliquet. Nulla venenatis. In pede mi, aliquet sit amet, euismod in, auctor ut, ligula.</p>
                        <p>Aliquam dapibus tincidunt metus. Praesent justo dolor, lobortis quis, lobortis dignissim, pulvinar ac, lorem. Vestibulum sed ante. Donec sagittis euismod purus. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                    </div>
                </div>
            </ComponentPreview>
            <CodeBlock code={scrollbarCode} />
            <BrowserCompatibility>
                The custom scrollbar styling uses <code>-webkit-</code> prefixes and is fully supported in Chrome, Safari, and Edge. A simpler, themed fallback is provided for Firefox.
            </BrowserCompatibility>
        </SubSection>
    </SectionContainer>
);