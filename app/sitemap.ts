import type { MetadataRoute } from "next";
import { TOOL_SLUGS } from "@/content/tools";
import { routing } from "@/i18n/routing";
import { localizedPath, SITE_URL } from "@/lib/seo";

const PATHS = ["/", "/portfolio", "/plugins", "/contact", ...TOOL_SLUGS.map((slug) => `/plugins/${slug}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}${localizedPath(locale, path)}`,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${SITE_URL}${localizedPath(l, path)}`]),
        ),
      },
    })),
  );
}
