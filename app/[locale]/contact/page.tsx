import type { Metadata } from "next";
import { Mail } from "lucide-react";
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
  const t = await getTranslations({ locale, namespace: "contactPage" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

type PlatformKey = "youtube" | "instagram" | "email" | "whatsapp";
type ContactCard = { href: string; key: PlatformKey; external?: boolean };

const PRIMARY: ContactCard[] = [
  { key: "youtube", href: "https://www.youtube.com/@ammara.m.k", external: true },
  { key: "instagram", href: "https://www.instagram.com/ammar.kerata/", external: true },
  { key: "email", href: "mailto:ammaralqerata@gmail.com", external: true },
];

const WHATSAPP: ContactCard = {
  key: "whatsapp",
  href: "https://api.whatsapp.com/send/?phone=9647766870565",
  external: true,
};

function ContactTile({
  card,
  name,
  description,
}: {
  card: ContactCard;
  name: string;
  description: string;
}) {
  const showSocialIcon = card.key === "youtube" || card.key === "instagram" || card.key === "whatsapp";

  return (
    <Link
      href={card.href}
      {...(card.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex flex-col items-center gap-3 md:gap-4 rounded-2xl border border-border p-6 md:p-10 hover:border-fg transition-colors min-h-[120px] justify-center"
    >
      {showSocialIcon ? (
        <SocialIcon platform={card.key as "youtube" | "instagram" | "whatsapp"} className="h-6 w-6 text-accent" />
      ) : (
        <Mail aria-hidden className="h-6 w-6 text-accent" strokeWidth={2} />
      )}
      <span className="font-display text-2xl uppercase">{name}</span>
      <span className="text-muted text-sm text-center">{description}</span>
    </Link>
  );
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("heading")}
        description={t("description")}
        align="center"
        iconKind="contact"
      />
      <section className="bg-bg text-fg pb-16">
        <div className="mx-auto max-w-[900px] px-4 md:px-12 py-12 md:py-16 flex flex-col items-center gap-6">
          <div className="grid gap-4 w-full grid-cols-1 sm:grid-cols-3">
            {PRIMARY.map((c) => (
              <ContactTile
                key={c.key}
                card={c}
                name={t(`platforms.${c.key}.name`)}
                description={t(`platforms.${c.key}.description`)}
              />
            ))}
          </div>
          <div className="w-full max-w-[280px]">
            <ContactTile
              card={WHATSAPP}
              name={t(`platforms.${WHATSAPP.key}.name`)}
              description={t(`platforms.${WHATSAPP.key}.description`)}
            />
          </div>
        </div>
      </section>
    </>
  );
}
