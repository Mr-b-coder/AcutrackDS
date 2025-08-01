// FILE: components/sections/VoiceToneSection.tsx
import React from 'react';
import { SectionContainer, SubSection, Badge, Button } from '../Content.tsx';
import { Table } from '../Table.tsx';
import { Icon } from '../icons.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';

const toneExamples = [
    {
        context: 'Button Label',
        good: '"Create Project"',
        bad: '"Submit"',
        reason: 'Good labels are verb-driven and specific. Bad labels are vague and generic.'
    },
    {
        context: 'Confirmation Modal Title',
        good: '"Delete This Item?"',
        bad: '"Confirm Action"',
        reason: 'Good titles are direct questions that clearly state the consequence. Bad titles are ambiguous.'
    },
    {
        context: 'Empty State Description',
        good: '"Get started by creating your first project."',
        bad: '"Oops, it looks like there\'s nothing here! Better get to work!"',
        reason: 'Good copy is encouraging and provides a clear next step. Bad copy is overly casual and can sound condescending.'
    },
    {
        context: 'Error Message',
        good: '"This email is already in use. Please log in or use a different email."',
        bad: '"Error: Validation failed. User already exists."',
        reason: 'A good error message explains the problem in plain language and tells the user how to fix it. Bad messages expose internal jargon and are unhelpful.'
    },
    {
        context: 'Tooltip',
        good: '"Archive this conversation"',
        bad: '"Clicking this button will move the current conversation to the archive folder."',
        reason: 'Good tooltips are concise and provide just enough extra information. Bad tooltips are overly verbose.'
    },
];

export const VoiceToneSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => (
    <SectionContainer id={id}>
        <Breadcrumb group={groupTitle} section={sectionTitle} />
        <h2 className="section-title">Voice & Tone</h2>
        <p className="section-subtitle">
            How we communicate is as important as what we build. Our voice defines our brand's personality, while our tone adapts to the user's context. This guide helps ensure our UI copy is consistent, effective, and always aligned with our core principles.
        </p>

        <SubSection title="Our Three Principles">
            <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-bg-secondary dark:bg-dark-bg-secondary p-6 rounded-lg border border-border-color dark:border-dark-border-color">
                    <div className="flex items-center gap-3 mb-3">
                        <Icon className="!text-3xl text-brand-navy dark:text-dark-text-primary">verified_user</Icon>
                        <h3 className="font-bold font-heading text-text-primary dark:text-dark-text-primary text-xl">Professional</h3>
                    </div>
                    <p>We are authoritative, competent, and trustworthy. We use standard grammar and punctuation. We avoid slang, overly casual language, and excessive exclamation points.</p>
                </div>
                <div className="bg-bg-secondary dark:bg-dark-bg-secondary p-6 rounded-lg border border-brand-orange shadow-lg">
                    <div className="flex items-center gap-3 mb-3">
                        <Icon className="!text-3xl text-brand-orange">search</Icon>
                        <h3 className="font-bold font-heading text-text-primary dark:text-dark-text-primary text-xl">Clear</h3>
                    </div>
                    <p>We are direct and unambiguous. We use simple words and write in the active voice. We avoid technical jargon whenever possible so that our message is accessible to everyone.</p>
                </div>
                <div className="bg-bg-secondary dark:bg-dark-bg-secondary p-6 rounded-lg border border-border-color dark:border-dark-border-color">
                     <div className="flex items-center gap-3 mb-3">
                        <Icon className="!text-3xl text-system-info">support_agent</Icon>
                        <h3 className="font-bold font-heading text-text-primary dark:text-dark-text-primary text-xl">Helpful</h3>
                    </div>
                    <p>We are supportive and aim to guide the user. We explain what happened and what to do next, especially in moments of confusion or error. We turn dead ends into guided paths.</p>
                </div>
            </div>
        </SubSection>

        <SubSection title="Examples in Practice">
             <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                The following table shows how to apply our voice principles in common UI scenarios.
            </p>
            <Table>
                <Table.Header>
                    <Table.HeadCell>Context</Table.HeadCell>
                    <Table.HeadCell>Do <Icon className="!text-base inline-block ml-1 text-system-success">check_circle</Icon></Table.HeadCell>
                    <Table.HeadCell>Don't <Icon className="!text-base inline-block ml-1 text-system-error">cancel</Icon></Table.HeadCell>
                    <Table.HeadCell>Reason</Table.HeadCell>
                </Table.Header>
                <Table.Body>
                    {toneExamples.map(example => (
                        <Table.Row key={example.context}>
                            <Table.Cell className="font-bold text-text-primary dark:text-dark-text-primary">{example.context}</Table.Cell>
                            <Table.Cell><code className="text-green-600 dark:text-green-400 bg-green-500/10 p-1 rounded-md">{example.good}</code></Table.Cell>
                            <Table.Cell><code className="text-red-600 dark:text-red-400 bg-red-500/10 p-1 rounded-md">{example.bad}</code></Table.Cell>
                            <Table.Cell>{example.reason}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </SubSection>
    </SectionContainer>
);