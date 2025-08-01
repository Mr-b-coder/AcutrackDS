





import React, { useState, useEffect, useMemo } from 'react';
import { Theme, NavItemGroup, NavItem } from '../../types.ts';
import { Icon } from './icons.tsx';

interface SidebarProps {
  navGroups: NavItemGroup[];
  activeSection: string;
  isMobileNavOpen: boolean;
  onMobileNavClose: () => void;
  theme: Theme;
  onThemeToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ navGroups, activeSection, isMobileNavOpen, onMobileNavClose, theme, onThemeToggle }) => {
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const toggleGroup = (title: string) => {
    setOpenGroups(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  useEffect(() => {
    if (searchQuery.trim()) return;

    const currentGroup = navGroups.find(g => g.items.some(i => i.href.substring(1) === activeSection));
    if (currentGroup) {
      // This ensures that as the user navigates, only the current section's parent
      // group is expanded, providing a clean "accordion" style behavior.
      setOpenGroups([currentGroup.title]);
    }
  }, [activeSection, navGroups, searchQuery]);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const targetId = href.substring(1);
    const mainContent = document.getElementById('main-content');
    const element = document.getElementById(targetId);
    if (element && mainContent) {
      mainContent.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
    onMobileNavClose();
  };

  const filteredNavGroups = useMemo(() => {
    if (!searchQuery.trim()) {
      return navGroups;
    }
    const lowercasedQuery = searchQuery.toLowerCase();

    return navGroups
      .map(group => {
        const groupTitleMatches = group.title.toLowerCase().includes(lowercasedQuery);
        const filteredItems = group.items.filter(item =>
          item.label.toLowerCase().includes(lowercasedQuery)
        );

        if (groupTitleMatches || filteredItems.length > 0) {
          return {
            ...group,
            items: groupTitleMatches ? group.items : filteredItems,
          };
        }
        return null;
      })
      .filter((group): group is NavItemGroup => group !== null);
  }, [searchQuery, navGroups]);
  
  const sidebarClasses = `
    fixed top-0 left-0 h-full w-64 bg-brand-navy dark:bg-dark-bg-secondary flex flex-col
    transition-transform duration-300 ease-in-out z-40
    md:translate-x-0 
    ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'}
  `;

  return (
    <>
      {isMobileNavOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden" 
          onClick={onMobileNavClose}
          aria-hidden="true"
        ></div>
      )}

      <aside className={sidebarClasses}>
        <div className="flex-shrink-0 px-4">
            <div className="flex items-center justify-between pt-8">
                <h1 className="text-xl font-bold font-heading">
                    <span className="text-white">Acutrack</span>
                    <span className="text-brand-orange">DS</span>
                </h1>
                <button 
                    onClick={onMobileNavClose}
                    className="md:hidden p-1 rounded-full text-white/80 hover:text-white"
                    aria-label="Close navigation menu"
                >
                    <Icon>close</Icon>
                </button>
            </div>
            <div className="relative my-6">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Icon className="text-white/60">search</Icon>
                </span>
                <input
                    type="text"
                    placeholder="Search components..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black/20 text-white rounded-lg pl-10 pr-8 py-2.5 text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    aria-label="Search components"
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery('')}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        aria-label="Clear search"
                    >
                        <Icon className="text-white/60 hover:text-white">close</Icon>
                    </button>
                )}
            </div>
        </div>
        
        <nav id="sidebar-nav" className="flex-grow space-y-2 px-4 overflow-y-auto custom-scrollbar">
            {filteredNavGroups.length > 0 ? (
              filteredNavGroups.map((group) => {
              const isSearching = searchQuery.trim() !== '';
              const isOpen = isSearching || openGroups.includes(group.title);
              return (
                <div key={group.title}>
                    <button 
                      onClick={() => toggleGroup(group.title)}
                      className="w-full flex items-center justify-between text-left p-2 rounded-lg text-white/80 hover:text-white hover:bg-black/10 transition-colors"
                      disabled={isSearching}
                      aria-expanded={isOpen}
                    >
                      <span className="flex items-center gap-3">
                        {group.icon}
                        <h2 className="text-sm font-bold uppercase tracking-wider">{group.title}</h2>
                      </span>
                      {!isSearching && (
                        <Icon className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>expand_more</Icon>
                      )}
                    </button>
                    {isOpen && (
                       <div className="pl-4 mt-2 space-y-1 border-l-2 border-white/10 ml-3">
                         {group.items.map((item: NavItem) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, item.href)}
                                className={`sidebar-link flex items-center justify-between ${activeSection === item.href.substring(1) ? 'active' : ''}`}
                            >
                                <span>{item.label}</span>
                            </a>
                         ))}
                      </div>
                    )}
                </div>
              );
            })
          ) : (
            <div className="p-4 text-center text-white/60">
                <p className="font-bold">No components found</p>
                <p className="text-sm">Try a different search term.</p>
            </div>
          )}
        </nav>

        <div className="flex-shrink-0 p-4 border-t border-white/10">
             <button 
                id="theme-toggle" 
                onClick={onThemeToggle}
                className="w-full flex items-center justify-between p-2 rounded-lg text-white/80 hover:text-white hover:bg-black/10" 
                aria-label="Toggle theme"
              >
                <span className="text-sm font-medium">{theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}</span>
                <span className="relative w-6 h-6 flex items-center justify-center">
                    <Icon className={`transition-all duration-300 ${theme === 'dark' ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>dark_mode</Icon>
                    <Icon className={`absolute transition-all duration-300 ${theme === 'light' ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>light_mode</Icon>
                </span>
              </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;