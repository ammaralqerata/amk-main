import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "./eyebrow";
import { SectionMark } from "@/components/ui/section-mark";
import { riseDelay } from "@/lib/motion";
import { HeroBackdrop } from "@/components/ui/hero-backdrop";

export function Hero() {
  const t = useTranslations("hero");
  return (
    <section className="relative bg-inverse text-inverse-fg overflow-hidden">
      <HeroBackdrop grid={false} />
      <div className="relative mx-auto max-w-[var(--container-max)] px-4 md:px-12 py-16 md:py-32 grid gap-8 md:gap-12 md:grid-cols-[1.1fr_1fr] md:items-center">
        <div className="flex flex-col gap-6">
          <div className="rise-in" style={riseDelay(0)}>
            <Eyebrow tone="dark" icon={<SectionMark kind="portfolio" className="h-3.5 w-3.5" />}>{t("eyebrow")}</Eyebrow>
          </div>
          <h1
            className="rise-in font-display uppercase text-[clamp(2.5rem,6vw,3.75rem)] leading-[1.05] text-inverse-fg"
            style={riseDelay(1)}
          >
            {t("headlineLine1")}<br />
            {t("headlineLine2")}<br />
            {t("headlineLine3")}
          </h1>
          <p className="rise-in text-muted text-base md:text-[17px] leading-relaxed max-w-[520px]" style={riseDelay(2)}>
            {t("description")}
          </p>
          <div className="rise-in flex flex-wrap gap-3 mt-2" style={riseDelay(3)}>
            <Button href="/portfolio" variant="primary">{t("ctaView")}</Button>
            <Button href="/plugins" variant="ghost">{t("ctaExplore")}</Button>
          </div>
        </div>

        <div
          className="rise-in relative aspect-[520/600] max-w-[520px] w-full justify-self-center md:justify-self-end rounded-xl overflow-hidden"
          style={riseDelay(4)}
        >
          <Image
            src="/hero/portrait.png"
            alt={t("portraitAlt")}
            fill
            sizes="(min-width: 768px) 520px, 100vw"
            priority
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
