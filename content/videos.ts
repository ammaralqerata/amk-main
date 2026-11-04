import type { Locale } from "@/i18n/routing";

/** What kind of work a video is. A video has one main category and may also show under others (`also`). */
export type VideoCategory = "motion" | "ads" | "realEstate" | "ai" | "documentary" | "content" | "beforeAfter";

/** Tabs: every category, plus "reels" which collects every vertical video whatever its category. */
export type VideoFilter = "all" | VideoCategory | "reels";

export type Video = {
  /** YouTube video id — or a short slug when the video only lives on this site (`youtube: false`). */
  id: string;
  category: VideoCategory;
  also?: VideoCategory[];
  /** A plain string is shown as-is in every locale. */
  title: string | Record<Locale, string>;
  /** Vertical (9:16) video. */
  vertical?: boolean;
  /** Defaults to true. False = no YouTube copy; the card needs a `poster`, and plays `file` or `compare`. */
  youtube?: boolean;
  /** The full video when it is served from this site instead of YouTube. */
  file?: string;
  /** Cover image (defaults to the YouTube thumbnail). */
  poster?: string;
  /** A few seconds of silent loop (~300 KB) that plays on the card while it is on screen. */
  preview?: string;
  /** Synced raw/final pair (same length, same frame rate) shown in the before/after slider;
   *  `start` = second to open on, where the difference is clearest. */
  compare?: { before: string; after: string; start?: number };
  /** When it was finished (YYYY-MM-DDTHH:MM). Dated videos come first, newest first; undated ones keep list order after them. */
  date?: string;
};

export const VIDEO_CATEGORIES: VideoCategory[] = ["motion", "ads", "realEstate", "ai", "documentary", "content", "beforeAfter"];

/** Shown in the tabs with a "coming soon" note while they have no videos; other empty categories stay hidden. */
export const COMING_SOON_CATEGORIES: VideoCategory[] = ["realEstate", "ai"];

const BEFORE_AFTER = { ar: "قبل وبعد المونتاج", en: "Before & after the edit" };

/** Shorthand for a vertical reel. */
function reel(id: string, category: VideoCategory, title: Video["title"], extra: Partial<Video> = {}): Video {
  return { id, category, title, vertical: true, ...extra };
}

/** Finish date of each site-hosted video (the final render's date). */
const FINISHED: Record<string, string> = {
  "mubasher-trading": "2026-11-04T16:15",
  "ard-alsinaa": "2026-11-03T07:10",
  "laith-investor": "2026-11-02T23:05",
  "omran-digital": "2026-11-02T22:54",
  "omran-email": "2026-11-02T22:42",
  "mohammad-re-4": "2026-11-02T19:00",
  "mohammad-re-3": "2026-11-02T18:52",
  "mohammad-re-2": "2026-11-02T18:43",
  "mohammad-re-1": "2026-11-02T18:36",
  "shraitih-map": "2026-11-02T05:41",
  "nasaq-case-2": "2026-10-29T16:55",
  "nasaq-case-1": "2026-10-29T16:54",
  "mlml-part2": "2026-10-29T13:22",
  railing: "2026-10-29T13:07",
  "mlml-trailer": "2026-10-28T13:30",
  "khamis-villas": "2026-10-28T01:20",
  "ajman-development": "2026-10-27T18:54",
  "madina-land": "2026-10-27T11:10",
  "football-field": "2026-10-25T13:50",
  "wooden-house": "2026-10-25T13:44",
  oraija: "2026-10-25T13:25",
};

/**
 * One of Ammar's vertical before/after reels, served from public/videos/ba/<slug>
 * (<slug>.mp4 full video, <slug>-preview.mp4 card loop, <slug>.jpg poster).
 */
function beforeAfter(slug: string, category: VideoCategory, title: Video["title"], also: VideoCategory[] = []): Video {
  const base = `/videos/ba/${slug}`;
  return {
    id: slug,
    date: FINISHED[slug],
    category,
    also: [...also, "beforeAfter"],
    title,
    vertical: true,
    youtube: false,
    file: `${base}.mp4`,
    preview: `${base}-preview.mp4`,
    poster: `${base}.jpg`,
  };
}

