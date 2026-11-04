"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import {
  getActiveCategories,
  getFilters,
  getVideosFor,
  isComingSoon,
  isVertical,
  VIDEOS,
  type Video,
  type VideoFilter,
} from "@/content/videos";
import { fadeRise, fadeRiseStagger } from "@/lib/motion";
import { VideoCard } from "./video-card";
import { VideoPlayerModal } from "./video-player-modal";
import { ComingSoonVideos } from "./coming-soon-videos";

type Filter = VideoFilter;

/** A heading (shown on the "all" tab only) and one grid of same-shape videos. */
type Section = { key: string; heading: Exclude<VideoFilter, "all">; videos: Video[] };

/**
 * "All": each category's landscape videos, then every reel together at the end.
 * One tab: its landscape videos, then its reels.
 */
function sectionsFor(filter: Filter): Section[] {
  if (filter === "all") {
    const long = getActiveCategories().map((c) => ({
      key: c,
      heading: c,
      videos: VIDEOS.filter((v) => v.category === c && !isVertical(v)),
    }));
    return [...long, { key: "reels", heading: "reels" as const, videos: getVideosFor("reels") }].filter(
      (s) => s.videos.length > 0,
    );
  }
  const all = getVideosFor(filter);
  return [
    { key: `${filter}-long`, heading: filter, videos: all.filter((v) => !isVertical(v)) },
    { key: `${filter}-reels`, heading: filter, videos: all.filter(isVertical) },
  ].filter((s) => s.videos.length > 0);
}

/** How many shorts to show before "Show more" while browsing every category. */
const SHORTS_PREVIEW_COUNT = 12;

export function VideoGallery() {
  const t = useTranslations("videos");
  const [filter, setFilter] = useState<Filter>("all");
  const [shortsExpanded, setShortsExpanded] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<{ videos: Video[]; index: number } | null>(null);

  const filters: Filter[] = getFilters();

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
            const count = getVideosFor(f).length;
            const soon = isComingSoon(f);
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
                <span className={cn("text-xs", !soon && "font-mono", active || soon ? "text-accent" : "text-muted")}>
                  {soon ? t("soon") : count}
                </span>
              </button>
            );
          })}
        </div>

        {isComingSoon(filter) ? <ComingSoonVideos key={filter} category={filter} tone="light" /> : null}

        {sectionsFor(filter).map(({ key, heading, videos: all }) => {
          const vertical = all.every(isVertical);
          const collapsible = vertical && filter === "all" && all.length > SHORTS_PREVIEW_COUNT;
          const shown = collapsible && !shortsExpanded ? all.slice(0, SHORTS_PREVIEW_COUNT) : all;

          return (
            <motion.div
              key={`${filter}-${key}`}
              initial="hidden"
              animate="visible"
              variants={fadeRiseStagger}
              className="flex flex-col gap-6"
            >
              {filter === "all" ? (
                <motion.h2 variants={fadeRise} className="font-display text-2xl md:text-3xl uppercase px-1">
                  {t(`categories.${heading}`)}
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
