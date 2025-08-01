
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Theme, NavItemGroup, NavItem } from '../types.ts';
import Sidebar from './components/Sidebar.tsx';
import { Icon } from './components/icons.tsx';
import { ToastProvider } from './components/Toast.tsx';
import {
    IntroductionSection,
    GettingStartedSection,
    ForDevelopersSection,
    FoundationsSection,
    ColorsSection,
    TypographySection,
    LayoutSection,
    ScrollbarSection,
    HeroSection,
    IconsSection,
    ButtonsSection,
    FormsSection,
    AdvancedFormsSection,
    AutocompleteSection,
    MultiSelectSection,
    CardsSection,
    AccordionSection,
    NavigationSection,
    StepperSection,
    SidebarSection,
    HeaderSection,
    MegaMenuSection,
    FeedbackSection,
    ModalSection,
    DrawerSection,
    DropdownSection,
    ToastSection,
    ProgressSection,
    TableSection,
    AvatarSection,
    SpinnersSection,
    SkeletonSection,
    DataVisualizationSection,
    DesignerGuidelinesSection,
    FAQSection,
    FigmaLibrarySection,
    TreeViewSection,
    DashboardPage,
    WebsitePreviewPage,
    EmptyStateSection,
    LoadingStatesSection,
    LayoutPatternsSection,
    MotionSection,
    VoiceToneSection,
    FormValidationSection,
    DosAndDontsSection,
    UsageGuideSection,
    PopoverSection,
    BannerSection,
} from './components/sections';

const navItems: NavItemGroup[] = [
    {
        title: "Getting Started",
        icon: <Icon>school</Icon>,
        items: [
            { href: "#introduction", label: "Introduction" },
            { href: "#getting-started", label: "Key Features" },
            { href: "#for-developers", label: "Developer Guide" },
            { href: "#designer-guidelines", label: "Designer Guide" },
        ],
    },
    {
        title: "Foundations",
        icon: <Icon>foundation</Icon>,
        items: [
            { href: "#foundations", label: "Overview" },
            { href: "#colors", label: "Colors" },
            { href: "#typography", label: "Typography" },
            { href: "#layout", label: "Layout & Grid" },
            { href: "#iconography", label: "Iconography" },
            { href: "#scrollbars", label: "Scrollbars" },
            { href: "#motion", label: "Motion" },
        ],
    },
    {
        title: "Layout & Content",
        icon: <Icon>view_quilt</Icon>,
        items: [
            { href: "#cards", label: "Cards" },
            { href: "#hero", label: "Hero" },
            { href: "#accordions", label: "Accordions" },
        ],
    },
     {
        title: "Forms",
        icon: <Icon>edit_square</Icon>,
        items: [
            { href: "#buttons", label: "Buttons" },
            { href: "#dropdowns", label: "Dropdowns" },
            { href: "#forms", label: "Core Inputs" },
            { href: "#advanced-forms", label: "Advanced Inputs" },
            { href: "#autocomplete", label: "Autocomplete" },
            { href: "#multiselect", label: "Multi-Select" },
            { href: "#form-validation", label: "Form Validation" },
        ],
    },
    {
        title: "Overlays",
        icon: <Icon>layers</Icon>,
        items: [
            { href: "#modals", label: "Modals" },
            { href: "#drawer", label: "Drawer" },
            { href: "#popovers", label: "Popovers" },
        ]
    },
    {
        title: "Feedback & Status",
        icon: <Icon>notifications</Icon>,
        items: [
            { href: "#banners", label: "Banners" },
            { href: "#toasts", label: "Toasts" },
            { href: "#feedback", label: "Alerts, Badges & Tooltips" },
            { href: "#spinners", label: "Spinners" },
            { href: "#skeletons", label: "Skeletons" },
            { href: "#progress", label: "Progress" },
        ],
    },
    {
        title: "Navigation",
        icon: <Icon>navigation</Icon>,
        items: [
            { href: "#page-navigation", label: "Breadcrumb, Tabs & Pagination" },
            { href: "#sidebar-component", label: "Sidebar Nav" },
            { href: "#header", label: "Header Nav" },
            { href: "#stepper", label: "Stepper" },
            { href: "#mega-menu", label: "Mega Menu" },
        ],
    },
    {
        title: "Data Display",
        icon: <Icon>grid_view</Icon>,
        items: [
            { href: "#tables", label: "Data Tables" },
            { href: "#avatars", label: "Avatars" },
            { href: "#tree-view", label: "Tree View" },
            { href: "#data-visualization", label: "Charts" },
        ],
    },
    {
        title: "Patterns",
        icon: <Icon>architecture</Icon>,
        items: [
            { href: "#emptystates", label: "Empty States" },
            { href: "#loadingstates", label: "Loading States" },
            { href: "#layoutpatterns", label: "Layout Patterns" },
        ],
    },
    {
        title: "Page Examples",
        icon: <Icon>dashboard_customize</Icon>,
        items: [
             { href: "#dashboard", label: "Dashboard" },
             { href: "#website-preview", label: "Website Preview" },
        ]
    },
    {
        title: "Resources",
        icon: <Icon>integration_instructions</Icon>,
        items: [
             { href: "#usage-guide", label: "Usage Guide" },
             { href: "#dos-and-donts", label: "Do's & Don'ts" },
             { href: "#faq", label: "FAQ" },
             { href: "#figma-library", label: "Figma Library" },
             { href: "#voicetone", label: "Voice & Tone" },
        ]
    }
];


