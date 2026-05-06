import type { Locale } from "@/i18n/routing";
import type { PlatformKind } from "@/components/ui/platform-mark";

export type ToolSlug =
  | "captions"
  | "itala"
  | "consol"
  | "graph"
  | "beat-marker"
  | "fadhakkir";

export type ToolFeature = {
  title: string;
  description: string;
  icon: string;
};

export type ToolDemo =
  | { type: "video"; src: string; poster?: string }
  | { type: "image"; src: string; alt: string };

export type ToolScreenshot = {
  src: string;
  alt: string;
};

export type Tool = {
  slug: ToolSlug;
  name: string;
  tagline: string;
  description: string;
  fullDescription?: string;
  platforms: string;
  platformKind?: PlatformKind;
  heroImage?: string;
  screenshots?: ToolScreenshot[];
  features: ToolFeature[];
  highlights?: string[];
  audience?: string[];
  demo?: ToolDemo;
  cta: { label: string; href: string };
  meta: { title: string; description: string };
};

export type LocalizedTool = Record<Locale, Tool>;
