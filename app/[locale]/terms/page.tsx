import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/sections/legal-page";
import { TERMS } from "@/content/legal";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = TERMS[locale];
  return pageMetadata({ locale, path: "/terms", title: doc.metaTitle, description: doc.metaDescription });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPage doc={TERMS[locale]} />;
}
