// FILE: components/Header.tsx
// This component renders the main application/website header.

import React, { useState } from 'react';
import { Icon } from './icons.tsx';
import { Button } from './Button.tsx';
import { Dropdown } from './Dropdown.tsx';
import { Avatar } from './Avatar.tsx';

// Define types for header props
interface HeaderLink {
  href: string;
  label: string;
}

interface UserMenuLink {
  href: string;
  label: string;
  icon: string;
}

interface HeaderProps {
  links: HeaderLink[];
  user?: {
    name: string;
    avatarUrl?: string;
  };
  userMenuLinks?: UserMenuLink[];
  onLogin: () => void;
  onSignUp: () => void;
}

export const Header: React.FC<HeaderProps> = ({ links, user, userMenuLinks, onLogin, onSignUp }) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="relative z-40 w-full bg-white/80 dark:bg-dark-bg-secondary/80 backdrop-blur-sm border-b border-border-color dark:border-dark-border-color">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="#" className="flex items-center gap-2" aria-label="Acutrack Home">
                             <Icon className={`text-brand-orange !text-3xl`}>track_changes</Icon>
                             <h1 className="text-2xl font-bold font-heading">
                                <span className="text-brand-navy dark:text-white">Acutrack</span>
                            </h1>
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-2">
                        {links.map(link => (
                            <Button as="a" href={link.href} key={link.href} variant="text" size="md" className="!font-bold">
                                {link.label}
                            </Button>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-2">
                        {user ? (
                             <Dropdown>
                                <Dropdown.Trigger>
                                    <button aria-label="Open user menu">
                                        <Avatar name={user.name} src={user.avatarUrl} size="sm" />
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content position="bottom-end">
                                    {userMenuLinks?.map(item => (
                                        <Dropdown.Item key={item.href} icon={item.icon}>
                                            {item.label}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Content>
                            </Dropdown>
                        ) : (
                            <>
                                <Button variant="text" size="md" className="!font-bold" onClick={onLogin}>Log In</Button>
                                <Button variant="primary" size="md" onClick={onSignUp}>Get Started</Button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button variant="text" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                            <Icon>{isMobileMenuOpen ? 'close' : 'menu'}</Icon>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-border-color dark:border-dark-border-color absolute top-full left-0 w-full bg-white dark:bg-dark-bg-secondary shadow-lg">
                    <nav className="flex flex-col p-4 space-y-2">
                        {links.map(link => (
                            <a href={link.href} key={link.href} className="block px-4 py-2 rounded-md font-bold text-text-primary dark:text-dark-text-primary hover:bg-bg-tertiary dark:hover:bg-dark-bg-tertiary">
                                {link.label}
                            </a>
                        ))}
                        <div className="pt-4 mt-4 border-t border-border-color dark:border-dark-border-color space-y-2">
                             {user ? (
                                <div className="flex items-center gap-3 px-4 py-2">
                                    <Avatar name={user.name} src={user.avatarUrl} size="sm" />
                                    <span className="font-bold">{user.name}</span>
                                </div>
                             ) : (
                                <>
                                    <Button variant="secondary" onClick={onLogin} className="w-full">Log In</Button>
                                    <Button variant="primary" onClick={onSignUp} className="w-full">Get Started</Button>
                                </>
                             )}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};
