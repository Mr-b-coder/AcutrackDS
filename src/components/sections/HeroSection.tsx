// FILE: components/sections/HeroSection.tsx
// This section showcases different hero components for landing pages.

import React from 'react';
import { SectionContainer, ComponentPreview, SubSection, Button, PropsTable } from '../Content.tsx';
import CodeBlock from '../CodeBlock.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';
import { PropDef } from '../../../types.ts';
import { Icon } from '../icons.tsx';


// --- LOCAL HERO COMPONENTS ---

interface CenteredHeroProps {
    headline: React.ReactNode;
    subtitle: React.ReactNode;
    ctaPrimary: { text: string; href: string; };
    ctaSecondary?: { text: string; href: string; };
    imageUrl?: string;
    videoUrl?: string;
    posterUrl?: string;
}

const CenteredHero: React.FC<CenteredHeroProps> = ({ headline, subtitle, ctaPrimary, ctaSecondary, imageUrl, videoUrl, posterUrl }) => (
    <div className="relative w-full h-[70vh] rounded-lg overflow-hidden bg-brand-navy flex items-center justify-center">
        {videoUrl && (
             <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="absolute z-0 w-full h-full object-cover"
                poster={posterUrl}
            >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        )}
        {imageUrl && !videoUrl && (
            <div 
                className="absolute z-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${imageUrl})` }} 
            />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent z-10" />
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white p-8">
            <h1 className="font-heading text-4xl md:text-6xl font-extrabold">{headline}</h1>
            <p className="max-w-3xl mt-4 text-lg md:text-xl opacity-90">{subtitle}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button as="a" href={ctaPrimary.href} variant="primary" size="lg">{ctaPrimary.text}</Button>
                {ctaSecondary && <Button as="a" href={ctaSecondary.href} variant="secondary" size="lg" className="!bg-transparent !border-white !text-white hover:!bg-white/10">{ctaSecondary.text}</Button>}
            </div>
        </div>
    </div>
);

interface SplitHeroProps {
    headline: React.ReactNode;
    subtitle: React.ReactNode;
    cta: { text: string; href: string; icon?: React.ReactElement };
    imageUrl: string;
    imageAlt: string;
    reverse?: boolean;
}

const SplitHero: React.FC<SplitHeroProps> = ({ headline, subtitle, cta, imageUrl, imageAlt, reverse = false }) => (
     <div className="grid grid-cols-1 md:grid-cols-2 items-center bg-bg-secondary dark:bg-dark-bg-secondary rounded-lg overflow-hidden border border-border-color dark:border-dark-border-color min-h-[60vh]">
        <div className={`p-8 md:p-12 lg:p-16 ${reverse ? 'md:order-2' : 'md:order-1'} relative h-full flex flex-col justify-center`}>
            {/* Subtle background pattern */}
            <div 
                className="absolute inset-0 bg-repeat"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, var(--tw-color-bg-tertiary) 1px, transparent 0)',
                    backgroundSize: '1rem 1rem',
                    opacity: '0.5'
                }}
            />
             <div className="relative">
                <h2 className="font-heading text-4xl md:text-5xl text-text-primary dark:text-dark-text-primary">{headline}</h2>
                <p className="mt-4 text-lg max-w-md text-text-secondary dark:text-dark-text-secondary">{subtitle}</p>
                <Button as="a" href={cta.href} variant="primary" size="lg" className="mt-8" rightIcon={cta.icon}>{cta.text}</Button>
             </div>
        </div>
        <div className={`h-64 md:h-full ${reverse ? 'md:order-1' : 'md:order-2'}`}>
            <img src={imageUrl} alt={imageAlt} className="object-cover w-full h-full" />
        </div>
    </div>
);


const centeredHeroProps: PropDef[] = [
    { name: 'headline', type: 'React.ReactNode', default: 'N/A', description: 'The main, large heading text.' },
    { name: 'subtitle', type: 'React.ReactNode', default: 'N/A', description: 'The supporting text below the headline.' },
    { name: 'ctaPrimary', type: '{ text: string; href: string; }', default: 'N/A', description: 'Object for the main call-to-action button.' },
    { name: 'ctaSecondary', type: '{ text: string; href: string; }', default: 'undefined', description: 'Object for the secondary call-to-action button.' },
    { name: 'imageUrl', type: 'string', default: 'undefined', description: 'URL for a static background image.' },
    { name: 'videoUrl', type: 'string', default: 'undefined', description: 'URL for a looping background video.' },
    { name: 'posterUrl', type: 'string', default: 'undefined', description: 'URL for a poster image for the video.' },
];

const splitHeroProps: PropDef[] = [
    { name: 'headline', type: 'React.ReactNode', default: 'N/A', description: 'The main heading text.' },
    { name: 'subtitle', type: 'React.ReactNode', default: 'N/A', description: 'The supporting text below the headline.' },
    { name: 'cta', type: '{ text: string; href: string; icon?: React.ReactElement }', default: 'N/A', description: 'Object for the call-to-action button.' },
    { name: 'imageUrl', type: 'string', default: 'N/A', description: 'URL for the image in the split view.' },
    { name: 'imageAlt', type: 'string', default: 'N/A', description: 'Accessible alt text for the image.' },
    { name: 'reverse', type: 'boolean', default: 'false', description: 'If true, the image appears on the left and text on the right on desktop.' },
];

const centeredImageCode = `<CenteredHero
    headline="Your Compelling Headline"
    subtitle="This is a supporting sentence that elaborates on the main value proposition."
    ctaPrimary={{ text: "Get Started", href: "#" }}
    ctaSecondary={{ text: "Learn More", href: "#" }}
    imageUrl="https://picsum.photos/seed/heroimage/1920/1080"
/>`;

