"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { isExternalUrl } from "@/lib/is-external-url";
import { cardHover } from "@/lib/motion";
import { PlatformMark } from "@/components/ui/platform-mark";
import type { Tool } from "@/content/tools/types";

export function ProductCard({ tool }: { tool: Tool }) {
  const t = useTranslations("toolCard");
  const isExternalDownload = isExternalUrl(tool.cta.href);
  const isDirectDownload = tool.cta.href.startsWith("/download/");

  return (
    <motion.article
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      className="flex flex-col gap-5 bg-bg rounded-2xl border border-border p-6 md:p-8 h-full"
    >
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-2xl text-fg uppercase">{tool.name}</h3>
        <p className="text-[var(--color-fg-secondary)] text-sm leading-[1.5]">{tool.description}</p>
      </div>
      <div className="inline-flex items-center gap-1.5">
        {tool.platformKind ? <PlatformMark kind={tool.platformKind} /> : null}
        <span className="font-display text-[12px] tracking-[0.08em] uppercase text-muted">{tool.platforms}</span>
      </div>
      <div className="mt-auto flex gap-3 pt-2">
        {isExternalDownload || isDirectDownload ? (
          <a
            href={tool.cta.href}
            className="flex-1 inline-flex items-center justify-center rounded-xl bg-inverse text-inverse-fg text-sm font-semibold px-8 py-3.5 hover:bg-inverse/90 transition-colors"
          >
            {tool.cta.label}
          </a>
        ) : (
          <Link
            href={tool.cta.href}
            className="flex-1 inline-flex items-center justify-center rounded-xl bg-inverse text-inverse-fg text-sm font-semibold px-8 py-3.5 hover:bg-inverse/90 transition-colors"
          >
            {tool.cta.label}
          </Link>
        )}
        <Link
          href={`/plugins/${tool.slug}`}
          className="flex-1 inline-flex items-center justify-center rounded-xl bg-bg text-fg border border-border text-sm font-semibold px-8 py-3.5 hover:border-fg transition-colors"
        >
          {t("details")}
        </Link>
      </div>
    </motion.article>
  );
}
