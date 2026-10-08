import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: keyof HTMLElementTagNameMap;
}

export function Container({
  children,
  className = "",
  as = "div",
  ...props
}: ContainerProps) {
  const Component = as as "div";
  return (
    <Component
      className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}
