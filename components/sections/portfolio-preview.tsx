"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./eyebrow";
import { SectionMark } from "@/components/ui/section-mark";
import {
  getFeaturedVideos,
  getFilterCategories,
  getVideosByCategory,
  isComingSoon,
  isVertical,
  VIDEOS,
  type VideoCategory,
} from "@/content/videos";
import { fadeRise, fadeRiseStagger } from "@/lib/motion";
import { VideoCoverflow } from "./video-coverflow";
import { ReelsStrip } from "./reels-strip";
import { ComingSoonVideos } from "./coming-soon-videos";

type Filter = VideoCategory | "all";

const FEATURED = getFeaturedVideos();
const FILTERS: Filter[] = ["all", ...getFilterCategories()];

/** Landscape videos go in the cover-flow, vertical ones in the reels strip under it. */
function videosFor(filter: Filter) {
  if (filter === "all") return { long: FEATURED, reels: VIDEOS.filter(isVertical) };
  const all = getVideosByCategory(filter);
  return { long: all.filter((v) => !isVertical(v)), reels: all.filter(isVertical) };
}

export function PortfolioPreview() {
  const t = useTranslations("portfolioPreview");
  const tVideos = useTranslations("videos");
  const [filter, setFilter] = useState<Filter>("all");
  const { long, reels } = videosFor(filter);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={fadeRiseStagger}
      className="relative overflow-hidden bg-inverse text-inverse-fg"
    >
      {/* Vivid stage light behind the carousel */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_45%,color-mix(in_srgb,var(--color-accent)_20%,transparent),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(40%_45%_at_15%_70%,rgb(255_255_255_/_0.06),transparent_70%),radial-gradient(40%_45%_at_85%_40%,color-mix(in_srgb,var(--color-accent)_16%,transparent),transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-inverse to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-inverse" />
      </div>

      <div className="relative mx-auto flex max-w-[var(--container-max)] flex-col gap-8 px-4 py-16 md:gap-10 md:px-12 md:py-24">
        <motion.header variants={fadeRise} className="flex flex-col items-center gap-4 text-center">
          <Eyebrow tone="dark" icon={<SectionMark kind="portfolio" className="h-3.5 w-3.5" />}>{t("eyebrow")}</Eyebrow>
          <h2 className="font-display text-4xl uppercase md:text-5xl lg:text-6xl">{t("heading")}</h2>
        </motion.header>

        <motion.div
          variants={fadeRise}
          role="group"
          aria-label={tVideos("filterLabel")}
          className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] md:mx-0 md:flex-wrap md:justify-center md:px-0"
        >
          {FILTERS.map((f) => {
            const active = filter === f;
            const soon = f !== "all" && isComingSoon(f);
            return (
              <button
                key={f}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f)}
                className={cn(
                  "inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border px-5 text-sm font-semibold transition-colors",
                  active
                    ? "border-accent bg-accent text-accent-fg"
                    : "border-white/15 bg-white/[0.04] text-white/80 hover:border-white/40 hover:text-white",
                )}
              >
                {f === "all" ? tVideos("all") : tVideos(`categories.${f}`)}
                {soon ? (
                  <span className={cn("rounded-full px-2 py-0.5 text-[11px]", active ? "bg-black/20" : "bg-accent/20 text-accent")}>
                    {tVideos("soon")}
                  </span>
                ) : null}
              </button>
            );
          })}
        </motion.div>

        {filter !== "all" && isComingSoon(filter) ? <ComingSoonVideos key={filter} category={filter} tone="dark" /> : null}

        {long.length > 0 ? (
          <motion.div variants={fadeRise} className="-mx-4 overflow-hidden py-4 md:-mx-12">
            {/* key: a new filter starts the carousel from its first video */}
            <VideoCoverflow key={filter} videos={long} />
          </motion.div>
        ) : null}

        {reels.length > 0 ? (
          <motion.div variants={fadeRise} className="flex flex-col gap-4">
            <h3 className="px-1 font-display text-lg uppercase text-white/80 md:text-xl">{tVideos("categories.shorts")}</h3>
            <div className="-mx-4 md:-mx-12">
              <ReelsStrip key={filter} videos={reels} />
            </div>
          </motion.div>
        ) : null}

        <motion.div variants={fadeRise} className="flex justify-center">
          <Button href="/portfolio" variant="ghost">{t("viewAll")}</Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
