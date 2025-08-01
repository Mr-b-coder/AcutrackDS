// FILE: components/Container.tsx
// This component provides a centered, max-width container for page content.

import React from 'react';

type ContainerProps<C extends React.ElementType> = { as?: C; children?: React.ReactNode; className?: string; };

const ContainerFC = <C extends React.ElementType = "div">({ as, children, className, ...rest }: ContainerProps<C> & Omit<React.ComponentPropsWithoutRef<C>, keyof ContainerProps<C>>) => {
  const Component = as || "div";
  return <Component className={`w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 ${className}`} {...rest}>{children}</Component>;
};
export const Container = ContainerFC;
