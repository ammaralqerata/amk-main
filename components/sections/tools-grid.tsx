"use client";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ProductCard } from "./product-card";
import { Eyebrow } from "./eyebrow";
import { SectionMark } from "@/components/ui/section-mark";
import { getTool, TOOL_SLUGS } from "@/content/tools";
import { fadeRise, fadeRiseStagger } from "@/lib/motion";
import type { Locale } from "@/i18n/routing";

export function ToolsGrid() {
  const locale = useLocale() as Locale;
  const t = useTranslations("toolsGrid");

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={fadeRiseStagger}
      className="bg-bg text-fg"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-4 md:px-12 py-16 md:py-24 flex flex-col gap-8 md:gap-12">
        <motion.header variants={fadeRise} className="flex flex-col gap-3 px-4">
          <Eyebrow icon={<SectionMark kind="tools" className="h-3.5 w-3.5" />}>{t("eyebrow")}</Eyebrow>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[42px] uppercase">{t("heading")}</h2>
        </motion.header>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {TOOL_SLUGS.map((slug) => (
            <motion.div variants={fadeRise} key={slug} className="h-full">
              <ProductCard tool={getTool(slug, locale)!} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
