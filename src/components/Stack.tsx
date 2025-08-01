// FILE: components/Stack.tsx
// This component arranges children in a vertical stack with a specified gap.

import React from 'react';

type StackProps<C extends React.ElementType> = { as?: C; children?: React.ReactNode; className?: string; gap?: number; };
const StackFC = <C extends React.ElementType = "div">({ as, children, className, gap = 4, ...rest }: StackProps<C> & Omit<React.ComponentPropsWithoutRef<C>, keyof StackProps<C>>) => {
  const Component = as || "div";
  return <Component className={`flex flex-col gap-${gap} ${className}`} {...rest}>{children}</Component>;
};
export const Stack = StackFC;
