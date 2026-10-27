import { cn } from "@/lib/cn";

export function Eyebrow({ children, tone = "light", className, icon }: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
  icon?: React.ReactNode;
}) {
  return (
    // On light sections the icon takes the deeper green so it stays readable on white.
    <div className={cn("inline-flex items-center gap-1.5", tone === "light" && "[--color-accent:var(--color-accent-ink)]", className)}>
      {icon}
      <span className={cn(
        "font-display text-[11px] tracking-[0.18em] uppercase",
        tone === "light" ? "text-muted" : "text-muted"
      )}>
        {children}
      </span>
    </div>
  );
}
