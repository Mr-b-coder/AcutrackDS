// FILE: components/charts.tsx
// This file contains reusable data visualization components.

import React from 'react';
import { Tooltip } from './Tooltip.tsx';
import { Icon } from './icons.tsx';

// --- BAR CHART ---
export type BarChartProps = {
  data: { label: string; value: number; colorClass?: string }[];
  className?: string;
  labelFormat?: (value: number) => string;
};

// A colorful, div-based bar chart.
export const BarChart: React.FC<BarChartProps> = ({ 
    data, 
    className = '', 
    labelFormat = (value) => value.toString()
}) => {
  const maxValue = Math.max(...data.map(d => d.value), 0);
  const defaultColors = [
    'bg-brand-orange',
    'bg-system-info',
    'bg-system-success',
    'bg-brand-navy',
    'bg-system-warning',
    'bg-system-error',
  ];

  return (
    <div className={`w-full ${className}`} role="img" aria-label="Bar chart">
      <div className="flex justify-around items-end h-64 gap-4 border-l border-b border-border-color dark:border-dark-border-color px-4 pt-4">
        {data.map((item, index) => (
          <div key={index} className="relative flex-1 h-full flex items-end justify-center group">
            <div
                role="tooltip"
                className="absolute bottom-full mb-2 w-max px-2 py-1 text-xs font-bold text-white bg-gray-900/90 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10"
            >
                {item.label}: {labelFormat(item.value)}
            </div>
            <div
              className={`w-full max-w-[50px] rounded-t-md transition-all duration-300 ease-in-out group-hover:opacity-80 ${item.colorClass || defaultColors[index % defaultColors.length]}`}
              style={{ height: `${maxValue > 0 ? (item.value / maxValue) * 100 : 0}%` }}
              aria-label={`Bar for ${item.label} with value ${labelFormat(item.value)}`}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-around mt-2 text-xs font-semibold text-text-secondary dark:text-dark-text-secondary gap-4 px-4">
        {data.map((item, index) => (
          <div key={index} className="flex-1 text-center truncate" title={item.label}>{item.label}</div>
        ))}
      </div>
    </div>
  );
};


// --- LINE CHART & AREA CHART ---
export type LineChartColor = 'brand-orange' | 'system-info' | 'system-success' | 'brand-navy' | 'system-error' | 'system-warning';
export type LineChartProps = {
    data: { label: string, value: number }[];
    className?: string;
    color?: LineChartColor;
};

const lineChartColorConfig: Record<LineChartColor, { stroke: string, gradientFrom: string, gradientTo: string }> = {
    'brand-orange': { stroke: '#35B0AB', gradientFrom: 'rgba(53, 176, 171, 0.3)', gradientTo: 'rgba(53, 176, 171, 0)' },
    'system-info': { stroke: '#3b82f6', gradientFrom: 'rgba(59, 130, 246, 0.3)', gradientTo: 'rgba(59, 130, 246, 0)' },
    'system-success': { stroke: '#22c55e', gradientFrom: 'rgba(34, 197, 94, 0.3)', gradientTo: 'rgba(34, 197, 94, 0)' },
    'brand-navy': { stroke: '#1B3A7B', gradientFrom: 'rgba(27, 58, 123, 0.3)', gradientTo: 'rgba(27, 58, 123, 0)' },
    'system-error': { stroke: '#ef4444', gradientFrom: 'rgba(239, 68, 68, 0.3)', gradientTo: 'rgba(239, 68, 68, 0)' },
    'system-warning': { stroke: '#f59e0b', gradientFrom: 'rgba(245, 158, 11, 0.3)', gradientTo: 'rgba(245, 158, 11, 0)' },
};

export const LineChart: React.FC<LineChartProps> = ({
    data,
    className = '',
    color = 'brand-orange'
}) => {
    const { stroke } = lineChartColorConfig[color];
    const width = 500;
    const height = 200;
    const padding = 20;

    if (data.length <= 1) {
      return <div className="w-full h-52 flex items-center justify-center text-text-secondary dark:text-dark-text-secondary">Not enough data for chart.</div>
    }

    const maxValue = Math.max(...data.map(p => p.value), 0);
    const getX = (index: number) => padding + (index / (data.length - 1)) * (width - padding * 2);
    const getY = (value: number) => height - padding - (maxValue > 0 ? (value / maxValue) * (height - padding * 2) : 0);

    const path = data.map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p.value)}`).join(' ');
    
    return (
         <div className={`w-full ${className}`} role="img" aria-label="Line chart">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
                <path d={path} fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                {data.map((p, i) => (
                     <g key={i} className="cursor-pointer">
                        <title>{`${p.label}: ${p.value}`}</title>
                        <circle
                            cx={getX(i)}
                            cy={getY(p.value)}
                            r="5"
                            fill="white"
                            stroke={stroke}
                            strokeWidth="3"
                        />
                    </g>
                ))}
            </svg>
        </div>
    );
};

export const AreaChart: React.FC<LineChartProps> = ({ data, className = '', color = 'brand-orange' }) => {
    const { stroke, gradientFrom, gradientTo } = lineChartColorConfig[color];
    const width = 500;
    const height = 200;
    const padding = 20;

    if (data.length <= 1) {
      return <div className="w-full h-52 flex items-center justify-center text-text-secondary dark:text-dark-text-secondary">Not enough data for chart.</div>
    }

    const maxValue = Math.max(...data.map(p => p.value), 0);
    const getX = (index: number) => padding + (index / (data.length - 1)) * (width - padding * 2);
    const getY = (value: number) => height - padding - (maxValue > 0 ? (value / maxValue) * (height - padding * 2) : 0);

    const path = data.map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p.value)}`).join(' ');
    const areaPath = `${path} L ${getX(data.length - 1)} ${height - padding} L ${getX(0)} ${height - padding} Z`;
    
    return (
         <div className={`w-full ${className}`} role="img" aria-label="Area chart">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
                 <defs>
                    <linearGradient id={`areaGradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={gradientFrom} />
                        <stop offset="100%" stopColor={gradientTo} />
                    </linearGradient>
                </defs>
                <path d={areaPath} fill={`url(#areaGradient-${color})`} />
                <path d={path} fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                 {data.map((p, i) => (
                     <g key={i} className="cursor-pointer">
                        <title>{`${p.label}: ${p.value}`}</title>
                        <circle
                            cx={getX(i)}
                            cy={getY(p.value)}
                            r="5"
                            fill="white"
                            stroke={stroke}
                            strokeWidth="3"
                        />
                    </g>
                ))}
            </svg>
        </div>
    );
};

// --- SCATTER PLOT ---
export type ScatterPlotProps = {
    data: { x: number, y: number }[];
    className?: string;
    color?: LineChartColor;
};

export const ScatterPlot: React.FC<ScatterPlotProps> = ({ data, className = '', color = 'brand-orange' }) => {
    const { stroke } = lineChartColorConfig[color];
    const width = 500;
    const height = 300;
    const padding = 30;

    const maxX = Math.max(...data.map(p => p.x), 0);
    const maxY = Math.max(...data.map(p => p.y), 0);

    const getX = (value: number) => padding + (maxX > 0 ? (value / maxX) * (width - padding * 2) : 0);
    const getY = (value: number) => height - padding - (maxY > 0 ? (value / maxY) * (height - padding * 2) : 0);

    return (
        <div className={`w-full ${className}`} role="img" aria-label="Scatter plot">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
                {/* Axes */}
                <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="currentColor" className="text-border-color dark:text-dark-border-color" strokeWidth="2" />
                <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="currentColor" className="text-border-color dark:text-dark-border-color" strokeWidth="2" />
                
                 {/* Y Axis Labels */}
                {Array.from({ length: 5 }).map((_, i) => (
                    <text key={i} x={padding - 8} y={getY((maxY / 4) * i)} textAnchor="end" alignmentBaseline="middle" className="text-xs fill-current text-text-secondary dark:text-dark-text-secondary">
                        {((maxY / 4) * i).toFixed(0)}
                    </text>
                ))}

                 {/* X Axis Labels */}
                {Array.from({ length: 5 }).map((_, i) => (
                    <text key={i} x={getX((maxX / 4) * i)} y={height - padding + 16} textAnchor="middle" className="text-xs fill-current text-text-secondary dark:text-dark-text-secondary">
                        {((maxX / 4) * i).toFixed(0)}
                    </text>
                ))}

                {/* Points */}
                {data.map((p, i) => (
                    <g key={i}>
                        <title>{`(${p.x}, ${p.y})`}</title>
                        <circle cx={getX(p.x)} cy={getY(p.y)} r="5" fill={stroke} className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer" />
                    </g>
                ))}
            </svg>
        </div>
    );
};


// --- PIE & DONUT CHARTS ---
type PieChartItem = { id: string; value: number; label: string; colorClass: string; };
export type PieChartProps = {
    data: PieChartItem[];
    className?: string;
    size?: number;
};
export type DonutChartProps = PieChartProps & {
    strokeWidth?: number;
};

const getPieWedgePath = (cx: number, cy: number, radius: number, startAngle: number, endAngle: number) => {
    const start = {
        x: cx + radius * Math.cos(startAngle),
        y: cy + radius * Math.sin(startAngle)
    };
    const end = {
        x: cx + radius * Math.cos(endAngle),
        y: cy + radius * Math.sin(endAngle)
    };
    const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";
    return `M ${start.x},${start.y} A ${radius},${radius} 0 ${largeArcFlag} 1 ${end.x},${end.y} L ${cx},${cy} Z`;
};

export const PieChart: React.FC<PieChartProps> = ({ data, className = '', size = 150 }) => {
    const total = data.reduce((acc, item) => acc + item.value, 0);
    let startAngle = -Math.PI / 2;

    return (
         <div className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-4 ${className}`} role="img" aria-label="Pie chart">
            <div className="relative shrink-0" style={{ width: size, height: size }}>
                <svg viewBox={`0 0 ${size} ${size}`}>
                    {data.map(item => {
                        if (item.value === 0) return null;
                        const percentage = total > 0 ? item.value / total : 0;
                        const angle = percentage * 2 * Math.PI;
                        const endAngle = startAngle + angle;
                        const pathData = getPieWedgePath(size / 2, size / 2, size / 2, startAngle, endAngle - 0.0001); // subtract tiny amount to avoid full circle rendering issues
                        startAngle = endAngle;

                        return (
                            <g key={item.id} className="cursor-pointer">
                                <title>{`${item.label}: ${item.value.toLocaleString()}`}</title>
                                <path d={pathData} className={`${item.colorClass.replace('bg-', 'fill-')} transition-opacity hover:opacity-80`} />
                            </g>
                        );
                    })}
                </svg>
            </div>
            <div className="space-y-3">
                {data.map(item => (
                    <div key={item.id} className="flex items-center">
                        <span className={`w-3 h-3 rounded-full mr-3 shrink-0 ${item.colorClass}`}></span>
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
                            <span className="font-bold text-text-primary dark:text-dark-text-primary">{item.label}:</span>
                            <span className="text-text-secondary dark:text-dark-text-secondary font-medium">{item.value.toLocaleString()} ({~~(total > 0 ? (item.value / total * 100) : 0)}%)</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export const DonutChart: React.FC<DonutChartProps> = ({
    data,
    className = '',
    size = 150,
    strokeWidth = 20
}) => {
    const total = data.reduce((acc, item) => acc + item.value, 0);
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    let accumulatedOffset = 0;

    return (
         <div className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-4 ${className}`} role="img" aria-label="Donut chart">
            <div className="relative shrink-0" style={{ width: size, height: size }}>
                <svg viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
                    {data.map(item => {
                        if (item.value === 0) return null;
                        const percentage = total > 0 ? item.value / total : 0;
                        const dasharray = percentage * circumference;
                        const dashoffset = accumulatedOffset * circumference;
                        accumulatedOffset += percentage;

                        return (
                             <circle
                                key={item.id}
                                cx={size / 2}
                                cy={size / 2}
                                r={radius}
                                fill="none"
                                strokeWidth={strokeWidth}
                                strokeDasharray={`${dasharray} ${circumference - dasharray}`}
                                strokeDashoffset={-dashoffset}
                                className={item.colorClass.replace('bg-', 'stroke-')}
                            />
                        );
                    })}
                </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-bold text-text-primary dark:text-dark-text-primary">{total.toLocaleString()}</span>
                    <span className="text-sm text-text-secondary dark:text-dark-text-secondary">Total</span>
                </div>
            </div>
            <div className="space-y-3">
                {data.map(item => (
                    <div key={item.id} className="flex items-center">
                        <span className={`w-3 h-3 rounded-full mr-3 shrink-0 ${item.colorClass}`}></span>
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
                            <span className="font-bold text-text-primary dark:text-dark-text-primary">{item.label}:</span>
                            <span className="text-text-secondary dark:text-dark-text-secondary font-medium">{item.value.toLocaleString()} ({~~(total > 0 ? (item.value / total * 100) : 0)}%)</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};