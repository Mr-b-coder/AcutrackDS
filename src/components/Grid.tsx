// FILE: components/Grid.tsx
// This component provides a responsive grid layout.

import React from 'react';

type GridProps<C extends React.ElementType> = { as?: C; children?: React.ReactNode; className?: string; gap?: number; columns?: number | { sm?: number; md?: number; lg?: number; xl?: number; }; };
const GridFC = <C extends React.ElementType = "div">({ as, children, className, gap = 4, columns = 1, ...rest }: GridProps<C> & Omit<React.ComponentPropsWithoutRef<C>, keyof GridProps<C>>) => {
  const Component = as || "div";
  const gridClasses = typeof columns === 'number' ? `grid-cols-${columns}` : [
    columns.sm ? `sm:grid-cols-${columns.sm}` : '',
    columns.md ? `md:grid-cols-${columns.md}` : '',
    columns.lg ? `lg:grid-cols-${columns.lg}` : '',
    columns.xl ? `xl:grid-cols-${columns.xl}` : '',
  ].join(' ');
  return <Component className={`grid grid-cols-1 gap-${gap} ${gridClasses} ${className}`} {...rest}>{children}</Component>;
};
export const Grid = GridFC;
