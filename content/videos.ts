import type { Locale } from "@/i18n/routing";

export type VideoCategory = "ads" | "documentary" | "creative" | "realEstate" | "ai" | "shorts";

export type Video = {
  /** YouTube video id */
  id: string;
  category: VideoCategory;
  /** A plain string is shown as-is in every locale. */
  title: string | Record<Locale, string>;
  /** Vertical (9:16) video. Defaults to true for "shorts", false otherwise. */
  vertical?: boolean;
};

export const VIDEO_CATEGORIES: VideoCategory[] = ["ads", "documentary", "creative", "realEstate", "ai", "shorts"];

/** Shown in the filters with a "coming soon" note while they have no videos; other empty categories stay hidden. */
export const COMING_SOON_CATEGORIES: VideoCategory[] = ["realEstate", "ai"];

const BEFORE_AFTER = { ar: "قبل وبعد المونتاج", en: "Before & after the edit" };

export const VIDEOS: Video[] = [
  // Ads & motion graphics
  { id: "UZewDB18_ho", category: "ads", title: "اعلان توب كار لتأجير السيارات" },
  { id: "5L-x90s5SmI", category: "ads", title: "اعلان لمتجر Pinky Glow" },
  { id: "_a7cJPGj_tY", category: "ads", title: "المطبخ الملكي" },
  { id: "nxNB5bXbgSg", category: "ads", title: "من ورشة توفيق كنعان" },
  { id: "-X0_CpwL8V0", category: "ads", title: "Hotel Dream Erbil" },
  { id: "zJrUv7G-Txw", category: "ads", title: "تطبيق محجوز" },
  { id: "ZOe088cCC94", category: "ads", title: "اعلان لشركة ECN" },
  { id: "J_lJzzEKgJE", category: "ads", title: "اعلان لشركة Premium Target" },
  { id: "Q-mWHjpIhcU", category: "ads", title: "اعلان لفندق فلاش لايت" },

  // Documentary montage (ReLevant History & Heritage)
  { id: "P1uClg_dAus", category: "documentary", title: "The Ancient Peoples of Palestine" },
  { id: "yGjVj9rxCiQ", category: "documentary", title: "A History of Syrian Cuisine — Episode 1" },
  { id: "S-wnABcYjeU", category: "documentary", title: "Persians in the Levant" },
  { id: "VV7PQzcUa7U", category: "documentary", title: "The Lord Baal: A Demonic Figure or a Complex Ancient Heritage?" },

  // Creative content
  { id: "mBZqKUAaj0g", category: "creative", title: "برومو التطوير المتميز" },
  { id: "5vKHhC1jKPA", category: "creative", title: "Demo promo for a wood factory" },
  { id: "q1FYUe6c-z4", category: "creative", title: "GTA Grand Theft Auto montage" },

  // Real estate videos — add them here; a vertical one gets `vertical: true`.

  // AI videos — add them here; a vertical one gets `vertical: true`.

  // Reels & shorts
  { id: "VJf9--DPHzw", category: "shorts", title: BEFORE_AFTER },
  { id: "IBkjMSLGgJw", category: "shorts", title: BEFORE_AFTER },
  { id: "Fcgko9oQaWA", category: "shorts", title: BEFORE_AFTER },
  { id: "66x55WC-NYs", category: "shorts", title: BEFORE_AFTER },
  { id: "uprvGB7RBTk", category: "shorts", title: BEFORE_AFTER },
  { id: "wjGme94N-3E", category: "shorts", title: "لو انت فريلانسر مهم تعمل الحاجة دي" },
  { id: "cl9xPMCtzS4", category: "shorts", title: "التداول" },
  { id: "15tXm3tifDQ", category: "shorts", title: "The Lord Baal" },
  { id: "MjEUf7X_oTc", category: "shorts", title: "The Untold Ethnic History of Palestine" },
  { id: "ztNBZQL5H5E", category: "shorts", title: "ودّع تعديل الإعدادات يدويًا — إطالة" },
  { id: "ONnMplI8pVM", category: "shorts", title: "وقت الشغل = وقت ذكر" },
  { id: "0iCOpcpuSas", category: "shorts", title: "أفضل كورسين مونتاج" },
  { id: "veE6ZhUPuk0", category: "shorts", title: "أفضل كورسين مونتاج" },
  { id: "SiXtjtIkE7Q", category: "shorts", title: "UXP قريباً" },
  { id: "O9yPjvMNpYM", category: "shorts", title: "برومو UXP" },
  { id: "0rZ7Q1FGjCQ", category: "shorts", title: "KSG" },
  { id: "2f950OZpzUw", category: "shorts", title: "KSG للعناية بالسيارات" },
  { id: "6ombhyKTses", category: "shorts", title: "افتتاح KSG للعناية بالسيارات" },
  { id: "uaW5wJyYzPU", category: "shorts", title: "KSG للعناية بالسيارات" },
  { id: "M35QqJ4cBAc", category: "shorts", title: "الراجحي" },
  { id: "3sE9Iyd7JwY", category: "shorts", title: "عجلة بلاكو" },
  { id: "ILTcUOf3cYg", category: "shorts", title: "العلاقة مع الله — ياسر الحزيمي" },
  { id: "3vvGkkOu6Fs", category: "shorts", title: "المحفظة المتنوعة" },
  { id: "OeoDL0KKH_s", category: "shorts", title: "مجموعة يوغا البنفسجية — Acnoria Care" },
  { id: "GwszVA3x3nY", category: "shorts", title: "اعلان العسل — Acnoria Care" },
  { id: "-lMZl1TwsO0", category: "shorts", title: "المنتجات الطبية" },
  { id: "ExHYLtCgzSg", category: "shorts", title: "اعلان الخصم 25%" },
  { id: "eANXAn6VO1g", category: "shorts", title: "قسم المكياج" },
  { id: "l-6PeYXlsp4", category: "shorts", title: "قسم العدسات" },
  { id: "EYU4sIgKYpE", category: "shorts", title: "قسم كبار السن" },
  { id: "VENgORT1LBk", category: "shorts", title: "قسم الرياضة والرشاقة" },
  { id: "c4M29gege9U", category: "shorts", title: "واقي الشمس" },
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
  return video.vertical ?? video.category === "shorts";
}

export function getVideosByCategory(category: VideoCategory): Video[] {
  return VIDEOS.filter((v) => v.category === category);
}

/** Categories that have at least one video, in display order. */
export function getActiveCategories(): VideoCategory[] {
  return VIDEO_CATEGORIES.filter((c) => VIDEOS.some((v) => v.category === c));
}

/** Filter chips: categories with videos, plus the coming-soon ones that are still empty. */
export function getFilterCategories(): VideoCategory[] {
  return VIDEO_CATEGORIES.filter(
    (c) => VIDEOS.some((v) => v.category === c) || COMING_SOON_CATEGORIES.includes(c),
  );
}

export function isComingSoon(category: VideoCategory): boolean {
  return !VIDEOS.some((v) => v.category === category);
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

export function getEmbedUrl(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;
}

export function getWatchUrl(video: Video): string {
  return isVertical(video)
    ? `https://www.youtube.com/shorts/${video.id}`
    : `https://www.youtube.com/watch?v=${video.id}`;
}
