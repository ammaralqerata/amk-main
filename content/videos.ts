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
  /** Unlisted YouTube copy of the full video; the card keeps its site poster/preview, the player embeds this. */
  yt?: string;
  /** Cover image (defaults to the YouTube thumbnail). */
  poster?: string;
  /** A few seconds of silent loop (~300 KB) that plays on the card while it is on screen. */
  preview?: string;
  /** Synced raw/final pair (same length, same frame rate) shown in the before/after slider;
   *  `start` = second to open on, where the difference is clearest. */
  compare?: { before: string; after: string; start?: number };
  /** The clean finished video (no before/after frame), shown everywhere except the before/after tab. */
  final?: { file?: string; yt?: string; preview: string; poster: string };
  /** When it was finished (YYYY-MM-DDTHH:MM). Dated videos come first, newest first; undated ones keep list order after them. */
  date?: string;
};

export const VIDEO_CATEGORIES: VideoCategory[] = ["motion", "ads", "realEstate", "ai", "documentary", "content", "beforeAfter"];

/** Shown in the tabs with a "coming soon" note while they have no videos; other empty categories stay hidden. */
export const COMING_SOON_CATEGORIES: VideoCategory[] = ["realEstate", "ai"];

/** Categories kept for sorting but not offered as a tab (owner, 2026-11-04: content reels live under "reels"). */
export const HIDDEN_TABS: VideoCategory[] = ["content"];

/** Slugs whose clean final lives in public/videos/reels/<slug>{.mp4,-preview.mp4,.jpg}. */
const HAS_FINAL = new Set<string>([
  "railing",
  "football-field",
  "wooden-house",
  "shraitih-map",
  "khamis-villas",
  "ajman-development",
  "madina-land",
  "oraija",
  "mlml-trailer",
  "mlml-part2",
  "laith-investor",
  "mubasher-trading",
  "mohammad-re-1",
  "mohammad-re-2",
  "mohammad-re-3",
  "mohammad-re-4",
  "omran-email",
  "omran-digital",
  "nasaq-case-1",
  "nasaq-case-2",
  "ard-alsinaa",
]);

/** Unlisted YouTube ids sent by Ammar 2026-11-05 — clean finals. Missing ones (YouTube copyright block) stay on the site. */
const FINAL_YT: Record<string, string> = {
  "ard-alsinaa": "QKikJXY_a44",
  "mohammad-re-1": "WUUpxA3GnBA",
  "mohammad-re-2": "SL1WWXtCtSk",
  "mohammad-re-3": "p9NJcYU6q28",
  "mohammad-re-4": "ronVQ0CFAs0",
  "madina-land": "MHu5R6oSoh8",
  "laith-investor": "_G0VyoqLd6E",
  "wooden-house": "lHE3JtEqfBY",
  oraija: "buVG1NocNic",
  railing: "87ngrkoSSX8",
  "omran-digital": "qzkIHHtxHyY",
  "omran-email": "VUQGQJUkJ5I",
  "khamis-villas": "0YJGoTwt-sg",
  "mubasher-trading": "wiUMm6HPTVA",
  "shraitih-map": "gvJjN776BYc",
  "football-field": "tcAs31AbwVM",
  "nasaq-case-1": "gX88wNmbTcQ",
  "nasaq-case-2": "duExdsm6n-Q",
};

/** Same, for the before/after composites. */
const BA_YT: Record<string, string> = {
  "mohammad-re-1": "XdtLLaip15Q",
  "mohammad-re-2": "MD1sWIvvsGM",
  "mohammad-re-3": "z5mn_b8xWT4",
  "mohammad-re-4": "4hHTmHabkuw",
  "laith-investor": "4uFn7PvS1TY",
  "wooden-house": "UU9_yJwA16M",
  oraija: "Y_dUJdyrU_M",
  railing: "F22cXng4xgI",
  "omran-digital": "-lLEBbQd_yg",
  "omran-email": "Ru5jIgxlxas",
  "khamis-villas": "0CrabHngUmw",
  "mubasher-trading": "lUtYm3Bz0O8",
  "shraitih-map": "tkI0VjqCLoE",
  "football-field": "eOPhr9pJ3Bc",
  "nasaq-case-2": "K8gpFVMsyTg",
};

function finalOf(slug: string): Video["final"] {
  if (!HAS_FINAL.has(slug)) return undefined;
  const base = `/videos/reels/${slug}`;
  const yt = FINAL_YT[slug];
  return { ...(yt ? { yt } : { file: `${base}.mp4` }), preview: `${base}-preview.mp4`, poster: `${base}.jpg` };
}

const BEFORE_AFTER = { ar: "قبل وبعد المونتاج", en: "Before & after the edit" };

/** Shorthand for a vertical reel. */
function reel(id: string, category: VideoCategory, title: Video["title"], extra: Partial<Video> = {}): Video {
  return { id, category, title, vertical: true, ...extra };
}

