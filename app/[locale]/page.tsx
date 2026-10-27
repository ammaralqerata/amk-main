import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { ToolsGrid } from "@/components/sections/tools-grid";
import { PortfolioPreview } from "@/components/sections/portfolio-preview";
import { Clients } from "@/components/sections/clients";
import { FinalCta } from "@/components/sections/final-cta";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <PortfolioPreview />
      <Services />
      <ToolsGrid />
      <Clients />
      <FinalCta />
    </>
  );
}