const allSections: NavItem[] = navItems.flatMap(group => group.items);
const sectionIds = allSections.map(item => item.href.substring(1));

const sectionComponents: Record<string, React.FC<any>> = {
    introduction: IntroductionSection,
    'getting-started': GettingStartedSection,
    'for-developers': ForDevelopersSection,
    foundations: FoundationsSection,
    colors: ColorsSection,
    typography: TypographySection,
    layout: LayoutSection,
    scrollbars: ScrollbarSection,
    iconography: IconsSection,
    buttons: ButtonsSection,
    forms: FormsSection,
    'advanced-forms': AdvancedFormsSection,
    autocomplete: AutocompleteSection,
    multiselect: MultiSelectSection,
    'form-validation': FormValidationSection,
    cards: CardsSection,
    accordions: AccordionSection,
    'page-navigation': NavigationSection,
    'sidebar-component': SidebarSection,
    header: HeaderSection,
    stepper: StepperSection,
    'mega-menu': MegaMenuSection,
    hero: HeroSection,
    modals: ModalSection,
    drawer: DrawerSection,
    dropdowns: DropdownSection,
    popovers: PopoverSection,
    toasts: ToastSection,
    banners: BannerSection,
    feedback: FeedbackSection,
    spinners: SpinnersSection,
    skeletons: SkeletonSection,
    progress: ProgressSection,
    tables: TableSection,
    avatars: AvatarSection,
    'tree-view': TreeViewSection,
    'data-visualization': DataVisualizationSection,
    'designer-guidelines': DesignerGuidelinesSection,
    faq: FAQSection,
    'figma-library': FigmaLibrarySection,
    dashboard: DashboardPage,
    'website-preview': WebsitePreviewPage,
    emptystates: EmptyStateSection,
    loadingstates: LoadingStatesSection,
    layoutpatterns: LayoutPatternsSection,
    motion: MotionSection,
    voicetone: VoiceToneSection,
    'dos-and-donts': DosAndDontsSection,
    'usage-guide': UsageGuideSection,
};

// --- Section Navigator Component ---
interface SectionNavigatorProps {
    onPrev: () => void;
    onNext: () => void;
    isFirst: boolean;
    isLast: boolean;
}
const SectionNavigator: React.FC<SectionNavigatorProps> = ({ onPrev, onNext, isFirst, isLast }) => (
    <>
        <button
            onClick={onPrev}
            disabled={isFirst}
            aria-label="Previous Section"
            className="fixed left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-bg-secondary/80 text-text-primary dark:bg-dark-bg-secondary/80 dark:text-dark-text-primary shadow-lg hover:bg-bg-tertiary dark:hover:bg-dark-bg-tertiary transition-all disabled:opacity-0 disabled:pointer-events-none"
        >
            <Icon className="!text-4xl">chevron_left</Icon>
        </button>
        <button
            onClick={onNext}
            disabled={isLast}
            aria-label="Next Section"
            className="fixed right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-bg-secondary/80 text-text-primary dark:bg-dark-bg-secondary/80 dark:text-dark-text-primary shadow-lg hover:bg-bg-tertiary dark:hover:bg-dark-bg-tertiary transition-all disabled:opacity-0 disabled:pointer-events-none"
        >
            <Icon className="!text-4xl">chevron_right</Icon>
        </button>
    </>
);


