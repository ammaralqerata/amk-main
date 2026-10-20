"use client";
import Image from "next/image";
import { Play } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { getThumbnailUrl, getVideoTitle, isVertical, type Video } from "@/content/videos";
import type { Locale } from "@/i18n/routing";

export function VideoCard({
  video,
  onPlay,
  showCategory = false,
  sizes,
  className,
}: {
  video: Video;
  onPlay: () => void;
  showCategory?: boolean;
  sizes: string;
  className?: string;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("videos");
  const title = getVideoTitle(video, locale);
  const vertical = isVertical(video);

  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={`${t("play")}: ${title}`}
      className={cn("group flex w-full flex-col gap-3 text-start focus-visible:outline-none", className)}
    >
      <span
        className={cn(
          "relative block w-full overflow-hidden rounded-xl bg-inverse ring-offset-2 ring-offset-bg group-focus-visible:ring-2 group-focus-visible:ring-accent",
          vertical ? "aspect-[9/16]" : "aspect-video",
        )}
      >
        <Image
          src={getThumbnailUrl(video.id)}
          alt=""
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/35" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span
            className={cn(
              "flex items-center justify-center rounded-full bg-accent text-fg shadow-lg shadow-black/30 transition-transform duration-300 group-hover:scale-110",
              vertical ? "h-11 w-11" : "h-14 w-14",
            )}
          >
            <Play aria-hidden className={cn("fill-current", vertical ? "h-4 w-4" : "h-5 w-5")} />
          </span>
        </span>
      </span>
      <span className="flex flex-col gap-1 px-1">
        {showCategory ? (
          <span className="font-display text-[11px] tracking-[0.18em] uppercase text-muted">
            {t(`categories.${video.category}`)}
          </span>
        ) : null}
        {/* dir="auto" keeps English titles readable (and truncated on the right side) on the Arabic site */}
        <span
          dir="auto"
          className={cn(
            "font-body font-semibold leading-snug text-fg line-clamp-2",
            vertical ? "text-sm" : "text-base",
          )}
        >
          {title}
        </span>
      </span>
    </button>
  );
}
