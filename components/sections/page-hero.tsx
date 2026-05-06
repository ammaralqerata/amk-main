"use client";
import { motion } from "framer-motion";
import { Eyebrow } from "./eyebrow";
import type { SectionMarkKind } from "@/components/ui/section-mark";
import { SectionMark } from "@/components/ui/section-mark";
import { fadeRise, fadeRiseStagger } from "@/lib/motion";

export function PageHero({
  eyebrow,
  title,
  description,
  align = "left",
  iconKind = "tools",
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  align?: "left" | "center";
  iconKind?: SectionMarkKind;
}) {
  return (
    <section className="bg-inverse text-inverse-fg">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeRiseStagger}
        className={`mx-auto max-w-[var(--container-max)] px-4 md:px-12 py-16 md:py-32 flex flex-col gap-6 ${align === "center" ? "items-center text-center" : ""}`}
      >
        <motion.div variants={fadeRise}>
          <Eyebrow tone="dark" icon={<SectionMark kind={iconKind} className="h-3.5 w-3.5" />}>{eyebrow}</Eyebrow>
        </motion.div>
        <motion.h1
          variants={fadeRise}
          className="font-display uppercase text-[clamp(3rem,8vw,4.5rem)] leading-[1.05]"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={fadeRise}
          className="text-muted text-base md:text-lg leading-relaxed max-w-[700px]"
        >
          {description}
        </motion.p>
      </motion.div>
    </section>
  );
}
