"use client";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { getEmbedUrl, getVideoTitle, getWatchUrl, isVertical, type Video } from "@/content/videos";
import type { Locale } from "@/i18n/routing";

/**
 * Full-screen YouTube player. The iframe is only created once a video is
 * opened, so the page itself never loads YouTube's player up front.
 */
export function VideoPlayerModal({
  videos,
  index,
  onClose,
  onIndexChange,
}: {
  videos: Video[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  const locale = useLocale() as Locale;
  const isArabic = locale === "ar";
  const t = useTranslations("videos");
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;
  const video = open ? videos[index] : undefined;
  const hasSiblings = videos.length > 1;
  // Portals need document.body, which only exists after hydration.
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      onIndexChange((index + delta + videos.length) % videos.length);
    },
    [index, onIndexChange, videos.length],
  );

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      // Arrow keys follow reading direction: "forward" is left in Arabic.
      if (e.key === "ArrowRight") step(isArabic ? -1 : 1);
      if (e.key === "ArrowLeft") step(isArabic ? 1 : -1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, step, isArabic]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {video ? (
        <motion.div
          key="video-modal"
          role="dialog"
          aria-modal="true"
          aria-label={getVideoTitle(video, locale)}
          dir={isArabic ? "rtl" : "ltr"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-sm text-inverse-fg"
          onClick={onClose}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-8 md:py-5" onClick={(e) => e.stopPropagation()}>
            <p className="font-mono text-sm text-white/60" dir="ltr">
              {hasSiblings ? `${String(index! + 1).padStart(2, "0")} / ${String(videos.length).padStart(2, "0")}` : null}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={t("close")}
              title={t("close")}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20">
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "relative overflow-hidden rounded-xl bg-black shadow-2xl shadow-black/50",
                isVertical(video)
                  ? "aspect-[9/16] h-full max-h-[min(100%,820px)] max-w-full"
                  : "aspect-video w-full max-w-[1100px] max-h-full",
              )}
            >
              <iframe
                src={getEmbedUrl(video.id)}
                title={getVideoTitle(video, locale)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                className="absolute inset-0 h-full w-full"
              />
            </motion.div>

            {hasSiblings ? (
              <>
                <NavButton side="start" label={t("previous")} onClick={() => step(-1)} isArabic={isArabic} />
                <NavButton side="end" label={t("next")} onClick={() => step(1)} isArabic={isArabic} />
              </>
            ) : null}
          </div>

          <div
            className="mx-auto flex w-full max-w-[1100px] flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-8 md:py-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-1">
              <span className="font-display text-[11px] tracking-[0.18em] uppercase text-accent">
                {t(`categories.${video.category}`)}
              </span>
              <h2 className="font-display text-lg md:text-xl leading-snug">
                <bdi>{getVideoTitle(video, locale)}</bdi>
              </h2>
            </div>
            <div className="flex items-center justify-between gap-4">
              <a
                href={getWatchUrl(video)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 text-sm text-white/70 transition-colors hover:text-accent"
              >
                {t("watchOnYoutube")}
                <ExternalLink aria-hidden className="h-4 w-4" />
              </a>
              {hasSiblings ? (
                <div className="flex gap-2 md:hidden">
                  <MobileNavButton label={t("previous")} onClick={() => step(-1)} pointsLeft={!isArabic} />
                  <MobileNavButton label={t("next")} onClick={() => step(1)} pointsLeft={isArabic} />
                </div>
              ) : null}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

function noopSubscribe() {
  return () => {};
}

function MobileNavButton({
  label,
  onClick,
  pointsLeft,
}: {
  label: string;
  onClick: () => void;
  pointsLeft: boolean;
}) {
  const Icon = pointsLeft ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors hover:bg-white hover:text-black"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}

function NavButton({
  side,
  label,
  onClick,
  isArabic,
}: {
  side: "start" | "end";
  label: string;
  onClick: () => void;
  isArabic: boolean;
}) {
  // "start" is the previous video: right side in Arabic, left side in English.
  const pointsLeft = side === "start" ? !isArabic : isArabic;
  const Icon = pointsLeft ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={label}
      title={label}
      className={cn(
        "absolute top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:inline-flex",
        side === "start" ? "start-4" : "end-4",
      )}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
