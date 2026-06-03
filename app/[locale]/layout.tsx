import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono, Readex_Pro } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageTransition } from "@/components/layout/page-transition";
import { routing } from "@/i18n/routing";

const fontLatin = Geist({
  subsets: ["latin"],
  variable: "--font-latin",
  display: "swap",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono-loaded",
  display: "swap",
});

const fontArabic = Readex_Pro({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("title");
  const description = t("description");
  const canonical = locale === routing.defaultLocale ? "/" : `/${locale}`;

  return {
    metadataBase: new URL("https://ammar.kerata.net"),
    title: { default: title, template: t("titleTemplate") },
    description,
    icons: {
      icon: [{ url: "/favicon.ico?v=2", sizes: "any" }],
      shortcut: ["/favicon.ico?v=2"],
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "AMK Creative",
      type: "website",
      images: [
        {
          url: "/og-image-v1.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image-v1.png"],
    },
    alternates: {
      canonical,
      languages: {
        ar: "/",
        "en-US": "/en",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${fontLatin.variable} ${fontMono.variable} ${fontArabic.variable}`}
    >
      <body>
        <NextIntlClientProvider>
          <SiteHeader />
          <main className="min-h-[calc(100dvh-200px)] bg-bg text-fg">
            <PageTransition>{children}</PageTransition>
          </main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
