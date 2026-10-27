import type { Locale } from "@/i18n/routing";

type Localized = string | Record<Locale, string>;

/**
 * What clients say. The section stays hidden until this list has at least one entry.
 * Every text can be one string for every locale or one per locale.
 */
type TestimonialBase = {
  name: string;
  /** e.g. "Owner, Top Car" */
  role: Localized;
  /** Client photo or logo, path under /public */
  image?: string;
};

/** Typed out from a message the client sent. */
export type TextTestimonial = TestimonialBase & {
  kind: "text";
  quote: Localized;
  /** The original message as proof, path under /public (hide phone numbers first). */
  screenshot?: string;
};

/** A voice note, with the strongest line pulled out and the full transcript. */
export type AudioTestimonial = TestimonialBase & {
  kind: "audio";
  /** Path under /public, e.g. "/testimonials/top-car.mp3" */
  audio: string;
  /** One or two lines shown big, for visitors who don't press play. */
  highlight: Localized;
  transcript: Localized;
};

export type Testimonial = TextTestimonial | AudioTestimonial;

export const TESTIMONIALS: Testimonial[] = [];

export function localized(value: Localized, locale: Locale): string {
  return typeof value === "string" ? value : value[locale];
}