const centeredVideoCode = `<CenteredHero
    headline="Dynamic Motion Background"
    subtitle="Engage users immediately with a full-width video that tells your story."
    ctaPrimary={{ text: "Watch Now", href: "#" }}
    videoUrl="https://videos.pexels.com/video-files/2099395/2099395-hd_1920_1080_25fps.mp4"
    posterUrl="https://picsum.photos/seed/videoposter/1920/1080"
/>`;

const splitHeroCode = `<SplitHero
    headline="Engage and Convert"
    subtitle="A powerful statement deserves a prime spot. Use this space to connect with your audience and drive action."
    cta={{ text: "Explore Features", href: "#", icon: <Icon>arrow_forward</Icon> }}
    imageUrl="https://picsum.photos/seed/split-hero/800/800"
    imageAlt="Professionals collaborating in an office"
/>`;


export const HeroSection: React.FC<{ groupTitle: string; sectionTitle: string; id:string; }> = ({ groupTitle, sectionTitle, id }) => (
    <SectionContainer id={id}>
        <Breadcrumb group={groupTitle} section={sectionTitle} />
        <h2 className="section-title">Hero</h2>
        <p className="section-subtitle">
            The hero section is the first thing a user sees and is critical for making a strong impression. These components are designed to be bold, engaging, and clear, featuring a prominent call-to-action.
        </p>

        <SubSection title="Centered Hero">
            <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                The most common hero layout. Features a large background image or video with centered text and calls-to-action. A gradient overlay ensures text is always readable.
            </p>
            <ComponentPreview className="!p-0">
                <CenteredHero
                    headline="Your Compelling Headline"
                    subtitle="This is a supporting sentence that elaborates on the main value proposition."
                    ctaPrimary={{ text: "Get Started", href: "#" }}
                    ctaSecondary={{ text: "Learn More", href: "#" }}
                    imageUrl="https://picsum.photos/seed/heroimage/1920/1080"
                />
            </ComponentPreview>
            <CodeBlock code={centeredImageCode} />
        </SubSection>
        
        <SubSection title="Video Hero">
            <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                The same `CenteredHero` component can be used with a `videoUrl` to create a more dynamic, engaging experience.
            </p>
            <ComponentPreview className="!p-0">
                 <CenteredHero
                    headline="Dynamic Motion Background"
                    subtitle="Engage users immediately with a full-width video that tells your story."
                    ctaPrimary={{ text: "Watch Now", href: "#" }}
                    videoUrl="https://videos.pexels.com/video-files/2099395/2099395-hd_1920_1080_25fps.mp4"
                    posterUrl="https://picsum.photos/seed/videoposter/1920/1080"
                />
            </ComponentPreview>
            <CodeBlock code={centeredVideoCode} />
        </SubSection>

        <SubSection title="Split-Screen Hero">
             <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                Perfect for showcasing a product image alongside key features and benefits. The text panel includes a subtle dot pattern for added visual texture.
            </p>
            <ComponentPreview className="!p-0">
               <SplitHero
                    headline="Engage and Convert"
                    subtitle="A powerful statement deserves a prime spot. Use this space to connect with your audience and drive action."
                    cta={{ text: "Explore Features", href: "#", icon: <Icon>arrow_forward</Icon> }}
                    imageUrl="https://picsum.photos/seed/split-hero/800/800"
                    imageAlt="Professionals collaborating in an office"
                />
            </ComponentPreview>
            <CodeBlock code={splitHeroCode} />
        </SubSection>
        
        <SubSection title="Component Props">
             <div className="space-y-12">
                <div>
                    <h4 className="font-bold mb-2 text-text-primary dark:text-dark-text-primary">{'<CenteredHero />'}</h4>
                    <PropsTable data={centeredHeroProps} />
                </div>
                <div>
                    <h4 className="font-bold mb-2 text-text-primary dark:text-dark-text-primary">{'<SplitHero />'}</h4>
                    <PropsTable data={splitHeroProps} />
                </div>
             </div>
        </SubSection>

         <SubSection title="Usage Guidelines">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <Icon className="!text-2xl text-system-success mt-1 shrink-0">check_circle</Icon>
                        <div>
                            <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Use Correct Heading Levels</h4>
                            <p className="text-sm">The hero headline is typically the `h1` of the page. Ensure the hero's headline prop receives an `h1` to maintain proper semantic document structure.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Icon className="!text-2xl text-system-success mt-1 shrink-0">check_circle</Icon>
                        <div>
                            <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Optimize Media Assets</h4>
                            <p className="text-sm">Use compressed images (e.g., WebP) and videos to ensure fast load times, especially on mobile devices. Use a `posterUrl` for videos.</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <Icon className="!text-2xl text-system-error mt-1 shrink-0">cancel</Icon>
                        <div>
                            <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Avoid Autoplaying Video with Sound</h4>
                            <p className="text-sm">Autoplaying video should always be muted to provide a non-disruptive user experience. Provide user controls if sound is necessary.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Icon className="!text-2xl text-system-error mt-1 shrink-0">cancel</Icon>
                        <div>
                            <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Don't Forget Alt Text</h4>
                            <p className="text-sm">Always provide descriptive `imageAlt` text for the `SplitHero` to ensure the content is accessible to screen reader users.</p>
                        </div>
                    </div>
                </div>
            </div>
        </SubSection>

    </SectionContainer>
);