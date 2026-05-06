"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "./eyebrow";
import { SectionMark } from "@/components/ui/section-mark";
import { fadeRise, fadeRiseStagger } from "@/lib/motion";

export function Hero() {
  const t = useTranslations("hero");
  return (
    <section className="relative bg-inverse text-inverse-fg overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeRiseStagger}
        className="relative mx-auto max-w-[var(--container-max)] px-4 md:px-12 py-16 md:py-32 grid gap-8 md:gap-12 md:grid-cols-[1.1fr_1fr] md:items-center"
      >
        <div className="flex flex-col gap-6">
          <motion.div variants={fadeRise}>
            <Eyebrow tone="dark" icon={<SectionMark kind="portfolio" className="h-3.5 w-3.5" />}>{t("eyebrow")}</Eyebrow>
          </motion.div>
          <motion.h1
            variants={fadeRise}
            className="font-display uppercase text-[clamp(2.5rem,6vw,3.75rem)] leading-[1.05] text-inverse-fg"
          >
            {t("headlineLine1")}<br />
            {t("headlineLine2")}<br />
            {t("headlineLine3")}
          </motion.h1>
          <motion.p variants={fadeRise} className="text-muted text-base md:text-[17px] leading-relaxed max-w-[520px]">
            {t("description")}
          </motion.p>
          <motion.div variants={fadeRise} className="flex flex-wrap gap-3 mt-2">
            <Button href="/portfolio" variant="primary">{t("ctaView")}</Button>
            <Button href="/plugins" variant="ghost">{t("ctaExplore")}</Button>
          </motion.div>
        </div>

        <motion.div variants={fadeRise} className="relative aspect-[520/600] max-w-[520px] w-full justify-self-center md:justify-self-end rounded-xl overflow-hidden">
          <Image
            src="/hero/portrait.png"
            alt={t("portraitAlt")}
            fill
            sizes="(min-width: 768px) 520px, 100vw"
            priority
            className="object-cover"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
