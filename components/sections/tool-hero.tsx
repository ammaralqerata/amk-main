"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { PlatformMark } from "@/components/ui/platform-mark";
import { SectionMark } from "@/components/ui/section-mark";
import { Eyebrow } from "./eyebrow";
import { fadeRise, fadeRiseStagger } from "@/lib/motion";
import type { Tool } from "@/content/tools/types";

export function ToolHero({ tool }: { tool: Tool }) {
  const t = useTranslations("toolPage");

  return (
    <section className="bg-inverse text-inverse-fg">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeRiseStagger}
        className="mx-auto grid max-w-[var(--container-max)] gap-8 md:gap-12 px-4 py-16 md:px-12 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
      >
        <div className="flex flex-col gap-6">
          <motion.div variants={fadeRise}>
            <Eyebrow tone="dark" icon={<SectionMark kind="tools" className="h-3.5 w-3.5" />}>{t("badge")}</Eyebrow>
          </motion.div>
          <motion.h1
            variants={fadeRise}
            className="font-display uppercase text-[clamp(3rem,8vw,4.5rem)] leading-[1.05]"
          >
            {tool.name}
          </motion.h1>
          <motion.p
            variants={fadeRise}
            className="inline-flex items-center gap-2 font-display text-accent text-sm tracking-[0.08em] uppercase"
          >
            {tool.platformKind ? <PlatformMark kind={tool.platformKind} /> : null}
            {tool.platforms}
          </motion.p>
          <motion.p
            variants={fadeRise}
            className="max-w-[800px] text-base leading-relaxed text-white/70 md:text-lg"
          >
            {tool.description}
          </motion.p>
          <motion.div variants={fadeRise} className="flex flex-wrap gap-3 pt-4">
            <Button href={tool.cta.href} variant="primary">{tool.cta.label}</Button>
          </motion.div>
        </div>
        {tool.heroImage ? (
          <div
            className="relative isolate overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] p-3 shadow-2xl shadow-black/40"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(0,255,0,0.16),transparent_34%),radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.10),transparent_28%)]" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-black">
              <Image
                src={tool.heroImage}
                alt={`${tool.name} interface preview`}
                fill
                priority
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-contain"
              />
            </div>
          </div>
        ) : null}
      </motion.div>
    </section>
  );
}
