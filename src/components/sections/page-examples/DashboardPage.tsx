// FILE: components/sections/page-examples/DashboardPage.tsx
// This section demonstrates a full dashboard page layout.

import React, { useState, useMemo } from 'react';
import { SectionContainer, Card, Avatar, Badge, Button, Pagination } from '../../Content.tsx';
import { Table } from '../../Table.tsx';
import { Icon } from '../../icons.tsx';
import { LineChart, DonutChart } from '../../charts.tsx';
import { PageExampleFrame } from './PageExampleFrame.tsx';
import { CollapsibleSidebar } from '../../Sidebars/CollapsibleSidebar.tsx';
import { NavItemGroup } from '../../../../types.ts';


// Mock Data
const dashboardNavGroups: NavItemGroup[] = [
    {
      title: 'Overview',
      icon: <Icon>dashboard</Icon>,
      items: [
        { href: '#dashboard-home', label: 'Dashboard' },
        { href: '#dashboard-analytics', label: 'Analytics' },
        { href: '#dashboard-reports', label: 'Reports' },
      ],
    },
    {
      title: 'Management',
      icon: <Icon>table_rows</Icon>,
      items: [
        { href: '#dashboard-orders', label: 'Orders' },
        { href: '#dashboard-customers', label: 'Customers' },
        { href: '#dashboard-products', label: 'Products' },
      ],
    },
     {
      title: 'Account',
      icon: <Icon>person</Icon>,
      items: [
        { href: '#dashboard-profile', label: 'Profile' },
        { href: '#dashboard-settings', label: 'Settings' },
        { href: '#dashboard-billing', label: 'Billing' },
      ],
    },
  ];


const kpiData = [
  { title: 'Total Revenue', value: '$45,231.89', change: '+20.1%', changeType: 'positive' as const, icon: 'monitoring' },
  { title: 'New Subscriptions', value: '+1,890', change: '+12.5%', changeType: 'positive' as const, icon: 'person_add' },
  { title: 'Avg. Order Value', value: '$123.50', change: '-2.4%', changeType: 'negative' as const, icon: 'shopping_bag' },
  { title: 'Conversion Rate', value: '3.8%', change: '+1.2%', changeType: 'positive' as const, icon: 'trending_up' },
];

const lineChartData = [
  { label: 'Jan', value: 12000 }, { label: 'Feb', value: 18000 }, { label: 'Mar', value: 15000 },
  { label: 'Apr', value: 22000 }, { label: 'May', value: 19000 }, { label: 'Jun', value: 25000 },
  { label: 'Jul', value: 23000 },
];

const donutChartData = [
    { id: 'books', label: 'Book Fulfillment', value: 45, colorClass: 'bg-brand-orange' },
    { id: 'media', label: 'Media Mfg', value: 25, colorClass: 'bg-system-info' },
    { id: 'ecommerce', label: 'E-Commerce', value: 30, colorClass: 'bg-system-warning' },
];

const recentOrdersData = [
    { id: 'ORD-001', customer: { name: 'Liam Johnson', avatar: 'https://i.pravatar.cc/32?u=liam' }, date: '2023-10-26', status: 'Shipped', statusVariant: 'success' as const, amount: '$250.00' },
    { id: 'ORD-002', customer: { name: 'Olivia Smith', avatar: 'https://i.pravatar.cc/32?u=olivia' }, date: '2023-10-26', status: 'Processing', statusVariant: 'warning' as const, amount: '$150.75' },
    { id: 'ORD-003', customer: { name: 'Noah Williams', avatar: 'https://i.pravatar.cc/32?u=noah' }, date: '2023-10-25', status: 'Shipped', statusVariant: 'success' as const, amount: '$350.50' },
    { id: 'ORD-004', customer: { name: 'Emma Brown', avatar: 'https://i.pravatar.cc/32?u=emma' }, date: '2023-10-25', status: 'Cancelled', statusVariant: 'error' as const, amount: '$75.00' },
    { id: 'ORD-005', customer: { name: 'James Jones', avatar: 'https://i.pravatar.cc/32?u=james' }, date: '2023-10-24', status: 'Shipped', statusVariant: 'success' as const, amount: '$820.00' },
    { id: 'ORD-006', customer: { name: 'Sophia Davis', avatar: 'https://i.pravatar.cc/32?u=sophia' }, date: '2023-10-23', status: 'Shipped', statusVariant: 'success' as const, amount: '$45.50' },
    { id: 'ORD-007', customer: { name: 'Logan Miller', avatar: 'https://i.pravatar.cc/32?u=logan' }, date: '2023-10-23', status: 'Processing', statusVariant: 'warning' as const, amount: '$300.00' },
    { id: 'ORD-008', customer: { name: 'Isabella Wilson', avatar: 'https://i.pravatar.cc/32?u=isabella' }, date: '2023-10-22', status: 'Shipped', statusVariant: 'success' as const, amount: '$120.00' },
    { id: 'ORD-009', customer: { name: 'Mason Moore', avatar: 'https://i.pravatar.cc/32?u=mason' }, date: '2023-10-21', status: 'Cancelled', statusVariant: 'error' as const, amount: '$99.99' },
    { id: 'ORD-010', customer: { name: 'Ava Taylor', avatar: 'https://i.pravatar.cc/32?u=ava' }, date: '2023-10-20', status: 'Shipped', statusVariant: 'success' as const, amount: '$500.00' },
    { id: 'ORD-011', customer: { name: 'Jacob Anderson', avatar: 'https://i.pravatar.cc/32?u=jacob' }, date: '2023-10-20', status: 'Processing', statusVariant: 'warning' as const, amount: '$210.25' },
    { id: 'ORD-012', customer: { name: 'Mia Thomas', avatar: 'https://i.pravatar.cc/32?u=mia' }, date: '2023-10-19', status: 'Shipped', statusVariant: 'success' as const, amount: '$780.00' },
];

