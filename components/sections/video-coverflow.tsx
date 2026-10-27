"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { getThumbnailUrl, getVideoTitle, type Video } from "@/content/videos";
import type { Locale } from "@/i18n/routing";
import { VideoPlayerModal } from "./video-player-modal";

/** How long each video stays in the centre before the carousel moves on. */
const AUTO_ADVANCE_MS = 4000;
/** Cards further than this from the centre are hidden. */
const VISIBLE_RANGE = 3;
/** Size and darkness by distance from the centre (0 = centre). */
const SCALES = [1, 0.78, 0.62, 0.5];
const DIM = [0, 0.52, 0.68, 0.8];

/**
 * Cover-flow carousel: the centre card is large and playable, neighbours shrink
 * and dim as they recede. Auto-advances (pausing on hover, focus, when off-screen
 * or while a video is playing), supports swipe/drag, arrows, dots and keyboard.
 */
export function VideoCoverflow({ videos }: { videos: Video[] }) {
  const locale = useLocale() as Locale;
  const isArabic = locale === "ar";
  const t = useTranslations("videos");
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState<number | null>(null);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  // Some uploads have no maxres thumbnail; those fall back to hq.
  const [hqOnly, setHqOnly] = useState<ReadonlySet<string>>(new Set());
  const stageRef = useRef<HTMLDivElement>(null);
  // A drag ends with a click on whichever card is under the pointer; ignore that click.
  const dragged = useRef(false);
  const n = videos.length;
  // Next card sits to the left in Arabic (reading direction), to the right in English.
  const dir = isArabic ? -1 : 1;

  const go = useCallback((delta: number) => setActive((a) => (a + delta + n) % n), [n]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const paused = hovered || playing !== null || !inView || reducedMotion;
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") go(1);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [paused, go, active]);

  function onDragEnd(_: unknown, info: PanInfo) {
    window.setTimeout(() => (dragged.current = false), 0);
    const swipe = info.offset.x * dir;
    if (swipe < -60 || info.velocity.x * dir < -400) go(1);
    else if (swipe > 60 || info.velocity.x * dir > 400) go(-1);
  }

  const current = videos[active];

  return (
    <div
      className="flex flex-col items-center gap-8 md:gap-10"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      <div
        ref={stageRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={t("carouselLabel")}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(isArabic ? -1 : 1);
          if (e.key === "ArrowLeft") go(isArabic ? 1 : -1);
          if (e.key === "Enter") setPlaying(active);
        }}
        className="relative w-full outline-none"
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragStart={() => (dragged.current = true)}
          onDragEnd={onDragEnd}
          className="relative mx-auto aspect-video w-[74vw] cursor-grab active:cursor-grabbing sm:w-[56vw] lg:w-[580px]"
        >
          {videos.map((video, i) => {
            let offset = i - active;
            if (offset > n / 2) offset -= n;
            if (offset < -n / 2) offset += n;
            const distance = Math.abs(offset);
            const isCenter = offset === 0;
            const title = getVideoTitle(video, locale);
            return (
              <motion.button
                key={video.id}
                type="button"
                tabIndex={isCenter ? 0 : -1}
                aria-hidden={!isCenter}
                aria-label={isCenter ? `${t("play")}: ${title}` : undefined}
                onClick={() => {
                  if (dragged.current) return;
                  if (isCenter) setPlaying(i);
                  else setActive(i);
                }}
                initial={false}
                animate={{
                  x: `${offset * dir * 42}%`,
                  scale: SCALES[Math.min(distance, SCALES.length - 1)],
                  opacity: distance > VISIBLE_RANGE ? 0 : 1,
                }}
                transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 32 }}
                style={{ zIndex: 20 - distance }}
                className={cn(
                  "group absolute inset-0 overflow-hidden rounded-2xl bg-black outline-none",
                  isCenter
                    ? "shadow-[0_40px_90px_-20px_rgb(0_0_0_/_0.9),0_0_0_1px_rgb(255_255_255_/_0.14),0_0_60px_-10px_color-mix(in_srgb,var(--color-accent)_40%,transparent)]"
                    : "shadow-[0_30px_60px_-20px_rgb(0_0_0_/_0.9)]",
                  distance > VISIBLE_RANGE && "pointer-events-none",
                )}
              >
                <Image
                  src={getThumbnailUrl(video.id, hqOnly.has(video.id) ? "hq" : "max")}
                  alt=""
                  fill
                  draggable={false}
                  onError={() => setHqOnly((s) => new Set(s).add(video.id))}
                  sizes="(min-width: 1024px) 580px, (min-width: 640px) 56vw, 74vw"
                  className="object-cover"
                />
                {/* Side cards dim as they recede; the centre card gets a soft bottom fade. */}
                <span
                  className="absolute inset-0 bg-black transition-opacity duration-500"
                  style={{ opacity: DIM[Math.min(distance, DIM.length - 1)] }}
                />
                {isCenter ? (
                  <>
                    <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-black/50" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/40 backdrop-blur-md transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
                        <Play aria-hidden className="ms-1 h-7 w-7 fill-current md:h-8 md:w-8" />
                      </span>
                    </span>
                  </>
                ) : null}
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      <div className="flex min-h-[3.5rem] flex-col items-center gap-1 px-4 text-center" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center gap-1"
          >
            <span className="font-display text-[11px] uppercase tracking-[0.18em] text-accent">
              {t(`categories.${current.category}`)}
            </span>
            <span dir="auto" className="font-display text-lg md:text-2xl">{getVideoTitle(current, locale)}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-5">
        <ArrowButton label={t("previous")} onClick={() => go(-1)} pointsLeft={!isArabic} />
        <div className="flex items-center gap-2">
          {videos.map((video, i) => (
            <button
              key={video.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={t("goTo", { n: i + 1 })}
              aria-current={i === active}
              className="flex h-6 items-center"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-500",
                  i === active ? "w-6 bg-accent" : "w-1.5 bg-white/30 hover:bg-white/60",
                )}
              />
            </button>
          ))}
        </div>
        <ArrowButton label={t("next")} onClick={() => go(1)} pointsLeft={isArabic} />
      </div>

      <VideoPlayerModal
        videos={videos}
        index={playing}
        onClose={() => setPlaying(null)}
        onIndexChange={(i) => {
          setPlaying(i);
          setActive(i);
        }}
      />
    </div>
  );
}

function ArrowButton({ label, onClick, pointsLeft }: { label: string; onClick: () => void; pointsLeft: boolean }) {
  const Icon = pointsLeft ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="glass flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:text-accent"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
