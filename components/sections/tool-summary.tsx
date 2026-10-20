"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Eyebrow } from "./eyebrow";
import { SectionMark } from "@/components/ui/section-mark";
import { fadeRise, fadeRiseStagger } from "@/lib/motion";
import type { Tool } from "@/content/tools/types";

export function ToolSummary({ tool }: { tool: Tool }) {
  const t = useTranslations("toolPage");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const hasDetails = tool.fullDescription || tool.highlights?.length || tool.audience?.length;

  if (!hasDetails) {
    return (
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeRiseStagger}
        className="bg-bg text-fg"
      >
        <div className="mx-auto max-w-[var(--container-max)] px-4 md:px-12 py-16 md:py-24 flex flex-col gap-8">
          <motion.div variants={fadeRise}>
            <Eyebrow icon={<SectionMark kind="overview" className="h-3.5 w-3.5" />}>{t("overviewEyebrow")}</Eyebrow>
          </motion.div>
          <motion.h2 variants={fadeRise} className="font-display text-3xl md:text-4xl lg:text-[42px] uppercase max-w-3xl px-4">
            {t("overviewHeading", { name: tool.name })}
          </motion.h2>
          <motion.p variants={fadeRise} className="text-muted text-base md:text-lg leading-relaxed max-w-[700px] px-4">
            {t("overviewBody")}
          </motion.p>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={fadeRiseStagger}
      className="bg-bg text-fg"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-4 md:px-12 py-16 md:py-24 flex flex-col gap-8 md:gap-12">
        <motion.div variants={fadeRise} className="px-4">
          <Eyebrow icon={<SectionMark kind="overview" className="h-3.5 w-3.5" />}>{t("overviewEyebrow")}</Eyebrow>
        </motion.div>
        <motion.h2 variants={fadeRise} className="font-display text-3xl md:text-4xl lg:text-[42px] uppercase max-w-3xl px-4">
          {t("overviewHeading", { name: tool.name })}
        </motion.h2>
        {tool.fullDescription ? (
          <motion.div variants={fadeRise} className="grid gap-4 border-t border-fg/10 pt-8 px-4">
            <h3 className="font-display text-xl md:text-2xl uppercase">
              {isArabic ? "الوصف الكامل" : "Full Description"}
            </h3>
            <p className="text-muted text-base md:text-lg leading-relaxed max-w-[850px]">
              {tool.fullDescription}
            </p>
          </motion.div>
        ) : null}
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] px-4">
          {tool.highlights?.length ? (
            <motion.div variants={fadeRise} className="grid gap-5 border-t border-fg/10 pt-8">
              <h3 className="font-display text-xl md:text-2xl uppercase">
                {isArabic ? "أبرز الميزات" : "Key Features"}
              </h3>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {tool.highlights.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 rounded-2xl border border-border/70 bg-fg/[0.02] px-4 py-3.5 text-sm md:text-[15px] leading-relaxed text-fg transition-colors hover:border-fg/30"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-inverse text-accent">
                      <Check aria-hidden className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : null}
          {tool.audience?.length ? (
            <motion.div variants={fadeRise} className="grid content-start gap-5 border-t border-fg/10 pt-8">
              <h3 className="font-display text-xl md:text-2xl uppercase">
                {isArabic ? "مناسب لـ" : "Best For"}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {tool.audience.map((item) => (
                  <li key={item} className="rounded-full border border-border px-4 py-2 text-sm text-fg">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : null}
        </div>
      </div>
    </motion.section>
  );
}
