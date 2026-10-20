"use client";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const t = useTranslations("nav");

  const other = locale === "ar" ? "en" : "ar";
  const label = t("switcherLabel");

  return (
    <button
      type="button"
      onClick={() => {
        router.replace(
          // @ts-expect-error — pathname is locale-agnostic; params round-trip dynamic segments
          { pathname, params },
          { locale: other },
        );
      }}
      className="inline-flex min-h-[40px] items-center rounded-full border border-white/15 px-4 font-display text-xs tracking-[0.18em] uppercase text-inverse-fg transition-colors hover:border-accent hover:text-accent"
      aria-label={t("switchLanguage")}
    >
      {label}
    </button>
  );
}

export const LOCALES = routing.locales;
