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
      className="font-display text-xs tracking-[0.18em] uppercase text-inverse-fg hover:text-accent transition-colors"
      aria-label={`Switch language to ${other === "ar" ? "Arabic" : "English"}`}
    >
      {label}
    </button>
  );
}

export const LOCALES = routing.locales;
