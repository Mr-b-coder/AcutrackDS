// FILE: components/Table.tsx
import React, { useRef, useEffect } from 'react';
import { RawCheckbox } from './Checkbox.tsx';

// --- TABLE COMPONENT ---
interface TableContextProps {
    striped: boolean;
    hoverable: boolean;
}
const TableContext = React.createContext<TableContextProps>({ striped: false, hoverable: false });
const useTableContext = () => React.useContext(TableContext);

type TableRootProps = {
    children: React.ReactNode;
    className?: string;
    striped?: boolean;
    hoverable?: boolean;
};

const TableRoot: React.FC<TableRootProps> = ({ children, className = '', striped = false, hoverable = false }) => (
    <div className={`relative overflow-x-auto rounded-lg border border-border-color dark:border-dark-border-color w-full custom-scrollbar ${className}`}>
        <TableContext.Provider value={{ striped, hoverable }}>
            <table className="w-full text-sm text-left text-text-secondary dark:text-dark-text-secondary">
                {children}
            </table>
        </TableContext.Provider>
    </div>
);
TableRoot.displayName = 'Table.Root';

const TableHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <thead className={`text-xs text-text-primary dark:text-dark-text-primary uppercase bg-bg-tertiary dark:bg-dark-bg-tertiary ${className}`}>
        <tr>{children}</tr>
    </thead>
);
TableHeader.displayName = 'Table.Header';

const TableBody: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <tbody className={`bg-bg-secondary dark:bg-dark-bg-secondary divide-y divide-border-color dark:divide-dark-border-color ${className}`}>
        {children}
    </tbody>
);
TableBody.displayName = 'Table.Body';

const TableRow: React.FC<{ children: React.ReactNode; className?: string; selected?: boolean }> = ({ children, className = '', selected = false }) => {
    const { striped, hoverable } = useTableContext();
    const hoverClasses = hoverable ? 'hover:bg-bg-tertiary/80 dark:hover:bg-dark-bg-tertiary/60' : '';
    const stripedClasses = striped ? 'odd:bg-bg-tertiary/50 dark:odd:bg-dark-bg-tertiary/30' : '';
    const selectedClasses = selected ? '!bg-brand-orange/10 dark:!bg-dark-brand-orange/10' : '';
    const combinedClasses = `transition-colors ${hoverClasses} ${stripedClasses} ${selectedClasses} ${className}`;
    return <tr className={combinedClasses}>{children}</tr>;
};
TableRow.displayName = 'Table.Row';

const TableHeadCell: React.FC<{ children: React.ReactNode; className?: string } & React.ThHTMLAttributes<HTMLTableHeaderCellElement>> = ({ children, className = '', scope = 'col', ...props }) => (
    <th scope={scope} className={`px-6 py-4 font-bold ${className}`} {...props}>
        {children}
    </th>
);
TableHeadCell.displayName = 'Table.HeadCell';

const TableCell: React.FC<{ children: React.ReactNode; className?: string } & React.TdHTMLAttributes<HTMLTableCellElement>> = ({ children, className = '', ...props }) => (
    <td className={`px-6 py-4 ${className}`} {...props}>
        {children}
    </td>
);
TableCell.displayName = 'Table.Cell';

type TableCheckboxProps = {
    id: string;
    label: string; // for accessibility
    isHeader?: boolean;
} & Omit<React.ComponentProps<typeof RawCheckbox>, 'ref'>;


const TableCheckbox: React.FC<TableCheckboxProps> = ({ id, label, isHeader = false, ...props }) => {
    const CellComponent = isHeader ? 'th' : 'td';
    return (
        <CellComponent scope={isHeader ? 'col' : undefined} className="px-4 py-4 w-4">
             <label htmlFor={id} className="sr-only">{label}</label>
             <RawCheckbox id={id} {...props} />
        </CellComponent>
    );
};
TableCheckbox.displayName = "Table.Checkbox";

export const Table = Object.assign(TableRoot, {
    Header: TableHeader,
    Body: TableBody,
    Row: TableRow,
    HeadCell: TableHeadCell,
    Cell: TableCell,
    Checkbox: TableCheckbox
});