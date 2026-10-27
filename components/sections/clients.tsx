"use client";
import type { CSSProperties } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { CLIENTS, getClientName } from "@/content/clients";
import { TESTIMONIALS } from "@/content/testimonials";
import { fadeRise, fadeRiseStagger } from "@/lib/motion";
import type { Locale } from "@/i18n/routing";
import { Eyebrow } from "./eyebrow";
import { TestimonialGrid } from "./testimonial-cards";
import { SectionMark } from "@/components/ui/section-mark";

/** Client names (or logos) drifting by, plus testimonials once there are any. */
export function Clients() {
  const locale = useLocale() as Locale;
  const t = useTranslations("clients");

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={fadeRiseStagger}
      className="bg-inverse text-inverse-fg"
    >
      <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-10 px-4 pt-4 pb-14 md:gap-14 md:px-12 md:pt-6 md:pb-20">
        <motion.header variants={fadeRise} className="flex flex-col items-center gap-4 text-center">
          <Eyebrow tone="dark" icon={<SectionMark kind="brand" className="h-3.5 w-3.5" />}>{t("eyebrow")}</Eyebrow>
          <h2 className="font-display text-4xl uppercase md:text-5xl lg:text-6xl">{t("heading")}</h2>
        </motion.header>

        <motion.div
          variants={fadeRise}
          className="reels-strip -mx-4 overflow-hidden border-y border-white/10 py-6 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] md:-mx-12 md:py-8"
        >
          <ul dir="ltr" className="marquee-track flex w-max items-center" style={{ "--marquee-duration": `${CLIENTS.length * 4}s` } as CSSProperties}>
            {[0, 1].map((copy) =>
              CLIENTS.map((client) => {
                const name = getClientName(client, locale);
                return (
                  <li key={`${copy}-${name}`} aria-hidden={copy === 1} className="flex items-center px-6 md:px-10">
                    {client.logo ? (
                      <Image src={client.logo} alt={name} width={140} height={48} className="h-9 w-auto opacity-70 grayscale md:h-11" />
                    ) : (
                      <span dir="auto" className="whitespace-nowrap font-display text-xl text-white/55 md:text-3xl">{name}</span>
                    )}
                    <span aria-hidden className="ms-12 h-1.5 w-1.5 rounded-full bg-accent md:ms-20" />
                  </li>
                );
              }),
            )}
          </ul>
        </motion.div>

        {TESTIMONIALS.length > 0 ? (
          <div className="flex flex-col gap-6 md:gap-8">
            <motion.h3 variants={fadeRise} className="text-center font-display text-2xl uppercase md:text-4xl">
              {t("testimonials.heading")}
            </motion.h3>
            <TestimonialGrid items={TESTIMONIALS} />
          </div>
        ) : null}
      </div>
    </motion.section>
  );
}
