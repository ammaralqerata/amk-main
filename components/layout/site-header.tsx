"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { BrandLogo } from "@/components/ui/brand-logo";
import { LanguageSwitcher } from "./language-switcher";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/portfolio", key: "portfolio" },
  { href: "/plugins", key: "plugins" },
  { href: "/contact", key: "contact" },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const tNav = useTranslations("nav");
  const tBrand = useTranslations("brand");

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-black/70 text-inverse-fg backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto max-w-[var(--container-max)] flex items-center justify-between px-4 md:px-12 h-[60px] md:h-[72px]">
          <Link href="/" className="flex items-center gap-3 min-w-0" onClick={() => setMenuOpen(false)}>
            <BrandLogo className="h-8 md:h-9" />
            <span className="font-display text-sm md:text-lg tracking-[0.125em] truncate">{tBrand("name")}</span>
          </Link>

          {/* Desktop: segmented glass pill */}
          <nav className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 font-body text-sm transition-colors",
                    isActive(item.href)
                      ? "bg-white/10 text-accent"
                      : "text-white/75 hover:bg-white/[0.06] hover:text-white",
                  )}
                >
                  {tNav(item.key)}
                </Link>
              ))}
            </div>
            <LanguageSwitcher />
          </nav>

          <button
            className="md:hidden -me-2 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-colors hover:bg-white/10"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? tNav("closeMenu") : tNav("openMenu")}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile: full-height frosted sheet. Lives outside <header> because the header's
          backdrop-filter would otherwise trap this fixed element inside it. */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={cn(
          "md:hidden fixed inset-x-0 top-[60px] bottom-0 z-30 bg-black/85 text-inverse-fg backdrop-blur-2xl transition-opacity duration-300",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setMenuOpen(false)}
      >
        <nav className="flex flex-col gap-1 px-6 pt-8" onClick={(e) => e.stopPropagation()}>
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              aria-current={isActive(item.href) ? "page" : undefined}
              style={{ transitionDelay: menuOpen ? `${60 + i * 50}ms` : "0ms" }}
              className={cn(
                "flex min-h-[56px] items-center border-b border-white/[0.08] font-display text-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                isActive(item.href) ? "text-accent" : "text-white",
              )}
            >
              {tNav(item.key)}
            </Link>
          ))}
          <div
            className={cn("pt-6 transition-opacity duration-500", menuOpen ? "opacity-100" : "opacity-0")}
            style={{ transitionDelay: menuOpen ? "280ms" : "0ms" }}
          >
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </>
  );
}
