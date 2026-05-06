import { cn } from "@/lib/cn";

export function Eyebrow({ children, tone = "light", className, icon }: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
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
