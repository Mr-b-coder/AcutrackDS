// FILE: components/sections/DataVisualizationSection.tsx
// This section documents data visualization components like charts.

import React, { useState, useMemo } from 'react';
import { SectionContainer, ComponentPreview, SubSection, PropsTable, Button, Radio } from '../Content.tsx';
import { Icon } from '../icons.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';
import CodeBlock from '../CodeBlock.tsx';
import { PropDef } from '../../types.ts';
import { 
    BarChart, 
    LineChart, 
    DonutChart, 
    AreaChart, 
    ScatterPlot, 
    PieChart,
    LineChartProps, 
    BarChartProps, 
    DonutChartProps, 
    PieChartProps, 
    ScatterPlotProps 
} from '../charts.tsx';

// --- PROPS DEFINITIONS ---
const barChartProps: PropDef[] = [
    { name: 'data', type: '{ label: string; value: number; colorClass?: string; }[]', default: 'N/A', description: 'Array of data objects for each bar. The `colorClass` is optional.' },
    { name: 'className', type: 'string', default: '""', description: 'Optional CSS classes for the container.' },
    { name: 'labelFormat', type: '(value: number) => string', default: 'value.toString()', description: 'Function to format the tooltip value.' },
];
const lineAreaChartProps: PropDef[] = [
    { name: 'data', type: '{ label: string; value: number; }[]', default: 'N/A', description: 'Array of data points for the line.' },
    { name: 'className', type: 'string', default: '""', description: 'Optional CSS classes for the container.' },
    { name: 'color', type: "'brand-orange' | 'system-info' | ...", default: "'brand-orange'", description: 'Sets the color theme for the line, gradient, and markers.' },
];
const scatterPlotProps: PropDef[] = [
    { name: 'data', type: '{ x: number, y: number }[]', default: '[]', description: 'Array of data points with x and y coordinates.' },
    { name: 'className', type: 'string', default: '""', description: 'Optional CSS classes for the container.' },
    { name: 'color', type: "'brand-orange' | 'system-info' | ...", default: "'brand-orange'", description: 'Sets the color theme for the points.' },
];
const pieChartProps: PropDef[] = [
    { name: 'data', type: '{ id, value, label, colorClass }[]', default: 'N/A', description: 'Array of data for each chart segment.' },
    { name: 'className', type: 'string', default: '""', description: 'Optional CSS classes for the container.' },
    { name: 'size', type: 'number', default: '150', description: 'The width and height of the chart in pixels.' },
];
const donutChartProps: PropDef[] = [
    ...pieChartProps,
    { name: 'strokeWidth', type: 'number', default: '20', description: 'The thickness of the donut ring in pixels.' },
];

// --- INITIAL DATA & COMPONENT ---
const chartTypes = ['Bar', 'Line', 'Area', 'Scatter', 'Pie', 'Donut'];

const initialChartData = [
    { label: 'Jan', value1: 120, value2: 30, colorClass: 'bg-brand-orange' },
    { label: 'Feb', value1: 180, value2: 50, colorClass: 'bg-system-info' },
    { label: 'Mar', value1: 150, value2: 40, colorClass: 'bg-system-success' },
    { label: 'Apr', value1: 220, value2: 80, colorClass: 'bg-brand-navy' },
    { label: 'May', value1: 190, value2: 60, colorClass: 'bg-system-warning' },
    { label: 'Jun', value1: 250, value2: 90, colorClass: 'bg-system-error' },
];

const generalChartCode = `import { BarChart, LineChart, AreaChart, ScatterPlot, PieChart, DonutChart } from './components/charts';

// Data should be structured according to the chart type you need.
const data = [
    { label: 'Jan', value: 120 }, 
    { label: 'Feb', value: 180 },
];

<BarChart data={data} />
`;

