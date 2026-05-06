import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/sections/page-hero";
import { SocialIcon } from "@/components/ui/social-icons";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolioPage" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

const WORKS = [
  {
    src: "/portfolio/motion-graphics-maps.png",
    alt: "Motion graphics and maps",
    href: "https://youtube.com/playlist?list=PLjabAHkQbBA3Wi6oHiPiWDNKFMcu_tx7m&si=7fWvEGETvGVsFdfH",
  },
  {
    src: "/portfolio/montage-documentary.png",
    alt: "Montage and documentary work",
    href: "https://www.youtube.com/@ReLevantHistoryy/featured",
  },
  {
    src: "/portfolio/creative-content.png",
    alt: "Creative content production",
    href: "https://youtube.com/playlist?list=PLjabAHkQbBA11qT_O7g8TaHhdw1bNkqgL&si=Mj4VIotFDBUUUHsF",
  },
  {
    src: "/portfolio/shorts.png",
    alt: "Short reels and videos",
    href: "https://www.youtube.com/@ammara.m.k/shorts",
  },
];

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
      <section className="bg-bg text-fg">
        <div className="mx-auto max-w-[var(--container-max)] px-4 md:px-12 py-12 md:py-16 grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2">
          {WORKS.map((w) => (
            <a key={w.src} href={w.href} target="_blank" rel="noopener noreferrer" className="relative block aspect-[16/10] rounded-xl overflow-hidden">
              <Image src={w.src} alt={w.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 hover:scale-105" />
            </a>
          ))}
        </div>
      </section>
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
