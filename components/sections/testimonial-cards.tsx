"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, ImageIcon, Mic, Pause, Play, Quote, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { fadeRise } from "@/lib/motion";
import {
  localized,
  type AudioTestimonial,
  type Testimonial,
  type TextTestimonial,
} from "@/content/testimonials";
import type { Locale } from "@/i18n/routing";

const card = "glass flex flex-col gap-6 rounded-3xl p-6 md:p-8";

/** Voice notes take two columns on wide screens; dense flow lets text cards fill the gaps. */
export function TestimonialGrid({ items }: { items: Testimonial[] }) {
  return (
    <div className="grid grid-flow-dense gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
      {items.map((item) =>
        item.kind === "audio" ? <AudioCard key={item.name} item={item} /> : <TextCard key={item.name} item={item} />,
      )}
    </div>
  );
}

function TextCard({ item }: { item: TextTestimonial }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("clients.testimonials");
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <motion.figure variants={fadeRise} className={card}>
      <Quote aria-hidden className="h-7 w-7 text-accent" />
      <blockquote dir="auto" className="flex-1 text-base leading-relaxed text-white/85 md:text-lg">
        {localized(item.quote, locale)}
      </blockquote>
      {item.screenshot ? (
        <>
          <button
            type="button"
            onClick={() => dialogRef.current?.showModal()}
            className="inline-flex items-center gap-2 self-start text-sm font-semibold text-white/60 transition-colors hover:text-accent"
          >
            <ImageIcon aria-hidden className="h-4 w-4" />
            {t("viewOriginal")}
          </button>
          <dialog
            ref={dialogRef}
            onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
            className="m-auto max-h-[90vh] max-w-[min(92vw,480px)] overflow-visible bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
          >
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label={t("close")}
              className="absolute -top-14 end-0 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X aria-hidden className="h-5 w-5" />
            </button>
            <Image
              src={item.screenshot}
              alt={t("originalAlt", { name: item.name })}
              width={480}
              height={960}
              className="h-auto max-h-[85vh] w-auto rounded-2xl object-contain"
            />
          </dialog>
        </>
      ) : null}
      <Author item={item} />
    </motion.figure>
  );
}

const BARS = 56;

/** Steady-looking bar heights per client, so the waveform doesn't change between renders. */
function waveform(seed: string): number[] {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return Array.from({ length: BARS }, (_, i) => {
    h = (h * 1103515245 + 12345) >>> 0;
    const envelope = 0.55 + 0.45 * Math.sin((i / BARS) * Math.PI);
    return Math.round((0.25 + ((h >>> 16) % 1000) / 1000 * 0.75) * envelope * 100);
  });
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "--:--";
  const s = Math.floor(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function AudioCard({ item }: { item: AudioTestimonial }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("clients.testimonials");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(NaN);
  const [open, setOpen] = useState(false);
  const bars = waveform(item.name);

  // The metadata can arrive before hydration, when onLoadedMetadata isn't listening yet.
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && audio.readyState >= 1) setDuration(audio.duration);
  }, []);
  const progress = duration > 0 ? current / duration : 0;

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      // One voice note at a time
      document.querySelectorAll("audio").forEach((other) => other !== audio && other.pause());
      void audio.play();
    } else {
      audio.pause();
    }
  }

  return (
    <motion.figure variants={fadeRise} className={cn(card, "md:col-span-2")}>
      <span className="inline-flex items-center gap-2 self-start rounded-full bg-accent/15 px-3 py-1.5 text-xs font-semibold text-accent">
        <Mic aria-hidden className="h-3.5 w-3.5" />
        {t("voiceNote")}
      </span>
      <blockquote dir="auto" className="font-display text-xl leading-snug md:text-2xl">
        «{localized(item.highlight, locale)}»
      </blockquote>

      <div dir="ltr" className="flex items-center gap-3 rounded-2xl bg-black/30 p-3 pe-4 md:gap-4 md:pe-5">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? t("pause") : t("play")}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-accent-fg transition-transform hover:scale-105"
        >
          {playing ? <Pause aria-hidden className="h-5 w-5 fill-current" /> : <Play aria-hidden className="ms-0.5 h-5 w-5 fill-current" />}
        </button>
        <div className="relative flex h-10 min-w-0 flex-1 items-center gap-[2px] md:gap-[3px]">
          {bars.map((height, i) => (
            <span
              key={i}
              aria-hidden
              style={{ height: `${height}%` }}
              className={cn("flex-1 rounded-full transition-colors max-md:even:hidden", i / BARS < progress ? "bg-accent" : "bg-white/25")}
            />
          ))}
          <input
            type="range"
            min={0}
            max={duration > 0 ? duration : 0}
            step={0.1}
            value={current}
            onChange={(e) => {
              const audio = audioRef.current;
              if (audio) audio.currentTime = Number(e.target.value);
            }}
            aria-label={t("seek")}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </div>
        <span className="w-12 shrink-0 text-end font-mono text-xs text-white/60">
          {formatTime(playing || current > 0 ? current : duration)}
        </span>
        <audio
          ref={audioRef}
          src={item.audio}
          preload="metadata"
          onDurationChange={(e) => setDuration(e.currentTarget.duration)}
          onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setCurrent(0)}
        />
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="inline-flex items-center gap-2 self-start text-sm font-semibold text-white/60 transition-colors hover:text-accent"
        >
          {open ? t("hideTranscript") : t("showTranscript")}
          <ChevronDown aria-hidden className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
        </button>
        {open ? (
          <p dir="auto" className="whitespace-pre-line rounded-2xl border border-white/10 p-4 text-sm leading-relaxed text-white/70 md:text-base">
            {localized(item.transcript, locale)}
          </p>
        ) : null}
      </div>

      <Author item={item} />
    </motion.figure>
  );
}

function Author({ item }: { item: Testimonial }) {
  const locale = useLocale() as Locale;
  return (
    <figcaption className="mt-auto flex items-center gap-3 border-t border-white/10 pt-5">
      {item.image ? (
        <Image src={item.image} alt="" width={48} height={48} className="h-12 w-12 rounded-full bg-white object-cover" />
      ) : (
        <span aria-hidden className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 font-display text-lg text-accent">
          {item.name.charAt(0)}
        </span>
      )}
      <span className="flex flex-col">
        <span className="font-semibold">{item.name}</span>
        <span className="text-sm text-white/55">{localized(item.role, locale)}</span>
      </span>
    </figcaption>
  );
}