export const DataVisualizationSection: React.FC<{ groupTitle: string; sectionTitle: string; id: string; }> = ({ groupTitle, sectionTitle, id }) => {
    const [chartData, setChartData] = useState(initialChartData);
    const [chartType, setChartType] = useState('Bar');

    const randomizeData = () => {
        setChartData(prev => prev.map(item => ({
            ...item,
            value1: Math.round(Math.random() * 250) + 50,
            value2: Math.round(Math.random() * 80) + 20,
        })));
    };
    
    // Data transformations for different chart types
    const barLineAreaData = useMemo(() => chartData.map(d => ({ label: d.label, value: d.value1 })), [chartData]);
    const scatterData = useMemo(() => chartData.map(d => ({ x: d.value1, y: d.value2 })), [chartData]);
    const pieDonutData = useMemo(() => chartData.map(d => ({ id: d.label.toLowerCase(), label: d.label, value: d.value1, colorClass: d.colorClass })), [chartData]);

    return (
        <SectionContainer id={id}>
            <Breadcrumb group={groupTitle} section={sectionTitle} />
            <h2 className="section-title">Data Visualization</h2>
            <p className="section-subtitle">
                Transform complex data into clear, compelling stories. Our chart components are designed to be clean, responsive, and easy to integrate, helping users quickly understand key insights.
            </p>

            <SubSection title="Interactive Chart Explorer">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    Use the controls to switch between different chart types and see how the same underlying data can be represented in multiple ways. Click "Randomize Data" to see the charts animate and update.
                </p>
                <div className="grid lg:grid-cols-4 gap-8 mt-8">
                    {/* Controls */}
                    <div className="lg:col-span-1 space-y-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Chart Type</h4>
                            <div className="space-y-2">
                                {chartTypes.map(type => (
                                    <Radio key={type} id={`chart-type-${type}`} name="chart-type" label={type} value={type} checked={chartType === type} onChange={() => setChartType(type)} />
                                ))}
                            </div>
                        </div>
                        <Button onClick={randomizeData} leftIcon={<Icon>casino</Icon>} className="w-full">Randomize Data</Button>
                    </div>

                    {/* Preview */}
                    <div className="lg:col-span-3">
                        <ComponentPreview className="min-h-[24rem]">
                            {chartType === 'Bar' && <BarChart data={barLineAreaData} />}
                            {chartType === 'Line' && <LineChart data={barLineAreaData} />}
                            {chartType === 'Area' && <AreaChart data={barLineAreaData} />}
                            {chartType === 'Scatter' && <ScatterPlot data={scatterData} />}
                            {chartType === 'Pie' && <PieChart data={pieDonutData} />}
                            {chartType === 'Donut' && <DonutChart data={pieDonutData} />}
                        </ComponentPreview>
                        <CodeBlock code={generalChartCode} />
                    </div>
                </div>
            </SubSection>

            <SubSection title="Component Props">
                <div className="space-y-12">
                     <div>
                        <h4 className="font-bold mb-2 text-text-primary dark:text-dark-text-primary">{'<BarChart />'}</h4>
                        <PropsTable data={barChartProps as PropDef[]} />
                    </div>
                     <div>
                        <h4 className="font-bold mb-2 text-text-primary dark:text-dark-text-primary">{'<LineChart /> & <AreaChart />'}</h4>
                        <PropsTable data={lineAreaChartProps as PropDef[]} />
                    </div>
                    <div>
                        <h4 className="font-bold mb-2 text-text-primary dark:text-dark-text-primary">{'<ScatterPlot />'}</h4>
                        <PropsTable data={scatterPlotProps as PropDef[]} />
                    </div>
                     <div>
                        <h4 className="font-bold mb-2 text-text-primary dark:text-dark-text-primary">{'<PieChart />'}</h4>
                        <PropsTable data={pieChartProps as PropDef[]} />
                    </div>
                     <div>
                        <h4 className="font-bold mb-2 text-text-primary dark:text-dark-text-primary">{'<DonutChart />'}</h4>
                        <PropsTable data={donutChartProps as PropDef[]} />
                    </div>
                </div>
            </SubSection>

            <SubSection title="Best Practices">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <Icon className="!text-2xl text-system-success mt-1 shrink-0">check_circle</Icon>
                            <div>
                                <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Choose the Right Chart</h4>
                                <p className="text-sm">Use line/area charts for trends, bar charts for comparisons, scatter plots for correlations, and pie/donut charts for proportions. Don't use a pie chart for more than 5-7 categories.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Icon className="!text-2xl text-system-success mt-1 shrink-0">check_circle</Icon>
                            <div>
                                <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Label Clearly</h4>
                                <p className="text-sm">Ensure every chart and its axes are labeled clearly. Use tooltips to provide specific data points on hover. Specify units (e.g., $, %, users) to avoid ambiguity.</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <Icon className="!text-2xl text-system-error mt-1 shrink-0">cancel</Icon>
                            <div>
                                <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Avoid Clutter</h4>
                                <p className="text-sm">Don't overload a chart with too much data or unnecessary elements like 3D effects or shadows. Simplicity is key to clarity.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Icon className="!text-2xl text-system-error mt-1 shrink-0">cancel</Icon>
                            <div>
                                <h4 className="font-bold text-text-primary dark:text-dark-text-primary">Don't Mislead with Axes</h4>
                                <p className="text-sm">For bar charts, the Y-axis should almost always start at zero to provide an accurate, non-distorted representation of the data.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </SubSection>

        </SectionContainer>
    );
};