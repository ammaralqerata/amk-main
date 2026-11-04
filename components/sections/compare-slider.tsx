"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

/** Seconds the "before" video may drift from the "after" one before it is snapped back. */
const MAX_DRIFT = 0.08;

/**
 * Before/after slider: the raw and the finished video play in sync, stacked;
 * dragging the line reveals more of one or the other. "Before" sits on the
 * reading-start side (right in Arabic). Both files stream, nothing waits for a full download.
 */
export function CompareSlider({
  before,
  after,
  poster,
  start = 0,
  className,
}: {
  before: string;
  after: string;
  poster?: string;
  /** Second to open on; later loops start from 0. */
  start?: number;
  className?: string;
}) {
  const t = useTranslations("videos");
  const rtl = useLocale() === "ar";
  const frameRef = useRef<HTMLDivElement>(null);
  const beforeRef = useRef<HTMLVideoElement>(null);
  const afterRef = useRef<HTMLVideoElement>(null);
  const dragging = useRef(false);
  /** Share of the frame given to "before", measured from the start side (0–100). */
  const [split, setSplit] = useState(50);
  const [paused, setPaused] = useState(false);
  const [hinted, setHinted] = useState(true);

  // Keep "before" locked to "after" (the master clock).
  useEffect(() => {
    const a = afterRef.current;
    const b = beforeRef.current;
    if (!a || !b) return;
    let raf = 0;
    const tick = () => {
      if (Math.abs(b.currentTime - a.currentTime) > MAX_DRIFT) b.currentTime = a.currentTime;
      raf = requestAnimationFrame(tick);
    };
    const onPlay = () => void b.play().catch(() => {});
    const onPause = () => b.pause();
    const onSeek = () => (b.currentTime = a.currentTime);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("seeked", onSeek);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("seeked", onSeek);
    };
  }, []);

  const moveTo = useCallback(
    (clientX: number) => {
      const frame = frameRef.current;
      if (!frame) return;
      const box = frame.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (clientX - box.left) / box.width));
      setSplit((rtl ? 1 - x : x) * 100);
      setHinted(false);
    },
    [rtl],
  );

  function togglePlay() {
    const a = afterRef.current;
    if (!a) return;
    if (a.paused) {
      void a.play().catch(() => {});
      setPaused(false);
    } else {
      a.pause();
      setPaused(true);
    }
  }

  // Divider position from the physical left edge.
  const left = rtl ? 100 - split : split;
  const beforeClip = rtl ? `inset(0 0 0 ${left}%)` : `inset(0 ${100 - left}% 0 0)`;

  return (
    <div className={cn("relative h-full w-full select-none overflow-hidden bg-black", className)}>
      <div
        ref={frameRef}
        className="absolute inset-0 cursor-ew-resize touch-pan-y"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          moveTo(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && moveTo(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <video
          ref={afterRef}
          src={after}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedMetadata={(e) => {
            if (start) e.currentTarget.currentTime = start;
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <video
          ref={beforeRef}
          src={before}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          style={{ clipPath: beforeClip }}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Labels sit in the corner of their own side */}
        <span className="pointer-events-none absolute top-3 start-3 rounded-full bg-black/60 px-3 py-1 text-xs font-bold tracking-wide text-white backdrop-blur-sm">
          {t("before")}
        </span>
        <span className="pointer-events-none absolute top-3 end-3 rounded-full bg-accent px-3 py-1 text-xs font-bold tracking-wide text-accent-fg">
          {t("after")}
        </span>

        {/* Divider + handle */}
        <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_12px_rgb(0_0_0/0.6)]" style={{ left: `${left}%` }}>
          <span
            className={cn(
              "absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-black/50 text-white backdrop-blur-sm",
              hinted && "motion-safe:animate-pulse",
            )}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m9 6-6 6 6 6M15 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>

      {hinted ? (
        <span className="pointer-events-none absolute inset-x-0 bottom-16 mx-auto w-max rounded-full bg-black/65 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm">
          {t("compareHint")}
        </span>
      ) : null}

      {/* Keyboard / screen-reader control for the same split */}
      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(split)}
        onChange={(e) => {
          setSplit(Number(e.target.value));
          setHinted(false);
        }}
        aria-label={t("compareLabel")}
        className="sr-only"
      />

      <button
        type="button"
        onClick={togglePlay}
        aria-label={paused ? t("resume") : t("pause")}
        title={paused ? t("resume") : t("pause")}
        className="absolute bottom-3 end-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {paused ? <Play className="h-4 w-4 fill-current" /> : <Pause className="h-4 w-4 fill-current" />}
      </button>
    </div>
  );
}