const AppContent: React.FC = () => {
    const [theme, setTheme] = useState<Theme>('light');
    const [activeSection, setActiveSection] = useState<string>(sectionIds[0]);
    const [isMobileNavOpen, setMobileNavOpen] = useState(false);
    const mainContentRef = useRef<HTMLDivElement>(null);

    const activeIndex = useMemo(() => sectionIds.indexOf(activeSection), [activeSection]);
    
    // Effect to load theme from localStorage on initial render
    useEffect(() => {
        try {
            const storedTheme = localStorage.getItem('theme') as Theme | null;
            if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
                setTheme(storedTheme);
            } else {
                 const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                 setTheme(prefersDark ? 'dark' : 'light');
            }
        } catch (e) {
            console.warn("Could not read theme from localStorage");
        }
    }, []);

    // Effect to update DOM and localStorage when theme changes
    useEffect(() => {
        const htmlEl = document.documentElement;
        if (theme === 'dark') {
            htmlEl.classList.add('dark');
            htmlEl.classList.remove('light');
        } else {
            htmlEl.classList.add('light');
            htmlEl.classList.remove('dark');
        }
        try {
            localStorage.setItem('theme', theme);
        } catch (e) {
             console.warn("Could not save theme to localStorage");
        }
    }, [theme]);

    const handleThemeToggle = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    // Effect to lock body scroll when mobile nav is open
    useEffect(() => {
        document.body.style.overflow = isMobileNavOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileNavOpen]);

    // Effect for IntersectionObserver to highlight active nav link
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;
                        setActiveSection(sectionId);
                    }
                });
            },
            { root: mainContentRef.current, rootMargin: '-49% 0px -49% 0px', threshold: 0 }
        );

        const sections = mainContentRef.current?.querySelectorAll('section[id]');
        sections?.forEach(section => observer.observe(section));

        return () => {
            sections?.forEach(section => observer.unobserve(section));
        };
    }, []);
    
    const scrollToSection = (index: number) => {
        const sectionId = sectionIds[index];
        if (sectionId) {
            const element = document.getElementById(sectionId);
            const mainContent = mainContentRef.current;
            if (element && mainContent) {
                mainContent.scrollTo({
                    top: element.offsetTop,
                    behavior: 'smooth'
                })
            }
        }
    }

    const handlePrev = () => {
        if (activeIndex > 0) {
            scrollToSection(activeIndex - 1);
        }
    };
    
    const handleNext = () => {
        if (activeIndex < sectionIds.length - 1) {
            scrollToSection(activeIndex + 1);
        }
    };

    return (
        <div className="relative h-screen bg-bg-primary dark:bg-dark-bg-primary text-text-secondary dark:text-dark-text-secondary overflow-hidden">
            <Sidebar 
                navGroups={navItems} 
                activeSection={activeSection} 
                isMobileNavOpen={isMobileNavOpen}
                onMobileNavClose={() => setMobileNavOpen(false)}
                theme={theme}
                onThemeToggle={handleThemeToggle}
            />

            <div className="h-full w-full md:pl-64">
                <button 
                    id="mobile-nav-toggle"
                    onClick={() => setMobileNavOpen(!isMobileNavOpen)}
                    className="fixed top-4 right-4 z-20 p-2 rounded-full bg-bg-secondary/80 text-text-primary dark:bg-dark-bg-secondary/80 dark:text-dark-text-primary shadow-lg focus:outline-none focus-visible:ring-2 ring-brand-orange md:hidden" 
                    aria-label="Toggle navigation menu"
                >
                    <Icon>menu</Icon>
                </button>
                
                <main 
                    id="main-content" 
                    ref={mainContentRef} 
                    className="w-full h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory custom-scrollbar"
                >
                    {allSections.map(section => {
                        const sectionId = section.href.substring(1);
                        const Component = sectionComponents[sectionId];
                        const parentGroup = navItems.find(group => group.items.some(item => item.href === section.href));
                        const groupTitle = parentGroup ? parentGroup.title : '';
                        
                        let props = {};
                        if (groupTitle === 'Page Examples') {
                            props = { id: sectionId };
                        } else {
                            props = {
                                groupTitle: groupTitle,
                                sectionTitle: section.label,
                                id: sectionId
                            };
                        }

                        return Component ? <Component key={sectionId} {...props} /> : null;
                    })}
                </main>
            </div>

            <SectionNavigator 
                onPrev={handlePrev}
                onNext={handleNext}
                isFirst={activeIndex === 0}
                isLast={activeIndex === sectionIds.length - 1}
            />
        </div>
    );
};


const App: React.FC = () => (
    <ToastProvider>
        <AppContent />
    </ToastProvider>
);

export default App;
