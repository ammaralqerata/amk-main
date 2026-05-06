"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Eyebrow } from "./eyebrow";
import { SectionMark } from "@/components/ui/section-mark";
import { fadeRise, fadeRiseStagger } from "@/lib/motion";

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
      </div>
    </motion.section>
  );
}
