import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { isExternalUrl } from "@/lib/is-external-url";
import type { ComponentProps } from "react";

type Variant = "primary" | "inverse" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] font-display uppercase tracking-wide text-sm rounded-full transition-[color,background-color,border-color,box-shadow,transform] duration-200 active:scale-[0.98] disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-fg hover:shadow-[0_0_0_6px_color-mix(in_srgb,var(--color-accent)_20%,transparent),0_10px_30px_-8px_color-mix(in_srgb,var(--color-accent)_60%,transparent)]",
  inverse: "bg-inverse text-inverse-fg hover:bg-inverse/90",
  ghost: "bg-transparent text-current border border-current/25 hover:border-current hover:bg-current/[0.06]",
};

type LinkButtonProps = {
  href: string;
  variant?: Variant;
} & Omit<React.ComponentPropsWithRef<typeof Link>, "href">;

type NativeButtonProps = {
  href?: undefined;
  variant?: Variant;
} & ComponentProps<"button">;

export type ButtonProps = LinkButtonProps | NativeButtonProps;

export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { href, variant = "primary", className, children, ...rest } = props as LinkButtonProps;
    if (isExternalUrl(href) || href.startsWith("/download/")) {
      return (
        <a
          href={href}
          className={cn(base, variants[variant], className)}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={cn(base, variants[variant], className)}
        {...rest}
      >
        {children}
      </Link>
    );
  }
  const { variant = "primary", className, ...rest } = props as NativeButtonProps;
  return (
    <button
      className={cn(base, variants[variant], className)}
      {...rest}
    />
  );
}
