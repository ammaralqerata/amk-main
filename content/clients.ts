import type { Locale } from "@/i18n/routing";

type Text = string | Record<Locale, string>;

/** A white logo in /public/brand/clients (transparent PNG, ~160 px tall); w/h are its pixel size. */
export type Logo = { src: string; w: number; h: number };

/** `withName`: the logo is a bare symbol, so the name is written next to it. */
export type Partner = { name: Text; logo: Logo; withName?: boolean };

export type Creator = {
  name: Text;
  /** What the work for them is, one line. */
  role: Text;
  /** A small mark shown on the card (e.g. the book's logo); falls back to the initial. */
  mark?: Logo;
  /** Square photo, once there is an approved one. */
  photo?: string;
};

function logo(slug: string, w: number, h: number): Logo {
  return { src: `/brand/clients/${slug}.png`, w, h };
}

/**
 * Companies and agencies Ammar worked for directly (employment or contract).
 * Maizny and Digital Growth logos come from their Instagram avatars (@maizny1, @digitalgrowth_sa). Vega's comes from the ad Ammar animated for them (vega_ad_preview_3.html).
 */
export const AGENCIES: Partner[] = [
  { name: { ar: "نسق للدعاية والإعلان", en: "Naseq Advertising" }, logo: logo("naseq", 195, 160) },
  { name: { ar: "أوريجينال ون للتسويق", en: "Original One Marketing" }, logo: logo("original-one", 521, 160) },
  { name: { ar: "دروس ميديا", en: "Doros Media" }, logo: logo("doros-media", 294, 160) },
  { name: { ar: "ميزني", en: "Maizny" }, logo: logo("maizny", 265, 160), withName: true },
  { name: { ar: "ديجيتال غروث", en: "Digital Growth" }, logo: logo("digital-growth", 323, 160) },
  { name: { ar: "فيجا", en: "Vega" }, logo: logo("vega", 464, 160) },
];

/**
 * Brands whose videos he edited — directly or through one of the agencies above.
 * Shown as "brands I've edited for", never as direct contracts.
 */
export const BRANDS: Partner[] = [
  { name: { ar: "سليم أحمد ستيل", en: "Saleem Ahmad Steel" }, logo: logo("saleem-ahmad-steel", 158, 160) },
  { name: { ar: "بلاكو", en: "Blako" }, logo: logo("blako", 640, 154) },
  { name: { ar: "تنمية العقارية", en: "Tanmia Real Estate" }, logo: logo("tanmia", 218, 160) },
  { name: "Sovereign Capital", logo: logo("sovereign-capital", 145, 160) },
  { name: { ar: "مباشر كابيتال", en: "Mubasher Capital" }, logo: logo("mubasher-capital", 640, 76) },
  { name: { ar: "أبو نوح للعقارات", en: "Abu Nouh Real Estate" }, logo: logo("abu-nouh", 160, 160) },
  { name: { ar: "بروج العلم للاستثمار", en: "Burouj Alelm Investment" }, logo: logo("burouj", 277, 160) },
  { name: "KSG", logo: logo("ksg", 527, 160) },
  { name: "UXP", logo: logo("uxp", 468, 160) },
  { name: "Acnoria Care", logo: logo("acnoria-care", 186, 160) },
  { name: { ar: "توب كار", en: "Top Car" }, logo: logo("top-car", 313, 160) },
  { name: "Pinky Glow", logo: logo("pinky-glow", 188, 160) },
  { name: "Dream Erbil", logo: logo("dream-erbil", 168, 160) },
];

/** People he works with one-to-one: authors and creators. */
export const CREATORS: Creator[] = [
  {
    name: { ar: "ضرار الحسن", en: "Dirar Al-Hassan" },
    role: { ar: "مؤسس فيجا في دبي — مونتاج قناته الشخصية", en: "Founder of Vega, Dubai — editing his personal channel" },
    photo: "/brand/people/dirar.jpg",
  },
  {
    name: { ar: "خالد السدّاني", en: "Khalid Al-Saddani" },
    role: { ar: "باحث ومؤلف كويتي — تريلر وملخص رواية «الململ»", en: "Kuwaiti researcher and author — trailer and recap of «Al-Malmal»" },
    mark: logo("malmal-book", 472, 160),
    photo: "/brand/people/khalid.jpg",
  },
];

export function getText(text: Text, locale: Locale): string {
  return typeof text === "string" ? text : text[locale];
}

/**
 * Display height in px for a logo row: square marks get the full height, wide wordmarks
 * are shortened so every logo carries about the same visual weight.
 */
export function logoHeight(l: Logo, full: number): number {
  const aspect = l.w / l.h;
  return Math.round(full / Math.pow(Math.max(aspect, 1), 0.45));
}
