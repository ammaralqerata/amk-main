import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/sections/legal-page";
import { PRIVACY } from "@/content/legal";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = PRIVACY[locale];
  return pageMetadata({ locale, path: "/privacy", title: doc.metaTitle, description: doc.metaDescription });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPage doc={PRIVACY[locale]} />;
}
