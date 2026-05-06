import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionMark } from "@/components/ui/section-mark";
import { SocialIcon } from "@/components/ui/social-icons";

type FooterLink = {
  href: string;
  label: string;
  external?: boolean;
  platform?: "youtube" | "instagram" | "whatsapp";
};

function LinkItem({ href, label, external, platform }: FooterLink) {
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="text-inverse-fg text-[13px] hover:text-accent transition-colors inline-flex items-center gap-2"
    >
      {platform && <SocialIcon platform={platform} className="h-4 w-4" />}
      {label}
    </Link>
  );
}

function ColumnHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-display text-[11px] tracking-[0.18em] text-muted">
      {children}
    </h3>
  );
}

export function SiteFooter() {
  const tFooter = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tBrand = useTranslations("brand");

  const pages: FooterLink[] = [
    { href: "/", label: tNav("home") },
    { href: "/portfolio", label: tNav("portfolio") },
    { href: "/plugins", label: tNav("plugins") },
  ];

  const connect: FooterLink[] = [
    { href: "https://www.youtube.com/@ammara.m.k", label: tFooter("youtube"), external: true, platform: "youtube" },
    { href: "https://www.instagram.com/ammar.kerata/", label: tFooter("instagram"), external: true, platform: "instagram" },
    { href: "mailto:ammaralqerata@gmail.com", label: tFooter("email"), external: true },
    { href: "https://api.whatsapp.com/send/?phone=9647766870565", label: tFooter("whatsapp"), external: true, platform: "whatsapp" },
  ];

  return (
    <footer className="bg-inverse text-inverse-fg">
      <div className="mx-auto max-w-[var(--container-max)] flex flex-col gap-8 px-4 md:px-12 py-8 md:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2">
              <SectionMark kind="brand" className="h-4 w-4 md:h-5 md:w-5" />
              <span className="font-display text-sm md:text-base tracking-[0.125em]">{tBrand("name")}</span>
            </Link>
            <p className="text-xs md:text-[13px] text-muted">
              {tFooter("tagline")}
            </p>
          </div>
          <div className="flex flex-wrap gap-8 md:gap-12">
            <div className="flex flex-col gap-3">
              <ColumnHeader>{tFooter("pagesHeading")}</ColumnHeader>
              {pages.map((l) => <LinkItem key={l.href} {...l} />)}
            </div>
            <div className="flex flex-col gap-3">
              <ColumnHeader>{tFooter("connectHeading")}</ColumnHeader>
              {connect.map((l) => <LinkItem key={l.href} {...l} />)}
            </div>
          </div>
        </div>
        <div className="h-px bg-[var(--color-fg-secondary)]" />
        <p className="text-xs text-muted">
          {tFooter("rights", { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}
