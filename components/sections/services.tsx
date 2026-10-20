"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Eyebrow } from "./eyebrow";
import { SectionMark } from "@/components/ui/section-mark";
import { fadeRise, fadeRiseStagger } from "@/lib/motion";
import { keepProductNamesTogether } from "@/lib/text";

type Service = { number: string; title: string; description: string };

export function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as Service[];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={fadeRiseStagger}
      className="relative overflow-hidden bg-inverse text-inverse-fg"
    >
      <div className="relative mx-auto max-w-[var(--container-max)] px-4 md:px-12 pt-16 md:pt-28 flex flex-col gap-8 md:gap-12">
        <motion.div variants={fadeRise} className="px-2">
          <Eyebrow tone="dark" icon={<SectionMark kind="services" className="h-3.5 w-3.5" />}>{t("eyebrow")}</Eyebrow>
        </motion.div>
        <div className="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((s) => (
            <motion.article
              variants={fadeRise}
              key={s.number}
              className="spotlight glass flex flex-col gap-4 rounded-3xl p-6 md:p-7"
            >
              <span className="font-display text-4xl md:text-5xl leading-none text-accent">{s.number}</span>
              <h3 className="font-display text-xl md:text-[22px] uppercase">{s.title}</h3>
              <p className="text-sm leading-relaxed text-white/60">{keepProductNamesTogether(s.description)}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