export const VIDEOS: Video[] = [
  // Motion graphics (animated ads)
  { id: "UZewDB18_ho", category: "motion", also: ["ads"], title: "اعلان توب كار لتأجير السيارات" },
  { id: "5L-x90s5SmI", category: "motion", also: ["ads"], title: "اعلان لمتجر Pinky Glow" },
  { id: "_a7cJPGj_tY", category: "motion", also: ["ads"], title: "المطبخ الملكي" },
  { id: "nxNB5bXbgSg", category: "motion", also: ["ads"], title: "من ورشة توفيق كنعان" },
  { id: "-X0_CpwL8V0", category: "motion", also: ["ads"], title: "Hotel Dream Erbil" },
  { id: "zJrUv7G-Txw", category: "motion", also: ["ads"], title: "تطبيق محجوز" },
  { id: "ZOe088cCC94", category: "motion", also: ["ads"], title: "اعلان لشركة ECN" },
  { id: "J_lJzzEKgJE", category: "motion", also: ["ads"], title: "اعلان لشركة Premium Target" },
  { id: "Q-mWHjpIhcU", category: "motion", also: ["ads"], title: "اعلان لفندق فلاش لايت" },
  { id: "mBZqKUAaj0g", category: "ads", also: ["motion"], title: "برومو التطوير المتميز" },
  reel("3sE9Iyd7JwY", "motion", "عجلة بلاكو", { also: ["ads"] }),
  reel("OeoDL0KKH_s", "motion", "مجموعة يوغا البنفسجية — Acnoria Care", { also: ["ads"] }),
  reel("GwszVA3x3nY", "motion", "اعلان العسل — Acnoria Care", { also: ["ads"] }),
  reel("-lMZl1TwsO0", "motion", "المنتجات الطبية", { also: ["ads"] }),
  reel("ExHYLtCgzSg", "motion", "اعلان الخصم 25%", { also: ["ads"] }),
  reel("eANXAn6VO1g", "motion", "قسم المكياج", { also: ["ads"] }),
  reel("l-6PeYXlsp4", "motion", "قسم العدسات", { also: ["ads"] }),
  reel("EYU4sIgKYpE", "motion", "قسم كبار السن", { also: ["ads"] }),
  reel("VENgORT1LBk", "motion", "قسم الرياضة والرشاقة", { also: ["ads"] }),
  reel("c4M29gege9U", "motion", "واقي الشمس", { also: ["ads"] }),

  // Ads & promos (filmed)
  { id: "5vKHhC1jKPA", category: "ads", title: "Demo promo for a wood factory" },
  reel("SiXtjtIkE7Q", "ads", "UXP قريباً"),
  reel("O9yPjvMNpYM", "ads", "برومو UXP"),
  reel("0rZ7Q1FGjCQ", "ads", "KSG"),
  reel("2f950OZpzUw", "ads", "KSG للعناية بالسيارات"),
  reel("6ombhyKTses", "ads", "افتتاح KSG للعناية بالسيارات"),
  reel("uaW5wJyYzPU", "ads", "KSG للعناية بالسيارات"),
  reel("ztNBZQL5H5E", "ads", "ودّع تعديل الإعدادات يدويًا — إطالة"),
  reel("ONnMplI8pVM", "ads", "وقت الشغل = وقت ذكر"),
  beforeAfter("railing", "ads", { ar: "سليم أحمد ستيل — الدرابزون", en: "Saleem Ahmad Steel — Railing" }),
  beforeAfter("football-field", "ads", { ar: "ملعب كرة القدم", en: "Football field" }),
  beforeAfter("wooden-house", "ads", { ar: "بيت الخشب", en: "The wooden house" }),
  beforeAfter("shraitih-map", "ads", { ar: "محل شريتح — الخريطة", en: "Shraitih store — the map" }),

  // Real estate — a vertical one gets `vertical: true`.
  {
    id: "ard-alsinaa",
    category: "realEstate",
    also: ["beforeAfter"],
    title: { ar: "أبو نوح للعقارات — أرض الصناعة", en: "Abu Nouh Real Estate — Industrial land" },
    date: FINISHED["ard-alsinaa"],
    vertical: true,
    youtube: false,
    poster: "/videos/ard-alsinaa/poster.jpg",
    preview: "/videos/ard-alsinaa/preview.mp4",
    compare: { before: "/videos/ard-alsinaa/before.mp4", after: "/videos/ard-alsinaa/after.mp4", start: 7 },
  },
  beforeAfter("khamis-villas", "realEstate", { ar: "فلل خميس مشيط", en: "Khamis Mushait villas" }),
  beforeAfter("ajman-development", "realEstate", { ar: "التنمية العقارية — عجمان", en: "Real estate development — Ajman" }, ["ai"]),
  beforeAfter("madina-land", "realEstate", { ar: "أرض في المدينة المنورة", en: "Land in Madinah" }),
  beforeAfter("oraija", "realEstate", { ar: "حي العريجاء", en: "Al-Uraija district" }),

  // AI videos — a vertical one gets `vertical: true`.
  beforeAfter("mlml-trailer", "ai", { ar: "الململ — تريلر", en: "Al-Malmal — Trailer" }),
  beforeAfter("mlml-part2", "ai", { ar: "الململ — ملخص الجزء 2", en: "Al-Malmal — Part 2 recap" }),

  // Documentary montage (ReLevant History & Heritage)
  { id: "P1uClg_dAus", category: "documentary", title: "The Ancient Peoples of Palestine" },
  { id: "yGjVj9rxCiQ", category: "documentary", title: "A History of Syrian Cuisine — Episode 1" },
  { id: "S-wnABcYjeU", category: "documentary", title: "Persians in the Levant" },
  { id: "VV7PQzcUa7U", category: "documentary", title: "The Lord Baal: A Demonic Figure or a Complex Ancient Heritage?" },
  reel("15tXm3tifDQ", "documentary", "The Lord Baal"),
  reel("MjEUf7X_oTc", "documentary", "The Untold Ethnic History of Palestine"),

  // Content creation
  { id: "q1FYUe6c-z4", category: "content", title: "GTA Grand Theft Auto montage" },
  reel("cl9xPMCtzS4", "content", "التداول"),
  reel("0iCOpcpuSas", "content", "أفضل كورسين مونتاج"),
  reel("M35QqJ4cBAc", "content", "الراجحي"),
  reel("ILTcUOf3cYg", "content", "العلاقة مع الله — ياسر الحزيمي"),
  reel("3vvGkkOu6Fs", "content", "المحفظة المتنوعة"),
  beforeAfter("laith-investor", "content", { ar: "الكوتش ليث — التداول", en: "Coach Laith — Trading" }),
  beforeAfter("mubasher-trading", "content", { ar: "مباشر كابيتال — التداول", en: "Mubasher Capital — Trading" }, ["ads"]),
  beforeAfter("mohammad-re-1", "content", { ar: "Sovereign Capital — ريل 1", en: "Sovereign Capital — Reel 1" }),
  beforeAfter("mohammad-re-2", "content", { ar: "Sovereign Capital — ريل 2", en: "Sovereign Capital — Reel 2" }),
  beforeAfter("mohammad-re-3", "content", { ar: "Sovereign Capital — ريل 3", en: "Sovereign Capital — Reel 3" }),
  beforeAfter("mohammad-re-4", "content", { ar: "Sovereign Capital — ريل 4", en: "Sovereign Capital — Reel 4" }),
  beforeAfter("omran-email", "content", { ar: "عمران — أهمية الإيميل", en: "Omran — Why email matters" }),
  beforeAfter("omran-digital", "content", { ar: "عمران — المشروع الرقمي", en: "Omran — The digital business" }),
  beforeAfter("nasaq-case-1", "content", { ar: "نسق للمحاماة — القضية الأولى", en: "Nasaq Law — Case one" }, ["ai"]),
  beforeAfter("nasaq-case-2", "content", { ar: "نسق للمحاماة — القضية الثانية", en: "Nasaq Law — Case two" }, ["ai"]),

  // Before & after the edit
  reel("VJf9--DPHzw", "beforeAfter", BEFORE_AFTER),
  reel("IBkjMSLGgJw", "beforeAfter", BEFORE_AFTER),
  reel("Fcgko9oQaWA", "beforeAfter", BEFORE_AFTER),
  reel("66x55WC-NYs", "beforeAfter", BEFORE_AFTER),
  reel("uprvGB7RBTk", "beforeAfter", BEFORE_AFTER),
  reel("wjGme94N-3E", "beforeAfter", "لو انت فريلانسر مهم تعمل الحاجة دي"),
  reel("veE6ZhUPuk0", "beforeAfter", "أفضل كورسين مونتاج"),
];

