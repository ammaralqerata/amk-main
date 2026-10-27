"use client";
import { motion } from "framer-motion";
import { Hourglass } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { whatsappUrl } from "@/lib/contact";
import { fadeRise } from "@/lib/motion";
import type { VideoCategory } from "@/content/videos";
import { WhatsAppIcon } from "@/components/ui/social-icons";

/** Stands in for a category whose videos haven't been added yet. */
export function ComingSoonVideos({ category, tone }: { category: VideoCategory; tone: "dark" | "light" }) {
  const t = useTranslations("videos");
  const tFloating = useTranslations("floating");
  const name = t(`categories.${category}`);

  return (
    <motion.div
      variants={fadeRise}
      initial="hidden"
      animate="visible"
      className={cn(
        "mx-auto flex w-full max-w-[640px] flex-col items-center gap-5 rounded-3xl border border-dashed px-6 py-12 text-center md:py-16",
        tone === "dark" ? "border-white/20 bg-white/[0.03]" : "border-border",
      )}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent">
        <Hourglass aria-hidden className="h-7 w-7" />
      </span>
      <h3 className="font-display text-2xl uppercase md:text-3xl">{t("comingSoon.title")}</h3>
      <p className={cn("max-w-[460px] leading-relaxed", tone === "dark" ? "text-white/65" : "text-muted")}>
        {t("comingSoon.body", { category: name })}
      </p>
      <a
        href={whatsappUrl(tFloating("whatsappMessage"))}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-accent px-6 font-semibold text-accent-fg transition-shadow hover:shadow-[0_0_0_6px_color-mix(in_srgb,var(--color-accent)_20%,transparent)]"
      >
        <WhatsAppIcon className="h-5 w-5" />
        {t("comingSoon.cta")}
      </a>
    </motion.div>
  );
}
