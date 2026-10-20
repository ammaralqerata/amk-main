"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "./eyebrow";
import { SectionMark } from "@/components/ui/section-mark";
import { getFeaturedVideos } from "@/content/videos";
import { fadeRise, fadeRiseStagger } from "@/lib/motion";
import { VideoCard } from "./video-card";
import { VideoPlayerModal } from "./video-player-modal";

const FEATURED = getFeaturedVideos();

export function PortfolioPreview() {
  const t = useTranslations("portfolioPreview");
  const [playing, setPlaying] = useState<number | null>(null);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={fadeRiseStagger}
      className="bg-bg text-fg"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-4 md:px-12 py-16 md:py-24 flex flex-col gap-8 md:gap-12">
        <motion.header variants={fadeRise} className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between px-4">
          <div className="flex flex-col gap-3">
            <Eyebrow icon={<SectionMark kind="portfolio" className="h-3.5 w-3.5" />}>{t("eyebrow")}</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[42px] uppercase">{t("heading")}</h2>
          </div>
          <Button href="/portfolio" variant="ghost">{t("viewAll")}</Button>
        </motion.header>
        <div className="grid gap-x-4 gap-y-8 md:gap-x-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((video, i) => (
            <motion.div variants={fadeRise} key={video.id}>
              <VideoCard
                video={video}
                showCategory
                onPlay={() => setPlaying(i)}
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
              />
            </motion.div>
          ))}
        </div>
      </div>
      <VideoPlayerModal
        videos={FEATURED}
        index={playing}
        onClose={() => setPlaying(null)}
        onIndexChange={setPlaying}
      />
    </motion.section>
  );
}
