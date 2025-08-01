// FILE: components/Pagination.tsx
// This component provides navigation for paginated content.

import React, { useMemo } from 'react';
import { Button } from './Button.tsx';
import { Icon } from './icons.tsx';

export const Pagination: React.FC<{ currentPage: number; totalPages: number; onPageChange: (page: number) => void; }> = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = useMemo(() => {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
        if (currentPage <= 4) return [1, 2, 3, 4, 5, '...', totalPages];
        if (currentPage >= totalPages - 3) return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    }, [currentPage, totalPages]);
    return (
        <nav className="flex items-center gap-2">
            <Button size="sm" variant="secondary" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} leftIcon={<Icon>chevron_left</Icon>}>Prev</Button>
            <div className="hidden md:flex items-center gap-1">
                {pageNumbers.map((page, index) => typeof page === 'number' ? <button key={index} onClick={() => onPageChange(page)} className={`h-9 w-9 text-sm font-bold rounded-md transition-colors ${page === currentPage ? 'bg-brand-orange text-white' : 'text-text-secondary dark:text-dark-text-secondary hover:bg-bg-tertiary dark:hover:bg-dark-bg-tertiary'}`}>{page}</button> : <span key={index} className="h-9 w-9 flex items-center justify-center text-text-secondary dark:text-dark-text-secondary">...</span>)}
            </div>
            <Button size="sm" variant="secondary" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} rightIcon={<Icon>chevron_right</Icon>}>Next</Button>
        </nav>
    );
};
