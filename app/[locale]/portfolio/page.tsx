import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/sections/page-hero";
import { VideoGallery } from "@/components/sections/video-gallery";
import { SocialIcon } from "@/components/ui/social-icons";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolioPage" });
  return pageMetadata({ locale, path: "/portfolio", title: t("metaTitle"), description: t("metaDescription") });
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("portfolioPage");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("heading")}
        description={t("description")}
        iconKind="portfolio"
      />
      <VideoGallery />
      <section className="bg-bg pb-16">
        <div className="mx-auto max-w-[var(--container-max)] px-4 md:px-12 flex flex-col sm:flex-row flex-wrap justify-center gap-4">
          <Link href="https://www.youtube.com/@ammara.m.k" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 rounded-xl px-8 py-4 bg-inverse text-inverse-fg hover:bg-inverse/90 transition-colors min-h-[52px]">
            <SocialIcon platform="youtube" className="h-5 w-5 text-accent" />
            <span className="font-body text-sm font-semibold">{t("youtubeCta")}</span>
          </Link>
          <Link href="https://www.instagram.com/ammar.kerata/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 rounded-xl px-8 py-4 bg-inverse text-inverse-fg hover:bg-inverse/90 transition-colors min-h-[52px]">
            <SocialIcon platform="instagram" className="h-5 w-5 text-accent" />
            <span className="font-body text-sm font-semibold">{t("instagramCta")}</span>
          </Link>
        </div>
      </section>
    </>
  );
}
