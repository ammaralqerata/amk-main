import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { ToolsGrid } from "@/components/sections/tools-grid";
import { PortfolioPreview } from "@/components/sections/portfolio-preview";
import { FollowMe } from "@/components/sections/follow-me";
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
      <About />
      <Services />
      <ToolsGrid />
      <PortfolioPreview />
      <FollowMe />
    </>
  );
}
