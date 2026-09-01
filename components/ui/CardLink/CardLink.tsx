"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";

interface CardLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}

/** Кликабельная карточка: не переходит по ссылке после свайпа в карусели */
export function CardLink({ href, className, children, "aria-label": ariaLabel }: CardLinkProps) {
  const dragRef = useRef(false);
  const startRef = useRef({ x: 0, y: 0 });

  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      draggable={false}
      onPointerDown={(e) => {
        startRef.current = { x: e.clientX, y: e.clientY };
        dragRef.current = false;
      }}
      onPointerMove={(e) => {
        const dx = Math.abs(e.clientX - startRef.current.x);
        const dy = Math.abs(e.clientY - startRef.current.y);
        if (dx > 12 || dy > 12) dragRef.current = true;
      }}
      onClick={(e) => {
        if (dragRef.current) {
          e.preventDefault();
          dragRef.current = false;
        }
      }}
    >
      {children}
    </Link>
  );
}
