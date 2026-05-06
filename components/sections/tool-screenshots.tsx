"use client";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";
import { useState } from "react";
import type { Tool } from "@/content/tools/types";

export function ToolScreenshots({ tool }: { tool: Tool }) {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const screenshots = tool.screenshots ?? [];
  const [activeIndex, setActiveIndex] = useState(0);

  if (!screenshots.length) return null;

  const activeShot = screenshots[activeIndex] ?? screenshots[0];
  const previousLabel = isArabic ? "الصورة السابقة" : "Previous image";
  const nextLabel = isArabic ? "الصورة التالية" : "Next image";

  function move(delta: number) {
    setActiveIndex((current) => (current + delta + screenshots.length) % screenshots.length);
  }

  return (
    <section className="bg-inverse text-inverse-fg">
      <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-8 px-4 py-12 md:px-12 md:py-24">
        <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between px-4">
          <div className="flex max-w-3xl flex-col gap-3">
            <p className="font-display text-sm uppercase text-accent">
              {isArabic ? "لقطات الواجهة" : "Interface Shots"}
            </p>
            <h2 className="font-display text-2xl uppercase md:text-3xl lg:text-[42px]">
              {isArabic ? `نظرة قريبة على ${tool.name}` : `A closer look at ${tool.name}`}
            </h2>
          </div>
          <p dir="ltr" className="font-mono text-sm text-white/60">
            {String(activeIndex + 1).padStart(2, "0")} / {String(screenshots.length).padStart(2, "0")}
          </p>
        </header>

        <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] p-2 md:p-4 shadow-2xl shadow-black/35">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-black md:aspect-[16/9]">
            <Image
              key={activeShot.src}
              src={activeShot.src}
              alt={activeShot.alt}
              fill
              sizes="(min-width: 1024px) 1100px, 100vw"
              className="object-contain"
              priority
            />
            {screenshots.length > 1 ? (
              <div className="absolute inset-x-2 md:inset-x-3 top-1/2 flex -translate-y-1/2 items-center justify-between">
                <button
                  type="button"
                  onClick={() => move(-1)}
                  aria-label={previousLabel}
                  title={previousLabel}
                  className="inline-flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white shadow-lg shadow-black/30 transition-colors hover:bg-white hover:text-black"
                >
                  {isArabic ? <ChevronRight className="h-4 w-4 md:h-5 md:w-5" /> : <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />}
                </button>
                <button
                  type="button"
                  onClick={() => move(1)}
                  aria-label={nextLabel}
                  title={nextLabel}
                  className="inline-flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white shadow-lg shadow-black/30 transition-colors hover:bg-white hover:text-black"
                >
                  {isArabic ? <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" /> : <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />}
                </button>
              </div>
            ) : null}
          </div>
        </div>

      </div>
    </section>
  );
}