type SortConfig = {
    key: keyof typeof recentOrdersData[0] | null;
    direction: 'ascending' | 'descending';
};

const SortableHeader: React.FC<{
    children: React.ReactNode;
    sortKey: keyof typeof recentOrdersData[0];
    sortConfig: SortConfig;
    onSort: (key: keyof typeof recentOrdersData[0]) => void;
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

export const DashboardPage: React.FC<{ id: string; }> = ({ id }) => {
    const [activeLink, setActiveLink] = useState('#dashboard-home');
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'date', direction: 'descending' });
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5;

    const requestSort = (key: keyof typeof recentOrdersData[0]) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
        setCurrentPage(1); // Reset to first page on sort
    };

    const sortedData = useMemo(() => {
        const sortableData = [...recentOrdersData];
        if (sortConfig.key) {
          sortableData.sort((a, b) => {
            const valA = a[sortConfig.key as keyof typeof a];
            const valB = b[sortConfig.key as keyof typeof b];
    
            let comparison = 0;
            if (typeof valA === 'string' && typeof valB === 'string') {
              if (sortConfig.key === 'date') {
                comparison = new Date(valB).getTime() - new Date(valA).getTime();
              } else if (sortConfig.key === 'amount') {
                comparison = parseFloat(valA.replace(/[$,]/g, '')) - parseFloat(valB.replace(/[$,]/g, ''));
              } else {
                comparison = valA.localeCompare(valB);
              }
            } else if (typeof valA === 'object' && typeof valB === 'object' && valA !== null && valB !== null && 'name' in valA && 'name' in valB) {
                // for customer object
                comparison = (valA as {name:string}).name.localeCompare((valB as {name:string}).name);
            }
    
            return sortConfig.direction === 'ascending' ? comparison : -comparison;
          });
        }
        return sortableData;
    }, [sortConfig]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return sortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [sortedData, currentPage]);
    
    const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            const pageIds = paginatedData.map(item => item.id);
            setSelectedRows(prev => [...new Set([...prev, ...pageIds])]);
        } else {
            const pageIds = paginatedData.map(item => item.id);
            setSelectedRows(prev => prev.filter(id => !pageIds.includes(id)));
        }
    };

    const handleSelectOne = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        if (e.target.checked) {
            setSelectedRows(prev => [...prev, id]);
        } else {
            setSelectedRows(prev => prev.filter(rowId => rowId !== id));
        }
    };
    
    const isPageAllSelected = paginatedData.length > 0 && paginatedData.every(item => selectedRows.includes(item.id));
    const isPageSomeSelected = paginatedData.some(item => selectedRows.includes(item.id)) && !isPageAllSelected;

    return (
    <SectionContainer id={id}>
        <PageExampleFrame title="Dashboard">
             <div className="flex h-full w-full">
                <CollapsibleSidebar 
                    navGroups={dashboardNavGroups}
                    activeHref={activeLink}
                    onLinkClick={setActiveLink}
                    color="inverse"
                />
                <main className="flex-grow p-6 overflow-y-auto custom-scrollbar bg-bg-primary dark:bg-dark-bg-primary">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="font-heading text-2xl text-text-primary dark:text-dark-text-primary mb-1">Dashboard Overview</h2>
                             <p className="text-sm text-text-secondary dark:text-dark-text-secondary">Welcome back, here's a snapshot of your business.</p>
                        </div>
                         {selectedRows.length === 0 ? (
                            <Button leftIcon={<Icon>download</Icon>}>Export Report</Button>
                        ) : (
                            <div className="flex items-center gap-4">
                                <span className="font-bold">{selectedRows.length} selected</span>
                                <Button variant="secondary">Archive</Button>
                                <Button variant="secondary" className="!border-system-error !text-system-error hover:!bg-red-50 dark:hover:!bg-red-500/10">Delete</Button>
                            </div>
                        )}
                    </div>

                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                        {kpiData.map(kpi => (
                            <Card key={kpi.title}>
                                <Card.Body>
                                    <div className="flex justify-between items-start">
                                         <p className="text-sm font-bold text-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">{kpi.title}</p>
                                         <Icon className="text-text-secondary/70">{kpi.icon}</Icon>
                                    </div>
                                    <p className="text-3xl font-bold font-heading text-text-primary dark:text-dark-text-primary mt-2">{kpi.value}</p>
                                    <p className={`text-sm mt-1 font-bold ${kpi.changeType === 'positive' ? 'text-system-success' : 'text-system-error'}`}>
                                        {kpi.change} vs last month
                                    </p>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                    
                    {/* Main Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
                        <Card isInteractive={false} className="lg:col-span-3">
                            <Card.Body>
                                <h3 className="font-bold font-heading text-text-primary dark:text-dark-text-primary">Revenue Over Time</h3>
                                <LineChart data={lineChartData} color="brand-orange" />
                            </Card.Body>
                        </Card>
                        <Card isInteractive={false} className="lg:col-span-2">
                             <Card.Body>
                                <h3 className="font-bold font-heading text-text-primary dark:text-dark-text-primary">Sales by Category</h3>
                                <DonutChart data={donutChartData} size={200} strokeWidth={25} className="mt-6" />
                            </Card.Body>
                        </Card>
                    </div>
                    
                    {/* Recent Orders Table */}
                    <div className="mt-6">
                         <Card isInteractive={false}>
                            <Card.Body>
                                <h3 className="font-bold font-heading text-text-primary dark:text-dark-text-primary mb-4">Recent Orders</h3>
                                <Table hoverable striped>
                                    <Table.Header>
                                        <Table.Checkbox
                                            id="select-all-orders"
                                            label="Select all orders on this page"
                                            isHeader
                                            checked={isPageAllSelected}
                                            indeterminate={isPageSomeSelected}
                                            onChange={handleSelectAll}
                                        />
                                        <SortableHeader sortKey="id" sortConfig={sortConfig} onSort={requestSort}>Order ID</SortableHeader>
                                        <SortableHeader sortKey="customer" sortConfig={sortConfig} onSort={requestSort}>Customer</SortableHeader>
                                        <SortableHeader sortKey="date" sortConfig={sortConfig} onSort={requestSort}>Date</SortableHeader>
                                        <SortableHeader sortKey="amount" sortConfig={sortConfig} onSort={requestSort}>Amount</SortableHeader>
                                        <SortableHeader sortKey="status" sortConfig={sortConfig} onSort={requestSort}>Status</SortableHeader>
                                        <Table.HeadCell><span className="sr-only">Actions</span></Table.HeadCell>
                                    </Table.Header>
                                    <Table.Body>
                                        {paginatedData.map(order => (
                                            <Table.Row key={order.id} selected={selectedRows.includes(order.id)}>
                                                <Table.Checkbox
                                                    id={`select-order-${order.id}`}
                                                    label={`Select order ${order.id}`}
                                                    checked={selectedRows.includes(order.id)}
                                                    onChange={(e) => handleSelectOne(e, order.id)}
                                                />
                                                <Table.Cell>
                                                    <span className="font-mono text-brand-orange">{order.id}</span>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar src={order.customer.avatar} name={order.customer.name} size="sm" />
                                                        <span className="font-bold text-text-primary dark:text-dark-text-primary">{order.customer.name}</span>
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell>{order.date}</Table.Cell>
                                                <Table.Cell>{order.amount}</Table.Cell>
                                                <Table.Cell>
                                                    <Badge variant={order.statusVariant}>{order.status}</Badge>
                                                </Table.Cell>
                                                <Table.Cell className="text-right">
                                                    <Button variant="text" size="sm" className="!p-1.5" aria-label="View order details">
                                                        <Icon>more_vert</Icon>
                                                    </Button>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>
                            </Card.Body>
                            <Card.Footer className="justify-between">
                                <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
                                    Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, sortedData.length)} of {sortedData.length} results
                                </span>
                                <Pagination 
                                    currentPage={currentPage} 
                                    totalPages={totalPages} 
                                    onPageChange={setCurrentPage} 
                                />
                            </Card.Footer>
                        </Card>
                    </div>
                </main>
            </div>
        </PageExampleFrame>
    </SectionContainer>
);
}