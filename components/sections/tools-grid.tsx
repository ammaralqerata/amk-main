"use client";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ProductCard } from "./product-card";
import { PluginRequest } from "./plugin-request";
import { Eyebrow } from "./eyebrow";
import { SectionMark } from "@/components/ui/section-mark";
import { getTool, TOOL_SLUGS } from "@/content/tools";
import { fadeRise, fadeRiseStagger } from "@/lib/motion";
import type { Locale } from "@/i18n/routing";

/** Flagship plugin: spans two columns on large screens. */
const FEATURED_SLUG = "captions";

export function ToolsGrid({ showHeader = true }: { showHeader?: boolean }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("toolsGrid");

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={fadeRiseStagger}
      className="relative overflow-hidden bg-inverse text-inverse-fg"
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_srgb,var(--color-accent)_10%,transparent),transparent_70%)]" />
      <div className={`relative mx-auto max-w-[var(--container-max)] px-4 md:px-12 flex flex-col gap-8 md:gap-12 ${showHeader ? "py-16 md:py-24" : "pb-16 md:pb-28"}`}>
        {showHeader ? (
          <motion.header variants={fadeRise} className="flex flex-col items-center gap-4 text-center">
            <Eyebrow tone="dark" icon={<SectionMark kind="tools" className="h-3.5 w-3.5" />}>{t("eyebrow")}</Eyebrow>
            <h2 className="font-display text-4xl uppercase md:text-5xl lg:text-6xl">{t("heading")}</h2>
          </motion.header>
        ) : null}
        <div className="grid gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {TOOL_SLUGS.map((slug) => {
            const featured = slug === FEATURED_SLUG;
            return (
              <motion.div variants={fadeRise} key={slug} className={featured ? "h-full sm:col-span-2" : "h-full"}>
                <ProductCard tool={getTool(slug, locale)!} featured={featured} />
              </motion.div>
            );
          })}
          <motion.div variants={fadeRise} className="h-full sm:col-span-2">
            <PluginRequest />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
