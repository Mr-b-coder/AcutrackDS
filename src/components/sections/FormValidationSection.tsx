// FILE: components/sections/FormValidationSection.tsx
import React, { useState } from 'react';
import {
    SectionContainer,
    ComponentPreview,
    SubSection,
    Input,
    Checkbox,
    Button,
    Spinner,
} from '../Content.tsx';
import { useToast } from '../Toast.tsx';
import CodeBlock from '../CodeBlock.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';

const implementationCode = `import React, { useState } from 'react';
import { Input, Checkbox, Button, Spinner } from './Content.tsx';
import { useToast } from './Toast.tsx';

// 1. Define initial state
const initialFormData = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
};

// 2. The component with validation logic
function SignUpForm() {
    const toast = useToast();
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (formData.fullName.length < 2) newErrors.fullName = "Name must be at least 2 characters.";
        if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) newErrors.email = "Please enter a valid email address.";
        if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters.";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
        if (!formData.terms) newErrors.terms = "You must accept the terms and conditions.";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [id]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
            setIsSubmitting(false);
            toast.showToast({ variant: 'success', title: 'Account Created!' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Input 
                id="fullName"
                label="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
            />
            {/* ... other inputs ... */}
             <Checkbox
                id="terms"
                label="I accept the terms and conditions"
                checked={formData.terms}
                onChange={handleChange}
            />
            {errors.terms && <p className="text-sm text-system-error -mt-4">{errors.terms}</p>}

            <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
                {isSubmitting ? <Spinner color="white" /> : 'Create Account'}
            </Button>
        </form>
    );
}`;


// The actual form component for the live demo
const ValidatedSignUpForm: React.FC = () => {
    const toast = useToast();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (formData.fullName.length < 2) newErrors.fullName = "Name must be at least 2 characters.";
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email address.";
        if (formData.password.length < 8) {
             newErrors.password = "Password must be at least 8 characters long.";
        } else {
            if (!/[A-Z]/.test(formData.password)) newErrors.password = "Password must contain an uppercase letter.";
            if (!/[a-z]/.test(formData.password)) newErrors.password = "Password must contain a lowercase letter.";
            if (!/[0-9]/.test(formData.password)) newErrors.password = "Password must contain a number.";
        }
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
        if (!formData.terms) newErrors.terms = "You must accept the terms and conditions.";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsSubmitting(false);
            toast.showToast({
                variant: 'success',
                title: 'Account Created!',
                description: `Welcome, ${formData.fullName}!`
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Input
                id="fullName"
                label="Full Name"
                type="text"
                placeholder="Jane Doe"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
                disabled={isSubmitting}
            />
            <Input
                id="email"
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                disabled={isSubmitting}
            />
             <Input
                id="password"
                label="Password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                disabled={isSubmitting}
            />
             <Input
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                disabled={isSubmitting}
            />
            <div>
                 <Checkbox
                    id="terms"
                    label="I accept the terms and conditions"
                    checked={formData.terms}
                    onChange={handleChange}
                    disabled={isSubmitting}
                />
                {errors.terms && <p className="text-sm text-system-error mt-1">{errors.terms}</p>}
            </div>

            <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
                {isSubmitting ? (
                    <Spinner size="sm" color="white" />
                ) : (
                    'Create Account'
                )}
            </Button>
        </form>
    );
};


export const FormValidationSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => {
    return (
        <SectionContainer id="form-validation">
            <Breadcrumb group={groupTitle} section={sectionTitle} />
            <h2 className="section-title">Form Validation</h2>
            <p className="section-subtitle">
                Robust form validation is essential for collecting accurate data and providing a great user experience. This pattern demonstrates how to build validated forms using only React's built-in hooks, creating a lightweight and reliable solution.
            </p>

            <SubSection title="Live Validation Demo">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    This example demonstrates a complete sign-up form with real-time validation, error handling, and submission state management. Try submitting it with invalid data to see the error messages.
                </p>
                <ComponentPreview>
                    <div className="w-full max-w-md">
                        <ValidatedSignUpForm />
                    </div>
                </ComponentPreview>
            </SubSection>

            <SubSection title="Implementation Recipe">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    This pattern uses the `useState` hook to manage form data and errors. A `validate` function is called on submit to check the data and update the UI with any error messages.
                </p>
                <CodeBlock code={implementationCode} />
            </SubSection>

        </SectionContainer>
    );
};