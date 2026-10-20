import Image from "next/image";
import { cn } from "@/lib/cn";

/** The AMK mark (white + red, transparent). Made for dark backgrounds. */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/amk-logo.png"
      alt=""
      width={142}
      height={144}
      className={cn("w-auto shrink-0", className)}
    />
  );
}
