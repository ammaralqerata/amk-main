import Image from "next/image";
import { cn } from "@/lib/cn";

/** The AMK caps mark (paper white + red, transparent). Made for dark backgrounds. */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/amk-logo.svg"
      alt=""
      width={831}
      height={400}
      className={cn("w-auto shrink-0", className)}
    />
  );
}
