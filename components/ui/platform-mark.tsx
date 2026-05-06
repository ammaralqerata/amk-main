import Image from "next/image";
import { cn } from "@/lib/cn";

export type PlatformKind = "adobe" | "after-effects" | "desktop-app" | "premiere-pro";

const ADOBE_ICONS = {
  "after-effects": {
    src: "/icons/after-effects.svg",
    label: "After Effects",
  },
  "premiere-pro": {
    src: "/icons/premiere-pro.svg",
    label: "Premiere Pro",
  },
} as const;

export function PlatformMark({
  kind,
  className,
}: {
  kind: PlatformKind;
  className?: string;
}) {
  if (kind === "adobe") {
    return (
      <span
        aria-label="After Effects and Premiere Pro"
        role="img"
        dir="ltr"
        className={cn("inline-flex items-center gap-1.5", className)}
      >
        <AdobeIcon kind="after-effects" />
        <AdobeIcon kind="premiere-pro" />
      </span>
    );
  }

  if (kind === "after-effects" || kind === "premiere-pro") {
    return <AdobeIcon kind={kind} className={className} />;
  }

  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex items-center rounded-md",
        className,
      )}
    >
      <Image
        src="/icons/fadhakkir-white.png"
        alt=""
        aria-hidden
        title="Fadhakkir"
        width={20}
        height={20}
        unoptimized
        className="h-6 w-6"
      />
    </span>
  );
}

function AdobeIcon({
  kind,
  className,
}: {
  kind: "after-effects" | "premiere-pro";
  className?: string;
}) {
  const icon = ADOBE_ICONS[kind];

  return (
    <Image
      src={icon.src}
      alt=""
      aria-hidden
      title={icon.label}
      width={20}
      height={20}
      unoptimized
      className={cn("h-6 w-6 rounded-md", className)}
    />
  );
}