/** Home page carousel, in this order. All have a high-res (maxres) YouTube thumbnail. */
export const FEATURED_VIDEO_IDS = [
  "UZewDB18_ho",
  "P1uClg_dAus",
  "5L-x90s5SmI",
  "yGjVj9rxCiQ",
  "mBZqKUAaj0g",
  "_a7cJPGj_tY",
  "VV7PQzcUa7U",
  "Q-mWHjpIhcU",
];

export function getVideoTitle(video: Video, locale: Locale): string {
  return typeof video.title === "string" ? video.title : video.title[locale];
}

export function isVertical(video: Video): boolean {
  return video.vertical ?? false;
}

export function isOnYoutube(video: Video): boolean {
  return video.youtube ?? true;
}

function inCategory(video: Video, category: VideoCategory): boolean {
  return video.category === category || (video.also?.includes(category) ?? false);
}

/** Newest work first: dated videos by date (newest first), then the undated ones in list order. */
export function newestFirst(videos: Video[]): Video[] {
  const dated = videos.filter((v) => v.date).sort((a, b) => b.date!.localeCompare(a.date!));
  return [...dated, ...videos.filter((v) => !v.date)];
}

/**
 * Shown first, in this order, wherever they appear — ahead of the date order (owner's pick, 2026-11-04):
 * the latest work (Saleem Ahmad Steel, the wooden house), and Al-Uraija leading the real-estate tab.
 */
