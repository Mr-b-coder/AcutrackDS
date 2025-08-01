import React, { useState, useEffect } from 'react';
import { NavItemGroup, NavItem } from '../../../types.ts';
import { Icon } from '../icons.tsx';
import { Tooltip } from '../Tooltip.tsx';

interface CollapsibleSidebarProps {
  navGroups: NavItemGroup[];
  activeHref?: string;
  onLinkClick: (href: string) => void;
  defaultCollapsed?: boolean;
  color?: 'default' | 'inverse' | 'accent' | 'dark';
  showIcons?: boolean;
}

export const CollapsibleSidebar: React.FC<CollapsibleSidebarProps> = ({ 
    navGroups, 
    activeHref, 
    onLinkClick, 
    defaultCollapsed = false,
    color = 'default',
    showIcons = true,
}) => {
    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
    const [openGroups, setOpenGroups] = useState<string[]>([]);
    
    useEffect(() => {
        // Auto-expand the group of the active item when sidebar is open
        if (!isCollapsed) {
            const activeGroup = navGroups.find(g => g.items.some(i => i.href === activeHref));
            if (activeGroup && !openGroups.includes(activeGroup.title)) {
                setOpenGroups(prev => [activeGroup.title]);
            }
        }
    }, [activeHref, isCollapsed, navGroups]);

    const toggleGroup = (title: string) => {
        setOpenGroups(prev =>
            prev.includes(title) ? prev.filter(t => t !== title) : [title]
        );
    };

    const colorStyles = {
        default: {
            aside: 'bg-bg-secondary dark:bg-dark-bg-secondary border-r border-border-color dark:border-dark-border-color',
            header: 'border-b border-border-color dark:border-dark-border-color',
            headerText: 'text-text-primary dark:text-dark-text-primary',
            groupButton: 'text-text-primary dark:text-dark-text-primary hover:bg-bg-tertiary dark:hover:bg-dark-bg-tertiary',
            link: 'text-text-secondary dark:text-dark-text-secondary hover:bg-bg-tertiary dark:hover:bg-dark-bg-tertiary',
            activeLink: 'text-brand-orange bg-brand-orange/10 font-bold',
            footerButton: 'text-text-primary dark:text-dark-text-primary hover:bg-bg-tertiary dark:hover:bg-dark-bg-tertiary',
            footerBorder: 'border-t border-border-color dark:border-dark-border-color',
        },
        inverse: {
            aside: 'bg-brand-navy text-white/80',
            header: 'border-b border-white/10',
            headerText: 'text-white',
            groupButton: 'text-white/80 hover:text-white hover:bg-black/10',
            link: 'text-white/80 hover:text-white hover:bg-black/10',
            activeLink: 'text-white bg-black/20 font-bold',
            footerButton: 'text-white/80 hover:text-white hover:bg-black/10',
            footerBorder: 'border-t border-white/10',
        },
        accent: {
            aside: 'bg-brand-orange text-white/90',
            header: 'border-b border-white/20',
            headerText: 'text-white',
            groupButton: 'text-white/90 hover:text-white hover:bg-white/10',
            link: 'text-white/90 hover:text-white hover:bg-white/10',
            activeLink: 'text-white bg-white/20 font-bold',
            footerButton: 'text-white/90 hover:text-white hover:bg-white/10',
            footerBorder: 'border-t border-white/20',
        },
        dark: {
            aside: 'bg-grey-700 text-white/80',
            header: 'border-b border-white/10',
            headerText: 'text-white',
            groupButton: 'text-white/80 hover:text-white hover:bg-white/10',
            link: 'text-white/80 hover:text-white hover:bg-white/10',
            activeLink: 'text-white bg-black/20 font-bold',
            footerButton: 'text-white/80 hover:text-white hover:bg-white/10',
            footerBorder: 'border-t border-white/10',
        },
    };
    const styles = colorStyles[color];
    const sidebarWidth = isCollapsed ? 'w-20' : 'w-64';

    return (
        <aside className={`relative h-full flex flex-col transition-all duration-300 ${sidebarWidth} ${styles.aside}`}>
            {/* Header */}
            <div className={`h-20 flex items-center shrink-0 px-6 ${styles.header}`}>
                <Icon className={`text-brand-orange !text-3xl transition-transform duration-500 ${isCollapsed ? 'rotate-180' : ''}`}>track_changes</Icon>
                <span className={`font-heading font-bold text-xl ml-2 overflow-hidden transition-opacity duration-200 ${styles.headerText} ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>Acutrack</span>
            </div>

            {/* Nav */}
            <nav className={`flex-grow p-4 space-y-2 ${isCollapsed ? '' : 'overflow-y-auto custom-scrollbar'}`}>
                {navGroups.map(group => {
                    const isOpen = openGroups.includes(group.title);
                    return (
                        <div key={group.title} className={isCollapsed ? 'flex justify-center' : ''}>
                            <Tooltip 
                                label={isCollapsed ? group.title : ''} 
                                position="right"
                            >
                                <button
                                    onClick={() => !isCollapsed && toggleGroup(group.title)}
                                    className={`flex items-center text-left p-3 rounded-lg transition-colors ${styles.groupButton} ${isCollapsed ? 'w-auto justify-center' : 'w-full'}`}
                                    aria-expanded={!isCollapsed && isOpen}
                                >
                                    {showIcons && group.icon && (
                                        React.isValidElement(group.icon)
                                            ? React.cloneElement(group.icon as React.ReactElement<any>, { className: `${(group.icon.props as any).className || ''} shrink-0`.trim() })
                                            : <span className="shrink-0">{group.icon}</span>
                                    )}
                                    <h2 className={`text-sm font-bold uppercase tracking-wider overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100 ml-3'}`}>{group.title}</h2>
                                    {!isCollapsed && (
                                        <Icon className={`ml-auto transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>expand_more</Icon>
                                    )}
                                </button>
                            </Tooltip>
                            
                            {/* Group Items */}
                            {!isCollapsed && isOpen && (
                                <div className="pl-6 mt-2 space-y-1">
                                    {group.items.map(item => (
                                        <a
                                            key={item.href}
                                            href={item.href}
                                            onClick={(e) => { e.preventDefault(); onLinkClick(item.href); }}
                                            className={`block p-2 rounded-md text-sm font-medium transition-colors ${activeHref === item.href ? styles.activeLink : styles.link}`}
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

            {/* Footer / Toggle */}
            <div className={`flex-shrink-0 p-4 ${styles.footerBorder} ${isCollapsed ? 'flex justify-center' : ''}`}>
                <Tooltip 
                    label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"} 
                    position="right"
                >
                    <button onClick={() => setIsCollapsed(!isCollapsed)} className={`flex items-center p-3 rounded-lg transition-colors ${styles.footerButton} ${isCollapsed ? 'w-auto justify-center' : 'w-full justify-between'}`}>
                        <span className={`font-medium text-sm overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>Collapse</span>
                        <Icon>{isCollapsed ? 'menu_open' : 'menu'}</Icon>
                    </button>
                </Tooltip>
            </div>
        </aside>
    );
};