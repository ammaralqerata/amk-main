import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "./eyebrow";
import { SectionMark } from "@/components/ui/section-mark";
import { riseDelay } from "@/lib/motion";
import { HeroBackdrop } from "@/components/ui/hero-backdrop";
import { SHOWREEL } from "@/content/showreel";
import { ShowreelBackground } from "./showreel-background";
import { CountUp } from "@/components/ui/count-up";
import { TOOL_SLUGS } from "@/content/tools";
import { getActiveCategories, VIDEOS } from "@/content/videos";

// Real counts from the site data, so they stay true as videos/plugins are added.
const STATS = [
  { key: "videos", value: VIDEOS.length },
  { key: "plugins", value: TOOL_SLUGS.length },
  { key: "fields", value: getActiveCategories().length },
] as const;

export function Hero() {
  const t = useTranslations("hero");
  return (
    <section className="relative bg-inverse text-inverse-fg overflow-hidden">
      {SHOWREEL ? <ShowreelBackground reel={SHOWREEL} /> : <HeroBackdrop grid={false} />}
      <div className="relative mx-auto max-w-[var(--container-max)] px-4 md:px-12 pt-10 pb-10 md:pt-14 md:pb-12 grid gap-10 md:gap-16 md:grid-cols-[1.45fr_1fr] md:items-center">
        <div className="flex flex-col gap-6 md:gap-7">
          <div className="rise-in" style={riseDelay(0)}>
            <Eyebrow tone="dark" icon={<SectionMark kind="portfolio" className="h-3.5 w-3.5" />}>{t("eyebrow")}</Eyebrow>
          </div>
          <h1
            className="rise-in font-display uppercase text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.25] ltr:leading-[1.08] text-inverse-fg"
            style={riseDelay(1)}
          >
            {t("headlineLine1")}<br />
            {t("headlineLine2")}<br />
            {t("headlineLine3")}
          </h1>
          <p className="rise-in text-white/70 text-base md:text-lg leading-[1.8] max-w-[560px]" style={riseDelay(2)}>
            {t("description")}
          </p>
          <div className="rise-in flex flex-wrap gap-3 mt-2" style={riseDelay(3)}>
            <Button href="/portfolio" variant="primary">{t("ctaView")}</Button>
            <Button href="/plugins" variant="ghost">{t("ctaExplore")}</Button>
          </div>
        </div>

        <div
          className="rise-in relative aspect-square md:aspect-[5/5.2] max-w-[230px] md:max-w-[400px] w-full justify-self-center md:justify-self-end rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-black/60"
          style={riseDelay(4)}
        >
          <Image
            src="/hero/portrait.png"
            alt={t("portraitAlt")}
            fill
            sizes="(min-width: 768px) 400px, 230px"
            priority
            className="object-cover object-[50%_18%]"
          />
        </div>
      </div>

      {/* Numbers strip, attached to the bottom of the first screen */}
      <div className="relative border-t border-white/10 bg-black/40 backdrop-blur-sm">
        <dl className="mx-auto grid max-w-[var(--container-max)] grid-cols-3 divide-x divide-white/10 px-4 md:px-12">
          {STATS.map((s) => (
            <div key={s.key} className="flex flex-col items-center gap-1.5 px-2 py-5 md:flex-row md:justify-center md:gap-4 md:py-7">
              <dt className="sr-only">{t(`stats.${s.key}`)}</dt>
              <dd className="font-display text-3xl md:text-5xl leading-none text-accent">
                <CountUp value={s.value} />
              </dd>
              <dd aria-hidden className="text-center text-xs md:text-start md:text-sm text-white/60 md:max-w-[9rem] leading-snug">{t(`stats.${s.key}`)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
