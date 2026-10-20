"use client";
import { motion } from "framer-motion";
import { ArrowUpLeft, ArrowUpRight, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ProductCard } from "./product-card";
import { Eyebrow } from "./eyebrow";
import { SectionMark } from "@/components/ui/section-mark";
import { getTool, TOOL_SLUGS } from "@/content/tools";
import { fadeRise, fadeRiseStagger } from "@/lib/motion";
import { keepProductNamesTogether } from "@/lib/text";
import type { Locale } from "@/i18n/routing";

/** Flagship plugin: spans two columns on large screens. */
const FEATURED_SLUG = "captions";

export function ToolsGrid({ showHeader = true }: { showHeader?: boolean }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("toolsGrid");
  const Arrow = locale === "ar" ? ArrowUpLeft : ArrowUpRight;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={fadeRiseStagger}
      className="relative overflow-hidden bg-inverse text-inverse-fg"
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(60%_60%_at_50%_0%,rgb(0_255_0_/_0.08),transparent_70%)]" />
      <div className={`relative mx-auto max-w-[var(--container-max)] px-4 md:px-12 flex flex-col gap-8 md:gap-12 ${showHeader ? "py-16 md:py-28" : "pb-16 md:pb-28"}`}>
        {showHeader ? (
          <motion.header variants={fadeRise} className="flex flex-col gap-3 px-2">
            <Eyebrow tone="dark" icon={<SectionMark kind="tools" className="h-3.5 w-3.5" />}>{t("eyebrow")}</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[42px] uppercase">{t("heading")}</h2>
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
          <motion.div variants={fadeRise} className="h-full lg:col-span-2">
            <Link
              href="/contact"
              className="spotlight group relative flex h-full min-h-[260px] flex-col justify-between gap-8 overflow-hidden rounded-3xl border border-accent/25 bg-[linear-gradient(135deg,rgb(0_255_0_/_0.12),rgb(0_255_0_/_0.02)_55%)] p-7 md:p-10 transition-transform duration-500 hover:-translate-y-1"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-black">
                <Sparkles aria-hidden className="h-6 w-6" />
              </span>
              <span className="flex flex-col gap-3">
                <span className="font-display text-2xl md:text-3xl uppercase">{t("customTitle")}</span>
                <span className="max-w-[520px] text-sm md:text-base leading-relaxed text-white/65">{keepProductNamesTogether(t("customBody"))}</span>
              </span>
              <span className="inline-flex items-center gap-2 font-semibold text-accent">
                {t("customCta")}
                <Arrow aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
