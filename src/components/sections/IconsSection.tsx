// FILE: components/sections/IconsSection.tsx
// This section displays the full library of available icons.

import React, { useState, useMemo } from 'react';
import { SectionContainer, ComponentPreview, SubSection, Input, CopiedFeedback, EmptyState } from '../Content.tsx';
import { useCopyToClipboard, Icon } from '../icons.tsx';
import CodeBlock from '../CodeBlock.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';

const googleIconsCode = `// Use the <Icon> component for all general UI needs
import { Icon } from './components/icons';

<Icon>search</Icon>
<Icon>settings</Icon>
<Icon className="text-system-error">delete</Icon>`;

const sizingCode = `// Rule 1: Inline with text (icon inherits text size)
<p className="text-lg flex items-center gap-2">
  <Icon>info</Icon>
  <span>Informational Text</span>
</p>

// Rule 3: Standalone icon button (explicit size & accessible label)
<button 
  className="p-2.5 rounded-md hover:bg-bg-tertiary dark:hover:bg-dark-bg-tertiary"
  aria-label="Open settings"
>
  <Icon className="!text-2xl">settings</Icon>
</button>
`;

// A curated list of commonly used icons.
const iconList = [
  'search', 'home', 'settings', 'delete', 'edit', 'add', 'remove', 'close', 'menu', 'check', 'more_vert',
  'check_circle', 'cancel', 'info', 'warning', 'help', 'visibility', 'visibility_off', 'content_copy', 'link',
  'attach_file', 'arrow_back', 'arrow_forward', 'expand_more', 'expand_less', 'chevron_right', 'chevron_left',
  'person', 'group', 'account_circle', 'email', 'call', 'place', 'shopping_cart', 'credit_card', 'receipt_long',
  'storefront', 'book', 'play_circle', 'article', 'support_agent', 'dark_mode', 'light_mode', 'logout', 'login',
  'download', 'upload', 'cloud_upload', 'folder', 'star', 'favorite', 'search_off', 'draft', 'cloudy', 'edit_square',
  'layers', 'navigation', 'grid_view', 'dashboard_customize', 'integration_instructions', 'architecture'
];

const IconCard: React.FC<{ name: string }> = ({ name }) => {
    const [copy, isCopied] = useCopyToClipboard();
    
    return (
        <button 
            onClick={() => copy(name)}
            className="relative flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-bg-secondary dark:bg-dark-bg-tertiary border border-border-color dark:border-dark-border-color text-center group hover:border-brand-orange hover:-translate-y-1 transition-all"
        >
            <Icon className="!text-4xl text-text-primary dark:text-dark-text-primary transition-colors">{name}</Icon>
            <span className="font-mono text-xs text-text-secondary dark:text-dark-text-secondary truncate w-full">{name}</span>
            {isCopied && <CopiedFeedback overlay={true} />}
        </button>
    );
}

export const IconsSection: React.FC<{ groupTitle: string; sectionTitle: string; }> = ({ groupTitle, sectionTitle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredIcons = useMemo(() => {
    if (!searchQuery) {
        return iconList;
    }
    return iconList.filter(icon => icon.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  return (
    <SectionContainer id="iconography">
      <Breadcrumb group={groupTitle} section={sectionTitle} />
      <h2 className="section-title">Iconography</h2>
      <p className="section-subtitle">Our system uses Google's <a href="https://fonts.google.com/icons" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-orange hover:underline dark:text-dark-brand-orange dark:hover:text-dark-brand-orange-hover">Material Symbols</a> to ensure a consistent and scalable visual language. The interactive library below allows you to quickly find and copy the icons you need.</p>
      
      <SubSection title="Searchable Icon Library">
         <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
           Search for an icon below. Click any icon to copy its name to your clipboard.
         </p>
         <div className="mb-8">
            <Input 
                id="icon-search"
                label="Search Icons"
                type="text"
                placeholder="e.g. 'delete' or 'arrow'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
         </div>
        <ComponentPreview className="!bg-transparent !p-0 !border-none">
            {filteredIcons.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {filteredIcons.map(icon => <IconCard key={icon} name={icon} />)}
                </div>
            ) : (
                <EmptyState
                    icon="search_off"
                    title="No icons found"
                    description={`Your search for "${searchQuery}" did not return any results. Please try a different term.`}
                />
            )}
        </ComponentPreview>
      </SubSection>

      <SubSection title="Usage & Sizing">
         <div className="prose prose-sm dark:prose-invert max-w-none mb-4">
            <p>Always use the reusable <code>{'<Icon>'}</code> component to render icons. This ensures they inherit styles correctly. To maintain visual consistency, icon sizes should be determined by their context:</p>
            <ul className="list-disc pl-5 space-y-2">
                <li><strong>Inline with Text:</strong> When an icon is next to text, it should match the text's font size. The <code>{'<Icon>'}</code> component does this automatically.</li>
                <li><strong>Component-Driven:</strong> For components like <code>{'<Button>'}</code>, the icon size is handled automatically based on the button's `size` prop.</li>
                <li><strong>Standalone Icons:</strong> For icon-only buttons, the icon's size and the button's padding work together to create a balanced touch target. Use explicit padding and font-size classes as demonstrated.</li>
            </ul>
        </div>
        <CodeBlock code={sizingCode} />
      </SubSection>
      
      <SubSection title="Best Practices">
        <div className="prose prose-sm dark:prose-invert max-w-none">
             <ul>
                <li><strong>DO:</strong> Provide an <code>aria-label</code> on icon-only buttons to describe the action for screen reader users.</li>
                <li><strong>DON'T:</strong> Use icons for pure decoration if they don't add meaning. If they are decorative, hide them from screen readers with <code>aria-hidden="true"</code>.</li>
                 <li><strong>DO:</strong> Use the <code>{'<Icon>'}</code> component to ensure all icons are from the Material Symbols library.</li>
                 <li><strong>DON'T:</strong> Mix and match icon families (e.g., Font Awesome, Heroicons) as this creates visual inconsistency.</li>
            </ul>
        </div>
      </SubSection>

    </SectionContainer>
  );
};