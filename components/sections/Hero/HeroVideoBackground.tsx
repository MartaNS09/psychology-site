"use client";

import { useEffect, useRef, useState } from "react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";

interface HeroVideoBackgroundProps {
  src: string;
  poster: string;
}

export function HeroVideoBackground({ src, poster }: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduceMotion || !videoRef.current) return;

    const video = videoRef.current;
    video.play().catch(() => {
      /* autoplay blocked — poster remains visible */
    });
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <div className="hero__video-fallback" aria-hidden="true">
        <OptimizedImage
          src={poster}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero__video-poster"
        />
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      className="hero__video"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
