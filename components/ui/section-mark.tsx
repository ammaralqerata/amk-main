import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  FileText,
  Film,
  Send,
  User,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/cn";

export type SectionMarkKind =
  | "about"
  | "brand"
  | "contact"
  | "overview"
  | "portfolio"
  | "services"
  | "tools";

const ICONS: Record<SectionMarkKind, LucideIcon> = {
  about: User,
  brand: User,
  contact: Send,
  overview: FileText,
  portfolio: Film,
  services: Briefcase,
  tools: Wrench,
};

export function SectionMark({
  kind,
  className,
}: {
  kind: SectionMarkKind;
  className?: string;
}) {
  const Icon = ICONS[kind];
  return <Icon aria-hidden className={cn("text-accent", className)} strokeWidth={2} />;
}
