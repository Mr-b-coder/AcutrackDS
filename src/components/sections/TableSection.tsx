// FILE: components/sections/TableSection.tsx
// This section documents the data table component.

import React, { useState, useMemo, useEffect } from 'react';
import { 
    SectionContainer, 
    ComponentPreview, 
    SubSection, 
    Badge, 
    Button,
    ButtonGroup,
    PropsTable,
    Card,
    Pagination,
    EmptyState,
    Input,
    ToggleSwitch,
    Slider,
    BrowserCompatibility
} from '../Content.tsx';
import { Table } from '../Table.tsx';
import { Icon } from '../icons.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';
import { PropDef } from '../../types.ts';
import CodeBlock from '../CodeBlock.tsx';

const simpleTableData = [
    { id: 'p1', name: 'Magic Widget', sku: 'MW-001', status: 'In Stock', statusVariant: 'success' as const },
    { id: 'p2', name: 'Gizmo Pro', sku: 'GP-003', status: 'Out of Stock', statusVariant: 'error' as const },
    { id: 'p3', name: 'Thingamajig', sku: 'TM-002', status: 'Backordered', statusVariant: 'warning' as const },
];

const simpleTableCode = `import { Table, Badge } from './components';

const data = [/* ... */];

<Table>
    <Table.Header>
        <Table.HeadCell>Product</Table.HeadCell>
        <Table.HeadCell>SKU</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
    </Table.Header>
    <Table.Body>
        {data.map(item => (
            <Table.Row key={item.id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.sku}</Table.Cell>
                <Table.Cell>
                    <Badge variant={item.statusVariant}>{item.status}</Badge>
                </Table.Cell>
            </Table.Row>
        ))}
    </Table.Body>
</Table>
`;

const interactiveTableData = [
    { id: 'inv-001', customer: 'Acme Inc.', date: '2023-10-26', amount: '$2,500.00', status: 'Paid', statusVariant: 'success' as const },
    { id: 'inv-002', customer: 'Stark Industries', date: '2023-10-25', amount: '$1,500.75', status: 'Pending', statusVariant: 'warning' as const },
    { id: 'inv-003', customer: 'Wayne Enterprises', date: '2023-10-24', amount: '$800.00', status: 'Paid', statusVariant: 'success' as const },
    { id: 'inv-004', customer: 'Ollivanders', date: '2023-10-22', amount: '$300.50', status: 'Overdue', statusVariant: 'error' as const },
    { id: 'inv-005', customer: 'Cyberdyne Systems', date: '2023-10-21', amount: '$12,000.00', status: 'Draft', statusVariant: 'default' as const },
    { id: 'inv-006', customer: 'Gekko & Co', date: '2023-10-20', amount: '$1,250.00', status: 'Paid', statusVariant: 'success' as const },
    { id: 'inv-007', customer: 'Tyrell Corporation', date: '2023-10-19', amount: '$5,500.00', status: 'Pending', statusVariant: 'warning' as const },
];

const tableRootProps: PropDef[] = [
    { name: 'striped', type: 'boolean', default: 'false', description: 'Adds zebra-striping to table rows for readability.' },
    { name: 'hoverable', type: 'boolean', default: 'false', description: 'Adds a hover effect to table rows.' },
];

type SortConfig = {
    key: keyof typeof interactiveTableData[0] | null;
    direction: 'ascending' | 'descending';
};

const SortableHeader: React.FC<{
    children: React.ReactNode;
    sortKey: keyof typeof interactiveTableData[0];
    sortConfig: SortConfig;
    onSort: (key: keyof typeof interactiveTableData[0]) => void;
}> = ({ children, sortKey, sortConfig, onSort }) => {
    const isSorted = sortConfig.key === sortKey;
    const directionIcon = sortConfig.direction === 'ascending' ? 'arrow_upward' : 'arrow_downward';

    return (
        <Table.HeadCell>
            <button className="flex items-center gap-2 font-bold group" onClick={() => onSort(sortKey)}>
                {children}
                {isSorted ? (
                    <Icon className="!text-base">{directionIcon}</Icon>
                ) : (
                    <Icon className="!text-base opacity-0 group-hover:opacity-50 transition-opacity">unfold_more</Icon>
                )}
            </button>
        </Table.HeadCell>
    );
};


