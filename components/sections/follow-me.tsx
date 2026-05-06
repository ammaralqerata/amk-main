"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Eyebrow } from "./eyebrow";
import { SectionMark } from "@/components/ui/section-mark";
import { SocialIcon } from "@/components/ui/social-icons";
import { fadeRise, fadeRiseStagger } from "@/lib/motion";

export function FollowMe() {
  const t = useTranslations("followMe");

  const social = [
    { href: "https://www.youtube.com/@ammara.m.k", platform: "youtube" as const },
    { href: "https://www.instagram.com/ammar.kerata/", platform: "instagram" as const },
  ];

  return (
    <section className="px-4 md:px-12 pb-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeRiseStagger}
        className="mx-auto max-w-[var(--container-max)] bg-inverse text-inverse-fg rounded-2xl px-4 md:px-20 py-12 md:py-20 flex flex-col items-center gap-8 md:gap-10"
      >
        <motion.div variants={fadeRise}>
          <Eyebrow tone="dark" icon={<SectionMark kind="contact" className="h-3.5 w-3.5" />}>{t("eyebrow")}</Eyebrow>
        </motion.div>
        <motion.h2 variants={fadeRise} className="font-display text-3xl md:text-[36px] uppercase text-center px-4">
          {t("heading")}
        </motion.h2>
        <motion.div variants={fadeRise} className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center w-full px-4">
          {social.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl px-8 py-4 md:px-10 md:py-4 border border-[var(--color-fg-secondary)] text-inverse-fg hover:border-accent transition-colors min-w-[200px] min-h-[52px]"
            >
              <SocialIcon platform={s.platform} className="h-5 w-5" />
              <span className="font-body text-base font-semibold">{t(s.platform)}</span>
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
