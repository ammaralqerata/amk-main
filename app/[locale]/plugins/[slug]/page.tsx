import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTool, TOOL_SLUGS } from "@/content/tools";
import { ToolHero } from "@/components/sections/tool-hero";
import { ToolDemoVideo } from "@/components/sections/tool-demo-video";
import { ToolScreenshots } from "@/components/sections/tool-screenshots";
import { ToolSummary } from "@/components/sections/tool-summary";
import { routing, type Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    TOOL_SLUGS.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const tool = getTool(slug, locale);
  if (!tool) return {};
  return pageMetadata({ locale, path: `/plugins/${slug}`, title: tool.meta.title, description: tool.meta.description });
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const tool = getTool(slug, locale);
  if (!tool) notFound();
  return (
    <>
      <ToolHero tool={tool} />
      <ToolDemoVideo tool={tool} />
      <ToolScreenshots tool={tool} />
      <ToolSummary tool={tool} />
    </>
  );
}
