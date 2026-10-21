"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Showreel } from "@/content/showreel";

/**
 * Full-bleed muted showreel behind the hero. Pauses itself when scrolled out of
 * view (saves battery), never autoplays for reduced-motion visitors, and has a
 * pause button (moving content that plays on its own must be pausable).
 */
export function ShowreelBackground({ reel }: { reel: Showreel }) {
  const t = useTranslations("hero");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const userPaused = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      userPaused.current = true;
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !userPaused.current) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  }

  return (
    <>
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={reel.src}
          poster={reel.poster}
          muted
          loop
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            if (v.duration) setProgress(v.currentTime / v.duration);
          }}
        />
        {/* Darken for legible text. Phones: text spans the full width, so an even, stronger tint.
            Larger screens: heavier on the text side only, letting the reel show on the other. */}
        <div className="absolute inset-0 bg-black/65 md:bg-black/40" />
        <div className="absolute inset-0 hidden md:block ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-inverse" />
      </div>

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? t("pauseReel") : t("playReel")}
        className="glass absolute bottom-5 end-4 z-10 flex items-center gap-3 rounded-full py-2 ps-2 pe-4 text-white md:bottom-8 md:end-12"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
          {playing ? <Pause aria-hidden className="h-3.5 w-3.5" /> : <Play aria-hidden className="h-3.5 w-3.5 fill-current" />}
        </span>
        <span className="flex flex-col gap-1.5">
          <span className="font-display text-[10px] tracking-[0.25em] text-white/70">SHOWREEL</span>
          <span className="block h-0.5 w-20 overflow-hidden rounded-full bg-white/20" dir="ltr">
            <span className="block h-full bg-accent" style={{ width: `${progress * 100}%` }} />
          </span>
        </span>
      </button>
    </>
  );
}
