"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import {
  getVideosByCategory,
  VIDEO_CATEGORIES,
  VIDEOS,
  type Video,
  type VideoCategory,
} from "@/content/videos";
import { fadeRise, fadeRiseStagger } from "@/lib/motion";
import { VideoCard } from "./video-card";
import { VideoPlayerModal } from "./video-player-modal";

type Filter = VideoCategory | "all";

/** How many shorts to show before "Show more" while browsing every category. */
const SHORTS_PREVIEW_COUNT = 12;

export function VideoGallery() {
  const t = useTranslations("videos");
  const [filter, setFilter] = useState<Filter>("all");
  const [shortsExpanded, setShortsExpanded] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<{ videos: Video[]; index: number } | null>(null);

  const filters: Filter[] = ["all", ...VIDEO_CATEGORIES];
  const visibleCategories = filter === "all" ? VIDEO_CATEGORIES : [filter];

  function selectFilter(next: Filter) {
    setFilter(next);
    // If the filter bar is pinned mid-list, jump back to the start of the results.
    const top = topRef.current;
    if (top && top.getBoundingClientRect().top < 0) top.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="bg-bg text-fg">
      <div className="relative mx-auto max-w-[var(--container-max)] px-4 md:px-12 py-10 md:py-16 flex flex-col gap-10 md:gap-14">
        {/* Scroll anchor: sits just above the filter bar, offset for the sticky site header */}
        <div ref={topRef} aria-hidden className="absolute top-6 md:top-12 scroll-mt-[60px] md:scroll-mt-[72px]" />
        <div
          role="group"
          aria-label={t("filterLabel")}
          className="sticky top-[60px] md:top-[72px] z-30 -mx-4 px-4 py-3 bg-bg/90 backdrop-blur-md flex gap-2 overflow-x-auto [scrollbar-width:none]"
        >
          {filters.map((f) => {
            const count = f === "all" ? VIDEOS.length : getVideosByCategory(f).length;
            const active = filter === f;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={active}
                onClick={() => selectFilter(f)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 min-h-[44px] text-sm font-semibold transition-colors",
                  active
                    ? "border-inverse bg-inverse text-inverse-fg"
                    : "border-border text-fg hover:border-fg",
                )}
              >
                {f === "all" ? t("all") : t(`categories.${f}`)}
                <span className={cn("font-mono text-xs", active ? "text-accent" : "text-muted")}>{count}</span>
              </button>
            );
          })}
        </div>

        {visibleCategories.map((category) => {
          const all = getVideosByCategory(category);
          const vertical = category === "shorts";
          const collapsible = vertical && filter === "all" && all.length > SHORTS_PREVIEW_COUNT;
          const shown = collapsible && !shortsExpanded ? all.slice(0, SHORTS_PREVIEW_COUNT) : all;

          return (
            <motion.div
              key={`${filter}-${category}`}
              initial="hidden"
              animate="visible"
              variants={fadeRiseStagger}
              className="flex flex-col gap-6"
            >
              {filter === "all" ? (
                <motion.h2 variants={fadeRise} className="font-display text-2xl md:text-3xl uppercase px-1">
                  {t(`categories.${category}`)}
                </motion.h2>
              ) : null}
              <div
                className={cn(
                  "grid gap-x-4 gap-y-8 md:gap-x-6",
                  vertical
                    ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
                )}
              >
                {shown.map((video, i) => (
                  <motion.div key={video.id} variants={fadeRise}>
                    <VideoCard
                      video={video}
                      onPlay={() => setPlayer({ videos: all, index: i })}
                      sizes={
                        vertical
                          ? "(min-width: 1024px) 200px, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
                          : "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                      }
                    />
                  </motion.div>
                ))}
              </div>
              {collapsible ? (
                <button
                  type="button"
                  onClick={() => setShortsExpanded((v) => !v)}
                  className="self-center inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 min-h-[44px] text-sm font-semibold transition-colors hover:border-fg"
                >
                  {shortsExpanded ? t("showLess") : t("showMore", { count: all.length - SHORTS_PREVIEW_COUNT })}
                </button>
              ) : null}
            </motion.div>
          );
        })}
      </div>

      <VideoPlayerModal
        videos={player?.videos ?? []}
        index={player?.index ?? null}
        onClose={() => setPlayer(null)}
        onIndexChange={(index) => setPlayer((p) => (p ? { ...p, index } : p))}
      />
    </section>
  );
}
