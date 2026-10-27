"use client";
import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { getThumbnailUrl, getVideoTitle, type Video } from "@/content/videos";
import type { Locale } from "@/i18n/routing";
import { VideoPlayerModal } from "./video-player-modal";

/** Seconds each reel takes to cross one card width; sets the strip's speed. */
const SECONDS_PER_REEL = 3.5;

/**
 * A row of vertical reels that drifts sideways on its own and pauses on hover.
 * The list is rendered twice so the slide loops without a jump.
 */
export function ReelsStrip({ videos }: { videos: Video[] }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("videos");
  const [playing, setPlaying] = useState<number | null>(null);

  return (
    <>
      <div
        className="reels-strip relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]"
        data-paused={playing !== null}
      >
        <div
          dir="ltr"
          className="reels-track flex w-max gap-3 md:gap-4"
          style={{ "--reels-duration": `${videos.length * SECONDS_PER_REEL}s` } as CSSProperties}
        >
          {[0, 1].map((copy) =>
            videos.map((video, i) => {
              const title = getVideoTitle(video, locale);
              return (
                <button
                  key={`${copy}-${video.id}`}
                  type="button"
                  onClick={() => setPlaying(i)}
                  aria-hidden={copy === 1}
                  tabIndex={copy === 1 ? -1 : 0}
                  aria-label={`${t("play")}: ${title}`}
                  className="group relative aspect-[9/16] w-[136px] shrink-0 overflow-hidden rounded-2xl bg-black ring-1 ring-white/10 outline-none transition-[box-shadow] focus-visible:ring-2 focus-visible:ring-accent md:w-[184px]"
                >
                  <Image
                    src={getThumbnailUrl(video.id)}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 184px, 136px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-fg">
                      <Play aria-hidden className="h-4 w-4 fill-current" />
                    </span>
                  </span>
                  <span dir="auto" className="absolute inset-x-0 bottom-0 line-clamp-2 p-3 text-start text-xs font-semibold leading-snug text-white md:text-[13px]">
                    {title}
                  </span>
                </button>
              );
            }),
          )}
        </div>
      </div>
      <VideoPlayerModal videos={videos} index={playing} onClose={() => setPlaying(null)} onIndexChange={setPlaying} />
    </>
  );
}
