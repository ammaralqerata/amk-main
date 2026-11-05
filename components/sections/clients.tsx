"use client";
import type { CSSProperties } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { AGENCIES, BRANDS, CREATORS, getText, logoHeight, type Logo } from "@/content/clients";
import { TESTIMONIALS } from "@/content/testimonials";
import { fadeRise, fadeRiseStagger } from "@/lib/motion";
import type { Locale } from "@/i18n/routing";
import { Eyebrow } from "./eyebrow";
import { TestimonialGrid } from "./testimonial-cards";
import { SectionMark } from "@/components/ui/section-mark";

/**
 * Who Ammar has worked with, in three honest layers: the agencies/companies he worked for,
 * the brands whose videos he edited (a drifting strip), and the people he works with one-to-one.
 * Testimonials follow once there are any.
 */
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
      <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-12 px-4 pt-4 pb-14 md:gap-16 md:px-12 md:pt-6 md:pb-20">
        <motion.header variants={fadeRise} className="flex flex-col items-center gap-4 text-center">
          <Eyebrow tone="dark" icon={<SectionMark kind="brand" className="h-3.5 w-3.5" />}>{t("eyebrow")}</Eyebrow>
          <h2 className="font-display text-4xl uppercase md:text-5xl lg:text-6xl">{t("heading")}</h2>
        </motion.header>

        {/* Companies he worked for */}
        <motion.div variants={fadeRise} className="flex flex-col items-center gap-6">
          <RowLabel>{t("agencies")}</RowLabel>
          <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-20">
            {AGENCIES.map((a) => (
              <li key={getText(a.name, "en")} className="flex items-center gap-3">
                <LogoImage logo={a.logo} alt={a.withName ? "" : getText(a.name, locale)} full={a.withName ? 34 : 60} />
                {a.withName ? <span className="font-display text-2xl text-white/75 md:text-3xl">{getText(a.name, locale)}</span> : null}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Brands whose videos he edited */}
        <motion.div variants={fadeRise} className="flex flex-col items-center gap-6">
          <RowLabel>{t("brands")}</RowLabel>
          <div className="reels-strip -mx-4 w-[calc(100%+2rem)] overflow-hidden border-y border-white/10 py-7 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] md:-mx-12 md:w-[calc(100%+6rem)] md:py-9">
            <ul dir="ltr" className="marquee-track flex w-max items-center" style={{ "--marquee-duration": `${BRANDS.length * 3.5}s` } as CSSProperties}>
              {[0, 1].map((copy) =>
                BRANDS.map((b) => (
                  <li key={`${copy}-${getText(b.name, "en")}`} aria-hidden={copy === 1} className="flex items-center px-8 md:px-12">
                    <LogoImage logo={b.logo} alt={copy === 0 ? getText(b.name, locale) : ""} full={64} />
                  </li>
                )),
              )}
            </ul>
          </div>
        </motion.div>

        {/* Authors and creators he works with one-to-one */}
        <motion.div variants={fadeRise} className="flex flex-col items-center gap-6">
          <RowLabel>{t("creators")}</RowLabel>
          <ul className="grid w-full max-w-[880px] gap-4 sm:grid-cols-2">
            {CREATORS.map((c) => {
              const name = getText(c.name, locale);
              return (
                <li key={getText(c.name, "en")} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 md:p-5">
                  {c.photo ? (
                    <Image src={c.photo} alt={name} width={64} height={64} className="h-14 w-14 shrink-0 rounded-full object-cover md:h-16 md:w-16" />
                  ) : (
                    <span aria-hidden className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent/15 font-display text-2xl text-accent md:h-16 md:w-16">
                      {name.trim().charAt(0)}
                    </span>
                  )}
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="font-display text-lg md:text-xl">{name}</span>
                    <span className="text-sm leading-relaxed text-white/60">{getText(c.role, locale)}</span>
                  </div>
                  {c.mark ? <LogoImage logo={c.mark} alt="" full={30} className="hidden shrink-0 opacity-60 sm:block" /> : null}
                </li>
              );
            })}
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

function RowLabel({ children }: { children: React.ReactNode }) {
  return <h3 className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-white/45 md:text-sm">{children}</h3>;
}

/** A white logo at a height balanced for its shape (see logoHeight). */
function LogoImage({ logo, alt, full, className = "opacity-75" }: { logo: Logo; alt: string; full: number; className?: string }) {
  const h = logoHeight(logo, full);
  const w = Math.round((logo.w / logo.h) * h);
  return (
    <Image
      src={logo.src}
      alt={alt}
      width={w}
      height={h}
      style={{ height: h, width: w }}
      className={`max-w-none select-none transition-opacity hover:opacity-100 ${className}`}
      draggable={false}
    />
  );
}