/** When each site-hosted video was really finished: the clean final file's date on Ammar's drives (2026-11-04). */
const FINISHED: Record<string, string> = {
  "laith-investor": "2026-11-02T22:02",
  "mohammad-re-4": "2026-11-02T18:19",
  "mohammad-re-3": "2026-11-02T18:18",
  "mohammad-re-2": "2026-11-02T18:17",
  "mohammad-re-1": "2026-11-02T18:16",
  "mlml-part2": "2026-10-28T17:48",
  "mlml-trailer": "2026-10-28T12:00",
  oraija: "2026-10-24T19:58",
  railing: "2026-10-21T15:46",
  "football-field": "2026-10-17T16:22",
  "wooden-house": "2026-10-14T15:40",
  "ajman-development": "2026-09-14T02:08",
  "madina-land": "2026-08-10T00:04",
  "nasaq-case-2": "2026-07-29T16:19",
  "nasaq-case-1": "2026-07-29T13:53",
  "khamis-villas": "2026-06-12T17:49",
  "omran-digital": "2026-05-30T08:10",
  "omran-email": "2026-05-17T19:53",
  "shraitih-map": "2026-03-31T09:55",
  "ard-alsinaa": "2026-03-06T02:40",
  "mubasher-trading": "2025-12-31T21:27",
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
    final: finalOf(slug),
    category,
    also: [...also, "beforeAfter"],
    title,
    vertical: true,
    youtube: false,
    ...(BA_YT[slug] ? { yt: BA_YT[slug] } : { file: `${base}.mp4` }),
    preview: `${base}-preview.mp4`,
    poster: `${base}.jpg`,
  };
}

export const VIDEOS: Video[] = [
  // Motion graphics (animated ads)
  { id: "UZewDB18_ho", category: "motion", title: "اعلان توب كار لتأجير السيارات" },
  { id: "5L-x90s5SmI", category: "motion", title: "اعلان لمتجر Pinky Glow" },
  { id: "_a7cJPGj_tY", category: "motion", title: "المطبخ الملكي" },
  { id: "nxNB5bXbgSg", category: "motion", title: "من ورشة توفيق كنعان" },
  { id: "-X0_CpwL8V0", category: "motion", title: "Hotel Dream Erbil" },
  { id: "zJrUv7G-Txw", category: "motion", title: "تطبيق محجوز" },
  { id: "ZOe088cCC94", category: "motion", title: "اعلان لشركة ECN" },
  { id: "J_lJzzEKgJE", category: "motion", title: "اعلان لشركة Premium Target" },
  { id: "Q-mWHjpIhcU", category: "motion", title: "اعلان لفندق فلاش لايت" },
  { id: "mBZqKUAaj0g", category: "ads", also: ["motion"], title: "برومو التطوير المتميز" },
  reel("3sE9Iyd7JwY", "motion", "عجلة بلاكو"),
  reel("OeoDL0KKH_s", "motion", "مجموعة يوغا البنفسجية — Acnoria Care"),
  reel("GwszVA3x3nY", "motion", "اعلان العسل — Acnoria Care"),
  reel("-lMZl1TwsO0", "motion", "المنتجات الطبية"),
  reel("ExHYLtCgzSg", "motion", "اعلان الخصم 25%"),
  reel("eANXAn6VO1g", "motion", "قسم المكياج"),
  reel("l-6PeYXlsp4", "motion", "قسم العدسات"),
  reel("EYU4sIgKYpE", "motion", "قسم كبار السن"),
  reel("VENgORT1LBk", "motion", "قسم الرياضة والرشاقة"),
  reel("c4M29gege9U", "motion", "واقي الشمس"),

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
    final: finalOf("ard-alsinaa"),
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
  beforeAfter("mlml-trailer", "ai", { ar: "الململ — رواية خالد السدّاني (تريلر)", en: "Al-Malmal by Khalid Al-Saddani — Trailer" }),
  beforeAfter("mlml-part2", "ai", { ar: "الململ — رواية خالد السدّاني (ملخص الجزء 2)", en: "Al-Malmal by Khalid Al-Saddani — Part 2 recap" }),

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
  beforeAfter("mubasher-trading", "ads", { ar: "مباشر كابيتال — التداول", en: "Mubasher Capital — Trading" }),
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

/**
 * How a video appears under a tab: the before/after tab shows the before/after version
 * (composite or slider); every other place shows the clean final when there is one.
 */
function shownUnder(filter: VideoFilter) {
  return (video: Video): Video => {
    if (filter === "beforeAfter" || !video.final) return video;
    const { final } = video;
    return { ...video, final: undefined, compare: undefined, file: final.file, yt: final.yt, preview: final.preview, poster: final.poster };
  };
}

export function getVideosFor(filter: VideoFilter): Video[] {
  return pickFor(filter).map(shownUnder(filter));
}

function pickFor(filter: VideoFilter): Video[] {
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
    (c) => !HIDDEN_TABS.includes(c) && (VIDEOS.some((v) => inCategory(v, c)) || COMING_SOON_CATEGORIES.includes(c)),
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
  if (video.yt) return `https://www.youtube.com/shorts/${video.yt}`;
  return isVertical(video)
    ? `https://www.youtube.com/shorts/${video.id}`
    : `https://www.youtube.com/watch?v=${video.id}`;
}
