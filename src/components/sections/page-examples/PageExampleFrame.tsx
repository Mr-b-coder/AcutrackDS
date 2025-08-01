// FILE: components/sections/page-examples/PageExampleFrame.tsx
import React from 'react';
import { Icon } from '../../icons.tsx';

interface PageExampleFrameProps {
  title: string;
  children: React.ReactNode;
}

export const PageExampleFrame: React.FC<PageExampleFrameProps> = ({ title, children }) => {
  return (
    <div className="w-full h-[85vh] flex flex-col rounded-xl shadow-2xl bg-bg-secondary dark:bg-dark-bg-secondary border border-border-color dark:border-dark-border-color overflow-hidden">
      {/* Browser Chrome Header */}
      <header className="flex items-center gap-2 p-3 border-b border-border-color dark:border-dark-border-color bg-bg-tertiary/50 dark:bg-dark-bg-tertiary/20 flex-shrink-0">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500/80"></span>
          <span className="h-3 w-3 rounded-full bg-amber-500/80"></span>
          <span className="h-3 w-3 rounded-full bg-green-500/80"></span>
        </div>
        <div className="flex-grow text-center text-sm font-medium text-text-secondary dark:text-dark-text-secondary bg-bg-secondary dark:bg-dark-bg-secondary rounded-md px-4 py-1.5 mx-8 truncate">
          {title}
        </div>
        <div className="flex gap-1.5 opacity-50">
            <Icon>more_horiz</Icon>
        </div>
      </header>
      
      {/* Content Area with its own scrollbar */}
      <div className="flex-grow overflow-y-auto custom-scrollbar">
        {children}
      </div>
    </div>
  );
};
