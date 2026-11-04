"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * A short silent loop laid over a card's poster. Nothing is downloaded until the
 * card is half on screen; it pauses again once scrolled away, and stays a still
 * poster for visitors who prefer reduced motion.
 */
export function LoopPreview({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [seen, setSeen] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          if (video.currentSrc) void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={seen ? src : undefined}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      onPlaying={() => setPlaying(true)}
      className={cn(
        "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
        playing ? "opacity-100" : "opacity-0",
        className,
      )}
    />
  );
}
