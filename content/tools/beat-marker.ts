import type { LocalizedTool } from "./types";

export const beatMarker: LocalizedTool = {
  ar: {
    slug: "beat-marker",
    name: "AMK Beat Marker",
    tagline: "حلّل الإيقاع وأنشئ Beat Markers تلقائيًا داخل After Effects.",
    description: "إضافة لـ Adobe After Effects تقوم بتحليل الإيقاع من الصوت وإنشاء Beat Markers تلقائيًا لتسريع المونتاج الإيقاعي.",
    fullDescription: "AMK Beat Marker تساعدك على مزامنة الحركة والقص مع الموسيقى عبر استخراج الضربات تلقائيًا ووضع Markers على التايملاين، مع أدوات إضافية لتطبيق تأثيرات مباشرة بعد التحليل.",
    platforms: "After Effects",
    features: [],
    highlights: [
      "تحليل الصوت واستخراج الضربات",
      "إنشاء Markers تلقائيًا",
      "دعم Left / Right / Both channels",
      "Bar Markers",
      "Split Layer تلقائي",
      "Flash Effects",
      "Time Remap Stutter",
      "تصدير CSV",
      "Presets جاهزة",
      "عربي / English",
    ],
    audience: [
      "مونتاج الموسيقى",
      "فيديوهات Reels",
      "Motion Sync",
      "Edit سريع على الإيقاع",
    ],
    cta: { label: "تحميل", href: "#" },
    meta: {
      title: "AMK Beat Marker",
      description: "إضافة After Effects لتحليل الإيقاع وإنشاء Beat Markers تلقائيًا.",
    },
  },
  en: {
    slug: "beat-marker",
    name: "AMK Beat Marker",
    tagline: "Audio-driven beat markers for rhythm-based editing.",
    description: "An After Effects extension that analyzes audio amplitude and generates beat markers for rhythm-based editing.",
    platforms: "After Effects",
    features: [],
    cta: { label: "Download", href: "#" },
    meta: {
      title: "AMK Beat Marker",
      description: "After Effects extension that generates audio-driven beat markers for rhythm-based editing.",
    },
  },
};
