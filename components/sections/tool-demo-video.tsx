"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionMark } from "@/components/ui/section-mark";
import { VIDEOS, type Video } from "@/content/videos";
import type { Tool } from "@/content/tools/types";
import { fadeRise, fadeRiseStagger } from "@/lib/motion";
import { Eyebrow } from "./eyebrow";
import { VideoCard } from "./video-card";
import { VideoPlayerModal } from "./video-player-modal";

export function ToolDemoVideo({ tool }: { tool: Tool }) {
  const t = useTranslations("toolPage");
  const [playing, setPlaying] = useState<number | null>(null);

  if (!tool.demoVideoId) return null;
  // Reuse the portfolio entry when there is one so titles stay in one place.
  const video: Video = VIDEOS.find((v) => v.id === tool.demoVideoId) ?? {
    id: tool.demoVideoId,
    category: "shorts",
    title: tool.name,
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={fadeRiseStagger}
      className="bg-bg text-fg"
    >
      <div className="mx-auto grid max-w-[var(--container-max)] gap-10 px-4 py-16 md:grid-cols-[1fr_auto] md:items-center md:gap-16 md:px-12 md:py-24">
        <div className="flex flex-col gap-5 px-4">
          <motion.div variants={fadeRise}>
            <Eyebrow icon={<SectionMark kind="portfolio" className="h-3.5 w-3.5" />}>{t("demoEyebrow")}</Eyebrow>
          </motion.div>
          <motion.h2 variants={fadeRise} className="font-display text-3xl md:text-4xl lg:text-[42px] uppercase">
            {t("demoHeading", { name: tool.name })}
          </motion.h2>
          <motion.p variants={fadeRise} className="max-w-[560px] text-base leading-relaxed text-muted md:text-lg">
            {t("demoBody")}
          </motion.p>
          <motion.div variants={fadeRise}>
            <button
              type="button"
              onClick={() => setPlaying(0)}
              className="inline-flex items-center gap-2 rounded-[var(--radius-xl)] bg-accent px-6 py-3 font-display text-sm uppercase tracking-wide text-accent-fg transition hover:brightness-95"
            >
              <Play aria-hidden className="h-4 w-4 fill-current" />
              {t("demoCta")}
            </button>
          </motion.div>
        </div>
        <motion.div variants={fadeRise} className="mx-auto w-full max-w-[260px]">
          <VideoCard video={video} onPlay={() => setPlaying(0)} sizes="260px" />
        </motion.div>
      </div>
      <VideoPlayerModal
        videos={[video]}
        index={playing}
        onClose={() => setPlaying(null)}
        onIndexChange={setPlaying}
      />
    </motion.section>
  );
}
