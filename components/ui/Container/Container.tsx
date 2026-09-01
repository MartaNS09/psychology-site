import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils";
import "./Container.scss";

type ContainerVariant = "default" | "narrow" | "wide" | "fluid";

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: ContainerVariant;
  children: ReactNode;
}

export function Container({
  as: Tag = "div",
  variant = "default",
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "container",
        variant !== "default" && `container_${variant}`,
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