export const PINNED_FIRST: string[] = ["railing", "football-field", "wooden-house"];
export const PINNED_FIRST_IN: Partial<Record<VideoFilter, string[]>> = { realEstate: ["oraija"] };

function pinnedFirst(videos: Video[], filter: VideoFilter): Video[] {
  const order = PINNED_FIRST_IN[filter] ?? PINNED_FIRST;
  const pinned = order.map((id) => videos.find((v) => v.id === id)).filter((v): v is Video => v !== undefined);
  return [...pinned, ...videos.filter((v) => !pinned.includes(v))];
}

export function getVideosFor(filter: VideoFilter): Video[] {
  if (filter === "all") return pinnedFirst(newestFirst(VIDEOS), filter);
  // Reels: newest first; among the older undated ones, the before/after reels lead as they always have.
  if (filter === "reels") {
    const reels = VIDEOS.filter(isVertical);
    return pinnedFirst(
      newestFirst([...reels.filter((v) => inCategory(v, "beforeAfter")), ...reels.filter((v) => !inCategory(v, "beforeAfter"))]),
      filter,
    );
  }
  return pinnedFirst(newestFirst(VIDEOS.filter((v) => inCategory(v, filter))), filter);
}

/** Categories that have at least one video, in display order. */
export function getActiveCategories(): VideoCategory[] {
  return VIDEO_CATEGORIES.filter((c) => VIDEOS.some((v) => inCategory(v, c)));
}

/** Tabs: categories with videos, the coming-soon ones that are still empty, then "reels". */
export function getFilters(): VideoFilter[] {
  const categories = VIDEO_CATEGORIES.filter(
    (c) => VIDEOS.some((v) => inCategory(v, c)) || COMING_SOON_CATEGORIES.includes(c),
  );
  const reels: VideoFilter[] = VIDEOS.some(isVertical) ? ["reels"] : [];
  return ["all", ...categories, ...reels];
}

export function isComingSoon(filter: VideoFilter): filter is VideoCategory {
  return filter !== "all" && filter !== "reels" && !VIDEOS.some((v) => inCategory(v, filter));
}

export function getFeaturedVideos(): Video[] {
  return FEATURED_VIDEO_IDS.map((id) => VIDEOS.find((v) => v.id === id)).filter(
    (v): v is Video => v !== undefined,
  );
}

/** "hq" (480×360) always exists; "max" (1280×720) exists for most landscape uploads. */
export function getThumbnailUrl(id: string, size: "hq" | "max" = "hq"): string {
  return `https://i.ytimg.com/vi/${id}/${size === "max" ? "maxresdefault" : "hqdefault"}.jpg`;
}

/** The card cover: the video's own poster, else its YouTube thumbnail. */
export function getPoster(video: Video, size: "hq" | "max" = "hq"): string {
  return video.poster ?? getThumbnailUrl(video.id, size);
}

export function getEmbedUrl(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;
}

export function getWatchUrl(video: Video): string {
  return isVertical(video)
    ? `https://www.youtube.com/shorts/${video.id}`
    : `https://www.youtube.com/watch?v=${video.id}`;
}
