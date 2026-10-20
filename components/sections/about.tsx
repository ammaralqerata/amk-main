"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Eyebrow } from "./eyebrow";
import { SectionMark } from "@/components/ui/section-mark";
import { fadeRise, fadeRiseStagger } from "@/lib/motion";
import { CountUp } from "@/components/ui/count-up";
import { TOOL_SLUGS } from "@/content/tools";
import { VIDEO_CATEGORIES, VIDEOS } from "@/content/videos";

// Real counts from the site data, so they stay true as videos/plugins are added.
const STATS = [
  { key: "videos", value: VIDEOS.length },
  { key: "plugins", value: TOOL_SLUGS.length },
  { key: "fields", value: VIDEO_CATEGORIES.length },
] as const;

export function About() {
  const t = useTranslations("about");
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={fadeRiseStagger}
      className="bg-bg text-fg"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-4 md:px-12 py-16 md:py-32 flex flex-col items-center gap-8 md:gap-12 text-center">
        <motion.div variants={fadeRise}>
          <Eyebrow icon={<SectionMark kind="about" className="h-3.5 w-3.5" />}>{t("eyebrow")}</Eyebrow>
        </motion.div>
        <motion.p
          variants={fadeRise}
          className="font-body text-lg md:text-[22px] lg:text-[28px] leading-[1.5] text-fg max-w-[900px] px-4"
        >
          {t("p1")}
        </motion.p>
        <motion.p
          variants={fadeRise}
          className="font-body text-sm md:text-base lg:text-lg leading-relaxed text-muted max-w-[700px] px-4"
        >
          {t("p2")}
        </motion.p>
        <motion.dl
          variants={fadeRise}
          className="mt-4 grid w-full max-w-[880px] grid-cols-3 divide-x divide-border rtl:divide-x-reverse border-y border-border"
        >
          {STATS.map((s) => (
            <div key={s.key} className="flex flex-col items-center gap-2 px-2 py-6 md:py-8">
              <dt className="sr-only">{t(`stats.${s.key}`)}</dt>
              <dd className="font-display text-4xl md:text-6xl leading-none">
                <CountUp value={s.value} />
              </dd>
              <dd aria-hidden className="text-xs md:text-sm text-muted">{t(`stats.${s.key}`)}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </motion.section>
  );
}
