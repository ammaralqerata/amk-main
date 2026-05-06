"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { SectionMark } from "@/components/ui/section-mark";
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

  return (
    <header className="sticky top-0 z-40 bg-inverse text-inverse-fg">
      <div className="mx-auto max-w-[var(--container-max)] flex items-center justify-between px-4 md:px-12 h-[60px] md:h-[72px]">
        <Link href="/" className="flex items-center gap-2 min-w-0" onClick={() => setMenuOpen(false)}>
          <SectionMark kind="brand" className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
          <span className="font-display text-sm md:text-lg tracking-[0.125em] truncate">{tBrand("name")}</span>
        </Link>

        <button
          className="md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <nav className={cn(
          "fixed inset-x-0 top-[60px] bg-inverse border-t border-white/10 md:border-0 md:static md:top-auto md:flex md:items-center md:gap-8 md:p-0 md:inset-auto transition-all duration-300",
          menuOpen ? "max-h-[300px] opacity-100" : "max-h-0 md:max-h-none opacity-0 md:opacity-100 overflow-hidden"
        )}>
          <div className="flex flex-col md:flex-row md:items-center md:gap-8 p-4 md:p-0 gap-1">
            {NAV_ITEMS.map((item) => {
              const active = item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "font-body text-sm py-3 md:py-0 transition-colors min-h-[44px] flex items-center",
                    active ? "text-accent" : "text-inverse-fg hover:text-accent",
                  )}
                >
                  {tNav(item.key)}
                </Link>
              );
            })}
            <div className="pt-2 md:pt-0">
              <LanguageSwitcher />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
