import { Eyebrow } from "./eyebrow";
import type { SectionMarkKind } from "@/components/ui/section-mark";
import { SectionMark } from "@/components/ui/section-mark";
import { riseDelay } from "@/lib/motion";
import { HeroBackdrop } from "@/components/ui/hero-backdrop";

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
    <section className="relative overflow-hidden bg-inverse text-inverse-fg">
      <HeroBackdrop />
      <div
        className={`relative mx-auto max-w-[var(--container-max)] px-4 md:px-12 py-16 md:py-32 flex flex-col gap-6 ${align === "center" ? "items-center text-center" : ""}`}
      >
        <div className="rise-in" style={riseDelay(0)}>
          <Eyebrow tone="dark" icon={<SectionMark kind={iconKind} className="h-3.5 w-3.5" />}>{eyebrow}</Eyebrow>
        </div>
        <h1
          className="rise-in font-display uppercase text-[clamp(3rem,8vw,4.5rem)] leading-[1.05]"
          style={riseDelay(1)}
        >
          {title}
        </h1>
        <p
          className="rise-in text-muted text-base md:text-lg leading-relaxed max-w-[700px]"
          style={riseDelay(2)}
        >
          {description}
        </p>
      </div>
    </section>
  );
}
