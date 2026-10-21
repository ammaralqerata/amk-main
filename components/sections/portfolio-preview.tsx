"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "./eyebrow";
import { SectionMark } from "@/components/ui/section-mark";
import { getFeaturedVideos } from "@/content/videos";
import { fadeRise, fadeRiseStagger } from "@/lib/motion";
import { VideoCoverflow } from "./video-coverflow";

const FEATURED = getFeaturedVideos();

export function PortfolioPreview() {
  const t = useTranslations("portfolioPreview");

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
        <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_58%,rgb(0_255_120_/_0.22),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(40%_45%_at_15%_70%,rgb(0_200_255_/_0.16),transparent_70%),radial-gradient(40%_45%_at_85%_40%,rgb(120_80_255_/_0.16),transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-inverse to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-inverse" />
      </div>

      <div className="relative mx-auto flex max-w-[var(--container-max)] flex-col gap-10 px-4 py-16 md:gap-14 md:px-12 md:py-28">
        <motion.header variants={fadeRise} className="flex flex-col items-center gap-4 text-center">
          <Eyebrow tone="dark" icon={<SectionMark kind="portfolio" className="h-3.5 w-3.5" />}>{t("eyebrow")}</Eyebrow>
          <h2 className="font-display text-4xl uppercase md:text-5xl lg:text-6xl">{t("heading")}</h2>
        </motion.header>

        <motion.div variants={fadeRise} className="-mx-4 overflow-hidden py-4 md:-mx-12">
          <VideoCoverflow videos={FEATURED} />
        </motion.div>

        <motion.div variants={fadeRise} className="flex justify-center">
          <Button href="/portfolio" variant="ghost">{t("viewAll")}</Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
