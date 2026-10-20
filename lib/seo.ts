import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";

export const SITE_URL = "https://ammar.kerata.net";
export const SITE_NAME = "AMK Creative";
const OG_IMAGE = { url: "/og-image-v1.png", width: 1200, height: 630 };

/** "/portfolio" → "/portfolio" for Arabic (default, no prefix) or "/en/portfolio" for English. */
export function localizedPath(locale: Locale, path: string): string {
  const suffix = path === "/" ? "" : path;
  if (locale === routing.defaultLocale) return suffix || "/";
  return `/${locale}${suffix}`;
}

/**
 * Per-page SEO metadata: its own canonical URL, language alternates and
 * social preview. Without this every page inherits the home page's canonical.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const url = localizedPath(locale, path);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ar: localizedPath("ar", path),
        en: localizedPath("en", path),
        "x-default": localizedPath(routing.defaultLocale, path),
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: locale === "ar" ? "ar_AR" : "en_US",
      images: [{ ...OG_IMAGE, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
