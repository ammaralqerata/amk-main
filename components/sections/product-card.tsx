import Image from "next/image";
import { ArrowUpLeft, ArrowUpRight, Download } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { PlatformMark, type PlatformKind } from "@/components/ui/platform-mark";
import type { Tool } from "@/content/tools/types";

/** Glow colour behind each card's screenshot, keyed by host app. */
const GLOW: Record<PlatformKind, string> = {
  adobe: "rgb(0 255 0 / 0.22)",
  "after-effects": "rgb(153 153 255 / 0.28)",
  "premiere-pro": "rgb(234 119 255 / 0.24)",
  "desktop-app": "rgb(0 220 200 / 0.22)",
};

export function ProductCard({ tool, featured = false }: { tool: Tool; featured?: boolean }) {
  const t = useTranslations("toolCard");
  const isArabic = useLocale() === "ar";
  const detailsHref = `/plugins/${tool.slug}`;
  const isDownload = tool.cta.href.startsWith("/download/");
  const Arrow = isArabic ? ArrowUpLeft : ArrowUpRight;

  return (
    <article
      className={cn(
        "spotlight glass group flex h-full flex-col overflow-hidden rounded-3xl text-inverse-fg transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1",
        featured && "lg:grid lg:grid-cols-[1fr_1.15fr]",
      )}
    >
      <div
        aria-hidden
        className={cn(
          "relative block overflow-hidden",
          featured ? "aspect-[16/11] sm:aspect-[16/8] lg:order-last lg:aspect-auto lg:min-h-[440px]" : "aspect-[16/11]",
        )}
        style={{
          background: `radial-gradient(70% 80% at 50% 100%, ${GLOW[tool.platformKind ?? "adobe"]}, transparent 70%), linear-gradient(180deg, rgb(255 255 255 / 0.02), rgb(255 255 255 / 0))`,
        }}
      >
        <ToolMedia tool={tool} featured={featured} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-black/60" />
      </div>

      <div className={cn("flex flex-1 flex-col gap-4 p-6 md:p-7", featured && "lg:justify-center lg:p-10")}>
        <div className="flex items-center gap-2">
          {tool.platformKind ? <PlatformMark kind={tool.platformKind} /> : null}
          <span className="font-display text-[11px] uppercase tracking-[0.14em] text-white/55">{tool.platforms}</span>
        </div>
        {/* The title link stretches over the whole card, so anywhere opens the details page. */}
        <h3 className={cn("font-display uppercase leading-tight", featured ? "text-3xl md:text-4xl" : "text-2xl")}>
          <Link href={detailsHref} className="outline-none after:absolute after:inset-0 after:content-[''] focus-visible:text-accent">
            {tool.name}
          </Link>
        </h3>
        <p className={cn("leading-relaxed text-white/65", featured ? "text-base md:text-lg" : "text-sm")}>
          {featured ? tool.description : tool.tagline}
        </p>
        <div className="relative z-10 mt-auto flex gap-3 pt-2">
          {/* Plain <a> for downloads: they redirect to a file, not a page. */}
          {isDownload ? (
            <a
              href={tool.cta.href}
              className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-black transition-shadow hover:shadow-[0_0_0_5px_rgb(0_255_0_/_0.15)]"
            >
              <Download aria-hidden className="h-4 w-4" />
              {tool.cta.label}
            </a>
          ) : (
            <Link
              href={tool.cta.href}
              className="inline-flex min-h-[46px] flex-1 items-center justify-center rounded-full bg-accent px-5 text-sm font-semibold text-black"
            >
              {tool.cta.label}
            </Link>
          )}
          <Link
            href={detailsHref}
            className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-1.5 rounded-full border border-white/15 px-5 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/[0.06]"
          >
            {t("details")}
            <Arrow aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/** The plugin's own UI, floating like an app window peeking out of the card. */
function ToolMedia({ tool, featured }: { tool: Tool; featured: boolean }) {
  const shots = tool.screenshots ?? [];

  if (!shots.length) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="glass flex h-24 w-24 items-center justify-center rounded-3xl transition-transform duration-500 group-hover:scale-105">
          {tool.platformKind ? <PlatformMark kind={tool.platformKind} className="h-12 w-12 rounded-xl" /> : null}
        </div>
      </div>
    );
  }

  const panel =
    "absolute overflow-hidden rounded-xl border border-white/15 shadow-[0_30px_60px_-20px_rgb(0_0_0_/_0.9)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]";

  if (featured && shots.length > 1) {
    return (
      <>
        <div className={cn(panel, "start-[8%] top-[14%] w-[44%] rotate-[-4deg] opacity-80 group-hover:-translate-y-2 group-hover:rotate-[-6deg]")}>
          <Image src={shots[1].src} alt="" width={1149} height={1247} sizes="(min-width: 1024px) 300px, 45vw" className="h-auto w-full" />
        </div>
        <div className={cn(panel, "end-[8%] top-[8%] w-[50%] group-hover:-translate-y-3")}>
          <Image src={shots[0].src} alt="" width={1149} height={1247} sizes="(min-width: 1024px) 340px, 50vw" className="h-auto w-full" />
        </div>
      </>
    );
  }

  return (
    <div className={cn(panel, "inset-x-0 top-[12%] mx-auto w-[58%] group-hover:-translate-y-2")}>
      <Image src={shots[0].src} alt="" width={1100} height={1250} sizes="(min-width: 1024px) 240px, (min-width: 640px) 30vw, 60vw" className="h-auto w-full" />
    </div>
  );
}
