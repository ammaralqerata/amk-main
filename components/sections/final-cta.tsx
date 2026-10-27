"use client";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { EMAIL, whatsappUrl } from "@/lib/contact";
import { fadeRise, fadeRiseStagger } from "@/lib/motion";
import { SocialIcon, WhatsAppIcon } from "@/components/ui/social-icons";
import { Eyebrow } from "./eyebrow";
import { SectionMark } from "@/components/ui/section-mark";

const SOCIAL = [
  { href: "https://www.youtube.com/@ammara.m.k", platform: "youtube" as const },
  { href: "https://www.instagram.com/ammar.kerata/", platform: "instagram" as const },
];

/** Closing call to action: one big WhatsApp button, with email and socials as quieter options. */
export function FinalCta() {
  const t = useTranslations("finalCta");
  const tFloating = useTranslations("floating");

  return (
    <section className="bg-inverse px-4 pb-16 md:px-12 md:pb-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeRiseStagger}
        className="relative isolate mx-auto flex max-w-[var(--container-max)] flex-col items-center gap-7 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] px-5 py-14 text-center text-inverse-fg md:gap-8 md:px-20 md:py-20"
      >
        <div aria-hidden className="aurora -z-10 opacity-90" />
        <motion.div variants={fadeRise}>
          <Eyebrow tone="dark" icon={<SectionMark kind="contact" className="h-3.5 w-3.5" />}>{t("eyebrow")}</Eyebrow>
        </motion.div>
        <motion.h2 variants={fadeRise} className="font-display text-4xl uppercase leading-[1.2] md:text-6xl">
          {t("heading")}
        </motion.h2>
        <motion.p variants={fadeRise} className="max-w-[560px] text-base leading-relaxed text-white/65 md:text-lg">
          {t("body")}
        </motion.p>
        <motion.div variants={fadeRise} className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <a
            href={whatsappUrl(tFloating("whatsappMessage"))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[56px] w-full items-center justify-center gap-3 rounded-full bg-accent px-9 text-base font-semibold text-accent-fg transition-shadow hover:shadow-[0_0_0_8px_color-mix(in_srgb,var(--color-accent)_20%,transparent),0_14px_40px_-10px_color-mix(in_srgb,var(--color-accent)_70%,transparent)] sm:w-auto md:text-lg"
          >
            <WhatsAppIcon className="h-6 w-6" />
            {t("whatsapp")}
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="glass inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-full px-8 font-semibold text-white transition-colors hover:text-accent sm:w-auto"
          >
            <Mail aria-hidden className="h-5 w-5" />
            {t("email")}
          </a>
        </motion.div>
        <motion.div variants={fadeRise} className="flex items-center gap-3 pt-2">
          <span className="text-sm text-white/45">{t("follow")}</span>
          {SOCIAL.map((s) => (
            <a
              key={s.platform}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t(s.platform)}
              title={t(s.platform)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/75 transition-colors hover:border-accent hover:text-accent"
            >
              <SocialIcon platform={s.platform} className="h-5 w-5" />
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
