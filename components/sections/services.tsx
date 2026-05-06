"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Eyebrow } from "./eyebrow";
import { SectionMark } from "@/components/ui/section-mark";
import { fadeRise, fadeRiseStagger } from "@/lib/motion";

type Service = { number: string; title: string; description: string };

export function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as Service[];

  return (
    <section className="px-4 md:px-12 py-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeRiseStagger}
        className="mx-auto max-w-[var(--container-max)] bg-inverse text-inverse-fg rounded-2xl px-4 md:px-20 py-12 md:py-24 flex flex-col gap-10 md:gap-14"
      >
        <motion.div variants={fadeRise}>
          <Eyebrow tone="dark" icon={<SectionMark kind="services" className="h-3.5 w-3.5" />}>{t("eyebrow")}</Eyebrow>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-4 md:gap-8 px-4">
          {items.map((s) => (
            <motion.article variants={fadeRise} key={s.number} className="flex flex-col gap-4">
              <span className="font-display text-4xl md:text-5xl text-accent leading-none">{s.number}</span>
              <h3 className="font-display text-lg md:text-[22px] uppercase">{s.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{s.description}</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
