import { cn } from "@/lib/cn";
import type { ComponentProps } from "react";

export function Card({ className, ...rest }: ComponentProps<"div">) {
  return (
    <div
      {...rest}
      className={cn(
        "bg-bg text-fg rounded-[var(--radius-2xl)] p-6 flex flex-col gap-4 border border-border",
        className,
      )}
    />
  );
}
