import Image, { type ImageProps } from "next/image";
import { cn } from "@/utils";

type OptimizedImageProps = Omit<ImageProps, "alt"> & {
  alt: string;
  className?: string;
};

/** Обёртка над next/image. Для fill — родитель с position: relative; иначе width + height. */
export function OptimizedImage({
  className,
  loading,
  priority,
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      {...props}
      priority={priority}
      loading={loading ?? (priority ? undefined : "lazy")}
      className={cn("optimized-image", className)}
    />
  );
}
