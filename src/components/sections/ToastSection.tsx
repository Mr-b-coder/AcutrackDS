// FILE: components/sections/ToastSection.tsx

import React from 'react';
import { SectionContainer, SubSection, ComponentPreview, Button, PropsTable } from '../Content.tsx';
import { Icon } from '../icons.tsx';
import CodeBlock from '../CodeBlock.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';
import { useToast } from '../Toast.tsx';

const toastSetupCode = `// 1. Wrap your application in the ToastProvider
// (This is already done in App.tsx)
import { ToastProvider } from './components/Toast';

const App = () => (
    <ToastProvider>
        <AppContent />
    </ToastProvider>
);
`;

const toastUsageCode = `// 2. Use the hook in any component
import { useToast } from './components/Toast';
import { Button } from './components/Content';

function MyComponent() {
    const toast = useToast();

    const showSuccess = () => {
        toast.showToast({
            variant: 'success',
            title: 'Profile Updated!',
            description: 'Your changes have been saved successfully.',
        });
    };
    
    const showError = () => {
        toast.showToast({
            variant: 'error',
            title: 'Upload Failed',
        });
    };

    return (
        <div>
            <Button onClick={showSuccess}>Show Success Toast</Button>
            <Button onClick={showError}>Show Error Toast</Button>
        </div>
    )
}
`;

export const ToastSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => {
    const toast = useToast();
    
    const handleSuccess = () => toast.showToast({
        variant: 'success',
        title: 'Profile Updated!',
        description: 'Your changes have been saved successfully.'
    });
    
    const handleError = () => toast.showToast({
        variant: 'error',
        title: 'Upload Failed',
        description: 'The server could not process your file. Please try again.'
    });
    
    const handleInfo = () => toast.showToast({
        variant: 'info',
        title: 'Heads up!',
        description: 'A new version of this app is available.'
    });

    return (
        <SectionContainer id={id}>
            <Breadcrumb group={groupTitle} section={sectionTitle} />
            <h2 className="section-title">Toasts</h2>
            <p className="section-subtitle">
                Toasts are small, non-intrusive notifications that provide feedback on a user's action. They appear temporarily and automatically dismiss, so they should be used for low-priority messages that don't require user interaction.
            </p>
            
            <SubSection title="Toast Demo">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    Click the buttons below to trigger different types of toasts. They will appear in the top-right corner of the screen.
                </p>
                <ComponentPreview>
                    <Button variant="primary" onClick={handleSuccess} leftIcon={<Icon>check</Icon>}>
                        Trigger Success
                    </Button>
                    <Button variant="secondary" onClick={handleError} leftIcon={<Icon>cancel</Icon>} className="!border-system-error !text-system-error hover:!bg-red-50 dark:hover:!bg-red-500/10">
                        Trigger Error
                    </Button>
                     <Button variant="secondary" onClick={handleInfo} leftIcon={<Icon>info</Icon>} className="!border-system-info !text-system-info hover:!bg-blue-50 dark:hover:!bg-blue-500/10">
                        Trigger Info
                    </Button>
                </ComponentPreview>
            </SubSection>

            <SubSection title="Implementation">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    To use the toast system, ensure your app is wrapped in the `ToastProvider`. Then, import and use the `useToast` hook inside any child component.
                </p>
                <h4 className="font-bold mb-2 text-text-primary dark:text-dark-text-primary">Step 1: Setup Provider</h4>
                <CodeBlock code={toastSetupCode} />
                <h4 className="font-bold mt-8 mb-2 text-text-primary dark:text-dark-text-primary">Step 2: Use Hook</h4>
                <CodeBlock code={toastUsageCode} />
            </SubSection>
        </SectionContainer>
    );
};