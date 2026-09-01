import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils";
import "./Button.scss";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  ariaLabel?: string;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "medium",
  icon,
  ariaLabel,
  children,
  className,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "button",
        `button_${variant}`,
        size !== "medium" && `button_${size}`,
        disabled && "button_disabled",
        className
      )}
      disabled={disabled}
      aria-label={ariaLabel}
      role="button"
      {...props}
    >
      {icon && (
        <span className="button__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="button__label">{children}</span>
    </button>
  );
}
