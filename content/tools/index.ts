import type { LocalizedTool, Tool, ToolScreenshot, ToolSlug } from "./types";
import type { Locale } from "@/i18n/routing";
import type { PlatformKind } from "@/components/ui/platform-mark";
import { captions } from "./captions";
import { itala } from "./itala";
import { consol } from "./consol";
import { graph } from "./graph";
import { beatMarker } from "./beat-marker";
import { fadhakkir } from "./fadhakkir";

const DOWNLOAD_URLS: Partial<Record<ToolSlug, string>> = {
  captions: "https://github.com/ammaralqerata/amk-captions-updates/releases/download/v1/AMKCaptionsSetup.exe",
  itala: "https://github.com/ammaralqerata/amk-itala-updates/releases/download/AMK-Itala/amkItala_release.zip",
  consol: "https://github.com/ammaralqerata/amkconsol/releases/download/amkconsol-1/amkconsol.zip",
  graph: "https://github.com/ammaralqerata/AMK-Graph/releases/download/AMK-Graph/AMK.Graph.zip",
  "beat-marker": "https://github.com/ammaralqerata/amkBeatMarkers/releases/download/amkBeatMarkers/amkBeatMarkers.zip",
  fadhakkir: "https://apps.microsoft.com/detail/9PBV1CGCZ9KQ?hl=ar-sa&gl=US&ocid=pdpshare",
};

const ENGLISH_TOOL_NAMES: Record<ToolSlug, string> = {
  captions: "AMK Captions",
  itala: "AMK Itala",
  consol: "AMK Consol",
  graph: "AMK Graph",
  "beat-marker": "AMK Beat Marker",
  fadhakkir: "Fadhakkir",
};

const PLATFORM_KINDS: Record<ToolSlug, PlatformKind> = {
  captions: "adobe",
  itala: "after-effects",
  consol: "premiere-pro",
  graph: "adobe",
  "beat-marker": "after-effects",
  fadhakkir: "desktop-app",
};

const TOOL_SCREENSHOTS: Partial<Record<ToolSlug, ToolScreenshot[]>> = {
  captions: [
    {
      src: "/plugins/captions/main-settings.png",
      alt: "AMK Captions caption generation settings",
    },
    {
      src: "/plugins/captions/karaoke-library.png",
      alt: "AMK Captions karaoke animation library",
    },
    {
      src: "/plugins/captions/silence-removal.png",
      alt: "AMK Captions silence removal panel",
    },
    {
      src: "/plugins/captions/motion-presets.png",
      alt: "AMK Captions motion preset gallery",
    },
  ],
  "beat-marker": [
    {
      src: "/plugins/beat-marker/overview.png",
      alt: "AMK Beat Marker overview panel",
    },
    {
      src: "/plugins/beat-marker/analysis-dashboard.png",
      alt: "AMK Beat Marker analysis dashboard",
    },
    {
      src: "/plugins/beat-marker/timing-settings.png",
      alt: "AMK Beat Marker timing settings",
    },
    {
      src: "/plugins/beat-marker/analysis-settings.png",
      alt: "AMK Beat Marker analysis settings",
    },
  ],
  graph: [
    {
      src: "/plugins/graph/curve-editor.png",
      alt: "AMK Graph curve editor",
    },
    {
      src: "/plugins/graph/keyframes-home.png",
      alt: "AMK Graph keyframe controls",
    },
    {
      src: "/plugins/graph/actions-presets.png",
      alt: "AMK Graph actions and presets",
    },
  ],
  itala: [
    {
      src: "/plugins/itala/guide.png",
      alt: "AMK Itala guide tab",
    },
    {
      src: "/plugins/itala/folders-project.png",
      alt: "AMK Itala project folder tools",
    },
    {
      src: "/plugins/itala/folders-list.png",
      alt: "AMK Itala folder list tools",
    },
    {
      src: "/plugins/itala/auto-sort.png",
      alt: "AMK Itala auto sort tools",
    },
    {
      src: "/plugins/itala/options.png",
      alt: "AMK Itala options tab",
    },
    {
      src: "/plugins/itala/size.png",
      alt: "AMK Itala comp size tools",
    },
    {
      src: "/plugins/itala/repeat.png",
      alt: "AMK Itala duplicate tools",
    },
    {
      src: "/plugins/itala/duration.png",
      alt: "AMK Itala duration tools",
    },
    {
      src: "/plugins/itala/frames.png",
      alt: "AMK Itala frame rate tools",
    },
  ],
  fadhakkir: [
    {
      src: "/plugins/fadhakkir/home.png",
      alt: "Fadhakkir reminder settings",
    },
    {
      src: "/plugins/fadhakkir/texts-appearance.png",
      alt: "Fadhakkir custom texts and appearance settings",
    },
    {
      src: "/plugins/fadhakkir/position-size.png",
      alt: "Fadhakkir reminder position and size settings",
    },
    {
      src: "/plugins/fadhakkir/about.png",
      alt: "Fadhakkir about screen",
    },
  ],
};

export const TOOLS: Record<ToolSlug, LocalizedTool> = {
  captions,
  itala,
  consol,
  graph,
  "beat-marker": beatMarker,
  fadhakkir,
};

export const TOOL_SLUGS = [
  "captions",
  "itala",
  "consol",
  "graph",
  "beat-marker",
  "fadhakkir",
] as const satisfies readonly ToolSlug[];

export function getDownloadUrl(slug: ToolSlug) {
  return DOWNLOAD_URLS[slug];
}

export function getTool(slug: string, locale: Locale): Tool | undefined {
  const entry = (TOOLS as Record<string, LocalizedTool | undefined>)[slug];
  const tool = entry?.[locale];
  if (!tool) return undefined;
  const downloadUrl = getDownloadUrl(tool.slug);
  const screenshots = TOOL_SCREENSHOTS[tool.slug];

  return {
    ...tool,
    name: ENGLISH_TOOL_NAMES[tool.slug],
    platformKind: PLATFORM_KINDS[tool.slug],
    heroImage: tool.heroImage ?? screenshots?.[0]?.src,
    screenshots,
    cta: {
      ...tool.cta,
      href: downloadUrl ? `/download/${tool.slug}` : "/contact",
    },
  };
}
