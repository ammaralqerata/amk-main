import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ToolsGrid } from "@/components/sections/tools-grid";
import { PageHero } from "@/components/sections/page-hero";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pluginsPage" });
  return pageMetadata({ locale, path: "/plugins", title: t("metaTitle"), description: t("metaDescription") });
}

export default async function PluginsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pluginsPage");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={<>{t("headingLine1")}<br />{t("headingLine2")}</>}
        description={t("description")}
        iconKind="tools"
      />
      <ToolsGrid showHeader={false} />
    </>
  );
}
