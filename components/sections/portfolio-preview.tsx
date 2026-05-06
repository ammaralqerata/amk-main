"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "./eyebrow";
import { SectionMark } from "@/components/ui/section-mark";
import { fadeRise, fadeRiseStagger } from "@/lib/motion";

const IMAGES = [
  {
    src: "/portfolio/motion-graphics-maps.png",
    alt: "Motion graphics and maps",
    href: "https://youtube.com/playlist?list=PLjabAHkQbBA3Wi6oHiPiWDNKFMcu_tx7m&si=7fWvEGETvGVsFdfH",
  },
  {
    src: "/portfolio/montage-documentary.png",
    alt: "Montage and documentary work",
    href: "https://www.youtube.com/@ReLevantHistoryy/featured",
  },
  {
    src: "/portfolio/creative-content.png",
    alt: "Creative content production",
    href: "https://youtube.com/playlist?list=PLjabAHkQbBA11qT_O7g8TaHhdw1bNkqgL&si=Mj4VIotFDBUUUHsF",
  },
];

export function PortfolioPreview() {
  const t = useTranslations("portfolioPreview");

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={fadeRiseStagger}
      className="bg-bg text-fg"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-4 md:px-12 py-16 md:py-24 flex flex-col gap-8 md:gap-12">
        <motion.header variants={fadeRise} className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between px-4">
          <div className="flex flex-col gap-3">
            <Eyebrow icon={<SectionMark kind="portfolio" className="h-3.5 w-3.5" />}>{t("eyebrow")}</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[42px] uppercase">{t("heading")}</h2>
          </div>
          <Button href="/portfolio" variant="ghost">{t("viewAll")}</Button>
        </motion.header>
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {IMAGES.map((img) => (
            <motion.a
              variants={fadeRise}
              key={img.src}
              href={img.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/5] rounded-xl overflow-hidden"
            >
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-500 hover:scale-105" />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
