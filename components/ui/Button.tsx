import React from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  pill?: boolean;
  className?: string;
  children?: React.ReactNode;
}

type ButtonAsButton = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
    ref?: React.Ref<HTMLButtonElement>;
  };

type ButtonAsAnchor = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    ref?: React.Ref<HTMLAnchorElement>;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button({
  variant = "primary",
  size = "md",
  pill = false,
  className = "",
  children,
  ref,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-sans font-medium transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F7FCF] focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed";

  const radiusStyles = pill ? "rounded-full" : "rounded-lg";

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
    icon: "p-2.5 text-sm aspect-square",
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-[#4F7FCF] text-white hover:bg-[#315DA8] shadow-sm hover:shadow-md",
    secondary:
      "bg-white border border-[#E2E8F0] text-[#1F2937] hover:border-[#4F7FCF] hover:text-[#4F7FCF] hover:bg-[#F7F9FC]",
    outline:
      "bg-transparent border border-[#E2E8F0] text-[#1F2937] hover:border-[#4F7FCF] hover:text-[#4F7FCF] hover:bg-[#F7F9FC]",
    ghost:
      "bg-transparent text-[#64748B] hover:text-[#1F2937] hover:bg-[#1F2937]/5",
  };

  const combinedClasses = `${baseStyles} ${radiusStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`.trim();

  if ("href" in props && typeof props.href === "string") {
    const { href, ...anchorProps } = props as ButtonAsAnchor;
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={combinedClasses}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={buttonProps.type || "button"}
      className={combinedClasses}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