export const TableSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({groupTitle, sectionTitle, id}) => {
    // State for workbench
    const [isStriped, setIsStriped] = useState(true);
    const [isHoverable, setIsHoverable] = useState(true);
    const [isSelectable, setIsSelectable] = useState(true);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // State for table logic
    const [selectedInvoices, setSelectedInvoices] = useState<string[]>(['inv-002']);
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'date', direction: 'descending' });
    const [filterQuery, setFilterQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    
    const requestSort = (key: keyof typeof interactiveTableData[0]) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
        setCurrentPage(1);
    };

    const processedData = useMemo(() => {
        let filteredData = [...interactiveTableData];
        if (filterQuery) {
            const lowercasedQuery = filterQuery.toLowerCase();
            filteredData = filteredData.filter(item =>
                item.id.toLowerCase().includes(lowercasedQuery) ||
                item.customer.toLowerCase().includes(lowercasedQuery)
            );
        }
        if (sortConfig.key) {
          filteredData.sort((a, b) => {
            const valA = a[sortConfig.key as keyof typeof a];
            const valB = b[sortConfig.key as keyof typeof b];
            let comparison = 0;
            if (typeof valA === 'string' && typeof valB === 'string') {
              if (sortConfig.key === 'date') {
                comparison = new Date(valA).getTime() - new Date(valB).getTime();
              } else if (sortConfig.key === 'amount') {
                comparison = parseFloat(valA.replace(/[$,]/g, '')) - parseFloat(valB.replace(/[$,]/g, ''));
              } else {
                comparison = valA.localeCompare(valB);
              }
            }
            return sortConfig.direction === 'ascending' ? comparison : -comparison;
          });
        }
        return filteredData;
    }, [sortConfig, filterQuery]);
    
    useEffect(() => {
        setCurrentPage(1);
    }, [filterQuery, itemsPerPage]);
    
    const totalPages = Math.ceil(processedData.length / itemsPerPage);
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return processedData.slice(startIndex, startIndex + itemsPerPage);
    }, [processedData, currentPage, itemsPerPage]);
    
    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            const pageIds = paginatedData.map(inv => inv.id);
            setSelectedInvoices(prev => [...new Set([...prev, ...pageIds])]);
        } else {
            const pageIds = paginatedData.map(inv => inv.id);
            setSelectedInvoices(prev => prev.filter(id => !pageIds.includes(id)));
        }
    };
    
    const handleSelectOne = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        if (e.target.checked) {
            setSelectedInvoices(prev => [...prev, id]);
        } else {
            setSelectedInvoices(prev => prev.filter(invId => invId !== id));
        }
    };
    
    const isPageAllSelected = paginatedData.length > 0 && paginatedData.every(item => selectedInvoices.includes(item.id));
    const isPageSomeSelected = paginatedData.some(item => selectedInvoices.includes(item.id)) && !isPageAllSelected;

    const generatedCode = useMemo(() => {
        const props = [];
        if (isStriped) props.push('striped');
        if (isHoverable) props.push('hoverable');
        
        const propsString = props.length > 0 ? ` ${props.join(' ')}` : '';

        return `// A full table implementation would include state management 
// for sorting, filtering, and pagination.

<Table${propsString}>
    <Table.Header>
        ${isSelectable ? `<Table.Checkbox isHeader ... />` : ''}
        <Table.HeadCell>Invoice</Table.HeadCell>
        {/* ... more headers */}
    </Table.Header>
    <Table.Body>
        {/* map over your data */}
        <Table.Row>
            ${isSelectable ? `<Table.Checkbox ... />` : ''}
            <Table.Cell>INV-001</Table.Cell>
            {/* ... more cells */}
        </Table.Row>
    </Table.Body>
</Table>
<Pagination currentPage={page} totalPages={total} onPageChange={setPage} />`;
    }, [isStriped, isHoverable, isSelectable]);

    return (
        <SectionContainer id={id}>
            <Breadcrumb group={groupTitle} section={sectionTitle} />
            <h2 className="section-title">Data Tables</h2>
            <p className="section-subtitle">Tables are used to display sets of data. Our new Table component provides a reusable and flexible structure for creating clear, consistent, and interactive tables.</p>
            
            <SubSection title="Standard Table">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    The basic table structure is composed of `Table.Header`, `Table.Body`, and their respective cell and row components. This provides a clean, semantic way to build consistent tables.
                </p>
                <ComponentPreview>
                    <Table>
                        <Table.Header>
                            <Table.HeadCell>Product Name</Table.HeadCell>
                            <Table.HeadCell>SKU</Table.HeadCell>
                            <Table.HeadCell>Status</Table.HeadCell>
                        </Table.Header>
                        <Table.Body>
                            {simpleTableData.map((item) => (
                                <Table.Row key={item.id}>
                                    <Table.Cell>
                                        <span className="font-bold text-text-primary dark:text-dark-text-primary">{item.name}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="font-mono">{item.sku}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Badge variant={item.statusVariant}>{item.status}</Badge>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </ComponentPreview>
                 <CodeBlock code={simpleTableCode} />
            </SubSection>

            <SubSection title="Table Workbench">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                   Enhance tables with props for better readability and interactivity. Use the controls to configure the table and see the code update.
                </p>
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Controls */}
                    <div className="lg:col-span-1 space-y-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Options</h4>
                            <div className="p-4 rounded-lg bg-bg-secondary dark:bg-dark-bg-secondary border border-border-color dark:border-dark-border-color space-y-3">
                                <ToggleSwitch id="table-striped" label="Striped" checked={isStriped} onChange={e => setIsStriped(e.target.checked)} />
                                <ToggleSwitch id="table-hoverable" label="Hoverable" checked={isHoverable} onChange={e => setIsHoverable(e.target.checked)} />
                                <ToggleSwitch id="table-selectable" label="Selectable Rows" checked={isSelectable} onChange={e => setIsSelectable(e.target.checked)} />
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Pagination</h4>
                             <div className="p-4 rounded-lg bg-bg-secondary dark:bg-dark-bg-secondary border border-border-color dark:border-dark-border-color">
                                <Slider 
                                    id="items-per-page"
                                    label="Items Per Page"
                                    value={itemsPerPage}
                                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                    min={3}
                                    max={7}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Preview */}
                    <div className="lg:col-span-3">
                        <ComponentPreview isColumn>
                            <Card isInteractive={false} className="w-full">
                                <Card.Body>
                                    <div className="w-full flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                                        <div className="flex items-center gap-4 w-full md:w-auto">
                                            <p className="font-bold text-lg text-text-primary dark:text-dark-text-primary flex-shrink-0">Invoices</p>
                                            <div className="relative w-full md:w-64">
                                                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary/60 pointer-events-none">search</Icon>
                                                <input
                                                    type="text"
                                                    value={filterQuery}
                                                    onChange={(e) => setFilterQuery(e.target.value)}
                                                    placeholder="Filter invoices..."
                                                    className="w-full pl-10 pr-4 py-2 text-sm bg-bg-tertiary dark:bg-dark-bg-primary rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-brand-orange"
                                                />
                                            </div>
                                        </div>
                                        {isSelectable && selectedInvoices.length > 0 ? (
                                            <div className="flex items-center gap-4">
                                                <span className="text-sm font-medium">{selectedInvoices.length} selected</span>
                                                <ButtonGroup>
                                                    <Button variant="secondary" size="sm" leftIcon={<Icon>archive</Icon>}>Archive</Button>
                                                    <Button variant="secondary" size="sm" leftIcon={<Icon>delete</Icon>}>Delete</Button>
                                                </ButtonGroup>
                                            </div>
                                        ) : (
                                            <Button variant="primary" size="sm" leftIcon={<Icon>add</Icon>}>New Invoice</Button>
                                        )}
                                    </div>
                                    
                                    {processedData.length > 0 ? (
                                        <Table striped={isStriped} hoverable={isHoverable}>
                                            <Table.Header>
                                                {isSelectable && <Table.Checkbox
                                                    id="select-all-invoices"
                                                    label="Select all invoices on this page"
                                                    isHeader
                                                    checked={isPageAllSelected}
                                                    indeterminate={isPageSomeSelected}
                                                    onChange={handleSelectAll}
                                                />}
                                                <SortableHeader sortKey="id" sortConfig={sortConfig} onSort={requestSort}>Invoice</SortableHeader>
                                                <SortableHeader sortKey="customer" sortConfig={sortConfig} onSort={requestSort}>Customer</SortableHeader>
                                                <SortableHeader sortKey="date" sortConfig={sortConfig} onSort={requestSort}>Date</SortableHeader>
                                                <SortableHeader sortKey="status" sortConfig={sortConfig} onSort={requestSort}>Status</SortableHeader>
                                            </Table.Header>
                                            <Table.Body>
                                                {paginatedData.map((invoice) => (
                                                    <Table.Row key={invoice.id} selected={selectedInvoices.includes(invoice.id)}>
                                                        {isSelectable && <Table.Checkbox
                                                            id={`select-${invoice.id}`}
                                                            label={`Select invoice ${invoice.id}`}
                                                            checked={selectedInvoices.includes(invoice.id)}
                                                            onChange={(e) => handleSelectOne(e, invoice.id)}
                                                        />}
                                                        <Table.Cell>
                                                            <span className="font-bold font-mono text-text-primary dark:text-dark-text-primary">{invoice.id}</span>
                                                        </Table.Cell>
                                                        <Table.Cell>{invoice.customer}</Table.Cell>
                                                        <Table.Cell>{invoice.date}</Table.Cell>
                                                        <Table.Cell>
                                                            <Badge variant={invoice.statusVariant}>{invoice.status}</Badge>
                                                        </Table.Cell>
                                                    </Table.Row>
                                                ))}
                                            </Table.Body>
                                        </Table>
                                    ) : (
                                        <div className="py-12">
                                            <EmptyState
                                                icon="search_off"
                                                title="No Invoices Found"
                                                description="Your search did not match any invoices. Try adjusting your filter."
                                            />
                                        </div>
                                    )}

                                </Card.Body>
                                {totalPages > 1 && processedData.length > 0 && (
                                    <Card.Footer className="justify-between">
                                        <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
                                            Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, processedData.length)} of {processedData.length} results
                                        </span>
                                        <Pagination 
                                            currentPage={currentPage} 
                                            totalPages={totalPages} 
                                            onPageChange={setCurrentPage} 
                                        />
                                    </Card.Footer>
                                )}
                            </Card>
                        </ComponentPreview>
                        <CodeBlock code={generatedCode} />
                    </div>
                </div>
            </SubSection>
            
            <SubSection title="Props: <Table />">
                 <BrowserCompatibility>
                    The outer container for the table becomes horizontally scrollable on small screens and uses the <code>custom-scrollbar</code> class, which will render differently in Firefox versus Webkit browsers.
                </BrowserCompatibility>
                <p className="text-text-secondary dark:text-dark-text-secondary mt-6 max-w-2xl">
                   The following props can be applied to the root <code>{'<Table>'}</code> component. All sub-components (`Header`, `Body`, `Row`, `Cell`, etc.) accept a `className` prop for custom styling.
                </p>
                <div className="component-preview !p-0 !bg-transparent !border-none mt-4">
                    <PropsTable data={tableRootProps} />
                </div>
            </SubSection>
        </SectionContainer>
    );
};