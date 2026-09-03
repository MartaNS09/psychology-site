"use client";

import { useEffect, useRef, useState } from "react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";

interface HeroVideoBackgroundProps {
  src: string;
  poster: string;
}

const MOBILE_MQ = "(max-width: 767px)";

export function HeroVideoBackground({ src, poster }: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileMq = window.matchMedia(MOBILE_MQ);

    const sync = () => {
      setReduceMotion(motionMq.matches);
      setIsMobile(mobileMq.matches);
    };

    sync();
    motionMq.addEventListener("change", sync);
    mobileMq.addEventListener("change", sync);
    return () => {
      motionMq.removeEventListener("change", sync);
      mobileMq.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion || isMobile || !videoRef.current) return;

    const video = videoRef.current;
    video.play().catch(() => {
      /* autoplay blocked — poster remains visible */
    });
  }, [reduceMotion, isMobile]);

  /* Mobile / reduced motion: static poster + soft Ken Burns — no video decode lag */
  if (reduceMotion || isMobile) {
    return (
      <div
        className={`hero__video-fallback${reduceMotion ? "" : " hero__video-fallback_kenburns"}`}
        aria-hidden="true"
      >
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
